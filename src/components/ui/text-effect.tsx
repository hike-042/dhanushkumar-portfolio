"use client";

import { motion } from "framer-motion";

interface TextEffectProps {
  text: string;
  className?: string;
}

export default function TextEffect({ text, className }: TextEffectProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.h1
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1], // premium easing
        }}
        className="inline-block"
      >
        {text}
      </motion.h1>
    </div>
  );
}