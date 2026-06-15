export class MedicalExpenseScreen {
  constructor(service) {
    this._service = service;
  }

  render(container, state, moveTo) {
    const medical = state.medicalExpense ?? {
      healthInsurance: 0,
      privateInsurance: 0,
    };
    const toMan = (won) => (won ? Math.round(won / 10000) : "");

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
          <span class="progress-section-pct">86%</span>
        </div>
        <div class="progress-track" role="progressbar" aria-valuenow="86" aria-valuemin="0" aria-valuemax="100" aria-label="진단 진행률 86%">
          <div class="progress-fill" style="width: 86%"></div>
        </div>
      </div>

      <div class="screen-scroll">
      <div class="inner-content">
        <h1 class="screen-title">은퇴 후 매달 나가는<br>의료·보험비를 입력해 주세요</h1>
        <p class="screen-desc">건강보험료와 실비보험료는 은퇴 후 고정 지출 계산에 반영돼요. 정확하지 않으면 대략 입력할 수 있어요.</p>

        <div class="form-group">
          <label class="form-label" for="healthInput">내 건강보험료</label>
          <div class="input-row">
            <input
              type="number"
              class="form-input has-suffix has-long-suffix"
              id="healthInput"
              value="${toMan(medical.healthInsurance)}"
              placeholder="18"
              min="0"
              max="9999"
              inputmode="numeric"
              aria-describedby="healthHint"
            />
            <span class="input-suffix">만원 / 월</span>
          </div>
          <p class="form-hint" id="healthHint">국민건강보험료와 장기요양보험료를 합산해 입력해 주세요.</p>
        </div>

        <div class="form-group">
          <label class="form-label" for="privateInput">내 실비·민영보험료</label>
          <div class="input-row">
            <input
              type="number"
              class="form-input has-suffix has-long-suffix"
              id="privateInput"
              value="${toMan(medical.privateInsurance)}"
              placeholder="12"
              min="0"
              max="9999"
              inputmode="numeric"
              aria-describedby="privateHint"
            />
            <span class="input-suffix">만원 / 월</span>
          </div>
          <p class="form-hint" id="privateHint">실비보험, 암보험, 질병보험 등 매달 납부하는 보험료를 합산해요.</p>
        </div>

        <div class="form-note-box-amber">
          <p class="form-note-amber-title">참고</p>
          <p class="form-note-amber">은퇴 후에는 의료비와 보험료가 생활비에서 큰 비중을 차지할 수 있어요. 모르면 현재 납부액 기준으로 입력해도 괜찮아요.</p>
        </div>
      </div>
      </div>

      <div class="cta-bar">
        <button class="btn-cta" id="nextBtn">이 금액으로 반영하기</button>
      </div>
    `;

    container.appendChild(el);

    el.querySelector("#backBtn").addEventListener("click", () => {
      moveTo({}, "scenario");
    });

    el.querySelector("#nextBtn").addEventListener("click", () => {
      const healthVal = el.querySelector("#healthInput").value;
      const privateVal = el.querySelector("#privateInput").value;
      moveTo(
        {
          medicalExpense: {
            healthInsurance: Math.round((Number(healthVal) || 0) * 10000),
            privateInsurance: Math.round((Number(privateVal) || 0) * 10000),
          },
        },
        "projection",
      );
    });
  }
}
