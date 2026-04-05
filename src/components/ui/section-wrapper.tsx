"use client";

import { motion } from "framer-motion";

export default function SectionWrapper({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      className="site-section"
      initial={{ opacity: 0, y: 48, rotateX: 6, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: false, margin: '-60px' }}
      style={{ background: 'var(--bg)', transformPerspective: 1000, transformOrigin: 'top center' }}
    >
      {children}
    </motion.div>
  );
}