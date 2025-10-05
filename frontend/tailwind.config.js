/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html","./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        'relaxed-sm': '1.6',
      },
      fontSize: {
        'responsive-title': ['clamp(1.5rem, 5vw, 2.25rem)', '1.2'],
      },
      colors: {
        'nav-d-bg': '#2C2C2C',
        'card-l-bg':'#FCFCFC',
        'font-l-color':'#6F4E8D',
        'font-d-color':'#CF99FF',
        'white':'#FFFFFF',
        'black':'#000000',
        'button-1': '#FB7BD5',
        'button-2': '#B76EF6',
        'darkgrey': '#4D4D4D',
        'lightgrey': '#7F7F7F',
        'card-d-about-bg': '#030529',
      },
      boxShadow: {
        // Navbar & Mood card
        soft: "0 4px 10px rgba(0,0,0,0.05)",
        // Playlist card
        medium: "0 8px 20px rgba(0,0,0,0.08)",
        // Anime card (stronger depth)
        deep: "0 12px 30px rgba(0,0,0,0.12)",
        // Optional Spotify hover glow
        glow: "0 0 20px rgba(29,185,84,0.3)"
      },
      borderRadius: {
        'card': '125px',
        'input': '20px',
        'button': '60px',
        'mood-card': '58px',
        'about-card': '30px',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
