"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  "data-cursor"?: string;
  href?: string;
}

export function MagneticButton({
  children,
  onClick,
  className = "",
  "data-cursor": dataCursor = "interactive",
  href,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isReduced = useReducedMotion();
  const isTouch = useIsTouchDevice();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isReduced || isTouch || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sharedProps = {
    ref: buttonRef as any,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    "data-cursor": dataCursor,
    style: {
      transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      transition: position.x === 0 && position.y === 0 ? "transform 0.4s ease-out" : "none",
    },
    className: `relative inline-flex items-center justify-center transition-colors duration-300 ${className}`,
  };

  if (href) {
    return (
      <a href={href} onClick={onClick} {...sharedProps}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} {...sharedProps}>
      {children}
    </button>
  );
}
