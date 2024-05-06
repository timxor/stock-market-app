import React, { useState, useEffect } from 'react';
import NewsDataService from '../services/news'; 
import './NewsPage.css';
import { Link } from 'react-router-dom';

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
        const title = item.title;
        const description = item.description;
        console.log(title); // Output each title
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
          <h2>{symbol.toUpperCase()}</h2>
          <p style={{ fontSize: '20px' }}>{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div className="card-deck">
            <ul> 
            {stockData.feed.map((item, index) => (
              <div key={index} className="card" style={{ width: '18rem' }}>
                <a href={item.url}>
                  <img className="card-img-top" src={item.banner_image} alt="Banner" />
                </a>
                <div className="card-body">
                  <p className="card-source">{item.source}</p>
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.summary}</p>
                  <a href={item.url} className="btn btn-primary">Read More</a>
                  <hr /> {/* Horizontal line */}
                    <p className="author-name">Author: {item.authors[0]}</p>
                </div>
              </div>
            ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessNews;