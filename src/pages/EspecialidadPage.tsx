import { Navigate, useParams } from "react-router-dom";
import { getSpecialtyBySlug } from "@/lib/vivanta/data";
import { tienePaginaCompleta } from "@/data/especialidadDetalleCompleto";
import { OdontologiaPage } from "@/components/especialidades/OdontologiaPage";
import { PediatriaPage } from "@/components/especialidades/PediatriaPage";
import { EspecialidadCompleta } from "@/components/especialidades/EspecialidadCompleta";

/**
 * Odontología y pediatría tienen páginas dedicadas (scrollytelling).
 * El resto de especialidades con contenido editorial completo usa `EspecialidadCompleta`.
 */
export function EspecialidadPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !getSpecialtyBySlug(slug)) {
    return <Navigate to="/especialidades" replace />;
  }

  if (slug === "odontologia") return <OdontologiaPage />;
  if (slug === "pediatria") return <PediatriaPage />;

  if (tienePaginaCompleta(slug)) {
    return <EspecialidadCompleta slug={slug} />;
  }

  return <Navigate to="/especialidades" replace />;
}
