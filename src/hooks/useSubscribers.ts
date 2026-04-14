import { useQuery } from "@tanstack/react-query";
import { fetchSubscriptionsByPlanId } from "../api/plans";

export function useSubscribers(preApprovalPlanId: string) {
  return useQuery({
    queryKey: ["subscribers", preApprovalPlanId],
    queryFn: async () => {
      const response = await fetchSubscriptionsByPlanId(preApprovalPlanId);
      return response ?? [];
    },
    retry: false,
    staleTime: Infinity, // nunca considera stale
    gcTime: Infinity, // mantém em cache
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
