import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Moodify 🎵</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type how you feel..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Detect Mood</button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Mood: {result.mood}</h2>
          <h3>Anime Recommendations:</h3>
          <ul>
            {result.anime && result.anime.length > 0 ? (
              result.anime.map((a, i) => (
                <li key={i}>
                  <a href={a.url} target="_blank" rel="noopener noreferrer">
                    {a.title}
                  </a>
                </li>
              ))
            ) : (
              <p>No recommendations found</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
