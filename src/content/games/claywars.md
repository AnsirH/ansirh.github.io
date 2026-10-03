---
title: "ClayWars"
description: "점토 병사에게 아이템으로 역할을 주고, 로그라이크 맵을 지나며 수백 명의 군단 전투를 지켜보고 개입하는 3D 전략 게임."
line: "활을 쥐여 주면 궁수가 되는 점토 병사들. 수백 명이 부딪히는 순간, 내가 누를 수 있는 건 스킬 한 번."
slug: "claywars"
period: "2026.07 – 2026.08"
event: "NHN NAN 2026 게임잼 사전 과제"
role: "2인 팀 — 아웃게임 담당 (방 그래프 · 군대 배치 · 아이템 · 증강 · 런 진행)"
techStack: ["Unity 6", "C#", "ScriptableObject", "DOTween", "Unity Test Runner", "Claude Code"]
repoUrl: "https://github.com/AnsirH/NHN_Project"
playUrl: "https://ansirh.github.io/NHN_Project/"
playFrame: { width: 960, height: 600, pageHeight: 642 }
playNote: ""
links: []
images:
  - src: "/images/games/claywars/hero.jpg"
    caption: "군단 전투"
  - src: "/images/games/claywars/deployment.jpg"
    caption: "군대 배치"
  - src: "/images/games/claywars/room-graph.jpg"
    caption: "방 그래프"
  - src: "/images/games/claywars/augment.jpg"
    caption: "증강 선택"
video: ""
light: "ember"
colors: ["#e8894a", "#7fb2d9"]
controls: [["TAP", "방 선택 · 배치 · 스킬"], ["DRAG", "카메라 이동"], ["PINCH", "줌"]]
highlights:
  - label: "게임"
    text: "병과 없는 점토 병사에게 아이템을 주면 병과가 정해지고, 한 번 준 아이템은 되돌릴 수 없습니다. 전투는 자동으로 흐르고 플레이어의 입력은 스킬 한 번뿐입니다."
  - label: "맡은 일"
    text: "전투 밖의 모든 것. 방 그래프 생성과 진행, 군대 배치 화면(드래그 앤 드롭), 아이템 부여와 귀속, 증강 방, 적 편성과 난이도 커브, 전투로 넘기는 데이터 계약까지."
  - label: "결과"
    text: "메인 메뉴부터 보스 처치까지 한 런이 끝까지 도는 빌드를 제출했습니다. 인게임 파트와 합칠 때 충돌은 설정 파일 3건뿐이었습니다."
order: 2
troubleshooting:
  - problem: "전투방만 연달아 고르는 런에서는 플레이어는 그대로인데 적만 계속 강해졌습니다."
    cause: "적 생성 난이도가 맵 진행 깊이(층수)에만 반응했습니다. 플레이어가 강해지는 시점과 적이 강해지는 시점이 서로 무관했습니다."
    solution: "난이도 기준을 층수에서 '플레이어 파워를 주는 방(증원·증강·이벤트)을 지난 횟수'로 바꾸고, 적 수·병과 등장 가중치·보스 구성을 하나의 난이도 티어로 묶어 계단식으로 올렸습니다. 플레이어 전력을 실시간으로 재서 적을 맞추는 방식은 러버밴딩에 가까워 배제했습니다."
    learned: "난이도는 시간이 아니라 플레이어가 강해지는 사건에 맞춰 올려야 선택이 의미를 가진다."
  - problem: "맵 선택·캐릭터 선택·방 그래프가 각각 별도 씬이라, 씬을 넘길 때마다 값을 정적 필드로 옮겨야 했습니다."
    cause: "화면이 아니라 한 런 안의 단계일 뿐인 것을 씬으로 나눠 두었습니다."
    solution: "세 씬을 OutGame 씬 하나로 합치고 패널을 켜고 끄는 방식으로 바꿨습니다. 흐름은 컨트롤러 하나가 조율하고, 정적 필드는 메인 메뉴↔아웃게임, 아웃게임↔전투 두 경계에서만 쓰도록 줄였습니다."
    learned: "씬은 로딩 경계이지 화면 단위가 아니다."
  - problem: "전투는 다른 개발자가 다른 씬에서 만들고 있어서, 아웃게임이 전투를 어떻게 부르고 결과를 받을지 정해야 했습니다."
    cause: "두 파트가 서로의 내부를 모르는 채로 병렬 개발을 하고 있었습니다."
    solution: "배치 결과·적 구성·선택한 캐릭터를 담는 전투 요청 데이터와 결과 데이터를 아웃게임 쪽에서 계약으로 확정하고, 씬 전환은 정적 브릿지(전투 등록 → 꺼내기 → 완료)로 넘기도록 했습니다. 브릿지는 SceneManagement를 참조하지 않아 EditMode 테스트로 검증할 수 있습니다."
    learned: "경계를 문서와 테스트로 먼저 고정하면, 계약이 바뀌어도 양쪽 수정이 경계 안에서 끝난다."
---

<!-- 본문을 쓰면 게임 상세의 "구현 노트"에 표시된다. -->
