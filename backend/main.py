from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from recommendations import router as rec_router
from sentiment import get_mood
from pydantic import BaseModel

app = FastAPI()

# Allow frontend requests
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

# Route: mood detection
@app.post("/mood")
def detect_mood(request: MoodRequest):
    mood = get_mood(request.text)
    return {"mood": mood}

# Route group: recommendations (anime + playlists)
app.include_router(rec_router, prefix="/api")
