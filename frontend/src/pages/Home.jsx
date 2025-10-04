import { useState } from "react";
import Recommendations from "./Recommendations";
import MoodCard from "../components/MoodCard";

export default function Home() {
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMoodSubmit = async (text) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8000/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Failed to detect mood");
      const data = await res.json();
      setMood(data.mood);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-32 px-4 flex flex-col items-center justify-center">
      {/* ✅ Mood Card */}
      <MoodCard onSubmit={handleMoodSubmit} />

      {/* ✅ Loading & Error states */}
      {loading && <p className="mt-4 text-lightgrey">Detecting mood...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* ✅ Recommendations */}
      {mood && (
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6 text-font-l-color dark:text-font-d-color">
            Feeling: {mood}
          </h2>
          <Recommendations mood={mood} />
        </div>
      )}
    </section>
  );
}
