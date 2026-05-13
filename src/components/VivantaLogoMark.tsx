import { Link } from "react-router-dom";
import { VivantaLeafLogo } from "./VivantaLeafLogo";

export function VivantaLogoMark({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`}>
      <span className="text-viv-accent">
        <VivantaLeafLogo className="h-8 w-8 shrink-0" />
      </span>
      <span className="font-display text-xl tracking-tight text-viv-text md:text-[1.35rem]">
        VIVANTA
      </span>
    </Link>
  );
}
