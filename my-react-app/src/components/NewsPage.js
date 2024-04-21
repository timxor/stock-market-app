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
        console.error(`Error, fetching news data for symbol ${symbol}:`, error);
      }
    }
  };

  // erase stock data after symbol change
  useEffect(() => {
    setStockData(null);
  }, [symbol]);

  useEffect(() => {
    // Assuming stockData is an object with the provided JSON structure
    if (stockData && stockData.feed) {
      stockData.feed.forEach(item => {
        const url = item.url;
        console.log(url); // Output each URL
      });
    }
  }, [stockData]);

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
          <ul>
            {stockData.feed.map((item, index) => (
              <li key={index}>
                <a href={item.url}>{item.url}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BusinessNews;
