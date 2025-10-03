import React, { useState } from "react";

function MoodInput({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text); // pass text back to parent
    setText("");    // clear after submit
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
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
      >
        Detect Mood
      </button>
    </form>
  );
}

export default MoodInput;
