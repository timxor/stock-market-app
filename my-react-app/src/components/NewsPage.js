import React, { useState, useEffect } from 'react';
import NewsDataService from '../services/news';
import './NewsPage.css';
import { Link } from 'react-router-dom';

const BusinessNews = () => {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [apiError, setApiError] = useState(null);

  const handleSearch = async () => {
    if (symbol.trim() !== '') {
      try {
        const rawStockData = await NewsDataService.getNewsDataAddStock(symbol);
        setStockData(rawStockData);
      } catch (error) {
        console.error(`Error fetching news data for symbol ${symbol}:`, error);
        setApiError('Out of API calls. Please try again later.'); // Set the error message
      }
    }
  };

  // erase stock data and error message after symbol change
  useEffect(() => {
    setStockData(null);
    setApiError(null);
  }, [symbol]);

  return (
    <div className="news-page-container">
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

      {apiError ? (
        <div className="error-message">{apiError}</div> // Display the error message if API call fails
      ) : (
        stockData && stockData.feed ? (
          <div>
            <h2>{symbol.toUpperCase()}</h2>
            <p style={{ fontSize: '20px' }}>{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className="card-deck">
              {stockData.feed.map((item, index) => (
                <div key={index} className="card">
                  <a href={item.url}>
                    <img className="card-img-top" src={item.banner_image} alt="Banner" style={{ height: '200px', objectFit: 'cover' }} />
                  </a>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <p className="card-source">{item.source}</p>
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.summary}</p>
                      <a href={item.url} className="btn btn-primary">Read More</a>
                    </div>
                    <div>
                      <hr /> {/* Horizontal line */}
                      <p className="author-name">Author: {item.authors[0]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="no-data-message">No news data available for {symbol.toUpperCase()}</p> // Display message if no news data is available
        )
      )}
    </div>
  );
};

export default BusinessNews;
