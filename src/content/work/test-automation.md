---
title: "테스트 자동화"
period: "2025.12 – 2026.09"
description: "AI 에이전트가 테스트를 실행하고, 결과를 보고, 오류를 찾아 보고하는 Unity·Godot 개발 루프."
slug: "test-automation"
techStack: ["Unity Test Runner", "Godot MCP", "Claude Code", "TDD"]
images: []
art: "linear-gradient(0deg, #14180c, #000 80%)"
problem: "마우스 클릭이 필요한 테스트는 사람이 에디터에서 직접 눌러 봐야 했고, 그때마다 결과를 확인하고 전달하는 왕복이 생겼습니다."
approach: "클릭이 필요한 테스트까지 절차적 테스트로 만들고, 에이전트가 에디터를 통해 테스트를 돌리고 화면을 확인할 수 있는 환경을 Unity와 Godot 양쪽에 구성했습니다."
result: "AI 에이전트가 **실행 → 결과 확인 → 오류 보고**까지 스스로 합니다."
order: 5
---

AI 애플리케이션용 3D 캐릭터 클라이언트(Unity 프로젝트, Godot 프로젝트)를 개발하면서 만든 테스트 환경입니다. 개발 전반에 테스트 주도 개발(TDD)을 적용했습니다.

## Unity

- 마우스 클릭이 필요한 테스트도 Unity Test Runner의 절차적 테스트로 만들었습니다.
- Unity가 열려 있을 때 Test Runner를 실행하는 스크립트를 작성해, AI 에이전트(Claude Code)가 테스트를 실행하고 결과를 확인하고 오류를 찾아 보고하도록 했습니다.

## Godot

- Godot MCP를 연결해 플레이 중 동작 호출과 화면 스크린샷 촬영이 가능한 환경을 구성했습니다.
- 테스트 스크립트와 에디터 헤드리스 실행으로 테스트를 자동화했습니다.

## 협업 방식

Jira 티켓 주도로 개발했습니다. 티켓을 만들고 작업 상태에 따라 갱신하며 진행했습니다(Jira·Confluence).
