import { ArrowLeft } from "lucide-react";
import { Button } from "@components/Button";

export default function ErrorPage() {
  return (
    <div className="min-h-screen overflow-hidden flex flex-col items-center justify-center tech-grid bg-midnight-dark p-6 text-white">
      <div className="text-center max-w-md flex flex-col items-center">
        <h1 className="text-6xl font-bold text-primary drop-shadow-md">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Oops! Algo deu errado.</h2>
        <p className="text-text-gray mt-2">
          A página que você está tentando acessar não existe ou ocorreu um erro inesperado.
        </p>

        <Button.Root
          className="mt-6 flex items-center justify-center bg-primary hover:bg-primary/80 text-charcoal px-6 py-3 rounded-lg transition-colors duration-200"
          onClick={() => (window.location.href = "/transactions")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Dashboard
        </Button.Root>
      </div>
    </div>
  );
}
