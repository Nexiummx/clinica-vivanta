import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { VivantaLeafLogo } from "./VivantaLeafLogo";

const nav = [
  { href: "/especialidades", label: "Especialidades" },
  { href: "/equipo", label: "Médicos" },
  { href: "/precios", label: "Precios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export function VivantaHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="ap-nav">
        <div className="ap-nav__bar">
          <Link to="/" className="ap-nav__logo" aria-label="Clínica Vivanta, inicio">
            <VivantaLeafLogo className="h-6 w-6 text-viv-accent" />
            Vivanta
          </Link>

          <nav className="ap-nav__links" aria-label="Principal">
            {nav.map((item) => (
              <NavLink key={item.href} to={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/agendar" className="ap-pill ap-pill--small ap-nav__cta">
            Agendar
          </Link>

          <button
            type="button"
            className="ap-nav__menu"
            aria-expanded={open}
            aria-controls="ap-sheet"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="ap-burger" data-open={open} aria-hidden>
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="ap-sheet"
            className="ap-sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.24 } }}
            exit={{ opacity: 0, transition: { duration: 0.16 } }}
          >
            <nav aria-label="Móvil">
              {[{ href: "/", label: "Inicio" }, ...nav].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4, delay: 0.03 * i }}
                >
                  <Link to={item.href}>{item.label}</Link>
                </motion.div>
              ))}
            </nav>
            <Link to="/agendar" className="ap-pill" style={{ marginTop: "2rem" }}>
              Agendar cita
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
