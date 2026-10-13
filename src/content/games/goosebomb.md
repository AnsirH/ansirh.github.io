---
title: "GooseBomb"
description: "거위가 되어 폭탄을 놓고, 바꾸고, 적을 유도해 터뜨리며 던전을 돌파하는 3D 탑다운 룸 액션 로그라이트."
line: "몇 초 뒤 터질 자리를 설계하고, 내가 만든 위험에서 빠져나오는 거위 한 마리."
slug: "goosebomb"
period: "2026.08 – 2026.09"
event: "2026 OpenAI Game Builders 공모전 출품작"
role: "2인 팀, 그래픽·사운드·이펙트 · 애니메이션 · 씬 라이팅 · 이동·판정 로직 개선"
techStack: ["Unity 6", "URP", "C#", "Input System", "DOTween", "WebGL", "Codex CLI", "AccuRig", "Blender"]
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
    text: "플레이어·적 4종·보스의 애니메이션 연출, 폭탄 3종의 폭발 VFX, 발소리·캐릭터·상호작용 사운드, 근접 상호작용, 조명, 파괴 오브젝트 연출. VARCO 3D·VARCO Sound로 만든 리소스를 씬에 배치하고 모델은 AccuRig·Blender로 리깅했습니다. 판정과 화면이 어긋나던 이동 로직을 고쳐, 판정은 게임 로직이 한 시계로 정하고 화면은 그 결과만 그리게 했습니다."
  - label: "결과"
    text: "브라우저에서 바로 플레이할 수 있는 WebGL 빌드로 공모전에 출품했습니다."
order: 1
troubleshooting:
  - problem: "적이 연속으로 걸을 때 칸마다 Idle 애니메이션으로 끊기고, 칸 경계에서 한 프레임 먼저 멈췄습니다."
    cause: "화면 쪽(Presenter)이 적마다 따로 위치 보간과 이동 타이머를 들고 있었습니다. 한 칸 보간이 끝나면 곧바로 '멈춤'으로 판단했고, 타이머가 게임 시계와 어긋났습니다."
    solution: "이동 의도(이동 중/정지)와 마지막 이동 구간(출발·도착 칸, 시작·끝 시각)을 게임 로직(Core)이 갖게 하고, 화면은 현재 게임 시각으로 그 구간을 읽어 위치만 그리도록 바꿨습니다. 이동 의도가 유지되는 동안에는 걷기 애니메이션을 이어 갑니다."
    learned: "화면이 따로 시간을 세기 시작하면 판정과 연출이 반드시 어긋난다. 시간과 상태는 한 곳에서만 가진다."
  - problem: "적이 칸을 옮기는 도중 피해·접촉 판정 위치와 화면 위치가 어긋나는 경우가 있었습니다."
    cause: "판정 칸이 바뀌는 시점과 화면 이동이 따로 계산됐고, 큰 프레임에서는 한 캐릭터만 여러 칸을 먼저 처리했습니다."
    solution: "모든 규칙을 10ms 고정 스텝으로 함께 진행하고, 적은 이동 시작 시 목적지 칸 예약 > 진행률 50%에서 판정 칸 전환 > 도착 전 다음 이동 금지로 정했습니다. 플레이어와 적은 판정 로직(예약, 판정 칸 전환, 폭발 시각 기준 칸 조회)을 공유하되, 이동은 다르게 했습니다. 적은 플레이어가 예측해야 하는 대상이라 시작한 한 칸을 반드시 끝내고, 플레이어는 조작하는 대상이라 키를 놓으면 바로 멈추는 연속 이동입니다."
    learned: "같아야 하는 것(판정)과 달라야 하는 것(이동 감각)을 나누면, 조작감을 지키면서도 판정은 하나로 유지할 수 있다."
  - problem: "유료 라이선스 VFX는 공개 저장소에 올릴 수 없는데, 폭발 연출은 그 VFX로 만들어야 했습니다."
    cause: "VFX 프리팹을 씬과 프리팹에 직접 연결하면 패키지가 없는 클론에서 참조가 깨집니다."
    solution: "VFX는 Git에서 제외한 로컬 설정으로만 연결하고, 패키지를 가져온 뒤 메뉴 한 번으로 연결하는 에디터 도구를 만들었습니다. 패키지가 없으면 기존 셀 표시로 대신합니다. 폭발은 게임 로직이 확정한 영향 칸을 그대로 받아 방향별 불기둥 길이를 맞추고, 모든 연출은 풀링했습니다."
    learned: "연출은 규칙이 확정한 결과만 받아 그린다. 그래서 연출을 통째로 빼도 게임은 똑같이 돈다."
---

<!-- 본문을 쓰면 게임 상세의 "구현 노트"에 표시된다. -->
