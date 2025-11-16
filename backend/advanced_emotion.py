import os
from typing import Dict, Any
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

# HuggingFace model (small & Render-safe)
MODEL_NAME = "j-hartmann/emotion-english-distilroberta-base"

_tokenizer = None
_model = None

# Forces CPU (Render free tier cannot use GPU)
_device = torch.device("cpu")

# Confidence threshold → fallback to neutral
CONFIDENCE_MIN = 0.30


def load_model():
    """Load Transformer model + tokenizer once."""
    global _tokenizer, _model

    if _model is not None:
        return

    print("⏳ Downloading emotion model from HuggingFace…")
    _tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    _model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
    _model.to(_device).eval()
    print("✅ Emotion model loaded successfully:", MODEL_NAME)


def _softmax(logits: torch.Tensor):
    """Stable softmax."""
    probs = torch.nn.functional.softmax(logits, dim=-1)[0]
    return probs.cpu().numpy()


def _preprocess(text: str) -> str:
    """Prevent 1-word input issues and trim."""
    text = text.strip()
    if len(text.split()) == 1:
        return f"I feel {text}."
    return text


def predict_emotion(text: str) -> Dict[str, Any]:
    """Main prediction function."""
    if _model is None:
        load_model()

    clean = _preprocess(text)

    # Lower max_length → lower memory (safer for Render)
    inputs = _tokenizer(
        clean,
        return_tensors="pt",
        truncation=True,
        max_length=128,
    ).to(_device)

    with torch.no_grad():
        logits = _model(**inputs).logits

    probs = _softmax(logits)

    labels = _model.config.id2label
    scores = {labels[i].lower(): float(probs[i]) for i in range(len(probs))}

    # Top prediction
    top_idx = int(probs.argmax())
    top_label = labels[top_idx].lower()
    top_prob = float(probs[top_idx])

    # Confidence threshold → fallback to neutral
    if top_prob < CONFIDENCE_MIN:
        top_label = "neutral"

    mood = map_emotion_to_app_mood(top_label, text)

    return {
        "label": top_label,
        "scores": scores,
        "mood": mood
    }


def map_emotion_to_app_mood(label: str, raw_text: str) -> str:
    """
    Map raw sentiment → app mood categories.
    Model labels: anger, disgust, fear, joy, neutral, sadness, surprise
    App moods: angry, sad, happy, relaxed, motivated, stressed, excited, neutral
    """
    l = label.lower()
    rt = raw_text.lower()

    # Keyword overrides first
    if any(k in rt for k in ["relax", "calm", "peaceful", "chill"]):
        return "relaxed"
    if any(k in rt for k in ["motivat", "driven", "pumped", "ambitio"]):
        return "motivated"
    if any(k in rt for k in ["stress", "anxious", "worry", "panic", "overwhelm"]):
        return "stressed"

    # Emotion → Mood mapping
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
