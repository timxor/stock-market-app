import React, { useState, useEffect } from 'react';
import StockDataService from '../services/stock-services';
import { useAuth } from './AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useAuth(); // Access current user
  const [selectedStockType, setSelectedStockType] = useState(null);

  useEffect(() => {
    if (auth.user) {
      fetchStocks(auth.user.uid, selectedStockType);
    }
  }, [auth.user, selectedStockType]);

  const fetchStocks = async (userId, stockType) => {
    setLoading(true);
    try {
      let stocksCollectionRef;
      switch (stockType) {
        case 'day':
          stocksCollectionRef = await StockDataService.getStocksDay(userId);
          break;
        case 'week':
          stocksCollectionRef = await StockDataService.getStocksWeek(userId);
          break;
        case 'month':
          stocksCollectionRef = await StockDataService.getStocksMonth(userId);
          break;
        case 'intraday':
          stocksCollectionRef = await StockDataService.getStocksIntraday(userId);
          break;
        default:
          break;
      }
      if (stocksCollectionRef) {
        const stocksData = stocksCollectionRef.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStocks(stocksData);
      }
    } catch (error) {
      console.error("Error fetching stocks:", error);
      setError("Failed to fetch stocks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (type) => {
    setSelectedStockType(type);
  };

  const transformStockData = (stocks) => {
    return stocks.map(stock => {
      return stock.dates.map((date, index) => ({ // Limit to first 20 dates
        date: new Date(date), // Convert date string to Date object
        high: stock.highs[index]
      })).sort((a, b) => a.date - b.date);;
    });
  };
  

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="buttons-container">
        <button onClick={() => handleButtonClick('intraday')}>Intraday</button>
        <button onClick={() => handleButtonClick('day')}>Day</button>
        <button onClick={() => handleButtonClick('week')}>Week</button>
        <button onClick={() => handleButtonClick('month')}>Month</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="stocks-chart">
          {stocks.length > 0 ? (
            <LineChart width={800}
            height={400}
            data={stocks[0]?.data || []}
            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {transformStockData(stocks).map((stockData, index) => (
                <Line
                  key={index}
                  type="monotone"
                  data={stockData}
                  dataKey="high"
                  stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
                  name={stocks[index].company}
                  dot={false}
                />
              ))}
            </LineChart>
          ) : (
            <p>No stocks available.</p>
          )}
        </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Dashboard;
