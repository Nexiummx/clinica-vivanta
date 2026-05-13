import { Link } from "react-router-dom";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VivImg } from "@/components/VivImg";

const gallery = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
];

export function NosotrosPage() {
  const [light, setLight] = useState<string | null>(null);

  return (
    <div className="pb-24 pt-24">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Nosotros" }]} />
      <section className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
        <h1 className="max-w-5xl font-display text-5xl leading-[1.02] tracking-tight md:text-8xl xl:text-9xl">
          Una década <span className="italic text-viv-accent">cuidando a Querétaro.</span>
        </h1>
        <p className="mt-8 max-w-3xl font-display text-2xl italic leading-snug text-viv-secondary md:text-3xl">
          Nacimos de la frustración con las filas interminables y las recetas de un minuto. Vivanta es
          un lugar donde la evidencia y la calidez comparten la misma agenda.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {[
            { y: "2012", t: "Fundación", d: "Primer consultorio en Centro Histórico." },
            { y: "2016", t: "Expansión", d: "Se suman pediatría y nutrición." },
            { y: "2019", t: "Certificación", d: "Procesos COFEPRIS alineados (demo)." },
            { y: "2022", t: "Nuevo edificio", d: "8 especialidades bajo un mismo techo." },
          ].map((h) => (
            <div key={h.y} className="rounded-2xl border border-viv-border bg-viv-surface p-6">
              <p className="font-display text-4xl text-viv-accent">{h.y}</p>
              <p className="mt-2 font-display text-2xl">{h.t}</p>
              <p className="mt-2 text-sm text-viv-secondary">{h.d}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-20 font-display text-4xl">Valores</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Empatía", "Escucha sin juicio."],
            ["Excelencia", "Protocolos actualizados."],
            ["Tecnología", "Cuando aporta claridad."],
            ["Cercanía", "Misma ciudad, mismo equipo."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-viv-border bg-viv-surfaceAlt p-5">
              <p className="font-display text-xl">{t}</p>
              <p className="mt-2 text-sm text-viv-secondary">{d}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-20 font-display text-4xl">Tour virtual</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {gallery.map((src) => (
            <button
              type="button"
              key={src}
              className="relative aspect-[4/3] overflow-hidden rounded-xl"
              onClick={() => setLight(src)}
            >
              <VivImg src={src} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      </section>

      {light && (
        <button
          type="button"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6"
          onClick={() => setLight(null)}
        >
          <VivImg src={light} alt="" className="max-h-[90vh] max-w-full rounded-lg object-contain" />
        </button>
      )}

      <section className="mx-auto mt-16 max-w-[1440px] px-6 md:px-8 xl:px-16">
        <h2 className="font-display text-3xl">Compromiso social</h2>
        <p className="mt-4 max-w-2xl text-sm text-viv-secondary">
          Campañas de vacunación en comunidades cercanas y consulta pro-bono mensual (ficción para
          demo).
        </p>
        <Link to="/especialidades" className="mt-8 inline-block text-sm font-semibold text-viv-accent">
          Conoce nuestras especialidades →
        </Link>
      </section>
    </div>
  );
}
