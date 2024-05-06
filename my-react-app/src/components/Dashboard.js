import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import StockDataService from '../services/stock-services'; // Import custom StockDataService module
import { useAuth } from './AuthContext'; // Import useAuth hook from AuthContext module
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Import necessary components from recharts library
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

  // Function to render stock graphs based on fetched data
  const renderStockGraphs = () => {
    try {
      // Return null if no stocks available
      if (!stocks || stocks.length === 0) return null;

      // Calculate the maximum high value among all stocks
      const maxHigh = Math.max(...stocks.flatMap(stock => stock.highs));

      // Render graph for each stock in stocks array
      return stocks.map((stock, index) => (
        <div key={index} className="stock-graph">
          <h3>{stock.company}</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={formatStockData(stock)}
              margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} />
              <YAxis domain={[0, maxHigh]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="high" stroke="#8884d8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ));
    } catch (error) {
      // Handle chart generation error
      return (
        <div className="error-message">
          Error: Out Of API Calls
        </div>
      );
    }
  };

  // Function to format stock data for rendering
  const formatStockData = (stock) => {
    try {
      return stock.dates.map((date, index) => ({ 
        date: new Date(date), // Convert date string to Date object
        high: stock.highs[index]
      })).sort((a, b) => a.date - b.date);
    } catch (error) {
      // Handle errors by setting error state variable
      setError("Error parsing stock data: " + error.message);
      return [];
    }
  };

  // Function to handle button click and set selected stock type
  const handleButtonClick = (type) => {
    setSelectedStockType(type); // Set selected stock type
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
        {/* Render stock graphs */}
        {renderStockGraphs()}
      </div>
      {/* Render error message if error exists */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Dashboard; // Export Dashboard component as default
