import os
import requests
from typing import Dict, Any
from dotenv import load_dotenv

# Load HF token
load_dotenv()
HF_API_KEY = os.getenv("HF_API_KEY")

# HuggingFace Inference API endpoint
API_URL = "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base"

HEADERS = {
    "Authorization": f"Bearer {HF_API_KEY}",
    "Content-Type": "application/json",
}


def predict_emotion(text: str) -> Dict[str, Any]:
    """Send text to HuggingFace API and map the response to app moods."""

    # Prepare payload
    payload = {"inputs": text}

    # HF API call
    try:
        response = requests.post(API_URL, headers=HEADERS, json=payload, timeout=10)
        response_json = response.json()
    except Exception:
        return {"label": "neutral", "scores": {}, "mood": "neutral"}

    # Handle model loading state
    if "error" in response_json:
        return {"label": "neutral", "scores": {}, "mood": "neutral"}

    # HF returns nested list: [[{label, score}, ...]]
    predictions = response_json[0]

    # Make a proper scores dict
    scores = {item["label"].lower(): item["score"] for item in predictions}

    # Top prediction
    top = max(predictions, key=lambda x: x["score"])
    top_label = top["label"].lower()

    # Map raw emotion → Moodify mood
    mood = map_emotion_to_app_mood(top_label, text)

    return {"label": top_label, "scores": scores, "mood": mood}


def map_emotion_to_app_mood(label: str, raw_text: str) -> str:
    """
    Convert model emotions → app moods.
    Model labels: anger, disgust, fear, joy, neutral, sadness, surprise
    App moods: angry, sad, happy, relaxed, motivated, stressed, excited, neutral
    """
    l = label.lower()
    rt = raw_text.lower()

    # Keyword overrides for extra moods:
    if any(k in rt for k in ["relax", "calm", "peaceful", "chill"]):
        return "relaxed"

    if any(k in rt for k in ["motivat", "pumped", "driven", "ambitio"]):
        return "motivated"

    if any(k in rt for k in ["stress", "nervous", "anxious", "worry", "panic", "overwhelm"]):
        return "stressed"

    # Standard emotion → mood mapping
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
