import requests
import datetime
import os
from urllib.parse import urlparse


# 设置视频存储路径
VIDEO_FOLDER = '/home/wwwroot/videos'
if not os.path.exists(VIDEO_FOLDER):
    os.makedirs(VIDEO_FOLDER)

# 配置您的服务器域名
DOMAIN_NAME = 'https://777aca.cn'

MAX_FILE_SIZE = 20 * 1024 * 1024  # 20MB


def download_video(video_url):
    """
    下载视频文件到服务器
    :param video_url: 视频的外部 URL
    :return: 存储在服务器的文件路径和文件名
    """
    try:
        response = requests.get(video_url, stream=True)
        response.raise_for_status()  # 如果请求失败，会抛出异常

        # 获取当前时间戳，作为文件名的一部分
        timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S%f")
        
        # 获取视频的文件扩展名（如果有）
        parsed_url = urlparse(video_url)
        file_extension = os.path.splitext(parsed_url.path)[1]  # 获取文件的扩展名，如 .mp4

        # 如果没有扩展名，默认为 mp4
        if not file_extension:
            file_extension = ".mp4"

        # 使用时间戳和扩展名生成文件名
        file_name = f"{timestamp}{file_extension}"

        # 设置文件保存路径
        file_path = os.path.join(VIDEO_FOLDER, file_name)

        # 确保文件夹存在
        if not os.path.exists(VIDEO_FOLDER):
            os.makedirs(VIDEO_FOLDER)

        total_size = 0  # 已下载数据大小

            # 返回新的 URL
        new_url = f"{DOMAIN_NAME}/video/{file_name}"

        # 将视频文件保存到服务器
        with open(file_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    total_size += len(chunk)

                    # 如果文件大小超过限制，停止下载
                    if total_size > MAX_FILE_SIZE:
                        os.remove(file_path)  # 删除已下载部分的文件
                        return None, "视频文件超过最大允许大小（20MB）"

                    f.write(chunk)

        return file_path, file_name,new_url

    except requests.exceptions.RequestException as e:
        return None, str(e)