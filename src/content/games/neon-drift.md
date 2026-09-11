---
title: "Neon Drift"
description: "네온 도시를 질주하는 아케이드 레이싱 프로토타입."
slug: "neon-drift"
period: "2025.03 – 2025.05"
role: "1인 개발 — 물리·입력·트랙 툴"
techStack: ["Unity", "C#", "URP", "DOTween"]
repoUrl: ""
playUrl: ""
images: ["/images/demo-neon-drift.jpg"]
order: 1
troubleshooting:
  - problem: "고속 주행 시 콜라이더가 벽을 뚫고 나가는(터널링) 현상."
    cause: "이산 충돌 판정 + 낮은 FixedUpdate 주기에서 한 프레임 이동량이 벽 두께보다 큼."
    solution: "Rigidbody Collision Detection을 Continuous Dynamic으로 변경, 벽은 Continuous로. 예비로 이동 벡터 기준 Raycast 스윕을 추가."
    learned: "빠른 오브젝트는 렌더링 FPS가 아니라 물리 스텝 기준으로 이동량을 따져야 한다. (placeholder)"
  - problem: "드리프트 후 그립 복귀가 툭 끊기듯 부자연스러움."
    cause: "그립 계수를 bool로 즉시 토글해서 마찰력이 계단식으로 변함."
    solution: "그립 계수를 목표값으로 lerp, 슬립 앵글 곡선을 AnimationCurve로 노출해 튜닝."
    learned: "감각 관련 값은 상수 대신 커브로 빼면 코드 수정 없이 반복 튜닝이 된다. (placeholder)"
---

더미 데이터입니다. 실제 개요·구현 노트는 다음 작업에서 채웁니다.

- 드리프트 물리와 부스트 게이지
- 3개 트랙, 타임어택 모드
- WebGL 빌드 예정
