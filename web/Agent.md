# Agent.md — 다우기술 금융/증권 IT 개발 신입 포트폴리오 리빌드 지침서

> **목표**: 하성용(Ha Sung Yong)의 게임 개발자 포트폴리오를 **다우기술 금융/증권 IT 개발(신입)** 직무에 최적화된 포트폴리오로 완전히 재설계한다.
> **타겟 직무**: [신입] 금융/증권 IT 개발 — 키움증권 계정계·채널계(HTS/MTS) 시스템, AI 서비스, 인사/정보계 시스템 개발 및 운영
> **레퍼런스**: https://daou.co.kr (다우기술 공식 사이트) / https://blog.naver.com/daoustory (채용 블로그)

---

## §1. 브랜드 & 디자인 시스템

### 1.1 다우기술 브랜드 팔레트 (실측 CSS 기반)

```css
:root {
  /* 다우기술 핵심 브랜드 컬러 — daou.co.kr index.css 실측 */
  --daou-blue:          #2484C6;   /* 시그니처 다우 블루 (헤더 보더, 버튼, CTA) */
  --daou-blue-dark:     #1272BA;   /* 버튼 hover/active 딥 블루 */
  --daou-blue-light:    #2482C8;   /* 메뉴 hover 실측 */
  --daou-blue-glow:     rgba(36, 132, 198, 0.20);

  /* 다우 보조 컬러 (다우오피스, 다우싱크, 애드콘 섹션 실측) */
  --daou-cyan:          #43D4E9;   /* 다우오피스 page4 배경 */
  --daou-purple:        #5F24E4;   /* 애드콘 page6 배경 */
  --daou-navy:          #2B2DE8;   /* 다우싱크 page5 배경 */
  --daou-sky:           #B0D2FF;   /* 다우싱크 서브텍스트 */

  /* 배경 시스템 */
  --daou-bg-main:       #FFFFFF;   /* 다우 공식 배경 */
  --daou-bg-section:    #F3F5FC;   /* 사방넷 섹션 */
  --daou-bg-dark:       #0A1628;   /* 포트폴리오용 딥 다크 네이비 */
  --daou-bg-card:       #0F1F35;
  --daou-bg-card-hover: #162840;

  /* 텍스트 */
  --daou-text-primary:   #1A1A1A;
  --daou-text-secondary: #515151;  /* 내비 실측 */
  --daou-text-muted:     #8499B1;  /* 사방넷 섹션 실측 */
  --daou-text-dim:       #CFD5D9;  /* BizBox 서브텍스트 실측 */

  /* 보더 */
  --daou-border:        rgba(36, 132, 198, 0.20);
  --daou-border-solid:  #2484C6;   /* 헤더 하단 2px 보더 실측 */

  /* 그라디언트 */
  --grad-daou-primary:  linear-gradient(135deg, #1272BA 0%, #2484C6 50%, #43D4E9 100%);
  --grad-daou-dark:     linear-gradient(135deg, #0A1628 0%, #0F1F35 100%);
  --grad-daou-finance:  linear-gradient(135deg, #1272BA 0%, #2B2DE8 100%);

  /* 금융 테마 액센트 */
  --finance-gold:       #F8D306;   /* 다우싱크 섹션 강조 실측 */
  --finance-green:      #00C96B;   /* 매수 신호 (HTS 연상) */
  --finance-red:        #FF3B3B;   /* 매도 신호 (HTS 연상) */
  --finance-chart:      #43D4E9;

  /* 타이포 (다우기술 실측 폰트: NanumBarunGothic → Pretendard로 현대화) */
  --font-main: 'Pretendard', 'Nanum Gothic', -apple-system, sans-serif;
  --font-code: 'JetBrains Mono', 'D2Coding', monospace;
}
```

### 1.2 디자인 언어 가이드

| 항목 | 다우기술 실측 스타일 | 포트폴리오 적용 방향 |
|---|---|---|
| 전체 톤 | 화이트 기반 깔끔한 B2B 기업 사이트 | 다크 배경 + 다우 블루 강조 (신뢰 + 현대적) |
| 헤더 | 흰 배경 + 하단 #2484C6 2px 보더 | 반투명 다크 + 다우 블루 하단 라인 |
| 버튼 | 파란 배경 + 흰 텍스트 직사각형 | 직사각 버튼 + 다우 블루 채움 (클립패스 제거) |
| 카드 | 이미지 + 간결한 설명 텍스트 | 다크 카드 + 다우 블루 테두리 호버 |
| 섹션 배경 | #f3f5fc 연한 블루-화이트 | 다크 네이비 + #f3f5fc 교차 |
| 폰트 | NanumBarunGothic | Pretendard + JetBrains Mono |
| 핵심 키워드 | 신뢰·안정·전문성·Financial IT | 시스템 안정성, 실시간 처리, Java, C++ |

