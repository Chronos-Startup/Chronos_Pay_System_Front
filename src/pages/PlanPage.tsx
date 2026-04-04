import { PlusCircle, Users } from "lucide-react";
import { PlanCard } from "../components/Plans/PlanCard";
import { usePlans } from "../hooks/useTransactions";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { AnimatePresence } from "motion/react";
import { PreApprovalPlanResponse } from "mercadopago/dist/clients/preApprovalPlan/commonTypes";
import LoadingCircle from "../components/LoadingCircle";
import ModalPreApprovalPlan from "../components/Plans/ModalPreApprovalPlan";

export default function PlanPage() {
  const { data, isLoading } = usePlans();
  const [show, setShow] = useState<boolean | null>(null);

  return (
    <div className="w-full p-6 min-h-screen flex flex-col gap-10 overflow-x-hidden">
      {/* Header */}
      <div className="flex justify-between xl:items-center max-md:flex-col max-md:gap-5">
        <div className="max-w-2xl space-y-2">
          <h1 className="titles text-3xl">
            Planos e <span className="text-primary">Assinaturas</span>
          </h1>
          <p className="subtitles text-white/80 text-wrap">
            Gerencie seu catálogo de produtos e visualize o crescimento da receita recorrente.
          </p>
        </div>
      </div>

      {/* Loading */}
      {isLoading && <LoadingCircle />}

      <div className="w-full grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3 gap-6">
        {/* Lista de planos */}
        {data && data.length > 0 && (
          <div>
            {data.map((plan: PreApprovalPlanResponse) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        )}

        {/* Botão novo plano */}
        {!isLoading && (
          <button
            onClick={() => setShow(true)}
            className="border-2 cursor-pointer hover:bg-primary/5 hover:border-primary/60 transition-all border-dashed border-primary/40 p-6 gap-4 rounded-2xl flex flex-col items-center justify-center"
          >
            <div className="p-3 text-primary bg-primary/10 border border-primary/20 rounded-xl">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h2 className="font-semibold text-white text-sm">Novo Plano</h2>
              <span className="text-xs text-white/50">Crie uma nova oferta para seus clientes</span>
            </div>
          </button>
        )}

        {/* Empty state */}
        {!isLoading && (!data || data.length === 0) && (
          <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Users className="text-primary w-8 h-8" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium text-white">Nenhum plano encontrado</p>
              <p className="text-sm text-white/50">Crie seu primeiro plano para começar a receber assinaturas.</p>
            </div>
          </div>
        )}
      </div>
      {/* Modal */}
      <AnimatePresence>
        {show && (
          <Modal setShow={setShow}>
            <ModalPreApprovalPlan />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
