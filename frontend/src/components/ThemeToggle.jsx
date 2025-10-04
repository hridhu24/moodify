import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) { root.classList.add("dark");  localStorage.setItem("theme","dark"); }
    else      { root.classList.remove("dark"); localStorage.setItem("theme","light"); }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(v => !v)}
      className="rounded-full px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 hover:opacity-90"
      title="Toggle theme"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
