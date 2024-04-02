import React, { useState } from 'react';
import StockDataService from '../services/stock-services';
import { useAuth } from './AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AddStock = () => {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [interval, setInterval] = useState(null); // State to store interval
  const auth = useAuth(); // Access current user
  const [error, setError] = useState(null);

  const handleGetStockData = async (interval) => {
    try {
      const data = await StockDataService.getStockData(symbol, interval);
      setStockData(data);
      setInterval(interval); // Set the interval in state
    } catch (error) {
      setError(error.message);
    }
  };

  const renderStockGraph = () => {
    if (!stockData || !interval) return null;

    const timeSeriesKey = interval === 'day' ? 'Time Series (Daily)' :
                          interval === 'week' ? 'Weekly Time Series' :
                          interval === 'month' ? 'Monthly Time Series' :
                          interval === 'intraday' ? 'Time Series (5min)' : '';

    const metaData = stockData['Meta Data'];
    const timeSeries = stockData[timeSeriesKey];
    const data = Object.keys(timeSeries).map(date => ({
      date: new Date(date),
      high: parseFloat(timeSeries[date]['2. high'])
    }));

    return (
      <LineChart width={800} height={400} data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="high" stroke="#8884d8" dot={false}/>
      </LineChart>
    );
  };

  const handleSaveStock = async () => {
    try {
      // Your existing code for saving stock data...
    } catch (error) {
      setError("Error saving stock to user. Please try again later.");
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
        <button onClick={() => handleGetStockData('intraday')}>Intraday</button>
        <button onClick={() => handleGetStockData('day')}>Day</button>
        <button onClick={() => handleGetStockData('week')}>Week</button>
        <button onClick={() => handleGetStockData('month')}>Month</button>
        <button onClick={handleSaveStock} disabled={!interval}>Save Stock</button>
      </div>

      {renderStockGraph()}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default AddStock;
