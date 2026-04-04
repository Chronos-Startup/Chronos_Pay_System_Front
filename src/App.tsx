import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import components from "./cognito/components";
import "./styles/cognito.css";
import { BrowserRouter } from "react-router-dom";
import { formFields } from "./cognito/formFields.js";
import HeaderDashboard from "./layout/HeaderDashboard";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18n } from "aws-amplify/utils";
import { signUp } from "aws-amplify/auth";

Amplify.configure(outputs);
I18n.setLanguage("pt-BR");

I18n.putVocabulariesForLanguage("pt-BR", {
  "Sign in": "Entrar",
  "Create Account": "Criar conta",
  "Sign Out": "Sair",
  "Send code": "Enviar código",
  "Back to Sign In": "Voltar para entrar",
  "Password is required": "A senha é obrigatória.",
  "Confirm Password is required": "A confirmação de senha é obrigatória.",
  "username is required to signIn": "O email é obrigatório para entrar.",
  "username is required to signUp": "O email é obrigatório para criar conta.",
  "password is required to signIn": "A senha é obrigatória para entrar.",
  "Password must have special characters": "A senha deve conter caracteres especiais.",
  "Signing in": "Entrando",
});

// 👇 objeto, não função
const services = {
  async handleSignUp(input: any) {
    const { username, password, options } = input;
    const attrs = options?.userAttributes ?? {};

    console.log("attrs recebidos:", attrs); // confirma o que chega

    return signUp({
      username,
      password,
      options: {
        ...options,
        userAttributes: {
          email: attrs.email,
          name: attrs.name,
          "name.formatted": attrs.name, // Cognito exige esse campo
          website: attrs.website,
        },
      },
    });
  },
};

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="tech-grid h-full min-h-screen flex items-center justify-center">
      <Authenticator
        className="p-6"
        formFields={formFields}
        components={components}
        services={services} // 👈 objeto correto
      >
        {({ user, signOut }) => (
          <AuthProvider userCognito={user}>
            <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                <main className="w-full">
                  <HeaderDashboard signOut={signOut} userCognito={user} />
                  <AppRoutes user={user} signOut={signOut} />
                </main>
              </QueryClientProvider>
            </BrowserRouter>
          </AuthProvider>
        )}
      </Authenticator>
    </div>
  );
}
