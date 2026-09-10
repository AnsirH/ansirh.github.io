import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 게임 컬렉션 — 유니티 WebGL 빌드로 플레이 가능한 게임.
 * 콘텐츠는 src/content/games/*.md 의 frontmatter 로 관리한다.
 * 파일을 추가/수정하면 페이지 코드 변경 없이 반영된다.
 */
const games = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
  schema: z.object({
    title: z.string(),
    /** 카드/상세 상단에 쓰는 한 줄 요약 */
    description: z.string(),
    /** URL 세그먼트 — /games/<slug> */
    slug: z.string(),
    /** 사용 기술 태그 */
    techStack: z.array(z.string()).default([]),
    /**
     * WebGL 빌드 진입 경로 (예: /games/<name>/index.html).
     * 지금은 빈 값 허용 — 값이 없으면 상세 페이지에서 "빌드 준비 중" 표시.
     */
    playUrl: z.string().default(''),
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
