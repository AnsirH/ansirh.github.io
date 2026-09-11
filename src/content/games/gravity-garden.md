---
title: "Gravity Garden"
description: "중력을 바꿔 씨앗을 틔우는 퍼즐 플랫포머."
slug: "gravity-garden"
period: "2025.06 – 2025.08"
role: "2인 팀 — 클라이언트/시스템 담당 (아트 협업)"
techStack: ["Unity", "C#", "Cinemachine", "Shader Graph"]
repoUrl: ""
playUrl: ""
images: []
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

더미 데이터입니다. 실제 개요·구현 노트는 다음 작업에서 채웁니다.

- 중력 방향 전환 메커닉
- 20개 스테이지
- WebGL 빌드 예정
