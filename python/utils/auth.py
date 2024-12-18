from functools import wraps
import jwt
from flask import request, jsonify, current_app

# 装饰器函数：用于验证 JWT
def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        
        # 尝试从请求头获取 token
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            
            # 检查 token 是否以 "Bearer " 开头
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]  # 提取 token
            else:
                return jsonify({'error': 'Authorization header must be "Bearer <token>"'}), 403
        
        # 如果没有提供 token
        if not token:
            return jsonify({'error': 'Token is missing!'}), 403
        
        try:
            # 尝试解码 token
            decoded_token = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = decoded_token['openid']
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token!'}), 401

        # 将当前用户的 openid 放入上下文中，供路由处理函数使用
        request.current_user = current_user

        return f(*args, **kwargs)

    return decorated_function
