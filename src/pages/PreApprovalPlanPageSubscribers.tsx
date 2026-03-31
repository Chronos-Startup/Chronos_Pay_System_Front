import { Users } from "lucide-react";
import { useParams } from "react-router-dom";
import { InfoNote } from "../components/InfoNote";
import { useSubscribers } from "../hooks/useSubscribers";
import { Table } from "../components/Table";
import LoadingCircle from "../components/LoadingCircle";

type Subscriber = {
  id: string;
  name: string;
  payer_email: string;
  identificationType: string;
  identificationNumber: string;
  status: string;
  date_created: string;
  next_payment_date: string;
  payment_method_id: string;
  reason: string;
  preapproval_plan_id: string;
  auto_recurring: {
    transaction_amount: number;
    currency_id: string;
    frequency: number;
    frequency_type: string;
  };
};

export default function PreApprovalPlanSubscribersPage() {
  const { preapproval_plan_id } = useParams<{ preapproval_plan_id: string }>();
  const { data, isLoading } = useSubscribers(preapproval_plan_id!);

  return (
    <div className="w-full p-6 min-h-screen flex flex-col gap-10 overflow-x-hidden">
      {/* Header */}
      <div className="flex justify-between xl:items-center max-md:flex-col max-md:gap-5">
        <div className="max-w-2xl space-y-2">
          <h1 className="titles text-3xl">
            Assinantes do <span className="text-primary">Plano</span>
          </h1>
          <p className="subtitles text-wrap">
            Visualize e gerencie todos os assinantes ativos deste plano. Monitore o status de cada assinatura em tempo
            real.
          </p>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <LoadingCircle />
      )}

      {/* Sem assinantes */}
      {!isLoading && (!data || data.length === 0) && (
        <div className="flex flex-col items-center justify-center gap-4 h-40 text-center">
          <Users className="text-primary w-10 h-10 opacity-50" />
          <p className="subtitles">Nenhum assinante encontrado para este plano.</p>
        </div>
      )}

      {/* Tabela */}
      {!isLoading && data && data.length > 0 && (
        <div className="glass-card rounded-lg overflow-x-auto shadow-xl">
          <Table.Root>
            <Table.Head.Root>
              <Table.Head.Data>ID DE ASSINATURA</Table.Head.Data>
              <Table.Head.Data>ASSINANTE</Table.Head.Data>
              <Table.Head.Data>Documento</Table.Head.Data>
              <Table.Head.Data>Plano</Table.Head.Data>
              <Table.Head.Data>Valor</Table.Head.Data>
              <Table.Head.Data>Status</Table.Head.Data>
              <Table.Head.Data>Pagamento</Table.Head.Data>
              <Table.Head.Data>Próx. Cobrança</Table.Head.Data>
              <Table.Head.Data>FREQUENCIA</Table.Head.Data>
            </Table.Head.Root>
            <Table.Body.Root>
              {data.map((subscriber: Subscriber) => (
                <Table.Body.SubscriberRow key={subscriber.id} subscriber={subscriber} />
              ))}
            </Table.Body.Root>
          </Table.Root>
        </div>
      )}

      <InfoNote title="Informação">
        Assinantes cancelados ou inadimplentes podem aparecer com status diferente de &quot;Ativo&quot;. Verifique o painel do
        Mercado Pago para mais detalhes.
      </InfoNote>
    </div>
  );
}
