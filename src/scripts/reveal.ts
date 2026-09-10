/**
 * 스크롤에 따라 요소를 나타내고 다시 숨긴다 (양방향).
 *
 * `[data-reveal]` 요소가 뷰포트 안에 들어오면 `.is-visible` 을 붙이고,
 * 화면 밖(위/아래 어느 쪽이든)으로 나가면 다시 떼어낸다.
 * → 아래로 내릴 때든 위로 올릴 때든 매번 등장 애니메이션이 재생된다.
 *
 * 스크롤 위치를 직접 계산한다(IntersectionObserver 미사용). scroll 은
 * requestAnimationFrame 으로 스로틀. resize / 탭 복귀 시에도 재동기화.
 * 셋업 중 오류가 나면 전부 표시(콘텐츠가 숨은 채 멈추지 않도록).
 * JS 자체가 없으면 `html.js` 가 없어 CSS 가 숨기지 않는다(Layout 참고).
 */
function initReveal(): void {
  const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (elements.length === 0) return;

  try {
    const sync = (): void => {
      const viewportHeight = window.innerHeight;
      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        // 상단이 화면 하단 85% 안으로 들어왔고, 하단이 아직 화면 위로 사라지지 않음
        const inView = rect.top < viewportHeight * 0.85 && rect.bottom > 0;
        element.classList.toggle('is-visible', inView);
      }
    };

    let ticking = false;
    const onScroll = (): void => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        sync();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) sync();
    });

    sync();
  } catch {
    elements.forEach((element) => element.classList.add('is-visible'));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal, { once: true });
} else {
  initReveal();
}
