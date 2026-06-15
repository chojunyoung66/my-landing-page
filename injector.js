import { RetirementService } from "./service/retirement-service.js";
import { PlanRepo } from "./repo/memory/plan-repo.js";
import { RootScreen } from "./ui/browser/root-screen.js";
import { WelcomeScreen } from "./ui/browser/welcome-screen.js";
import { DiagnosisTypeScreen } from "./ui/browser/diagnosis-type-screen.js";
import { ProfileScreen } from "./ui/browser/profile-screen.js";
import { CashflowInputScreen } from "./ui/browser/cashflow-input-screen.js";
import { ScenarioScreen } from "./ui/browser/scenario-screen.js";
import { MedicalExpenseScreen } from "./ui/browser/medical-expense-screen.js";
import { ProjectionScreen } from "./ui/browser/projection-screen.js";
import { SummaryScreen } from "./ui/browser/summary-screen.js";

export class Injector {
  inject() {
    const planRepo = new PlanRepo();
    const service = new RetirementService(planRepo);

    const screens = {
      welcome: new WelcomeScreen(service),
      "diagnosis-type": new DiagnosisTypeScreen(service),
      profile: new ProfileScreen(service),
      cashflow: new CashflowInputScreen(service),
      scenario: new ScenarioScreen(service),
      "medical-expense": new MedicalExpenseScreen(service),
      projection: new ProjectionScreen(service),
      summary: new SummaryScreen(service),
    };

    return new RootScreen(screens);
  }
}
