import { Check, ChevronDown, Loader2 } from "lucide-react";
import InputField from "../InputField";
import { TIME_UNITS_LABELS } from "../../constants/constants";
import { motion } from "motion/react";
import { Select } from "../Select";
import { InfoNote } from "../InfoNote";
import { SwitchCheckBox } from "../SwitchCheckBox";
import { Button } from "../Button";
import { useCreatePlan } from "../../hooks/usePlans";

interface ModalCreatePlanProps {
  onClose: () => void;
}

export default function ModalCreatePlan({ onClose }: ModalCreatePlanProps) {
  const { onSubmit, register, errors, setShowFreeTrial, showFreeTrial, isSubmitting } = useCreatePlan();

  return (
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
        <h1 className="titles text-primary text-2xl">Informações Gerais</h1>
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
          <SwitchCheckBox onChange={(e) => setShowFreeTrial(e.target.checked)} />
        </div>
        <div
          className={`flex w-full ${!showFreeTrial ? "opacity-30" : "opacity-100"} transition-all duration-300 max-md:flex-col gap-5 justify-between`}
        >
          <InputField
            disabled={!showFreeTrial}
            {...register("auto_recurring.free_trial.frequency", { valueAsNumber: true })}
            type="number"
            error={showFreeTrial ? errors.auto_recurring?.free_trial?.frequency?.message : ""}
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

      <div className="flex gap-5">
        <Button.Root
          onClick={onClose}
          className="flex justify-center py-4 bg-charcoal w-full hover:bg-zinc-700 rounded-2xl font-semibold transition-all"
        >
          <span className="text-white">Cancelar</span>
        </Button.Root>
        <Button.Root type="submit" className="w-full flex justify-center">
          {isSubmitting ? <Loader2 className="animate-spin" color="#000" /> : <Check color="#000" />}
          <span className="text-black">Criar</span>
        </Button.Root>
      </div>
    </motion.form>
  );
}
