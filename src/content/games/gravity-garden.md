---
title: "Gravity Garden"
description: "중력을 바꿔 씨앗을 틔우는 퍼즐 플랫포머."
line: "아래가 바뀌는 정원. 씨앗은 빛이 오는 쪽으로 자랍니다."
slug: "gravity-garden"
period: "2025.06 – 2025.08"
role: "2인 팀 — 클라이언트/시스템 담당 (아트 협업)"
techStack: ["Unity", "C#", "Cinemachine", "Shader Graph"]
repoUrl: ""
playUrl: ""
images: []
demoImages: ["/images/games/gravity-garden-demo-5200.png", "/images/games/gravity-garden-demo-1800.png", "/images/games/gravity-garden-demo-9400.png"]
video: "/videos/gravity-garden.webm"
videoIsDemo: true
light: "forest"
colors: ["#84cc16", "#0d9488"]
controls: [["A", "D", "이동"], ["Q", "E", "중력 회전"]]
highlights:
  - label: "기획 의도"
    text: "아래가 바뀌는 순간의 방향 감각을 퍼즐로. 씨앗이 떨어지는 방향까지 계산해야 풀리는 스테이지."
  - label: "빛과 화면"
    text: "중력이 돌 때 햇빛의 방향도 함께 돌고, 식물은 셰이더로 빛 쪽을 향해 자랍니다."
  - label: "결과"
    text: "스테이지 스무 개와 스테이지 에디터. 아티스트와 처음 함께한 작업입니다."
order: 3
troubleshooting:
  - problem: "중력 방향 전환 시 캐릭터가 벽에 끼거나 튕겨나감."
    cause: "회전 즉시 적용 + 그 프레임에 이동까지 처리해서 벽 안에서 위치가 풀림."
    solution: "전환을 1~2프레임에 걸쳐 보간, 회전 완료 전에는 이동 입력을 잠금. 겹침 발생 시 ComputePenetration 으로 밀어내기."
    learned: "물리 상태를 바꾸는 프레임에는 다른 물리 연산을 같이 돌리지 않는다. (placeholder)"
  - problem: "중력 축이 바뀔 때마다 카메라가 급격히 돌아 멀미 유발."
    cause: "카메라 up 벡터를 목표값으로 즉시 스냅."
    solution: "Cinemachine 확장으로 up 벡터를 SmoothDamp, 전환 중 살짝 줌아웃해 시야 확보."
    learned: "카메라는 '정확함'보다 '예측 가능함'이 우선. (placeholder)"
---

<!-- 더미 데이터. 이 아래에 실제 개요·구현 노트를 쓰면 게임 상세의 "구현 노트"에 표시된다. -->
