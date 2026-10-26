import type { ReactNode } from "react";
import pricing from "@/data/pricing.json";
import { getDoctorsBySpecialtySlug } from "@/lib/vivanta/data";

const money = (n: number) => `$${n.toLocaleString("es-MX")}`;
const doctors = getDoctorsBySpecialtySlug("medicina-general");
const firstVisit = pricing.consultas.find((c) => c.especialidad === "Medicina general")?.primera ?? 850;

/** Los próximos cinco días hábiles a partir de mañana. */
function nextWorkdays() {
  const out: { day: string; date: number }[] = [];
  const d = new Date();
  while (out.length < 5) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    out.push({
      day: d.toLocaleDateString("es-MX", { weekday: "short" }).replace(".", ""),
      date: d.getDate(),
    });
  }
  return out;
}

const days = nextWorkdays();
const pickedDay = days[2];
const slots = ["09:00", "09:40", "10:20", "11:00", "11:40", "12:20", "16:00", "16:40", "17:20"];
const taken = new Set(["09:40", "11:40", "16:40"]);
const pickedSlot = "10:20";

export const STEPS = [
  {
    title: "Elige especialidad.",
    text: "Ocho especialidades con el precio de la primera consulta a la vista antes de reservar.",
  },
  {
    title: "Elige a tu médico.",
    text: "Ves su experiencia y su cédula profesional. Siempre sabes con quién vas.",
  },
  {
    title: "Elige tu hora.",
    text: "Horarios reales de la agenda de la clínica, actualizados al momento.",
  },
  {
    title: "Confirma por WhatsApp.",
    text: "Te llegan indicaciones para tu consulta y un recordatorio un día antes.",
  },
];

function ScreenSpecialty() {
  return (
    <>
      <p className="ap-screen__title">Agendar</p>
      <p className="ap-screen__sub">Elige una especialidad</p>
      <div className="ap-list">
        {pricing.consultas.slice(0, 7).map((c) => (
          <div
            key={c.especialidad}
            className="ap-list__row"
            data-on={c.especialidad === "Medicina general" ? "true" : undefined}
          >
            <span>{c.especialidad}</span>
            <span>{money(c.primera)}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function ScreenDoctor() {
  return (
    <>
      <p className="ap-screen__title">Medicina general</p>
      <p className="ap-screen__sub">Elige a tu médico</p>
      {doctors.map((d, i) => (
        <div key={d.id} className="ap-doc" data-on={i === 0 ? "true" : undefined}>
          <img src={d.foto} alt="" referrerPolicy="no-referrer" />
          <div>
            <strong>{d.nombre}</strong>
            <small>{d.añosExperiencia} años de experiencia</small>
            <small>Cédula {d.cedula}</small>
          </div>
        </div>
      ))}
      <div className="ap-screen__cta">Continuar</div>
    </>
  );
}

function ScreenTime() {
  return (
    <>
      <p className="ap-screen__title">Horario</p>
      <p className="ap-screen__sub">
        {doctors[0]?.nombre} · Primera consulta {money(firstVisit)}
      </p>
      <div className="ap-days">
        {days.map((d) => (
          <span key={`${d.day}${d.date}`} data-on={d === pickedDay ? "true" : undefined}>
            {d.day}
            <b>{d.date}</b>
          </span>
        ))}
      </div>
      <div className="ap-slots">
        {slots.map((s) => (
          <span
            key={s}
            data-on={s === pickedSlot ? "true" : undefined}
            data-off={taken.has(s) ? "true" : undefined}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="ap-screen__cta">Confirmar cita</div>
    </>
  );
}

function ScreenWhatsApp() {
  const doctor = doctors[0]?.nombre ?? "tu médico";
  return (
    <div className="ap-chat">
      <div className="ap-chat__head">
        <i aria-hidden>V</i>
        Clínica Vivanta
      </div>
      <div className="ap-bubble">
        Hola, Ana. Tu cita de medicina general con {doctor} quedó el {pickedDay.day}{" "}
        {pickedDay.date} a las {pickedSlot}.<small>10:02</small>
      </div>
      <div className="ap-bubble">
        Llega 10 minutos antes y trae tus estudios recientes. Consultorio 4, planta baja.
        <small>10:02</small>
      </div>
      <div className="ap-bubble ap-bubble--me">
        Perfecto, gracias.<small>10:05</small>
      </div>
      <div className="ap-bubble">
        Te recordamos un día antes. Si necesitas cambiarla, responde CAMBIAR.<small>10:05</small>
      </div>
    </div>
  );
}

export const SCREENS = [ScreenSpecialty, ScreenDoctor, ScreenTime, ScreenWhatsApp];

export function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="ap-phone" data-ui>
      <div className="ap-phone__screen">
        <div className="ap-phone__island" aria-hidden />
        <div className="ap-phone__status" aria-hidden>
          <span>9:41</span>
          <span>5G</span>
        </div>
        {children}
      </div>
    </div>
  );
}
