---
title: "ClayWars"
description: "점토 병사에게 아이템으로 병과를 주고, 방 그래프를 따라 군단을 키워 대규모 자동 전투에 스킬로 개입하는 3D 전략 게임."
slug: "claywars"
period: "2026.07 – 2026.08"
event: "NHN NAN 2026 게임잼 사전 과제작"
role: "프로그래머 2인, 아웃게임 담당"
techStack: ["Unity 6", "C#", "GitHub", "Claude Code", "VARCO 3D", "AccuRig", "Blender"]
repoUrl: "https://github.com/ansirh/NHN_Project"
playUrl: "https://ansirh.github.io/NHN_Project/"
playNote: ""
links: []
images:
  - src: "/images/games/claywars/battle.jpg"
    caption: "군단 전투"
  - src: "/images/games/claywars/lightning.jpg"
    caption: "번개 스킬"
  - src: "/images/games/claywars/poison-cloud.jpg"
    caption: "독구름 스킬"
  - src: "/images/games/claywars/formation.jpg"
    caption: "점토 병사 군단"
video: "/videos/claywars.mp4"
light: "ember"
colors: ["#e8894a", "#7fb2d9"]
controls: [["TAP", "방 선택, 배치, 스킬"], ["DRAG", "카메라 이동"], ["PINCH", "줌"]]
highlights:
  - label: "게임"
    text: "병과 없는 점토 병사에게 아이템을 주면 병과가 정해지고, 한 번 준 아이템은 되돌릴 수 없습니다. 전투는 자동으로 흐르고 플레이어의 입력은 스킬 한 번뿐입니다."
  - label: "맡은 일"
    text: "맵 선택, 캐릭터 선택, 방 그래프 진행, 군대 배치, 병사에게 아이템을 장착해 병과 부여, 증원과 증강 방, 메인 메뉴와 저장, 적 편성과 난이도, 전투 파트에 넘길 분대 데이터(병과, 병사 수, 최종 공격력과 체력, 배치 칸) 계산을 맡았습니다. 전투 시뮬레이션에서는 분대 대형과 타겟 매칭을 개선했고, 병사 3D 모델 제작, 리깅과 장비 착용, 애니메이션 리타게팅, 환경 아트와 VFX 적용, WebGL 빌드 자동화도 했습니다. 그래픽 리소스는 Gemini와 ChatGPT로 컨셉 이미지를 만든 뒤 VARCO 3D로 3D 모델을 만들고, AccuRig로 리깅하고 Blender에서 장비를 입혀 Mixamo 애니메이션을 Unity에서 리타게팅했습니다."
  - label: "결과"
    text: "메인 메뉴에서 시작해 보스 처치로 끝나는 한 런이 모두 동작하는 빌드를 제출했습니다. 지금은 main 브랜치에 푸시하면 EditMode와 PlayMode 테스트, 브라우저 로딩 확인을 거쳐 웹 빌드가 GitHub Pages에 자동 배포됩니다."
