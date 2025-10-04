import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav
      className="
        fixed top-0 left-0 w-full 
        bg-white/40 dark:bg-[#1a1a1a]/40 
        backdrop-blur-lg backdrop-saturate-150 
        shadow-[0_4px_20px_rgba(0,0,0,0.05)]
        border-b border-white/20 dark:border-gray-700/30
        z-50
        font-poppins
      "
    >
      <div className="w-full flex justify-between items-center px-8 py-3">
        
        {/* ---- Left: Logo ---- */}
        <img
          src={logo}
          alt="Moodify Logo"
          className="h-12 w-auto md:h-14 lg:h-16 object-contain hover:scale-105 transition-transform duration-300"
        />

        {/* ---- Right: Links + Theme Toggle ---- */}
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-8 font-semibold text-lg text-font-l-color dark:text-font-d-color">
            <li>
              <Link
                to="/"
                className="hover:text-button-1 transition-all duration-200 hover:scale-105"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-button-2 transition-all duration-200 hover:scale-105"
              >
                About
              </Link>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
