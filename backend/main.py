from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentiment import get_mood
from recommendations import get_anime_recommendation


app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MoodRequest(BaseModel):
    text: str

@app.post("/mood")
def detect_mood(request: MoodRequest):
    mood = get_mood(request.text)
    return {"mood": mood}

@app.post("/recommend")
def recommend(request: MoodRequest):
    mood = get_mood(request.text)  # use your existing VADER or ML function
    anime = get_anime_recommendation(mood)
    return {"mood": mood, "anime": anime}

