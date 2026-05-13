import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VivImg } from "@/components/VivImg";
import { blogPostsList } from "@/lib/vivanta/data";

const CATS = ["Todos", "Pediatría", "Nutrición", "Salud mental", "Prevención", "Familia"] as const;

export function BlogCatalog() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("Todos");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (cat === "Todos") return blogPostsList;
    return blogPostsList.filter((b) => b.categoria === cat);
  }, [cat]);

  const featured = blogPostsList.find((b) => b.destacado) ?? blogPostsList[0];
  const rest = filtered.filter((b) => b.id !== featured.id);

  return (
    <div className="pb-24 pt-24">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Blog" }]} />
      <section className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-16">
        <h1 className="max-w-4xl font-display text-5xl leading-tight md:text-7xl">
          Recursos <span className="italic text-viv-accent">que cuidan tu salud.</span>
        </h1>

        <div className="viv-glass-fallback mt-8 max-w-xl rounded-2xl border border-white/40 bg-white/70 p-4 backdrop-blur-[16px]">
          <input
            type="search"
            placeholder="Buscar artículos…"
            className="w-full rounded-full border border-viv-border bg-white/90 px-4 py-3 text-sm outline-none ring-viv-accent/20 focus:ring-2"
          />
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {CATS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCat(c);
                setPage(0);
              }}
              className={`min-h-[44px] shrink-0 rounded-full border px-4 text-xs font-medium ${
                cat === c ? "border-viv-accent bg-viv-accent text-white" : "border-viv-border bg-white/80"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {featured && (
          <Link
            to={`/blog/${featured.slug}`}
            className="mt-12 grid gap-6 overflow-hidden rounded-3xl border border-viv-border bg-viv-surface shadow-vivMd lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[320px]">
              <VivImg src={featured.imagen} alt="" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">{featured.categoria}</span>
              <h2 className="mt-3 font-display text-3xl leading-tight">{featured.titulo}</h2>
              <p className="mt-3 line-clamp-3 text-sm text-viv-secondary">{featured.extracto}</p>
              <p className="mt-4 text-xs text-viv-muted">
                {featured.autor.nombre} · {featured.fecha}
              </p>
            </div>
          </Link>
        )}

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {rest.slice(page * 9, page * 9 + 9).map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <VivImg src={post.imagen} alt="" fill className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.03]" />
              </div>
              <span className="mt-3 inline-block rounded-full bg-viv-accentSoft px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-viv-accent">
                {post.categoria}
              </span>
              <h3 className="mt-2 font-display text-xl leading-snug">{post.titulo}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-viv-secondary">{post.extracto}</p>
              <p className="mt-2 text-xs text-viv-muted">
                {post.autor.nombre} · {post.fecha}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {[0, 1].map((i) => (
            <button
              key={i}
              type="button"
              aria-label={`Página ${i + 1}`}
              onClick={() => setPage(i)}
              className={`h-3 w-3 rounded-full ${page === i ? "bg-viv-accent" : "bg-viv-border"}`}
            />
          ))}
        </div>

        <aside className="mt-16 rounded-2xl border border-viv-border bg-viv-surfaceAlt p-6 lg:hidden">
          <p className="font-mono text-[10px] uppercase tracking-widest text-viv-accent">Newsletter</p>
          <p className="mt-2 text-sm text-viv-secondary">Suscríbete en el pie de página.</p>
        </aside>
      </section>
    </div>
  );
}
