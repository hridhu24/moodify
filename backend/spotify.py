# backend/spotify.py
import json, os

def get_playlists(mood: str):
    mock_data_path = os.path.join(os.path.dirname(__file__), "spotify_mock.json")
    with open(mock_data_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data.get(mood.lower(), data["default"])
