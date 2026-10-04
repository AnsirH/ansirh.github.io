/**
 * 메인 페이지 연출.
 * - 인트로: 어둠 → 빛이 피어오름(유체 광원) → 스크롤로 소등
 * - 소개에 들어오면 중앙에서 한 줄기 잉크를 밀어 넣어 재점화, 작품 구간 끝에서 소등
 * - 작품: 썸네일 노출(밝기), 게임별 광원 색, 마우스를 올리면 플레이 영상
 * - 작업 노트: 커서를 따라 비치는 장면 / 지나온 시간: 날짜 오도미터 / 단어 점등
 * 유체 광원(public/fx/fluid-light.js)은 WebGL이 있을 때만 불러온다.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
type LightApi = {
  level: number;
  running: boolean;
  config: Record<string, number>;
  emit: (x: number, y: number, dx: number, dy: number, k: number) => void;
  setPreset: (name: string) => void;
  burst: (n: number) => void;
  pause: () => void;
  resume: () => void;
  lowQuality: () => void;
};

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

function glAvailable() {
  const c = document.createElement('canvas');
  return !!(c.getContext('webgl2') || c.getContext('webgl'));
}

function loadLight(): Promise<LightApi | null> {
  if (!glAvailable()) {
    document.documentElement.classList.add('nogl');
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = '/fx/fluid-light.js';
    s.onload = () => resolve(((window as any).Light as LightApi) || null);
    s.onerror = () => {
      document.documentElement.classList.add('nogl');
      resolve(null);
    };
    document.body.appendChild(s);
  });
}

export async function boot() {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) root.classList.add('motion');
  const L = await loadLight();

  /* ---------- 요소 ---------- */
  const canvas = $('light'), veil = $('veil'), veilG = $('veilG'), fallback = $('glowFallback'), iris = $('iris');
  const head = $('head'), introEl = $('intro'), aboutEl = $('about'), worksEl = $('works');
  const sub = $('sub'), hint = $('hint'), skip = $('skip'), lineEl = $('line');
  const words = Array.from(document.querySelectorAll<HTMLElement>('#line .w'));
  const scenes = Array.from(document.querySelectorAll<HTMLElement>('.scene'));
  const lights = scenes.map((s) => s.dataset.light || 'candle');

  /* ---------- 광원 프리셋 ---------- */
  const BASE = { DENSITY_DISSIPATION: 1.1, SUNRAYS_WEIGHT: 1.0, BLOOM_INTENSITY: 0.9 };
  const GAME_DIM = 0.8; // 소개~작품 구간 빛 세기 (인트로 대비)
  let curPreset = 'candle';
  function preset(name: string, burst: boolean) {
    if (!L || curPreset === name) return;
    curPreset = name;
    L.setPreset(name);
    if (burst && !reduce) L.burst(2);
  }
  if (L) {
    L.setPreset('candle');
    L.level = 0;
  }

  /* ---------- 소개 재점화: 중앙에서 한 줄기 잉크 ---------- */
  const POUR = 0.5; // 잉크를 밀어 넣는 시간(초)
  const TRIG = 0.4; // 소개 윗변이 화면 높이의 40% 지점에 오면 점화 (소개보다 살짝 먼저)
  let relit = 0, lastPour = 0;
  function reignite(now: number) {
    relit = now;
    lastPour = 0;
    if (!L) return;
    preset('candle', false);
    Object.assign(L.config, BASE);
    if (!L.running && !document.hidden) L.resume();
    if (reduce) {
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        L.emit(0.5 + Math.cos(a) * 0.08, 0.5 + Math.sin(a) * 0.1, Math.cos(a) * 200, Math.sin(a) * 200, 0.9);
      }
      setTimeout(() => L.pause(), 1500);
    }
  }
  function pour(now: number, rt: number) {
    if (!L || reduce || rt > POUR || now - lastPour < 16) return;
    const dt = lastPour ? Math.min(now - lastPour, 60) : 16; // 프레임이 느려도 같은 양
    lastPour = now;
    const k = rt / POUR;
    L.emit(0.5 + Math.sin(rt * 9) * 0.006, 0.46, Math.sin(rt * 5) * 45, 370 + k * 170, ((0.55 - k * 0.2) * dt) / 16);
  }

  /* ---------- 인트로 ---------- */
  const T = { ignite: 0.4, riseEnd: 2.2, ambIn: [1.0, 3.6], words: 0.9, head: 1.4, sub: 1.5, hint: 2.2 };
  let t0 = 0, introDone = false, lastEmit = 0;
  let fired: Record<string, boolean> = {};
  const prog = (el: HTMLElement) => clamp(-el.getBoundingClientRect().top / (el.offsetHeight - innerHeight), 0, 1);
  const once = (k: string, at: number, t: number, fn: () => void) => {
    if (!fired[k] && t >= at) {
      fired[k] = true;
      fn();
    }
  };
  function revealText(fast: boolean) {
    words.forEach((w, i) => {
      setTimeout(() => {
        w.classList.add('in', 'lit');
        if (w.classList.contains('hot-target')) setTimeout(() => w.classList.add('hot'), 900);
      }, fast ? i * 40 : i * 180);
    });
  }
  function finishIntro(fast: boolean) {
    if (introDone) return;
    introDone = true;
    fired = { words: true, head: true, sub: true, hint: true };
    revealText(fast);
    head.classList.remove('pre');
    sub.classList.add('on');
    hint.classList.add('on');
    skip.classList.remove('on');
  }
  function startIntro() {
    t0 = performance.now();
    fired = {};
    introDone = false;
    lastEmit = 0;
    if (L) {
      preset('candle', false);
      Object.assign(L.config, BASE);
      L.level = 0;
      if (!L.running) L.resume();
    }
    if (reduce) {
      finishIntro(true);
      if (L) {
        L.level = 1;
        for (let i = 0; i < 6; i++) L.emit(0.3 + Math.random() * 0.4, 0.05 + Math.random() * 0.2, 0, 400, 1.2);
        setTimeout(() => L.pause(), 1500);
      }
      return;
    }
    setTimeout(() => {
      if (!introDone) skip.classList.add('on');
    }, 300);
  }
  skip.addEventListener('click', () => {
    finishIntro(true);
    if (!L) return;
    if ((performance.now() - t0) / 1000 < T.riseEnd)
      for (let i = 0; i < 8; i++)
        L.emit(0.5 + (Math.random() - 0.5) * 0.3, 0.04 + Math.random() * 0.2, (Math.random() - 0.5) * 300, 450 + Math.random() * 450, 1.4);
    t0 = performance.now() - T.ambIn[1] * 1000;
  });
  for (const ev of ['wheel', 'touchmove', 'keydown']) {
    addEventListener(ev, () => {
      if (!introDone && performance.now() - t0 > 800) finishIntro(true);
    }, { passive: true });
  }

  function frame(now: number) {
    requestAnimationFrame(frame);
    const t = (now - t0) / 1000;
    let introLevel = 1, introOpacity = 1;
    if (!reduce) {
      if (L && t >= T.ignite && t <= T.riseEnd && now - lastEmit > 70) {
        lastEmit = now;
        const k = (t - T.ignite) / (T.riseEnd - T.ignite);
        L.emit(0.5 + (Math.random() - 0.5) * (0.03 + k * 0.14), 0.02 + k * 0.22, (Math.random() - 0.5) * (80 + k * 260), 260 + k * 520, 0.25 + k * 1.5);
        if (k > 0.45 && Math.random() < 0.35)
          L.emit(0.5 + (Math.random() - 0.5) * 0.5, 0.1 + Math.random() * 0.25, (Math.random() - 0.5) * 400, 300 + Math.random() * 300, 0.6 + k);
      }
      introLevel = smooth(T.ambIn[0], T.ambIn[1], t);
      introOpacity = smooth(T.ignite - 0.2, T.ignite + 1.4, t);
      once('words', T.words, t, () => revealText(false));
      once('head', T.head, t, () => head.classList.remove('pre'));
      once('sub', T.sub, t, () => sub.classList.add('on'));
      once('hint', T.hint, t, () => {
        hint.classList.add('on');
        introDone = true;
        skip.classList.remove('on');
      });
    }

    // 인트로: 스크롤로 소등
    const p = prog(introEl);
    const fade = 1 - smooth(0.05, 0.72, p), vis = 1 - smooth(0.3, 0.92, p);

    // 소개 → 작품 구간: 소개 직전에 재점화, 작품 구간이 끝나면 소등, 위로 올라가면 스르륵 소등
    const vh = innerHeight, ar = aboutEl.getBoundingClientRect(), wr = worksEl.getBoundingClientRect();
    if (!relit && p >= 1 && ar.top <= vh * TRIG) reignite(now);
    else if (relit && ar.top > vh * (TRIG + 0.55)) relit = 0; // 인트로 쪽으로 완전히 돌아가면 다음에 다시 재점화
    const rt = relit ? (now - relit) / 1000 : 0;
    if (relit) pour(now, rt);
    const up = relit ? 1 - smooth(vh * TRIG, vh * (TRIG + 0.52), ar.top) : 0;
    const z = relit ? smooth(0, 1, clamp(wr.bottom / (vh * 0.8), 0, 1)) * up : 0;
    const flash = reduce ? 1 : smooth(0, 0.2, rt);
    const open = reduce ? 1 : 1 - Math.pow(1 - clamp(rt / 0.8, 0, 1), 3); // 잉크가 퍼지는 만큼 어둠이 열림
    if (wr.top < vh * 0.5) {
      let act = -1;
      scenes.forEach((sc, i) => {
        const r = sc.getBoundingClientRect();
        if (r.top < vh * 0.5 && r.bottom > vh * 0.5) act = i;
      });
      if (act >= 0) preset(lights[act], true);
    } else if (relit) preset('candle', false);

    if (L) {
      L.level = Math.max(Math.min(introLevel, fade), z);
      const k = Math.max(smooth(0.08, 0.8, p) * (1 - z), relit ? 1 - up : 0); // 꺼질 때 잔광도 빨리 사라짐
      L.config.DENSITY_DISSIPATION = BASE.DENSITY_DISSIPATION + k * 3.2;
      L.config.SUNRAYS_WEIGHT = BASE.SUNRAYS_WEIGHT * (z > 0 ? 0.7 : 1 - smooth(0.1, 0.7, p));
      L.config.BLOOM_INTENSITY = BASE.BLOOM_INTENSITY * (z > 0 ? 0.75 : 1 - smooth(0.2, 0.85, p) * 0.8);
      const need = p < 0.98 || z > 0.02;
      if (!need && L.running && p >= 0.985) L.pause();
      else if (need && !L.running && !reduce && !document.hidden) L.resume();
    }
    const io = introOpacity * vis, zl = z * GAME_DIM * flash;
    canvas.style.opacity = Math.max(io, zl).toFixed(3);
    veil.style.opacity = io.toFixed(3);
    veilG.style.opacity = (z * flash).toFixed(3);
    fallback.style.setProperty('--f', Math.max(vis, zl).toFixed(3));
    if (p > 0 && p < 1) {
      iris.style.opacity = '1';
      iris.style.setProperty('--cy', '62%');
      iris.style.setProperty('--r', (1 - smooth(0.12, 0.95, p)) * 120 + 'vmax');
    } else if (relit && open < 1 && up > 0.99) {
      iris.style.opacity = '1';
      iris.style.setProperty('--cy', '50%');
      iris.style.setProperty('--r', open * 120 + 'vmax');
    } else iris.style.opacity = '0';

    if (introDone || reduce) words.forEach((w, i) => w.classList.toggle('out', p > 0.22 + (words.length - 1 - i) * 0.07));
    lineEl.style.transform = 'translateY(' + -smooth(0.15, 1, p) * 6 + 'vh)';
    lineEl.style.opacity = String(1 - smooth(0.85, 1, p));
    if (sub.classList.contains('on')) sub.style.opacity = String(1 - smooth(0.1, 0.45, p));
    if (hint.classList.contains('on')) hint.style.opacity = String(1 - smooth(0.01, 0.12, p));
  }

  /* ---------- 오도미터(연도): 자리마다 스프링으로 따라감 (목표가 바뀌어도 속도를 이어받아 멈추지 않음) ---------- */
  const odo = $('odo');
  const odoState = Array.from(odo.querySelectorAll<HTMLElement>('.odo__col > span')).map((el, k) => {
    const x = Number((el.style.transform.match(/-?([\d.]+)em/) || [])[1] || 0);
    return { el, x, v: 0, to: x, w: 20 - k * 1.2 };
  });
  let odoRaf = 0, odoLast = 0;
  function odoTick(now: number) {
    const dt = Math.min(0.05, (now - (odoLast || now)) / 1000);
    odoLast = now;
    let busy = false;
    for (const d of odoState) {
      const a = d.w * d.w * (d.to - d.x) - 2 * d.w * d.v; // 임계 감쇠
      d.v += a * dt;
      d.x += d.v * dt;
      if (Math.abs(d.to - d.x) < 0.002 && Math.abs(d.v) < 0.01) {
        d.x = d.to;
        d.v = 0;
      } else busy = true;
      d.el.style.transform = 'translateY(' + (-d.x).toFixed(4) + 'em)';
    }
    odoRaf = busy ? requestAnimationFrame(odoTick) : 0;
    if (!busy) odoLast = 0;
  }
  // 지나온 시간: 화면 가운데를 지난 마지막 줄이 "지금 보는 줄" — 그 줄만 밝히고 연도를 굴린다
  const evs = Array.from(document.querySelectorAll<HTMLElement>('.ev'));
  const odoLabel = $('odoLabel');
  let curEv = -1;
  function setEv(i: number) {
    if (i === curEv || !evs[i]) return;
    const first = curEv < 0;
    curEv = i;
    const e = evs[i], date = e.dataset.date || '', end = e.dataset.end || '';
    const ds = Array.from(date.slice(0, 4));
    odoState.forEach((d, k) => {
      d.to = Number(ds[k]);
      if (reduce || first) {
        d.x = d.to;
        d.v = 0;
        d.el.style.transform = 'translateY(' + -d.x + 'em)';
      }
    });
    if (!odoRaf && !first) odoRaf = requestAnimationFrame(odoTick);
    const cap = document.createElement('span');
    cap.className = 'cap';
    cap.textContent = date + (end ? ' – ' + end : '');
    const b = document.createElement('b');
    b.textContent = e.querySelector('.ev__t')?.textContent || '';
    odoLabel.replaceChildren(cap, b);
    evs.forEach((el, k) => el.classList.toggle('on', k === i));
  }

  /* ---------- 스크롤 엔진 ---------- */
  const toolWords = document.querySelectorAll<HTMLElement>('#tools .w');
  const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section[id]'));
  const navlinks = document.querySelectorAll<HTMLElement>('#nav a');
  let lastY = scrollY, queued = false;
  function update() {
    queued = false;
    const y = scrollY, vh = innerHeight, dy = y - lastY;
    lastY = y;
    if (introDone) {
      if (dy > 6 && y > vh) head.classList.add('hide');
      else if (dy < -6 || y < 60) head.classList.remove('hide');
    }
    for (const s of scenes) {
      const pic = s.querySelector<HTMLElement>('.scene__pic');
      if (!pic) continue;
      const pr = pic.getBoundingClientRect();
      const exp = clamp((vh * 0.95 - pr.top) / (vh * 0.7), 0, 1) * clamp(pr.bottom / (vh * 0.5), 0, 1);
      pic.style.setProperty('--exp', (0.08 + exp * 0.92).toFixed(3));
    }
    toolWords.forEach((w) => w.classList.toggle('on', reduce || w.getBoundingClientRect().top < vh * 0.7));
    let act = 0;
    evs.forEach((c, i) => {
      if (c.getBoundingClientRect().top < vh * 0.5) act = i;
    });
    setEv(act);
    let cur: string | null = null;
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top < vh * 0.45 && r.bottom > vh * 0.3) cur = s.id;
    }
    navlinks.forEach((a) => {
      const m = a.dataset.sec === cur;
      a.classList.toggle('on', m);
      if (m) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  }
  const onScroll = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  document.addEventListener('visibilitychange', () => {
    if (!L) return;
    if (document.hidden) L.pause();
    else if (!reduce) L.resume();
  });

  // 지나온 시간: 연도 묶음 등장
  const rio = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        rio.unobserve(e.target);
      }
    }),
    { rootMargin: '0px 0px -15% 0px' },
  );
  document.querySelectorAll('.yr').forEach((c) => rio.observe(c));

  // 프레임이 계속 낮으면 광원 해상도를 낮춤
  (function () {
    let n = 0, last = performance.now(), low = 0, degraded = false;
    (function t(now: number) {
      n++;
      if (now - last >= 1000) {
        const fps = Math.round((n * 1000) / (now - last));
        n = 0;
        last = now;
        if (L && L.running && fps < 45) low++;
        else low = 0;
        if (low >= 3 && !degraded && L) {
          degraded = true;
          L.lowQuality();
        }
      }
      requestAnimationFrame(t);
    })(last);
  })();

  /* ---------- 작품: 썸네일에 올리면 플레이 영상 ---------- */
  (function () {
    const pics = Array.from(document.querySelectorAll<HTMLElement>('.scene__pic')).filter((c) => c.querySelector('video'));
    const coarse = matchMedia('(hover: none), (pointer: coarse)').matches;
    const vid = (c: HTMLElement) => c.querySelector('video') as HTMLVideoElement;
    function stop(c: HTMLElement) {
      const v = vid(c);
      if (v.src) v.pause();
      c.classList.remove('playing');
    }
    function play(c: HTMLElement) {
      pics.forEach((o) => o !== c && stop(o));
      const v = vid(c);
      if (!v.src) {
        // mp4(H.264)를 못 여는 브라우저(일부 오픈소스 Chromium 등)는 같은 이름의 webm으로
        const src = v.dataset.src || '';
        const mp4ok = v.canPlayType('video/mp4; codecs="avc1.4D401E"') !== '';
        v.src = !mp4ok && /\.mp4$/.test(src) ? src.replace(/\.mp4$/, '.webm') : src;
      }
      c.classList.add('playing');
      v.play().catch(() => c.classList.remove('playing'));
    }
    document.querySelectorAll<HTMLElement>('.scene__pic').forEach((c) => {
      c.addEventListener('click', () => {
        if (c.dataset.href) location.href = c.dataset.href;
      });
    });
    pics.forEach((c) => {
      c.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && play(c));
      c.addEventListener('pointerleave', (e) => e.pointerType === 'mouse' && stop(c));
      const go = c.closest('.scene')?.querySelector<HTMLElement>('.scene__go'); // 키보드: 링크에 포커스가 가면 재생
      go?.addEventListener('focus', () => play(c));
      go?.addEventListener('blur', () => stop(c));
    });
    const ratios = new Map<Element, number>();
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          ratios.set(e.target, e.isIntersecting ? e.intersectionRatio : 0);
          if (!coarse && !e.isIntersecting) stop(e.target as HTMLElement);
        });
        if (coarse && !reduce) {
          // 터치: 가장 많이 보이는 썸네일 하나만 재생
          let best: HTMLElement | null = null, br = 0.6;
          ratios.forEach((r, c) => {
            if (r > br) {
              br = r;
              best = c as HTMLElement;
            }
          });
          pics.forEach((c) => c !== best && stop(c));
          const b = best as HTMLElement | null;
          if (b && !b.classList.contains('playing')) play(b);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.6, 0.75, 0.9, 1] },
    );
    pics.forEach((c) => io.observe(c));
    document.addEventListener('visibilitychange', () => document.hidden && pics.forEach(stop));
  })();

  /* ---------- 연락: 주소 복사 ---------- */
  const copyBtn = document.getElementById('copyBtn');
  copyBtn?.addEventListener('click', () => {
    const mail = $('mailText');
    const ok = () => {
      copyBtn.textContent = '복사했습니다';
      setTimeout(() => (copyBtn.textContent = '주소 복사'), 1600);
    };
    const sel = () => {
      const r = document.createRange();
      r.selectNodeContents(mail);
      const s = getSelection();
      s?.removeAllRanges();
      s?.addRange(r);
      copyBtn.textContent = '선택했습니다';
    };
    if (navigator.clipboard) navigator.clipboard.writeText(mail.textContent || '').then(ok, sel);
    else sel();
  });

  /* ---------- 시작 ---------- */
  // 해시로 들어왔거나(예: 상세에서 "작품으로") 뒤로 가기로 돌아왔으면 인트로를 건너뜀
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  const skipIntro = (location.hash && location.hash !== '#top') || nav?.type === 'back_forward' || scrollY > 10;
  if (skipIntro) {
    introDone = true;
    fired = { words: true, head: true, sub: true, hint: true };
    t0 = performance.now() - 6000;
    revealText(true);
    head.classList.remove('pre');
    sub.classList.add('on');
    hint.classList.add('on');
  } else startIntro();
  requestAnimationFrame(frame);
  onScroll();
}
