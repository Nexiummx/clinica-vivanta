import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Phone, SCREENS, STEPS } from "./PhoneScreens";

const push = { type: "spring", bounce: 0, duration: 0.5 } as const;

/** Lista estática: teléfonos y en movimiento reducido. */
function BookingList({ always = false }: { always?: boolean }) {
  return (
    <div className={always ? "ap-booking__list ap-booking__list--always" : "ap-booking__list"}>
      {STEPS.map((s, i) => {
        const Screen = SCREENS[i];
        return (
          <article key={s.title} data-reveal>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
            <Phone>
              <div className="ap-screen">
                <Screen />
              </div>
            </Phone>
          </article>
        );
      })}
    </div>
  );
}

export function BookingScene() {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(STEPS.length - 1, Math.max(0, Math.floor(p * STEPS.length)));
    setStep((prev) => {
      if (prev !== next) setDir(next > prev ? 1 : -1);
      return next;
    });
  });

  const phoneY = useTransform(scrollYProgress, [0, 0.08], [80, 0]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.08], [0.9, 1]);
  const stepProgress = useTransform(scrollYProgress, (p) => (p * STEPS.length) % 1);

  const Screen = SCREENS[step];

  return (
    <section className="ap-booking ap-on-dark" aria-labelledby="booking-title">
      <div className="ap-booking__intro">
        <h2 id="booking-title" className="ap-head" data-reveal>
          Tu cita, en un minuto.
        </h2>
        <p data-reveal style={{ ["--i" as string]: 1 }}>
          Reservas desde el teléfono, sin llamadas ni filas. Así se ve, paso a paso.
        </p>
      </div>

      {reduce ? (
        <BookingList always />
      ) : (
        <>
          <div className="ap-booking__track" ref={track}>
            <div className="ap-booking__stage">
              <ol className="ap-steps">
                {STEPS.map((s, i) => (
                  <li key={s.title} style={{ opacity: i === step ? 1 : 0.32 }} aria-current={i === step ? "step" : undefined}>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    {i === step ? (
                      <div className="ap-steps__bar" aria-hidden>
                        <motion.span style={{ scaleX: stepProgress }} />
                      </div>
                    ) : null}
                  </li>
                ))}
              </ol>

              <motion.div className="ap-phone-wrap" style={{ y: phoneY, scale: phoneScale }}>
                <Phone>
                  <AnimatePresence initial={false} custom={dir}>
                    <motion.div
                      key={step}
                      className="ap-screen"
                      custom={dir}
                      variants={{
                        enter: (d: number) => ({ x: d > 0 ? "100%" : "-30%", opacity: d > 0 ? 1 : 0.6 }),
                        center: { x: "0%", opacity: 1 },
                        exit: (d: number) => ({ x: d > 0 ? "-30%" : "100%", opacity: d > 0 ? 0.6 : 1 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={push}
                      style={{ background: "#f2f2f7", zIndex: dir > 0 ? 2 : 1 }}
                    >
                      <Screen />
                    </motion.div>
                  </AnimatePresence>
                </Phone>
              </motion.div>
            </div>
          </div>
          <BookingList />
        </>
      )}
    </section>
  );
}
