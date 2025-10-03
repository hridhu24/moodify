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
  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="mt-4 space-y-6">
      <section>
        <h2 className="text-xl font-bold mb-2">🎵 Spotify Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.playlists.map((p) => (
            <PlaylistCard key={p.id} playlist={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">🎬 Anime Suggestions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.anime.map((a) => (
            <AnimeCard key={a.id} anime={a} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Recommendations;
