import { RegisterOptions, Path } from "react-hook-form";
import { Plan } from "../types/PlanTypes";

type PlanSchema = Partial<Record<Path<Plan>, RegisterOptions<Plan>>>;

export const createPlanSchema: PlanSchema = {
  reason: {
    required: "Nome do plano é obrigatório",
  },
  back_url: {
    required: "URL de redirecionamento é obrigatória",
    pattern: {
      value: /^https?:\/\/.+/,
      message: "URL inválida — deve começar com http:// ou https://",
    },
  },
  "auto_recurring.transaction_amount": {
    valueAsNumber: true,
    required: "Preço é obrigatório",
  },
  "auto_recurring.frequency": {
    valueAsNumber: true,
  },
  "auto_recurring.frequency_type": {},
  "auto_recurring.repetitions": {
    valueAsNumber: true,
  },
  "auto_recurring.free_trial.frequency": {},
  "auto_recurring.free_trial.frequency_type": {},
};