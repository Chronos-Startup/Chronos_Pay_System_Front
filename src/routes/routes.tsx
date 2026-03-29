import { AuthUser } from "aws-amplify/auth";
import { useEffect, lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const MercadoPagoConnect = lazy(() => import("../pages/MercadoPagoConnect"));
const Transactions = lazy(() => import("../pages/Transactions"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const PreApprovalPlanPage = lazy(() => import("../pages/PreApprovalPlanPage"));
const PreApprovalPlanSubscribersPage = lazy(() => import("../pages/PreApprovalPlanPageSubscribers"));

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
        <Route path="/oauth/mercadopago" element={<MercadoPagoConnect userCognito={user} />} />
        <Route path="/transactions" element={<Transactions userCognito={user} />} />
        <Route path="/preapproval" element={<PreApprovalPlanPage />} />
        <Route path="/preapproval/:preapproval_plan_id/subscribers" element={<PreApprovalPlanSubscribersPage />} />
        <Route path="/reports" element={<div>Relatórios (em breve)</div>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<div>Configurações (em breve)</div>} />
        <Route path="*" element={<Navigate to="/transactions" replace />} />
      </Routes>
    </Suspense>
  );
}
