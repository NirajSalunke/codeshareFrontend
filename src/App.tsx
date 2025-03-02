import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import Room from "./pages/Room";
import File from "./pages/File";
import CurMobView from "./components/CurMobView";
const backend_url = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    // Function to make the backend request
    const fetchBackend = async () => {
      try {
        const response = await fetch(`${backend_url}/home`);
        const data = await response.json();
        console.log("Backend response:", data);
      } catch (error) {
        console.error("Error fetching backend:", error);
      }
    };
    fetchBackend();
    const interval = setInterval(fetchBackend, 600000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <CurMobView />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/room" element={<Room />} />
        <Route path="/room/file" element={<File />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
