import axios from "axios";
import { getCognitoIdToken } from "../utils/Authorizer";
import { toast } from "sonner";

export async function getUser() {
  const idToken = await getCognitoIdToken();
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log("Erro ao carregar usuário:", error.response.data.message);
    toast.error(error.response.data.message);
    throw error;
  }
}

export async function updateUserProfile(data: any) {
  const idToken = await getCognitoIdToken();
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/users`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      },
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log("Erro ao realizar update de usuário:", error.response.data.message);
    toast.error(error.response.data.message);
    throw error;
  }
}
