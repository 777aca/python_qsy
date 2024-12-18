from flask import Flask, request, jsonify
from dy import DouYinPlatform
from xhs import RedBookPlatform
from xhs_live import RedBookLivePlatform
from download import download_video
from login import save_user_to_db,get_wechat_user_info,fetch_user_info
import logging


app = Flask(__name__)

# 配置日志
logging.basicConfig(level=logging.INFO)

# 统一异常处理
@app.errorhandler(Exception)
def handle_exception(e):
    logging.error(f"Unhandled exception: {e}")
    return jsonify({"error": "服务器内部错误", "details": str(e)}), 500

# 辅助函数：判断平台类型
def get_platform_handler(link, type):
    if "douyin.com" in link:
        return DouYinPlatform(link)
    elif "xhslink.com" in link or "xiaohongshu.com" in link:
        if type == "live":
            return RedBookLivePlatform(link)
        else:
            return RedBookPlatform(link)
    return None


    
# 禁用缓存：为所有响应添加缓存控制头
@app.after_request
def add_cache_control_headers(response):
    response.cache_control.no_cache = True
    response.cache_control.no_store = True
    response.cache_control.must_revalidate = True
    response.headers['Pragma'] = 'no-cache'  # 用于老版本 HTTP/1.0 客户端
    response.headers['Expires'] = '0'  # 防止缓存的过期时间
    return response


# 解析视频请求处理
@app.route('/api/parse_video', methods=['POST'])
def parse_video():
    try:
        # 获取请求中的 JSON 数据
        data = request.get_json()

        if not data:
            return jsonify({"error": "请求体不能为空"}), 400

        # 验证必需的参数
        link = data.get('link')
        
        if not link:
            return jsonify({"error": "缺少 link 参数"}), 400

        # 获取 type 参数，默认为 "video"（如果没有提供）
        type = data.get('type', 'video')  # 如果没有提供 type，默认为 "video"

        # 判断平台类型
        handler = get_platform_handler(link, type)
        if not handler:
            return jsonify({"error": "暂不支持该平台资源解析"}), 400

        # 调用解析方法
        result, error = handler.parse_video()

        if error:
            logging.error(f"解析错误: {error}")
            return jsonify({"error": error}), 400

        return jsonify({"data": result}), 200

    except Exception as e:
        # 捕获并记录异常
        logging.error(f"请求处理异常: {e}")
        return jsonify({"error": "请求处理失败", "details": str(e)}), 500

# 下载视频请求处理
@app.route('/api/download_video', methods=['POST'])
def download_video_endpoint():
    """
    接收视频 URL，并返回新的视频 URL
    """
    data = request.json
    video_url = data.get('video_url')
    
    if not video_url:
        return jsonify({"error": "Missing video_url parameter"}), 400

    # 下载视频
    file_path, file_name, new_url = download_video(video_url)

    if not file_path:
        return jsonify({"error": f"Failed to download video: {file_name}"}), 500

    return jsonify({"new_video_url": new_url})

# 登录
@app.route('/api/login', methods=['POST'])
def login():
    """处理微信小程序登录请求"""
    code = request.json.get('code')
    if not code:
        return jsonify({'error': 'No code provided'}), 400

    try:
        openid, session_key = get_wechat_user_info(code)
        save_user_to_db(openid, session_key)
        return jsonify({'openid': openid, 'session_key': session_key})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/save_user_info', methods=['POST'])
def save_user_info():
    """保存用户的昵称和头像等信息"""
    # 获取请求体中的 JSON 数据
    data = request.json

    # 打印请求体数据进行调试
    print("Received data:", data)

    # 获取必填的 openid 字段
    openid = data.get('openid')
    
    # 如果 openid 不存在，返回错误
    if not openid:
        return jsonify({'error': 'openid is required'}), 400

    nickname = data.get('nickname')  # 可选字段

    try:
        # 保存用户信息到数据库
        save_user_to_db(openid,nickname)
        return jsonify({'message': '修改成功'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


    

@app.route('/api/get_user_info', methods=['POST'])
def get_user_info():
    """获取用户的昵称和头像等信息"""
    data = request.json
    openid = data.get('openid')

    if not openid:
        return jsonify({'error': 'Missing required parameters'}), 400

    try:
        # 调用 fetch_user_info 获取用户信息
        user_info = fetch_user_info(openid)
        
        # 如果用户不存在
        if not user_info:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify(user_info), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
        



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
