import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // ✅ icon library already available in Vite/React

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className={`
        p-3 rounded-full
        transition-all duration-300 ease-in-out
        bg-gradient-to-r from-button-1 to-button-2
        text-white shadow-[0_0_15px_rgba(183,110,246,0.4)]
        hover:shadow-[0_0_25px_rgba(251,123,213,0.6)]
        active:scale-95
      `}
      aria-label="Toggle Theme"
    >
      {dark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
}
