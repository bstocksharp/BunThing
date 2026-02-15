import React, { useEffect, useRef } from "react";

type Props = {
  speed?: number;
  wind?: number;
  density?: number;
  rainColor?: string;
  rainOpacity?: number;
};

export default function Rain({
  speed = 1,
  wind = 2,
  density = 1.2,
  rainColor = "#ffffff",
  rainOpacity = 1,
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
    let drops: any[] = [];

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? `${parseInt(result[1]!, 16)}, ${parseInt(result[2]!, 16)}, ${parseInt(result[3]!, 16)}`
        : "255, 255, 255";
    };
    const rgb = hexToRgb(rainColor);

    const createDrop = (isInitial = false) => {
      const padding = Math.abs(wind) * 200 + 100;
      return {
        x: Math.random() * (w + padding * 2) - padding,
        y: isInitial ? Math.random() * h : -20,
        len: 10 + Math.random() * 20,
        vy: (4 + Math.random() * 5) * speed,
        vx: wind + (Math.random() - 0.5),
        thickness: 0.5 + Math.random() * 1.5,
        alpha: (0.1 + Math.random() * 0.3) * rainOpacity,
      };
    };

    const resize = () => {
      w = container.clientWidth;
      h = container.clientHeight;
      canvas.width = w;
      canvas.height = h;
      const count = Math.floor((w / 1000) * 150 * density);
      drops = Array.from({ length: count }).map(() => createDrop(true));
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      drops.forEach((d) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${rgb}, ${d.alpha})`;
        ctx.lineWidth = d.thickness;
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.vx, d.y + d.len);
        ctx.stroke();
        d.x += d.vx;
        d.y += d.vy;
        if (d.y > h + 50 || d.x > w + 500 || d.x < -500)
          Object.assign(d, createDrop());
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
  }, [density, speed, wind, rainColor, rainOpacity]);

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
