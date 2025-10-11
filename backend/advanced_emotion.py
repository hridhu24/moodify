# backend/advanced_emotion.py
import os
import numpy as np
import onnxruntime as ort
from transformers import AutoTokenizer
from typing import Dict, Any

os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

MODEL_NAME = "bhadresh-savani/distilbert-base-uncased-emotion"  # 6 emotions
MODEL_PATH = os.path.join("models", "emotion_model_quant.onnx")


_tokenizer = None
_session = None
_id2label = ["anger", "fear", "joy", "love", "sadness", "surprise"]

# Confidence floor for top-1; below this -> neutral
CONFIDENCE_MIN = 0.35


def load_model():
    """
    Loads ONNX model + tokenizer once.
    """
    global _tokenizer, _session
    if _session is not None:
        return

    _tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    _session = ort.InferenceSession(
        MODEL_PATH,
        providers=["CPUExecutionProvider"],
    )
    print(" ONNX Emotion model loaded successfully ")


def _softmax(x: np.ndarray) -> np.ndarray:
    e_x = np.exp(x - np.max(x))
    return e_x / e_x.sum(axis=-1, keepdims=True)


def _preprocess(text: str) -> str:
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
    if _session is None:
        load_model()

    clean = _preprocess(text)
    inputs = _tokenizer(
        clean,
        truncation=True,
        max_length=256,
        return_tensors="np",
    )

    ort_inputs = {k: v for k, v in inputs.items()}
    logits = _session.run(None, ort_inputs)[0]

    probs = _softmax(logits)[0]
    scores = { _id2label[i].lower(): float(probs[i]) for i in range(len(probs)) }

    top_idx = int(np.argmax(probs))
    top_label = _id2label[top_idx].lower()
    top_prob = float(probs[top_idx])

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
