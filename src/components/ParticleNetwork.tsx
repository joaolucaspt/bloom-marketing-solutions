import { useEffect, useRef } from "react";

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  bx: number;
  by: number;
  r: number;
};

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: P[] = [];
    let raf = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.min(90, Math.floor((width * height) / 22000));
      particles = new Array(density).fill(0).map(() => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          bx: x,
          by: y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: 1.4 + Math.random() * 2.2,
        };
      });
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const m = mouseRef.current;
      const pushRadius = 90;
      const cursorLineRadius = 100;
      const maxCursorLinks = 2;

      const now = performance.now() / 1000;

      for (let idx = 0; idx < particles.length; idx++) {
        const p = particles[idx];
        // slow, smooth directional drift (very gentle steering)
        const angle = now * 0.05 + idx * 1.37;
        p.vx += Math.cos(angle) * 0.004;
        p.vy += Math.sin(angle * 0.9 + 1.1) * 0.004;

        // mouse repulsion
        if (m.active) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < pushRadius && dist > 0) {
            const force = (pushRadius - dist) / pushRadius;
            p.vx += (dx / dist) * force * 0.5;
            p.vy += (dy / dist) * force * 0.5;
          }
        }

        p.vx *= 0.985;
        p.vy *= 0.985;

        // clamp speed so movement never looks erratic
        const sp = Math.hypot(p.vx, p.vy);
        const maxSp = 0.35;
        if (sp > maxSp) {
          p.vx = (p.vx / sp) * maxSp;
          p.vy = (p.vy / sp) * maxSp;
        }

        p.x += p.vx;
        p.y += p.vy;

        // wrap
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      // glowing lines from cursor only — no particle-to-particle links
      if (m.active) {
        const near = particles
          .map((p) => ({ p, d: Math.hypot(p.x - m.x, p.y - m.y) }))
          .filter((o) => o.d < cursorLineRadius)
          .sort((a, b) => a.d - b.d)
          .slice(0, maxCursorLinks);

        for (const { p, d } of near) {
          const t = 1 - d / cursorLineRadius;
          const grad = ctx.createLinearGradient(m.x, m.y, p.x, p.y);
          grad.addColorStop(0, `rgba(212,175,55,${0.75 * t})`);
          grad.addColorStop(1, `rgba(212,175,55,0)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.1;
          ctx.shadowColor = "rgba(212,175,55,0.8)";
          ctx.shadowBlur = 8 * t;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }

      // dots
      for (const p of particles) {
        ctx.fillStyle = "rgba(212,175,55,0.6)";
        ctx.shadowColor = "rgba(212,175,55,0.45)";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
    />

  );
}
