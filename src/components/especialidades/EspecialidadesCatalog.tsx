import { VivImg } from "@/components/VivImg";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { specialtiesList } from "@/lib/vivanta/data";
import { SpecialtyGlyph } from "@/components/SpecialtyGlyph";
import { staggerContainer, staggerItem, whileInViewOpts } from "@/lib/vivanta/animations";

const FILTERS = ["Todas", "Adultos", "Niños", "Preventivo", "Urgencias"] as const;

export function EspecialidadesCatalog() {
  const [tab, setTab] = useState<(typeof FILTERS)[number]>("Todas");

  const filtered = useMemo(() => {
    if (tab === "Todas") return specialtiesList;
    return specialtiesList.filter((s) => s.filtros.includes(tab));
  }, [tab]);

  return (
    <div className="pb-24 pt-24">
      <Breadcrumbs
        items={[{ label: "Inicio", href: "/" }, { label: "Especialidades" }]}
      />

      <section className="relative flex min-h-[60vh] flex-col justify-end px-6 pb-16 pt-12 md:px-8 xl:px-16">
        <div className="absolute inset-0 -z-10">
          <VivImg
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-viv-bg via-viv-bg/90 to-viv-bg" />
        </div>
        <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
          Especialidades
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[1.05] tracking-tight text-viv-text md:text-7xl xl:text-8xl">
          Cuidado experto, <span className="italic text-viv-accent">para cada necesidad.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-viv-secondary">
          Ocho departamentos coordinados en un solo edificio en Querétaro. Misma historia clínica,
          menos repeticiones.
        </p>
      </section>

      <div className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
        <div className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setTab(f)}
              className={`min-h-[44px] shrink-0 rounded-full border px-4 text-xs font-medium tracking-wide transition-[border,background,color] duration-[400ms] ease-viv ${
                tab === f
                  ? "border-viv-accent bg-viv-accent text-white"
                  : "border-viv-border bg-white/70 text-viv-secondary hover:border-viv-accent/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          initial="initial"
          whileInView="animate"
          viewport={whileInViewOpts}
          variants={staggerContainer}
        >
          {filtered.map((s) => (
            <motion.article
              key={s.id}
              variants={staggerItem}
              className="flex flex-col overflow-hidden rounded-3xl border border-white/40 bg-[rgba(255,255,255,0.75)] shadow-vivMd backdrop-blur-[20px]"
            >
              <div className="relative aspect-[4/3]">
                <VivImg src={s.imagen} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <SpecialtyGlyph name={s.icon} className="h-10 w-10 text-viv-accent" />
                <h2 className="mt-4 font-display text-3xl tracking-tight text-viv-text">{s.nombre}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-viv-secondary">
                  {s.descripcion}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-viv-text">
                  {s.tratamientos.slice(0, 4).map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-viv-accent">✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
                <Link to={`/especialidades/${s.slug}`}
                  className="mt-6 inline-flex min-h-[44px] items-center text-sm font-semibold text-viv-accent"
                >
                  Conocer más →
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-20 rounded-3xl border border-viv-border bg-viv-surfaceAlt p-8 text-center md:p-12">
          <p className="font-display text-2xl text-viv-text md:text-3xl">
            ¿No sabes qué especialista necesitas?
          </p>
          <p className="mt-2 text-sm text-viv-secondary">
            Un coordinador te orienta sin costo en línea.
          </p>
          <Link to="/contacto"
            className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-viv-accent px-8 text-sm font-semibold text-white transition-transform duration-[400ms] ease-viv hover:scale-[1.02]"
          >
            Hablar con recepción
          </Link>
        </div>
      </div>
    </div>
  );
}
