/**
 * 사이트 전역 메타데이터와 메인 페이지 문구.
 * 게임과 작업은 src/content 컬렉션에서, 나머지 문구는 이 파일에서 관리한다.
 * `dummy: true` 로 표시한 항목은 실제 내용으로 교체해야 하는 예시다.
 */
export const SITE = {
  /** 이름 */
  name: '허한결',
  /** 직군 한 줄 */
  role: '게임 클라이언트 개발자 (Unity, Godot)',
  /** <meta name="description"> 기본값 */
  description: '게임 클라이언트 개발자 허한결의 포트폴리오. 직접 만든 게임과 NC AI에서의 작업, 지금까지의 프로젝트를 담았습니다.',
} as const;

/** 인트로 — 한 단어씩 켜지는 첫 문장. hot 은 등불색으로 남는 단어 */
export const INTRO = {
  words: [{ text: 'AnsirH:' }, { text: '허한결', hot: true }],
  /** 첫 줄 아래 둘째 줄 (한 단계 작게). <b> 로 강조 */
  sub: '게임 클라이언트 개발자 (Unity, Godot)',
} as const;

/** 소개 — 소개, 경력, 해 온 일 세 줄 */
/** text 가 배열이면 한 줄씩 나눠 보여 준다 */
export const ABOUT: ReadonlyArray<{ label: string; text: string | readonly string[] }> = [
  { label: '소개', text: 'Unity와 Godot으로 게임 클라이언트를 만듭니다. 함께 일하는 사람이 서로 기다리지 않고 각자 작업할 수 있는 구조를 만드는 데 중점을 둡니다.(todo: 작업 스타일보다는 나의 능력에 대해 적는게 좋을 거 같아. 게임 클라이언트 개발 혹은 어플리케이션, 프로그램을 개발할 수 있고 디지털 트윈, 가상환경 구축, 3D 기반 클라이언트 개발 경험이 있다는 식으로 수정하자' },
  {
    label: '경력',
    text: [
      'NC AI(2025.12 – 2026.09): 대화형 3D 캐릭터 클라이언트 개발(Unity, Godot)',
      'NewSalt(2024.04 – 2024.12): 2차전지 제조 공정 훈련 시뮬레이터 2종 개발 및 납품(Unity)',
    ],
  },
  {
    label: '해 온 일(todo: 이 부분은 해 온 일 보다는 작업 스타일을 적으면 좋을 거 같아. 협업을 중시하고 개발의 병목이 생기지 않게끔 구조를 짜며, 문제 해결에 다양한 방법을 적용해보고 검증하여 제시하는 편이라고 적으면 좋을 거 같아.',
    text: 'NC AI에서는 립싱크, 모바일 털 렌더링 같은 클라이언트 기능을 만들고 빌드와 테스트를 자동화했습니다. NewSalt에서는 기획자가 시나리오를 직접 고칠 수 있는 편집 도구를 만들어 하루 걸리던 수정을 2~3시간으로 줄였고, 개발 2인 팀에서 일정과 진척도 관리, 테스트와 빌드 관리를 맡아 시뮬레이터 2종을 납기 내 납품했습니다. 게임잼과 공모전에도 직접 만든 게임을 출품해 왔습니다.',
  },
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
  /** 어떤 작업인지 한눈에 — GameDev, Client, AI Service, AI Tool, AI Agent, ML, Data, Automation, DevOps, Simulation, Education, Event, Military */
  tag: string;
  /** 작품과 경력 카드로 연결 */
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
    date: '2025.12', end: '2026.09', title: 'AI 아바타 클라이언트 (Unity, Godot)', tag: 'Client',
    links: [career('아바타 립싱크', 'avatar-lipsync'), career('털과 카툰 셰이더', 'fur-toon-shaders'), career('테스트 자동화', 'test-automation')],
  },
  { date: '2026.02', title: '가천대 졸업', tag: 'Education' },
  { date: '2026.04', title: 'Carefor RPA 툴', tag: 'Automation' },
  { date: '2026.04', title: '업무일지 에이전트', tag: 'AI Agent' },
  { date: '2026.05', title: 'KCC 이동 패키지', tag: 'GameDev' },
  { date: '2026.05', end: '현재', title: 'TinkerTower', tag: 'GameDev' },
  { date: '2026.06', title: 'AWS Summit / AI League', tag: 'Event' },
  {
    date: '2026.07', title: 'AI 캐릭터 제작 자동화 워크벤치', tag: 'AI Tool',
    links: [career('워크벤치', 'character-workbench')],
  },
  { date: '2026.07', title: 'NHN NAN 2026 게임잼 사전 과제', tag: 'GameDev', links: [game('ClayWars', 'claywars')] },
  { date: '2026.08', title: 'WebGL CI + SSH 배포', tag: 'DevOps' },
  { date: '2026.08', title: 'OpenAI Game Builders 공모전', tag: 'GameDev', links: [game('GooseBomb', 'goosebomb')] },
];

/** 다루는 것 (이력서 기술 스택과 같게). 항목 끝의 ", " 까지가 한 단어로 켜진다 */
export const TOOLS: ReadonlyArray<{ label: string; items: readonly string[] }> = [
  { label: '엔진', items: ['Unity, ', 'Godot, ', 'Unreal'] },
  { label: '언어', items: ['C#, ', 'Python'] },
  { label: '협업', items: ['Git, ', 'GitHub, ', 'Jira, ', 'Confluence, ', 'Notion'] },
  { label: 'AI 도구', items: ['Claude Code, ', 'Codex'] },
];

/** 연락 — 값이 빈 항목은 렌더링하지 않는다 */
export const CONTACT = {
  heading: '끝까지 봐 주셔서 감사합니다.',
  sub: '궁금한 점이나 함께 이야기하고 싶은 것이 있다면 언제든 편하게 연락 주세요.',
  /** 공개할 이메일 주소. 비어 있으면 메일 줄을 숨긴다 */
  email: 'ansir0211@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/ansirh' },
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
