import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plan } from "../types/PlanTypes";
import { createPreApprovalPlan } from "../api/PreApproval";
import { createPlanSchema } from "../schemas/createPlanSchema";


export function useCreatePlan() {
  const [showFreeTrial, setShowFreeTrial] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Plan>();

  async function onSubmit(data: Plan) {
    if (!showFreeTrial) data.auto_recurring.free_trial = undefined;
    await createPreApprovalPlan?.(data);
    window.location.reload();
  }

  return {
    register,
    errors,
    showFreeTrial,
    setShowFreeTrial,
    onSubmit: handleSubmit(onSubmit),
  };
}
