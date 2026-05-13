import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VivantaLogoMark } from "./VivantaLogoMark";
import { specialtiesList } from "@/lib/vivanta/data";
import { SpecialtyGlyph } from "./SpecialtyGlyph";
import { EASE_VIV } from "@/lib/vivanta/animations";

const nav = [
  { href: "/", label: "INICIO" },
  { href: "/equipo", label: "EQUIPO" },
  { href: "/nosotros", label: "NOSOTROS" },
  { href: "/blog", label: "BLOG" },
  { href: "/contacto", label: "CONTACTO" },
];

export function VivantaHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega(true);
  };
  const delayCloseMega = () => {
    closeTimer.current = setTimeout(() => setMega(false), 160);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-[background,border-color,backdrop-filter] duration-[400ms] ease-viv ${
        scrolled
          ? "border-b border-black/[0.06] bg-[rgba(250,250,247,0.72)] backdrop-blur-[20px] backdrop-saturate-[180%] [will-change:backdrop-filter]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-3.5 md:px-8 xl:px-12">
        <div className="flex min-w-0 flex-1 items-center justify-center md:flex-none md:justify-start">
          <VivantaLogoMark />
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 xl:flex">
          {nav[0] && (
            <Link to={nav[0].href}
              className="text-xs font-medium tracking-wide text-viv-secondary transition-colors duration-[400ms] ease-viv hover:text-viv-accent"
            >
              {nav[0].label}
            </Link>
          )}
          <div
            className="relative"
            onMouseEnter={openMega}
            onMouseLeave={delayCloseMega}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-medium tracking-wide text-viv-secondary transition-colors duration-[400ms] ease-viv hover:text-viv-accent"
              aria-expanded={mega}
              onClick={() => setMega((v) => !v)}
            >
              ESPECIALIDADES
              <span className="text-[10px]" aria-hidden>
                ▾
              </span>
            </button>
            <AnimatePresence>
              {mega && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 4 }}
                  transition={{ duration: 0.3, ease: EASE_VIV }}
                  className="viv-glass-fallback absolute left-1/2 top-full z-50 mt-4 w-[min(920px,calc(100vw-48px))] -translate-x-1/2 rounded-2xl border border-white/40 bg-[rgba(255,255,255,0.85)] p-6 shadow-glass backdrop-blur-[24px] backdrop-saturate-[180%] [will-change:backdrop-filter]"
                  onMouseEnter={openMega}
                  onMouseLeave={delayCloseMega}
                >
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {specialtiesList.map((s) => (
                      <Link
                        key={s.id}
                        to={`/especialidades/${s.slug}`}
                        className="group flex gap-3 rounded-xl p-3 transition-[transform,background-color] duration-[400ms] ease-viv hover:bg-viv-accentSoft/60"
                      >
                        <span className="mt-0.5 text-viv-accent transition-transform duration-[400ms] ease-viv group-hover:scale-[1.03]">
                          <SpecialtyGlyph name={s.icon} className="h-6 w-6" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display text-lg leading-tight tracking-tight text-viv-text">
                            {s.nombre}
                          </span>
                          <span className="mt-1 line-clamp-2 text-sm leading-snug text-viv-secondary">
                            {s.descripcionCorta}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-xs font-medium tracking-wide text-viv-secondary transition-colors duration-[400ms] ease-viv hover:text-viv-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3 md:flex-none">
          <Link to="/agendar"
            className="hidden min-h-[44px] items-center rounded-full bg-viv-accent px-5 py-2.5 text-xs font-semibold tracking-wide text-white shadow-vivSm transition-[transform,background-color] duration-[400ms] ease-viv hover:scale-[1.02] hover:bg-viv-accentHover sm:inline-flex"
          >
            AGENDAR CITA
          </Link>
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-viv-border/80 bg-white/50 text-viv-text backdrop-blur-md transition-colors duration-[400ms] ease-viv hover:border-viv-accent/40 xl:hidden"
            aria-label={mobile ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMobile((v) => !v)}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 block h-0.5 w-full rounded-full bg-viv-text transition-transform duration-[400ms] ease-viv ${
                  mobile ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-full rounded-full bg-viv-text transition-opacity duration-[400ms] ease-viv ${
                  mobile ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 block h-0.5 w-full rounded-full bg-viv-text transition-transform duration-[400ms] ease-viv ${
                  mobile ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobile && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              className="fixed inset-0 z-[70] bg-black/25 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_VIV }}
              onClick={() => setMobile(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: EASE_VIV }}
              className="viv-glass-fallback fixed right-0 top-0 z-[75] flex h-full w-[min(100%,380px)] flex-col border-l border-white/30 bg-[rgba(255,255,255,0.88)] p-6 pt-20 shadow-vivLg backdrop-blur-[24px] backdrop-saturate-[180%] xl:hidden"
            >
              <nav className="flex flex-col gap-1">
                <Link to="/"
                  onClick={() => setMobile(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-viv-text"
                >
                  Inicio
                </Link>
                <p className="px-3 pt-2 font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
                  Especialidades
                </p>
                <div className="flex flex-col">
                  {specialtiesList.map((s) => (
                    <Link
                      key={s.id}
                      to={`/especialidades/${s.slug}`}
                      onClick={() => setMobile(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-viv-secondary hover:bg-viv-accentSoft/50 hover:text-viv-text"
                    >
                      <SpecialtyGlyph name={s.icon} className="h-5 w-5 text-viv-accent" />
                      {s.nombre}
                    </Link>
                  ))}
                </div>
                {nav.slice(1).map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobile(false)}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-viv-text"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link to="/precios"
                  onClick={() => setMobile(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-viv-text"
                >
                  Precios
                </Link>
                <Link to="/agendar"
                  onClick={() => setMobile(false)}
                  className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-full bg-viv-accent px-5 text-sm font-semibold tracking-wide text-white"
                >
                  Agendar cita
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
