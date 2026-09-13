"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { initLenis, destroyLenis } from "@/lib/lenis-core";

export function useLenis() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = initLenis();
    setLenis(instance);

    return () => {
      destroyLenis();
    };
  }, []);

  return lenis;
}
