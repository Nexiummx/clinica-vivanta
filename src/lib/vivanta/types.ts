export type SpecialtyRecord = {
  id: string;
  slug: string;
  nombre: string;
  descripcionCorta: string;
  descripcion: string;
  icon: string;
  filtros: string[];
  tratamientos: string[];
  imagen: string;
  doctorIds: string[];
};

export type DoctorRecord = {
  id: string;
  slug: string;
  nombre: string;
  especialidad: string;
  especialidadSlug: string;
  foto: string;
  bio: string;
  cedula: string;
  universidad: string;
  añosExperiencia: number;
  idiomas: string[];
  publicaciones: { titulo: string; revista: string; año: number }[];
};

export type TestimonialRecord = {
  id: string;
  quote: string;
  nombre: string;
  contexto: string;
  avatar: string;
  departamento: string;
};

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "figure"; src: string; caption: string };

export type BlogPostRecord = {
  id: string;
  slug: string;
  titulo: string;
  extracto: string;
  categoria: string;
  autor: {
    nombre: string;
    slug: string;
    foto: string;
    bio: string;
  };
  fecha: string;
  tiempoLectura: number;
  imagen: string;
  destacado?: boolean;
  blocks: BlogBlock[];
};
