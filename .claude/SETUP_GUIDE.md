# 프로젝트 스킬 & 에이전트 가이드

> /project-setup 으로 생성됨 — 2026-09-10
> 프로젝트: ansirh.github.io (Astro + Tailwind 정적 포트폴리오 사이트 / 주 언어 TypeScript)

유니티 게임 클라이언트 개발자 취업용 포트폴리오. 현재는 라우팅·페이지 틀 스캐폴딩 단계이고,
다음 단계에서 Unity WebGL `<iframe>` 연동 · GitHub Actions → Pages 자동 배포 · 디자인 디테일이 이어진다.

---

## 📦 스킬 (8개)

### 개발 워크플로

#### `search-first`
- **설명**: 새 코드를 짜기 전에 기존 라이브러리·템플릿·패턴을 먼저 찾아보게 하는 리서치 우선 워크플로. researcher 에이전트를 호출한다.
- **사용 예시**: "게임 카드 그리드 만들기 전에 Astro 포트폴리오 스타터나 재사용할 만한 컴포넌트 있는지 먼저 찾아줘"
- **근거**: Astro 포트폴리오 스타터가 많아 스캐폴딩을 처음부터 짜기보다 검증된 구조를 가져오는 게 유리하다.

#### `documentation-lookup`
- **설명**: Context7 MCP로 라이브러리/프레임워크 최신 공식 문서를 가져와 답한다. 설치·설정 질문, API 레퍼런스, 코드 예제에서 자동 활성화.
- **사용 예시**: "Astro v5 Content Collections 스키마 정의하는 최신 방식 알려줘 (content.config.ts, glob 로더)"
- **전제**: Context7 MCP (이 환경에서 사용 가능 확인됨)

### 빌드·툴링

#### `vite-patterns`
- **설명**: Vite config, 플러그인, HMR, env 변수, base 경로, SSR, 라이브러리 모드, 빌드 최적화, 의존성 사전 번들링 패턴.
- **사용 예시**: "GitHub Pages 서브경로 배포를 대비해서 base 경로 설정하는 법 알려줘" / "public/games/ 아래 큰 Unity WebGL 빌드 에셋이 빌드에서 어떻게 처리되는지"
- **근거**: Astro는 Vite 기반이라 `astro.config.mjs`의 vite 옵션·에셋 처리·base 경로가 이 스킬 범위와 겹친다.

### 프론트엔드·디자인 (주로 다음 단계용, 지금 구조 설계에 참고)

#### `frontend-design-direction`
- **설명**: 프로덕션 UI 작업을 위한 프론트엔드 디자인 방향(레이아웃·타이포·컬러·컴포넌트 원칙)을 수립한다. 웹사이트·랜딩페이지·대시보드 대상.
- **사용 예시**: "포트폴리오 사이트 전체 디자인 방향 잡아줘 — 톤, 타입 스케일, 스페이싱 시스템"
- **근거**: "바로 다음 단계"인 디자인 디테일 작업의 기준점. 지금 레이아웃/토큰 구조를 여기에 맞춰두면 재작업이 준다.

#### `accessibility`
- **설명**: WCAG 2.2 Level AA 기준으로 UI를 설계·구현·감사한다. 시맨틱 HTML, ARIA, 키보드 내비, 포커스 관리, 스크린리더 지원.
- **사용 예시**: "상세 페이지 네비게이션이랑 카드 그리드 접근성 관점에서 점검해줘"
- **근거**: 채용담당자가 보는 공개 포트폴리오 — 시맨틱 마크업을 스캐폴딩 단계부터 잡는 게 저렴하다.

#### `seo`
- **설명**: 기술 SEO, 온페이지 최적화, 구조화 데이터(JSON-LD), Core Web Vitals, 콘텐츠 전략을 감사·계획·구현한다.
- **사용 예시**: "각 게임/작업 상세 페이지에 메타 태그랑 OG 태그, 사이트맵 넣어줘" / "포트폴리오 SEO 감사해줘"
- **근거**: 포트폴리오의 목적이 검색·공유로 발견되는 것. Astro는 메타/OG/사이트맵 처리가 쉽다.

### 테스트·품질

#### `e2e-testing`
- **설명**: Playwright E2E 테스트 패턴 — Page Object Model, 설정, CI 통합, 아티팩트 관리, flaky 테스트 대응.
- **사용 예시**: "메인에서 게임 카드 클릭하면 상세 페이지로 가는 흐름 E2E 테스트로 만들어줘"
- **전제**: `npm i -D @playwright/test` 후 `npx playwright install`
- **근거**: 완료 기준("카드 클릭 → 상세 페이지 이동")이 그대로 E2E 시나리오. 이후 WebGL 임베드 로드 검증에도 재사용.

### 배포 (다음 단계)

#### `github-ops`
- **설명**: gh CLI 기반 GitHub 저장소 운영·자동화 — 이슈 트리아지, PR 관리, CI/CD, 릴리스, 보안 모니터링.
- **사용 예시**: "main에 push하면 Astro 빌드해서 GitHub Pages로 배포하는 Actions 워크플로우 만들어줘"
- **근거**: 다음 작업이 명시적으로 GitHub Actions → Pages 자동 배포.

---

## 🤖 에이전트 (4개)

#### `typescript-reviewer` (ECC)
- **설명**: TypeScript/JavaScript 코드 리뷰 전문 — 타입 안전성, async 정확성, Node/web 보안, 관용적 패턴.
- **호출 시점**: `.astro` frontmatter(TS), Content Collections 스키마, 동적 라우트(`[slug].astro`), 유틸 코드를 작성/수정한 직후.
- **사용 예시**: "방금 만든 games/work 컬렉션 스키마랑 상세 페이지 라우트 코드 리뷰해줘"

#### `build-error-resolver` (ECC)
- **설명**: 빌드·타입 에러를 최소 diff로 해결하는 전문 에이전트. 아키텍처 변경 없이 에러만 잡는다.
- **호출 시점**: `astro build` 또는 `astro check`(tsc) 실패 시.
- **사용 예시**: "astro build가 타입 에러로 실패해 — 고쳐줘"

#### `docs-lookup` (ECC)
- **설명**: Context7 MCP로 라이브러리/프레임워크/API 최신 문서를 가져와 사용법과 최신 예제를 답한다.
- **호출 시점**: 라이브러리 사용법·API·설정을 학습데이터가 아닌 최신 문서로 확인해야 할 때.
- **사용 예시**: "astro:content의 getCollection / getEntry 최신 시그니처 확인해줘"
- **전제**: Context7 MCP

#### `architect` (ECC)
- **설명**: 시스템 설계·확장성·기술 의사결정 전문. 새 기능 계획, 대규모 리팩토링, 아키텍처 결정 시 사용.
- **호출 시점**: 게임3+작업5+WebGL+CI로 프로젝트가 커지며 스키마/라우트/디렉토리/배포 구조를 결정할 때. 단순 스캐폴딩엔 생략 가능.
- **사용 예시**: "WebGL 빌드 경로랑 Content Collections 구조를 이후 배포까지 고려해서 어떻게 잡을지 설계해줘"

---

## 전역 활성 (참고 — 중복 설치 안 함)

- **전역 에이전트**: planner, code-reviewer, loop-operator, security-reviewer
- **전역 스킬**: context-budget, continuous-learning-v2, git-worktree-setup, learned, project-setup, rules-distill, security-scan, skill-comply, skill-creator, skill-stocktake, strategic-compact

---

다시 추가하려면 `/project-setup` 을 호출하세요.
