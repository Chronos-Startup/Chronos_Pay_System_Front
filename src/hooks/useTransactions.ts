import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { fetchTransactionsWithPagination } from "../api/fetchTransactions";
import { toast } from "sonner";
import { fetchPlans } from "../api/PreApproval";

interface UseTransactionsProps {
  page: number;
  pageSize?: number;
  filters?: object;
}

export function useTransactions({ page, pageSize, filters }: UseTransactionsProps) {
  // Guarda cursores por página
  const cursorsRef = useRef<Record<number, any>>({});

  return useQuery({
    queryKey: ["transactions", page, filters],
    staleTime: 1000 * 60, // 1 min
    retry: 3,

    queryFn: async () => {
      const cursor = page === 1 ? undefined : cursorsRef.current[page - 1];

      const response = await fetchTransactionsWithPagination(pageSize, cursor, filters);

      // Salva cursor da próxima página
      if (response.LastEvaluatedKey) {
        cursorsRef.current[page] = response.LastEvaluatedKey;
      }

      return response.Items.length > 0 ? response : toast.info("Nenhuma transação encontrada");
    },
  });
}

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const response = await fetchPlans();
      return response.Items;
    },
  });
}
