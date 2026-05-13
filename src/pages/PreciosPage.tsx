import { useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";
import faqData from "@/data/faq.json";
import pricing from "@/data/pricing.json";

type Tab = "consultas" | "estudios" | "paquetes";

export function PreciosPage() {
  const [tab, setTab] = useState<Tab>("consultas");

  return (
    <div className="pb-24 pt-24">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Precios" }]} />
      <section className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
        <h1 className="font-display text-5xl leading-tight md:text-8xl">
          Precios <span className="italic text-viv-accent">transparentes.</span>
        </h1>
        <p className="mt-4 max-w-xl text-viv-secondary">Sin sorpresas, sin letras chiquitas.</p>

        <div className="mt-8 inline-flex rounded-full border border-viv-border bg-white/80 p-1">
          {(
            [
              ["consultas", "Consultas"],
              ["estudios", "Estudios"],
              ["paquetes", "Paquetes"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={`min-h-[44px] rounded-full px-5 text-sm font-medium ${
                tab === k ? "bg-viv-accent text-white" : "text-viv-secondary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "consultas" && (
          <div className="viv-glass-fallback mt-10 overflow-x-auto rounded-2xl border border-white/40 bg-white/75 backdrop-blur-[16px]">
            <table className="min-w-[640px] w-full text-left text-sm">
              <thead>
                <tr className="border-b border-viv-border font-mono text-[10px] uppercase tracking-widest text-viv-accent">
                  <th className="p-4">Especialidad</th>
                  <th className="p-4">Primera</th>
                  <th className="p-4">Subsecuente</th>
                  <th className="p-4">Urgencia</th>
                </tr>
              </thead>
              <tbody>
                {pricing.consultas.map((row: { especialidad: string; primera: number; subsecuente: number; urgencia: number }) => (
                  <tr key={row.especialidad} className="border-b border-viv-border/80 hover:bg-viv-accentSoft/30">
                    <td className="p-4 font-medium text-viv-text">{row.especialidad}</td>
                    <td className="p-4">${row.primera}</td>
                    <td className="p-4">${row.subsecuente}</td>
                    <td className="p-4">${row.urgencia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "estudios" && (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pricing.estudios.map((e: { nombre: string; precio: number; descripcion: string }) => (
              <div key={e.nombre} className="rounded-2xl border border-viv-border bg-viv-surface p-6 shadow-vivSm">
                <p className="font-display text-xl">{e.nombre}</p>
                <p className="mt-2 text-2xl font-medium text-viv-accent">${e.precio}</p>
                <p className="mt-2 text-sm text-viv-secondary">{e.descripcion}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "paquetes" && (
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {pricing.paquetes.map((p: { id: string; nombre: string; precio: number; descripcion: string; items: string[]; destacado?: boolean }) => (
              <div
                key={p.id}
                className={`relative flex flex-col rounded-3xl border p-8 shadow-vivMd ${
                  p.destacado ? "border-viv-accent bg-viv-accentSoft/40" : "border-viv-border bg-white/80"
                }`}
              >
                {p.destacado && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-viv-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Más popular
                  </span>
                )}
                <p className="font-display text-2xl">{p.nombre}</p>
                <p className="mt-2 text-3xl text-viv-text">${p.precio.toLocaleString("es-MX")}</p>
                <p className="mt-2 text-sm text-viv-secondary">{p.descripcion}</p>
                <ul className="mt-6 flex-1 space-y-2 text-sm">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="text-viv-accent">✓</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 flex flex-wrap justify-center gap-4 text-sm text-viv-muted">
          {["GNP", "AXA", "MetLife", "Mapfre"].map((x) => (
            <span key={x} className="font-display">
              {x}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <h2 className="font-display text-2xl">Pagos</h2>
          <FaqAccordion items={faqData.pagos as { q: string; a: string }[]} />
        </div>

        <Link to="/agendar" className="mt-12 inline-flex min-h-[48px] items-center rounded-full bg-viv-accent px-8 text-sm font-semibold text-white">
          Agenda tu cita
        </Link>
      </section>
    </div>
  );
}
