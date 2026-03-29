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

Amplify.configure(outputs);

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="tech-grid h-full min-h-screen flex items-center justify-center">
      <Authenticator
        className="p-6"
        formFields={formFields}
        // socialProviders={["google"]}
        components={components}
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
