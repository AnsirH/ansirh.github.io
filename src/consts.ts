/**
 * 사이트 전역 메타데이터와 메인 페이지 문구.
 * 게임·작업은 src/content 컬렉션에서, 나머지 문구는 이 파일에서 관리한다.
 * `dummy: true` 로 표시한 항목은 실제 내용으로 교체해야 하는 예시다.
 */
export const SITE = {
  /** 이름 */
  name: '허한결',
  /** 직군 한 줄 */
  role: '게임 클라이언트 개발자 (Unity·Godot)',
  /** <meta name="description"> 기본값 */
  description: '게임 클라이언트 개발자 허한결의 포트폴리오. 직접 만든 게임과 NC AI에서의 작업, 지금까지의 프로젝트를 담았습니다.',
} as const;

/** 인트로 — 한 단어씩 켜지는 첫 문장. hot 은 등불색으로 남는 단어 */
export const INTRO = {
  words: [{ text: '조각이 ' }, { text: '모여 ' }, { text: '게임이 ', hot: true }, { text: '되는 ' }, { text: '순간을 ' }, { text: '좋아합니다.' }],
  /** 첫 문장 아래 소개. <b> 로 강조 */
  sub: '<b>Unity</b>와 <b>Godot</b>으로 게임과 애플리케이션을 만드는 게임 클라이언트 개발자 허한결입니다.',
} as const;

/** 소개 — 어떤 개발자인지 · 경력 · 해 온 일, 세 줄 */
export const ABOUT: ReadonlyArray<{ label: string; text: string }> = [
  { label: '어떤 개발자', text: 'Unity와 Godot으로 게임 클라이언트를 만듭니다. 만든 기능이 게임의 한 조각으로 맞물려 완성되어 가는 과정을 좋아합니다.' },
  { label: '경력', text: 'NC AI에서 대화형 3D 캐릭터 클라이언트를 Unity와 Godot으로 개발했습니다. (2025.12 – 2026.09)' },
  { label: '해 온 일', text: '립싱크, 모바일 털 렌더링 같은 클라이언트 기능을 만들고 빌드와 테스트를 자동화했습니다. 게임잼과 공모전에 직접 만든 게임을 출품해 왔습니다.' },
];

/** 타임라인 — 연도별로 묶어 보여 주고, 연도를 오도미터로 굴린다 */
export interface TimelineLink {
  kind: '작품' | '경력';
  label: string;
  href: string;
}
export interface TimelineEntry {
  /** 시작 (YYYY.MM) */
  date: string;
  /** 기간이 있으면 끝 (YYYY.MM) */
  end?: string;
  title: string;
  /** 어떤 작업인지 한눈에 — GameDev · Client · AI Service · AI Tool · AI Agent · ML · Data · Automation · DevOps · Simulation · Education · Event · Military */
  tag: string;
  /** 작품·경력 카드로 연결 */
  links?: readonly TimelineLink[];
}
const career = (label: string, slug: string): TimelineLink => ({ kind: '경력', label, href: `/#career-${slug}` });
const game = (label: string, slug: string): TimelineLink => ({ kind: '작품', label, href: `/games/${slug}` });
export const TIMELINE: readonly TimelineEntry[] = [
  { date: '2020.08', title: 'ELEMENTALIST', tag: 'GameDev' },
  { date: '2021.03', title: '가천대 입학', tag: 'Education' },
  { date: '2021.07', title: 'CONSTELLATION', tag: 'GameDev' },
  { date: '2021.10', title: 'POKEMON 3D', tag: 'GameDev' },
  { date: '2021.12', title: 'Samurai Shodown', tag: 'GameDev' },
  { date: '2022.01', end: '2023.07', title: '해병대 복무', tag: 'Military' },
  { date: '2023.12', title: 'Nebeloun', tag: 'GameDev' },
  { date: '2024.01', title: 'Alice 2D', tag: 'GameDev' },
  { date: '2024.04', end: '2024.12', title: 'NewSalt 2차전지 시뮬레이터', tag: 'Simulation' },
  { date: '2024.07', title: 'RanTaDe', tag: 'GameDev' },
  { date: '2024.11', title: 'Darkest Like', tag: 'GameDev' },
  { date: '2025.02', end: '2025.08', title: 'SK네트웍스 Family AI 캠프', tag: 'Education' },
  { date: '2025.04', title: '데이터 크롤링', tag: 'Data' },
  { date: '2025.05', title: 'ML 고객 관리', tag: 'ML' },
  { date: '2025.05', title: "Bull's One Shot", tag: 'GameDev' },
  { date: '2025.06', title: 'LLM 코드 분석 챗봇', tag: 'AI Service' },
  { date: '2025.08', title: '문서 검색 서비스', tag: 'AI Service' },
  { date: '2025.08', end: '2025.11', title: 'AI 스터디', tag: 'Education' },
  { date: '2025.12', title: 'TAB GAMES 스킬 시스템', tag: 'GameDev' },
  {
    date: '2025.12', end: '2026.09', title: 'AI 아바타 클라이언트 (Unity·Godot)', tag: 'Client',
    links: [career('아바타 립싱크', 'avatar-lipsync'), career('털 · 카툰 셰이더', 'fur-toon-shaders'), career('테스트 자동화', 'test-automation')],
  },
  { date: '2026.02', title: '가천대 졸업', tag: 'Education' },
  { date: '2026.04', title: 'Carefor RPA 툴', tag: 'Automation' },
  { date: '2026.04', title: '업무일지 에이전트', tag: 'AI Agent' },
  { date: '2026.05', title: 'KCC 이동 패키지', tag: 'GameDev' },
  { date: '2026.05', end: '현재', title: '스팀 타워 조립 게임', tag: 'GameDev', links: [game('TinkerTower', 'tinkertower')] },
  { date: '2026.06', title: 'AWS Summit / AI League', tag: 'Event' },
  {
    date: '2026.07', title: 'AI 캐릭터 제작 자동화 워크벤치', tag: 'AI Tool',
    links: [career('워크벤치', 'character-workbench')],
  },
  { date: '2026.07', title: 'NHN NAN 2026 게임잼 사전 과제', tag: 'GameDev', links: [game('ClayWars', 'claywars')] },
  { date: '2026.08', title: 'WebGL CI + SSH 배포', tag: 'DevOps' },
  { date: '2026.08', title: 'OpenAI Game Builders 공모전', tag: 'GameDev', links: [game('GooseBomb', 'goosebomb')] },
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
  heading: '끝까지 봐 주셔서 감사합니다.',
  sub: '궁금한 점이나 함께 이야기하고 싶은 것이 있다면 언제든 편하게 연락 주세요.',
  /** 공개할 이메일 주소. 비어 있으면 메일 줄을 숨긴다 */
  email: 'ansir0211@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/AnsirH' },
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
