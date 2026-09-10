/**
 * 스크롤 시 요소를 순차로 드러내는 IntersectionObserver.
 *
 * `[data-reveal]` 요소가 뷰포트에 들어오면 `.is-visible` 을 한 번 추가한다.
 * - `prefers-reduced-motion: reduce` : 즉시 전부 표시 (모션 없음)
 * - IntersectionObserver 미지원                    : 즉시 전부 표시
 * - 4초 failsafe: 어떤 이유로든 관측이 동작하지 않아도 콘텐츠가 계속
 *   숨어있지 않도록 남은 요소를 모두 표시한다 (탭이 백그라운드로 로드되면
 *   IO 콜백이 지연될 수 있음).
 * - JS 자체가 없으면 `html.js` 가 안 붙으므로 CSS 가 숨기지 않는다 (Layout 참고).
 */
const FAILSAFE_MS = 4000;

function initReveal(): void {
  const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (elements.length === 0) return;

  const revealAll = (): void => {
    elements.forEach((element) => element.classList.add('is-visible'));
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealAll();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
  );

  elements.forEach((element) => observer.observe(element));

  window.setTimeout(() => {
    observer.disconnect();
    revealAll();
  }, FAILSAFE_MS);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal, { once: true });
} else {
  initReveal();
}
