import React, { useState, useEffect } from 'react';
import NewsDataService from '../services/news'; 

const BusinessNews = () => {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);

  const handleSearch = async () => {
    if (symbol.trim() !== '') {
      try {
        const rawStockData = await NewsDataService.getNewsDataAddStock(symbol);
        setStockData(rawStockData);
      } catch (error) {
        console.error(`Error fetching news data for symbol ${symbol}:`, error);
      }
    }
  };

  return (
    <div>
      <label>
        Enter Stock Symbol:
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </label>
      <button onClick={handleSearch}>Enter</button>

      {stockData && (
        <div>
          <h2>{symbol}</h2>
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default BusinessNews;
