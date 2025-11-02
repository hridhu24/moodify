# backend/spotify.py
import os, time, requests

SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_SEARCH_URL = "https://api.spotify.com/v1/search"

CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

# simple in-memory token cache
_token = None
_expires_at = 0

def _get_app_token():
    global _token, _expires_at
    now = int(time.time())
    if _token and now < _expires_at - 30:
        return _token

    r = requests.post(
        SPOTIFY_TOKEN_URL,
        data={"grant_type": "client_credentials"},
        auth=(CLIENT_ID, CLIENT_SECRET),
        timeout=10,
    )
    r.raise_for_status()
    data = r.json()
    _token = data["access_token"]
    _expires_at = now + int(data.get("expires_in", 3600))
    return _token

def _search_playlists(query: str, limit: int = 8):
    token = _get_app_token()
    headers = {"Authorization": f"Bearer {token}"}
    params = {"q": query, "type": "playlist", "limit": limit}

    r = requests.get(SPOTIFY_SEARCH_URL, headers=headers, params=params, timeout=10)
    r.raise_for_status()
    data = r.json()

    playlists = (data.get("playlists") or {}).get("items") or []

    out = []
    for p in playlists:
        if not isinstance(p, dict):
            continue  # skip malformed entries safely

        out.append({
            "id": p.get("id"),
            "name": p.get("name"),
            "image": (p.get("images") or [{}])[0].get("url"),
            "url": (p.get("external_urls") or {}).get("spotify"),
            "owner": (p.get("owner") or {}).get("display_name") or "Spotify",
        })
    return out


# Map app moods -> search terms
MOOD_TO_QUERY = {
    "happy": "happy vibes",
    "sad": "acoustic sad",
    "energetic": "workout pump",
    "relaxed": "chill lofi",
    "angry": "hard rock",
    "stressed": "stress relief",
    "excited": "party hits",
    "neutral": "focus lofi",
    "motivated": "motivation playlist",
    "default": "editorial picks"
}

def get_playlists(mood: str):
    q = MOOD_TO_QUERY.get((mood or "").lower(), MOOD_TO_QUERY["default"])
    return _search_playlists(q, limit=8)
