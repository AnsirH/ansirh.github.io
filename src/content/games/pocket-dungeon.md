---
title: "Pocket Dungeon"
description: "한 손으로 즐기는 로그라이크 던전 크롤러."
line: "횃불 하나로 비추는 좁은 방, 매번 다르게 이어지는 복도."
slug: "pocket-dungeon"
period: "2024.11 – 2025.01"
role: "1인 개발 — 절차적 생성·전투·세이브"
techStack: ["Unity", "C#", "Tilemap", "Scriptable Objects"]
repoUrl: ""
playUrl: ""
images: []
demoImages: ["/images/games/pocket-dungeon-demo-5200.png", "/images/games/pocket-dungeon-demo-1800.png", "/images/games/pocket-dungeon-demo-9400.png"]
video: "/videos/pocket-dungeon.webm"
videoIsDemo: true
light: "ember"
colors: ["#f59e0b", "#dc2626"]
controls: [["TAP", "이동"], ["DRAG", "카드 사용"]]
highlights:
  - label: "기획 의도"
    text: "지하철에서 한 손으로 오 분. 매 판 다른 던전과 카드 조합으로 짧게 반복하는 플레이."
  - label: "빛과 화면"
    text: "플레이어 주변만 밝히는 횃불 라이트와 안개. 방에 들어서는 순간 벽이 서서히 드러나도록."
  - label: "결과"
    text: "카드 스물네 장, 적 아홉 종. 자동 테스트 천 번으로 막힌 던전이 없음을 확인했습니다."
order: 2
troubleshooting:
  - problem: "던전 생성 시 방들이 통로로 연결되지 않아 클리어 불가능한 맵이 나옴."
    cause: "방 배치와 통로 연결을 각각 랜덤으로 처리해서 그래프 연결성을 보장하지 않음."
    solution: "방 중심으로 델로네 삼각분할 → 최소 신장 트리로 필수 통로를 잡고, 일부 엣지를 확률적으로 추가."
    learned: "'랜덤한데 항상 유효한' 생성은 제약을 먼저 세우고 그 위에서 랜덤을 굴려야 한다. (placeholder)"
  - problem: "적이 많아지면 매 프레임 경로 재계산으로 프레임 드랍."
    cause: "모든 적이 매 프레임 A* 를 새로 돌림."
    solution: "경로 요청을 큐로 분산 처리(프레임당 N개), 플레이어가 안 움직이면 캐시 재사용."
    learned: "AI 부하는 '얼마나 자주 갱신하는가'를 줄이는 게 알고리즘 교체보다 효과가 크다. (placeholder)"
---

<!-- 더미 데이터. 이 아래에 실제 개요·구현 노트를 쓰면 게임 상세의 "구현 노트"에 표시된다. -->
