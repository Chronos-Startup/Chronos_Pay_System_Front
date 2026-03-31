import { LoaderCircleIcon } from "lucide-react";

export default function LoadingCircle() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <LoaderCircleIcon className="text-text-gray animate-spin w-7 h-7" />
      </div>
      <div className="text-center">
        <p className="text-white font-semibold">Carregando...</p>
      </div>
    </div>
  );
}
