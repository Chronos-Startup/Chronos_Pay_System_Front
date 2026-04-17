import { labels, payment_methods_id } from "../../constants/constants";
import { TransactionFilters } from "../../types/transactionFilters";

import { Dispatch, memo, SetStateAction } from "react";

interface FiltersProps {
  filterForm: TransactionFilters;
  setFilterForm: Dispatch<SetStateAction<TransactionFilters>>;
}

function Filters({ filterForm, setFilterForm }: FiltersProps) {
  const hasActiveFilters = Object.values(filterForm).some((value) => value !== undefined && value !== "");

  const handleClearFilters = () => setFilterForm({});

  return (
    <div className="flex md:items-center max-md:flex-col gap-2 pt-2">
      <span className="text-[10px] font-bold text-text-gray uppercase tracking-widest">FILTROS ATIVOS:</span>

      <div className="flex flex-wrap gap-5">
        {filterForm.status && (
          <p className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] text-primary font-bold uppercase">
            {labels[filterForm.status]}
          </p>
        )}
        {filterForm.payment_method_id && (
          <p className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] text-primary font-bold uppercase">
            {payment_methods_id[filterForm.payment_method_id] as keyof typeof payment_methods_id}
          </p>
        )}
      </div>

      {hasActiveFilters && ( // ✅ nome legível
        <button
          onClick={handleClearFilters}
          className="cursor-pointer items-center flex text-text-gray hover:text-white transition-colors underline underline-offset-4 ml-2"
        >
          <span className="text-[10px]">Limpar tudo</span>
        </button>
      )}
    </div>
  );
}
export default memo(Filters);
