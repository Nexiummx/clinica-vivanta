import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { VivImg } from "@/components/VivImg";
import { getBlogBySlug, blogPostsList } from "@/lib/vivanta/data";
import type { BlogBlock } from "@/lib/vivanta/types";

function slugId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9áéíóúñü]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Blocks({ blocks }: { blocks: BlogBlock[] }) {
  const firstP = blocks.findIndex((b) => b.type === "paragraph");
  return (
    <div className="prose-viv max-w-[680px] space-y-6 text-base leading-relaxed text-viv-secondary">
      {blocks.map((b, i) => {
        if (b.type === "paragraph") {
          const isFirst = i === firstP;
          return (
            <p
              key={i}
              className={isFirst ? "first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:italic first-letter:text-viv-accent" : ""}
            >
              {b.text}
            </p>
          );
        }
        if (b.type === "h2") {
          const id = slugId(b.text);
          return (
            <h2 key={i} id={id} className="scroll-mt-28 font-display text-3xl text-viv-text">
              {b.text}
            </h2>
          );
        }
        if (b.type === "quote") {
          return (
            <blockquote
              key={i}
              className="border-l-2 border-viv-accent py-1 pl-6 font-display text-xl italic text-viv-text"
            >
              {b.text}
            </blockquote>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={i} className="space-y-2">
              {b.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-viv-accent">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (b.type === "figure") {
          return (
            <figure key={i}>
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <VivImg src={b.src} alt="" fill className="object-cover" />
              </div>
              <figcaption className="mt-2 text-center text-xs text-viv-muted">{b.caption}</figcaption>
            </figure>
          );
        }
        return null;
      })}
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogBySlug(slug) : undefined;
  const [active, setActive] = useState("");

  const headings = post?.blocks.filter((b) => b.type === "h2").map((b) => (b as { type: "h2"; text: string }).text) ?? [];

  useEffect(() => {
    if (!post) return;
    const onScroll = () => {
      const positions = headings.map((h) => {
        const el = document.getElementById(slugId(h));
        return el ? { id: slugId(h), top: el.getBoundingClientRect().top } : null;
      }).filter(Boolean) as { id: string; top: number }[];
      const pick = [...positions].reverse().find((p) => p.top < 120);
      if (pick) setActive(pick.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [post?.slug, headings.length]);

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPostsList.filter((b) => b.id !== post.id).slice(0, 3);

  return (
    <div className="pb-24">
      <ScrollProgressBar />
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.titulo }]} />

      <div className="relative min-h-[42vh] w-full">
        <VivImg src={post.imagen} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-viv-bg via-viv-bg/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="viv-glass-fallback mx-auto max-w-3xl rounded-2xl border border-white/40 bg-white/75 p-6 backdrop-blur-[20px] md:p-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">{post.categoria}</span>
            <h1 className="mt-2 font-display text-3xl leading-tight text-viv-text md:text-5xl">{post.titulo}</h1>
            <p className="mt-3 text-sm text-viv-muted">
              {post.autor.nombre} · {post.fecha} · {post.tiempoLectura} min
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-[1200px] gap-12 px-6 lg:grid-cols-[220px_1fr] md:px-8 xl:px-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">Contenido</p>
          <nav className="mt-4 flex flex-col gap-2">
            {headings.map((h) => {
              const id = slugId(h);
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`text-left text-sm ${active === id ? "text-viv-accent" : "text-viv-secondary"}`}
                >
                  {h}
                </a>
              );
            })}
          </nav>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-viv-accent">Compartir</p>
          <div className="mt-2 flex gap-2 text-xs text-viv-muted">WhatsApp · Copiar enlace</div>
        </aside>
        <article>
          <Blocks blocks={post.blocks} />
          <div className="mt-16 flex gap-4 border-t border-viv-border pt-10">
            <VivImg src={post.autor.foto} alt="" className="h-16 w-16 rounded-full object-cover" />
            <div>
              <p className="font-medium text-viv-text">{post.autor.nombre}</p>
              <p className="mt-1 text-sm text-viv-secondary">{post.autor.bio}</p>
            </div>
          </div>
        </article>
      </div>

      <section className="mx-auto mt-16 max-w-[1200px] px-6 md:px-8 xl:px-16">
        <h2 className="font-display text-2xl">Artículos relacionados</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {related.map((r) => (
            <Link key={r.id} to={`/blog/${r.slug}`} className="block rounded-2xl border border-viv-border p-4">
              <p className="font-display text-lg leading-snug">{r.titulo}</p>
              <p className="mt-2 text-xs text-viv-muted">{r.fecha}</p>
            </Link>
          ))}
        </div>
        <Link to="/agendar" className="mt-10 inline-flex min-h-[48px] items-center rounded-full bg-viv-accent px-6 text-sm font-semibold text-white">
          Agenda una consulta
        </Link>
      </section>
    </div>
  );
}
