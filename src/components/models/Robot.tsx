import { useState } from "react";
import Spline from "@splinetool/react-spline";

import Loader from "../Loaders/Loader";

const Robot = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState("hidden");

  const handleLoad = () => {
    setShow("");
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="relative h-[100vh] w-screen">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
          <Loader />
        </div>
      )}
      <Spline
        className={`${show}`}
        scene="https://prod.spline.design/GpYe3ew1vnNP2Fyl/scene.splinecode"
        onLoad={handleLoad}
      />
    </main>
  );
};

export default Robot;
