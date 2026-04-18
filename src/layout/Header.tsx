import { Clock, Menu } from "lucide-react";
interface MobileHeader {
  setIsSidebarOpen: () => void;
}

export default function MobileHeader({ setIsSidebarOpen }: MobileHeader) {
  return (
    <header className="xl:hidden px-6 flex items-center justify-between py-4 border-b border-charcoal">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          <Clock size={18} className="text-midnight-dark font-bold" />
        </div>
        <span className="font-display font-bold text-white text-sm tracking-tight uppercase">
          CHRONOS<span className="text-primary font-light">PAY</span>
        </span>
      </div>
      <button onClick={setIsSidebarOpen} className="p-2 bg-midnight-light rounded-lg text-text-gray hover:text-white">
        <Menu size={24} />
      </button>
    </header>
  );
}
