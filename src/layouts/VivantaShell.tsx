import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { VivantaHeader } from "@/components/VivantaHeader";
import { VivantaFooter } from "@/components/VivantaFooter";
import { FloatingContactWidget } from "@/components/FloatingContactWidget";
import { EASE_VIV } from "@/lib/vivanta/animations";

export function VivantaShell() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="vivanta-root min-h-screen bg-viv-bg font-sans text-viv-text antialiased">
      <VivantaHeader />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          id="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_VIV }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <VivantaFooter />
      <FloatingContactWidget />
    </div>
  );
}
