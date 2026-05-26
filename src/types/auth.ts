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

export interface AuthUserDynamo {
  name: string;
  email: string;
  user_id: string;
  mp: MercadoPagoIntegration;
  company: Company;
  merchant_id?: string;
  preferences?: UserPreferences;
}

export interface AuthContextData {
  user: AuthUserDynamo | null;
  isLoading: boolean;
  mpConnected: boolean;
  updateUser?: (data: Partial<AuthUserDynamo>) => void;
}
