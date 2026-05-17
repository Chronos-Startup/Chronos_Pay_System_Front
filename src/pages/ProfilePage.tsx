import { Building2, Save, Trash, Upload } from "lucide-react";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef } from "react";
import { useImageUpload } from "../utils/HandleImageChange";
import ButtonIcon from "../components/Button/ButtonIcon";
import { useForm } from "react-hook-form";
import { AuthUserDynamo } from "../types/auth";
import InputField from "../components/InputField";
import TextUppercase from "../components/TextUppercase";
import { PageLayout } from "../layout/Page";

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
    updateUser?.(data);
  }
  return (
    <PageLayout.Root>
      <PageLayout.Header>
        <PageLayout.Title>
          MINHA <span className="text-primary">CONTA</span>
        </PageLayout.Title>
        <PageLayout.Subtitle>Gerencie sua identidade visual e dados corporativos da plataforma.</PageLayout.Subtitle>
      </PageLayout.Header>

      <form onSubmit={handleSubmit(onSubmit)} className="xl:max-w-6xl flex flex-col gap-10">
        <input type="file" ref={inputRef} accept="image/*" className="hidden" onChange={handleImageChange} />

        {/* Foto de perfil */}
        <PageLayout.Card className="p-10 gap-10 relative group">
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] bg-midnight-light border-2 border-primary/20 flex items-center justify-center shadow-chronos group-hover/logo:border-primary/40 transition-all">
            {imageUrl ? (
              <img src={imageUrl} alt="Foto de perfil" className="w-full h-full object-cover " />
            ) : (
              <div className="text-center space-y-2 opacity-40 group-hover/logo:opacity-100 transition-opacity">
                <Building2 size={40} className="mx-auto text-primary" strokeWidth={1.5} />
                <span className="text-[10px] uppercase font-bold tracking-widest block">Sem Logo</span>
              </div>
            )}
          </div>
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div>
              <PageLayout.Title className="text-xl">LOGO DA SUA EMPRESA</PageLayout.Title>
              <PageLayout.Subtitle className="text-text-gray text-xs max-w-md leading-relaxed">
                Esta logo será exibida nos seus links de pagamento e comprovantes enviados aos clientes.
              </PageLayout.Subtitle>
              <p className="text-[10px] text-text-gray/40 mt-3 uppercase tracking-widest font-bold">
                Formatos recomendados: JPG, PNG ou WEBP. Máx. 2MB.
              </p>
            </div>
            <div className="flex max-md:flex-col gap-4">
              <Button.Root
                type="button"
                aria-label="Trocar logo da empresa"
                onClick={() => inputRef.current?.click()}
                className="text-black p-3"
              >
                <Button.Icon icon={Upload} />
                Trocar Foto
              </Button.Root>
              <Button.Root
                type="button"
                className="bg-transparent p-3  border-text-gray/40 border hover:bg-text-gray/20"
              >
                <Button.Icon icon={Trash} className="text-text-gray" />
                Remover
              </Button.Root>
            </div>
          </div>
        </PageLayout.Card>

        <div className="flex w-full gap-10 max-lg:flex-col">
          {/* Informações Pessoais */}
          <PageLayout.Card className="flex-col p-10 gap-10 flex-1">
            <div className="border-b border-text-gray/20 pb-3 w-full flex gap-3 items-center">
              <Building2 className="text-primary" />
              <div>
                <h2 className="text-white font-bold">Informações Pessoais</h2>
                <span className="text-xs text-white/60">(Imutável)</span>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
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
          </PageLayout.Card>

          {/* Dados Corporativos */}
          <PageLayout.Card className="flex-col p-10 gap-10 flex-1">
            <div className="border-b border-text-gray/20 w-full pb-3 flex gap-3 items-center">
              <Building2 className="text-primary" />
              <h2 className="text-white font-bold">Dados Corporativos</h2>
            </div>
            <div className="flex w-full flex-col gap-4">
              <InputField
                label="Nome na fatura"
                type="text"
                required
                maxLength={12}
                error={errors?.company?.name?.message}
                placeholder="Ex: Chronos Pay Ltda"
                {...register("company.name", { required: "Nome da empresa é obrigatório" })}
              />
              <InputField
                label="website oficial"
                type="text"
                required
                placeholder="https://www.chronospay.com.br"
                error={errors?.company?.website?.message}
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
                error={errors?.company?.industry?.message}
                {...register("company.industry")}
              />
            </div>
          </PageLayout.Card>
        </div>
        <Button.Root
          type="submit"
          disabled={!isDirty || isSubmitting}
          className="max-w-xs max-lg:max-w-full flex justify-center"
        >
          <ButtonIcon icon={Save} />
          <TextUppercase className="text-black">Salvar Alterações</TextUppercase>
        </Button.Root>
      </form>
    </PageLayout.Root>
  );
}
