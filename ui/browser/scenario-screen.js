export class ScenarioScreen {
  constructor(service) {
    this._service = service;
  }

  render(container, state, moveTo) {
    const guide = this._service.getLivingExpenseGuide({
      diagnosisType: state.diagnosisType,
      householdSize: state.householdSize,
    });
    const minMan = Math.round(guide.minimum / 10000);
    const recMan = Math.round(guide.recommended / 10000);
    const savedDesired = state.livingExpense?.desiredMonthly ?? 0;
    const initVal = savedDesired ? Math.round(savedDesired / 10000) : "";

    const expenseChips = [
      "식비",
      "주거비",
      "통신비",
      "교통비",
      "의료비",
      "여가비",
      "보험료",
      "가족지원비",
    ];

    const calcRangeText = (val) => {
      const diffMin = val - minMan;
      const diffRec = recMan - val;
      if (diffMin < 0)
        return `입력하신 금액은 최소 생활비보다 ${Math.abs(diffMin)}만원 낮아요.`;
      if (diffRec > 0)
        return `입력하신 금액은 최소 생활비보다 ${diffMin}만원 높고, 적정 생활비보다 ${diffRec}만원 낮아요.`;
      if (diffRec === 0) return `입력하신 금액이 적정 생활비와 같아요.`;
      return `입력하신 금액은 적정 생활비보다 ${Math.abs(diffRec)}만원 높아요.`;
    };

    const calcRangePercent = (val) => {
      if (val <= minMan) return 0;
      if (val >= recMan) return 100;
      return Math.round(((val - minMan) / (recMan - minMan)) * 100);
    };

    const el = document.createElement("div");
    el.className = "screen welcome-screen";
    el.innerHTML = `
      <header class="app-header">
        <div class="app-header-inner">
          <div class="app-header-left">
            <button class="btn-back" id="backBtn" aria-label="이전으로">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
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

      <div class="progress-section">
        <div class="progress-section-top">
          <span class="progress-section-label">진단 진행률</span>
          <span class="progress-section-pct">70%</span>
        </div>
        <div class="progress-track" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" aria-label="진단 진행률 70%">
          <div class="progress-fill" style="width: 70%"></div>
        </div>
      </div>

      <div class="screen-scroll">
      <div class="inner-content">
        <h1 class="screen-title">은퇴 후 목표 생활비를<br>선택해 주세요</h1>
        <p class="screen-desc">입력한 생활비를 기준으로 매달 부족하거나 남는 금액을 계산해요.</p>

        <div class="form-group">
          <label class="form-label" for="desiredInput">희망 월 생활비</label>
          <div class="input-row">
            <input
              type="number"
              class="form-input has-suffix has-long-suffix"
              id="desiredInput"
              value="${initVal}"
              placeholder="250"
              min="0"
              max="9999"
              inputmode="numeric"
              aria-required="true"
              aria-describedby="desiredHint desiredError"
            />
            <span class="input-suffix">만원 / 월</span>
          </div>
          <p class="form-hint" id="desiredHint">부부 기준인지 개인 기준인지에 따라 필요 생활비가 달라질 수 있어요.</p>
          <p class="form-error" id="desiredError" aria-live="polite" style="display:none">희망 월 생활비를 입력해 주세요</p>
        </div>

        <div class="range-info-box" id="rangeInfoBox" style="display:none">
          <p class="range-info-text" id="rangeInfoText"></p>
          <div class="range-bar-wrap">
            <span class="range-bar-label">최소 ${minMan}</span>
            <div class="range-bar-track">
              <div class="range-bar-dot" id="rangeBarDot" style="left: 0%"></div>
            </div>
            <span class="range-bar-label">적정 ${recMan}</span>
          </div>
        </div>

        <div class="ref-cards">
          <div class="ref-card">
            <p class="ref-card-tag">최소 생활비</p>
            <p class="ref-card-amount">${minMan.toLocaleString()}만원/월</p>
            <p class="ref-card-desc">기본 생활 유지 금액</p>
          </div>
          <div class="ref-card">
            <p class="ref-card-tag">적정 생활비</p>
            <p class="ref-card-amount">${recMan.toLocaleString()}만원/월</p>
            <p class="ref-card-desc">여가·의료 포함 금액</p>
          </div>
        </div>

        <div class="expense-chips-box">
          <p class="expense-chips-title">생활비에 포함하면 좋은 항목</p>
          <div class="expense-chips">
            ${expenseChips.map((c) => `<span class="expense-chip">${c}</span>`).join("")}
          </div>
        </div>

        <div class="form-note-box">
          <p class="form-note">은퇴 후에는 교육비나 대출 상환금은 줄 수 있지만, 의료비와 여가 비용은 높아질 수 있어요.</p>
        </div>
      </div>
      </div>

      <div class="cta-bar">
        <button class="btn-cta" id="nextBtn">이 금액으로 계산하기</button>
      </div>
    `;

    container.appendChild(el);

    const desiredInput = el.querySelector("#desiredInput");
    const desiredError = el.querySelector("#desiredError");
    const rangeInfoBox = el.querySelector("#rangeInfoBox");
    const rangeInfoText = el.querySelector("#rangeInfoText");
    const rangeBarDot = el.querySelector("#rangeBarDot");

    const updateRangeInfo = (val) => {
      const num = Number(val);
      if (!val || num <= 0) {
        rangeInfoBox.style.display = "none";
        return;
      }
      rangeInfoBox.style.display = "block";
      rangeInfoText.textContent = calcRangeText(num);
      rangeBarDot.style.left = `${calcRangePercent(num)}%`;
    };

    if (initVal) updateRangeInfo(initVal);

    desiredInput.addEventListener("input", (e) => {
      desiredError.style.display = "none";
      updateRangeInfo(e.target.value);
    });

    el.querySelector("#backBtn").addEventListener("click", () => {
      moveTo({}, "cashflow");
    });

    el.querySelector("#nextBtn").addEventListener("click", () => {
      const rawVal = desiredInput.value;
      if (!rawVal || Number(rawVal) <= 0) {
        desiredError.style.display = "block";
        desiredInput.focus();
        return;
      }
      moveTo(
        {
          livingExpense: {
            desiredMonthly: Math.round(Number(rawVal) * 10000),
            guideMinimum: guide.minimum,
            guideRecommended: guide.recommended,
          },
        },
        "medical-expense",
      );
    });
  }
}
