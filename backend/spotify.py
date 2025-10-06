# backend/spotify.py

import json, os

mock_data_path = os.path.join(os.path.dirname(__file__), "spotify_mock.json")

def get_playlists(mood: str):
    mood = mood.lower()
    try:
        with open(mock_data_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        print("Error loading spotify_mock.json:", e)
        return []

    # ✅ Expanded mood mapping
    playlists = data.get(mood)
    if playlists:
        return playlists

    # fallback for unknown moods
    return data.get("default", [])
