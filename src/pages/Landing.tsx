import { CommandBox } from "@/components/CommandBox";
import Main from "@/components/Main";
import Main2 from "@/components/Main2";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useEffect, useRef } from "react";

const Landing = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
    });

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <main
      className="w-screen bg-black "
      ref={containerRef}
      data-scroll-container
    >
      <Main />
      <div
        className="bg-white w-screen h-[0.5px] shadow-2xl shadow-red-500 "
        data-scroll-section
      />
      <Main2 />
    </main>
  );
};

export default Landing;
