import requests
from bs4 import BeautifulSoup
import re
import json


class DouYinPlatform:
    def __init__(self, link):
        self.link = link
        self.record = {}

    def parse_video(self):
        # 创建请求
        headers = {
            "User-Agent": "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
        }
        try:
            response = requests.get(self.link, headers=headers)
            response.raise_for_status()  # 抛出请求错误
        except requests.exceptions.RequestException as e:
            return None, str(e)

        # 使用 BeautifulSoup 解析页面
        soup = BeautifulSoup(response.text, "html.parser")
        print(soup)
        json_data = ""
        # 查找包含 window._ROUTER_DATA 的 <script> 标签

        for script in soup.find_all("script"):
            script_text = script.text
            if "window._ROUTER_DATA" in script_text:
                json_data_match = re.search(r"^window\._ROUTER_DATA\s*=\s*(\{.*\})", script_text)
                if json_data_match:
                    json_data = json_data_match.group(1)
                    print(json_data)
                    break

        if not json_data:
            return None, "没有找到有效的 JSON 数据"

        try:
            # 尝试解析 JSON 数据
            video_data = json.loads(json_data)
        except json.JSONDecodeError as e:
            return None, f"解析视频数据错误: {e}"
        # 提取视频信息
        video_item_list = (
            video_data.get("loaderData", {})
            .get("video_(id)\u002Fpage", {})
            .get("videoInfoRes", {})
            .get("item_list", [])
        )
        note_item_list = (
            video_data.get("loaderData", {})
            .get("note_(id)\u002Fpage", {})
            .get("videoInfoRes", {})
            .get("item_list", [])
        )

        # 如果视频信息无效，返回错误
        if not video_item_list and not note_item_list:
            return None, "解析数据异常，无法获取有效的视频信息"
        print(video_item_list)
        # 如果是图文资源
        if video_item_list and video_item_list[0].get("images"):
            image_resource = [
                image["url_list"][0] for image in video_item_list[0]["images"]
            ]
            self.record["type"] = 2  # 图文
            self.record["cover"] = video_item_list[0]["video"]["cover"]["url_list"][0]
            self.record["title"] = video_item_list[0]["desc"]
            self.record["resourcePath"] = image_resource

        elif note_item_list:  # 图文信息（如果视频没有）
            image_resource = [
                image["url_list"][0] for image in note_item_list[0]["images"]
            ]
            self.record["type"] = 2  # 图文
            self.record["cover"] = note_item_list[0]["images"][0]["url_list"][0]
            self.record["title"] = note_item_list[0]["desc"]
            self.record["resourcePath"] = image_resource

        # 如果是视频资源
        if video_item_list and not video_item_list[0].get("images"):
            video_url = (
                "https://www.douyin.com/aweme/v1/play/?ratio=1080p&video_id="
                + video_item_list[0]["video"]["play_addr"]["uri"]
            )

            # 请求视频的实际地址
            try:
                video_response = requests.head(
                    video_url, headers=headers, allow_redirects=False
                )
                video_url = video_response.headers.get("Location")
            except requests.exceptions.RequestException as e:
                return None, f"视频获取失败: {e}"

            self.record["type"] = 1  # 视频
            self.record["title"] = video_item_list[0]["desc"]
            self.record["cover"] = video_item_list[0]["video"]["cover"]["url_list"][0]
            self.record["video"] = video_url
            self.record["resourcePath"] = video_url

        return self.record, None
