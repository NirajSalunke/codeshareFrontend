import Robot from "@/components/models/Robot";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useEffect, useRef } from "react";

const Landing = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true, // Enable smooth scrolling
    });

    // Cleanup on component unmount
    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <main
      className="w-screen bg-black"
      ref={containerRef}
      data-scroll-container
    >
      <div className="h-screen overflow-clip w-full" data-scroll-section>
        <Robot />
      </div>
      <div className="w-full h-screen" data-scroll-section></div>
    </main>
  );
};

export default Landing;
