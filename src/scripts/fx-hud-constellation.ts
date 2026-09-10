/**
 * 3안 "시그널 / HUD" — 밝은 배경 위 옅은 점 필드 + 커서를 따라오는 연결선(별자리).
 * HUD: 좌상단 좌표 실시간 표시, 좌하단 fps.
 *
 * 대상: <section class="hero-hud"> 안의 <canvas class="fx-canvas">,
 *       [data-hud="coord"], [data-hud="fps"]
 * prefers-reduced-motion: 점 이동 정지, 커서 연결선만 반응.
 */
const INK = '24, 24, 27';
const ACCENT = '37, 99, 235'; // blue

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function initHudConstellation(): void {
  const host = document.querySelector<HTMLElement>('.hero-hud');
  const canvas = host?.querySelector<HTMLCanvasElement>('.fx-canvas');
  const ctx = canvas?.getContext('2d');
  if (!host || !canvas || !ctx) return;

  const coordEl = host.querySelector<HTMLElement>('[data-hud="coord"]');
  const fpsEl = host.querySelector<HTMLElement>('[data-hud="fps"]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w = 0;
  let h = 0;
  let dpr = 1;
  let dots: Dot[] = [];
  const pointer = { x: -999, y: -999, active: false };
  let last = performance.now();
  let fps = 60;

  const build = (): void => {
    const count = Math.round((w * h) / 16000);
    dots = Array.from({ length: Math.min(Math.max(count, 30), 120) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));
  };

  const resize = (): void => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = host.clientWidth;
    h = host.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  };

  const draw = (now: number): void => {
    const dt = now - last;
    last = now;
    fps += (1000 / Math.max(dt, 1) - fps) * 0.1;
    if (fpsEl) fpsEl.textContent = `${Math.round(fps)} fps`;

    ctx.clearRect(0, 0, w, h);

    for (const d of dots) {
      if (!reduce) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x += w;
        if (d.x > w) d.x -= w;
        if (d.y < 0) d.y += h;
        if (d.y > h) d.y -= h;
      }
      ctx.fillStyle = `rgba(${INK}, 0.35)`;
      ctx.fillRect(d.x - 1, d.y - 1, 2, 2);
    }

    // 점끼리 연결
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const a = dots[i];
        const b = dots[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist > 108) continue;
        ctx.strokeStyle = `rgba(${INK}, ${0.16 * (1 - dist / 108)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // 커서 → 근처 점 연결 + 십자선
    if (pointer.active) {
      for (const d of dots) {
        const dist = Math.hypot(d.x - pointer.x, d.y - pointer.y);
        if (dist > 170) continue;
        ctx.strokeStyle = `rgba(${ACCENT}, ${0.5 * (1 - dist / 170)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pointer.x, pointer.y);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();
      }
      ctx.strokeStyle = `rgba(${ACCENT}, 0.55)`;
      ctx.beginPath();
      ctx.moveTo(pointer.x - 9, pointer.y);
      ctx.lineTo(pointer.x + 9, pointer.y);
      ctx.moveTo(pointer.x, pointer.y - 9);
      ctx.lineTo(pointer.x, pointer.y + 9);
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  };

  host.addEventListener(
    'pointermove',
    (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
      if (coordEl) {
        coordEl.textContent = `x:${(pointer.x / w).toFixed(3)}  y:${(pointer.y / h).toFixed(3)}`;
      }
      host.style.setProperty('--mx', (pointer.x / w - 0.5).toFixed(4));
      host.style.setProperty('--my', (pointer.y / h - 0.5).toFixed(4));
    },
    { passive: true },
  );
  host.addEventListener('pointerleave', () => (pointer.active = false), { passive: true });
  window.addEventListener('resize', resize, { passive: true });

  resize();
  requestAnimationFrame(draw);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHudConstellation, { once: true });
} else {
  initHudConstellation();
}

export {};
