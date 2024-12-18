from flask import Flask, request, jsonify
import requests
import mysql.connector
import random
import string
app = Flask(__name__)

# 微信小程序的appid和secret
APP_ID = 'wx8cb69c441578cafc'
APP_SECRET = '8eece665957a97f4730e36e2591e11ae'

# MySQL数据库配置
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'cfm7241998.',
    'database': 'wechat_db'
}

def generate_random_nickname(length=7):
    """生成一个随机昵称，格式为 '微信用户_7位随机字母'"""
    return f"微信用户_{''.join(random.choices(string.ascii_letters, k=length))}"

def generate_random_uid(length=7):
    """生成一个7位随机数字作为UID"""
    return ''.join(random.choices(string.digits, k=length))

def get_wechat_user_info(code):
    """使用code从微信服务器获取openid和session_key"""
    url = f"https://api.weixin.qq.com/sns/jscode2session?appid={APP_ID}&secret={APP_SECRET}&js_code={code}&grant_type=authorization_code"
    
    response = requests.get(url)
    data = response.json()

    if 'errcode' in data:
        raise Exception(f"微信接口错误: {data['errmsg']}")
    
    return data['openid'], data['session_key']

def save_user_to_db(openid, session_key):
    """将用户信息存入数据库"""
    conn = mysql.connector.connect(**DB_CONFIG)  # 你的数据库配置
    cursor = conn.cursor()

    # 检查用户是否已存在
    cursor.execute("SELECT * FROM users WHERE openid = %s", (openid,))
    existing_user = cursor.fetchone()

    if existing_user:
        # 用户已存在，不做任何更新
        pass
    else:
        # 新用户，插入数据，并生成唯一的 UID
        uid = generate_random_uid()  # 生成唯一的 UID
        nickname = generate_random_nickname()
        cursor.execute("INSERT INTO users (openid, session_key, nickname, uid) VALUES (%s, %s, %s, %s)", 
                       (openid, session_key if session_key else None, nickname, uid))
    
    conn.commit()
    cursor.close()
    conn.close()




def fetch_user_info(openid):
    """根据 openid 从数据库获取用户信息"""
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    cursor.execute("SELECT uid, nickname, created_at FROM users WHERE openid = %s", (openid,))
    user_info = cursor.fetchone()

    cursor.close()
    conn.close()

    # 如果找到了用户信息，返回字典格式的数据
    if user_info:
        return {
            'uid': user_info[0],
            'nickname': user_info[1],
            'created_at': user_info[2]
        }
    return None  # 用户不存在


