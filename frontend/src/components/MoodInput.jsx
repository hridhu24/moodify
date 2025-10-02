import React, { useState } from "react";

function MoodInput({ onMoodDetected }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      onMoodDetected(data.mood); // pass mood back to parent
    } catch (err) {
      console.error(err);
      onMoodDetected(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="How are you feeling?"
        className="border p-2 rounded"
        rows={3}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
      >
        {loading ? "Detecting..." : "Detect Mood"}
      </button>
    </form>
  );
}

export default MoodInput;
