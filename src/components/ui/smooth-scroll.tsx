"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import useDeviceProfile from "./use-device-profile";

export default function SmoothScroll() {
  const { isTouch, prefersReducedMotion } = useDeviceProfile();

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isTouch, prefersReducedMotion]);

  return null;
}
