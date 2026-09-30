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
  '게임을 만들 때 가장 오래 붙잡고 있는 건 빛입니다. 캐릭터가 멈춘 순간의 그림자, 드리프트 뒤에 남는 잔광, 씨앗이 싹트는 새벽의 색. 코드는 그 장면을 오래 머물게 하는 도구라고 생각합니다.';

/** 지나온 시간 — 날짜(YYYY.MM)가 오도미터로 굴러간다 */
export interface Chapter {
  date: string;
  title: string;
  lines: readonly string[];
  /** 예시 문구이면 true (실제 이력으로 교체 필요) */
  dummy?: boolean;
}
export const CHAPTERS: readonly Chapter[] = [
  { date: '2024.06', title: '게임을 만들기 시작했습니다', lines: ['게임 클라이언트 개발 교육 과정을 마쳤습니다.', '처음 만든 작은 게임 세 개는 모두 빛이 없는 게임이었습니다.'], dummy: true },
  { date: '2024.11', title: 'Pocket Dungeon', lines: ['첫 1인 게임. 횃불 하나로 방을 비추는 법을 배웠습니다.'] },
  { date: '2025.01', title: '보이지 않는 시스템들', lines: ['인벤토리와 세이브. 화면 뒤의 구조를 다지는 두 달.'] },
  { date: '2025.03', title: 'Neon Drift', lines: ['속도와 빛을 함께 다룬 첫 작품.'] },
  { date: '2025.06', title: 'Gravity Garden', lines: ['아티스트와 처음 함께 만든 게임. 빛의 방향이 퍼즐이 되었습니다.'] },
  { date: '2025.09', title: '지금', lines: ['적 AI와 디버그 도구를 만들며 다음 팀을 찾고 있습니다.'], dummy: true },
];

/** 다루는 것 */
export const TOOLS: ReadonlyArray<{ label: string; items: readonly string[] }> = [
  { label: '역할', items: ['Unity 게임 클라이언트 개발 — ', 'UI, 게임플레이, 툴 프로그래밍'] },
  { label: '핵심 기술', items: ['C# · ', 'Unity Engine · ', 'Gameplay Systems · ', 'Editor Tooling'] },
  { label: '빛과 화면', items: ['URP · ', 'Shader Graph · ', 'Cinemachine · ', '포스트 프로세싱'] },
  { label: '툴', items: ['Git · ', 'Addressables · ', 'DOTween · ', 'Rider'] },
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
