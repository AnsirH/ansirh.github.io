/**
 * 풀스크린 "홀드 → 검은 화면 → 페이드인" 갤러리 스크러버.
 *
 * `.pg` 컨테이너(높이 = 슬라이드 수 * 100svh) 안에서 스크롤 위치를 직접
 * 0~1 진행도로 계산해 각 `.pg__panel` 의 opacity 에 그대로 대입한다.
 * 시간 기반 애니메이션(transition/animation)이 아니라 매 scroll 이벤트마다
 * 현재 스크롤량만 읽어 반영하므로, 스크롤을 멈추면 전환도 정확히 그 자리에서
 * 멈춘다. 화면 자체는 `.pg__sticky`(position:sticky)로 고정돼 위아래로
 * 움직이지 않는다.
 *
 * 이미지 하나당 진행도 한 칸(0~1 사이)을 차지하며, 그 안에서 이미지(.pg__media)는:
 *   |d| <= HOLD              : 그대로 유지 (opacity 1)
 *   HOLD < |d| <= HOLD+FADE  : 검은 화면으로 선형 페이드아웃/인
 *   |d| >  HOLD+FADE         : 완전히 검음 (opacity 0)
 * 이웃한 두 이미지의 페이드 구간이 서로 안 겹치므로(HOLD+FADE < 0.5)
 * 전환 사이에 실제로 화면이 검게 비는 구간이 생긴다
 * (`.pg__sticky` 배경이 검정이라 그 사이엔 검은 화면만 보인다).
 *
 * 텍스트(.pg__text)는 이미지처럼 스크롤량에 그대로 붙지 않는다 — 이 스크립트는
 * "충분히 보이는 상태인가"만 판단해 .is-visible 을 켜고 끄고, 실제 등장/퇴장
 * 움직임(이징 + 위아래 이동)은 컴포넌트의 CSS transition 이 맡는다. 그래서
 * 스펙 섹션(예: 툴) 리빌과 같은 자연스러운 느낌으로 나타나고 사라진다.
 *
 * 화면에 유의미하게(opacity 기준) 보이는 패널만 클릭·키보드 포커스가
 * 가능하도록 pointer-events / aria-hidden / tabindex 도 함께 갱신한다.
 * 검은 화면 구간에서는 아무 패널도 활성화되지 않는다.
 *
 * 첫 번째 패널은 진행도가 항상 0 이상으로 클램프되기 때문에, 갤러리에
 * 도달하기 한참 전(심지어 페이지 로드 시점)에도 "진행도 0" 과 구분이 안 되는
 * 문제가 있었다 — 그래서 스크롤해서 화면에 닿기도 전에 텍스트가 미리 보였다.
 * 이를 막기 위해 `.pg` 가 실제로 고정되기 시작했는지(rect.top <= 0)를 별도로
 * 확인해서, 그 전에는 어떤 패널의 텍스트/클릭도 활성화하지 않는다.
 *
 * `.pg` 자체는 prefers-reduced-motion 이거나 JS 가 없으면 CSS 가 숨기고
 * 대신 일반 목록(.pg-fallback)을 보여준다 — 이 스크립트는 그 상태를
 * 신경 쓸 필요 없이 항상 최신 값을 계산해두기만 하면 된다.
 *
 * ------------------------------------------------------------------
 * 맨 앞 "섹션 구분" 슬라이드(.pg__panel--divider, PortfolioGallery 의
 * `divider` prop으로 추가됨)가 있는 경우:
 *
 * 화면 위치가 전혀 안 움직이면서 크로스페이드로 다음 섹션으로 넘어가려면,
 * 구분 헤더와 첫 아이템이 서로 다른 .sticky 컨테이너에 있으면 안 된다 —
 * 각자 독립적으로 고정되는 두 컨테이너를 이어 붙이면, 앞 컨테이너의 고정이
 * 풀리고 나서 그 컨테이너 높이만큼(패널 하나 높이만큼) 화면이 그대로
 * 스크롤되어 사라진 뒤에야 다음 컨테이너가 고정을 시작하는 "빈 스크롤 구간"이
 * 반드시 생긴다(패널 높이 = 뷰포트 높이인 이상 피할 수 없다). 그래서 구분
 * 헤더를 별도 장면이 아니라 이 갤러리의 슬라이드 0번으로 합쳐서, 다른
 * 슬라이드 사이 전환과 똑같이 "하나의 이어진 .pg__sticky" 안에서 progress
 * 하나로 처리한다.
 *
 * 디바이더 슬라이드는 조립→유지→해체(divider-assembly.ts, 각각 30%/55%/15%)
 * 곡선으로 좌우 HUD 크롬을 슬라이드인/아웃 시키고, 해체 구간(85%~100%)
 * 동안 자기 opacity를 1→0 으로 내린다. 바로 다음 슬라이드(index 1)는 같은
 * 구간에서 opacity를 정확히 대칭으로 0→1 올려서 — 이웃 슬라이드끼리처럼
 * 검게 비는 구간 없이 — 진짜 크로스페이드가 되게 한다. (index 1의 반대쪽,
 * 즉 index 2로 넘어가는 전환은 갤러리의 나머지 슬라이드들과 동일하게 보통의
 * hold→검정→fade 방식을 그대로 쓴다.)
 */

