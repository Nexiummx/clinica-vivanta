import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VivImg } from "@/components/VivImg";
import { doctorsList } from "@/lib/vivanta/data";

const TABS = [
  "Todos",
  "Medicina general",
  "Pediatría",
  "Odontología",
  "Ortopedia",
  "Cardiología",
  "Ginecología",
  "Neurología",
  "Nutrición",
] as const;

export function EquipoCatalog() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Todos");

  const filtered = useMemo(() => {
    if (tab === "Todos") return doctorsList;
    return doctorsList.filter((d) => d.especialidad === tab);
  }, [tab]);

  return (
    <div className="pb-24 pt-24">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Equipo" }]} />
      <section className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
        <h1 className="max-w-5xl font-display text-5xl leading-[1.02] tracking-tight text-viv-text md:text-8xl xl:text-9xl">
          Personas, <span className="italic text-viv-accent">no diagnósticos.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-viv-secondary">
          Profesionales que escuchan, no solo recetan.
        </p>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`min-h-[44px] shrink-0 rounded-full border px-4 text-xs font-medium ${
                tab === t
                  ? "border-viv-accent bg-viv-accent text-white"
                  : "border-viv-border bg-white/80 text-viv-secondary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((d) => (
            <article key={d.id} className="flex flex-col">
              <Link to={`/equipo/${d.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-viv-surfaceAlt">
                  <VivImg
                    src={d.foto}
                    alt={d.nombre}
                    fill
                    className="object-cover grayscale transition-[filter] duration-[600ms] group-hover:grayscale-0"
                  />
                </div>
                <h2 className="mt-4 font-display text-xl text-viv-text">{d.nombre}</h2>
                <p className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">
                  {d.especialidad}
                </p>
                <p className="mt-1 text-sm text-viv-secondary">{d.añosExperiencia} años · Céd. {d.cedula}</p>
                <p className="mt-2 text-xs text-viv-muted">{d.idiomas.join(" · ")}</p>
                <span className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-viv-accent">
                  Ver perfil →
                </span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border border-viv-border bg-viv-surfaceAlt p-8 text-center">
          <p className="font-display text-2xl text-viv-text">Trabaja con nosotros</p>
          <p className="mt-2 text-sm text-viv-secondary">Vacantes clínicas y administrativas (demo).</p>
          <a
            href="mailto:hola@clinicavivanta.mx"
            className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-viv-accent px-6 text-sm font-semibold text-white"
          >
            Enviar CV
          </a>
        </div>
      </section>
    </div>
  );
}
