"use client";

import { useEffect, useState } from "react";
import { subscribeScrollVelocity } from "@/lib/lenis-core";

export interface ScrollVelocityState {
  velocity: number;
  normalizedVelocity: number; // 0 to 1
  direction: number; // 1 (down), -1 (up), 0 (idle)
}

export function useScrollVelocity(): ScrollVelocityState {
  const [state, setState] = useState<ScrollVelocityState>({
    velocity: 0,
    normalizedVelocity: 0,
    direction: 0,
  });

  useEffect(() => {
    let decayTimer: NodeJS.Timeout;

    const unsubscribe = subscribeScrollVelocity((data) => {
      setState(data);

      clearTimeout(decayTimer);
      // Auto settle to 0 after scrolling halts
      decayTimer = setTimeout(() => {
        setState({
          velocity: 0,
          normalizedVelocity: 0,
          direction: 0,
        });
      }, 120);
    });

    return () => {
      clearTimeout(decayTimer);
      unsubscribe();
    };
  }, []);

  return state;
}
