import { VivImg } from "@/components/VivImg";
import { useState } from "react";

export function BeforeAfter({
  before,
  after,
  title,
  subtitle,
}: {
  before: string;
  after: string;
  title: string;
  subtitle: string;
}) {
  const [pct, setPct] = useState(50);

  return (
    <div className="rounded-2xl border border-viv-border bg-viv-surface p-4 shadow-vivSm md:p-6">
      <p className="font-display text-lg text-viv-text">{title}</p>
      <p className="text-xs text-viv-muted">{subtitle}</p>
      <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-xl select-none">
        <VivImg src={after} alt="Después" fill className="object-cover" sizes="(max-width:768px) 100vw, 40vw" />
        <VivImg
          src={before}
          alt="Antes"
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 40vw"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        />
        <input
          type="range"
          min={5}
          max={95}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
          aria-label="Comparar antes y después"
        />
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/50 px-2 py-1 text-[10px] text-white">
          Arrastra
        </span>
      </div>
    </div>
  );
}
