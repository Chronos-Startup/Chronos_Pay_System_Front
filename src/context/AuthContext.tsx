import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthContextData, AuthUserDynamo } from "../types/auth";
import { getUser } from "../api/Users";
import { AuthUser, fetchUserAttributes, updateUserAttributes } from "aws-amplify/auth";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children, userCognito }: { children: ReactNode; userCognito?: AuthUser }) {
  const [user, setUser] = useState<AuthUserDynamo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mpConnected, setMpConnected] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        setIsLoading(true);
        const [response, attributes] = await Promise.all([
          getUser(),
          fetchUserAttributes(), // dados do Cognito
        ]);
        setUser({
          ...response,
          name: attributes.name,
          email: attributes.email,
          company: {
            name: attributes["custom:company_name"] || "",
            website: attributes.website,
            industry: attributes["custom:company_industry"] || "",
          },
        });
        setMpConnected(response.mp.isConnected);
      } catch (error) {
        console.log("Erro ao carregar usuário:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, [userCognito?.userId]);

  async function updateUser(data: Partial<AuthUserDynamo>) {
    try {
      setIsLoading(true);
      await updateUserAttributes({
        userAttributes: {
          "custom:company_name": data.company?.name,
          "custom:company_industry": data.company?.industry,
        },
      });
      toast.success("Perfil atualizado com sucesso!");
    } catch (error: any) {
      toast.error(error?.message || "Erro ao atualizar usuário");
    } finally {
      setIsLoading(false); // sempre executa — sucesso ou erro
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, mpConnected, updateUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}
