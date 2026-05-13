import { Link } from "react-router-dom";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-[1440px] px-6 pb-6 pt-28 md:px-8 xl:px-12">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-widest text-viv-muted">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${it.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && <span className="text-viv-accent">/</span>}
              {it.href && !last ? (
                <Link to={it.href} className="text-viv-secondary hover:text-viv-accent">
                  {it.label}
                </Link>
              ) : (
                <span className={last ? "text-viv-muted" : "text-viv-secondary"}>{it.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
