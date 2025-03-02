import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Room from "./pages/Room";

import File from "./pages/File";

const App = () => {
  return (
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
