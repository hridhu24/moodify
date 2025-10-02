import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimeCard from "./components/AnimeCard";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:8000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-slate-800">Moodify</h1>
          <p className="text-slate-600 mt-2">Type how you feel and get cozy recommendations ✨</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white/70 p-4 rounded-2xl shadow-sm mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="I'm feeling..."
            className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            rows={3}
          />
          <div className="flex justify-end mt-3">
            <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
              Detect Mood
            </button>
          </div>
        </form>

        {isLoading && <LoadingSpinner />}

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {result && (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Detected mood: <span className="text-indigo-600">{result.mood}</span></h2>
            </div>

            <section>
              <h3 className="text-xl font-medium mb-3">Anime Recommendations</h3>
              {result.anime && result.anime.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.anime.map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }} // ✅ staggered animation
                    >
                      <AnimeCard item={a} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600">No anime found — try different text.</p>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
