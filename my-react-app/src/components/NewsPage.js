import React, { useState, useEffect } from 'react';
import NewsDataService from '../services/news'; 
import './NewsPage.css';

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
    <div className="news-page-container" >
      <label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="search-bar"
          placeholder="Enter stock symbol..."
        />
      </label>
      <button onClick={handleSearch}>Enter</button>

      {stockData && (
        <div>
          <h2>{symbol}</h2>
          <ul>
            {stockData.feed.map((item, index) => (
                <a href={item.url} key={index} className="card-link">
                <div className="card">
                  <img className="card-img-top" src={item.imageSrc} alt={item.title} />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">{item.lastUpdated}</small>
                  </div>
                </div>
              </a>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BusinessNews;