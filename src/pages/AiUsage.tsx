import { DollarSign, TrendingUp, Cpu, Sparkles, Activity } from "lucide-react";
import { useAuth } from "@context/AuthContext";
import { PageLayout } from "@layout/Page";
import { Card } from "@components/Cards";
import { formatCurrency } from "@utils/StringUtils";
import TextUppercase from "@components/TextUppercase";

export default function AiUsagePage() {
  const { user } = useAuth();
  return (
    <PageLayout.Root>
      <PageLayout.Header>
        <PageLayout.Title>
          MÉTRICAS DE <span className="text-primary">INTELIGÊNCIA ARTIFICIAL</span>
        </PageLayout.Title>
        <PageLayout.Subtitle>
          Acompanhe detalhadamente o consumo de tokens do assistente, custos operacionais e volumetria de requisições.
        </PageLayout.Subtitle>
      </PageLayout.Header>

      {/* Stats Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Cost card */}
        <Card.Root>
          <Card.Header>
            <Card.Icon icon={DollarSign} />
            <Card.Title>Custo Absoluto Mensal</Card.Title>
          </Card.Header>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-medium text-white">{formatCurrency(user?.costBrl ?? 0)}</span>
          </div>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Icon icon={Cpu} color="indigo" />
            <Card.Title>Tokens Totais</Card.Title>
          </Card.Header>
          <div className="text-3xl font-display font-medium text-white">{user?.totalTokens}</div>
          <div className="flex items-center justify-between text-[10px] text-text-gray/60 mt-2 font-semibold uppercase tracking-wider">
            <span>In: {user?.inputTokens}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/30" />
            <span>Out: {user?.outputTokens}</span>
          </div>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Icon icon={Activity} color="green" />
            <Card.Title>Requisições</Card.Title>
          </Card.Header>
          <div className="text-3xl font-display font-medium text-white">{user?.totalRequest}</div>
          <p className="text-[10px] text-emerald-400 mt-2 font-bold uppercase tracking-wider">Taxa de sucesso: 100%</p>
        </Card.Root>

        {/* Tokens consumed card */}
      </div>

      {/* Cost Formula Explanation */}
      <section className="glass-card max-w-6xl p-8 rounded-3xl border border-white/5 lg:col-span-2 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
            <Sparkles size={16} className="text-orange-400" />
          </div>
          <TextUppercase className="text-white text-wrap text-sm">Tabela de Preços e Transparência</TextUppercase>
        </div>

        <p className="text-xs text-text-gray leading-relaxed font-light">
          O Chronos Pay utiliza os modelos da série <b>Gemini 2.5 (Flash-preview)</b> para fornecer inteligência
          integrada ao assistente virtual. A cobrança é baseada estritamente no consumo real de tokens das suas chamadas
          com base na precificação do provedor Google GenAI.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-white/2 border border-white/5 rounded-2xl">
            <span className="text-[8px] uppercase tracking-widest font-black text-primary">
              Preço de entrada (Input)
            </span>
            <p className="text-white text-lg font-bold font-display mt-1">
              R$1,52 <span className="text-xs text-text-gray font-normal">/ 1M tokens</span>
            </p>
            <p className="text-[9px] text-text-gray/50 mt-1">
              Prompt inserido no chat, contexto corporativo e dados agregados enviados.
            </p>
          </div>
          <div className="p-4 bg-white/2 border border-white/5 rounded-2xl">
            <span className="text-[8px] uppercase tracking-widest font-black text-primary">
              Preço de saída (Output)
            </span>
            <p className="text-white text-lg font-bold font-display mt-1">
              R$12,66 <span className="text-xs text-text-gray font-normal">/ 1M tokens</span>
            </p>
            <p className="text-[9px] text-text-gray/50 mt-1">
              Geração de texto da IA, respostas de código e invocações de ferramenta.
            </p>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/25 rounded-2xl p-5 flex items-start gap-4">
          <div className="p-2 bg-primary/20 rounded-xl text-primary shrink-0">
            <TrendingUp size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">Como economizamos seu saldo?</p>
            <p className="text-[11px] text-text-gray/80 leading-relaxed font-light">
              Utilizamos <b>Context Caching</b> no SDK para evitar reprocessar o contexto estático do seu dashboard
              (dados de vendas, histórico de assinantes, etc.) em cada mensagem subsequente, poupando até{" "}
              <b>70% de tokens de entrada</b>.
            </p>
          </div>
        </div>
      </section>
    </PageLayout.Root>
  );
}
