import React, { useState, useEffect } from 'react';
import StockDataService from '../services/stock-services';
import { useAuth } from './AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AddStock.css'; // Import custom CSS for styling

const AddStock = () => {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [interval, setInterval] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null); // State to track selected button
  const auth = useAuth();
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchTopStocks = async () => {
      try {
        const topStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META'];
        const promises = topStocks.map(symbol => StockDataService.getStockData(symbol, 'day'));
        const data = await Promise.all(promises);
        setStockData(data);
        setInterval('day');
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTopStocks();
  }, []);

  const handleGetStockData = async (interval) => {
    try {
      if (!symbol) {
        setError("Please enter a valid stock symbol.");
        return;
      }
      setSelectedButton(interval); // Set selected button when fetching data
      const data = await StockDataService.getStockData(symbol, interval);
      if (data && data['Meta Data'] && data['Meta Data']['2. Symbol']) {
        setStockData([data]);
        setInterval(interval);
      } else {
        throw new Error("Invalid or unavailable stock symbol.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const renderStockGraphs = () => {
    if (!stockData || stockData.length === 0) return null;

    return stockData.map((stock, index) => (
      <div key={index} className="stock-graph">
        <h3>{stock['Meta Data']['2. Symbol']}</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formatStockData(stock)} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="high" stroke="#8884d8" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    ));
  };

  const formatStockData = (stock) => {
    try {
      const timeSeriesKey = interval === 'day' ? 'Time Series (Daily)' :
                              interval === 'week' ? 'Weekly Time Series' :
                              interval === 'month' ? 'Monthly Time Series' :
                              interval === 'intraday' ? 'Time Series (5min)' : '';
  
      const timeSeries = stock[timeSeriesKey];
      return Object.keys(timeSeries).map(date => ({
        date: new Date(date).toISOString().split('T')[0],
        high: parseFloat(timeSeries[date]['2. high'])
      })).sort((a, b) => new Date(a.date) - new Date(b.date));
    } catch (error) {
      setError("Error parsing API response: " + error.message);
      return [];
    }
  };

  const handleSaveStock = async () => {
    try {
      if (!stockData || !interval) {
        throw new Error("Stock data or interval is not available.");
      }

      const timeSeriesKey = interval === 'day' ? 'Time Series (Daily)' :
                             interval === 'week' ? 'Weekly Time Series' :
                             interval === 'month' ? 'Monthly Time Series' :
                             interval === 'intraday' ? 'Time Series (5min)' : '';

      const timeSeries = stockData[0][timeSeriesKey];
      const metaData = stockData[0]['Meta Data'];
      const company = metaData['2. Symbol'];
      const dates = Object.keys(timeSeries).slice(0, 100);
      const highs = Object.values(timeSeries).slice(0, 100).map(data => data['2. high']);

      if (auth.user) {
        const existingStock = await StockDataService.getStockByCompany(auth.user.uid, company);
        if (existingStock) {
          await StockDataService.updateStock(auth.user.uid, existingStock.id, dates, highs, interval);
          console.log("Existing stock updated successfully!");
        } else {
          await StockDataService.addStockToUser(auth.user.uid, company, dates, highs, interval);
          console.log("New stock added to user successfully!");
        }

        setError(null);
        setStockData(null);
        setSymbol('');
        setInterval(null);
      } else {
        throw new Error("User not authenticated.");
      }
    } catch (error) {
      setError(error.message);
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
          className="search-bar"
        />
      </label>
      <div className="button-container">
        <button onClick={() => handleGetStockData('intraday')} className={`button ${selectedButton === 'intraday' ? 'active' : ''}`}>Intraday</button>
        <button onClick={() => handleGetStockData('day')} className={`button ${selectedButton === 'day' ? 'active' : ''}`}>Day</button>
        <button onClick={() => handleGetStockData('week')} className={`button ${selectedButton === 'week' ? 'active' : ''}`}>Week</button>
        <button onClick={() => handleGetStockData('month')} className={`button ${selectedButton === 'month' ? 'active' : ''}`}>Month</button>
        <button onClick={handleSaveStock} disabled={!interval} className="button">Save Stock</button>
      </div>

      {renderStockGraphs()}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default AddStock;
