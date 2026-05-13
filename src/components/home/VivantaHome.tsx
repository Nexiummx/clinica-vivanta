import { VivImg } from "@/components/VivImg";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  blogPostsList,
  doctorsList,
  specialtiesList,
  testimonialsList,
} from "@/lib/vivanta/data";
import faqData from "@/data/faq.json";
import { CountUp } from "./CountUp";
import { SpecialtyGlyph } from "@/components/SpecialtyGlyph";
import { EASE_VIV, staggerContainer, staggerItem, whileInViewOpts } from "@/lib/vivanta/animations";
import { FaqAccordion } from "@/components/FaqAccordion";

const HERO_IMG =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80";
const CLINIC_BG =
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80";
const AGENDAR_BG =
  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1600&q=80";

function HomeCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const set = () => setDesktop(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (!desktop) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [desktop, x, y]);

  if (!desktop) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[40] hidden h-4 w-4 rounded-full border border-viv-accent mix-blend-difference lg:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    />
  );
}

export function VivantaHome() {
  const [tIndex, setTIndex] = useState(0);
  const testimonials = useMemo(() => testimonialsList.slice(0, 6), []);
  const teamPreview = doctorsList.slice(0, 4);
  const blogPreview = blogPostsList.slice(0, 3);
  const faqGeneral = faqData.general as { q: string; a: string }[];

  const visibleTestimonials = useMemo(() => {
    const out: typeof testimonials = [];
    for (let i = 0; i < 3; i++) {
      out.push(testimonials[(tIndex + i) % testimonials.length]);
    }
    return out;
  }, [tIndex, testimonials]);

  return (
    <div className="overflow-x-hidden">
      <HomeCursor />

      {/* HERO */}
      <section className="relative min-h-[100svh] px-6 pb-16 pt-28 md:px-8 xl:flex xl:min-h-[100svh] xl:items-stretch xl:px-16">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 xl:flex-row xl:items-center xl:gap-0">
          <motion.div
            className="flex w-full flex-col justify-center xl:w-[45%] xl:pr-10"
            initial="initial"
            whileInView="animate"
            viewport={whileInViewOpts}
            variants={staggerContainer}
          >
            <motion.p
              variants={staggerItem}
              className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent"
            >
              Clínica multiespecialidad • desde 2012
            </motion.p>
            <motion.h1
              variants={staggerItem}
              className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-viv-text md:text-7xl xl:text-8xl"
            >
              Salud que entiende{" "}
              <span className="italic text-viv-accent">tu historia.</span>
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="mt-6 max-w-lg text-base leading-relaxed text-viv-secondary"
            >
              En Querétaro, unimos medicina basada en evidencia con tiempo real de consulta. Agenda
              en línea, confirma por WhatsApp y llega a un espacio pensado para calmarte, no para
              apurarte.
            </motion.p>
            <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-3">
              <Link to="/agendar"
                className="inline-flex min-h-[48px] min-w-[44px] items-center justify-center rounded-full bg-viv-accent px-6 text-sm font-semibold tracking-wide text-white shadow-vivSm transition-[transform,background-color] duration-[400ms] ease-viv hover:scale-[1.02] hover:bg-viv-accentHover"
              >
                Agendar cita
              </Link>
              <Link to="/especialidades"
                className="inline-flex min-h-[48px] min-w-[44px] items-center justify-center rounded-full border border-viv-border bg-white/40 px-6 text-sm font-medium text-viv-text shadow-vivSm backdrop-blur-md transition-[transform,border-color] duration-[400ms] ease-viv hover:scale-[1.02] hover:border-viv-accent/40"
              >
                Conocer especialidades
              </Link>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-wrap gap-4 text-sm text-viv-secondary"
            >
              <span>★ 4.9 en Google</span>
              <span className="text-viv-border">|</span>
              <span>Avalado por COFEPRIS</span>
              <span className="text-viv-border">|</span>
              <span>10,000+ pacientes</span>
            </motion.div>
          </motion.div>

          <div className="relative w-full flex-1 xl:w-[55%]">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-viv-surfaceAlt shadow-vivMd md:aspect-[16/11] xl:aspect-[5/4]">
              <VivImg
                src={HERO_IMG}
                alt="Consulta cálida entre médica y paciente"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 55vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={whileInViewOpts}
              transition={{ duration: 0.6, ease: EASE_VIV }}
              className="viv-glass-fallback absolute bottom-4 left-4 max-w-[260px] rounded-2xl border border-white/40 bg-[rgba(255,255,255,0.72)] p-4 shadow-glass backdrop-blur-[24px] md:bottom-8 md:left-8 md:max-w-[280px] md:p-5"
            >
              <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-viv-accent">
                Satisfacción del paciente
              </p>
              <p className="mt-2 font-display text-5xl tracking-tight text-viv-text">98%</p>
              <div className="mt-3 flex h-10 items-end gap-1">
                {[40, 55, 35, 70, 50].map((h, i) => (
                  <span
                    key={i}
                    className="w-2 rounded-sm bg-viv-accent/80"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={whileInViewOpts}
              transition={{ duration: 0.6, ease: EASE_VIV, delay: 0.08 }}
              className="viv-glass-fallback absolute right-4 top-4 max-w-[240px] rounded-2xl border border-white/40 bg-[rgba(255,255,255,0.72)] p-4 shadow-glass backdrop-blur-[24px] md:right-8 md:top-8 md:max-w-[260px]"
            >
              <div className="flex -space-x-3">
                {doctorsList.slice(0, 3).map((d) => (
                  <span
                    key={d.id}
                    className="relative inline-block h-11 w-11 overflow-hidden rounded-full border-2 border-white ring-1 ring-viv-border"
                  >
                    <VivImg src={d.foto} alt="" fill className="object-cover" sizes="44px" />
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm font-medium text-viv-text">8 especialistas disponibles hoy</p>
              <p className="mt-2 flex items-center gap-2 text-xs text-viv-secondary">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-viv-accent opacity-40" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-viv-accent" />
                </span>
                En línea ahora
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-viv-border bg-viv-surfaceAlt py-12">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 md:grid-cols-4 md:px-8 xl:px-16">
          {(
            [
              { type: "n" as const, end: 12, suffix: "+", text: "12+ AÑOS" },
              { type: "k" as const, text: "10,000+ PACIENTES" },
              { type: "n" as const, end: 8, suffix: "", text: "8 ESPECIALIDADES" },
              { type: "s" as const, text: "4.9★ GOOGLE" },
            ] as const
          ).map((s, i, arr) => (
            <div
              key={s.text}
              className={`relative text-center ${i < arr.length - 1 ? "md:after:absolute md:after:right-0 md:after:top-1/2 md:after:h-10 md:after:w-px md:after:-translate-y-1/2 md:after:bg-viv-border" : ""}`}
            >
              <p className="font-display text-3xl tracking-tight text-viv-text md:text-4xl">
                {s.type === "s" ? (
                  <>
                    4.9<span className="text-amber-600">★</span>
                  </>
                ) : s.type === "k" ? (
                  <>
                    <CountUp end={10} />
                    ,000+
                  </>
                ) : (
                  <CountUp end={s.end} suffix={s.suffix} />
                )}
              </p>
              <p className="mt-2 font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ESPECIALIDADES */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <VivImg src={CLINIC_BG} alt="" fill className="object-cover opacity-30 blur-sm" />
          <div className="absolute inset-0 bg-viv-bg/80" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
            Especialidades
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-viv-text md:text-6xl">
            Atención integral{" "}
            <span className="italic text-viv-accent">para cada etapa de tu vida.</span>
          </h2>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={whileInViewOpts}
            variants={staggerContainer}
            className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {specialtiesList.map((sp) => (
              <motion.div key={sp.id} variants={staggerItem}>
                <Link to={`/especialidades/${sp.slug}`}
                  className="group block h-full rounded-2xl border border-white/40 bg-[rgba(255,255,255,0.65)] p-6 shadow-vivSm backdrop-blur-[16px] transition-[transform,box-shadow,backdrop-filter] duration-[400ms] ease-viv will-change-transform hover:-translate-y-1 hover:shadow-vivLg xl:rounded-3xl xl:p-7 [@supports(backdrop-filter:blur(0))]:hover:backdrop-blur-[24px]"
                >
                  <SpecialtyGlyph
                    name={sp.icon}
                    className="h-7 w-7 text-viv-accent transition-transform duration-[400ms] ease-viv group-hover:scale-[1.03]"
                  />
                  <p className="mt-4 font-display text-2xl tracking-tight text-viv-text">{sp.nombre}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-viv-secondary">
                    {sp.descripcionCorta}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-viv-accent">
                    Conocer más →
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PASOS */}
      <section className="bg-viv-bg py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
            Cómo funciona
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Tu primera visita,{" "}
            <span className="italic text-viv-accent">en 4 pasos.</span>
          </h2>
          <div className="relative mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-viv-accent/40 to-transparent xl:block" />
            {[
              {
                n: "01",
                t: "Agenda online",
                d: "Elige especialidad, doctor y horario sin llamadas interminables.",
              },
              {
                n: "02",
                t: "Recibe confirmación",
                d: "WhatsApp y correo con indicaciones, costos estimados y prep.",
              },
              {
                n: "03",
                t: "Visita a tu especialista",
                d: "Tiempo real de consulta, exploración sin apuro.",
              },
              {
                n: "04",
                t: "Plan personalizado",
                d: "Estudios, tratamiento y seguimiento coordinados en un solo lugar.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="relative rounded-2xl border border-viv-border bg-viv-surface p-6 shadow-vivSm xl:p-8"
              >
                <p className="font-display text-5xl text-viv-accent/25">{step.n}</p>
                <p className="mt-4 font-display text-2xl text-viv-text">{step.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-viv-secondary">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER AGENDAR */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <VivImg src={AGENDAR_BG} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-viv-surfaceDeep/85" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
          <div className="viv-glass-fallback mx-auto max-w-3xl rounded-3xl border border-white/40 bg-[rgba(255,255,255,0.88)] p-8 shadow-glass backdrop-blur-[40px] backdrop-saturate-[180%] md:p-16">
            <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
              Reserva tu cita
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-viv-text md:text-5xl">
              Tu primera visita, <span className="italic text-viv-accent">sin complicaciones.</span>
            </h2>
            <Link to="/agendar"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-full bg-viv-accent px-8 text-sm font-semibold tracking-wide text-white transition-[transform,background-color] duration-[400ms] ease-viv hover:scale-[1.02] hover:bg-viv-accentHover"
            >
              Agendar ahora →
            </Link>
            <p className="mt-6 text-sm text-viv-secondary">
              o llámanos al <span className="text-viv-text">(442) 123 4567</span>
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-viv-surface py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
            Historias de pacientes
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
            Lo que cuentan nuestros pacientes.
          </h2>
          <div className="mt-10 flex items-center justify-between gap-4">
            <button
              type="button"
              aria-label="Anterior"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-viv-border bg-white text-viv-text transition-colors hover:border-viv-accent"
              onClick={() => setTIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
            >
              ←
            </button>
            <div className="grid flex-1 gap-4 md:grid-cols-3">
              {visibleTestimonials.map((tm, idx) => (
                <div
                  key={`${tm.id}-${tIndex}-${idx}`}
                  className="relative overflow-hidden rounded-2xl border border-viv-border bg-viv-bg p-6 shadow-vivSm"
                >
                  <span className="pointer-events-none absolute right-4 top-4 font-display text-6xl italic leading-none text-viv-accent/20">
                    “
                  </span>
                  <p className="relative font-display text-lg italic leading-snug text-viv-text">
                    {tm.quote}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="relative h-12 w-12 overflow-hidden rounded-full">
                      <VivImg src={tm.avatar} alt="" fill className="object-cover" sizes="48px" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-viv-text">{tm.nombre}</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">
                        {tm.contexto}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              aria-label="Siguiente"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-viv-border bg-white text-viv-text transition-colors hover:border-viv-accent"
              onClick={() => setTIndex((i) => (i + 1) % testimonials.length)}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* EQUIPO PREVIEW */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
            El equipo
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Médicos que escuchan.</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {teamPreview.map((doc) => (
              <Link key={doc.id} to={`/equipo/${doc.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-viv-surfaceAlt shadow-vivSm">
                  <VivImg
                    src={doc.foto}
                    alt={doc.nombre}
                    fill
                    className="object-cover grayscale transition-[filter,transform] duration-[600ms] ease-viv group-hover:scale-[1.03] group-hover:grayscale-0"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <p className="mt-4 font-display text-xl text-viv-text">{doc.nombre}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">
                  {doc.especialidad}
                </p>
              </Link>
            ))}
          </div>
          <Link to="/equipo"
            className="mt-10 inline-flex text-sm font-semibold text-viv-accent hover:underline"
          >
            Ver equipo completo →
          </Link>
        </div>
      </section>

      {/* SEGUROS */}
      <section className="border-y border-viv-border bg-viv-surfaceAlt py-14">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
          <p className="text-center font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
            Aseguradoras aceptadas
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {["GNP", "AXA", "MetLife", "Mapfre", "Bupa", "Allianz", "Zurich", "Banorte"].map(
              (name, i) => (
                <span
                  key={name}
                  className={`rounded-lg px-4 py-2 font-display text-lg text-viv-muted transition-colors duration-[400ms] ease-viv hover:text-viv-accent ${i % 3 === 0 ? "italic" : ""}`}
                >
                  {name}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
            Recursos de salud
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
            Información que cuida.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {blogPreview.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-viv-surfaceAlt">
                  <VivImg
                    src={post.imagen}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-[600ms] ease-viv group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <span className="mt-4 inline-block rounded-full bg-viv-accentSoft px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-viv-accent">
                  {post.categoria}
                </span>
                <p className="mt-3 font-display text-xl leading-snug text-viv-text">{post.titulo}</p>
                <p className="mt-2 text-sm text-viv-muted">
                  {post.fecha} · {post.autor.nombre}
                </p>
              </Link>
            ))}
          </div>
          <Link to="/blog" className="mt-10 inline-flex text-sm font-semibold text-viv-accent">
            Ver todos los artículos →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-viv-surface py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 md:px-8 lg:grid-cols-2 xl:px-16">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
              Preguntas frecuentes
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Resolvemos tus dudas.</h2>
          </div>
          <FaqAccordion items={faqGeneral} />
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-viv-accent py-16 text-viv-onDark">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center md:px-8 xl:px-16">
          <p className="max-w-md font-display text-3xl leading-tight md:text-4xl">
            Recibe tips de salud cada mes
          </p>
          <form
            className="viv-glass-fallback w-full max-w-md rounded-2xl border border-white/40 bg-[rgba(255,255,255,0.2)] p-4 backdrop-blur-[24px] md:p-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="Correo electrónico"
                className="min-h-[48px] flex-1 rounded-full border border-white/30 bg-white/10 px-4 text-sm text-viv-onDark placeholder:text-viv-onDark/70 outline-none ring-white/40 focus:ring-2"
              />
              <button
                type="submit"
                className="min-h-[48px] rounded-full bg-viv-onDark px-6 text-xs font-semibold uppercase tracking-wide text-viv-text transition-transform duration-[400ms] ease-viv hover:scale-[1.02]"
              >
                Suscribirme
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
