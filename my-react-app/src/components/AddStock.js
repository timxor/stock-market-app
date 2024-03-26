import React, { useState } from 'react';
import StockDataService from '../services/stock-services';
import { useAuth } from './AuthContext';

const AddStock = () => {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const auth = useAuth(); // Access current user
  const [error, setError] = useState(null);

  const handleGetStockData = async (interval) => {
    try {
      const data = await StockDataService.getStockData(symbol, interval);
      setStockData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSaveStock = async () => {
    try {
      if (!stockData) {
        console.error("Stock data is not available.");
        return;
      }

      const metaData = stockData['Meta Data'];
      const timeSeries = stockData['Time Series (Daily)'];
      const company = metaData['2. Symbol'];
      const dates = Object.keys(timeSeries).slice(0, 7); // Get the 7 most recent dates
      const highs = dates.map(date => timeSeries[date]['2. high']); // Get highs for the 7 dates

      if (auth.user) {
        await StockDataService.addStockToUser(auth.user.uid, company, dates, highs);
        console.log("Stock added to user successfully!");
        // Redirect to a different page after adding stock
        // history.push('/dashboard');
      } else {
        console.error("User not authenticated.");
      }
    } catch (error) {
      console.error("Error saving stock to user:", error);
    }
  };

  return (
    <div className="add-stock-container">
      <label>
        Enter Stock Symbol:
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </label>
      <div>
        <button onClick={() => handleGetStockData('day')}>Day</button>
        <button onClick={() => handleGetStockData('week')}>Week</button>
        <button onClick={() => handleGetStockData('month')}>Month</button>
        <button onClick={() => handleGetStockData('year')}>Year</button>
        <button onClick={handleSaveStock}>Save Stock</button>
      </div>

      {stockData && (
        <div>
          <h2>Stock Data:</h2>
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
        </div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default AddStock;