---

## §2. 직무 분석 및 역량 매핑

### 2.1 다우기술 [신입] 금융/증권 IT 개발 요구사항

```
팀: 키움증권 IT 인프라 — 계정계 + 채널계 시스템 설계·운영
담당업무:
  ① 원장(계정계) 시스템 개발 및 운영
  ② 고객채널(HTS, MTS) 시스템 개발 및 운영
  ③ 키움증권 AI 서비스 개발 및 운영
  ④ 키움자산운용 정보계/인사 시스템 개발 및 운영

사용 기술: Java, JavaScript, C, C++, Python / Android, iOS, Visual C++ / Oracle, MySQL
필수: IT 전공자 / Java·C++·Python 중 1개 이상 / 협업 능력
우대: IT 자격증 / 프로젝트·공모전 경험 / 증권·금융 관심
전형: 서류 → 코딩테스트 → 과제테스트 → 실무면접 → 심층면접
```

### 2.2 하성용 역량 → 직무 매핑

| 직무 요구사항 | 하성용 실전 경험 | 어필 강도 |
|---|---|---|
| C++, Java 언어 역량 | C++ OpenGL 렌더링 파이프라인 직접 구현 (Seek the card, DICOM) | ★★★★★ |
| 대규모 시스템 안정성 | VR HMD 90fps 달성 — URP 렌더 패스 최적화, 프레임 드랍 해결 | ★★★★★ |
| 실시간 처리 성능 | 1초 지연도 허용 안 되는 VR 환경 최적화 | ★★★★☆ |
| AI 서비스 개발 | 이오름 (DTW + FastAPI AI 파이프라인 + Android 앱) | ★★★★☆ |
| Android/Mobile 개발 | Android Studio 앱 개발, REST API 파이프라인 구축 | ★★★★☆ |
| 시스템 아키텍처 | 컴포넌트 아키텍처, 이벤트/옵저버 패턴, 비동기 최적화 | ★★★★☆ |
| 데이터 처리 | DICOM 로우데이터 처리, DTW 시계열 알고리즘 | ★★★☆☆ |
| 협업·소통 | 기획·아트 직군과 1년 3인 팀 VR 완주 | ★★★★★ |
| SSAFY AI 교육 | 삼성 청년 SW AI 아카데미 이수 중 (2026.07~) | ★★★★★ |
| 공모전 수상 | 숭실 캡스톤디자인 총장상(동상) — 이오름 | ★★★★★ |

### 2.3 핵심 메시지

```
"실시간 처리 최적화와 시스템 안정성을 이해하는 개발자"

키움증권의 '1초도 멈출 수 없는 시스템'을 만들기 위해:
- VR 90fps 달성 경험  → 실시간 처리 성능 민감도
- 오픈소스 코드 분석   → 장애 대응·근본 원인 해결 능력
- C++/C# 멀티 언어   → Java/C/C++ 사용 기술 적합
- AI + Android 앱    → HTS/MTS + AI 서비스 팀 직무 적합
- 1년 협업 완주 + 수상 → 책임감·팀워크 검증
```

---

## §3. 사이트 섹션 구성

```
[GNB]       HA SUNG YONG · DAOU READY 배지 + About/Skills/Projects/Contact 내비
[HERO]      RELIABLE SYSTEM ENGINEERING / 타이핑 키워드 / 통계 / 배지
[ABOUT]     프로필 카드 + 타임라인 + 다우기술 지원 동기 (3단 텍스트)
[SKILLS]    기술 아이콘 (Java·C++·C#·Python·Android·OpenCV·Unity·OpenGL·CUDA)
[PROJECTS]  6개 카드 (필터: All / Java·Android / C++·System / AI·CV)
[DAOU FIT]  직무 검증 체크리스트 + SYSTEM/REALTIME/AI/MOBILE/ALGORITHM 가치 카드
[FOOTER]    다우기술 금융 IT 개발 지원 포트폴리오 명시
```

