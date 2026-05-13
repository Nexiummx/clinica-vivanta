import { VivImg } from "@/components/VivImg";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getDoctorsBySpecialtySlug } from "@/lib/vivanta/data";
import { SpecialtyGlyph } from "@/components/SpecialtyGlyph";
import { FaqAccordion } from "@/components/FaqAccordion";
import faqData from "@/data/faq.json";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, whileInViewOpts } from "@/lib/vivanta/animations";

const HERO =
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80";

const SERVICIOS = [
  "Control del niño sano",
  "Vacunación",
  "Urgencias pediátricas",
  "Nutrición infantil",
  "Neurodesarrollo",
  "Adolescentes",
];

export function PediatriaPage() {
  const ped = getDoctorsBySpecialtySlug("pediatria");

  return (
    <div className="pb-24">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Especialidades", href: "/especialidades" },
          { label: "Pediatría" },
        ]}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-viv-warmSoft via-viv-bg to-viv-accentSoft/40 px-6 pb-20 pt-10 md:px-8 xl:px-16">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-viv-warm">Pediatría Vivanta</p>
            <h1 className="mt-3 font-display text-6xl leading-[1.02] tracking-tight text-viv-text md:text-7xl xl:text-8xl">
              Crecer con <span className="italic text-viv-warm">calma.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-viv-secondary">
              Consultorio cálido, tiempos respetados y lenguaje sin miedos para familias en Querétaro.
            </p>
            <Link to="/agendar"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-viv-accent px-6 text-sm font-semibold text-white hover:bg-viv-accentHover"
            >
              Agenda la cita de tu pequeño
            </Link>
          </div>
          <div className="relative aspect-square max-h-[480px] justify-self-end overflow-hidden rounded-[2rem] border border-viv-warm/30 bg-white/40 shadow-vivMd backdrop-blur-sm">
            <VivImg src={HERO} alt="" fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 45vw" />
          </div>
        </div>
      </section>

      <section className="border-y border-viv-border bg-viv-surface py-12">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-6 text-center md:grid-cols-3 md:px-8 xl:px-16">
          <div>
            <p className="font-display text-4xl text-viv-warm">3,000+</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-viv-accent">Niños atendidos</p>
          </div>
          <div>
            <p className="font-display text-4xl text-viv-text">2</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-viv-accent">Pediatras</p>
          </div>
          <div>
            <p className="font-display text-2xl text-viv-text md:text-3xl">Recién nacidos → 17 años</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-viv-accent">Rango</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 xl:px-16">
        <h2 className="font-display text-4xl text-viv-text">Servicios</h2>
        <motion.div
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="initial"
          whileInView="animate"
          viewport={whileInViewOpts}
          variants={staggerContainer}
        >
          {SERVICIOS.map((s) => (
            <motion.div
              key={s}
              variants={staggerItem}
              className="flex items-start gap-3 rounded-2xl border border-viv-border bg-viv-surface p-6 shadow-vivSm"
            >
              <SpecialtyGlyph name="child" className="h-6 w-6 shrink-0 text-viv-warm" />
              <p className="font-display text-xl text-viv-text">{s}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-viv-surfaceAlt py-20">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
          <h2 className="font-display text-4xl">
            Cómo preparamos a los niños para su visita
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Explicación con dibujos y modelos",
              "Exploración sin dolor primero",
              "Recompensa simbólica al final",
              "Nota para el colegio si aplica",
            ].map((t, i) => (
              <div key={t} className="rounded-2xl border border-viv-border bg-white p-6">
                <p className="font-display text-5xl text-viv-accent/20">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-sm leading-relaxed text-viv-secondary">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 xl:px-16">
        <h2 className="font-display text-3xl">Consultorio</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80",
          ].map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <VivImg src={src} alt="" fill className="object-cover" sizes="33vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-8 xl:px-16">
        <h2 className="font-display text-3xl">Pediatras</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {ped.map((d) => (
            <Link key={d.id} to={`/equipo/${d.slug}`} className="group flex gap-4">
              <div className="relative h-40 w-32 shrink-0 overflow-hidden rounded-xl">
                <VivImg src={d.foto} alt="" fill className="object-cover grayscale group-hover:grayscale-0" />
              </div>
              <div>
                <p className="font-display text-2xl">{d.nombre}</p>
                <p className="text-sm text-viv-secondary">{d.bio}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[800px] px-6 py-16">
        <h2 className="font-display text-3xl">FAQ pediátrica</h2>
        <FaqAccordion items={faqData.pediatria as { q: string; a: string }[]} />
      </section>

      <section className="mx-auto max-w-xl px-6 pb-20 text-center">
        <div className="rounded-3xl border border-viv-warm/40 bg-viv-warmSoft p-10">
          <p className="font-display text-3xl text-viv-text">Tu pequeño merece tiempo</p>
          <Link to="/agendar"
            className="mt-6 inline-flex min-h-[48px] items-center rounded-full bg-viv-accent px-8 text-sm font-semibold text-white"
          >
            Agendar pediatría
          </Link>
        </div>
      </section>
    </div>
  );
}
