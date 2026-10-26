import { useEffect, useRef, type RefObject } from "react";
import { Link } from "react-router-dom";
import faqData from "@/data/faq.json";
import { doctorsList } from "@/lib/vivanta/data";
import { BookingScene } from "./BookingScene";
import { ClinicBento } from "./ClinicBento";
import { HeroWindow } from "./HeroWindow";
import { InkStatement } from "./InkStatement";
import { SpecialtiesRail } from "./SpecialtiesRail";

/** Marca con `is-in` cada [data-reveal] la primera vez que entra en vista. */
function useReveal(root: RefObject<HTMLElement>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [root]);
}

const faq = faqData.general as { q: string; a: string }[];

export function VivantaHome() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  return (
    <div ref={root}>
      <HeroWindow />
      <InkStatement />
      <BookingScene />
      <SpecialtiesRail />
      <ClinicBento />

      <section className="ap-section ap-wrap" style={{ paddingTop: 0 }} aria-labelledby="team-title">
        <div className="ap-specs__top" style={{ paddingInline: 0 }}>
          <h2 id="team-title" className="ap-head" data-reveal>
            Médicos que escuchan.
          </h2>
          <Link to="/equipo" className="ap-more" data-reveal style={{ ["--i" as string]: 1 }}>
            Conoce a los doce
          </Link>
        </div>
        <div className="ap-team">
          {doctorsList.slice(0, 4).map((d, i) => (
            <Link key={d.id} to={`/equipo/${d.slug}`} data-reveal style={{ ["--i" as string]: i }}>
              <figure>
                <img src={d.foto} alt={d.nombre} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
              </figure>
              <h3>{d.nombre}</h3>
              <p>
                {d.especialidad} · {d.añosExperiencia} años de experiencia
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="ap-section ap-wrap" style={{ background: "var(--ap-alt)" }} aria-labelledby="faq-title">
        <h2 id="faq-title" className="ap-head" style={{ textAlign: "center" }} data-reveal>
          Preguntas frecuentes
        </h2>
        <div className="ap-faq">
          {faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="ap-close ap-on-dark" aria-labelledby="close-title">
        <h2 id="close-title" className="ap-head" data-reveal>
          Agenda hoy.
        </h2>
        <p data-reveal style={{ ["--i" as string]: 1 }}>
          Elige especialidad, médico y hora. Te confirmamos por WhatsApp con todo lo que necesitas
          para tu consulta.
        </p>
        <div className="ap-close__actions" data-reveal style={{ ["--i" as string]: 2 }}>
          <Link to="/agendar" className="ap-pill ap-pill--light">
            Agendar cita
          </Link>
          <a href="tel:+524421234567" className="ap-more">
            Llamar al (442) 123 4567
          </a>
        </div>
      </section>
    </div>
  );
}
