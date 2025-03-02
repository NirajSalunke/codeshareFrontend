import "locomotive-scroll/dist/locomotive-scroll.css";
import { MorphingText } from "./magicui/morphing-text";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { TerminalMade } from "./TerminalMade";
const Main2 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const texts = [
    "CodeShare",
    "Share your Code Anonymously",
    "Much Faster",
    "More Easier.",
  ];

  return (
    <div className="w-full h-full flex flex-col gap-15 " ref={ref}>
      <div className="w-full h-[20vh] flex justify-center items-center">
        {isInView && <MorphingText texts={texts} />}
      </div>
      <div className="w-full h-[75vh]">
        {/* {isInView && <TerminalMade />} */}
        <TerminalMade />
      </div>
    </div>
  );
};

export default Main2;
