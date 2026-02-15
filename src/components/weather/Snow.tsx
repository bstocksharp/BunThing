import React, { useEffect, useRef } from "react";

type Props = {
  speed?: number;
  wind?: number;
  density?: number;
  snowColor?: string;
  snowOpacity?: number;
};

export default function Snow({
  speed = 0.5,
  wind = 1,
  density = 1.2,
  snowColor = "#ffffff",
  snowOpacity = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0,
      h = 0;
    let flakes: any[] = [];

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? `${parseInt(result[1]!, 16)}, ${parseInt(result[2]!, 16)}, ${parseInt(result[3]!, 16)}`
        : "255, 255, 255";
    };
    const rgb = hexToRgb(snowColor);

    const createFlake = (isInitial = false) => {
      const padding = Math.abs(wind) * 200 + 100;
      const size = 2 + Math.random() * 8;
      return {
        x: Math.random() * (w + padding * 2) - padding,
        y: isInitial ? Math.random() * h : -20,
        size: size,
        vy: (1 + Math.random() * 2) * speed,
        vx: wind + (Math.random() - 0.5) * 1.5,
        alpha: (0.3 + Math.random() * 0.4) * snowOpacity,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.04,
      };
    };

    const resize = () => {
      w = container.clientWidth;
      h = container.clientHeight;
      canvas.width = w;
      canvas.height = h;
      const count = Math.floor((w / 1000) * 80 * density);
      flakes = Array.from({ length: count }).map(() => createFlake(true));
    };

    const drawSnowflake = (flake: any) => {
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, ${flake.alpha})`;
      ctx.fill();
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      flakes.forEach((flake) => {
        // Add wobble effect for more natural motion
        flake.wobble += flake.wobbleSpeed;
        const wobbleAmount = Math.sin(flake.wobble) * 0.5;

        // Draw the snowflake
        drawSnowflake(flake);

        // Update position
        flake.x += flake.vx + wobbleAmount;
        flake.y += flake.vy;

        // Reset if off screen
        if (flake.y > h + 50 || flake.x > w + 500 || flake.x < -500) {
          Object.assign(flake, createFlake());
        }
      });

      rafRef.current = requestAnimationFrame(step);
    };

    // Use ResizeObserver to track container size changes
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    resize();
    rafRef.current = requestAnimationFrame(step);

    return () => {
      resizeObserver.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [density, speed, wind, snowColor, snowOpacity]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
