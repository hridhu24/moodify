import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimeCard from "./components/AnimeCard";
import MoodInput from "./components/MoodInput";

function getMoodEmoji(mood) {
  const map = {
    happy: "😊",
    sad: "😢",
    stressed: "😫",
    relaxed: "😌",
    motivated: "💪",
    neutral: "😐",
  };
  return map[mood] || "❓";
}

function App() {
  const [mood, setMood] = useState("");
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    if (!mood) return;

    async function fetchAnime() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/recommend`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: mood }),
        });
        const data = await res.json();
        setAnime(data.anime || []);
      } catch (err) {
        console.error(err);
        setAnime([]);
      }
    }

    fetchAnime();
  }, [mood]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-slate-800">Moodify</h1>
          <p className="text-slate-600 mt-2">Type how you feel and get cozy recommendations ✨</p>
        </header>

        <MoodInput onMoodDetected={setMood} />

        {mood && (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">
              Detected mood: <span className="text-indigo-600">{mood}</span>
              <motion.span
                className="ml-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {getMoodEmoji(mood)}
              </motion.span>
            </h2>
          </div>
        )}

        {anime.length > 0 && (
          <section>
            <h3 className="text-xl font-medium mb-3">Anime Recommendations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {anime.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <AnimeCard item={a} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
