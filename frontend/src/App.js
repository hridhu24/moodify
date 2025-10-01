import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState("");

  const detectMood = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setMood(data.mood);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Moodify</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="How are you feeling today?"
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={detectMood} style={{ marginTop: "1rem" }}>
        Detect Mood
      </button>
      <h2>{mood && `Detected Mood: ${mood}`}</h2>
    </div>
  );
}

export default App;
