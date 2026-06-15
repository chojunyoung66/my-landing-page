import { Plan } from "../../domain/plan.js";

export class PlanRepo {
  constructor() {
    this._plan = null;
  }

  save(planData) {
    this._plan = new Plan(planData);
    return this._plan;
  }

  load() {
    return this._plan;
  }
}
