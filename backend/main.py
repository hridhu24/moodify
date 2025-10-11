from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from advanced_emotion import predict_emotion, load_model as load_advanced
from recommendations import router as rec_router

app = FastAPI()

# CORS setup
<<<<<<< HEAD
origins = ["http://localhost:3000", "http://127.0.0.1:3000", "https://moodify-ten-steel.vercel.app"]
=======
origins = ["http://localhost:3000", "http://127.0.0.1:3000", "https://moodify-flame-gamma.vercel.app/"]
>>>>>>> 0afe57f4f1fe41effd4999ceb31b748a8b2a374b
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the DistilBERT model at startup
@app.on_event("startup")
def _warmup():
    try:
        load_advanced()
        print("✅ DistilBERT model loaded successfully")
    except Exception as e:
        print("⚠️ Failed to load DistilBERT:", e)


class MoodRequest(BaseModel):
    text: str

@app.post("/mood")
def detect_mood(request: MoodRequest):
    text = request.text.strip()
    if not text:
        return {"error": "Empty input text"}

    # Always use advanced model
    out = predict_emotion(text)
    return {
        "engine": "advanced",
        "label": out["label"],
        "mood": out["mood"],
        "scores": out["scores"],
    }



# Recommendation routes
app.include_router(rec_router, prefix="/api")
