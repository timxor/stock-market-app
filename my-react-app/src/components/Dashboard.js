import React, { useState, useEffect } from 'react';
import StockDataService from '../services/stock-services';
import { useAuth } from './AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './AddStock.css'; // Import custom CSS for styling

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);
  const auth = useAuth(); // Access current user
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
  

  const handleButtonClick = (type) => {
    setSelectedStockType(type);
  };

  const transformStockData = (stock) => {
    return stock.dates.map((date, index) => ({ 
      date: new Date(date), // Convert date string to Date object
      high: stock.highs[index]
    })).sort((a, b) => a.date - b.date);
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="button-container">
      <button onClick={() => handleButtonClick('intraday')} className={`button ${selectedStockType === 'intraday' ? 'active' : ''}`}>Intraday</button>
        <button onClick={() => handleButtonClick('day')} className={`button ${selectedStockType === 'day' ? 'active' : ''}`}>Day</button>
        <button onClick={() => handleButtonClick('week')} className={`button ${selectedStockType === 'week' ? 'active' : ''}`}>Week</button>
        <button onClick={() => handleButtonClick('month')} className={`button ${selectedStockType === 'month' ? 'active' : ''}`}>Month</button>
      </div>
      <div className="stocks-chart">
        {stocks.length > 0 ? (
          stocks.map((stock, index) => (
            <div key={index} className="stock-graph">
              <h3>{stock.company}</h3>
              <LineChart
                width={800}
                height={400}
                data={transformStockData(stock)}
                margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="high"
                  stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
                  name={stock.company}
                  dot={false}
                />
              </LineChart>
            </div>
          ))
        ) : (
          <p>No stocks available.</p>
        )}
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Dashboard;
