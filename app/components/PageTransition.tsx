"use client";

import { motion } from "framer-motion";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ x: 32 }}
      animate={{ x: 0 }}
      exit={{ x: -32 }}
      transition={{
        duration: 1.1, // slower
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}
