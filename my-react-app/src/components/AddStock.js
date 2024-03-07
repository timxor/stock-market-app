import React, { useState } from 'react';
import StockDataService from '../services/stock-services';

const AddStock = () => {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
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
        </div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default AddStock;
