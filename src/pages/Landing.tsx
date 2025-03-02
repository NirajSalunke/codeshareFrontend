import { CommandBox } from "@/components/CommandBox";
import { Footer } from "@/components/Footer";
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
      <div className="w-screen h-screen" data-scroll-section>
        <Main />
      </div>

      {/* <div
        className="bg-white w-screen h-[0.5px] shadow-2xl shadow-red-500 "
        data-scroll-section
      /> */}
      <div className="w-screen h-[2vh] bg-black" data-scroll-section></div>
      <div data-scroll-section className="w-screen h-screen">
        <Main2 />
      </div>
      {/* <div className="w-screen h-[15vh] bg-black" data-scroll-section></div> */}
      <div
        className="w-screen h-[60vh] flex  justify-center items-center "
        data-scroll-section
      >
        <Footer />
      </div>
    </main>
  );
};

export default Landing;
