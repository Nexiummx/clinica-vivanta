import type {
  BlogPostRecord,
  DoctorRecord,
  SpecialtyRecord,
  TestimonialRecord,
} from "@/lib/vivanta/types";
import blogPosts from "@/data/blogPosts.json";
import doctors from "@/data/doctors.json";
import specialties from "@/data/specialties.json";
import testimonials from "@/data/testimonials.json";

export const specialtiesList = specialties as SpecialtyRecord[];
export const doctorsList = doctors as DoctorRecord[];
export const testimonialsList = testimonials as TestimonialRecord[];
export const blogPostsList = blogPosts as BlogPostRecord[];

export function getSpecialtyBySlug(slug: string) {
  return specialtiesList.find((s) => s.slug === slug);
}

export function getDoctorBySlug(slug: string) {
  return doctorsList.find((d) => d.slug === slug);
}

export function getBlogBySlug(slug: string) {
  return blogPostsList.find((b) => b.slug === slug);
}

export function getDoctorsBySpecialtySlug(specialtySlug: string) {
  return doctorsList.filter((d) => d.especialidadSlug === specialtySlug);
}
