"use client";

import { useEffect, useRef, useState } from "react";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap-core";

interface MetricCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function MetricCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className = "",
}: MetricCounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState<string>(
    prefersReducedMotion() ? value.toFixed(decimals) : (0).toFixed(decimals)
  );

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplayValue(value.toFixed(decimals));
      return;
    }

    const { gsap, ScrollTrigger } = getGSAP();
    if (!containerRef.current) return;

    const counterObj = { currentVal: 0 };

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(counterObj, {
          currentVal: value,
          duration,
          ease: "power3.out",
          onUpdate: () => {
            setDisplayValue(counterObj.currentVal.toFixed(decimals));
          },
          onComplete: () => {
            setDisplayValue(value.toFixed(decimals));
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [value, decimals, duration]);

  return (
    <span ref={containerRef} className={`tabular-nums ${className}`}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
