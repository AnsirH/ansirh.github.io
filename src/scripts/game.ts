/**
 * 게임 상세 — 어둠 속 오락기.
 * 화면: 스크린샷 → PRESS START → 브라우저 빌드가 있으면 iframe, 없으면 안내(playNote).
 * 켜질 때 CRT 점등, 제목 글자 튀어오름, 버그 기록은 화면에 들어오면 타이핑.
 */
export function bootGame() {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) root.classList.add('motion');
  const gd = document.querySelector<HTMLElement>('.gd');
  if (!gd) return;
  const { play = '', note = '', frame = '' } = gd.dataset;

  // PRESS START
  const btn = document.getElementById('gdStart') as HTMLButtonElement;
  const inner = document.getElementById('gdInner') as HTMLElement;
  const screen = document.getElementById('screen') as HTMLElement;
  btn.addEventListener('click', () => {
    if (btn.dataset.state) return;
    btn.dataset.state = '1';
    inner.innerHTML = '<span class="blink" style="animation:none">LOADING</span><span class="loadbar"><i id="lb"></i></span>';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const lb = document.getElementById('lb');
      if (lb) lb.style.width = '100%';
    }));
    setTimeout(() => {
      if (play) {
        const f = document.createElement('iframe');
        f.src = play;
        f.title = `${document.title} WebGL 빌드`;
        f.allow = 'fullscreen; autoplay';
        screen.classList.add('live');
        const [fw, fh, ph] = frame.split(',').map(Number);
        if (fw && fh && ph) {
          // 고정 크기 페이지: 원래 크기로 띄우고 게임 화면만 남겨 오락기 화면에 맞게 축소
          const fit = document.createElement('div');
          fit.className = 'screen__fit';
          fit.style.width = fw + 'px';
          fit.style.height = fh + 'px';
          f.style.width = fw + 'px';
          f.style.height = ph + 'px';
          fit.appendChild(f);
          screen.replaceChildren(fit);
          const resize = () => {
            const s = Math.min(screen.clientWidth / fw, screen.clientHeight / fh);
            fit.style.transform = `translate(-50%, -50%) scale(${s})`;
          };
          resize();
          new ResizeObserver(resize).observe(screen);
        } else screen.replaceChildren(f);
        f.focus();
      } else {
        const msg = document.createElement('span');
        msg.className = 'screen__msg';
        msg.textContent = 'NO WEB BUILD';
        const sub = document.createElement('span');
        sub.className = 'screen__sub';
        sub.textContent = note || '브라우저 빌드를 준비하고 있습니다.';
        const hint = document.createElement('span');
        hint.className = 'blink';
        hint.textContent = '▼ 아래에서 더 보기';
        inner.replaceChildren(msg, sub, hint);
      }
    }, reduce ? 50 : 1500);
  });

  // 조작 키: 누르면 눌린 모양
  const keys = document.querySelectorAll<HTMLElement>('.key');
  const map: Record<string, string> = { ArrowLeft: '←', ArrowRight: '→', ArrowUp: '↑', ArrowDown: '↓', Shift: 'SHIFT' };
  addEventListener('keydown', (e) => {
    const k = e.key === ' ' ? 'SPACE' : e.key.length === 1 ? e.key.toUpperCase() : map[e.key];
    keys.forEach((el) => el.dataset.key === k && el.classList.add('dn'));
    if (e.key === 'Escape') location.href = '/#works';
  });
  addEventListener('keyup', () => keys.forEach((el) => el.classList.remove('dn')));

  // 제목: 글자별로 튀어오름
  const title = document.getElementById('gdTitle');
  if (title) {
    const t = title.textContent || '';
    title.setAttribute('aria-label', t);
    title.textContent = '';
    Array.from(t).forEach((c, i) => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.textContent = c;
      s.style.setProperty('--i', String(i));
      s.setAttribute('aria-hidden', 'true');
      title.appendChild(s);
    });
  }

  // 버그 기록: 화면에 들어오면 타이핑
  function typeBug(bug: HTMLElement) {
    const ps = Array.from(bug.querySelectorAll<HTMLElement>('p[data-text]'));
    const state = bug.querySelector('.bug__h span') as HTMLElement;
    const finish = () => {
      bug.classList.add('done');
      state.textContent = '해결';
    };
    let i = 0;
    (function next() {
      if (i >= ps.length) return finish();
      const p = ps[i++], t = p.dataset.text || '';
      let n = 0;
      p.classList.add('typing');
      const iv = setInterval(() => {
        n += 2;
        p.textContent = t.slice(0, n);
        if (n >= t.length) {
          clearInterval(iv);
          p.classList.remove('typing');
          setTimeout(next, 180);
        }
      }, 18);
    })();
  }
  const bugs = document.querySelectorAll<HTMLElement>('[data-bug]');
  if (reduce) bugs.forEach((b) => b.classList.add('done'));
  else {
    const bio = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          bio.unobserve(e.target);
          typeBug(e.target as HTMLElement);
        }
      }),
      { rootMargin: '0px 0px -20% 0px' },
    );
    bugs.forEach((b) => {
      (b.querySelector('.bug__h span') as HTMLElement).textContent = '추적 중';
      b.querySelectorAll<HTMLElement>('p[data-text]').forEach((p) => (p.textContent = ''));
      bio.observe(b);
    });
  }

  // 화면 켜짐 (CRT)
  if (!reduce) {
    const ov = document.createElement('div');
    ov.className = 'crt-on';
    ov.innerHTML = '<i></i>';
    document.body.appendChild(ov);
    setTimeout(() => ov.remove(), 1200);
  }
}
