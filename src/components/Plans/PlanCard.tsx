import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/DateUtils";
import { formatFrequency, formatFrequencyFreeTrial } from "../../utils/StringUtils";
import CopyButton from "../copyButton";
import StatusBadge from "../statusBadge";
import { PreApprovalPlanResponse } from "mercadopago/dist/clients/preApprovalPlan/commonTypes";
import { useAuth } from "../../context/AuthContext";
import { Check, ChevronDown, Edit2, Eye, Loader2, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Modal } from "../Modal";
import { useUpdatePlan } from "../../hooks/usePlans";
import InputField from "../InputField";
import { Button } from "../Button";
import { InfoNote } from "../InfoNote";
import { Select } from "../Select";
import { TIME_UNITS_LABELS } from "../../constants/constants";
import { SwitchCheckBox } from "../SwitchCheckBox";

interface PlanCardInterfaceComposition {
  plan: PreApprovalPlanResponse;
}

export function PlanCard({ plan }: PlanCardInterfaceComposition) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { date } = formatDate(plan.date_created);
  const [showEditModal, setShowEditModal] = useState<boolean | null>(false);
  const hasFreeTrial = !!plan.auto_recurring?.free_trial?.frequency;

  const { onSubmit, register, errors, setShowFreeTrial, showFreeTrial, isSubmitting } = useUpdatePlan(plan);

  const handleShowEditModal = () => {
    setShowEditModal(true);
  };
  const trial = formatFrequencyFreeTrial(
    plan?.auto_recurring?.free_trial?.frequency,
    plan?.auto_recurring?.free_trial?.frequency_type,
  );
  const URL_TO_PREAPPROVAL = `https://checkout.chronospay.ufersa.dev.br/plans/${user?.mp.public_key}/${plan.id}/${user?.user_id}`;

  return (
    <div className="bg-midnight-light/50 hover:ring-primary/50 ring ring-transparent  hover:-translate-y-3 transition-all duration-300 p-5 gap-4 rounded-2xl flex flex-col justify-between">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-semibold text-lg text-white">{plan.reason}</h3>
            <button
              onClick={handleShowEditModal}
              className="p-1.5 text-text-gray hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <Edit2 size={14} />
            </button>
          </div>
          <p className="text-xs text-text-gray">Criado em {date}</p>
        </div>
        <StatusBadge status={plan.status} />
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-primary">
          R$ {plan?.auto_recurring?.transaction_amount?.toFixed(2)}
        </span>
        <span className="text-sm text-white/80 italic">
          /{formatFrequency(plan?.auto_recurring?.frequency_type, plan?.auto_recurring?.frequency)}
        </span>
      </div>
      {trial && (
        <div className="px-3 py-1 text-xs rounded-md border font-bold bg-blue-900/40 text-blue-400 border-blue-500/30">
          Teste grátis de {trial}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate(`/plans/${plan.id}/subscribers`)}
          className="bg-midnight-light/50 rounded-xl p-3 group border border-white/5 cursor-pointer"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-text-gray uppercase tracking-tight">Assinantes</span>
            <Users size={12} className="text-text-gray" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-mono font-semibold text-white">{plan.subscribers_count || 0}</span>
            <button className="p-1 text-text-gray group-hover:text-primary transition-colors">
              <Eye size={12} />
            </button>
          </div>
        </button>
        <div className="bg-midnight-light/50 rounded-xl p-3 border border-white/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-text-gray uppercase tracking-tight">MRR</span>
            <TrendingUp size={12} className="text-text-gray" />
          </div>
          <span className="text-lg font-mono font-semibold text-emerald-400">
            R$ R$ {((plan?.auto_recurring?.transaction_amount || 0) * (plan?.subscribers_count || 0)).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center justify-between">
        <CopyButton
          className="w-full py-3 bg-midnight-dark border border-charcoal rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-text-gray hover:border-primary hover:text-primary transition-all active:scale-[0.98]"
          value={URL_TO_PREAPPROVAL}
        >
          Copiar Link de Checkout
        </CopyButton>
      </div>
      <AnimatePresence>
        {showEditModal && (
          <Modal setShow={setShowEditModal}>
            <motion.form
              onSubmit={onSubmit}
              layout={false}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ willChange: "transform, opacity" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="transform-gpu glass-card rounded-lg  overflow-y-auto max-md:h-full  shadow-xl p-6 w-full max-w-4xl space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex flex-col gap-5">
                <h1 className="titles text-primary text-2xl">Editar Plano</h1>
                <InputField
                  {...register("reason")}
                  error={errors.reason?.message}
                  label="Nome do plano (Motivo)"
                  placeholder="ex: Acesso Editorial Premium"
                />
                <div className="flex max-md:flex-col w-full gap-5 ">
                  <InputField
                    {...register("auto_recurring.transaction_amount", { valueAsNumber: true })}
                    error={errors.auto_recurring?.transaction_amount?.message}
                    label="Preço (R$)"
                    type="number"
                    min={1}
                    placeholder="R$ 0,00"
                  />
                  <InputField
                    {...register("back_url")}
                    error={errors.back_url?.message}
                    label="URL DO WEBSITE (BACK_URL)"
                    placeholder="https://suamarca.com.br/sucesso"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-5">
                <h1 className="titles text-primary text-2xl">Ciclo de Faturamento</h1>
                <div className="flex max-md:flex-col items-start gap-5">
                  <div className="flex w-full items-end gap-5">
                    <InputField
                      {...register("auto_recurring.frequency", { valueAsNumber: true })}
                      className="max-w-32"
                      type="number"
                      min={1}
                      label="FREQUÊNCIA"
                    />

                    <Select
                      {...register("auto_recurring.frequency_type")}
                      className="max-w-32"
                      options={TIME_UNITS_LABELS}
                      icon={ChevronDown}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      {...register("auto_recurring.repetitions", { valueAsNumber: true })}
                      type="number"
                      error={errors.auto_recurring?.repetitions?.message}
                      label="Número de repetições (Opcional)"
                      placeholder="Infinito"
                    />
                    <span className="text-xs">Deixe em branco para assinaturas por tempo indeterminado</span>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-5">
                <div className="flex w-full justify-between gap-3">
                  <div>
                    <h1 className="titles text-primary text-2xl flex items-center gap-2">
                      Incentivos
                      <span className="text-xs font-medium px-2 py-1 rounded bg-gray-500/15 text-gray-400 border border-gray-500/20">
                        Imutável após criação
                      </span>
                    </h1>
                    <span className="max-md:text-sm">Ofereça um período de teste para aumentar a conversão</span>
                  </div>
                  <SwitchCheckBox
                    disabled={hasFreeTrial}
                    checked={showFreeTrial}
                    onChange={() => setShowFreeTrial(!showFreeTrial)}
                  />
                </div>
                <div
                  className={`flex w-full ${!showFreeTrial ? "opacity-30" : "opacity-100"} transition-all duration-300 max-md:flex-col gap-5 justify-between`}
                >
                  <InputField
                    disabled={hasFreeTrial || !showFreeTrial}
                    {...register("auto_recurring.free_trial.frequency", { valueAsNumber: true })}
                    type="number"
                    error={showFreeTrial ? errors.auto_recurring?.free_trial?.frequency?.message : ""}
                    label="Duração do teste"
                    placeholder="Ex: 7"
                  />
                  <Select
                    disabled={hasFreeTrial || !showFreeTrial}
                    {...register("auto_recurring.free_trial.frequency_type")}
                    label="unidade de teste"
                    options={TIME_UNITS_LABELS}
                    icon={ChevronDown}
                  />
                </div>
              </div>
              <InfoNote title="Nota de conformidade">
                Alterações no plano não afetam assinantes existentes — apenas novos assinantes serão cobrados com os
                valores atualizados. Certifique-se de que suas frequências de cobrança estejam alinhadas com seus
                contratos de nível de serviço.
              </InfoNote>

              <div className="flex gap-5">
                <Button.Root
                  onClick={() => setShowEditModal(false)}
                  className="flex justify-center py-4 bg-charcoal w-full hover:bg-zinc-700 rounded-2xl font-semibold transition-all"
                >
                  <span className="text-white">Cancelar</span>
                </Button.Root>
                <Button.Root type="submit" className="w-full flex justify-center">
                  {isSubmitting ? <Loader2 color="#000" className="animate-spin" /> : <Check color="#000" />}
                  <span className="text-black">Salvar Alterações</span>
                </Button.Root>
              </div>
            </motion.form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
