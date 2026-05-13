import { Route, Routes, BrowserRouter } from "react-router-dom";
import { VivantaShell } from "@/layouts/VivantaShell";
import { VivantaHome } from "@/components/home/VivantaHome";
import { EspecialidadesCatalog } from "@/components/especialidades/EspecialidadesCatalog";
import { EspecialidadPage } from "@/pages/EspecialidadPage";
import { AgendarWizard } from "@/components/agendar/AgendarWizard";
import { EquipoCatalog } from "@/pages/EquipoCatalog";
import { DoctorProfile } from "@/pages/DoctorProfile";
import { NosotrosPage } from "@/pages/NosotrosPage";
import { BlogCatalog } from "@/pages/BlogCatalog";
import { BlogPostPage } from "@/pages/BlogPostPage";
import { PreciosPage } from "@/pages/PreciosPage";
import { ContactoPage } from "@/pages/ContactoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<VivantaShell />}>
          <Route index element={<VivantaHome />} />
          <Route path="especialidades" element={<EspecialidadesCatalog />} />
          <Route path="especialidades/:slug" element={<EspecialidadPage />} />
          <Route path="equipo" element={<EquipoCatalog />} />
          <Route path="equipo/:slug" element={<DoctorProfile />} />
          <Route path="nosotros" element={<NosotrosPage />} />
          <Route path="blog" element={<BlogCatalog />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="agendar" element={<AgendarWizard />} />
          <Route path="contacto" element={<ContactoPage />} />
          <Route path="precios" element={<PreciosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
