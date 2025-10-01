import requests

url = "http://127.0.0.1:8000/recommend"
data = {"text": "I feel very happy today!"}

res = requests.post(url, json=data)
print(res.json())
