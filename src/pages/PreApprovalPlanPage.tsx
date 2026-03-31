import { PlusCircle } from "lucide-react";
import { PlanCard } from "../components/PreApprovalPlanPage/PlanCard";
import { usePlans } from "../hooks/useTransactions";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { AnimatePresence } from "motion/react";
import { PreApprovalPlanResponse } from "mercadopago/dist/clients/preApprovalPlan/commonTypes";
import LoadingCircle from "../components/LoadingCircle";
import ModalPreApprovalPlan from "../components/PreApprovalPlanPage/ModalPreApprovalPlan";

export default function PreApprovalPlanPage() {
  const { data, isLoading } = usePlans();
  const [show, setShow] = useState<boolean | null>(null);
  const handleShowModal = () => {
    setShow(true);
  };

  return (
    <div className="w-full p-6 min-h-screen flex flex-col gap-10 overflow-x-hidden">
      <div className="flex justify-between xl:items-center  max-md:flex-col max-md:gap-5">
        <div className="max-w-2xl space-y-2">
          <h1 className="titles text-3xl">
            Planos e <span className="text-primary">Assinaturas</span>
          </h1>
          <p className="subtitles text-white/80 text-wrap">
            Gerencie seu catálogo de produtos e vizualize o crescimento da receita recorrente.
          </p>
        </div>
      </div>

      {!isLoading && data ? (
        <div className="w-full grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3 gap-10">
          {data.map((plan: PreApprovalPlanResponse) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
          <button
            onClick={handleShowModal}
            className="border-2 cursor-pointer hover:translate-y-2 transition-all border-dashed items-center justify-center border-primary/40 p-5 gap-5 rounded-2xl flex flex-col"
          >
            <div className="p-3 text-primary bg-primary/10 border rounded">
              <PlusCircle />
            </div>
            <h1 className="font-bold text-white leading-0">Novo Plano</h1>
            <span className="text-sm text-primary">Crie uma nova oferta para seus clientes</span>
          </button>
        </div>
      ) : (
        <LoadingCircle />
      )}

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
