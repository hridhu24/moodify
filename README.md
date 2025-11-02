# 🎧 Moodify — AI-Powered Mood-Based Music & Anime Recommender

**Moodify** is a full-stack web app that detects a user’s emotion from text and instantly recommends **Spotify playlists** and **anime titles** matching that mood.  
Built with **FastAPI**, **React**, **Tailwind**, and a lightweight **ONNX emotion model**, the app delivers real-time recommendations across desktop and mobile.

---

## 🚀 Features

### 🧠 Emotion Detection (ONNX)
- DistilBERT model quantized to ONNX (~60 MB) for fast inference  
- Classifies emotions like *happy, sad, angry, relaxed, stressed, excited*  
- Deployed on **Render** (PyTorch-free lightweight backend)

### 🎵 Spotify Integration
- Live playlists fetched via **Spotify Web API (Client Credentials flow)**  
- Auto-maps each mood → curated playlist query  
- Graceful fallback when Spotify API is unavailable

### 🎬 Anime Recommendations
- Mood-aligned anime suggestions displayed beside playlists  
- Structured JSON response from backend

### 🌗 Modern UI (React + Tailwind)
- Light/Dark theme toggle with persistent preference  
- Responsive layout optimized for phones and desktops  
- Smooth background transitions & dynamic hero section

### ⚙️ Performance Enhancements
- **Cold-start warm-up:** Frontend pings `/ping` to wake backend on page load  
- Optimized CORS & environment variables for seamless Vercel ↔ Render communication  
- Error states & loaders to avoid blank screens

### 💾 Upcoming (Work in Progress)
- **Mood History Page** → log past moods & top playlists  
- Optional **Spotify user login (PKCE)** for personalized playback  
- Embedded Spotify player for in-app song previews  

---

## 🧩 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React (Create React App) + Tailwind CSS |
| Backend | FastAPI + ONNX Runtime |
| Model | DistilBERT emotion classifier (converted & quantized) |
| APIs | Spotify Web API, Anime data API |
| Hosting | Frontend → **Vercel**, Backend → **Render** |
| Extras | CORS middleware, Environment configs, Warm-up ping route |

---
### 🧾 License

MIT License © 2025 [hridhu24]

---



