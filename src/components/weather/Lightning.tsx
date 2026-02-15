import React, { useEffect, useRef, useState } from "react";

export default function Lightning({
  color = "#ffffff",
  intensity = 0.9,
  strikeFrequencyMs = [2000, 7000] as [number, number],
  doubleStrikeChance = 0.3,
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [active, setActive] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  // 1. The Scheduler
  useEffect(() => {
    let timer: number;
    const trigger = () => {
      // FIX: Changed y to 100 to allow strikes across the whole screen
      setOrigin({ x: Math.random() * 100, y: Math.random() * 100 });
      setActive(true);

      // Flash duration
      setTimeout(() => setActive(false), 150);

      const [min, max] = strikeFrequencyMs;
      const next = Math.random() * (max - min) + min;
      timer = window.setTimeout(trigger, next);
    };

    timer = window.setTimeout(trigger, 2000);
    return () => clearTimeout(timer);
  }, [strikeFrequencyMs]);

  // 2. The Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    // FIX: If not active, clear the canvas and BAIL.
    // This ensures the flash disappears the moment 'active' becomes false.
    if (!active) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const w = (canvas.width = canvas.clientWidth);
    const h = (canvas.height = canvas.clientHeight);

    const tx = (origin.x / 100) * w;
    const ty = (origin.y / 100) * h;

    ctx.strokeStyle = color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(150, 200, 255, 0.5)";
    ctx.lineWidth = 2;

    const drawBolt = (x1: number, y1: number, x2: number, y2: number) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      const segments = 12; // More segments for full-screen strikes
      for (let i = 1; i <= segments; i++) {
        const x = x1 + (x2 - x1) * (i / segments) + (Math.random() * 40 - 20);
        const y = y1 + (y2 - y1) * (i / segments) + (Math.random() * 20 - 10);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    // Strike from top to the random origin
    drawBolt(tx + (Math.random() * 400 - 200), 0, tx, ty);

    // Global flash
    ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.2})`;
    ctx.fillRect(0, 0, w, h);

    // Removed the nested setTimeout here because the 'if (!active)'
    // block above now handles cleanup perfectly via the state toggle.
  }, [active, origin, color, intensity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}
