import { Link } from "react-router-dom";
import { specialtiesList } from "@/lib/vivanta/data";
import { VivantaLeafLogo } from "./VivantaLeafLogo";

const insurers = ["GNP", "AXA", "MetLife", "Mapfre", "Bupa", "Allianz", "Zurich", "Banorte"];

export function VivantaFooter() {
  return (
    <footer className="border-t border-viv-border bg-viv-surfaceAlt">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 xl:px-12">
        <p className="font-display text-4xl italic leading-none tracking-tight text-viv-text md:text-5xl">
          Vivanta
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-viv-secondary">
          Clínica multiespecialidad en Querétaro.
          <a
            href="https://www.nexiummx.com"
            className="underline decoration-viv-border underline-offset-4 hover:text-viv-accent"
          >
            Nexium
          </a>
          .
        </p>

        <div className="mt-12 grid gap-12 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-viv-accent">
              <VivantaLeafLogo className="h-7 w-7" />
              <span className="font-display text-lg tracking-tight">VIVANTA</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-viv-secondary">
              Av. Constituyentes 123, Col. Centro, Santiago de Querétaro, Qro.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-viv-secondary">
              <a href="#" className="hover:text-viv-accent">
                Instagram
              </a>
              <a href="#" className="hover:text-viv-accent">
                Facebook
              </a>
              <a href="#" className="hover:text-viv-accent">
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
              Especialidades
            </p>
            <ul className="mt-4 space-y-2 text-sm text-viv-secondary">
              {specialtiesList.map((s) => (
                <li key={s.id}>
                  <Link to={`/especialidades/${s.slug}`} className="hover:text-viv-accent">
                    {s.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
              Información
            </p>
            <ul className="mt-4 space-y-2 text-sm text-viv-secondary">
              <li>
                <Link to="/nosotros" className="hover:text-viv-accent">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/equipo" className="hover:text-viv-accent">
                  Equipo
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-viv-accent">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/precios" className="hover:text-viv-accent">
                  Precios
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-viv-accent">
                  Carreras
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
              Contacto
            </p>
            <p className="mt-4 text-sm text-viv-secondary">
              (442) 123 4567
              <br />
              hola@clinicavivanta.mx
            </p>
            <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
              <p className="text-xs text-viv-muted">Newsletter</p>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="min-h-[44px] flex-1 rounded-full border border-viv-border bg-white/80 px-4 text-sm outline-none ring-viv-accent/30 placeholder:text-viv-muted focus:ring-2"
                />
                <button
                  type="submit"
                  className="min-h-[44px] rounded-full bg-viv-accent px-5 text-xs font-semibold tracking-wide text-white transition-[transform,background-color] duration-[400ms] ease-viv hover:scale-[1.02] hover:bg-viv-accentHover"
                >
                  SUSCRIBIRME
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 border-t border-viv-accent/30 pt-8">
          {insurers.map((name) => (
            <span
              key={name}
              className="rounded-full border border-viv-border bg-white/60 px-3 py-1 font-display text-sm text-viv-muted"
            >
              {name}
            </span>
          ))}
        </div>

        <div className="mt-10 h-px w-full bg-viv-accent/80" aria-hidden />

        <div className="mt-6 flex flex-col gap-3 text-xs text-viv-muted md:flex-row md:flex-wrap md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Clínica Vivanta. Ficción para demo.</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="#" className="hover:text-viv-accent">
              Términos
            </a>
            <a href="#" className="hover:text-viv-accent">
              Privacidad
            </a>
            <span>Aviso de publicidad COFEPRIS: pendiente de registro ficticio.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
