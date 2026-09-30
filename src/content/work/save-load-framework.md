---
title: "세이브 / 로드 프레임워크"
period: "2025.02 – 2025.03"
description: "JSON 직렬화와 버전 마이그레이션."
slug: "save-load-framework"
techStack: ["Unity", "C#"]
images: []
art: "linear-gradient(0deg, #1a1508, #000 80%)"
problem: "데이터 구조가 바뀌면 이전 세이브가 깨졌습니다."
approach: "세이브에 스키마 버전을 넣고 버전별 변환 함수를 순서대로 잇는 구조로 바꿨습니다."
result: "구버전 세이브 **세 단계**를 손실 없이 옮깁니다."
order: 4
---

<!-- 더미 데이터. 이 아래에 실제 상세 설명을 쓰면 작업 상세 하단에 표시된다. -->
