import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 게임 컬렉션 — 유니티 WebGL 빌드로 플레이 가능한 게임.
 * 콘텐츠는 src/content/games/*.md 의 frontmatter 로 관리한다.
 * 파일을 추가/수정하면 페이지 코드 변경 없이 반영된다.
 */
/** 트러블슈팅 한 항목 — 상세 페이지 하단에 카드로 렌더링 */
const troubleshootingEntry = z.object({
  /** 증상 / 문제 */
  problem: z.string(),
  /** 원인 · 접근 (선택) */
  cause: z.string().default(''),
  /** 해결 방법 */
  solution: z.string(),
  /** 배운 점 · 트레이드오프 (선택) */
  learned: z.string().default(''),
});

const games = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
  schema: z.object({
    title: z.string(),
    /** 카드/상세 상단에 쓰는 한 줄 요약 */
    description: z.string(),
    /** URL 세그먼트 — /games/<slug> */
    slug: z.string(),
    /** 진행 기간 (예: "2025.03 – 2025.05"). 빈 값 허용 */
    period: z.string().default(''),
    /** 팀 프로젝트에서 내가 맡은 시스템/분야 한 줄. 빈 값 허용 */
    role: z.string().default(''),
    /** 사용 기술 태그 */
    techStack: z.array(z.string()).default([]),
    /** 소스 저장소 링크. 빈 값이면 헤더 버튼 숨김 */
    repoUrl: z.string().default(''),
    /**
     * WebGL 빌드 진입 경로 (예: /games/<name>/index.html).
     * 지금은 빈 값 허용 — 값이 없으면 상세 페이지에서 "빌드 준비 중" 표시.
     */
    playUrl: z.string().default(''),
    /** 스크린샷·GIF 경로 배열. 비어 있으면 placeholder 박스 표시 */
    images: z.array(z.string()).default([]),
    /** 트러블슈팅 항목들. 비어 있으면 섹션 자체를 숨김 */
    troubleshooting: z.array(troubleshootingEntry).default([]),
    /** 메인 페이지 정렬 순서 (작을수록 먼저) */
    order: z.number().default(0),
  }),
});

/**
 * 작업 컬렉션 — 최근 9개월간의 작업 (이미지 + 설명).
 * 콘텐츠는 src/content/work/*.md 의 frontmatter 로 관리한다.
 */
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    /** 진행 기간 (예: "2025.03 – 2025.05") */
    period: z.string(),
    description: z.string(),
    /** URL 세그먼트 — /work/<slug> */
    slug: z.string(),
    /**
     * 스크린샷 등 이미지 경로 배열.
     * 지금은 빈 배열 허용 — 비어 있으면 상세 페이지에서 placeholder 박스 표시.
     */
    images: z.array(z.string()).default([]),
    /** 메인 페이지 정렬 순서 (작을수록 먼저) */
    order: z.number().default(0),
  }),
});

export const collections = { games, work };
