function PlaylistCard({ playlist }) {
  return (
    <a
      href={playlist.url}
      target="_blank"
      rel="noreferrer"
      className="block border rounded p-2 hover:shadow-lg"
    >
      <img
        src={playlist.image}
        alt={playlist.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-2 font-semibold">{playlist.name}</h3>
      <p className="text-sm text-gray-500">{playlist.owner}</p>
    </a>
  );
}

export default PlaylistCard;
