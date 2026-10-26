import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const HERO_IMG =
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=2000&q=80";

const words = ["Salud,", "sin", "prisa."];

export function HeroWindow() {
  const scene = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start end", "end end"] });

  const inset = useTransform(scrollYProgress, [0.25, 0.7], [12, 0]);
  const side = useTransform(scrollYProgress, [0.25, 0.7], [16, 0]);
  const radius = useTransform(scrollYProgress, [0.25, 0.7], [32, 0]);
  const clipPath = useTransform(
    [inset, side, radius],
    ([i, s, r]: number[]) => `inset(${i}% ${s}% ${i}% ${s}% round ${r}px)`,
  );
  const imgScale = useTransform(scrollYProgress, [0.25, 1], [1.18, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.68, 0.85], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.68, 0.85], [28, 0]);

  return (
    <>
      <section className="ap-hero" aria-labelledby="hero-title">
        <h1 id="hero-title">
          {words.map((w, i) => (
            <span key={w}>
              <span className="w" data-load style={{ ["--d" as string]: `${80 + i * 110}ms` }}>
                {w}
              </span>
              {i < words.length - 1 ? " " : null}
            </span>
          ))}
        </h1>
        <p className="ap-hero__lead" data-load style={{ ["--d" as string]: "420ms" }}>
          Clínica multiespecialidad en Querétaro. Ocho especialidades, un solo expediente y médicos
          que se toman el tiempo de explicarte.
        </p>
        <div className="ap-hero__actions" data-load style={{ ["--d" as string]: "540ms" }}>
          <Link to="/agendar" className="ap-pill">
            Agendar cita
          </Link>
          <Link to="/especialidades" className="ap-more">
            Ver especialidades
          </Link>
        </div>
      </section>

      <div className="ap-window" ref={scene} style={reduce ? { height: "auto" } : undefined}>
        <div
          className="ap-window__stage"
          style={reduce ? { position: "relative", height: "80svh" } : undefined}
        >
          <motion.div className="ap-window__frame" style={reduce ? undefined : { clipPath }}>
            <motion.img
              src={HERO_IMG}
              alt="Una médica sostiene la mano de su paciente durante la consulta"
              style={reduce ? undefined : { scale: imgScale }}
              referrerPolicy="no-referrer"
            />
            <motion.div
              className="ap-window__scrim"
              style={reduce ? undefined : { opacity: captionOpacity }}
            />
            <motion.div
              className="ap-window__caption"
              style={reduce ? undefined : { opacity: captionOpacity, y: captionY }}
            >
              <p>Pensado para calmarte.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
