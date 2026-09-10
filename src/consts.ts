/**
 * 사이트 전역 메타데이터와 히어로 섹션 문구.
 * 실제 값은 다음 작업에서 채운다 — 지금은 placeholder.
 */
export const SITE = {
  /** 이름 (placeholder) */
  name: 'Ansir H',
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
