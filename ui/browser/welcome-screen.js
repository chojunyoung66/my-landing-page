export class WelcomeScreen {
  constructor(service) {
    this._service = service;
  }

  render(container, state, moveTo) {
    const el = document.createElement("div");
    el.className = "screen welcome-screen";
    el.innerHTML = `
      <header class="app-header">
        <div class="app-header-inner">
          <div class="app-logo">
            <div class="logo-icon-wrap" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span class="logo-text">은퇴현금 설계센터</span>
          </div>
          <button class="help-btn" id="helpBtn" aria-label="도움말">도움말</button>
        </div>
      </header>

      <div class="screen-scroll">

        <!-- 섹션 1: 히어로 -->
        <div class="w-section">
          <div class="w-card">
            <h1 class="hero-title-main">내 연금으로 매달<br>얼마를 받을까요?</h1>
            <p class="hero-subtitle">
              1분 안에 확인하는 나의 은퇴 후 월 현금 흐름,<br>
              국민연금 정보만 있으면 바로 시작할 수 있어요.
            </p>
            <div class="avg-display">
              <p class="avg-label">평균 예상 수령액</p>
              <div class="avg-number">187</div>
              <div class="avg-unit">만원 / 월</div>
              <div class="user-count-row">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                1,248,392명이 진단을 완료했습니다.
              </div>
            </div>

            <ul class="trust-list" role="list">
              <li class="trust-list-item">
                <span class="trust-check" aria-hidden="true">✓</span>회원가입 없이 시작
              </li>
              <li class="trust-list-item">
                <span class="trust-check" aria-hidden="true">✓</span>결과 확인 후 상담 선택 가능
              </li>
              <li class="trust-list-item">
                <span class="trust-check" aria-hidden="true">✓</span>평균 1분 소요
              </li>
            </ul>
          </div>
        </div>

        <!-- 섹션 2: 3단계 진단 -->
        <div class="w-section">
          <div class="w-card">
            <h2 class="w-section-title">체계적인 3단계 진단</h2>
            <ol class="w-steps" role="list">
              <li class="w-step-item">
                <div class="step-num-badge blue" aria-hidden="true">01</div>
                <div class="w-step-text">
                  <strong>기본 정보 입력</strong>
                  <span>나이, 은퇴 예정 시기 등 간단한 정보를 입력합니다.</span>
                </div>
              </li>
              <li class="w-step-item">
                <div class="step-num-badge blue" aria-hidden="true">02</div>
                <div class="w-step-text">
                  <strong>연금 데이터 분석</strong>
                  <span>국민연금 예상 수령액을 정확하게 분석합니다.</span>
                </div>
              </li>
              <li class="w-step-item">
                <div class="step-num-badge yellow" aria-hidden="true">03</div>
                <div class="w-step-text">
                  <strong>현금흐름 리포트</strong>
                  <span>월별 예상 수령액과 부족액을 개인 맞춤형으로 분석합니다.</span>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <!-- 섹션 3: 결과 미리보기 -->
        <div class="w-section">
          <h2 class="w-section-title">이런 결과를 확인할 수 있어요</h2>
          <p class="w-section-desc">실제 진단 결과 예시를 미리 확인해보세요</p>

          <div class="w-card" style="margin-bottom:10px;">
            <div class="w-card-header">
              <span class="w-card-header-icon" aria-hidden="true">💸</span>
              <span class="w-card-header-title">월 예상 현금흐름</span>
            </div>
            <div class="cf-table">
              <div class="cf-row">
                <span class="cf-row-label">예상 월 연금</span>
                <span class="cf-row-val income">182만원</span>
              </div>
              <div class="cf-row" style="border-bottom:none;">
                <span class="cf-row-label">목표 생활비</span>
                <span class="cf-row-val">250만원</span>
              </div>
            </div>
            <div class="cf-row-gap">
              <span class="cf-gap-label">월 부족액</span>
              <span class="cf-gap-val">68만원</span>
            </div>
          </div>

          <div class="w-card-danger" style="margin-bottom:10px;">
            <div class="w-card-header">
              <span class="w-card-header-icon" aria-hidden="true">⚠️</span>
              <span class="w-card-header-title" style="color:var(--danger)">위험 시점 분석</span>
            </div>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:4px;">현금흐름 부족 예상 시점</p>
            <div class="risk-time">74세 이후</div>
            <p class="risk-sub">현재 자산 기준 예측</p>
            <ul class="risk-bullets" role="list">
              <li class="risk-bullet-item">
                <span class="risk-dot" style="background:var(--primary)" aria-hidden="true"></span>
                65-73세: 안정적 현금흐름
              </li>
              <li class="risk-bullet-item">
                <span class="risk-dot" style="background:var(--danger)" aria-hidden="true"></span>
                74세 이후: 추가 대비 필요
              </li>
            </ul>
          </div>

          <div class="w-card-warning">
            <div class="w-card-header">
              <span class="w-card-header-icon" aria-hidden="true">💡</span>
              <span class="w-card-header-title" style="color:#92400E">맞춤 전략 제안</span>
            </div>
            <div class="strategy-items">
              <div class="strategy-item">
                <span class="strategy-dot" aria-hidden="true"></span>
                <div class="strategy-text">
                  <strong>개인연금 추가 납입</strong>
                  <span>월 30만원 추가 시 부족액 완화</span>
                </div>
              </div>
              <div class="strategy-item">
                <span class="strategy-dot" aria-hidden="true"></span>
                <div class="strategy-text">
                  <strong>생활비 조정</strong>
                  <span>월 220만원 목표 시 안정적</span>
                </div>
              </div>
              <div class="strategy-item">
                <span class="strategy-dot" aria-hidden="true"></span>
                <div class="strategy-text">
                  <strong>퇴직금 운용 전략</strong>
                  <span>연 4% 수익률 달성 방안</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 섹션 4: 신뢰 지표 -->
        <div class="w-section">
          <h2 class="w-section-title">신뢰할 수 있는 분석 기준</h2>
          <p class="w-section-desc">정확한 계산 기준과 객관적인 데이터를 사용합니다</p>
          <div class="w-card">
            <div class="trust-grid" role="list">
              <div class="trust-grid-item" role="listitem">
                <div class="trust-icon-box" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                  </svg>
                </div>
                <span class="trust-grid-label">국민연금 기준</span>
                <span class="trust-grid-sub">공단 수령액 계산식 적용</span>
              </div>
              <div class="trust-grid-item" role="listitem">
                <div class="trust-icon-box" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <span class="trust-grid-label">퇴직연금 포함</span>
                <span class="trust-grid-sub">DB/DC형 모두 지원</span>
              </div>
              <div class="trust-grid-item" role="listitem">
                <div class="trust-icon-box" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <span class="trust-grid-label">생활비 기준</span>
                <span class="trust-grid-sub">실제 소비 패턴 반영</span>
              </div>
              <div class="trust-grid-item" role="listitem">
                <div class="trust-icon-box" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <span class="trust-grid-label">연령별 예측</span>
                <span class="trust-grid-sub">기대수명 고려 분석</span>
              </div>
            </div>
            <div class="stats-row" role="list">
              <div class="stat-item" role="listitem">
                <span class="stat-num">124만+</span>
                <span class="stat-name">진단 완료</span>
              </div>
              <div class="stat-item" role="listitem">
                <span class="stat-num">98%</span>
                <span class="stat-name">정확도</span>
              </div>
              <div class="stat-item" role="listitem">
                <span class="stat-num">1분</span>
                <span class="stat-name">평균 소요</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 섹션 5: 최종 CTA -->
        <div class="w-section">
          <div class="w-card">
            <h2 class="w-section-title">지금 바로 진단을 시작하세요</h2>
            <p class="w-section-desc" style="margin-bottom:0">
              1분 투자로 평생 안정적인 노후를 설계할 수 있습니다
            </p>
            <ul class="final-checks" role="list">
              <li class="final-check-item">
                <span class="trust-check" aria-hidden="true">✓</span>회원가입 불필요
              </li>
              <li class="final-check-item">
                <span class="trust-check" aria-hidden="true">✓</span>무료 분석 제공
              </li>
              <li class="final-check-item">
                <span class="trust-check" aria-hidden="true">✓</span>즉시 결과 확인
              </li>
            </ul>
          </div>
        </div>

      </div>

      <div class="cta-bar">
        <button class="btn-cta" id="startBtn" style="background:var(--primary-dark);">
          1분 진단 시작하기
        </button>
      </div>
    `;

    container.appendChild(el);

    el.querySelector("#startBtn").addEventListener("click", () => {
      moveTo({}, "diagnosis-type");
    });

    el.querySelector("#helpBtn").addEventListener("click", () => {
      alert(
        "이 서비스는 국민연금·퇴직연금·개인연금 정보를 바탕으로 은퇴 후 월 현금흐름을 분석합니다.\n결과는 참고용이며 실제 수령액과 차이가 있을 수 있습니다.",
      );
    });
  }
}
