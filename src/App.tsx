import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Room from "./pages/Room";
import Navbar from "./components/Navbar";
import File from "./pages/File";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/room" && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/room" element={<Room />} />
          <Route path="/room/file" element={<File />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
