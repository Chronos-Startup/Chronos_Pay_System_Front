import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/DateUtils";
import { formatFrequency, formatFrequencyFreeTrial } from "../../utils/StringUtils";
import CopyButton from "../copyButton";
import StatusBadge from "../statusBadge";
import { PreApprovalPlanResponse } from "mercadopago/dist/clients/preApprovalPlan/commonTypes";
import { useAuth } from "../../context/AuthContext";
import { Edit2, Eye } from "lucide-react";

interface PlanCardInterfaceComposition {
  plan: PreApprovalPlanResponse;
}

export function PlanCard({ plan }: PlanCardInterfaceComposition) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { date } = formatDate(plan.date_created);
  const trial = formatFrequencyFreeTrial(
    plan?.auto_recurring?.free_trial?.frequency,
    plan?.auto_recurring?.free_trial?.frequency_type,
  );
  const URL_TO_PREAPPROVAL = `https://checkout.chronospay.ufersa.dev.br/preapproval/${user?.mp.public_key}/${plan.id}/${user?.user_id}`;

  return (
    <div className="glass-card p-5 gap-4 rounded-2xl flex flex-col justify-between">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-semibold text-white truncate">{plan.reason}</span>
          <span className="text-xs text-white/40">Criado em {date}</span>
          <StatusBadge status={plan.status} />
        </div>
        <button className="text-primary cursor-pointer rounded  hover:border-b-2 p-2">
          <Edit2 />
        </button>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-primary">
          R$ {plan?.auto_recurring?.transaction_amount?.toFixed(2)}
        </span>
        <span className="text-sm text-white/80">
          /{formatFrequency(plan?.auto_recurring?.frequency_type, plan?.auto_recurring?.frequency)}
        </span>
      </div>
      {trial && (
        <div className="px-3 py-1 text-xs rounded-full border bg-blue-900/40 text-blue-400 border-blue-500/30">
          Teste grátis de {trial}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate(`/preapproval/${plan.id}/subscribers`)}
          className="bg-white/3 cursor-pointer group rounded-xl p-3 flex  justify-between items-center"
        >
          <div className="flex flex-col text-start gap-0.5">
            <span className="text-xs text-primary font-bold">Assinantes</span>
            <span className="text-lg font-semibold text-white">{plan?.subscribers_count || "0"}</span>
          </div>
          <div className="text-primary group-hover:-translate-y-1 transition all">
            <Eye />
          </div>
        </button>
        <div className="bg-white/3 rounded-xl p-3 flex flex-col gap-0.5">
          <span className="text-xs text-primary font-bold">MRR</span>
          <span className="text-lg font-semibold text-white">
            R$ {(plan?.subscribers_count * plan?.auto_recurring?.transaction_amount)?.toFixed(2) || "0"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center justify-between">
        <CopyButton
          className="py-4 border  hover:bg-primary/10 w-full rounded-xl border-white/40 text-white/90 font-bold"
          value={URL_TO_PREAPPROVAL}
        >
          Copiar Link de Checkout
        </CopyButton>
      </div>
    </div>
  );
}
