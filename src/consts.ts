/**
 * 사이트 전역 메타데이터와 메인 페이지 문구.
 * 게임·작업은 src/content 컬렉션에서, 나머지 문구는 이 파일에서 관리한다.
 * `dummy: true` 로 표시한 항목은 실제 내용으로 교체해야 하는 예시다.
 */
export const SITE = {
  /** 이름 */
  name: '허한결',
  /** 직군 한 줄 */
  role: 'Unity 게임 클라이언트 개발자',
  /** <meta name="description"> 기본값 */
  description: 'Unity 게임 클라이언트 개발자 허한결의 포트폴리오. 플레이할 수 있는 게임과 시스템 작업을 담았습니다.',
} as const;

/** 인트로 — 한 단어씩 켜지는 첫 문장. hot 은 등불색으로 남는 단어 */
export const INTRO = {
  words: [{ text: '빛이 ' }, { text: '머무는 ' }, { text: '장면을 ', hot: true }, { text: '만듭니다.' }],
  /** 첫 문장 아래 소개. <b> 로 강조 */
  sub: '<b>Unity</b>로 게임을 만드는 허한결입니다. 화면 위에서 빛이 어떻게 번지고 사라지는지에 오래 머무는 편입니다.',
} as const;

/** 소개 — 스크롤에 따라 단어가 켜지는 문단 */
export const ABOUT =
  '캐릭터가 말하고 표정을 짓는 순간을 코드로 만듭니다. 음성으로 얼굴을 움직이고, 모바일에서도 털을 60fps로 그렸습니다. 사람이 매번 손으로 하던 리깅과 테스트는 도구와 에이전트에게 넘기고, 저는 구조를 봅니다.';

/** 지나온 시간 — 연도별로 묶어 보여 주고, 연도를 오도미터로 굴린다 */
export interface TimelineLink {
  kind: '작품' | '작업 노트';
  label: string;
  href: string;
}
export interface TimelineEntry {
  /** 시작 (YYYY.MM) */
  date: string;
  /** 기간이 있으면 끝 (YYYY.MM) */
  end?: string;
  title: string;
  /** 작품·작업 노트로 연결 */
  links?: readonly TimelineLink[];
}
const note = (label: string, slug: string): TimelineLink => ({ kind: '작업 노트', label, href: `/work/${slug}` });
const game = (label: string, slug: string): TimelineLink => ({ kind: '작품', label, href: `/games/${slug}` });
export const TIMELINE: readonly TimelineEntry[] = [
  { date: '2020.08', title: 'ELEMENTALIST' },
  { date: '2021.07', title: 'CONSTELLATION' },
  { date: '2021.10', title: 'POKEMON 3D' },
  { date: '2021.12', title: 'Samurai Shodown' },
  { date: '2022.01', end: '2023.07', title: '해병대 복무' },
  { date: '2023.12', title: 'Nebeloun' },
  { date: '2024.01', title: 'Alice 2D' },
  { date: '2024.04', end: '2024.12', title: 'NewSalt 2차전지 시뮬레이터' },
  { date: '2024.07', title: 'RanTaDe' },
  { date: '2024.11', title: 'Darkest Like' },
  { date: '2025.02', end: '2025.08', title: 'SK네트웍스 Family AI 캠프' },
  { date: '2025.04', title: '데이터 크롤링' },
  { date: '2025.05', title: 'ML 고객 관리' },
  { date: '2025.05', title: "Bull's One Shot" },
  { date: '2025.06', title: 'LLM 코드 분석 챗봇' },
  { date: '2025.08', title: '문서 검색 서비스' },
  { date: '2025.08', end: '2025.11', title: 'AI 스터디' },
  { date: '2025.12', title: 'TAB GAMES 스킬 시스템' },
  {
    date: '2025.12', end: '2026.09', title: 'NC AI 아바타 클라이언트',
    links: [note('아바타 립싱크', 'avatar-lipsync'), note('털 · 카툰 셰이더', 'fur-toon-shaders'), note('테스트 자동화', 'test-automation')],
  },
  { date: '2026.02', title: '가천대 졸업' },
  { date: '2026.04', title: 'Carefor RPA 툴' },
  { date: '2026.04', title: '업무일지 에이전트' },
  { date: '2026.05', title: 'KCC 이동 패키지' },
  { date: '2026.05', title: '스팀 타워 조립 게임' },
  { date: '2026.06', title: 'AWS Summit / AI League' },
  {
    date: '2026.07', title: 'AI 캐릭터 제작 워크벤치',
    links: [note('캐릭터 자동 생성 서비스', 'character-generation-service'), note('얼굴 리깅 자동화', 'face-rigging-automation')],
  },
  { date: '2026.07', title: 'NHN NAN 해커톤', links: [game('ClayWars', 'claywars')] },
  { date: '2026.08', title: 'WebGL CI + SSH 배포' },
  { date: '2026.08', title: 'OpenAI Game Builders 공모전', links: [game('GooseBomb', 'goosebomb')] },
];

/** 다루는 것 — 항목 끝의 " · " 까지가 한 단어로 켜진다 */
export const TOOLS: ReadonlyArray<{ label: string; items: readonly string[] }> = [
  { label: '엔진', items: ['Unity (URP · UI Toolkit · Timeline · Cinemachine · Addressable) · ', 'Godot · ', 'Unreal (경험)'] },
  { label: '언어', items: ['C# · ', 'TypeScript · ', 'Python'] },
  { label: '캐릭터 · 렌더링', items: ['ARKit 블렌드셰이프 · ', 'viseme 립싱크 · ', '셸 털 렌더링 · ', '셀 셰이더 · ', 'SSS'] },
  { label: '웹 · 툴', items: ['React · ', 'Three.js · ', 'Express · ', 'Docker · ', '커스텀 에디터'] },
  { label: '자동화 · 협업', items: ['GitHub Actions · ', 'Claude Code · ', 'Codex · ', 'MCP · ', 'Playwright · ', 'Jira · ', 'Confluence'] },
];

/** 연락 — 값이 빈 항목은 렌더링하지 않는다 */
export const CONTACT = {
  heading: '다음 장면을 함께 만들 팀을 찾고 있습니다.',
  /** 공개할 이메일 주소. 비어 있으면 메일 줄을 숨긴다 */
  email: '',
  links: [
    { label: 'GitHub', href: 'https://github.com/AnsirH' },
    { label: '이력서 PDF', href: '' },
  ],
} as const;

/**
 * 방문자 통계 (GoatCounter).
 * goatCounterCode = goatcounter.com 가입 시 정한 code (예: 'ansirh').
 * 값이 비어 있으면 분석 스크립트를 렌더링하지 않는다.
 * 스크립트는 프로덕션 빌드에서만 로드된다 (Layout.astro 참고).
 */
export const ANALYTICS = {
  goatCounterCode: 'ansirh',
} as const;
