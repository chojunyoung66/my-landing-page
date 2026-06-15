export class RetirementService {
  constructor(planRepo) {
    this._planRepo = planRepo;
  }

  getWelcomeMetrics() {
    return {
      avgMonthlyPension: 1030000,
      recommendedMonthlyExpense: 1770000,
      monthlyGap: 740000,
    };
  }

  getLivingExpenseGuide({ diagnosisType, householdSize }) {
    if (diagnosisType === "couple") {
      const table = {
        1: { minimum: 1160000, recommended: 1660000 },
        2: { minimum: 1750000, recommended: 2500000 },
        3: { minimum: 2550000, recommended: 3640000 },
        4: { minimum: 3330000, recommended: 4760000 },
        5: { minimum: 3540000, recommended: 5050000 },
      };
      return table[householdSize] ?? table[2];
    }
    return { minimum: 1240000, recommended: 1770000 };
  }

  calculateProjection(state) {
    const totalMonthlyIncome =
      (state.pension?.national ?? 0) +
      (state.pension?.retirement ?? 0) +
      (state.pension?.personal ?? 0);

    const totalMonthlyExpense =
      (state.livingExpense?.desiredMonthly ?? 0) +
      (state.medicalExpense?.healthInsurance ?? 0) +
      (state.medicalExpense?.privateInsurance ?? 0);

    const monthlyGap = totalMonthlyIncome - totalMonthlyExpense;

    return {
      monthlyIncome: totalMonthlyIncome,
      monthlyExpense: totalMonthlyExpense,
      monthlyGap,
      gapReasons: monthlyGap < 0 ? this._analyzeGap(state) : [],
    };
  }

  _analyzeGap(state) {
    const reasons = [];
    if ((state.pension?.national ?? 0) < 500000)
      reasons.push("국민연금 수령액이 낮습니다");
    if ((state.pension?.retirement ?? 0) === 0)
      reasons.push("퇴직연금이 없습니다");
    if ((state.pension?.personal ?? 0) === 0)
      reasons.push("개인연금이 없습니다");
    return reasons;
  }

  loadPlan() {
    return this._planRepo.load();
  }

  savePlan(state) {
    return this._planRepo.save(state);
  }
}
