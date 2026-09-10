/**
 * 사이트 전역 메타데이터와 히어로 섹션 문구.
 * 실제 값은 다음 작업에서 채운다 — 지금은 placeholder.
 */
export const SITE = {
  /** 이름 (placeholder) */
  name: 'Ansir H',
  /** 히어로에 크게 표시되는 이름 (placeholder) */
  displayName: 'ansirH',
  /** 직군 한 줄 소개 (placeholder) */
  role: 'Unity Game Client Developer',
  /** 히어로 한 줄 소개 (placeholder) */
  tagline: '플레이 가능한 게임과 최근 작업으로 정리한 포트폴리오입니다.',
  /** 사이트 설명 — <meta name="description"> 기본값 (placeholder) */
  description: 'Unity 게임 클라이언트 개발자 포트폴리오. 플레이 가능한 게임 빌드와 최근 작업 모음.',
} as const;

/** 연락처 / 외부 링크 자리 — 실제 URL은 다음 작업에서 (placeholder) */
export const LINKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'GitHub', href: '#' },
  { label: 'Email', href: '#' },
  { label: 'Resume', href: '#' },
];

/**
 * 히어로 다음에 스크롤하면 순차로 드러나는 "스펙" 항목 — 지금은 placeholder.
 * 실제 이력/기술은 나중에 이 배열만 교체하면 된다 (SpecPanel.astro 코드 변경 불필요).
 */
export interface SpecGroup {
  /** 그룹 제목 (예: "역할", "핵심 기술") */
  label: string;
  /** 그룹에 속한 항목들 */
  items: readonly string[];
}

export const SPEC: readonly SpecGroup[] = [
  { label: '역할', items: ['Unity 게임 클라이언트 개발', 'UI · 게임플레이 · 툴 프로그래밍'] },
  { label: '경력', items: ['최근 9개월 · 작업 5건 / 게임 3종', '경력 요약 자리 (placeholder)'] },
  { label: '핵심 기술', items: ['C#', 'Unity Engine', 'Gameplay Systems', 'Editor Tooling'] },
  { label: '툴', items: ['Git', 'Addressables', 'DOTween', 'Rider'] },
];

/**
 * 방문자 통계 (GoatCounter).
 * goatCounterCode = goatcounter.com 가입 시 정한 code (예: 'ansirh').
 * 값이 비어 있으면 분석 스크립트를 렌더링하지 않는다.
 * 스크립트는 프로덕션 빌드에서만 로드된다 (Layout.astro 참고).
 */
export const ANALYTICS = {
  goatCounterCode: 'ansirh',
} as const;
