import { useState } from "react";
import { useForm } from "react-hook-form";
import { createPlan } from "../api/plans";
import { zodResolver } from "@hookform/resolvers/zod";
import { planSchema } from "../schemas/planSchema";
import { z } from "zod";

type Plan = z.infer<typeof planSchema>;
export function useCreatePlan() {
  const [showFreeTrial, setShowFreeTrial] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Plan>({ resolver: zodResolver(planSchema) });

  async function onSubmit(data: Plan) {
    console.log(data);
    if (!showFreeTrial || !data.auto_recurring.free_trial?.frequency) data.auto_recurring.free_trial = undefined;
    await createPlan?.(data);
    window.location.reload();
  }

  return {
    register,
    errors,
    showFreeTrial,
    setShowFreeTrial: setShowFreeTrial,
    onSubmit: handleSubmit(onSubmit),
  };
}
