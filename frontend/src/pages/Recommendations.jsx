import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // ✅ for reading URL query params
import PlaylistCard from "../components/PlaylistCard";
import AnimeCard from "../components/AnimeCard";
import FeelingCard from "../components/FeelingCard";
import Loader from "../components/Loader";


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
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <Loader />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">

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