### 3.1 HERO Section

- **메인 타이틀**: `RELIABLE SYSTEM ENGINEERING`
- **서브타이틀**: `안정적이고 빠른 시스템을 만드는 개발자`
- **타이핑 키워드**: `Java / C++ 시스템 개발자` / `실시간 성능 최적화 경험` / `AI + Android 앱 파이프라인 구축` / `키움증권을 꿈꾸는 엔지니어` / `대규모 시스템 아키텍처 설계`
- **통계**: `6+ Projects` / `1년 장기 팀 프로젝트` / `90fps 달성` / `🏆 캡스톤 총장상`
- **배지 키워드**: `Java`, `C++`, `Android`, `AI Pipeline`, `System Design`, `SSAFY`

### 3.2 DAOU FIT Section (기존 NEXON FIT 완전 교체)

```
✓ Java, C/C++, Python 언어 역량
  C++로 OpenGL 렌더링 파이프라인 + DICOM 의료 영상 파이프라인 직접 구현
  C#(Unity)으로 VR 게임 클라이언트 1년 총괄. Python FastAPI 백엔드 구축

✓ 실시간 시스템 성능 최적화
  VR HMD 90fps 달성 — URP 렌더 패스 코드 직접 분석·다운샘플링 최적화
  "1초의 지연도 손실" — 증권 시스템 철학과 동일한 경험 보유

✓ Android / Mobile 앱 개발
  Android Studio 기반 이오름 앱 (AI 음성 분석 UI + REST 비동기 통신)
  FastAPI ↔ Android 대용량 멀티미디어 파이프라인 구축

✓ AI 서비스 개발 경험
  DTW(Dynamic Time Warping) 시계열 매칭 알고리즘 직접 구현 (97.8% 정밀도)
  AI 프롬프트 설계 + SSAFY AI 교육 이수 (2026.07~)

✓ 팀 협업 및 장기 프로젝트 완주
  3인 팀 VR 프로젝트 1년 완주 → 졸업전시 성공 런칭
  기획·아트 직군과의 긴밀한 소통 / 캡스톤디자인 총장상(동상) 수상

★ 컴퓨터공학 복수전공 + SSAFY
  자료구조·알고리즘·컴퓨터그래픽스 이수
  삼성 청년 SW AI 아카데미 입과 (2026.07~)

★ 시스템 아키텍처 설계
  컴포넌트 아키텍처 + 이벤트/옵저버 패턴
  클라이언트-서버 비동기 파이프라인 구축
```

---

## §4. 프로젝트 카드 재설계

### 4.1 daouFit 태그 시스템 (projects-data.js)

```js
const DAOU_FIT_TAGS = {
  system:    { label: 'SYSTEM',    kr: '시스템',   color: '#2484C6', class: 'system',    desc: '안정적 시스템 설계 및 최적화' },
  realtime:  { label: 'REALTIME',  kr: '실시간',   color: '#43D4E9', class: 'realtime',  desc: '실시간 처리 성능 민감도 경험' },
  ai:        { label: 'AI',        kr: 'AI 개발',  color: '#5F24E4', class: 'ai',        desc: 'AI 서비스 파이프라인 구축' },
  mobile:    { label: 'MOBILE',    kr: '모바일',   color: '#F8D306', class: 'mobile',    desc: 'Android/iOS 앱 개발 경험' },
  algorithm: { label: 'ALGORITHM', kr: '알고리즘', color: '#00C96B', class: 'algorithm', desc: '자료구조·알고리즘 직접 구현' },
};
```

### 4.2 프로젝트별 매핑 및 achievement 교체

| 프로젝트 | daouFit | achievement 변경 후 |
|---|---|---|
| The Mute Brush_ | system, realtime | VR HMD 90fps 실시간 성능 방어 | 오픈소스 URP 렌더 패스 코드 분석·수정 |
| 이오름 (Eorum) | ai, mobile, algorithm | Android + FastAPI AI 파이프라인 완성 | 캡스톤 총장상(동상) | DTW 97.8% 정밀도 |
| Seek the card | system, algorithm | 순수 C++/OpenGL FBO 포스트프로세싱 파이프라인 직접 구현 |
| Carrot Mansion | system | 텔레포트 기반 무한 루프 시스템 설계 | Raycast 트리거 누락 트러블슈팅 해결 |
| Homer Simpson 3D | algorithm | 3D 에셋 없이 기하학 수학 프리미티브만으로 완전한 3D 캐릭터 완성 |
| DICOM Segmentation | system, algorithm | C++ + OpenCV 로우레벨 의료 영상 분할 다단계 파이프라인 완성 |

