from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

# Now predict_emotion uses HF API (lightweight!)
from advanced_emotion import predict_emotion
from recommendations import router as rec_router

app = FastAPI()


# -------------------------
# 🔥 HEALTH CHECK ENDPOINT
# -------------------------
@app.get("/ping")
def ping():
    return {"status": "ok", "message": "Server awake 🚀"}


# -------------------------
# 🔥 CORS SETTINGS
# -------------------------
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://moodify-ten-steel.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------
# 🔥 REQUEST BODY MODEL
# -------------------------
class MoodRequest(BaseModel):
    text: str


# -------------------------
# 🔥 MAIN EMOTION ENDPOINT
# -------------------------
@app.post("/mood")
def detect_mood(request: MoodRequest):
    text = request.text.strip()

    if not text:
        return {"error": "Empty input text"}

    # This now calls HuggingFace API (NO local model)
    out = predict_emotion(text)

    return {
        "engine": "huggingface-api",
        "label": out["label"],
        "mood": out["mood"],
        "scores": out["scores"],
    }


# -------------------------
# 🔥 RECOMMENDATION ROUTES
# -------------------------
app.include_router(rec_router, prefix="/api")
