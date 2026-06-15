export class SummaryScreen {
  constructor(service) {
    this._service = service;
  }

  render(container, state, moveTo) {
    const svgLogo = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`;
    const svgSave = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`;
    const svgRefresh = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3"/></svg>`;

    const el = document.createElement("div");
    el.className = "screen summ-screen";
    el.innerHTML = `
      <header class="app-header">
        <div class="app-header-inner">
          <div class="app-logo">
            <div class="logo-icon-wrap">${svgLogo}</div>
            <span class="logo-text">은퇴현금 설계센터</span>
          </div>
          <button class="help-btn">도움말 →</button>
        </div>
      </header>

      <div class="summ-scroll">
        <div class="summ-hero-card">
          <div class="summ-hero-top">
            <span class="summ-done-badge">진단 완료</span>
            <h1 class="summ-hero-headline">안정적인 미래를 향한<br>첫걸음을 내딛었습니다.</h1>
          </div>
          <div class="summ-hero-body">
            <p class="summ-report-title">내 결과 리포트가 준비되어요</p>
            <p class="summ-report-hint">저장해서 비교해보고, 필요하면 다시 계산할 수 있어요.</p>
          </div>
        </div>

        <div class="summ-action-card">
          <p class="summ-action-label">ACTION 01</p>
          <div class="summ-action-row">
            <div class="summ-action-text">
              <p class="summ-action-title">결과 저장하기</p>
              <p class="summ-action-desc">진단 결과 리포트를 PDF로 안전하게 보관해요.</p>
            </div>
            <div class="summ-action-icon-box" aria-hidden="true">${svgSave}</div>
          </div>
          <button class="btn-summ-action" id="saveBtn">PDF 다운로드 →</button>
        </div>

        <div class="summ-action-card">
          <p class="summ-action-label">ACTION 02</p>
          <div class="summ-action-row">
            <div class="summ-action-text">
              <p class="summ-action-title">다시 계산하기</p>
              <p class="summ-action-desc">조건을 변경해서 새로운 퇴직 시나리오를 확인해요.</p>
            </div>
            <div class="summ-action-icon-box" aria-hidden="true">${svgRefresh}</div>
          </div>
          <button class="btn-summ-action" id="recalcBtn">설정 수정하기 →</button>
        </div>

        <div class="summ-consult">
          <h2 class="summ-consult-title">더 구체적인 계획이 필요하신가요?</h2>
          <p class="summ-consult-desc">전문가와 1:1로 내 결과를 바탕으로 부족 원인, 리스크, 준비 방법까지 함께 설계할 수 있어요.</p>
          <div class="summ-consult-btns">
            <button class="btn-summ-primary">온라인 상담 받기 →</button>
            <button class="btn-summ-secondary">가까이 직접 찾기 →</button>
          </div>
        </div>
      </div>

      <div class="toast" id="saveToast" role="status" aria-live="polite" aria-atomic="true" hidden>
        결과가 저장되었습니다
      </div>
    `;

    container.appendChild(el);

    el.querySelector("#saveBtn").addEventListener("click", () => {
      this._service.savePlan(state);
      this._showToast(el.querySelector("#saveToast"));
    });

    el.querySelector("#recalcBtn").addEventListener("click", () => {
      moveTo({}, "diagnosis-type");
    });
  }

  _showToast(toastEl) {
    toastEl.removeAttribute("hidden");
    toastEl.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: #111827;
      color: #fff;
      padding: 12px 24px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 600;
      z-index: 300;
      white-space: nowrap;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;
    setTimeout(() => {
      toastEl.style.opacity = "0";
      toastEl.style.transition = "opacity 0.3s";
      setTimeout(() => toastEl.setAttribute("hidden", ""), 300);
    }, 2200);
  }
}
