import os
import requests
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

HF_API_KEY = os.getenv("HF_API_KEY")

# NEW HUGGINGFACE ENDPOINT (OLD ONE NO LONGER WORKS)
API_URL = "https://router.huggingface.co/hf-inference/models/j-hartmann/emotion-english-distilroberta-base"

HEADERS = {
    "Authorization": f"Bearer {HF_API_KEY}",
    "Content-Type": "application/json",
}


def predict_emotion(text: str) -> Dict[str, Any]:
    payload = {"inputs": text}

    try:
        response = requests.post(API_URL, headers=HEADERS, json=payload, timeout=20)
        print("🔍 HF status:", response.status_code)
        response_json = response.json()
        print("🔍 HF raw response:", response_json)
    except Exception as e:
        print("❌ HF request failed:", repr(e))
        return {"label": "neutral", "scores": {}, "mood": "neutral"}

    if isinstance(response_json, dict) and "error" in response_json:
        print("❌ HF returned error:", response_json["error"])
        return {"label": "neutral", "scores": {}, "mood": "neutral"}

    predictions = response_json[0]

    scores = {item["label"].lower(): item["score"] for item in predictions}

    top = max(predictions, key=lambda x: x["score"])
    top_label = top["label"].lower()

    mood = map_emotion_to_app_mood(top_label, text)

    return {"label": top_label, "scores": scores, "mood": mood}


def map_emotion_to_app_mood(label: str, raw_text: str) -> str:
    l = label.lower()
    rt = raw_text.lower()

    if any(k in rt for k in ["relax", "calm", "peaceful", "chill"]):
        return "relaxed"
    if any(k in rt for k in ["motivat", "pumped", "driven", "ambitio"]):
        return "motivated"
    if any(k in rt for k in ["stress", "nervous", "anxious", "worry", "panic", "overwhelm"]):
        return "stressed"

    if l == "joy":
        return "happy"
    if l in ["sadness", "sad"]:
        return "sad"
    if l in ["anger", "angry", "disgust"]:
        return "angry"
    if l == "fear":
        return "stressed"
    if l == "surprise":
        return "excited"

    return "neutral"
