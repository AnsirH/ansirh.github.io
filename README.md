# ansirh.github.io

Unity 게임 클라이언트 개발자 포트폴리오 사이트. GitHub Pages User Page (`https://ansirh.github.io`).

## 스택

- [Astro](https://astro.build) — 정적 사이트 생성, 파일 기반 라우팅
- [Tailwind CSS](https://tailwindcss.com) v4 (`@tailwindcss/vite`)
- Astro Content Collections — 게임 / 작업 데이터 관리

## 구조

```text
src/
├── consts.ts              # 사이트 메타데이터 · 히어로 문구 · 링크 (현재 placeholder)
├── content.config.ts      # games / work 컬렉션 스키마
├── content/
│   ├── games/*.md         # 게임 항목 (frontmatter)
│   └── work/*.md          # 작업 항목 (frontmatter)
├── layouts/Layout.astro   # 공통 레이아웃 (헤더/네비 + 푸터)
├── components/
│   ├── GameCard.astro
│   └── WorkCard.astro
└── pages/
    ├── index.astro        # 메인 (히어로 + 게임 그리드 + 작업 그리드)
    ├── games/[slug].astro # 게임 상세 (WebGL 임베드 자리)
    └── work/[slug].astro  # 작업 상세 (이미지 자리)
```

## 콘텐츠 추가

페이지 코드를 건드리지 않고 `src/content/games/` 또는 `src/content/work/` 에
`.md` 파일을 추가하면 라우트와 카드가 자동 생성된다.

게임 예시 (`src/content/games/my-game.md`):

```md
---
title: "My Game"
description: "한 줄 요약"
slug: "my-game"
techStack: ["Unity", "C#"]
playUrl: ""          # WebGL 빌드 경로. 비우면 상세에서 "빌드 준비 중" 표시
order: 4
---

본문 (선택) — 상세 페이지 하단에 렌더링됨.
```

작업 예시 (`src/content/work/my-work.md`):

```md
---
title: "작업 제목"
period: "2025.10 – 2025.11"
description: "설명"
slug: "my-work"
images: []           # 스크린샷 경로 배열. 비우면 placeholder 박스 표시
order: 6
---
```

## 방문자 통계

[GoatCounter](https://www.goatcounter.com) 를 사용한다. `src/consts.ts` 의
`ANALYTICS.goatCounterCode` 에 code 를 넣으면 프로덕션 빌드의 모든 페이지
`<head>` 에 집계 스크립트가 삽입된다 (`npm run dev` 로컬 실행은 집계 제외).
대시보드: `https://ansirh.goatcounter.com`

## 명령어

| 명령 | 동작 |
| :--- | :--- |
| `npm install` | 의존성 설치 |
| `npm run dev` | 로컬 개발 서버 (`localhost:4321`) |
| `npm run build` | `./dist/` 로 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 로컬 미리보기 |
| `npm run astro check` | 타입/컨텐츠 스키마 검사 |

## 다음 작업 (이번 범위 밖)

- 실제 게임/작업 콘텐츠 및 이미지
- Unity WebGL 빌드 연동 (`games` 의 `playUrl` → `<iframe>`, 빌드는 `public/games/<게임명>/`)
- GitHub Actions 자동 배포 워크플로우
- 디자인 디테일 (타이포/모션/컬러 시스템)
