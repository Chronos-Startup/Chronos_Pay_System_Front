import { ChartBarIcon, CreditCard, Search } from "lucide-react";
import { labels, payment_methods_id } from "../../constants/constants";
import { Select } from "../Select";
import { TransactionFilters } from "../../types/transactionFilters";
import { useEffect, useState } from "react";

interface SearchTransactionProps {
  filterForm: TransactionFilters;
  handleFilter: (field: keyof TransactionFilters, value: string) => void;
}

export default function SearchTransactions({ filterForm, handleFilter }: SearchTransactionProps) {
  const [inputValue, setInputValue] = useState(filterForm.name ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleFilter("name", inputValue);
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputValue, handleFilter]);

  useEffect(() => {
    if (!filterForm.name && inputValue !== "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInputValue("");
    }
  }, [filterForm]);

  return (
    <div className="flex gap-8 max-lg:flex-col items-end justify-between">
      <div className="inputs border-primary/20 h-full flex text-primary group bg-midnight-dark">
        <input
          type="search"
          className="w-full placeholder:text-text-gray focus:outline-none"
          placeholder="Buscar por Nome..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Search />
      </div>
      <Select
        className="bg-midnight-dark"
        icon={ChartBarIcon}
        value={filterForm.status ?? ""}
        onChange={(e) => handleFilter("status", e.target.value)}
        placeholder="Todos os status"
        options={labels}
      />
      <Select
        className="bg-midnight-dark"
        icon={CreditCard}
        value={filterForm.payment_method_id ?? ""}
        onChange={(e) => handleFilter("payment_method_id", e.target.value)}
        placeholder="Todos os Métodos"
        options={payment_methods_id}
      />
    </div>
  );
}