---

## §5. 기술 스택 재배치

### 5.1 아이콘 우선 노출 순서

```
1. Java     (신규 추가 — SSAFY 학습 중)
2. C++      (OpenGL/DICOM 직접 구현)
3. C#       (Unity VR 1년)
4. Python   (FastAPI + SSAFY AI)
5. Android  (이오름 앱)
6. OpenCV   (DICOM, 구화 분석)
7. Unity    (VR 실시간 최적화)
8. OpenGL   (로우레벨 렌더링)
9. CUDA     (병렬 처리 학습)
```

### 5.2 Java 기술 카드 신규 추가 (tech-icons.js)

```js
java: {
  name: 'Java',
  category: 'Object-Oriented · Enterprise Development',
  level: '★★★☆☆',
  levelNum: '72',
  desc: '객체지향 설계 원리를 준수하여 변경에 유연하고 확장 가능한 코드 작성. Android 앱 개발 및 알고리즘 문제 해결에 활용. SSAFY를 통한 심화 역량 강화 중.',
  shortDesc: '객체지향 설계(SOLID) 기반 Java 개발 및 Android 앱 파이프라인 구축 경험.',
  bullets: [
    'Android 앱 개발 Java 기반 (이오름 Eorum)',
    '객체지향 설계 원칙(SOLID) 적용',
    '자료구조·알고리즘 직접 구현 (SSAFY)',
    '컬렉션 프레임워크·제네릭 활용',
    'SSAFY 삼성 청년 SW AI 아카데미 이수 중'
  ]
},
```

### 5.3 SKILLS_DATA 재분류

```js
const SKILLS_DATA = [
  {
    group: 'Language (직무 핵심)',
    icon: '⚙️',
    iconClass: 'blue',
    skills: [
      { name: 'Java',           level: 72, sub: 'OOP, Android, SSAFY 학습 중' },
      { name: 'C++ (Modern)',   level: 82, sub: 'STL, 포인터, 렌더링 파이프라인' },
      { name: 'C# (Unity)',     level: 88, sub: 'async/await, Event, Coroutine' },
      { name: 'Python',         level: 68, sub: 'FastAPI, OpenCV, AI 파이프라인' },
    ],
  },
  {
    group: 'Mobile & System',
    icon: '📱',
    iconClass: 'cyan',
    skills: [
      { name: 'Android Studio', level: 70, sub: 'Activity, REST, AI 연동' },
      { name: 'OpenGL / C++',   level: 78, sub: 'VAO/VBO, FBO, 1인칭 파이프라인' },
      { name: 'Unity (URP)',    level: 90, sub: 'VR, Physics, 커스텀 렌더 패스' },
    ],
  },
  {
    group: 'AI & Computer Vision',
    icon: '🤖',
    iconClass: 'purple',
    skills: [
      { name: 'OpenCV (C++)',   level: 74, sub: 'DICOM, Watershed, CLAHE' },
      { name: 'DTW Algorithm',  level: 70, sub: '시계열 매칭, 구화 분석' },
      { name: 'AI Tool 활용',   level: 85, sub: 'SSAFY AI 교육, 프롬프트 설계' },
    ],
  },
  {
    group: 'CS Fundamentals',
    icon: '📚',
    iconClass: 'green',
    skills: [
      { name: '자료구조·알고리즘', level: 75, sub: 'SSAFY + 컴퓨터학부 이수' },
      { name: '운영체제·네트워크', level: 65, sub: '컴퓨터학부 복수전공 이수' },
      { name: 'Git 협업',         level: 82, sub: '브랜치 전략, 팀 협업 1년' },
    ],
  },
];
```

---

## §6. UI/UX 가이드라인

### 6.1 배지 교체

```html
<!-- 기존 (넥슨) -->
<div class="nav-nexon-badge"><span class="dot"></span>NEXON READY</div>

<!-- 변경 (다우기술) -->
<div class="nav-daou-badge" aria-label="다우기술 지원 준비 완료">
  <span class="dot"></span>DAOU READY
</div>
```

### 6.2 컬러 토큰 교체 대조표

