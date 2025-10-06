import { motion } from "framer-motion";
import happyIcon from "../assets/happy.png";
import sadIcon from "../assets/sad.png";
import angryIcon from "../assets/angry.png";
import stressedIcon from "../assets/stressed.png";
import relaxedIcon from "../assets/relaxed.png";
import motivatedIcon from "../assets/motivated.png";
import neutralIcon from "../assets/neutral.png";
import excitedIcon from "../assets/excited.png";

export default function FeelingCard({ mood }) {
  const moodAssets = {
    happy: {
      icon: happyIcon,
    },
    sad: {
      icon: sadIcon,
    },
    angry: {
      icon: angryIcon,
    },
    stressed: {
      icon: stressedIcon,
    },
    relaxed: {
      icon: relaxedIcon,
    },
    motivated: {
      icon: motivatedIcon,
    },
    excited: {
      icon: excitedIcon,
    },
    neutral: {
        icon: neutralIcon,
    }
  };

  const current = moodAssets[mood] || moodAssets.happy; // fallback

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`
        max-w-3xl w-full mx-auto
        bg-gradient-to-br ${current.bg}
        backdrop-blur-2xl
        rounded-card shadow-soft
        border border-white/20 dark:border-gray-700/20
        p-10 md:p-14 mt-10
        flex flex-col items-center justify-center text-center
        font-poppins
      `}
      style={{
        boxShadow: "inset 0 0 40px rgba(255,255,255,0.25)",
      }}
    >
      <h2 className="text-4xl font-bold text-font-l-color dark:text-font-d-color mb-6">
        You’re feeling
      </h2>

      {/* Mood Icon */}
      <img
        src={current.icon}
        alt={`${mood} icon`}
        className="w-32 h-32 md:w-36 md:h-36 mb-8 object-contain drop-shadow-xl animate-bounce-slow"

      />

      <p className="text-5xl font-semibold text-button-2 capitalize mb-4">
        {mood}
      </p>

      <p className="text-gray-600 dark:text-gray-300 text-lg">
        Here’s something to match your vibe 💫
      </p>
    </motion.div>
  );
}
