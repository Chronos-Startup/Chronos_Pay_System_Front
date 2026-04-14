import axios from "axios";
import { getCognitoIdToken } from "../utils/Authorizer";
import { toast } from "sonner";

export async function createPlan(data: any) {
  try {
    const idToken = await getCognitoIdToken();
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/plans`, data, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log("Erro ao realizar update de usuário:", error.response.data.message || error.response.data.error);
    toast.error(error.response.data.message || error.response.data.error);
    throw error;
  }
}

export async function fetchPlans() {
  try {
    const idToken = await getCognitoIdToken();
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/plans`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar planos:", error.response.data.message || error.response.data.error);
    throw error;
  }
}

export async function fetchSubscriptionsByPlanId(preApprovalPlanId: string) {
  try {
    const idToken = await getCognitoIdToken();
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/plans/${preApprovalPlanId}/subscriptions`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar assinaturas:", error.response.data.message || error.response.data.error);
    toast.error(error.response.data.message || error.response.data.error);
    throw error;
  }
}
