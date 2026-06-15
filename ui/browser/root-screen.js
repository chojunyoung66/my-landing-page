export class RootScreen {
  constructor(screens) {
    this._screens = screens;
    this._state = {
      currentScreen: "welcome",
      diagnosisType: "individual",
      birthYear: null,
      incomeStatus: "",
      pension: { national: 0, retirement: 0, personal: 0 },
      livingExpense: {
        desiredMonthly: 0,
        guideMinimum: 0,
        guideRecommended: 0,
      },
      medicalExpense: { healthInsurance: 0, privateInsurance: 0 },
      projection: null,
    };
    this._container = document.getElementById("app");
  }

  run() {
    this._showScreen(this._state.currentScreen);
  }

  _showScreen(screenName) {
    this._state.currentScreen = screenName;
    this._container.innerHTML = "";
    window.scrollTo(0, 0);

    const screen = this._screens[screenName];
    if (!screen) {
      this._container.innerHTML = `<p style="padding:40px;color:#666">준비 중인 화면입니다: ${screenName}</p>`;
      return;
    }

    screen.render(
      this._container,
      this._state,
      (nextPartialState, nextScreen) => {
        this._state = { ...this._state, ...nextPartialState };
        this._showScreen(nextScreen);
      },
    );
  }
}
