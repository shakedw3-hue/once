"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-[#0D1117]/95 backdrop-blur-xl px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <Button
            render={<Link href="/auth/signup" />}
            className="h-12 w-full text-sm font-bold bg-amber-500 text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400"
          >
            Find Out Where You Stand, Free
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
