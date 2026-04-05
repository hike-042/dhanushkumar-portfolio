"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // 🎯 Layered transforms
  const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yMedium = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  return (
    <div
      ref={container}
      className="relative h-[250vh] w-full"
      style={{ position: "relative" }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        {/* CENTER IMAGE (FOCUS) */}
        <motion.img
          src={images[0]?.src}
          style={{ scale, opacity }}
          className="absolute w-[280px] md:w-[350px] rounded-2xl shadow-2xl"
        />

        {/* LEFT IMAGE */}
        <motion.img
          src={images[1]?.src}
          style={{ y: ySlow, opacity }}
          className="absolute left-10 top-20 w-[200px] md:w-[240px] rounded-xl shadow-lg"
        />

        {/* RIGHT IMAGE */}
        <motion.img
          src={images[2]?.src}
          style={{ y: yMedium, opacity }}
          className="absolute right-10 top-32 w-[220px] md:w-[260px] rounded-xl shadow-lg"
        />

        {/* BOTTOM LEFT */}
        <motion.img
          src={images[3]?.src}
          style={{ y: yFast, opacity }}
          className="absolute bottom-20 left-20 w-[200px] md:w-[240px] rounded-xl shadow-lg"
        />

        {/* BOTTOM RIGHT */}
        <motion.img
          src={images[4]?.src}
          style={{ y: yMedium, opacity }}
          className="absolute bottom-10 right-20 w-[220px] md:w-[260px] rounded-xl shadow-lg"
        />

      </div>
    </div>
  );
}