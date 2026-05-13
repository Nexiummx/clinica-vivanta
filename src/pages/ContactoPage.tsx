import { Breadcrumbs } from "@/components/Breadcrumbs";

export function ContactoPage() {
  return (
    <div className="pb-24 pt-24">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]} />
      <section className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
        <h1 className="font-display text-5xl md:text-8xl">
          Estamos <span className="italic text-viv-accent">para escucharte.</span>
        </h1>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="viv-glass-fallback space-y-6 rounded-3xl border border-white/40 bg-white/75 p-8 backdrop-blur-[20px]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">Dirección</p>
              <p className="mt-1 text-sm text-viv-secondary">Av. Constituyentes 123, Centro, Querétaro</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">Teléfono</p>
              <p className="mt-1 text-sm">(442) 123 4567</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">Urgencias</p>
              <p className="mt-1 inline-flex items-center gap-2 text-sm">
                <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">24/7</span>
                Misma línea (demo)
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">Horario</p>
              <ul className="mt-2 space-y-1 text-sm text-viv-secondary">
                <li>Lun–Vie 8:00–21:00</li>
                <li>Sáb 9:00–14:00</li>
              </ul>
            </div>
          </div>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="relative">
              <label className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">Nombre</label>
              <input className="mt-1 w-full border-0 border-b border-viv-border bg-transparent py-3 text-sm outline-none focus:border-viv-accent" />
            </div>
            <div className="relative">
              <label className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">Email</label>
              <input type="email" className="mt-1 w-full border-0 border-b border-viv-border bg-transparent py-3 text-sm outline-none focus:border-viv-accent" />
            </div>
            <div className="relative">
              <label className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">Asunto</label>
              <select className="mt-1 w-full border-0 border-b border-viv-border bg-transparent py-3 text-sm outline-none focus:border-viv-accent">
                <option>Agenda</option>
                <option>Facturación</option>
                <option>Otro</option>
              </select>
            </div>
            <div className="relative">
              <label className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">Mensaje</label>
              <textarea rows={4} className="mt-1 w-full border-0 border-b border-viv-border bg-transparent py-3 text-sm outline-none focus:border-viv-accent" />
            </div>
            <button
              type="submit"
              className="min-h-[48px] rounded-full bg-viv-accent px-8 text-sm font-semibold uppercase tracking-wide text-white"
            >
              Enviar mensaje →
            </button>
          </form>
        </div>

        <div className="mt-16 overflow-hidden rounded-2xl border border-viv-border bg-viv-surfaceAlt">
          <iframe
            title="Mapa"
            className="h-[320px] w-full grayscale contrast-125"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-100.423%2C20.55%2C-100.365%2C20.62&amp;layer=mapnik"
          />
        </div>
        <p className="mt-4 text-sm text-viv-secondary">
          Cómo llegar: transporte público en avenida principal; estacionamiento en edificio (lugares limitados).
        </p>
      </section>
    </div>
  );
}
