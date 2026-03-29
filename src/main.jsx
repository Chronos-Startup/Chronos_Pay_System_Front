import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider, defaultTheme } from "@aws-amplify/ui-react";
import App from "./App";

const Toaster = lazy(() => import("sonner").then((m) => ({ default: m.Toaster })));

const theme = {
  ...defaultTheme,

  tokens: {
    ...defaultTheme.tokens,
    colors: {
      ...defaultTheme.tokens.colors,

      background: {
        ...defaultTheme.tokens.colors.background,
        primary: { value: "#121826" },
      },

      font: {
        ...defaultTheme.tokens.colors.font,
        primary: { value: "#FFFFFF" },
        secondary: { value: "#6B7280" },
      },
    },
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Suspense fallback={null}>
        <Toaster richColors position="top-center" />
        <App />
      </Suspense>
    </ThemeProvider>
  </StrictMode>,
);
