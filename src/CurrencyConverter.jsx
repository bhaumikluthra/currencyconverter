// src/CurrencyConverter.jsx
import React, { useEffect, useState } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetch("https://v6.exchangerate-api.com/v6/d341435b80f6cd16075bac68/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.conversion_rates) {
          const currencyList = Object.keys(data.conversion_rates);
          setCurrencies(currencyList);
        } else {
          setCurrencies([]);
        }
      });
  }, []);

  const convert = () => {
    fetch(`https://v6.exchangerate-api.com/v6/d341435b80f6cd16075bac68/pair/${fromCurrency}/${toCurrency}/${amount}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.conversion_result !== undefined) {
          setConvertedAmount(Number(data.conversion_result).toFixed(2));
        } else {
          setConvertedAmount("Error");
        }
      });
  };


  return (
    <div className="converter-container">
      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency}>{currency}</option>
          ))}
        </select>
        <span>to</span>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency}>{currency}</option>
          ))}
        </select>
        <button onClick={convert}>Convert</button>
      </div>
      {convertedAmount && (
        <h2>
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </h2>
      )}
    </div>
  );
};

export default CurrencyConverter;
