import { useEffect, useState } from "react";
import PlaylistCard from "../components/PlaylistCard";
import AnimeCard from "../components/AnimeCard";

function Recommendations({ mood }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

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

  if (!mood) return null;
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"></span>
        <p className="ml-3 text-lightgrey">Fetching recommendations…</p>
      </div>
    );
  }
  if (error) return <p className="text-red-500 text-center">⚠️ {error}</p>;

  return (
    <div className="mt-8 space-y-12">
      {/* Spotify playlists */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-font-l-color dark:text-font-d-color flex items-center gap-2">
          🎵 Spotify Playlists
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.playlists.length > 0 ? (
            data.playlists.map((p) => <PlaylistCard key={p.id} playlist={p} />)
          ) : (
            <p className="text-gray-500">No playlists found for this mood.</p>
          )}
        </div>
      </section>

      {/* Anime suggestions */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-font-l-color dark:text-font-d-color flex items-center gap-2">
          🎬 Anime Suggestions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.anime.length > 0 ? (
            data.anime.map((a) => <AnimeCard key={a.id} anime={a} />)
          ) : (
            <p className="text-gray-500">No anime suggestions found.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Recommendations;
