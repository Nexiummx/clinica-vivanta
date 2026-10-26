import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const TEXT =
  "En Vivanta la consulta dura lo que tiene que durar. Te escuchamos y te vas con un plan por escrito.";

function Word({ word, i, total, progress }: { word: string; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total;
  const opacity = useTransform(progress, [start, start + 1 / total], [0.18, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

export function InkStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = TEXT.split(" ");

  return (
    <section className="ap-statement" aria-label="Cómo atendemos">
      <p ref={ref}>
        {reduce
          ? TEXT
          : words.map((w, i) => (
              <Word key={`${w}-${i}`} word={w} i={i} total={words.length} progress={scrollYProgress} />
            ))}
      </p>
    </section>
  );
}
