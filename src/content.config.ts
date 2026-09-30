import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** 트러블슈팅 한 항목 — 게임 상세의 "버그 기록"으로 렌더링 */
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

/**
 * 게임 컬렉션 — 포트폴리오에 선정한 게임 (유니티 WebGL 빌드로 플레이 가능).
 * 콘텐츠는 src/content/games/*.md 의 frontmatter 로 관리한다.
 */
const games = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
  schema: z.object({
    title: z.string(),
    /** 상세 상단에 쓰는 한 줄 요약 */
    description: z.string(),
    /** 메인 작품 구간에 쓰는 장면 묘사 한 줄 */
    line: z.string().default(''),
    /** URL 세그먼트 — /games/<slug> */
    slug: z.string(),
    /** 진행 기간 (예: "2025.03 – 2025.05"). 빈 값 허용 */
    period: z.string().default(''),
    /** 내가 맡은 역할 한 줄. 빈 값 허용 */
    role: z.string().default(''),
    /** 사용 기술 태그 */
    techStack: z.array(z.string()).default([]),
    /** 소스 저장소 링크. 빈 값이면 "준비 중" */
    repoUrl: z.string().default(''),
    /** WebGL 빌드 진입 경로 (예: /builds/<name>/index.html). 빈 값이면 "빌드 준비 중" */
    playUrl: z.string().default(''),
    /** 실제 스크린샷 경로 배열. 첫 장이 메인 썸네일 */
    images: z.array(z.string()).default([]),
    /** 스크린샷이 부족할 때 채우는 데모 프레임 (public 경로) */
    demoImages: z.array(z.string()).default([]),
    /** 썸네일에 마우스를 올리면 재생되는 플레이 영상 (무음 webm 루프) */
    video: z.string().default(''),
    /** 영상이 실제 플레이 영상이 아니라 데모 루프이면 true */
    videoIsDemo: z.boolean().default(false),
    /** 메인 작품 구간의 광원 색 프리셋 */
    light: z.enum(['candle', 'dawn', 'stage', 'neon', 'forest', 'ember']).default('candle'),
    /** 게임 상세(오락기 화면)의 대표 색 두 가지 */
    colors: z.tuple([z.string(), z.string()]).default(['#ff3fa4', '#22d3ee']),
    /** 조작 키 — 마지막 원소가 설명, 앞은 키 이름 (예: ["←", "→", "조향"]) */
    controls: z.array(z.array(z.string()).min(2)).default([]),
    /** "무엇을 만들었나" 세 칸 */
    highlights: z.array(z.object({ label: z.string(), text: z.string() })).default([]),
    /** 트러블슈팅 항목들. 비어 있으면 섹션 자체를 숨김 */
    troubleshooting: z.array(troubleshootingEntry).default([]),
    /** 메인 페이지 정렬 순서 (작을수록 먼저) */
    order: z.number().default(0),
  }),
});

/**
 * 작업 컬렉션 — 포트폴리오에 선정한 시스템·툴 작업.
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
    /** 사용 기술 */
    techStack: z.array(z.string()).default([]),
    /** 스크린샷 경로 배열. 비어 있으면 art 그라데이션으로 대신 */
    images: z.array(z.string()).default([]),
    /** 이미지가 없을 때 쓰는 어두운 그라데이션 (CSS background) */
    art: z.string().default('radial-gradient(60% 60% at 40% 40%, #2a1a0a, #000)'),
    /** 문제 · 접근 · 결과 */
    problem: z.string().default(''),
    approach: z.string().default(''),
    /** 결과 한 문장. **굵게** 표시한 부분이 등불색으로 강조된다 */
    result: z.string().default(''),
    /** 메인 페이지 정렬 순서 (작을수록 먼저) */
    order: z.number().default(0),
  }),
});

export const collections = { games, work };
