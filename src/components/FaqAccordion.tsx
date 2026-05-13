import { AnimatePresence, motion } from "framer-motion";
import { EASE_VIV } from "@/lib/vivanta/animations";
import { useState } from "react";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-viv-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="py-2">
            <button
              type="button"
              className="flex w-full min-h-[48px] items-center justify-between gap-4 py-2 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-display text-xl text-viv-text">{item.q}</span>
              <span className="text-viv-accent">{isOpen ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE_VIV }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-sm leading-relaxed text-viv-secondary">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
