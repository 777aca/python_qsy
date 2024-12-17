from flask import Flask, request, jsonify
import requests
import mysql.connector

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

def get_wechat_user_info(code):
    """使用code从微信服务器获取openid和session_key"""
    url = f"https://api.weixin.qq.com/sns/jscode2session?appid={APP_ID}&secret={APP_SECRET}&js_code={code}&grant_type=authorization_code"
    
    response = requests.get(url)
    data = response.json()

    if 'errcode' in data:
        raise Exception(f"微信接口错误: {data['errmsg']}")
    
    return data['openid'], data['session_key']

def save_user_to_db(openid, session_key, nickname=None, avatar_url=None):
    """将用户信息存入数据库"""
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    # 检查用户是否已存在
    cursor.execute("SELECT * FROM users WHERE openid = %s", (openid,))
    existing_user = cursor.fetchone()

    if existing_user:
        # 用户已存在，更新 session_key 和其他信息
        if session_key:
            cursor.execute("UPDATE users SET session_key = %s, nickname = %s, avatar_url = %s WHERE openid = %s", 
                           (session_key, nickname, avatar_url, openid))
        else:
            cursor.execute("UPDATE users SET nickname = %s, avatar_url = %s WHERE openid = %s", 
                           (nickname, avatar_url, openid))
    else:
        # 新用户，插入数据
        cursor.execute("INSERT INTO users (openid, session_key, nickname, avatar_url) VALUES (%s, %s, %s, %s)", 
                       (openid, session_key if session_key else None, nickname, avatar_url))
    
    conn.commit()
    cursor.close()
    conn.close()




def fetch_user_info(openid):
    """根据 openid 从数据库获取用户信息"""
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    cursor.execute("SELECT openid, nickname, avatar_url FROM users WHERE openid = %s", (openid,))
    user_info = cursor.fetchone()
    
    cursor.close()
    conn.close()

    # 如果找到了用户信息，返回字典格式的数据
    if user_info:
        return {
            'openid': user_info[0],
            'nickname': user_info[1],
            'avatar_url': user_info[2]
        }
    return None  # 用户不存在