order: 2
troubleshooting:
  - problem: "전투방만 연달아 고르는 런에서는 플레이어는 그대로인데 적만 계속 강해졌습니다."
    cause: "적 생성 난이도가 맵 진행 깊이(층수)에만 반응했습니다. 플레이어가 강해지는 시점과 적이 강해지는 시점이 서로 무관했습니다."
    solution: "난이도 기준을 층수에서 강화 방(증원, 증강, 이벤트)을 지난 횟수로 바꿨습니다. 적 세기는 티어 설정에서, 적 구성은 에디터로 미리 만든 프리셋 조각에서 따로 조정합니다. 티어마다 조각을 몇 개, 어느 등급으로 뽑을지 정해 적을 편성하고, 밸런스는 코드 수정 없이 티어 설정과 프리셋 조각만 고쳐 맞춥니다."
    learned: "난이도는 시간이 아니라 플레이어가 강해지는 사건에 맞춰 올려야 선택이 의미를 가진다."
    images:
      - src: "/images/games/claywars/bugs/cw-1_structure.webp"
        width: 1600
        height: 752
        alt: "처음 구조는 층수에 따라 적이 강해지고, 바꾼 구조는 강화 방을 지나면 티어가 올라 프리셋 조각을 뽑아 편성"
        caption: "처음 구조는 층수에 따라 적이 강해지고, 바꾼 구조는 강화 방을 지나면 티어가 올라 프리셋 조각을 뽑아 편성"
      - src: "/images/games/claywars/bugs/cw-1_preset-editor.webp"
        width: 902
        height: 832
        alt: "적 프리셋 편집 창, 등급별 전투력 범위와 프리셋 조각(병과, 병사 수, 증강)을 에디터에서 편집"
        caption: "적 프리셋 편집 창, 등급별 전투력 범위와 프리셋 조각(병과, 병사 수, 증강)을 에디터에서 편집"
  - problem: "아웃게임은 부대 id와 업그레이드 단계만 넘기고 전투가 스탯과 적 구성을 다시 계산해, 같은 공식이 두 곳에 생기고 배치 화면의 적과 전투의 적이 달라질 수 있었습니다."
    cause: "전투 파트는 팀원이 따로 만들고 있어서, 두 파트가 무엇을 주고받을지 정해져 있지 않았습니다."
    solution: "아웃게임이 아군과 적 분대마다 병과, 병사 수, 최종 공격력과 체력, 배치 칸을 계산하고, 선택한 캐릭터 스킬과 함께 전역 브릿지 한 곳에 담아 넘기게 했습니다. 전투는 받은 값 그대로 스폰하고 다시 계산하지 않습니다. 아웃게임과 전투는 폴더와 어셈블리로 나눠, 두 파트가 서로 기다리지 않고 병렬로 개발했습니다."
    learned: "주고받는 데이터를 먼저 정해 두면, 형식이 바뀌어도 고칠 곳은 데이터 클래스와 연결층뿐이다."
    images:
      - src: "/images/games/claywars/bugs/cw-2_structure.webp"
        width: 1600
        height: 752
        alt: "처음 구조는 id만 넘겨 전투가 다시 계산하고, 바꾼 구조는 아웃게임이 계산한 최종 값을 전역 브릿지로 넘김"
        caption: "처음 구조는 id만 넘겨 전투가 다시 계산하고, 바꾼 구조는 아웃게임이 계산한 최종 값을 전역 브릿지로 넘김"
      - src: "/images/games/claywars/bugs/cw-2_deploy-battle.webp"
        width: 1600
        height: 1649
        alt: "위는 배치 화면, 아래는 같은 편성으로 시작한 전투 첫 프레임"
        caption: "위는 배치 화면, 아래는 같은 편성으로 시작한 전투 첫 프레임"
  - problem: "모든 유닛이 가장 가까운 적에 몰려 한 점에 뭉치고, 전투가 한 덩어리로 보여 분대끼리 맞붙는 모습이 사라졌습니다."
    cause: "모든 유닛이 가장 가까운 적을 고르면 같은 대상에 쏠리고, 랜덤으로 나누면 서로 다른 상대를 쫓아다니는 술래잡기가 됐습니다. 겹침을 밀어내는 처리는 판정을 통과한 직후 위치를 밀어 전투가 끝나지 않게 만들었습니다."
    solution: "참고작 Mini Warriors처럼 군대끼리 맞붙도록, 분대를 대형 이동과 개별 전투 두 상태로 나눠 대형을 유지한 채 접근하고 교전 거리 안에서만 개별 전투로 바꿨습니다. 타겟은 아군 K번째 유닛이 상대 생존자 K번째를 노리는 순번 매칭으로 정해 난수 없이 대형의 같은 자리끼리 맞붙게 했고, 상대 분대가 전멸하면 다시 대형을 맞춥니다. 화면에서 분대끼리 맞붙는 전선이 보입니다."
    learned: "보기 좋은 전투는 위치를 사후에 보정하는 것보다 누가 누구를 노리는지부터 설계해야 나온다."
    images:
      - src: "/images/games/claywars/bugs/cw-3_structure.webp"
        width: 1600
        height: 752
        alt: "처음 구조는 모든 유닛이 가장 가까운 적을 노리고, 바꾼 구조는 대형 이동과 개별 전투 두 상태에 순번 매칭"
        caption: "처음 구조는 모든 유닛이 가장 가까운 적을 노리고, 바꾼 구조는 대형 이동과 개별 전투 두 상태에 순번 매칭"
      - src: "/images/games/claywars/bugs/cw-3_target-lines.webp"
        width: 1600
        height: 900
        alt: "교전 중 아군 K번째 유닛과 적 K번째 유닛을 잇는 타겟 선(설명용 디버그 표시)"
        caption: "교전 중 아군 K번째 유닛과 적 K번째 유닛을 잇는 타겟 선(설명용 디버그 표시)"
---

<!-- 본문을 쓰면 게임 상세의 "구현 노트"에 표시된다. -->
