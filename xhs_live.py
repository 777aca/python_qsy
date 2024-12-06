import requests
from bs4 import BeautifulSoup
import json

class RedBookLivePlatform:
    def __init__(self, link):
        self.link = link

    def parse_video(self):
        session = requests.Session()
        try:
            response = session.head(self.link, allow_redirects=True)
        except requests.exceptions.RequestException as e:
            return None, str(e)
        
        detail_url = response.url
        try:
            detail_response = requests.get(detail_url)
        except requests.exceptions.RequestException as e:
            return None, str(e)

        soup = BeautifulSoup(detail_response.text, 'html.parser')

        json_data = ""
        for script in soup.find_all("script"):
            script_text = script.string
            if script_text and "window.__INITIAL_STATE__" in script_text:
                start = script_text.find("{")
                end = script_text.rfind("}") + 1
                json_data = script_text[start:end]
                json_data = json_data.replace("undefined", "\"\"")

        try:
            rb_data = json.loads(json_data)
        except json.JSONDecodeError as e:
            return None, f"解析数据错误: {e}"

        note_data = rb_data.get('note', {}).get('noteDetailMap', {}).get(rb_data['note'].get('firstNoteId'))
        if not note_data:
            return None, "数据解析错误"

        result = {}
        if note_data['note']['type'] == "normal":  # live图
            live_resource = [img['stream']['h264'][0]['masterUrl'] for img in note_data['note']['imageList']]
            print(live_resource)
            result = {
                'type': 2,
                'title': note_data['note']['title'],
                'desc':  note_data['note']['desc'],
                'cover': note_data['note']['imageList'][0]['urlDefault'],
                'resourcePath': live_resource
            }
            print(result)


        return result, None
