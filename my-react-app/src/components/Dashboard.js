import React, { useState, useEffect } from 'react';
import StockDataService from '../services/stock-services';
import { useAuth } from './AuthContext';

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
        case 'year':
          stocksCollectionRef = await StockDataService.getStocksYear(userId);
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

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="buttons-container">
        <button onClick={() => handleButtonClick('day')}>Day</button>
        <button onClick={() => handleButtonClick('week')}>Week</button>
        <button onClick={() => handleButtonClick('month')}>Month</button>
        <button onClick={() => handleButtonClick('year')}>Year</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="stocks-list">
          {stocks.length > 0 ? (
            <ul>
              {stocks.map(stock => (
                <li key={stock.id}>
                  Company: {stock.company}, Dates: {stock.dates.join(', ')}, Highs: {stock.highs.join(', ')}
                </li>
              ))}
            </ul>
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
