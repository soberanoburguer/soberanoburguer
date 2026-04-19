"use client";

import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
  options?: LenisOptions;
}

export default function SmoothScroll({ children, options }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
        ...options,
      }}
    >
      {children}
    </ReactLenis>
  );
}
