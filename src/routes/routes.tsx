import { AuthUser } from "aws-amplify/auth";
import { useEffect, lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import SettingsPage from "../pages/SettingsPage";

const Transactions = lazy(() => import("../pages/Transactions"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const PlanPage = lazy(() => import("../pages/PlanPage"));
const SubscribersPlanPage = lazy(() => import("../pages/SubscribersPlanPage"));

export default function AppRoutes({ user, signOut }: { user?: AuthUser; signOut?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && location.pathname === "/") {
      navigate("/transactions", { replace: true });
    }
  }, [user, navigate, location.pathname]);

  if (!user || !signOut) return null;

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/plans" element={<PlanPage />} />
        <Route path="/plans/:plan_id/subscribers" element={<SubscribersPlanPage />} />
        <Route path="/reports" element={<div>Relatórios (em breve)</div>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage userCognito={user} />} />
        <Route path="*" element={<Navigate to="/transactions" replace />} />
      </Routes>
    </Suspense>
  );
}
