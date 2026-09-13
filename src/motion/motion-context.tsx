"use client";

import React, { createContext, useContext } from "react";
import { useScrollVelocity, ScrollVelocityState } from "@/hooks/useScrollVelocity";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

interface MotionContextValue extends ScrollVelocityState {
  isReducedMotion: boolean;
  isTouch: boolean;
}

const MotionContext = createContext<MotionContextValue>({
  velocity: 0,
  normalizedVelocity: 0,
  direction: 0,
  isReducedMotion: false,
  isTouch: false,
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const velocityState = useScrollVelocity();
  const isReducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  return (
    <MotionContext.Provider
      value={{
        ...velocityState,
        isReducedMotion,
        isTouch,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion(): MotionContextValue {
  return useContext(MotionContext);
}
