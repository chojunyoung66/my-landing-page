export class CashflowInputScreen {
  constructor(service) {
    this._service = service;
  }

  render(container, state, moveTo) {
    const pension = state.pension ?? {
      national: 0,
      retirement: 0,
      personal: 0,
    };
    const toMan = (won) => (won ? Math.round(won / 10000) : "");

    const fields = [
      {
        id: "national",
        label: "국민연금",
        hint: "내 정보가 기억되지 않으면 대략적인 금액도 괜찮아요",
        placeholder: "90",
        required: true,
      },
      {
        id: "retirement",
        label: "퇴직연금",
        hint: "DC/IRP를 합산한 월 수령액",
        placeholder: "65",
        required: false,
      },
      {
        id: "personal",
        label: "개인연금",
        hint: "연금저축과 추가 연금보험 합산",
        placeholder: "32",
        required: false,
      },
    ];

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
          <span class="progress-section-pct">40%</span>
        </div>
        <div class="progress-track" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" aria-label="진단 진행률 40%">
          <div class="progress-fill" style="width: 40%"></div>
        </div>
      </div>

      <div class="screen-scroll">
      <div class="inner-content">
        <h1 class="screen-title">예상 연금 수령액을<br>입력해 주세요</h1>
        <p class="screen-desc">보유 현황 연금에서 매달 받게 될 금액을 입력하면 더 정확한 은퇴 현금흐름을 계산할 수 있어요.</p>

        <p class="form-section-label">연 수령액 입력</p>

        ${fields
          .map(
            (f) => `
          <div class="form-group">
            <label class="form-label" for="input-${f.id}">${f.label}</label>
            <div class="input-row">
              <input
                type="number"
                class="form-input has-suffix"
                id="input-${f.id}"
                value="${toMan(pension[f.id])}"
                placeholder="${f.placeholder}"
                min="0"
                max="9999"
                inputmode="numeric"
                aria-required="${f.required}"
                aria-describedby="hint-${f.id}${f.required ? ` error-${f.id}` : ""}"
              />
              <span class="input-suffix">만원 / 월</span>
            </div>
            <p class="form-hint" id="hint-${f.id}">${f.hint}</p>
            ${f.required ? `<p class="form-error" id="error-${f.id}" aria-live="polite" style="display:none">국민연금 수령액을 입력해 주세요</p>` : ""}
          </div>
        `,
          )
          .join("")}

        <div class="form-note-box">
          <p class="form-note">입력한 금액은 현금흐름 계산에만 사용되며 진단 후 언제든 다시 수정할 수 있어요.</p>
        </div>
      </div>
      </div>

      <div class="cta-bar">
        <button class="btn-cta" id="nextBtn">다 입력했어요</button>
      </div>
    `;

    container.appendChild(el);

    const values = {
      national: toMan(pension.national) || 0,
      retirement: toMan(pension.retirement) || 0,
      personal: toMan(pension.personal) || 0,
    };

    fields.forEach((f) => {
      el.querySelector(`#input-${f.id}`).addEventListener("input", (e) => {
        values[f.id] = e.target.value;
        if (f.required) {
          el.querySelector(`#error-${f.id}`).style.display = "none";
        }
      });
    });

    el.querySelector("#backBtn").addEventListener("click", () => {
      moveTo({}, "profile");
    });

    el.querySelector("#nextBtn").addEventListener("click", () => {
      const nationalInput = el.querySelector("#input-national");
      if (!values.national || values.national <= 0) {
        el.querySelector("#error-national").style.display = "block";
        nationalInput.focus();
        return;
      }
      moveTo(
        {
          pension: {
            national: Math.round((Number(values.national) || 0) * 10000),
            retirement: Math.round((Number(values.retirement) || 0) * 10000),
            personal: Math.round((Number(values.personal) || 0) * 10000),
          },
        },
        "scenario",
      );
    });
  }
}
