export class ProfileScreen {
  constructor(service) {
    this._service = service;
  }

  render(container, state, moveTo) {
    let birthYear = state.birthYear ?? "";
    let incomeStatus = state.incomeStatus ?? "";
    const isCouple = state.diagnosisType === "couple";
    let selectedHousehold = state.householdSize ?? 2;

    const currentYear = 2026;

    const incomeOptions = [
      {
        value: "employed",
        icon: "💼",
        label: "직장인",
        desc: "직장인 · 매월 정기적인 급여",
      },
      {
        value: "self-employed",
        icon: "🏪",
        label: "자영업/프리랜서가 있어요",
        desc: "소득이 달라짐",
      },
      {
        value: "no-income",
        icon: "🌿",
        label: "현재 근로소득이 없어요",
        desc: "은퇴, 휴직, 무직 등",
      },
    ];

    const calcAgeHelper = (year) => {
      if (!year) return "";
      const age = currentYear - year;
      const yearsLeft = 65 - age;
      if (yearsLeft > 0)
        return `만 ${age}세 · 은퇴 준비 기간 약 ${yearsLeft}년`;
      if (yearsLeft === 0) return `만 ${age}세 · 올해 은퇴`;
      return `만 ${age}세 · 은퇴 후 ${-yearsLeft}년째`;
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
          <span class="progress-section-pct">30%</span>
        </div>
        <div class="progress-track" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" aria-label="진단 진행률 30%">
          <div class="progress-fill" style="width: 30%"></div>
        </div>
      </div>

      <div class="screen-scroll">
      <div class="inner-content">
        <h1 class="screen-title">현재 상황을 알려주세요</h1>
        <p class="screen-desc">출생연도와 현재 소득 상태를 기준으로 은퇴 시점, 연금 수령 시기, 부족 시기를 계산해요.</p>

        <div class="form-group">
          <label class="form-label" for="birthYearInput">태어난 해</label>
          <div class="input-row">
            <input class="form-input" id="birthYearInput" type="number" min="1940" max="2010"
              placeholder="1968" value="${birthYear}" inputmode="numeric" aria-required="true" />
            <span class="input-suffix">년</span>
          </div>
          <p class="form-hint" id="birthYearHint">${calcAgeHelper(birthYear) || "예: 만 58세 · 은퇴 준비 기간 약 7년"}</p>
          <p class="form-error" id="birthYearError" aria-live="polite" style="display:none">출생연도를 입력해 주세요</p>
        </div>

        <div class="form-group" role="group" aria-labelledby="incomeStatusLabel">
          <span class="form-label" id="incomeStatusLabel">현재 소득 상태</span>
          <div class="option-group" style="margin-top: 4px;">
            ${incomeOptions
              .map(
                (opt) => `
              <label class="option-card ${incomeStatus === opt.value ? "selected" : ""}" tabindex="0">
                <input type="radio" name="incomeStatus" value="${opt.value}" ${incomeStatus === opt.value ? "checked" : ""} />
                <span class="option-icon" aria-hidden="true">${opt.icon}</span>
                <div class="option-text">
                  <strong>${opt.label}</strong>
                  <span>${opt.desc}</span>
                </div>
                <span class="option-check" aria-hidden="true">✓</span>
              </label>
            `,
              )
              .join("")}
          </div>
          <p class="form-error" id="incomeStatusError" aria-live="polite" style="display:none">소득 상태를 선택해 주세요</p>
        </div>

        <div class="form-group" style="margin-top: 8px;">
          <label class="form-label${isCouple ? "" : " form-label-disabled"}">은퇴 시 가구원 수</label>
          <p class="form-hint">${isCouple ? "가구원 수에 따라 적정 생활비 기준이 달라져요." : "부부 기준을 선택하면 입력할 수 있어요."}</p>
          <div class="household-chips" role="group" aria-label="가구원 수 선택">
            ${[1, 2, 3, 4, 5]
              .map(
                (n) => `
              <button type="button"
                class="household-chip ${isCouple && selectedHousehold === n ? "selected" : ""}"
                data-size="${n}"
                ${isCouple ? "" : "disabled"}
                aria-pressed="${isCouple && selectedHousehold === n}"
              >${n}인</button>
            `,
              )
              .join("")}
          </div>
        </div>

        <div class="form-note-box">
          <p class="form-note">입력한 정보는 진단 계산에만 사용되며 언제든 수정할 수 있습니다.</p>
        </div>
      </div>
      </div>

      <div class="cta-bar">
        <button class="btn-cta" id="nextBtn">다음: 연금 정보 확인</button>
      </div>
    `;

    container.appendChild(el);

    const birthYearInput = el.querySelector("#birthYearInput");
    const birthYearHint = el.querySelector("#birthYearHint");
    const birthYearError = el.querySelector("#birthYearError");
    const incomeStatusError = el.querySelector("#incomeStatusError");

    birthYearInput.addEventListener("input", (e) => {
      const y = parseInt(e.target.value, 10);
      birthYear = e.target.value ? y : "";
      birthYearError.style.display = "none";
      birthYearHint.textContent =
        calcAgeHelper(y) || "예: 만 58세 · 은퇴 준비 기간 약 7년";
    });

    el.querySelectorAll("input[name='incomeStatus']").forEach((radio) => {
      radio.addEventListener("change", (e) => {
        incomeStatus = e.target.value;
        el.querySelectorAll(".option-card").forEach((c) =>
          c.classList.remove("selected"),
        );
        e.target.closest(".option-card").classList.add("selected");
        incomeStatusError.style.display = "none";
      });
    });

    el.querySelectorAll(".option-card").forEach((card) => {
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.querySelector("input").click();
        }
      });
    });

    if (isCouple) {
      el.querySelectorAll(".household-chip").forEach((btn) => {
        btn.addEventListener("click", () => {
          selectedHousehold = Number(btn.dataset.size);
          el.querySelectorAll(".household-chip").forEach((b) => {
            const active = Number(b.dataset.size) === selectedHousehold;
            b.classList.toggle("selected", active);
            b.setAttribute("aria-pressed", String(active));
          });
        });
      });
    }

    el.querySelector("#backBtn").addEventListener("click", () => {
      moveTo({}, "diagnosis-type");
    });

    el.querySelector("#nextBtn").addEventListener("click", () => {
      let valid = true;
      const y = parseInt(birthYearInput.value, 10);
      if (!y || y < 1940 || y > 2010) {
        birthYearError.style.display = "block";
        valid = false;
      } else {
        birthYear = y;
      }
      if (!incomeStatus) {
        incomeStatusError.style.display = "block";
        valid = false;
      }
      if (!valid) return;
      moveTo(
        {
          birthYear,
          incomeStatus,
          ...(isCouple ? { householdSize: selectedHousehold } : {}),
        },
        "cashflow",
      );
    });
  }
}