| 기존 (넥슨) | 값 | 신규 (다우) | 값 |
|---|---|---|---|
| --nexon-blue | #2546CD | --daou-blue | #2484C6 |
| --nexon-cyan | #0AA0D2 | --daou-cyan | #43D4E9 |
| --nexon-lime | #B4E114 | --finance-gold | #F8D306 |
| --nexon-bg-main | #000000 | --daou-bg-dark | #0A1628 |
| --nexon-bg-card | #0F1420 | --daou-bg-card | #0F1F35 |
| --grad-blue-lime | (블루-라임) | --grad-daou-primary | (블루-시안) |

### 6.3 버튼 클립패스 제거

```css
/* 넥슨 스타일 (제거) */
.btn-primary { clip-path: var(--angled-clip-btn); background: var(--grad-blue-lime); }

/* 다우기술 스타일 (적용) */
.btn-primary {
  clip-path: none;
  background: var(--daou-blue);
  color: #ffffff;
  border-radius: 4px;
  border: 2px solid var(--daou-blue);
  font-weight: 600;
}
.btn-primary:hover {
  background: var(--daou-blue-dark);
  border-color: var(--daou-blue-dark);
}
```

### 6.4 파티클 색상 교체

```js
// 기존 (넥슨): ['#0AA0D2', '#B4E114', '#E2F0FF', '#74A6F5', '#A5D8FF']
// 변경 (다우 금융 테마): 
const FINANCE_COLORS = ['#2484C6', '#43D4E9', '#1272BA', '#00C96B', '#B0D2FF'];
```

---

## §7. 메타 태그 및 SEO

```html
<title>하성용 | 시스템 개발자 포트폴리오 · 다우기술 Financial IT</title>
<meta name="description" content="하성용 시스템 개발자 포트폴리오 - Java, C++, Android, AI 파이프라인 전문. 다우기술(키움증권) 금융/증권 IT 개발 신입 지원.">
<meta name="keywords" content="하성용, 다우기술, 키움증권, 금융 IT 개발, Java, C++, Android, 신입 개발자, SSAFY, 포트폴리오">
<meta property="og:title" content="하성용 | 시스템 개발자 포트폴리오">
<meta property="og:description" content="실시간 처리 최적화·AI 파이프라인·Android 앱 개발 경험의 신입 개발자">
<!-- 파비콘: 게임 컨트롤러 → 금융 차트 상승 이모지로 교체 -->
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💹</text></svg>">
```

---

## §8. 파일별 수정 범위

| 파일 | 수정 내용 | 우선순위 |
|---|---|---|
| css/nexon-tokens.css → css/daou-tokens.css | 컬러 토큰 전체 교체 + 파일명 변경 | 🔴 최우선 |
| index.html | 토큰 링크, 메타태그, 파비콘, 배지, 섹션 라벨, 텍스트, 필터탭, 푸터 | 🔴 최우선 |
| css/components.css | 버튼 clip-path 제거, 다우 블루 배지 추가 | 🔴 최우선 |
| css/sections.css | 헤더 보더, HERO 배경, nexon-badge→daou-badge 스타일 | 🔴 최우선 |
| js/data/projects-data.js | DAOU_FIT_TAGS 추가, values→daouFit, achievement 재작성 | 🟠 중요 |
| js/tech-icons.js | Java 카드 추가, 아이콘 순서 재배치 | 🟠 중요 |
| js/main.js | 타이핑 키워드, 파티클 색상, Nexon→Daou Fit 렌더러 교체 | 🟠 중요 |
| js/modal.js | VALUES_META → DAOU_FIT_TAGS 참조 교체 | 🟠 중요 |
| css/animations.css | glow 색상 다우 블루 계열로 교체 | 🟡 보통 |
| css/project-detail-modal.css | 배지 색상 토큰 참조 교체 | 🟡 보통 |
| css/tech-icons.css | 선택 상태 border 색상 다우 블루로 교체 | 🟡 보통 |

---

## §9. 텍스트 교체 리스트

### HERO 섹션

| 기존 (넥슨) | 변경 (다우기술) |
|---|---|
| GAME DEVELOPER PORTFOLIO | SYSTEM DEVELOPER PORTFOLIO |
| HIGH-PERFORMANCE GAME ENGINEERING & GAME EXPERIENCE | RELIABLE SYSTEM ENGINEERING & FINANCIAL IT INNOVATION |
| 렌더링 파이프라인의 깊은 이해를 바탕으로 최적화 아키텍처 설계 및 몰입감 있는 게임 인터랙션 완성. | 실시간 처리 성능 최적화 경험을 바탕으로 안정적인 시스템 아키텍처 설계 및 AI·모바일 서비스 파이프라인 완성. |
| NEXON READY 배지 | DAOU READY 배지 |
| 배지: Unity/URP, VR, Stencil Buffer | 배지: Java, C++, Android, AI Pipeline, System Design, SSAFY |

