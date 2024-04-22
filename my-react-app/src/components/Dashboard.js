import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import StockDataService from '../services/stock-services'; // Import custom StockDataService module
import { useAuth } from './AuthContext'; // Import useAuth hook from AuthContext module
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Import necessary components from recharts library
import './AddStock.css'; // Import custom CSS for styling

// Define Dashboard functional component
const Dashboard = () => {
  // Define state variables using useState hook
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);
  const auth = useAuth(); // Access current user using useAuth hook
  const [selectedStockType, setSelectedStockType] = useState(null);

  // useEffect hook to fetch stocks data when user changes or selectedStockType changes
  useEffect(() => {
    if (auth.user) {
      fetchStocks(auth.user.uid, selectedStockType); // Call fetchStocks function with userId and selectedStockType
    }
  }, [auth.user, selectedStockType]); // Dependencies: auth.user and selectedStockType

  // Function to fetch stocks data based on userId and stockType
  const fetchStocks = async (userId, stockType) => {
    try {
      const stocksData = await StockDataService.fetchStocks(userId, stockType); // Fetch stocks data
      if (stocksData && stocksData.length > 0) {
        setStocks(stocksData); // Set stocks state variable with fetched data if available
      } else {
        setError("No stocks available."); // Set error message if no stocks available
      }
    } catch (error) {
      console.error("Error fetching stocks:", error); // Log error if fetching stocks fails
      setError("Failed to fetch stocks. Please try again later."); // Set error message for failed fetch
    }
  };

  // Function to handle button click and set selected stock type
  const handleButtonClick = (type) => {
    setSelectedStockType(type); // Set selected stock type
  };

  // Function to transform stock data for rendering
  const transformStockData = (stock) => {
    return stock.dates.map((date, index) => ({ 
      date: new Date(date), // Convert date string to Date object
      high: stock.highs[index]
    })).sort((a, b) => a.date - b.date);
  };

  // Render JSX for Dashboard component
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="button-container">
        {/* Buttons to select stock type */}
        <button onClick={() => handleButtonClick('intraday')} className={`button ${selectedStockType === 'intraday' ? 'active' : ''}`}>Intraday</button>
        <button onClick={() => handleButtonClick('day')} className={`button ${selectedStockType === 'day' ? 'active' : ''}`}>Day</button>
        <button onClick={() => handleButtonClick('week')} className={`button ${selectedStockType === 'week' ? 'active' : ''}`}>Week</button>
        <button onClick={() => handleButtonClick('month')} className={`button ${selectedStockType === 'month' ? 'active' : ''}`}>Month</button>
      </div>
      <div className="stocks-chart">
        {stocks.length > 0 ? (
          // Render line chart for each stock
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
                {/* Render line with random color */}
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
          <p>No stocks available.</p> // Render if no stocks available
        )}
      </div>
      {/* Render error message if error exists */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Dashboard; // Export Dashboard component as default
