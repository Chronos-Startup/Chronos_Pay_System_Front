import { stylesStatus } from "@constants/constants";

export interface TransactionFilters {
  name?: string;
  status?: keyof typeof stylesStatus;
  date_created?: string;
  payment_method_id?: string;
}
