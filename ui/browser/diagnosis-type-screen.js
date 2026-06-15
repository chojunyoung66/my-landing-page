export class DiagnosisTypeScreen {
  constructor(service) {
    this._service = service;
  }

  render(container, state, moveTo) {
    let selectedType = state.diagnosisType ?? "individual";

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
          <button class="help-btn" id="helpBtn" aria-label="도움말">도움말 ⓘ</button>
        </div>
      </header>

      <div class="progress-section">
        <div class="progress-section-top">
          <span class="progress-section-label">진단 진행률</span>
          <span class="progress-section-pct">10%</span>
        </div>
        <div class="progress-track" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" aria-label="진단 진행률 10%">
          <div class="progress-fill" style="width: 10%"></div>
        </div>
      </div>

      <div class="screen-scroll">
        <div class="inner-content">
          <h1 class="screen-title">어떤 기준으로<br>진단할까요?</h1>
          <p class="screen-desc">혼자 준비하는 은퇴인지, 배우자와 함께하는 은퇴인지에 따라 필요한 생활비와 연금 분석 방식이 달라져요.</p>

          <div class="diag-options" role="radiogroup" aria-label="진단 기준 선택">

            <!-- 개인 기준 카드 -->
            <div class="diag-option-card ${selectedType === "individual" ? "selected" : ""}" id="card-individual" role="radio" aria-checked="${selectedType === "individual"}" tabindex="0" data-value="individual">
              <div class="diag-card-body">
              <div class="diag-card-top">
                <div class="diag-icon-box ${selectedType === "individual" ? "blue" : "gray"}" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div class="diag-card-text">
                  <div class="diag-card-title">개인 기준으로 진단하기</div>
                  <div class="diag-card-desc">본인 혼자 기준의 연금 수령과 생활비를 분석합니다</div>
                </div>
                <div class="diag-card-radio" aria-hidden="true">
                  <div class="diag-card-radio-dot"></div>
                </div>
              </div>
              </div><!-- /diag-card-body -->
              <ul class="recommend-list" aria-label="개인 기준 추천 상황">
                <li class="recommend-item">
                  <span class="recommend-dot" aria-hidden="true"></span>
                  <span class="recommend-label">미혼 또는 배우자 없이 독립 준비 중</span>
                </li>
                <li class="recommend-item">
                  <span class="recommend-dot" aria-hidden="true"></span>
                  <span class="recommend-label">배우자의 연금을 별도로 분석하고 싶은 경우</span>
                </li>
                <li class="recommend-item">
                  <span class="recommend-dot" aria-hidden="true"></span>
                  <span class="recommend-label">개인 자산 중심의 은퇴 계획을 세우는 경우</span>
                </li>
              </ul>
              <div class="selected-badge" aria-hidden="true">선택됨</div>
            </div>

            <!-- 부부 기준 카드 -->
            <div class="diag-option-card ${selectedType === "couple" ? "selected" : ""}" id="card-couple" role="radio" aria-checked="${selectedType === "couple"}" tabindex="0" data-value="couple">
              <div class="diag-card-body">
              <div class="diag-card-top">
                <div class="diag-icon-box ${selectedType === "couple" ? "blue" : "gray"}" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div class="diag-card-text">
                  <div class="diag-card-title">부부 기준으로 진단하기</div>
                  <div class="diag-card-desc">배우자 포함 두 사람의 연금과 생활비를 함께 분석합니다</div>
                </div>
                <div class="diag-card-radio" aria-hidden="true">
                  <div class="diag-card-radio-dot"></div>
                </div>
              </div>
              </div><!-- /diag-card-body -->
              <ul class="recommend-list" aria-label="부부 기준 추천 상황">
                <li class="recommend-item">
                  <span class="recommend-dot" aria-hidden="true"></span>
                  <span class="recommend-label">배우자와 함께 은퇴를 계획하는 경우</span>
                </li>
                <li class="recommend-item">
                  <span class="recommend-dot" aria-hidden="true"></span>
                  <span class="recommend-label">두 사람의 연금 합산 현금흐름이 궁금한 경우</span>
                </li>
                <li class="recommend-item">
                  <span class="recommend-dot" aria-hidden="true"></span>
                  <span class="recommend-label">가구 단위로 생활비를 관리하는 경우</span>
                </li>
              </ul>
              <div class="selected-badge" aria-hidden="true">선택됨</div>
            </div>
          </div>

          <div class="diag-info-box" role="note">
            <span class="diag-info-icon" aria-hidden="true">ℹ️</span>
            <p class="diag-info-text">선택한 기준은 진단 중 언제든 다시 수정할 수 있어요. 지금 선택한 기준으로 생활비 가이드와 연금 분석이 맞춤 제공됩니다.</p>
          </div>
        </div>
      </div>

      <div class="cta-bar">
        <button class="btn-cta" id="nextBtn">개인 기준으로 다음</button>
      </div>
    `;

    container.appendChild(el);

    const nextBtn = el.querySelector("#nextBtn");

    const updateSelection = (value) => {
      selectedType = value;

      el.querySelectorAll(".diag-option-card").forEach((card) => {
        const isSelected = card.dataset.value === value;
        card.classList.toggle("selected", isSelected);
        card.setAttribute("aria-checked", String(isSelected));

        const iconBox = card.querySelector(".diag-icon-box");
        iconBox.className = `diag-icon-box ${isSelected ? "blue" : "gray"}`;
      });

      const label = value === "couple" ? "부부" : "개인";
      nextBtn.textContent = `${label} 기준으로 다음`;
    };

    el.querySelectorAll(".diag-option-card").forEach((card) => {
      card.addEventListener("click", () => updateSelection(card.dataset.value));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          updateSelection(card.dataset.value);
        }
      });
    });

    el.querySelector("#helpBtn").addEventListener("click", () => {
      alert(
        "진단 기준 선택 안내:\n\n• 개인 기준: 본인의 연금과 생활비만으로 분석합니다.\n• 부부 기준: 배우자의 연금도 합산하여 가구 단위로 분석합니다.\n\n진단 중 언제든 변경할 수 있습니다.",
      );
    });

    nextBtn.addEventListener("click", () => {
      moveTo({ diagnosisType: selectedType }, "profile");
    });
  }
}
