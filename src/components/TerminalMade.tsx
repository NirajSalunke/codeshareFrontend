import { useRef } from "react";
import { AnimatedSpan, Terminal, TypingAnimation } from "./magicui/terminal";
import { useInView } from "framer-motion";

export function TerminalMade() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <div ref={ref} className="w-full h-full flex justify-center items-center">
      {isInView && (
        <Terminal className="h-full w-full">
          <TypingAnimation>&gt; Why use CodeShare?</TypingAnimation>

          <AnimatedSpan delay={1500} className="text-green-500">
            <span>✔ No sign-ups required.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={2000} className="text-green-500">
            <span>✔ Instant code sharing.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={2500} className="text-green-500">
            <span>✔ Secure rooms.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={3000} className="text-green-500">
            <span>✔ No data tracking.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={3500} className="text-green-500">
            <span>✔ Supports multiple programming languages.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={4000} className="text-green-500">
            <span>✔ Works on any device.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={4500} className="text-green-500">
            <span>✔ Fast, simple, and lightweight.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={5000} className="text-green-500">
            <span>✔ Password-protected rooms.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={5500} className="text-blue-500">
            <span>ℹ Code shared successfully!</span>
          </AnimatedSpan>

          <TypingAnimation delay={6000} className="text-muted-foreground">
            Share your Room id and password to collaborate!
          </TypingAnimation>
        </Terminal>
      )}
    </div>
  );
}
