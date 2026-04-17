import { useState } from "react";
import { useForm } from "react-hook-form";
import { createPlan, fetchPlans, updatePlanById } from "../api/plans";
import { zodResolver } from "@hookform/resolvers/zod";
import { planSchema } from "../schemas/planSchema";
import { z } from "zod";
import { PreApprovalPlanResponse } from "mercadopago/dist/clients/preApprovalPlan/commonTypes";
import { useQuery } from "@tanstack/react-query";

type Plan = z.infer<typeof planSchema>;
export function useCreatePlan() {
  const [showFreeTrial, setShowFreeTrial] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting}
    ,
  } = useForm<Plan>({ resolver: zodResolver(planSchema), defaultValues: { auto_recurring: { frequency: 1 } } });

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
    isSubmitting,
    setShowFreeTrial: setShowFreeTrial,
    onSubmit: handleSubmit(onSubmit),
  };
}

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const response = await fetchPlans();
      return response.Items ?? [];
    },
    retry: false,
    staleTime: Infinity, // nunca considera stale
    gcTime: Infinity, // mantém em cache
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

export function useUpdatePlan(plan: PreApprovalPlanResponse) {
  const isFreeTrial = !!plan?.auto_recurring?.free_trial?.frequency;
  const [showFreeTrial, setShowFreeTrial] = useState<boolean>(isFreeTrial);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PreApprovalPlanResponse>({ resolver: zodResolver(planSchema), defaultValues: plan });

  async function onSubmit(data: PreApprovalPlanResponse) {
    console.log(data);
    if (!showFreeTrial || !data.auto_recurring!.free_trial?.frequency)
      data.auto_recurring.free_trial = undefined;

    await updatePlanById?.(data.id!, data);
    window.location.reload();
  }

  return {
    register,
    errors,
    showFreeTrial,
    isSubmitting,
    setShowFreeTrial: setShowFreeTrial,
    onSubmit: handleSubmit(onSubmit),
  };
}
