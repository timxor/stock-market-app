import React, { useState, useEffect } from 'react';
import NewsDataService from '../`services/news'; 

const TopFiveStocksComponent = () => {
    const [topFiveData, setTopFiveData] = useState(null);
  
    useEffect(() => {
      const fetchTopFiveStocks = async () => {
        try {
          const topFive = ["AAPL", "GOOGL", "META", "MSFT", "NVDA"]; // Example top five stocks
          const rawTopFiveData = await NewsDataService.getNewsData(topFive); // Fetch raw news data for top five stocks
          const parsedTopFiveData = parseTopFiveData(rawTopFiveData); // Parse the fetched data
          setTopFiveData(parsedTopFiveData); // Set the parsed top five data in state
        } catch (error) {
          console.error('Error fetching or parsing top five data:', error);
        }
      };
  
      fetchTopFiveStocks();
    }, []); // Fetch data on component mount
  
    // Function to parse the fetched top five data
    const parseTopFiveData = (rawTopFiveData) => {
      // Your parsing logic goes here
      // For example, you can iterate through the rawTopFiveData object and format it as needed
      return rawTopFiveData; // Return the parsed data
    };
  
    return (
      <div>
        {/* Render your top five stock data here */}
        {topFiveData && (
          <ul>
            {Object.entries(topFiveData).map(([symbol, data]) => (
              <li key={symbol}>
                {/* Render individual stock data */}
                {/* Example: <p>{symbol}: {JSON.stringify(data)}</p> */}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default TopFiveStocksComponent;