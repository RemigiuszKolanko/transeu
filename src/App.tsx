import React, { useEffect, useState } from 'react';

import { Search } from "./components/Search";
import { CurrencyType } from './types/CurrencyType';
import { CryptocurrenciesList } from './components/CryptocurrenciesList';
import { Error } from './components/Error';
import { CurrencyDetailsType } from './types/CurrencyDetailsType';
import { CryptocurrencyDetails } from './components/CryptocurrencyDetails';
import { getLocalStorageWithExpiry, setLocalStorageWithExpiry } from "./helpers/localStorageCache";

function App() {
  const [currencies, setCurrencies] = useState<CurrencyType[]>([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyDetailsType | null>(null);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    setError(null);

    const cacheKey = `currencies-${filter}`;
    const cachedCurrencies = getLocalStorageWithExpiry(cacheKey);
    if (cachedCurrencies) {
      setCurrencies(cachedCurrencies);
      return;
    }

    fetch(`/api/currencies?filter=${filter}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(data);
        setLocalStorageWithExpiry(cacheKey, data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [filter]);

  const handleCurrencyClick = (symbol: string) => {
    setError(null);

    const cacheKey = `currencyDetails-${symbol}`;
    const cachedDetails = getLocalStorageWithExpiry(cacheKey);
    if (cachedDetails) {
      setSelectedCurrency(cachedDetails);
      return;
    }

    fetch(`/api/currencies/${symbol}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCurrency(data);
        setLocalStorageWithExpiry(cacheKey, data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Search onFilterChange={handleFilterChange} />
      {error && <Error />}
      {!error && <CryptocurrenciesList currencies={currencies} onCurrencyClick={handleCurrencyClick} />}
      {!error && <CryptocurrencyDetails selectedCurrency={selectedCurrency} />}
    </div>
  );
}

export default App;
