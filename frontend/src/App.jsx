import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import bgLight from "./assets/bg_light.jpg";
import bgDark from "./assets/bg_dark_1.png";

function App() {
  return (
    <Router>
      {/* Wrapper with relative positioning */}
      <div className="min-h-screen relative text-black dark:text-white">
        {/* Light background */}
        <div
          className="absolute inset-0 bg-cover bg-top opacity-85 dark:hidden"
          style={{ backgroundImage: `url(${bgLight})` }}
        />
        {/* Dark background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 hidden dark:block"
          style={{ backgroundImage: `url(${bgDark})` }}
        />

        {/* Main content (above background) */}
        <div className="relative z-10 min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
