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
  Confirm: "Confirmar",
  "Resend Code": "Reenviar código",
  "We Emailed You": "Verifique seu e-mail",
  "Confirmation Code": "Código de confirmação",
  "Enter your Confirmation Code": "Digite seu código de confirmação",
  "Confirm Sign Up": "Confirmar cadastro",

  // Amplify quebra em duas partes separadas — traduz cada uma individualmente
  "Your code is on the way. To log in, enter the code we emailed to":
    "Seu código está a caminho. Para entrar, use o código enviado para",
  "It may take a minute to arrive.": "Pode levar um momento para chegar.",
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="tech-grid h-full min-h-screen flex items-center justify-center">
      <Authenticator className="p-6" formFields={formFields} components={components}>
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
