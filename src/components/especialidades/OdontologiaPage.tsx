import { VivImg } from "@/components/VivImg";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { getDoctorsBySpecialtySlug, testimonialsList } from "@/lib/vivanta/data";
import { SpecialtyGlyph } from "@/components/SpecialtyGlyph";
import { FaqAccordion } from "@/components/FaqAccordion";
import { BeforeAfter } from "./BeforeAfter";
import faqData from "@/data/faq.json";
import { EASE_VIV, whileInViewOpts } from "@/lib/vivanta/animations";

const HERO =
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80";

const STEPS = [
  {
    title: "Diagnóstico con tecnología 3D",
    text: "Escaneo intraoral y radiografías digitales de baja dosis para ver lo que la inspección no alcanza.",
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Plan personalizado",
    text: "Simulación visual y costos por fase. Decides con información, no con presión.",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf4724a94?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Tratamiento con anestesia consciente",
    text: "Para procedimientos largos o ansiedad real. Monitoreo y tiempos respetados.",
    img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Seguimiento y mantenimiento",
    text: "Recordatorios, higiene guiada y ajustes sin sorpresas.",
    img: "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=900&q=80",
  },
];

const TRATAMIENTOS = [
  { n: "Limpieza", p: "Desde $850 MXN", d: "45 min" },
  { n: "Blanqueamiento", p: "Desde $4,500 MXN", d: "60 min" },
  { n: "Ortodoncia", p: "Desde $15,000 MXN", d: "Curso" },
  { n: "Implantes", p: "Desde $18,000 MXN", d: "90 min" },
  { n: "Endodoncia", p: "Desde $5,500 MXN", d: "75 min" },
  { n: "Carillas", p: "Desde $12,000 MXN", d: "2 visitas" },
  { n: "Ortodoncia invisible", p: "Desde $42,000 MXN", d: "Curso" },
  { n: "Cirugía", p: "Desde $8,000 MXN", d: "Variable" },
];

