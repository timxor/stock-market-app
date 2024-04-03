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
  
    // Sort the data by date
    data.sort((a, b) => a.date - b.date);
  
    return (
      <LineChart width={800} height={400} data={data} margin={{ top: 20, right: 50, bottom: 50, left: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottom', dy: 10 }} />
        <YAxis label={{ value: 'Stock Price (High)', angle: -90, position: 'insideLeft', dx: -10 }} />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="high" stroke="#8884d8" dot={false}/>
      </LineChart>
    );
  };
  

  const handleSaveStock = async () => {
    try {
      if (!stockData || !interval) {
        setError("Stock data or interval is not available.");
        return;
      }
  
      const timeSeriesKey = interval === 'day' ? 'Time Series (Daily)' :
                             interval === 'week' ? 'Weekly Time Series' :
                             interval === 'month' ? 'Monthly Time Series' :
                             interval === 'intraday' ? 'Time Series (5min)' : '';
  
      const metaData = stockData['Meta Data'];
      const timeSeries = stockData[timeSeriesKey];
      const company = metaData['2. Symbol'];
      const dates = Object.keys(timeSeries).slice(0, 50);
      const highs = Object.values(timeSeries).slice(0, 50).map(data => data['2. high']);
  
      if (auth.user) {
        await StockDataService.addStockToUser(auth.user.uid, company, dates, highs, interval);
        console.log("Stock added to user successfully!");
        setError(null);
        setStockData(null);
        setSymbol('');
        setInterval(null);
      } else {
        setError("User not authenticated.");
      }
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
