import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoodCard from "../components/MoodCard";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      navigate(`/recommendations?mood=${data.mood}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-32 md:pt-48 lg:pt-56 px-4 flex flex-col items-center justify-center">
      <MoodCard onSubmit={handleMoodSubmit} />

      {loading && <p className="mt-4 text-lightgrey">Detecting mood...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </section>
  );
}
