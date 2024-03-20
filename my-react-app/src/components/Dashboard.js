import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import StockDataService from '../services/stock-services';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [userStocks, setUserStocks] = useState([]);

  useEffect(() => {
    const fetchUserStocks = async () => {
      try {
        // Assuming user's stocks are stored under their UID in Firestore
        const querySnapshot = await StockDataService.getUserStocks(currentUser.uid);
        const stocks = [];
        querySnapshot.forEach((doc) => {
          // Assuming each document contains stock information
          stocks.push({ id: doc.id, ...doc.data() });
        });
        setUserStocks(stocks);
        console.log('Snapshot:', querySnapshot);

      } catch (error) {
        console.error('Error fetching user stocks:', error);
      }
    };

    if (currentUser) {
      fetchUserStocks();
    }
  }, [currentUser]);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Saved Stocks:</h3>
        <ul>
          {userStocks.map((stock) => (
            <li key={stock.id}>
              <p>Company: {stock.company}</p>
              <p>Date: {stock.date}</p>
              <p>High: {stock.high}</p>
              {/* Display other stock information as needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
