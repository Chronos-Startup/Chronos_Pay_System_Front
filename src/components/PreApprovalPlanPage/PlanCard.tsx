import { Plan } from "../../types/PlanTypes";
import { formatDate } from "../../utils/DateUtils";
import { formatFrequency, formatFrequencyFreeTrial } from "../../utils/StringUtils";
import { Button } from "../Button";
import CopyButton from "../copyButton";
import StatusBadge from "../statusBadge";
import { PreApprovalPlanResponse } from "mercadopago/dist/clients/preApprovalPlan/commonTypes";

interface PlanCardInterfaceComposition {
  plan: PreApprovalPlanResponse;
}

export function PlanCard({ plan }: PlanCardInterfaceComposition) {
  console.log(plan);
  const { date } = formatDate(plan.date_created);
  const trial = formatFrequencyFreeTrial(
    plan?.auto_recurring?.free_trial?.frequency,
    plan?.auto_recurring?.free_trial?.frequency_type,
  );
  const isRecurring = !!plan.auto_recurring;

  return (
    <div className="glass-card p-5 gap-4 rounded-2xl flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-semibold text-white truncate">{plan.reason}</span>
          <span className="text-xs text-white/40">Criado em {date}</span>
        </div>
        <StatusBadge status={plan.status} />
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-white">R$ {plan?.auto_recurring?.transaction_amount}</span>
        <span className="text-sm text-white/40">
          /{formatFrequency(plan?.auto_recurring?.frequency_type, plan?.auto_recurring?.frequency)}
        </span>
      </div>
      {trial && (
        <div className="px-3 py-1 text-xs rounded-full border bg-blue-900/40 text-blue-400 border-blue-500/30">
          Trial {trial}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/3 rounded-xl p-3 flex flex-col gap-0.5">
          <span className="text-xs text-white/40">Assinantes</span>
          <span className="text-lg font-semibold text-white">{plan?.subscribers || "0"}</span>
        </div>
        <div className="bg-white/3 rounded-xl p-3 flex flex-col gap-0.5">
          <span className="text-xs text-white/40">MRR</span>
          <span className="text-lg font-semibold text-white">R$ {plan?.mrr || 0}</span>
        </div>
      </div>

      <CopyButton value={plan.init_point}>Copiar Link</CopyButton>

      <div className="flex justify-between">
        <Button.Root className="bg-transparent w-full hover:bg-white/20 hover:text-white">Ver assinantes</Button.Root>
        <Button.Root className="bg-transparent w-full text-primary  hover:bg-primary/20">Editar</Button.Root>
      </div>
    </div>
  );
}
