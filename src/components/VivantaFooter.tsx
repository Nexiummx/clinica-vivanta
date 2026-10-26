import { Link } from "react-router-dom";
import { specialtiesList } from "@/lib/vivanta/data";

export function VivantaFooter() {
  return (
    <footer className="ap-footer">
      <div className="ap-footer__inner">
        <div className="ap-footer__note">
          <p>
            Los precios publicados son de consulta en clínica. Los estudios se cotizan según la
            indicación de tu médico. Aceptamos GNP, AXA, MetLife, Mapfre, Bupa, Allianz, Zurich y
            Banorte.
          </p>
          <p>
            En caso de emergencia llama al 911. Vivanta atiende urgencias leves en horario de
            clínica.
          </p>
        </div>

        <div className="ap-footer__cols">
          <div>
            <h3>Especialidades</h3>
            <ul>
              {specialtiesList.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <Link to={`/especialidades/${s.slug}`}>{s.nombre}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Más especialidades</h3>
            <ul>
              {specialtiesList.slice(4).map((s) => (
                <li key={s.id}>
                  <Link to={`/especialidades/${s.slug}`}>{s.nombre}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Clínica</h3>
            <ul>
              <li>
                <Link to="/equipo">Médicos</Link>
              </li>
              <li>
                <Link to="/precios">Precios</Link>
              </li>
              <li>
                <Link to="/nosotros">Nosotros</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Visítanos</h3>
            <ul>
              <li>Av. Constituyentes 123, Centro, Querétaro</li>
              <li>
                <a href="tel:+524421234567">(442) 123 4567</a>
              </li>
              <li>
                <a href="mailto:hola@clinicavivanta.mx">hola@clinicavivanta.mx</a>
              </li>
              <li>
                <Link to="/agendar">Agendar cita</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="ap-footer__legal">
          <span>© {new Date().getFullYear()} Clínica Vivanta. Sitio de demostración.</span>
          <span>
            <a href="#">Privacidad</a> · <a href="#">Términos</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
