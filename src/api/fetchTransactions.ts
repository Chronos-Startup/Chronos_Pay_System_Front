import axios from "axios";
import { getCognitoIdToken } from "../utils/Authorizer";
import { toast } from "sonner";

type LastEvaluatedKey = Record<string, unknown>;

export async function fetchTransactionsWithPagination(
  pageSize?: number,
  lastEvaluatedKey?: LastEvaluatedKey,
  filters?: object,
) {
  try {
    const params = new URLSearchParams({
      pageSize: String(pageSize),
      ...(lastEvaluatedKey && {
        lastEvaluatedKey: JSON.stringify(lastEvaluatedKey),
      }),
      ...filters,
    });

    const idToken = await getCognitoIdToken();

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/payments?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar transações:", error.response.data.message);
    toast.error("Erro ao buscar transações");
    throw error.response.data.message;
  }
}
