export class ProjectionScreen {
  constructor(service) {
    this._service = service;
  }

  render(container, state, moveTo) {
    const projection = this._service.calculateProjection(state);
    const isShortfall = projection.monthlyGap < 0;
    const gapAbs = Math.abs(projection.monthlyGap);

    const incomeMan = Math.round(projection.monthlyIncome / 10000);
    const expenseMan = Math.round(projection.monthlyExpense / 10000);
    const gapMan = Math.round(gapAbs / 10000);

    // Bar widths (expense = reference 100%)
    const maxBar = Math.max(expenseMan, incomeMan, 1);
    const incomePct = Math.round((incomeMan / maxBar) * 100);
    const expensePct = Math.round((expenseMan / maxBar) * 100);
    const gapPct = Math.round((gapMan / maxBar) * 100);

    // Gap cause attribution: medical direct → remaining split 60/40 pension/living
    const medicalTotalWon =
      (state.medicalExpense?.healthInsurance ?? 0) +
      (state.medicalExpense?.privateInsurance ?? 0);
    const medicalMan = Math.round(medicalTotalWon / 10000);
    const livingMan = Math.round(
      (state.livingExpense?.desiredMonthly ?? 0) / 10000,
    );

    const medCause = isShortfall ? Math.min(gapMan, medicalMan) : 0;
    const remaining = isShortfall ? gapMan - medCause : 0;
    const penCause = Math.round(remaining * 0.6);
    const livCause = remaining - penCause;

    // Scenario simulations
    const sim1Gap = Math.max(0, gapMan - 30);
    const sim2Gap = Math.max(0, gapMan - 30);
    const sim3Gap = Math.max(0, gapMan - 10);

    const svgBack = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg>`;

    const el = document.createElement("div");
    el.className = "screen welcome-screen";
    el.innerHTML = `
      <header class="app-header">
        <div class="app-header-inner">
          <div class="app-header-left">
            <button class="btn-back" id="backBtn" aria-label="이전으로">${svgBack}</button>
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
          </div>
          <button class="help-btn" aria-label="도움말">도움말 ⓘ</button>
        </div>
      </header>

      <div class="screen-scroll">
      <div class="inner-content">
        <div class="proj-intro">
          <span class="proj-badge">진단 완료</span>
          <h1 class="screen-title" style="margin-top: 14px; margin-bottom: 6px;">안정적인 미래를 향한<br>첫걸음을 내딛었습니다.</h1>
          <p class="proj-intro-sub">내 결과 리포트가 준비되어요</p>
          <p class="proj-intro-hint">저장해서 비교해보고, 필요하면 다시 계산할 수 있어요.</p>
        </div>

        <!-- Summary result card -->
        <div class="proj-summary-card ${isShortfall ? "proj-summary-shortfall" : "proj-summary-surplus"}">
          <h2 class="proj-summary-headline">
            매달 <span class="proj-gap-amount">${gapMan}만원</span>이
            ${isShortfall ? "부족해요" : "여유가 있어요"}
          </h2>
          <p class="proj-summary-sub">
            ${
              isShortfall
                ? "현재 모은 연금 자산만으로는 희망 생활비를 모두 충당하기 어려워요."
                : "현재 연금 수입으로 희망 생활비를 충당할 수 있어요."
            }
          </p>

          <div class="proj-summary-table">
            <div class="proj-sum-row">
              <span class="proj-sum-label">예상 수입</span>
              <span class="proj-sum-val proj-sum-income">${incomeMan}만원</span>
            </div>
            <div class="proj-sum-row">
              <span class="proj-sum-label">목표 생활비</span>
              <span class="proj-sum-val">${expenseMan}만원</span>
            </div>
            <div class="proj-sum-divider"></div>
            <div class="proj-sum-row proj-sum-gap-row">
              <span class="proj-sum-label">${isShortfall ? "월 부족액" : "월 여유액"}</span>
              <span class="proj-sum-val ${isShortfall ? "proj-sum-gap-neg" : "proj-sum-gap-pos"}">${gapMan}만원</span>
            </div>
          </div>

          ${isShortfall ? `<button class="btn-proj-detail" id="detailBtn">부족 원인 상세 보기</button>` : ""}
        </div>

        <!-- Cash flow chart section -->
        <div class="proj-section">
          <p class="proj-section-title">내 은퇴 후 현금흐름</p>
          <p class="proj-section-desc">수입과 지출을 비교하면 매달 ${gapMan}만원의 차이가 발생해요.</p>

          <div class="proj-bars">
            <div class="proj-bar-row">
              <span class="proj-bar-lbl">수입 ${incomeMan}만원</span>
              <div class="proj-bar-track">
                <div class="proj-bar-fill proj-bar-income" style="width:${incomePct}%"></div>
              </div>
            </div>
            <div class="proj-bar-row">
              <span class="proj-bar-lbl">지출 ${expenseMan}만원</span>
              <div class="proj-bar-track">
                <div class="proj-bar-fill proj-bar-expense" style="width:${expensePct}%"></div>
              </div>
            </div>
            ${
              isShortfall
                ? `
            <div class="proj-bar-row">
              <span class="proj-bar-lbl">부족 ${gapMan}만원</span>
              <div class="proj-bar-track">
                <div class="proj-bar-fill proj-bar-gap" style="width:${gapPct}%"></div>
              </div>
            </div>
            `
                : ""
            }
          </div>

          <button class="btn-proj-link" id="adjustBtn">생활비 기준 다시 조정하기</button>
        </div>

        ${
          isShortfall
            ? `
        <!-- Gap causes section -->
        <div class="proj-section" id="causeSection">
          <p class="proj-section-title">왜 ${gapMan}만원이 부족할까요?</p>
          <div class="proj-cause-cards">
            <div class="proj-cause-card proj-cause-pension">
              <p class="proj-cause-name">연금 수입이 부족해요</p>
              <p class="proj-cause-desc">현재 입력한 국민연금, 퇴직연금, 개인연금 기준으로는 희망 생활비를 모두 충당하기 어려워요.</p>
              <p class="proj-cause-impact">부족 영향: -${penCause}만원/월</p>
              <button class="btn-proj-link">연금 수령액 늘리는 방법 보기</button>
            </div>
            <div class="proj-cause-card proj-cause-living">
              <p class="proj-cause-name">목표 생활비가 높게 설정돼 있어요</p>
              <p class="proj-cause-desc">은퇴 후 생활비 ${livingMan}만원 기준으로 계산하면 현재 수입 대비 추가 자금이 필요해요.</p>
              <p class="proj-cause-impact">부족 영향: -${livCause}만원/월</p>
              <button class="btn-proj-link" id="reduceLivingBtn">생활비 낮추어 다시 계산하기</button>
            </div>
            <div class="proj-cause-card proj-cause-medical">
              <p class="proj-cause-name">의료·보험비 부담이 있어요</p>
              <p class="proj-cause-desc">건강보험료와 실비·민영보험료가 은퇴 후 고정 지출에 반영됐어요.</p>
              <p class="proj-cause-impact">부족 영향: -${medCause}만원/월</p>
              <button class="btn-proj-link">의료·보험비 줄이는 방법 보기</button>
            </div>
          </div>
        </div>

        <!-- Adjustment simulations -->
        <div class="proj-section">
          <p class="proj-section-title">이렇게 조정하면 부족액이 줄어들어요</p>
          <div class="proj-sim-cards">
            <div class="proj-sim-card">
              <p class="proj-sim-if">생활비를 30만원 줄이면</p>
              <p class="proj-sim-result">부족액 ${gapMan}만원 → <strong>${sim1Gap}만원</strong></p>
              <button class="btn-proj-link">생활비 조정 시뮬레이션 보기</button>
            </div>
            <div class="proj-sim-card">
              <p class="proj-sim-if">연금 수입을 30만원 늘리면</p>
              <p class="proj-sim-result">부족액 ${gapMan}만원 → <strong>${sim2Gap}만원</strong></p>
              <button class="btn-proj-link">연금 추가 준비 방법 보기</button>
            </div>
            <div class="proj-sim-card">
              <p class="proj-sim-if">보험료를 10만원 줄이면</p>
              <p class="proj-sim-result">부족액 ${gapMan}만원 → <strong>${sim3Gap}만원</strong></p>
              <button class="btn-proj-link">고정지출 검토하기</button>
            </div>
          </div>
        </div>
        `
            : ""
        }

        <!-- Priority actions -->
        <div class="proj-section">
          <p class="proj-section-title">지금 우선 확인할 3가지</p>
          <div class="proj-action-list">
            <div class="proj-action-item">
              <p class="proj-action-title">IRP 추가 납입</p>
              <p class="proj-action-desc">세액공제 세후 현금흐름을 함께 고려해 추가 납입 효과를 확인해보세요.</p>
              <button class="btn-proj-link">IRP 추가 납입 효과 보기</button>
            </div>
            <div class="proj-action-item">
              <p class="proj-action-title">퇴직연금 수령 방식 검토</p>
              <p class="proj-action-desc">일시금, 연금 수령 방식에 따라 매달 받을 수 있는 금액이 달라져요.</p>
              <button class="btn-proj-link">퇴직연금 전략 보기</button>
            </div>
            <div class="proj-action-item">
              <p class="proj-action-title">보험료 재검토</p>
              <p class="proj-action-desc">은퇴 후에는 유지할 보험과 줄일 수 있는 보험을 구분해볼 필요가 있어요.</p>
              <button class="btn-proj-link">보험료 재검토하기</button>
            </div>
          </div>
        </div>

        <!-- Consultation section -->
        <div class="proj-section">
          <p class="proj-section-title">진단 결과를 바탕으로 상담받기</p>
          <p class="proj-section-desc">혼자 계산하기 어렵다면 현재 진단 결과를 기준으로 상담을 신청할 수 있어요.</p>
          <div class="proj-topic-chips">
            <span class="proj-topic-chip">${isShortfall ? "월 부족액 원인" : "월 여유액 활용"}</span>
            <span class="proj-topic-chip">연금 수령 전략</span>
            <span class="proj-topic-chip">생활비 조정 가능성</span>
            <span class="proj-topic-chip">보험료 및 고정 지출 검토</span>
          </div>
          <button class="btn-proj-consult" style="margin-top: 14px;">진단 결과 문서로 받기</button>
        </div>

        <!-- Action cards -->
        <div class="proj-cta-cards">
          <div class="proj-cta-card" id="saveCard">
            <p class="proj-cta-action-num">ACTION 01</p>
            <p class="proj-cta-action-title">결과 저장하기</p>
            <p class="proj-cta-action-desc">PDF 다운로드</p>
          </div>
          <div class="proj-cta-card proj-cta-card-dark" id="recalcCard">
            <p class="proj-cta-action-num">ACTION 02</p>
            <p class="proj-cta-action-title">다시 계산하기</p>
            <p class="proj-cta-action-desc">설정 수정하기</p>
          </div>
        </div>
      </div>
      </div>
    `;

    container.appendChild(el);

    el.querySelector("#backBtn").addEventListener("click", () => {
      moveTo({}, "medical-expense");
    });

    el.querySelector("#detailBtn")?.addEventListener("click", () => {
      el.querySelector("#causeSection")?.scrollIntoView({ behavior: "smooth" });
    });

    el.querySelector("#adjustBtn").addEventListener("click", () => {
      moveTo({}, "scenario");
    });

    el.querySelector("#reduceLivingBtn")?.addEventListener("click", () => {
      moveTo({}, "scenario");
    });

    el.querySelector("#saveCard").addEventListener("click", () => {
      moveTo({}, "summary");
    });

    el.querySelector("#recalcCard").addEventListener("click", () => {
      moveTo({}, "diagnosis-type");
    });
  }
}
