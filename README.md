# ansirh.github.io

Unity 게임 클라이언트 개발자 포트폴리오 사이트. GitHub Pages User Page (`https://ansirh.github.io`).

디자인 테마는 **암실** — 단일 다크, 박스·라운드 없이 선과 여백만, 빛은 아껴 쓴다.
첫 화면은 유체 광원 인트로(어둠 → 빛이 피어오름 → 스크롤로 소등), 소개~작품 구간에서 다시 켜지고,
게임 상세만 레트로(어둠 속 오락기 화면)다.

## 스택

- [Astro](https://astro.build) — 정적 사이트 생성, 파일 기반 라우팅
- Astro Content Collections — 게임 / 작업 데이터 관리
- 순수 CSS (`src/styles/`) + 바닐라 TypeScript (`src/scripts/`)
- 유체 광원: [WebGL Fluid Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) (Pavel Dobryakov, MIT) 수정본 — `public/fx/fluid-light.js`

## 구조

```text
src/
├── consts.ts              # 사이트 메타 · 인트로/소개 문구 · 지나온 시간 · 다루는 것 · 연락
├── content.config.ts      # games / work 컬렉션 스키마
├── content/
│   ├── games/*.md         # 게임 (frontmatter)
│   └── work/*.md          # 작업 (frontmatter)
├── layouts/Layout.astro   # 공통 레이아웃 (머리글/내비, 폰트, 통계)
├── pages/
│   ├── index.astro        # 메인
│   ├── games/[slug].astro # 게임 상세 (오락기 화면 + WebGL 임베드)
│   └── work/[slug].astro  # 작업 상세 (문제 · 접근 · 결과)
├── scripts/
│   ├── home.ts            # 메인 연출 (광원, 스크롤, 오도미터, 호버 영상)
│   └── game.ts            # 게임 상세 연출 (어트랙트, PRESS START, 버그 기록 타이핑)
└── styles/                # global.css · home.css · detail.css
public/
├── fx/                    # fluid-light.js, attract.js(게임별 픽셀 데모 루프), 디더링 텍스처
├── images/                # 스크린샷 · 데모 프레임
└── videos/                # 썸네일 호버 플레이 영상 (무음 webm 루프)
```

## 콘텐츠 추가 · 교체

페이지 코드를 건드리지 않고 `src/content/games/` 또는 `src/content/work/` 의 `.md` 를 추가·수정하면
메인과 상세 페이지가 함께 바뀐다. 필드 설명은 `src/content.config.ts` 주석 참고.

- **스크린샷**: `images` 에 경로를 넣으면 첫 장이 메인 썸네일이 되고, 데모 프레임(`demoImages`)보다 먼저 쓰인다.
- **플레이 영상**: 10~15초 무음 루프, 가로 960~1280px, webm 권장. `public/videos/` 에 두고 `video` 에 경로, `videoIsDemo: false`.
- **WebGL 빌드**: `public/builds/<게임명>/` 에 두고 `playUrl: "/builds/<게임명>/index.html"`.
  (`public/games/` 는 게임 상세 페이지 주소와 겹치므로 쓰지 않는다.)
- **작업 결과 문장**: `result` 의 `**강조**` 부분이 등불색으로 표시된다.
- **본문**: `.md` 본문을 쓰면 게임 상세의 "구현 노트", 작업 상세 하단에 표시된다.
- 소개 문구, 지나온 시간, 다루는 것, 연락처는 `src/consts.ts` 에서 바꾼다.
  `CONTACT.email` 을 채우면 메일 주소와 복사 버튼이 나타난다.

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

`main` 에 push 하면 GitHub Actions(`.github/workflows/deploy.yml`)가 빌드해 GitHub Pages 에 배포한다.
