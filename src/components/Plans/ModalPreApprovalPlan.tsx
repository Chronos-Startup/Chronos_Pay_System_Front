import { Check, ChevronDown } from "lucide-react";
import InputField from "../InputField";
import { TIME_UNITS_LABELS } from "../../constants/constants";
import { motion } from "motion/react";
import { Select } from "../Select";
import { InfoNote } from "../InfoNote";
import { SwitchCheckBox } from "../SwitchCheckBox";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import { Plan } from "../../types/PlanTypes";
import { createPreApprovalPlan } from "../../api/PreApproval";
import { useState } from "react";

export default function ModalCreatePlan() {
  const { register, handleSubmit } = useForm<Plan>();

  async function onSubmit(data: Plan) {
    if (!showFreeTrial) {
      data.auto_recurring.free_trial = undefined; // remove objeto de teste se não for habilitado
    }
    await createPreApprovalPlan?.(data);
    window.location.reload();
  }

  const [showFreeTrial, setShowFreeTrial] = useState<boolean | null>(false);

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
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
        <h1 className="titles text-primary text-2xl">Informações Gerais</h1>
        <InputField {...register("reason")} label="Nome do plano (Motivo)" placeholder="ex: Acesso Editorial Premium" />
        <div className="flex max-md:flex-col w-full gap-5 ">
          <InputField
            {...register("auto_recurring.transaction_amount", {
              valueAsNumber: true,
            })}
            label="Preço (R$)"
            type="number"
            min={1}
            placeholder="R$ 0,00"
          />
          <InputField
            {...register("back_url")}
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
              {...register("auto_recurring.frequency", {
                valueAsNumber: true,
              })}
              className="max-w-32"
              type="number"
              min={1}
              defaultValue={1}
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
              {...register("auto_recurring.repetitions", {
                valueAsNumber: true,
              })}
              type="number"
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
            <h1 className="titles text-primary text-2xl">Incentivos</h1>
            <span className="max-md:text-sm">Ofereça um período de teste para aumentar a conversão</span>
          </div>
          <SwitchCheckBox onChange={(e) => setShowFreeTrial(e.target.checked)} />
        </div>
        <div
          className={`flex w-full ${!showFreeTrial ? "opacity-30" : "opacity-100"} transition-all duration-300 max-md:flex-col gap-5 justify-between`}
        >
          <InputField
            disabled={!showFreeTrial}
            {...register("auto_recurring.free_trial.frequency")}
            type="number"
            label="Duração do teste"
            placeholder="Ex: 7"
          />
          <Select
            disabled={!showFreeTrial}
            {...register("auto_recurring.free_trial.frequency_type")}
            label="unidade de teste"
            options={TIME_UNITS_LABELS}
            icon={ChevronDown}
          />
        </div>
      </div>
      <InfoNote title="Nota de conformidade">
        Planos criados são imutáveis assim que a primeira assinatura estiver ativa. Certifique-se de que suas
        frequências de cobrança estejam alinhadas com seus contratos de nível de serviço.
      </InfoNote>

      <Button.Root type="submit" className="w-full flex justify-center">
        <Button.Icon icon={Check} />
        <span className="text-black">Criar</span>
      </Button.Root>
    </motion.form>
  );
}
