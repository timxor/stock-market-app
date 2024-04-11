/*import React, { useState, useEffect } from 'react';
import NewsDataService from '../services/news'; 

const BusinessNews = () => {
    const [topFiveData, setTopFiveData] = useState(null);
  
    useEffect(() => {
      const fetchTopFiveStocks = async () => {
        try {
          //const topFive = ["AAPL", "GOOGL", "META", "MSFT", "NVDA"]; 
          const rawTopFiveData = await NewsDataService.getNewsDataAddStock("AAPL"); 
          const parsedTopFiveData = parseTopFiveData(rawTopFiveData); // Parse the fetched data
          setTopFiveData(parsedTopFiveData); // Set the parsed top five data in state
        } catch (error) {
          console.error('Error fetching or parsing top five data:', error);
        }
      };
  
      fetchTopFiveStocks();
    }, []); 
  
    // Function to parse the fetched top five data
    const parseTopFiveData = (rawTopFiveData) => {
      // add logic to parse the data
      return rawTopFiveData; // Return the parsed data
    };
  
    return (
      <div>
        {top five}
        {topFiveData && (
          <ul>
            {Object.entries(topFiveData).map(([symbol, data]) => (
              <li key={symbol}>
               <p>{symbol}: {JSON.stringify(data)}</p> 
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default BusinessNews;*/

import React, { useEffect, useState } from 'react';
import NewsDataService from '../services/news'; 

const BusinessNews = () => {
  const [stockData, setStockData] = useState(null);
  const symbol = "AAPL"; // Set the stock symbol you want to fetch data for

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const rawStockData = await NewsDataService.getNewsDataAddStock(symbol);
        setStockData(rawStockData); // Set the raw data in state
      } catch (error) {
        console.error(`Error fetching data for symbol ${symbol}:`, error);
      }
    };

    fetchStockData();
  }, [symbol]); // Add symbol to the dependency array

  return (
    <div>
      {/* Display stock data */}
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
