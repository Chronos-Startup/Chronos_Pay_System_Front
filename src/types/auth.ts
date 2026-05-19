export interface Company {
  id: string;
  name: string;
  website?: string;
  industry?: string; // setor de atuação
  picture_url?: string;
}

export interface MercadoPagoIntegration {
  isConnected: boolean;
  merchant_id?: string;
  public_key?: string;
}

export interface UserPreferences {
  notifications: boolean;
  theme: "light" | "dark";
}

export interface AuthUserDynamo {
  user_id: string;
  name: string;
  email: string;

  company: Company;

  mp: MercadoPagoIntegration;

  preferences?: UserPreferences;
}

export interface AuthContextData {
  user: AuthUserDynamo | null;
  isLoading: boolean;
  mpConnected: boolean;
  updateUser?: (data: Partial<AuthUserDynamo>) => void;
}
