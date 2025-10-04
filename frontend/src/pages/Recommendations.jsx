import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // ✅ for reading URL query params
import PlaylistCard from "../components/PlaylistCard";
import AnimeCard from "../components/AnimeCard";
import FeelingCard from "../components/FeelingCard";


export default function Recommendations() {
  const location = useLocation();
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // ✅ Extract mood from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const moodParam = params.get("mood");
    if (moodParam) setMood(moodParam);
  }, [location]);

  // ✅ Fetch recommendations when mood is available
  useEffect(() => {
    if (!mood) return;

    setLoading(true);
    setError("");
    fetch(`http://127.0.0.1:8000/api/recommend/${mood}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recommendations");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [mood]);

  // ✅ Loading state
  if (!mood)
    return (
      <p className="text-center text-gray-500 mt-10">
        No mood detected — please return to home.
      </p>
    );

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"></span>
        <p className="ml-3 text-lightgrey">Fetching recommendations…</p>
      </div>
    );
  }

  if (error)
    return <p className="text-red-500 text-center mt-10">⚠️ {error}</p>;

  // ✅ Main UI
  return (
    <div className="pt-32 px-6 max-w-6xl mx-auto space-y-12">
      {/* ✅ Feeling Card at top */}
    <FeelingCard mood={mood} />

      {/* Spotify playlists */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-font-l-color dark:text-font-d-color flex items-center gap-2">
          🎵 Spotify Playlists
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.playlists?.length > 0 ? (
            data.playlists.map((p) => <PlaylistCard key={p.id} playlist={p} />)
          ) : (
            <p className="text-gray-500">No playlists found for this mood.</p>
          )}
        </div>
      </section>

      {/* Anime suggestions */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-font-l-color dark:text-font-d-color flex items-center gap-2">
          🎬 Anime Suggestions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.anime?.length > 0 ? (
            data.anime.map((a) => <AnimeCard key={a.id} anime={a} />)
          ) : (
            <p className="text-gray-500">No anime suggestions found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
