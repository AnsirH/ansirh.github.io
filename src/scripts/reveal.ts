/**
 * 스크롤 시 요소를 순차로 드러낸다.
 *
 * `[data-reveal]` 요소의 상단이 뷰포트 하단 근처(88%)에 닿으면 `.is-visible` 을 붙인다.
 * 스크롤 위치를 직접 계산하며(IntersectionObserver·requestAnimationFrame 미사용),
 * scroll/resize/visibilitychange 마다 재검사한다. "화면에 들어온 것만" 나타나므로
 * 스크롤과 무관하게 한꺼번에 표시되는 일이 없다.
 *
 * - 첫 실행 시 이미 화면 안/위의 요소는 즉시 표시.
 * - 셋업 중 오류가 나면 전부 표시(콘텐츠가 숨은 채 멈추지 않도록).
 * - JS 자체가 없으면 `html.js` 가 없어 CSS 가 숨기지 않는다(Layout 참고).
 */
function initReveal(): void {
  const pending = new Set(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (pending.size === 0) return;

  try {
    const check = (): void => {
      const trigger = window.innerHeight * 0.88;
      for (const el of pending) {
        if (el.getBoundingClientRect().top < trigger) {
          el.classList.add('is-visible');
          pending.delete(el);
        }
      }
      if (pending.size === 0) {
        window.removeEventListener('scroll', check);
        window.removeEventListener('resize', check);
        document.removeEventListener('visibilitychange', check);
      }
    };

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    document.addEventListener('visibilitychange', check);
    check();
  } catch {
    pending.forEach((el) => el.classList.add('is-visible'));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal, { once: true });
} else {
  initReveal();
}
