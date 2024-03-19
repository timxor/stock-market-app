import React, { useState } from 'react';
import StockDataService from '../services/stock-services';
import { useAuth } from './AuthContext';

const AddStock = () => {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const auth = useAuth(); // Access current user
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await StockDataService.getStockData(symbol);
      setStockData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const saveStockToUser = async () => {
    try {
      const metaData = stockData['Meta Data'];
      const timeSeries = stockData['Time Series (Daily)'];
      const company = metaData['2. Symbol'];
      const date = metaData['3. Last Refreshed'];
      const high = timeSeries[date]['2. high'];

      // Add stock to current user
      if (auth.user) {
        await StockDataService.addStockToUser(auth.user.uid, symbol, company, date, high);
        console.log("Stock added to user successfully!");
        // Redirect to a different page after adding stock
        //history.push('/dashboard');
      } else {
        console.error("User not authenticated.");
      }
    } catch (error) {
      console.error("Error saving stock to user:", error);
    }
  };

  return (
    <div className="add-stock-container">
      <form onSubmit={handleSubmit}>
        <label>
          Enter Stock Symbol:
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </label>
        <button type="submit">Get Stock Data</button>
      </form>

      {stockData && (
        <div>
          <h2>Stock Data:</h2>
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
          <button onClick={saveStockToUser}>Save Stock to User</button>
        </div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};


export default AddStock;
