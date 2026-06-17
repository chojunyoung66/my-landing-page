# 퇴직 현금흐름 플래너 (Retirement Cashflow Planner)

퇴직 후 월별 수입·지출을 진단하고 캐시플로우 갭을 파악할 수 있는 브라우저 기반 단일 페이지 앱입니다.

## 프로젝트 구조

```
retirement/
├── index.html                    # 진입점 HTML (ES module로 index.js 로드)
├── index.js                      # 앱 부트스트랩 (Injector → RootScreen 실행)
├── injector.js                   # DI 컨테이너 — 의존성 조립
├── style.css                     # 전역 스타일
│
├── domain/
│   └── plan.js                   # Plan 도메인 모델 (상태 스키마 정의)
│
├── service/
│   └── retirement-service.js     # 비즈니스 로직 (예상 수치, 갭 계산)
│
├── repo/
│   └── memory/
│       └── plan-repo.js          # 인메모리 플랜 저장소
│
└── ui/browser/
    ├── root-screen.js            # 화면 라우터 & 전역 상태 관리
    ├── welcome-screen.js         # 1단계: 웰컴 / 핵심 지표 안내
    ├── diagnosis-type-screen.js  # 2단계: 진단 유형 선택 (개인/부부)
    ├── profile-screen.js         # 3단계: 출생연도 · 소득 현황 입력
    ├── cashflow-input-screen.js  # 4단계: 연금 수령액 입력 (국민·퇴직·개인)
    ├── scenario-screen.js        # 5단계: 생활비 시나리오 설정
    ├── medical-expense-screen.js # 6단계: 의료비 입력 (건보·민간)
    ├── projection-screen.js      # 7단계: 월별 캐시플로우 예측 결과
    └── summary-screen.js         # 8단계: 종합 진단 요약
```

## 아키텍처

외부 프레임워크 없이 바닐라 JS(ES modules)로 구성된 **레이어드 아키텍처**입니다.

| 레이어 | 역할 |
|--------|------|
| `ui/browser/` | 화면 렌더링 & 사용자 이벤트 처리 |
| `service/` | 비즈니스 규칙 (연금 가이드, 갭 분석) |
| `domain/` | 순수 도메인 모델 (Plan) |
| `repo/` | 데이터 영속성 (현재 인메모리) |
| `injector.js` | 의존성 조립 (DI 컨테이너 역할) |

상태는 `RootScreen`이 단일 객체로 보유하며, 각 화면은 `render(container, state, next)` 콜백을 통해 다음 화면과 상태 변경을 전달합니다.

## 화면 흐름

```
welcome → diagnosis-type → profile → cashflow → scenario → medical-expense → projection → summary
```

## 실행 방법

별도 빌드 없이 정적 파일 서버로 실행합니다.

```bash
# 예: VS Code Live Server 또는
npx serve .
```

브라우저에서 `index.html`을 열면 바로 동작합니다.
