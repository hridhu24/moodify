import os
from typing import Dict, Any
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

# ✅ New smaller, clean model
MODEL_NAME = "j-hartmann/emotion-english-distilroberta-base"

_tokenizer = None
_model = None
_device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Confidence threshold → fallback to neutral
CONFIDENCE_MIN = 0.30


def load_model():
    """Load model + tokenizer once."""
    global _tokenizer, _model
    if _model is not None:
        return
    _tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    _model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
    _model.to(_device).eval()
    print("✅ Emotion model loaded successfully:", MODEL_NAME)


def _softmax(logits: torch.Tensor):
    probs = torch.nn.functional.softmax(logits, dim=-1)[0]
    return probs.detach().cpu().numpy()


def _preprocess(text: str) -> str:
    """Basic cleanup."""
    t = text.strip()
    if len(t.split()) == 1:
        t = f"I feel {t}."
    return t


def predict_emotion(text: str) -> Dict[str, Any]:
    """Predict emotion and map to app moods."""
    if _model is None:
        load_model()

    clean = _preprocess(text)
    inputs = _tokenizer(clean, truncation=True, max_length=256, return_tensors="pt").to(_device)

    with torch.no_grad():
        outputs = _model(**inputs)
        logits = outputs.logits

    probs = _softmax(logits)
    labels = _model.config.id2label
    scores = {labels[i].lower(): float(probs[i]) for i in range(len(probs))}

    top_idx = int(probs.argmax())
    top_label = labels[top_idx].lower()
    top_prob = float(probs[top_idx])

    if top_prob < CONFIDENCE_MIN:
        top_label = "neutral"

    mood = map_emotion_to_app_mood(top_label, text)
    return {"label": top_label, "scores": scores, "mood": mood}


def map_emotion_to_app_mood(label: str, raw_text: str) -> str:
    """
    Map model emotions → app moods.
    Model labels: anger, disgust, fear, joy, neutral, sadness, surprise
    App moods: angry, happy, stressed, sad, excited, neutral
    """
    l = label.lower()
    rt = raw_text.lower()

    # Keyword overrides
    if any(k in rt for k in ["relax", "calm", "chill", "peaceful"]):
        return "relaxed"
    if any(k in rt for k in ["motivat", "pumped", "driven", "ambitio"]):
        return "motivated"
    if any(k in rt for k in ["stress", "anxious", "overwhelmed", "panic"]):
        return "stressed"

    # Label mapping
    if l in {"joy"}:
        return "happy"
    if l in {"sad", "sadness"}:
        return "sad"
    if l in {"anger", "angry"}:
        return "angry"
    if l in {"fear"}:
        return "stressed"
    if l in {"disgust"}:
        return "angry"
    if l in {"surprise"}:
        return "excited"
    return "neutral"
