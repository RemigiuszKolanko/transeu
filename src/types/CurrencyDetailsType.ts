import { CurrencyType } from "./CurrencyType";

export interface CurrencyDetailsType extends CurrencyType {
    rate: number;
    icon_url: string;
  }