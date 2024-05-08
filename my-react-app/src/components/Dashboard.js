import React, { useState, useEffect } from 'react';
import StockDataService from '../services/stock-services';
import { useAuth } from './AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AddStock.css';

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);
  const auth = useAuth();
  const [selectedStockType, setSelectedStockType] = useState(null);

  useEffect(() => {
    if (auth.user) {
      fetchStocks(auth.user.uid, selectedStockType);
    }
  }, [auth.user, selectedStockType]);

  const fetchStocks = async (userId, stockType) => {
    try {
      const stocksData = await StockDataService.fetchStocks(userId, stockType);
      if (stocksData && stocksData.length > 0) {
        setStocks(stocksData);
      } else {
        setError("No stocks available.");
      }
    } catch (error) {
      console.error("Error fetching stocks:", error);
      setError("Failed to fetch stocks. Please try again later.");
    }
  };


// Function to render stock graphs based on fetched data
const renderStockGraphs = () => {
  try {
    if (!stocks || stocks.length === 0) return null;

    return stocks.map((stock, index) => {
      const formattedStockData = formatStockData(stock);

      if (formattedStockData.length === 0) {
        return null; // Skip rendering if there's no formatted stock data
      }

      const lastHigh = formattedStockData[formattedStockData.length - 1].high;
      const totalValue = lastHigh * stock.sharesOwned;

      return (
        <div key={index} className="stock-container">
          <div className="stock-graph">
            <h3>{stock.company}</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={formattedStockData}
                margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} />
                <YAxis domain={[0, 'auto']} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="high" stroke="#8884d8" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="stock-info">
            <label htmlFor={`shares-input-${index}`}>Enter Number of Shares:</label>
            <input 
              type="number"
              id={`shares-input-${index}`}
              value={stock.sharesOwned}
              onChange={(e) => handleSharesChange(index, e.target.value)}
            />
            <p>Total Value: ${totalValue.toFixed(2)}</p>
          </div>
        </div>
      );
    });
  } catch (error) {
    return (
      <div className="error-message">
        Error: {error.message}
      </div>
    );
  }
};


// Function to handle change in number of shares owned
const handleSharesChange = (index, value) => {
  const updatedStocks = [...stocks];
  updatedStocks[index].sharesOwned = value;
  setStocks(updatedStocks);
};


  const formatStockData = (stock) => {
    try {
      return stock.dates.map((date, index) => ({ 
        date: new Date(date),
        high: stock.highs[index]
      })).sort((a, b) => a.date - b.date);
    } catch (error) {
      setError("Error parsing stock data: " + error.message);
      return [];
    }
  };

  const handleButtonClick = (type) => {
    setSelectedStockType(type);
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="button-container">
        {['intraday', 'day', 'week', 'month'].map(type => (
          <button key={type} onClick={() => handleButtonClick(type)} className={`button ${selectedStockType === type ? 'active' : ''}`}>{type}</button>
        ))}
      </div>
      <div className="stocks-chart">
        {renderStockGraphs()}
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Dashboard;
