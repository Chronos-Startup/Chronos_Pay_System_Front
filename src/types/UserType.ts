export interface Company {
  id?: string;
  name: string;
  website?: string;
  industry?: string; // setor de atuação
  picture_url?: string;
}

export interface MercadoPagoIntegration {
  isConnected: boolean;
  access_token: string;
  refresh_token?: string;
  public_key?: string;
}

export interface UserPreferences {
  notifications: boolean;
  theme: "light" | "dark";
}

interface UsageMetrics {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  costBrl?: number;
  totalRequest?: number;
}
interface AttributesCognito {
  name: string;
  email: string;
  company: Company;
}

export interface AuthUserDynamo extends UsageMetrics, AttributesCognito {
  user_id: string;
  mp: MercadoPagoIntegration;
  merchant_id?: string;
  preferences?: UserPreferences;
  plan: UserPlan;
}

export interface AuthContextData {
  user: AuthUserDynamo | null;
  isLoading: boolean;
  mpConnected: boolean;
  updateUser?: (data: Partial<AuthUserDynamo>) => void;
}
export type UserPlan = "free" | "premium";
