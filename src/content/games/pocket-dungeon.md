---
title: "Pocket Dungeon"
description: "한 손으로 즐기는 로그라이크 던전 크롤러."
slug: "pocket-dungeon"
period: "2024.11 – 2025.01"
role: "1인 개발 — 절차적 생성·전투·세이브"
techStack: ["Unity", "C#", "Tilemap", "Scriptable Objects"]
repoUrl: ""
playUrl: ""
images: []
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

더미 데이터입니다. 실제 개요·구현 노트는 다음 작업에서 채웁니다.

- 절차적 던전 생성
- 카드 기반 전투
- WebGL 빌드 예정
