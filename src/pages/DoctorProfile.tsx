import { Link, Navigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VivImg } from "@/components/VivImg";
import { getDoctorBySlug, doctorsList } from "@/lib/vivanta/data";

export function DoctorProfile() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? getDoctorBySlug(slug) : undefined;

  if (!doc) return <Navigate to="/equipo" replace />;

  const sameDept = doctorsList.filter(
    (d) => d.especialidadSlug === doc.especialidadSlug && d.id !== doc.id,
  );

  const slots = ["09:00", "10:30", "12:00", "16:30"];

  return (
    <div className="pb-24 pt-24">
      <Breadcrumbs
        items={[{ label: "Inicio", href: "/" }, { label: "Equipo", href: "/equipo" }, { label: doc.nombre }]}
      />
      <section className="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-2 md:px-8 xl:px-16">
        <div className="relative aspect-[4/5] max-h-[640px] overflow-hidden rounded-3xl bg-viv-surfaceAlt">
          <VivImg src={doc.foto} alt={doc.nombre} fill className="object-cover" priority />
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-viv-accent">{doc.especialidad}</p>
          <h1 className="mt-2 font-display text-5xl leading-none tracking-tight text-viv-text md:text-7xl">
            {doc.nombre}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-viv-secondary">{doc.bio}</p>
          <ul className="mt-6 space-y-2 text-sm text-viv-secondary">
            <li>Cédula profesional: {doc.cedula}</li>
            <li>Experiencia: {doc.añosExperiencia} años</li>
            <li>Universidad: {doc.universidad}</li>
            <li>Idiomas: {doc.idiomas.join(", ")}</li>
          </ul>
          <Link
            to="/agendar"
            className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-viv-accent px-8 text-sm font-semibold text-white"
          >
            Agendar con {doc.nombre.split(" ")[0]}
          </Link>
          <blockquote className="mt-10 border-l-2 border-viv-accent pl-6 font-display text-2xl italic text-viv-text">
            «Cada consulta es una conversación, no un trámite.»
          </blockquote>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1440px] px-6 md:px-8 xl:px-16">
        <h2 className="font-display text-3xl">Formación</h2>
        <div className="mt-6 space-y-4 border-l border-viv-accent/40 pl-6">
          <div>
            <p className="text-sm font-medium text-viv-text">{doc.universidad}</p>
            <p className="text-xs text-viv-muted">Titulación</p>
          </div>
          <div>
            <p className="text-sm font-medium text-viv-text">Certificación CONACEM (ficción)</p>
            <p className="text-xs text-viv-muted">2018</p>
          </div>
        </div>
      </section>

      {doc.publicaciones.length > 0 && (
        <section className="mx-auto mt-16 max-w-[1440px] px-6 md:px-8 xl:px-16">
          <h2 className="font-display text-3xl">Publicaciones</h2>
          <ul className="mt-4 space-y-3 text-sm text-viv-secondary">
            {doc.publicaciones.map((p) => (
              <li key={p.titulo}>
                <span className="text-viv-text">{p.titulo}</span> — {p.revista}, {p.año}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto mt-16 max-w-[1440px] px-6 md:px-8 xl:px-16">
        <h2 className="font-display text-3xl">Horarios sugeridos</h2>
        <div className="viv-glass-fallback mt-4 inline-flex flex-wrap gap-2 rounded-2xl border border-white/40 bg-white/70 p-4 backdrop-blur-[16px]">
          {slots.map((s) => (
            <span key={s} className="rounded-full border border-viv-border px-4 py-2 text-sm">
              {s}
            </span>
          ))}
        </div>
      </section>

      {sameDept.length > 0 && (
        <section className="mx-auto mt-16 max-w-[1440px] px-6 md:px-8 xl:px-16">
          <h2 className="font-display text-3xl">Mismo departamento</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {sameDept.map((d) => (
              <Link key={d.id} to={`/equipo/${d.slug}`} className="text-sm font-medium text-viv-accent">
                {d.nombre}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
