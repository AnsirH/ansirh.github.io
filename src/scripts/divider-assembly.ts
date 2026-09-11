/**
 * 섹션 구분 헤더의 "조립(바깥→안) → 유지 → 해체(안→바깥)" 진행도 매핑.
 * portfolio-gallery.ts(갤러리에 합쳐진 디바이더 슬라이드)가 이 곡선을 써서
 * 좌우 HUD 크롬을 슬라이드인/아웃 시킨다.
 */

/** 조립(슬라이드 인)이 끝나는 진행도 — 조립 30% */
export const ASSEMBLE_END = 0.3;
/** 이 진행도까지는 완성된 채로 유지(유지 40%), 이후부터 해체 시작(해체 30%) */
export const HOLD_END = 0.7;
/** 조립량이 이 값을 넘는 동안만 타이틀 표시 */
export const REVEAL_THRESHOLD = 0.5;

/** 진행도(0~1) → 조립량(0=완전히 바깥, 1=완전히 조립) — 조립 → 유지 → 해체 */
export function assembly(progress: number): number {
  const t = Math.min(1, Math.max(0, progress));
  if (t <= ASSEMBLE_END) return t / ASSEMBLE_END;
  if (t <= HOLD_END) return 1;
  return 1 - (t - HOLD_END) / (1 - HOLD_END);
}

/** 진행도(0~1) → 해체 페이드 비율(0=해체 시작 전, 1=완전히 해체됨).
 * HOLD_END 부터 시작해 1에서 끝나는 assembly() 의 해체 구간과 정확히 반대. */
export function disassembleFade(progress: number): number {
  const t = Math.min(1, Math.max(0, progress));
  if (t <= HOLD_END) return 0;
  return (t - HOLD_END) / (1 - HOLD_END);
}
