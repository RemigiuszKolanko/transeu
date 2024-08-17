import React from "react";
import { CurrencyType } from "../types/CurrencyType";

interface CryptocurrenciesListProps {
    currencies: CurrencyType[];
    onCurrencyClick: (symbol: string) => void;
}

export const CryptocurrenciesList: React.FC<CryptocurrenciesListProps> = ({ currencies, onCurrencyClick }) => (
    <>
        {!currencies.length && <p>There are no results for this phrase!</p>}
        {!!currencies.length && <ul>
            {currencies.map((currency) => (
                <li key={currency.symbol} onClick={() => onCurrencyClick(currency.symbol)}>
                    {currency.name}  - ({currency.symbol})
                </li>
            ))}
        </ul>}
    </>
);