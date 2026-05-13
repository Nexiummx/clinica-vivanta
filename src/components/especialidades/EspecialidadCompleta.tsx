import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { VivImg } from "@/components/VivImg";
import { SpecialtyGlyph } from "@/components/SpecialtyGlyph";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getDoctorsBySpecialtySlug, getSpecialtyBySlug, testimonialsList } from "@/lib/vivanta/data";
import { ESP_DETALLE } from "@/data/especialidadDetalleCompleto";
import faqData from "@/data/faq.json";
import { EASE_VIV, staggerContainer, staggerItem, whileInViewOpts } from "@/lib/vivanta/animations";

type FaqMap = Record<string, { q: string; a: string }[]>;

export function EspecialidadCompleta({ slug }: { slug: keyof typeof ESP_DETALLE }) {
  const sp = getSpecialtyBySlug(slug)!;
  const det = ESP_DETALLE[slug];
  const doctors = getDoctorsBySpecialtySlug(slug);
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const faqs = faqData as FaqMap;
  const faqItems = faqs[det.faqKey] ?? faqs.general;
  const testimonios = testimonialsList.slice(0, 3);

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

  const servicios = sp.tratamientos.map((t, i) => ({
    title: t,
    desc: det.servicioDesc[i] ?? "Valoración personalizada y seguimiento en el mismo departamento.",
  }));

  return (
    <div className="pb-24">
      <ScrollProgressBar />
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Especialidades", href: "/especialidades" },
          { label: sp.nombre },
        ]}
      />

      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 pb-16 pt-8 md:px-8 lg:grid-cols-2 xl:px-16">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">{det.eyebrow}</p>
          <h1 className="mt-3 font-display text-5xl leading-[1.02] tracking-tight text-viv-text md:text-7xl xl:text-8xl">
            {det.heroTitulo}
          </h1>
          <p className="mt-4 max-w-xl font-display text-xl italic leading-snug text-viv-accent md:text-2xl">{det.heroSub}</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-viv-secondary">{sp.descripcion}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/agendar"
              className="inline-flex min-h-[48px] items-center rounded-full bg-viv-accent px-6 text-sm font-semibold text-white hover:bg-viv-accentHover"
            >
              Agendar cita
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
          <VivImg src={sp.imagen} alt="" fill className="object-cover" priority />
        </div>
      </section>

      <section className="border-y border-viv-border bg-viv-surfaceAlt py-12">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 md:grid-cols-4 md:px-8 xl:px-16">
          {det.stats.map(([a, b]) => (
            <div key={b} className="text-center">
              <p className="font-display text-2xl tracking-tight text-viv-text md:text-4xl">{a}</p>
              <p className="mt-2 font-mono text-[10px] font-medium uppercase tracking-widest text-viv-accent md:text-[11px]">
                {b}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 xl:px-16">
        <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">Servicios</p>
        <h2 className="mt-2 font-display text-4xl text-viv-text md:text-5xl">Lo que resolvemos aquí</h2>
        <motion.div
          className="mt-10 grid gap-4 sm:grid-cols-2"
          initial="initial"
          whileInView="animate"
          viewport={whileInViewOpts}
          variants={staggerContainer}
        >
          {servicios.map((s) => (
            <motion.div
              key={s.title}
              variants={staggerItem}
              className="rounded-2xl border border-white/40 bg-[rgba(255,255,255,0.75)] p-6 shadow-vivSm backdrop-blur-[16px] md:p-8"
            >
              <SpecialtyGlyph name={sp.icon} className="h-7 w-7 text-viv-accent" />
              <p className="mt-4 font-display text-2xl text-viv-text">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-viv-secondary">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-viv-surfaceDeep py-20 text-viv-onDark">
        <div className="mx-auto max-w-[1440px] px-6 pb-12 md:px-8 xl:px-16">
          <h2 className="max-w-2xl font-display text-3xl md:text-4xl">{det.darkTitle}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-viv-onDark/80">{det.darkText}</p>
        </div>
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-2 md:px-8 xl:px-16">
          <div className="relative lg:sticky lg:top-28 lg:h-[min(520px,70vh)]">
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-3xl">
              {det.steps.map((st, i) => (
                <motion.div
                  key={st.title}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: EASE_VIV }}
                >
                  <VivImg src={st.img} alt="" fill className="object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-viv-accent">Tu proceso</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Cómo trabajamos contigo</h2>
            {det.steps.map((st, i) => (
              <div
                key={st.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="min-h-[45vh] border-b border-white/10 py-12 last:border-0"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-viv-accent/90">Paso {i + 1}</p>
                <motion.h3
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={whileInViewOpts}
                  transition={{ duration: 0.55, ease: EASE_VIV }}
                  className="mt-2 font-display text-2xl md:text-3xl"
                >
                  {st.title}
                </motion.h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-viv-onDark/85">{st.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 xl:px-16">
        <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">Tecnología y enfoque</p>
        <h2 className="mt-2 font-display text-4xl text-viv-text md:text-5xl">Lo que nos diferencia</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {det.tech.map((c) => (
            <div key={c.title} className="overflow-hidden rounded-2xl border border-viv-border bg-viv-surface shadow-vivSm">
              <div className="relative aspect-[16/10]">
                <VivImg src={c.img} alt="" fill className="object-cover" />
              </div>
              <div className="p-6">
                <p className="font-display text-xl text-viv-text">{c.title}</p>
                <p className="mt-2 text-sm text-viv-secondary">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-viv-border bg-viv-surfaceAlt py-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">Galería</p>
          <h2 className="mt-2 font-display text-3xl text-viv-text">Espacios del departamento</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {det.gallery.map((src) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-2xl">
                <VivImg src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 py-16 md:px-8">
        <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">Pacientes</p>
        <h2 className="mt-2 font-display text-3xl text-viv-text">Historias recientes</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonios.map((tm) => (
            <blockquote
              key={tm.id}
              className="rounded-2xl border border-viv-border bg-viv-surface p-6 shadow-vivSm"
            >
              <p className="font-display text-lg italic leading-snug text-viv-text">“{tm.quote}”</p>
              <footer className="mt-4 text-sm text-viv-muted">
                — {tm.nombre} · {tm.contexto}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 xl:px-16">
        <h2 className="font-display text-4xl text-viv-text">Especialistas</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d) => (
            <Link key={d.id} to={`/equipo/${d.slug}`} className="group block">
              <div className="relative aspect-[4/5] max-w-[300px] overflow-hidden rounded-2xl">
                <VivImg
                  src={d.foto}
                  alt={d.nombre}
                  fill
                  className="object-cover grayscale transition-[filter] duration-[600ms] group-hover:grayscale-0"
                />
              </div>
              <p className="mt-4 font-display text-xl text-viv-text">{d.nombre}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">Céd. {d.cedula}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[800px] px-6 py-16 md:px-8">
        <h2 className="font-display text-3xl text-viv-text">Preguntas frecuentes</h2>
        <div className="mt-6">
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute inset-0">
          <VivImg src={sp.imagen} alt="" fill className="object-cover opacity-35 blur-sm" />
          <div className="absolute inset-0 bg-viv-surfaceDeep/88" />
        </div>
        <div className="relative mx-auto max-w-xl rounded-3xl border border-white/35 bg-[rgba(255,255,255,0.88)] p-10 text-center shadow-glass backdrop-blur-[32px]">
          <p className="font-mono text-[11px] uppercase tracking-widest text-viv-accent">Reserva</p>
          <p className="mt-3 font-display text-3xl text-viv-text">{det.ctaTitulo}</p>
          <Link
            to="/agendar"
            className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-full bg-viv-accent px-8 text-sm font-semibold text-white hover:bg-viv-accentHover"
          >
            Agendar ahora
          </Link>
          <p className="mt-4 text-sm text-viv-secondary">o (442) 123 4567</p>
          <Link to="/contacto" className="mt-6 inline-block text-sm font-semibold text-viv-accent">
            Hablar con un coordinador →
          </Link>
        </div>
      </section>
    </div>
  );
}
