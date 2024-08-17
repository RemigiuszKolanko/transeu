import React from "react";
import { CurrencyDetailsType } from "../types/CurrencyDetailsType";

interface CryptocurrencyDetailsProps {
    selectedCurrency: CurrencyDetailsType | null;
}

export const CryptocurrencyDetails: React.FC<CryptocurrencyDetailsProps> = ({ selectedCurrency }) => {
  if (!selectedCurrency) {
    return <div>Select a currency to see details</div>;
  }

  return (
    <div>
      <p>{selectedCurrency.name}  - ({selectedCurrency.symbol})</p>
      <p>Rate: {selectedCurrency.rate}</p>
      <img
          src={selectedCurrency.icon_url}
          alt={`${selectedCurrency.name} icon`}
          style={{ width: "50px", height: "50px", marginBottom: "10px" }}
        />
    </div>
  );
};