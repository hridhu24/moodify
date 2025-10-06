# backend/advanced_emotion.py
import os
from typing import Dict, Any
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

MODEL_NAME = "bhadresh-savani/distilbert-base-uncased-emotion"  # 6 emotions

_tokenizer = None
_model = None
_id2label = None
_device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Confidence floor for top-1; below this -> neutral
CONFIDENCE_MIN = 0.35

def load_model():
    global _tokenizer, _model, _id2label
    if _model is not None:
        return
    _tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    _model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
    _model.to(_device)
    _model.eval()  # ✅ important to disable dropout
    _id2label = _model.config.id2label

def _softmax(logits: torch.Tensor):
    probs = torch.nn.functional.softmax(logits, dim=-1)[0]
    return probs.detach().cpu().tolist()

def _preprocess(text: str) -> str:
    """
    Light pre-processing. Add a tiny frame for single tokens so the model has context.
    """
    t = text.strip()
    if len(t.split()) == 1:
        t = f"I feel {t}."
    return t

def predict_emotion(text: str) -> Dict[str, Any]:
    """
    Returns:
    {
      "label": "<raw_emotion_label>",
      "scores": {"anger": 0.12, "joy": 0.53, ...},
      "mood": "<mapped_app_mood>"
    }
    """
    if _model is None:
        load_model()

    clean = _preprocess(text)
    inputs = _tokenizer(
        clean,
        truncation=True,
        max_length=256,
        return_tensors="pt",
    ).to(_device)

    with torch.no_grad():
        outputs = _model(**inputs)
        logits = outputs.logits

    probs = _softmax(logits)
    scores = { _id2label[i].lower(): float(probs[i]) for i in range(len(probs)) }

    top_idx = int(torch.tensor(probs).argmax().item())
    top_label = _id2label[top_idx].lower()
    top_prob = float(probs[top_idx])

    # Confidence guardrail
    if top_prob < CONFIDENCE_MIN:
        mapped = "neutral"
    else:
        mapped = map_emotion_to_app_mood(top_label, text)

    return {"label": top_label, "scores": scores, "mood": mapped}

def map_emotion_to_app_mood(label: str, raw_text: str) -> str:
    """
    Model labels: sadness, joy, love, anger, fear, surprise
    App moods:   happy, sad, angry, stressed, excited, neutral
    (relaxed/motivated are UI-only; support via keyword shim below)
    """
    l = label.lower()

    # Optional keyword shim to support UI moods not present in the model
    rt = raw_text.lower()
    if any(k in rt for k in ["relax", "calm", "chill", "peaceful"]):
        return "relaxed"
    if any(k in rt for k in ["motivat", "pumped", "driven", "ambitio"]):
        return "motivated"
    if any(k in rt for k in ["stress", "anxious", "overwhelmed", "panic"]):
        return "stressed"

    if l in {"joy", "love"}:
        return "happy"
    if l in {"sad", "sadness"}:
        return "sad"
    if l in {"anger", "angry"}:
        return "angry"
    if l in {"fear"}:
        return "stressed"
    if l in {"surprise"}:
        return "excited"
    return "neutral"
