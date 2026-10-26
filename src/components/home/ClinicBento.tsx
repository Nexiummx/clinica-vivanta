import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { animate, useInView, useReducedMotion } from "framer-motion";
import pricing from "@/data/pricing.json";
import { doctorsList, specialtiesList } from "@/lib/vivanta/data";

const money = (n: number) => `$${n.toLocaleString("es-MX")}`;

/** Cifra que rueda hasta su valor la primera vez que se ve. */
function Rolling({ to, prefix = "" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 25% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
    </span>
  );
}

export function ClinicBento() {
  const years = new Date().getFullYear() - 2012;

  return (
    <section className="ap-section ap-wrap" aria-labelledby="bento-title">
      <h2 id="bento-title" className="ap-head" data-reveal>
        Precios claros.
        <br />
        Sin sorpresas.
      </h2>

      <div className="ap-bento">
        <article className="ap-tile ap-tile--price" data-reveal>
          <h3>Primera consulta, por especialidad.</h3>
          <p>Los ves antes de reservar. Las consultas de seguimiento cuestan menos.</p>
          <ul className="ap-prices">
            {pricing.consultas.map((c) => (
              <li key={c.especialidad}>
                <span>{c.especialidad}</span>
                <span>{money(c.primera)}</span>
              </li>
            ))}
          </ul>
          <Link to="/precios" className="ap-more" style={{ marginTop: "1.5rem" }}>
            Ver precios de estudios
          </Link>
        </article>

        <article className="ap-tile ap-tile--photo" data-reveal style={{ ["--i" as string]: 1 }}>
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80"
            alt="Recepción luminosa de la clínica"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </article>

        <article className="ap-tile ap-tile--dark ap-tile--half" data-reveal style={{ ["--i" as string]: 2 }}>
          <h3>Años en Querétaro</h3>
          <p>Abrimos en 2012 en el centro de la ciudad.</p>
          <span className="ap-figure">
            <Rolling to={years} />
          </span>
        </article>

        <article className="ap-tile ap-tile--third" data-reveal>
          <h3>Especialidades</h3>
          <p>Bajo un mismo techo y un mismo expediente.</p>
          <span className="ap-figure">
            <Rolling to={specialtiesList.length} />
          </span>
        </article>

        <article className="ap-tile ap-tile--accent ap-tile--third" data-reveal style={{ ["--i" as string]: 1 }}>
          <h3>Médicos</h3>
          <p>Con cédula profesional publicada en su perfil.</p>
          <span className="ap-figure">
            <Rolling to={doctorsList.length} />
          </span>
        </article>

        <article className="ap-tile ap-tile--third" data-reveal style={{ ["--i" as string]: 2 }}>
          <h3>Estudios en clínica</h3>
          <p>Laboratorio, imagen y cardiología, con precio publicado.</p>
          <span className="ap-figure">
            <Rolling to={pricing.estudios.length} />
          </span>
        </article>
      </div>
    </section>
  );
}
