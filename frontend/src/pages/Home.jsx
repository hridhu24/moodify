import { useState } from "react";
import MoodInput from "../components/MoodInput";
import Recommendations from "./Recommendations";

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
    <section className="pt-20 px-4 max-w-5xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6 text-font-l-color dark:text-font-d-color">
        What’s your mood today?
      </h1>

      <MoodInput onSubmit={handleMoodSubmit} />

      {loading && <p className="mt-4 text-lightgrey">Detecting mood...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {mood && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Feeling: <span className="text-font-l-color dark:text-font-d-color">{mood}</span>
          </h2>
          <Recommendations mood={mood} />
        </div>
      )}
    </section>
  );
}
