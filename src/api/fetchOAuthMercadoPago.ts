import axios from "axios";
import { getCognitoIdToken } from "../utils/Authorizer";

export async function fetchOAuthMercadoPago(user_id: string, code: string | null) {
  try {
    if (!code) throw new Error("Code não informado");
    if (!user_id) throw new Error("User id não informado");
    const idToken = await getCognitoIdToken();

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/oauth?code=${code}`,
      {
        user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    throw new Error("Erro do servidor:", error.response.data.message);
  }
}

export async function getOAuthMercadoPago(user_id: string) {
  if (!user_id) throw new Error("User id não informado");
  try {
    const idToken = await getCognitoIdToken();

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/oauth?user_id=${user_id}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error("Erro do servidor:", error.response.data.message);
  }
}
