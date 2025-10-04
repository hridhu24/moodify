import { useState } from "react";
import { motion } from "framer-motion"; // ✨ Import animation library

export default function MoodCard({ onSubmit }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    await onSubmit(text);
    setLoading(false);
    setText("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}         // 👈 start slightly transparent + below
      animate={{ opacity: 1, y: 0 }}          // 👈 fade in + slide up
      transition={{ duration: 0.8, ease: "easeOut" }} // 👈 smooth & elegant
      className="
        max-w-3xl w-full mx-auto
        backdrop-blur-2xl
        rounded-card shadow-soft
        border border-white/10 dark:border-gray-700/10
        p-10 md:p-14
        flex flex-col items-center justify-center 
        font-poppins
      "
      style={{
        boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.25)", // inner glow
      }}
    >
      {/* Title */}
      <h1 className="text-4xl font-semibold text-font-l-color dark:text-font-d-color mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
        What’s your mood today?
      </h1>

      {/* Input + Button */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 w-full max-w-xl"
      >
        {/* Input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts..."
          rows={3}
          className="
            w-full p-4
            bg-white/90 dark:bg-[#2C2C2C]/80
            border border-purple-200 dark:border-gray-600
            rounded-input shadow-[0_4px_10px_rgba(111,78,141,0.15)]
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-button-2/50
            text-gray-800 dark:text-white
            transition-all duration-200
          "
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            bg-gradient-to-r from-button-1 to-button-2
            text-white font-semibold text-lg
            px-8 py-3 rounded-button
            shadow-[0_4px_20px_rgba(183,110,246,0.4)]
            hover:shadow-[0_0_25px_rgba(251,123,213,0.6)]
            hover:after:opacity-100
            active:scale-95
            transition-all duration-300 ease-in-out
            overflow-hidden
            hover:animate-[pulse-glow_1.5s_ease-in-out_infinite]
          "
        >
          {loading ? "Detecting..." : "Moodify Me"}
        </button>
      </form>
    </motion.div>
  );
}
