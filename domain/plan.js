export class Plan {
  constructor({
    diagnosisType = "individual",
    birthYear = null,
    incomeStatus = "",
    pension = { national: 0, retirement: 0, personal: 0 },
    livingExpense = { desiredMonthly: 0, guideMinimum: 0, guideRecommended: 0 },
    medicalExpense = { healthInsurance: 0, privateInsurance: 0 },
    projection = null,
  } = {}) {
    this.diagnosisType = diagnosisType;
    this.birthYear = birthYear;
    this.incomeStatus = incomeStatus;
    this.pension = pension;
    this.livingExpense = livingExpense;
    this.medicalExpense = medicalExpense;
    this.projection = projection;
  }
}
