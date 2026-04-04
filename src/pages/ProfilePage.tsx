import { Building2, Save, Upload } from "lucide-react";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef } from "react";
import { useImageUpload } from "../utils/HandleImageChange";
import ButtonIcon from "../components/Button/ButtonIcon";
import { useForm } from "react-hook-form";
import { AuthUserDynamo } from "../types/auth";
import InputField from "../components/InputField";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { handleImageChange, imageUrl } = useImageUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<AuthUserDynamo>();

  useEffect(() => {
    if (user) {
      reset({
        company: {
          name: user.company?.name || "",
          website: user.company?.website || "",
          industry: user.company?.industry || "",
        },
      });
    }
  }, [user, reset]);

  async function onSubmit(data: AuthUserDynamo) {
    console.log(data);
    updateUser?.(data);
  }

  return (
    <div className="min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl flex flex-col gap-10 p-6">
        <input type="file" ref={inputRef} accept="image/*" className="hidden" onChange={handleImageChange} />

        {/* Foto de perfil */}
        <div className="glass-card flex max-md:flex-col gap-10 p-10 rounded-xl">
          <div className="w-32 h-32 rounded-2xl bg-primary/30 shrink-0 overflow-hidden border-2 border-primary">
            {imageUrl && <img src={imageUrl} alt="Foto de perfil" className="w-full h-full object-cover " />}
          </div>
          <div className="space-y-3">
            <h1 className="text-white font-bold text-xl">LOGO da sua empresa</h1>
            <p className="text-text-gray text-sm">
              Formatos recomendados: JPG, PNG ou WEBP. <br />
              Tamanho máximo de 2MB. Dimensões ideais 400x400px.
            </p>
            <div className="flex max-md:flex-col gap-4">
              <Button.Root
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-black p-3 rounded-full"
              >
                <Button.Icon icon={Upload} />
                Trocar Foto
              </Button.Root>
              <Button.Root type="button" className="bg-transparent p-3 rounded-full border hover:bg-text-gray/20">
                Remover
              </Button.Root>
            </div>
          </div>
        </div>

        <div className="flex w-full gap-10 overflow-hidden max-lg:flex-col">
          {/* Informações Pessoais */}
          <div className="glass-card flex-1 flex flex-col gap-6 p-10 rounded-xl">
            <div className="border-b border-text-gray/20 pb-3 flex gap-3 items-center">
              <Building2 className="text-primary" />
              <h2 className="text-white font-bold">
                Informações Pessoais <span className="text-xs text-white/60">(Imutável)</span>
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <InputField label="Nome completo" placeholder="Seu nome" readOnly disabled value={user?.name} />
              <InputField
                label="E-mail profissional"
                type="email"
                readOnly
                disabled
                placeholder="seu@email.com"
                value={user?.email}
              />
            </div>
          </div>

          {/* Dados Corporativos */}
          <div className="glass-card flex-1 flex flex-col gap-6 p-10 rounded-xl">
            <div className="border-b border-text-gray/20 pb-3 flex gap-3 items-center">
              <Building2 className="text-primary" />
              <h2 className="text-white font-bold">Dados Corporativos</h2>
            </div>
            <div className="flex flex-col gap-4">
              <InputField
                label="Nome da empresa (Aparece no comprovante)"
                type="text"
                required
                errors={errors?.company?.name?.message}
                placeholder="Ex: Chronos Pay Ltda"
                {...register("company.name", { required: "Nome da empresa é obrigatório" })}
              />
              <InputField
                label="website oficial"
                type="text"
                required
                placeholder="https://www.chronospay.com.br"
                errors={errors?.company?.website?.message}
                {...register("company.website", {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "URL inválida — deve começar com http:// ou https://",
                  },
                })}
              />
              <InputField
                label="setor de atuação"
                type="text"
                placeholder="Pagamentos Digitais"
                errors={errors?.company?.industry?.message}
                {...register("company.industry")}
              />
            </div>
          </div>
        </div>
        <Button.Root
          type="submit"
          disabled={!isDirty || isSubmitting}
          className="max-w-xs max-lg:max-w-full flex justify-center"
        >
          <ButtonIcon icon={Save} />
          <span className="text-black font-semibold">Salvar</span>
        </Button.Root>
      </form>
    </div>
  );
}