import { assembly, disassembleFade, REVEAL_THRESHOLD } from './divider-assembly';

/** 이미지가 그대로 유지되는 폭 (진행도 한 칸 기준, 0~0.5) */
const HOLD = 0.3;
/** 유지 구간 이후 검게 사라지는/나타나는 폭 */
const FADE = 0.12;
/** 패널이 클릭 가능하다고 볼 opacity 임계값 */
const ACTIVE_THRESHOLD = 0.5;

function panelOpacity(distance: number): number {
  if (distance <= HOLD) return 1;
  if (distance <= HOLD + FADE) return 1 - (distance - HOLD) / FADE;
  return 0;
}

interface PanelOpacityInput {
  index: number;
  position: number;
  hasDivider: boolean;
}

/** 패널 하나의 opacity — 디바이더와 맞닿은 두 슬라이드(0, 1)만 대칭 크로스페이드,
 * 그 외는 기존 hold→검정→fade 공식을 그대로 쓴다. */
function computeOpacity({ index, position, hasDivider }: PanelOpacityInput): number {
  if (hasDivider && index === 0) {
    return 1 - disassembleFade(position);
  }
  if (hasDivider && index === 1 && position < 1) {
    return disassembleFade(position);
  }
  return panelOpacity(Math.abs(position - index));
}

function initPortfolioGalleries(): void {
  const galleries = Array.from(document.querySelectorAll<HTMLElement>('.pg'));
  if (galleries.length === 0) return;

  const update = (): void => {
    for (const gallery of galleries) {
      const panels = Array.from(gallery.querySelectorAll<HTMLElement>('.pg__panel'));
      const count = panels.length;
      if (count === 0) continue;

      const hasDivider = panels[0]?.classList.contains('pg__panel--divider') ?? false;

      const rect = gallery.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const raw = scrollable > 0 ? -rect.top / scrollable : 0;
      const progress = Math.min(1, Math.max(0, raw));
      const position = progress * (count - 1);
      // 갤러리가 실제로 화면에 고정되기 시작한 뒤에만 활성화 (도달 전엔 항상 false)
      const engaged = rect.top <= 0;

      panels.forEach((panel, i) => {
        const opacity = computeOpacity({ index: i, position, hasDivider });

        if (panel.classList.contains('pg__panel--divider')) {
          panel.style.opacity = String(opacity);

          const amount = engaged ? assembly(position) : 0;
          const offset = (1 - amount) * 100;
          panel.querySelectorAll<HTMLElement>('.sd__slide-left').forEach((el) => {
            el.style.transform = `translateX(${-offset}%)`;
          });
          panel.querySelectorAll<HTMLElement>('.sd__slide-right').forEach((el) => {
            el.style.transform = `translateX(${offset}%)`;
          });

          const show = engaged && amount > REVEAL_THRESHOLD;
          panel.querySelectorAll<HTMLElement>('.sd__reveal').forEach((el) => {
            el.classList.toggle('is-visible', show);
          });
          return;
        }

        const isActive = engaged && opacity > ACTIVE_THRESHOLD;

        const media = panel.querySelector<HTMLElement>('.pg__media');
        if (media) media.style.opacity = String(opacity);

        const text = panel.querySelector<HTMLElement>('.pg__text');
        text?.classList.toggle('is-visible', isActive);

        panel.style.pointerEvents = isActive ? 'auto' : 'none';
        panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        panel.tabIndex = isActive ? 0 : -1;
      });
    }
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolioGalleries, { once: true });
} else {
  initPortfolioGalleries();
}

export {};
