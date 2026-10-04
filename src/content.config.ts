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
    /** 출품한 대회·공모전 (예: "NHN NAN 2026 게임잼"). 빈 값 허용 */
    event: z.string().default(''),
    /** 내가 맡은 역할 한 줄. 빈 값 허용 */
    role: z.string().default(''),
    /** 사용 기술 태그 */
    techStack: z.array(z.string()).default([]),
    /** 소스 저장소 링크. 비우면 LINKS 칸에서 빠진다 */
    repoUrl: z.string().default(''),
    /** 브라우저에서 플레이할 WebGL 빌드 주소. 있으면 오락기 화면에서 PRESS START로 바로 실행 */
    playUrl: z.string().default(''),
    /**
     * 고정 크기로 그리는 WebGL 페이지(Unity 기본 템플릿 등)일 때: 게임 화면 크기와 페이지 전체 높이.
     * 페이지를 원래 크기로 띄워 게임 화면(width×height)만 보이게 자르고, 오락기 화면에 맞춰 축소한다.
     * 비우면 iframe 을 화면에 꽉 채운다 (반응형 템플릿).
     */
    playFrame: z.object({ width: z.number(), height: z.number(), pageHeight: z.number() }).optional(),
    /** playUrl 이 없을 때 오락기 화면에 띄우는 안내 (예: "Android 전용 · APK로 플레이") */
    playNote: z.string().default(''),
    /** 추가 링크 (플레이 영상, 다운로드 등) */
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    /** 게임 상세 오락기 화면에 깔 이미지. 비우면 images 첫 장 (키 아트처럼 로고가 든 이미지를 피할 때 지정) */
    cover: z.string().default(''),
    /** 스크린샷 경로 배열. 첫 장이 메인 썸네일이자 오락기 화면 */
    images: z.array(z.object({ src: z.string(), caption: z.string().default('') })).default([]),
    /** 썸네일에 마우스를 올리면 재생되는 플레이 영상 (무음 mp4 루프). 같은 이름의 .webm 을 두면 mp4 를 못 여는 브라우저에서 대신 재생. 비우면 재생 없음 */
    video: z.string().default(''),
    /** 메인 작품 구간의 광원 색 프리셋 */
    light: z.enum(['candle', 'dawn', 'stage', 'neon', 'forest', 'ember']).default('candle'),
    /** 게임 상세(오락기 화면)의 대표 색 두 가지 */
    colors: z.tuple([z.string(), z.string()]).default(['#ff3fa4', '#22d3ee']),
    /** 조작 키 — 마지막 원소가 설명, 앞은 키 이름 (예: ["←", "→", "이동"]) */
    controls: z.array(z.array(z.string()).min(2)).default([]),
    /** "무엇을 만들었나" 세 칸 */
    highlights: z.array(z.object({ label: z.string(), text: z.string() })).default([]),
    /** 트러블슈팅 항목들. 비어 있으면 섹션 자체를 숨김 */
    troubleshooting: z.array(troubleshootingEntry).default([]),
    /** 메인 페이지 정렬 순서 (작을수록 먼저) */
    order: z.number().default(0),
  }),
});

/** 경력 카드 사진 — 원본 크기와 출처 */
const careerPhoto = z.object({ src: z.string(), width: z.number(), height: z.number(), alt: z.string(), credit: z.string() });

/**
 * 경력 컬렉션 — 메인 "경력" 구간에 이미지 한 장과 함께 나열하는 실무 작업. 상세 페이지는 없다.
 * 콘텐츠는 src/content/work/*.md 의 frontmatter 로 관리한다.
 */
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    /** 진행 기간 (예: "2025.12 – 2026.09") */
    period: z.string(),
    /** 설명 1~2문장 */
    description: z.string(),
    /** 카드 앵커 — /#career-<slug> (타임라인에서 연결) */
    slug: z.string(),
    /** 카드 이미지 (직접 그린 도식 등 공개 가능한 자료만) */
    image: z.string().default(''),
    imageAlt: z.string().default(''),
    /** 대표 사진 (카드 맨 위)과 보조 사진 (도식 아래 가로 띠). credit 은 이미지 아래 출처 문구 */
    photo: careerPhoto.optional(),
    extra: careerPhoto.optional(),
    /** 메인 페이지 정렬 순서 (작을수록 먼저) */
    order: z.number().default(0),
  }),
});

export const collections = { games, work };