### About 섹션

| 기존 | 변경 |
|---|---|
| 플레이어 경험 중시 — 깊은 몰입의 순간 완성. | 시스템 신뢰 중시 — 1초도 멈추지 않는 서비스 완성. |
| 그래픽 품질과 렌더링 최적화를 플레이어 몰입의 핵심 기반으로 정의. | 시스템 안정성과 실시간 처리 성능을 사용자 신뢰의 핵심 기반으로 정의. |
| 1년간의 VR 프로젝트(The Mute Brush_) 메인 클라이언트 개발 총괄 담당. | 1년간의 팀 VR 프로젝트를 통해 실시간 최적화·협업·완결성을 검증. |
| 넥슨 게임·플랫폼 환경에서의 클라이언트 및 렌더링 파이프라인 최적화 연구 지향. | 다우기술 금융 IT 환경에서의 안정적 시스템 개발과 AI 서비스 구현을 목표로 지원. |

### Footer

| 기존 | 변경 |
|---|---|
| 렌더링 파이프라인 & VR 인터랙션 전문 게임 개발자 | 시스템 개발 & AI 파이프라인 전문 신입 개발자 |
| 넥슨(NEXON) 게임 프로그래밍을 향한 열정을 담은 포트폴리오 | 다우기술(키움증권) 금융 IT 개발을 향한 열정을 담은 포트폴리오 |
| Built with NEXON Design System | Built with DAOU Design System |
| 넥슨 채용 / https://career.nexon.com | 다우기술 채용 / https://www.daou.co.kr/ko/recruit |

---

## §10. 변경 금지 항목 (사실 데이터)

- 프로젝트 구현 상세 내용 (코드, 알고리즘, 기술적 사실)
- 학력 정보 (숭실대학교, SSAFY, 졸업 연도)
- 수상 이력 (제15회 숭실 캡스톤 총장상)
- 연락처 (gktjddyd9429@naver.com / 010-7572-9429)
- GitHub: https://github.com/gktjddyd
- 이미지 파일 경로 (assets/images/...)

---

## §11. 실행 우선순위 체크리스트

```
Phase 1 — 디자인 시스템 교체 (약 30분)
  [ ] css/daou-tokens.css 생성 (§1.1 컬러 토큰 적용)
  [ ] index.html css 링크 nexon-tokens → daou-tokens 교체
  [ ] 버튼 clip-path 제거, 직사각 스타일로 전환 (§6.3)
  [ ] 애니메이션 glow 색상 다우 블루로 교체
  [ ] nav-nexon-badge → nav-daou-badge 스타일 교체

Phase 2 — 콘텐츠 교체 (약 60분)
  [ ] index.html — 메타태그, 파비콘💹, 배지, 라벨, 텍스트, 필터탭, 푸터 (§9)
  [ ] js/main.js — 타이핑 키워드, 파티클 색상, Daou Fit 렌더러 교체
  [ ] js/data/projects-data.js — DAOU_FIT_TAGS, daouFit, achievement (§4)
  [ ] js/tech-icons.js — Java 카드 추가, 순서 재배치 (§5.2)
  [ ] js/modal.js — DAOU_FIT_TAGS 참조 교체
  [ ] index.html — tech-icons-grid에 Java 버튼 추가

Phase 3 — 검증 (약 15분)
  [ ] 전체 섹션 시각적 확인 (라임 컬러 잔재 없는지)
  [ ] 다우기술 직무 체크리스트 항목 누락 없는지 확인
  [ ] 모바일 반응형 확인
  [ ] 링크 동작 확인 (GitHub / 다우기술 채용 페이지)
  [ ] 파비콘 💹 표시 확인
```

---

*이 Agent.md는 하성용(Ha Sung Yong)의 포트폴리오를 다우기술 금융/증권 IT 개발(신입) 직무에 최적화하여 재설계하기 위한 완전한 지침서입니다.*
*작성일: 2026-09-08 | 레퍼런스: daou.co.kr CSS 실측 기반*
