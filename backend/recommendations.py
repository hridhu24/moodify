from fastapi import APIRouter
from pydantic import BaseModel
from advanced_emotion import predict_emotion
from anilist import get_anime_by_mood
from spotify import get_playlists

router = APIRouter()


# ---------- 1️⃣ GET: /api/recommend/{mood} ----------
@router.get("/recommend/{mood}")
def recommend_by_mood(mood: str):
    """Return playlists + anime for a given mood string."""
    playlists = get_playlists(mood)
    anime = get_anime_by_mood(mood)
    return {"mood": mood, "playlists": playlists, "anime": anime}


# ---------- 2️⃣ POST: /api/recommend ----------
class TextRequest(BaseModel):
    text: str


@router.post("/recommend")
def recommend_from_text(request: TextRequest):
    """
    Detect mood using DistilBERT, then return recommendations.
    """
    text = request.text.strip()
    if not text:
        return {"error": "Empty text"}

    # Detect mood
    out = predict_emotion(text)
    mood = out["mood"]

    # Fetch content
    playlists = get_playlists(mood)
    anime = get_anime_by_mood(mood)

    return {
        "engine": "advanced",
        "mood": mood,
        "label": out["label"],
        "scores": out["scores"],
        "playlists": playlists,
        "anime": anime,
    }
