import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { specialtiesList } from "@/lib/vivanta/data";

export function SpecialtiesRail() {
  const rail = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () =>
      setEdge({
        start: el.scrollLeft < 8,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const page = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="ap-specs ap-section" aria-labelledby="specs-title">
      <div className="ap-specs__top">
        <h2 id="specs-title" className="ap-head" data-reveal>
          Ocho especialidades.
        </h2>
        <Link to="/especialidades" className="ap-more" data-reveal style={{ ["--i" as string]: 1 }}>
          Ver todas
        </Link>
      </div>

      <div className="ap-rail" ref={rail} tabIndex={0} aria-label="Especialidades">
        {specialtiesList.map((s, i) => (
          <Link
            key={s.id}
            to={`/especialidades/${s.slug}`}
            className="ap-card"
            data-reveal
            style={{ ["--i" as string]: Math.min(i, 3) }}
          >
            <img src={s.imagen} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
            <div className="ap-card__scrim" aria-hidden />
            <div className="ap-card__text">
              <h3>{s.nombre}</h3>
              <p>{s.descripcionCorta}</p>
              <span>{s.tratamientos.slice(0, 3).join(" · ")}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="ap-rail__nav">
        <button type="button" className="ap-round" onClick={() => page(-1)} disabled={edge.start} aria-label="Anteriores">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
            <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="ap-round" onClick={() => page(1)} disabled={edge.end} aria-label="Siguientes">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
            <path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
