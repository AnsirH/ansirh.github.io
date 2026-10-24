---
title: "GooseBomb"
description: "폭탄을 놓고 바꾸며 적을 유도해 던전을 돌파하는 탑다운 룸 액션 로그라이트."
line: "몇 초 뒤 터질 자리를 설계하고, 내가 만든 위험에서 빠져나오는 거위 한 마리."
slug: "goosebomb"
period: "2026.08 – 2026.09"
event: "2026 OpenAI Game Builders 공모전 출품작"
role: "2인, 아트와 게임 플레이 로직 개선 담당"
techStack: ["Unity 6", "C#", "Codex CLI", "VARCO 3D", "VARCO Sound", "AccuRig", "Blender"]
repoUrl: "https://github.com/lhwsam/GooseBomb-OpenAI-Project"
playUrl: "https://lhwsam.github.io/GooseBomb-OpenAI-Project/"
playNote: ""
links: []
cover: "/images/games/goosebomb/gameplay.jpg"
images:
  - src: "/images/games/goosebomb/key-art.jpg"
    caption: "키 아트"
  - src: "/images/games/goosebomb/gameplay.jpg"
    caption: "던전 전투"
  - src: "/images/games/goosebomb/boss.jpg"
    caption: "보스전"
video: "/videos/goosebomb.mp4"
light: "neon"
colors: ["#f5c542", "#ff5a3c"]
controls: [["←", "→", "↑", "↓", "이동"], ["Z", "폭탄 설치"], ["X", "폭탄 교체"], ["F", "상호작용"]]
highlights:
  - label: "게임"
    text: "폭탄마다 폭발 범위와 재사용 대기시간이 다릅니다. 적의 움직임을 예상해 몇 초 뒤 폭발할 공간을 설계하고, 두 슬롯의 폭탄을 바꿔 가며 보스까지 돌파합니다."
  - label: "맡은 일"
    text: "그래픽 리소스와 사운드 제작, 폭발 이펙트 적용, 플레이어와 적, 보스의 리깅과 애니메이션 적용, 근접 상호작용과 파괴 오브젝트 연출, 씬 라이팅과 구성을 맡았고, 끊김 없는 칸 이동과 폭발 불기둥 길이, 이펙트 풀링을 구현했습니다. 그래픽 리소스는 Gemini와 ChatGPT로 컨셉 이미지를 만든 뒤 VARCO 3D로 3D 모델을 만들고, AccuRig로 리깅하고 Blender에서 장비를 입혀 Mixamo 애니메이션을 Unity에서 리타게팅했습니다. 사운드는 VARCO Sound로 만들었습니다."
  - label: "결과"
    text: "브라우저에서 바로 플레이할 수 있는 WebGL 빌드로 공모전에 출품했습니다."
order: 1
troubleshooting:
  - problem: "적이 연속으로 걸을 때 칸마다 Idle 애니메이션으로 끊기고, 칸 경계에서 한 프레임 먼저 멈췄습니다."
    cause: "화면 쪽(Presenter)이 적마다 따로 위치 보간과 이동 타이머를 들고 있었습니다. 한 칸 보간이 끝나면 곧바로 '멈춤'으로 판단했고, 타이머가 게임 시계와 어긋났습니다."
    solution: "이동 의도(이동 중/정지)와 마지막 이동 구간(출발 칸과 도착 칸, 시작 시각과 끝 시각)을 게임 로직(Core)이 갖게 하고, 화면은 현재 게임 시각으로 그 구간을 읽어 위치만 그리도록 바꿨습니다. 이동 의도가 유지되는 동안에는 걷기 애니메이션을 이어 갑니다."
    learned: "화면이 따로 시간을 세기 시작하면 판정과 연출이 반드시 어긋난다. 시간과 상태는 한 곳에서만 가진다."
  - problem: "적이 칸을 옮기는 도중 피해, 접촉 판정 위치와 화면 위치가 어긋나는 경우가 있었습니다."
    cause: "판정 칸이 바뀌는 시점과 화면 이동이 따로 계산됐고, 큰 프레임에서는 한 캐릭터만 여러 칸을 먼저 처리했습니다."
    solution: "팀원이 정한 10ms 진행과 계층 규칙 위에서, 적은 이동을 시작할 때 목적지 칸을 예약하고 진행률 50%에서 판정 칸을 바꾸며, 도착 전에는 다음 이동을 시작하지 않게 했습니다. 판정 칸은 몸 중심이 칸 경계를 넘는 시점에 바뀌어, 화면에서 몸이 있는 칸과 판정 칸이 항상 같습니다. 플레이어와 적은 판정 로직을 공유하되 이동은 다르게 두어, 적은 시작한 한 칸을 끝까지 가고 플레이어는 키를 놓으면 바로 멈춥니다."
    learned: "같아야 하는 것(판정)과 달라야 하는 것(이동 감각)을 나누면, 조작감을 지키면서도 판정은 하나로 유지할 수 있다."
  - problem: "벽에 막혀도 폭탄 범위만큼 불기둥이 그려졌고, 연쇄 폭발에서는 폭발마다 이펙트를 새로 만들고 지워 생성 비용이 한꺼번에 몰렸습니다."
    cause: "불기둥 길이를 폭탄에 정해진 범위로 그렸고, 이펙트 오브젝트를 재사용하지 않았습니다."
    solution: "불기둥 길이를 게임 로직이 확정한 영향 칸 기준으로 정해, 방향마다 한 칸씩 나가며 영향 칸이면 길이를 늘리고 아니면 멈추게 했습니다. 이펙트는 종류별 풀에서 꺼내 위치와 회전을 맞춰 재생하고, 끝나면 정지해 돌려놓습니다."
    learned: "연출은 규칙이 확정한 결과만 받아 그려야 화면과 판정이 어긋나지 않는다."
---

<!-- 본문을 쓰면 게임 상세의 "구현 노트"에 표시된다. -->
