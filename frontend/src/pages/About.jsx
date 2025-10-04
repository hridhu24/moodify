import { motion } from "framer-motion";

import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";
import p4 from "../assets/p4.png";
import p5 from "../assets/p5.png";
import p6 from "../assets/p6.png";




export default function About() {
  return (
    <section
      className="
        relative min-h-screen pt-32 pb-20 px-6
        font-poppins text-center overflow-hidden
        flex flex-col items-center
        bg-gradient-to-b from-button-1/20 via-button-2/10 to-transparent
      dark:from-button-2/20 dark:via-[#2C2C2C]/50 dark:to-transparent
      "
    >
      {/* 🌸 Floating Petals (Background Layer) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => {
          const petals = [p2, p3, p4, p5, p6];
          const randomPetal = petals[Math.floor(Math.random() * petals.length)];
          const startX = Math.random() * window.innerWidth;
          const endX = startX + (Math.random() * 200 - 100); // diagonal drift
          const rotation = Math.random() * 360;

          return (
            <motion.img
              key={i}
              src={randomPetal}
              alt="petal"
              className="absolute opacity-80"
              style={{
                width: `${40 + Math.random() * 80}px`,
                height: "auto",
                left: `${startX}px`,
                filter: "drop-shadow(0 2px 5px rgba(255,182,193,0.5))",
              }}
              initial={{
                y: -150,
                rotate: rotation,
              }}
              animate={{
                y: [0, window.innerHeight + 200],
                x: [
                  startX,
                  startX + Math.sin(i) * 50, // 🌬️ slight side sway left-right
                  endX,
                ],
                rotate: [rotation, rotation + 360],
                opacity: [0.9, 0.7, 0.9],
              }}
              transition={{
                duration: 20 + Math.random() * 10, // smoother fall (20–30s)
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 6,
              }}
            />
          );
        })}
      </div>

      {/* 🌸 Content Section (Foreground) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-5xl"
      >
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-font-l-color dark:text-font-d-color mb-6 drop-shadow-sm">
          About Moodify
        </h1>

        <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-lg mb-10 leading-relaxed">
          Welcome to <span className="font-semibold text-button-2">Moodify</span> — where your
          feelings turn into personalized recommendations!  
          Discover music & anime tailored to your digital emotional world.
        </p>

        {/* Cards */}
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {/* What is Moodify */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white/50 dark:bg-darkgrey/60 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 rounded-about-card shadow-soft p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-button-2 mb-3">What is Moodify?</h2>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              Moodify is an <span className="font-semibold">AI-powered web app</span> that detects your mood 
              using text input and recommends Spotify playlists & anime.  
              It’s your cozy corner for digital comfort! 💫
            </p>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white/50 dark:bg-darkgrey/60 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 rounded-about-card shadow-soft p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-button-2 mb-3">How It Works</h2>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              You type how you feel. Our <span className="font-semibold">AI (NLP)</span> analyzes your mood.  
              We connect with <span className="font-semibold">Spotify</span> & <span className="font-semibold">AniList APIs</span>  
              to fetch recommendations matching your vibe — all in a soft, pastel interface. 🎵🎬
            </p>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/50 dark:bg-darkgrey/60 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 rounded-about-card shadow-soft p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-button-2 mb-3">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              To blend <span className="font-semibold">technology with heart</span> — providing a fun and relaxing way 
              to explore music & stories that resonate with your emotions.  
              Built with 💜 using <span className="font-semibold">FastAPI</span> + <span className="font-semibold">React</span> — 
              for a world that listens to your mood.
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          © 2025 Moodify. Crafted with 💜 & pastel dreams.
        </p>
      </motion.div>
    </section>
  );
}
