function AnimeCard({ anime }) {
  return (
    <a
      href={anime.url}
      target="_blank"
      rel="noreferrer"
      className="block border rounded p-2 hover:shadow-lg"
    >
      <img
        src={anime.image}
        alt={anime.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-2 font-semibold">{anime.title}</h3>
    </a>
  );
}

export default AnimeCard;
