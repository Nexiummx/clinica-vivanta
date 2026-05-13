import { VivImg } from "@/components/VivImg";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { doctorsList, specialtiesList } from "@/lib/vivanta/data";
import { SpecialtyGlyph } from "@/components/SpecialtyGlyph";
import { EASE_VIV } from "@/lib/vivanta/animations";

const BG =
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1800&q=80";

const timeSlots = ["09:00", "09:30", "10:00", "11:00", "12:30", "16:00", "17:30"];

export function AgendarWizard() {
  const [step, setStep] = useState(0);
  const [spec, setSpec] = useState<string | null>(null);
  const [doc, setDoc] = useState<string | null>(null);
  const [day, setDay] = useState(14);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    tel: "",
    motivo: "",
    nuevo: "si",
  });
  const [done, setDone] = useState(false);

  const filteredDocs = useMemo(() => {
    if (!spec) return doctorsList;
    return doctorsList.filter((d) => d.especialidadSlug === spec);
  }, [spec]);

  const steps = 6;

  const goNext = () => {
    if (step < steps - 1) setStep((s) => s + 1);
    else setDone(true);
  };
  const goPrev = () => setStep((s) => Math.max(0, s - 1));

  const canNext =
    (step === 0 && !!spec) ||
    (step === 1 && !!doc) ||
    (step === 2 && !!day) ||
    (step === 3 && !!time) ||
    (step === 4 && form.nombre && form.email && form.tel) ||
    step === 5;

  return (
    <div className="relative min-h-screen overflow-hidden py-28">
      <div className="absolute inset-0">
        <VivImg src={BG} alt="" fill className="object-cover blur-[2px]" />
        <div className="absolute inset-0 bg-viv-accent/10" />
      </div>

      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Agendar" },
        ]}
      />

      <div className="relative z-[1] mx-auto max-w-[760px] px-6 pb-24 md:px-8">
        <div className="viv-glass-fallback rounded-3xl border border-white/40 bg-[rgba(255,255,255,0.88)] p-6 shadow-glass backdrop-blur-[40px] backdrop-saturate-[180%] md:p-12">
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-viv-accent">
            Agenda en línea
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-viv-text md:text-5xl">
            Reserva tu cita
          </h1>

          <div className="mt-8 flex items-center gap-2">
            {Array.from({ length: steps }).map((_, i) => (
              <div key={i} className="flex flex-1 items-center gap-2">
                <span
                  className={`flex h-3 w-3 shrink-0 rounded-full ${i <= step ? "bg-viv-accent" : "bg-viv-border"}`}
                />
                {i < steps - 1 && (
                  <span className="h-px flex-1 bg-gradient-to-r from-viv-accent/50 to-viv-border" />
                )}
              </div>
            ))}
          </div>

          <div className="relative mt-10 min-h-[320px] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE_VIV }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 150, damping: 18 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-viv-accentSoft text-4xl text-viv-accent"
                  >
                    ✓
                  </motion.div>
                  <p className="mt-6 font-display text-3xl text-viv-text">Cita registrada</p>
                  <p className="mt-2 max-w-sm text-sm text-viv-secondary">
                    Recibirás confirmación por WhatsApp y correo. Si no llega en 15 minutos,
                    llámanos al (442) 123 4567.
                  </p>
                  <Link
                    to="/"
                    className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-viv-accent px-6 text-sm font-semibold text-white"
                  >
                    Volver al inicio
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, ease: EASE_VIV }}
                >
                  {step === 0 && (
                    <div>
                      <p className="text-sm text-viv-secondary">1. Selecciona especialidad</p>
                      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                        {specialtiesList.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSpec(s.slug)}
                            className={`flex min-h-[52px] flex-col items-start gap-2 rounded-2xl border p-3 text-left transition-[border,background] duration-[400ms] ease-viv ${
                              spec === s.slug
                                ? "border-viv-accent bg-viv-accentSoft/80"
                                : "border-viv-border bg-white/50 hover:border-viv-accent/40"
                            }`}
                          >
                            <SpecialtyGlyph name={s.icon} className="h-5 w-5 text-viv-accent" />
                            <span className="text-xs font-medium leading-tight text-viv-text">
                              {s.nombre}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <p className="text-sm text-viv-secondary">2. Selecciona doctor</p>
                      <div className="mt-4 flex flex-col gap-3">
                        {filteredDocs.map((d) => (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => setDoc(d.id)}
                            className={`flex min-h-[56px] w-full items-center gap-4 rounded-2xl border p-3 text-left transition-[border,background] duration-[400ms] ease-viv ${
                              doc === d.id
                                ? "border-viv-accent bg-viv-accentSoft/80"
                                : "border-viv-border bg-white/50 hover:border-viv-accent/40"
                            }`}
                          >
                            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                              <VivImg src={d.foto} alt="" fill className="object-cover" sizes="56px" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-display text-lg text-viv-text">{d.nombre}</span>
                              <span className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">
                                {d.especialidad}
                              </span>
                              <span className="mt-1 block text-xs text-viv-muted">
                                Próxima: mañana 09:30
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <p className="text-sm text-viv-secondary">3. Selecciona fecha</p>
                      <div className="viv-glass-fallback mt-4 overflow-x-auto rounded-2xl border border-white/40 bg-white/50 p-4 backdrop-blur-[16px]">
                        <p className="font-display text-2xl text-viv-text">Mayo 2026</p>
                        <div className="mt-4 flex min-w-[280px] gap-2">
                          {[12, 13, 14, 15, 16, 17, 18].map((d) => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => setDay(d)}
                              className={`flex min-h-[44px] min-w-[44px] flex-1 items-center justify-center rounded-full text-sm font-medium ${
                                day === d
                                  ? "bg-viv-accent text-white"
                                  : "bg-white/70 text-viv-text hover:border-viv-border"
                              }`}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <p className="text-sm text-viv-secondary">4. Selecciona hora</p>
                      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {timeSlots.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTime(t)}
                            className={`min-h-[48px] rounded-2xl border text-sm font-medium transition-[border,background] duration-[400ms] ease-viv ${
                              time === t
                                ? "border-viv-accent bg-viv-accentSoft"
                                : "border-viv-border bg-white/60 hover:border-viv-accent/40"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-4">
                      <p className="text-sm text-viv-secondary">5. Tus datos</p>
                      <input
                        className="w-full rounded-xl border border-viv-border bg-white/70 px-4 py-3 text-sm outline-none ring-viv-accent/30 focus:ring-2"
                        placeholder="Nombre completo"
                        value={form.nombre}
                        onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                      />
                      <input
                        className="w-full rounded-xl border border-viv-border bg-white/70 px-4 py-3 text-sm outline-none ring-viv-accent/30 focus:ring-2"
                        placeholder="Correo"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      />
                      <input
                        className="w-full rounded-xl border border-viv-border bg-white/70 px-4 py-3 text-sm outline-none ring-viv-accent/30 focus:ring-2"
                        placeholder="Teléfono"
                        value={form.tel}
                        onChange={(e) => setForm((f) => ({ ...f, tel: e.target.value }))}
                      />
                      <textarea
                        className="min-h-[100px] w-full rounded-xl border border-viv-border bg-white/70 px-4 py-3 text-sm outline-none ring-viv-accent/30 focus:ring-2"
                        placeholder="Motivo de consulta"
                        value={form.motivo}
                        onChange={(e) => setForm((f) => ({ ...f, motivo: e.target.value }))}
                      />
                      <div className="flex flex-wrap gap-4 text-sm text-viv-secondary">
                        <span>¿Paciente nuevo?</span>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="nuevo"
                            checked={form.nuevo === "si"}
                            onChange={() => setForm((f) => ({ ...f, nuevo: "si" }))}
                          />
                          Sí
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="nuevo"
                            checked={form.nuevo === "no"}
                            onChange={() => setForm((f) => ({ ...f, nuevo: "no" }))}
                          />
                          No
                        </label>
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="text-sm text-viv-secondary">
                      <p className="text-base font-medium text-viv-text">6. Confirmación</p>
                      <ul className="mt-4 space-y-2 rounded-2xl border border-viv-border bg-white/50 p-4">
                        <li>
                          <span className="text-viv-muted">Especialidad:</span>{" "}
                          {specialtiesList.find((s) => s.slug === spec)?.nombre}
                        </li>
                        <li>
                          <span className="text-viv-muted">Doctor:</span>{" "}
                          {doctorsList.find((d) => d.id === doc)?.nombre}
                        </li>
                        <li>
                          <span className="text-viv-muted">Fecha:</span> 14 de mayo, 2026
                        </li>
                        <li>
                          <span className="text-viv-muted">Hora:</span> {time}
                        </li>
                        <li>
                          <span className="text-viv-muted">Contacto:</span> {form.email} ·{" "}
                          {form.tel}
                        </li>
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!done && (
            <div className="mt-10 flex flex-wrap justify-between gap-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={step === 0}
                className="min-h-[48px] rounded-full border border-viv-border px-6 text-sm font-medium text-viv-text transition-opacity disabled:opacity-40"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => {
                  if (step === 5) setDone(true);
                  else goNext();
                }}
                disabled={!canNext}
                className="min-h-[48px] rounded-full bg-viv-accent px-6 text-sm font-semibold text-white transition-[transform,opacity] duration-[400ms] ease-viv hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step === 5 ? "Confirmar cita" : "Siguiente"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
