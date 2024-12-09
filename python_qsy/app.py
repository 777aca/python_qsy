from flask import Flask, request, jsonify
from dy import DouYinPlatform
from xhs import RedBookPlatform
from xhs_live import RedBookLivePlatform
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

# 解析视频请求处理
@app.route('/parse_video', methods=['POST'])
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
    
# 禁用缓存：为所有响应添加缓存控制头
@app.after_request
def add_cache_control_headers(response):
    response.cache_control.no_cache = True
    response.cache_control.no_store = True
    response.cache_control.must_revalidate = True
    response.headers['Pragma'] = 'no-cache'  # 用于老版本 HTTP/1.0 客户端
    response.headers['Expires'] = '0'  # 防止缓存的过期时间
    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
