import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-white/80 via-white/30 to-transparent dark:from-[#1a1a1a]/80 dark:via-[#1a1a1a]/30 dark:to-transparent backdrop-blur-xl transition-all duration-500">
      <div className="w-full flex justify-between items-center px-8 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Moodify Logo" className="h-12 w-auto md:h-12" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
          <ThemeToggle />
        </div>

        {/* Mobile Right Side: Toggle + Menu */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-white/30 dark:hover:bg-white/10 transition"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 max-w-[85%]
        bg-white/75 dark:bg-[#1f1f1f]/70
          backdrop-blur-2xl border-l border-white/20 dark:border-white/10
          shadow-[0_8px_40px_rgba(183,110,246,0.3)]
          transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{
          boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.2)", // soft inner glass glow
        }}
      >
        <div
          className={`flex flex-col h-full px-4 py-6 transform transition-all duration-700 ease-out ${
          open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
          }`}
        >
          <div className="h-16 px-4 flex items-center justify-between">
          <span className="text-lg font-semibold bg-gradient-to-r from-button-1 to-button-2 bg-clip-text text-transparent">
            Menu
          </span>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        </div>
        {/* Header inside drawer */}
        

        <nav className="px-4 py-4 flex flex-col gap-2">
          <MobileLink to="/" onClick={() => setOpen(false)}>Home</MobileLink>
          <MobileLink to="/about" onClick={() => setOpen(false)}>About</MobileLink>
        </nav>

        
      </aside>
    </nav>
  );
}

/* Reusable Nav Links (desktop) */
function NavLinks() {
  const base =
    "font-medium hover:text-button-1 transition-colors drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]";
  const active = "text-button-2";
  return (
    <ul className="flex items-center gap-6">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? `${base} ${active}` : base)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? `${base} ${active}` : base)}
        >
          About
        </NavLink>
      </li>
    </ul>
  );
}

/* Mobile Nav Links */
/* Mobile Nav Links */
function MobileLink({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-5 py-3 text-base font-medium rounded-xl
         bg-white/40 dark:bg-white/10
         backdrop-blur-md
         border border-white/30 dark:border-white/10
         shadow-[0_4px_20px_rgba(183,110,246,0.25)]
         transition-all duration-200 ease-in-out
         hover:scale-[1.02] hover:shadow-[0_6px_24px_rgba(183,110,246,0.35)]
         ${
           isActive
             ? "bg-gradient-to-r from-button-1/90 to-button-2/90 text-white shadow-[0_4px_20px_rgba(183,110,246,0.5)]"
             : "text-font-l-color dark:text-font-d-color"
         }`
      }
    >
      {children}
    </NavLink>
  );
}
