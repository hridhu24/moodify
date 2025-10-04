import { motion } from "framer-motion";

export default function AnimeCard({ anime }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="
        bg-white/20 dark:bg-darkgrey/30
        backdrop-blur-xl
        border border-white/20 dark:border-gray-700/20
        shadow-soft rounded-lg
        p-5 flex flex-col items-center text-center
        transition-all duration-300 ease-in-out
        hover:shadow-[0_0_20px_rgba(183,110,246,0.3)]
        font-poppins
      "
    >
      {/* ✅ Responsive Anime Cover */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 rounded-lg overflow-hidden mb-4">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-full object-cover rounded-lg transform transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
      </div>

      {/* Anime Title */}
      <h3 className="text-lg font-semibold text-font-l-color dark:text-font-d-color mb-3 line-clamp-2">
        {anime.title}
      </h3>

      {/* Button */}
      <a
        href={anime.url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          bg-gradient-to-r from-button-1 to-button-2
          text-white font-semibold text-sm
          px-5 py-2 rounded-button
          shadow-[0_4px_15px_rgba(183,110,246,0.4)]
          hover:shadow-[0_0_25px_rgba(251,123,213,0.6)]
          hover:after:opacity-100
          active:scale-95
          transition-all duration-300 ease-in-out
          overflow-hidden
          hover:animate-[pulse-glow_1.5s_ease-in-out_infinite]
        "
      >
        View on AniList
      </a>
    </motion.div>
  );
}
