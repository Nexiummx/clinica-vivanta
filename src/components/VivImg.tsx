import type { CSSProperties } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  style?: CSSProperties;
};

/** Reemplazo ligero de next/image para Vite (URLs absolutas, ej. Unsplash). */
export function VivImg({ src, alt, className = "", fill, priority, style }: Props) {
  const cls = fill ? `absolute inset-0 h-full w-full object-cover ${className}`.trim() : className;
  return (
    <img
      src={src}
      alt={alt}
      className={cls}
      style={style}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      referrerPolicy="no-referrer"
    />
  );
}