export function OdontologiaPage() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const dental = getDoctorsBySpecialtySlug("odontologia");
  const tDental = testimonialsList.filter((t) => t.departamento === "dental");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const i = refs.current.indexOf(en.target as HTMLDivElement);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="pb-24">
      <ScrollProgressBar />
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Especialidades", href: "/especialidades" },
          { label: "Odontología" },
        ]}
      />

      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 pb-16 pt-8 md:px-8 lg:grid-cols-2 xl:px-16">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
            Departamento dental
          </p>
          <h1 className="mt-3 font-display text-6xl leading-[1.02] tracking-tight text-viv-text md:text-7xl xl:text-8xl">
            Odontología integral.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-viv-secondary">
            Estética, función y confort con microscopía, escáner 3D y planes por fases claros.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/agendar"
              className="inline-flex min-h-[48px] items-center rounded-full bg-viv-accent px-6 text-sm font-semibold text-white hover:bg-viv-accentHover"
            >
              Agendar
            </Link>
            <a
              href="tel:+524421234567"
              className="inline-flex min-h-[48px] items-center rounded-full border border-viv-border px-6 text-sm font-medium text-viv-text"
            >
              Llamar
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-viv-surfaceAlt shadow-vivMd md:aspect-square">
          <VivImg src={HERO} alt="Consultorio dental" fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 50vw" />
        </div>
      </section>

      <section className="border-y border-viv-border bg-viv-surfaceAlt py-12">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 md:grid-cols-4 md:px-8 xl:px-16">
          {[
            ["5,000+", "TRATAMIENTOS"],
            ["12", "AÑOS DE EXPERIENCIA"],
            ["3", "ESPECIALISTAS"],
            ["3D", "TECNOLOGÍA"],
          ].map(([a, b]) => (
            <div key={b} className="text-center">
              <p className="font-display text-3xl text-viv-text md:text-4xl">{a}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-viv-accent">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 xl:px-16">
        <h2 className="font-display text-4xl text-viv-text md:text-5xl">Tratamientos</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRATAMIENTOS.map((t) => (
            <div
              key={t.n}
              className="rounded-2xl border border-white/40 bg-[rgba(255,255,255,0.7)] p-5 shadow-vivSm backdrop-blur-[16px]"
            >
              <SpecialtyGlyph name="tooth" className="h-6 w-6 text-viv-accent" />
              <p className="mt-3 font-display text-xl">{t.n}</p>
              <p className="mt-1 text-sm font-medium text-viv-accent">{t.p}</p>
              <p className="mt-2 text-xs text-viv-muted">{t.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-viv-surfaceDeep py-20 text-viv-onDark">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-2 md:px-8 xl:px-16">
          <div className="relative lg:sticky lg:top-28 lg:h-[min(520px,70vh)]">
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-3xl">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.img}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: EASE_VIV }}
                >
                  <VivImg src={s.img} alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 45vw" />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="space-y-0">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="min-h-[50vh] border-b border-white/10 py-12 last:border-0"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-viv-accent">
                  Paso {i + 1}
                </p>
                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={whileInViewOpts}
                  transition={{ duration: 0.55, ease: EASE_VIV }}
                  className="mt-3 font-display text-3xl md:text-4xl"
                >
                  {s.title}
                </motion.h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-viv-onDark/80">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 xl:px-16">
        <h2 className="font-display text-4xl text-viv-text">Antes / después</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <BeforeAfter
            title="Blanqueamiento + microdiseño"
            subtitle="6 semanas · sensibilidad controlada"
            before="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80"
            after="https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=800&q=80"
          />
          <BeforeAfter
            title="Ortodoncia con alineadores"
            subtitle="14 meses · mordida clase I"
            before="https://images.unsplash.com/photo-1588776814546-1ffcf4724a94?auto=format&fit=crop&w=800&q=80"
            after="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
          />
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <BeforeAfter
            title="Carillas feldespáticas"
            subtitle="2 visitas"
            before="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80"
            after="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80"
          />
          <BeforeAfter
            title="Rehabilitación mixta"
            subtitle="Implante + corona"
            before="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
            after="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80"
          />
        </div>
      </section>

      <section className="bg-viv-surfaceAlt py-20">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
          <h2 className="font-display text-4xl text-viv-text">Nuestra tecnología</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                t: "Scanner 3D iTero",
                d: "Menos moldes, mejor ajuste de alineadores y prótesis.",
                img: "https://images.unsplash.com/photo-1579684385127-1ef15d5081de?auto=format&fit=crop&w=800&q=80",
              },
              {
                t: "Microscopio quirúrgico",
                d: "Endodoncia y cirugía con campo visual ampliado.",
                img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
              },
              {
                t: "CAD/CAM mismo día",
                d: "Restauraciones provisionales y definitivas coordinadas.",
                img: "https://images.unsplash.com/photo-1550831144-7a9207f4c18a?auto=format&fit=crop&w=800&q=80",
              },
            ].map((c) => (
              <div key={c.t} className="overflow-hidden rounded-2xl border border-viv-border bg-viv-surface shadow-vivSm">
                <div className="relative aspect-[16/10]">
                  <VivImg src={c.img} alt="" fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-6">
                  <p className="font-display text-2xl">{c.t}</p>
                  <p className="mt-2 text-sm text-viv-secondary">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 xl:px-16">
        <h2 className="font-display text-4xl">Especialistas</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {dental.map((d) => (
            <Link key={d.id} to={`/equipo/${d.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <VivImg
                  src={d.foto}
                  alt={d.nombre}
                  fill
                  className="object-cover grayscale transition-[filter] duration-[600ms] group-hover:grayscale-0"
                  sizes="33vw"
                />
              </div>
              <p className="mt-4 font-display text-2xl">{d.nombre}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">Céd. {d.cedula}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-viv-border bg-viv-surface py-16">
        <div className="mx-auto max-w-[900px] px-6">
          <h2 className="font-display text-3xl">Testimonios</h2>
          <div className="mt-8 space-y-6">
            {(tDental.length ? tDental : testimonialsList.slice(0, 3)).map((tm) => (
                <blockquote key={tm.id} className="border-l-2 border-viv-accent pl-6 font-display text-xl italic text-viv-text">
                  {tm.quote}
                  <footer className="mt-2 font-sans text-sm not-italic text-viv-muted">— {tm.nombre}</footer>
                </blockquote>
              ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-6 py-16">
        <h2 className="font-display text-3xl">Preguntas dentales</h2>
        <div className="mt-6">
          <FaqAccordion items={faqData.dental as { q: string; a: string }[]} />
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute inset-0">
          <VivImg src={HERO} alt="" fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-viv-surfaceDeep/85" />
        </div>
        <div className="relative mx-auto max-w-xl rounded-3xl border border-white/40 bg-[rgba(255,255,255,0.88)] p-10 text-center shadow-glass backdrop-blur-[32px]">
          <p className="font-mono text-[11px] uppercase tracking-widest text-viv-accent">Consulta dental</p>
          <p className="mt-3 font-display text-3xl text-viv-text">Agenda tu valoración</p>
          <Link to="/agendar"
            className="mt-6 inline-flex min-h-[48px] items-center rounded-full bg-viv-accent px-8 text-sm font-semibold text-white"
          >
            Agendar ahora
          </Link>
        </div>
      </section>
    </div>
  );
}
