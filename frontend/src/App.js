import { useState } from "react";
import MoodInput from "./components/MoodInput";
import Recommendations from "./pages/Recommendations";

function App() {
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
    <div className="App">
      <h1>Moodify 🎵</h1>

      <MoodInput onSubmit={handleMoodSubmit} />

      {loading && <p>Detecting mood...</p>}
      {error && <p className="error">{error}</p>}

      {mood && (
        <>
          <h2>Detected Mood: {mood}</h2>
          <Recommendations mood={mood} />
        </>
      )}
    </div>
  );
}

export default App;
