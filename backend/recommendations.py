from fastapi import APIRouter
from anilist import get_anime_by_mood
from spotify import get_playlists

router = APIRouter()

@router.get("/recommend/{mood}")
def recommend(mood: str):
    playlists = get_playlists(mood)
    anime = get_anime_by_mood(mood)
    return {"playlists": playlists, "anime": anime}
