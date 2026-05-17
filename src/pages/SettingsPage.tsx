import { ExternalLink, Key, KeyRound } from "lucide-react";
import { Button } from "../components/Button";
import { PageLayout } from "../layout/Page";
import ErrorPage from "./ErrorPage";
import { fetchOAuthMercadoPago } from "../api/fetchOAuthMercadoPago";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthUser } from "aws-amplify/auth";
import LoadingCircle from "../components/LoadingCircle";
import TextUppercase from "../components/TextUppercase";
import { truncateString } from "../utils/StringUtils";
import CopyButton from "../components/copyButton";

import MercadoPagoLogo from "/images/MercadoPago_Logo_Horizontal.svg";

export interface UserAmplify {
  userCognito?: AuthUser;
}
export default function SettingsPage({ userCognito }: UserAmplify) {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const CLIENT_ID = "1549445475571223";
  const [error, setError] = useState<boolean>(false);

  const { isLoading, mpConnected, user } = useAuth();
  const oAuthData = useMemo(() => user?.mp ?? null, [user?.mp]);

  const redirectUri = useMemo(() => `${window.location.origin}/oauth/mercadopago`, []);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const userId = userCognito?.userId;
        if (!userId) return;
        if (isLoading) return;
        if (mpConnected) return;
        if (!code) return;

        // Tem code → faz o OAuth
        await fetchOAuthMercadoPago(userId, code);
        window.location.reload();
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    checkConnection();
  }, [code, userCognito, isLoading, mpConnected]);

  if (error) {
    return <ErrorPage />;
  }

  if (isLoading) return <LoadingCircle />;

  return (
    <PageLayout.Root>
      <PageLayout.Header>
        <PageLayout.Title>
          PAINEL DE <span className="text-primary">INTEGRAÇÃO</span>
        </PageLayout.Title>
        <PageLayout.Subtitle>
          Configure sua conexão com o Mercado Pago e defina as regras do seu checkout.
        </PageLayout.Subtitle>
      </PageLayout.Header>

      <PageLayout.Card className="p-8 lg:gap-20 max-md:gap-5">
        <div className="w-40 h-20  rounded-2xl flex items-center justify-center   shadow-2xl">
          <img src={MercadoPagoLogo} alt="Logo Mercado Pago" />
        </div>
        <div>
          <PageLayout.Title className="text-xl flex items-center gap-5">
            MERCADO PAGO{" "}
            <span
              className={`px-2 py-0.5 text-[9px] font-black rounded border uppercase tracking-widest ${
                mpConnected
                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  : "bg-red-500/10 text-red-500 border-red-500/20"
              }`}
            >
              {mpConnected ? "Ativo" : "Inativo"}
            </span>
          </PageLayout.Title>
          <PageLayout.Subtitle className="max-w-md">
            {mpConnected
              ? "Sua conta está vinculada e pronta para processar. As transações serão liquidadas diretamente na sua conta Mercado Pago."
              : "Conecte sua conta para começar a processar pagamentos de forma automatizada e segura."}
          </PageLayout.Subtitle>
        </div>

        <a
          className={`flex max-md:w-full items-center justify-center gap-3 px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-[0_10px_30px_rgba(0,158,227,0.3)] ${
            mpConnected ? "bg-[#009ee3] hover:bg-[#008ac5] text-white" : "bg-primary text-midnight-dark"
          }`}
          href={`https://auth.mercadopago.com.br/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectUri}`}
        >
          {mpConnected ? "Sincronizar Agora" : "Conectar Conta"}
          {!mpConnected && <Button.Icon icon={ExternalLink} />}
        </a>
      </PageLayout.Card>

      <PageLayout.Card className="flex-col p-8 items-start">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg text-primary bg-primary/10 flex items-center justify-center border border-primary/20">
            <Key />
          </div>
          <PageLayout.Title className="text-sm uppercase">Credenciais de API</PageLayout.Title>
        </div>
        <div className="w-full space-y-2">
          <TextUppercase>PUBLIC KEY</TextUppercase>
          <div className="inputs flex gap-3 hover:bg-primary/20 transition-all duration-200">
            <KeyRound />
            <input className="w-full focus:outline-none" readOnly value={truncateString(oAuthData?.public_key, 30)} />
            <CopyButton value={oAuthData?.public_key} />
          </div>
        </div>
        <div className="w-full">
          <TextUppercase>USER ID</TextUppercase>
          <div className="inputs flex gap-3 hover:bg-primary/20 transition-all duration-200">
            <KeyRound />
            <input className="w-full focus:outline-none" readOnly value={userCognito?.userId} />
            <CopyButton value={userCognito?.userId} />
          </div>
        </div>

        {/* User ID */}
        <div className="w-full">
          <TextUppercase>MERCHANT ID</TextUppercase>
          <div className="inputs flex gap-3 hover:bg-primary/20 transition-all duration-200">
            <KeyRound />
            <input className="w-full focus:outline-none" readOnly value={oAuthData?.merchant_id} />
            <CopyButton value={oAuthData?.merchant_id} />
          </div>
        </div>
      </PageLayout.Card>
    </PageLayout.Root>
  );
}
