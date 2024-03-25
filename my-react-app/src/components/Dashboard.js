// Dashboard.js
import React, { useEffect, useState } from 'react';
import { getDocs, collection, query } from 'firebase/firestore';
import { db, auth } from './firebase-config';

const Dashboard = () => {
  const [userStocks, setUserStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('stocksWeek'); // Default filter is week

  useEffect(() => {
    const fetchUserStocks = async (filter) => {
      try {
        const userId = auth.currentUser.uid;
        const userStocksQuery = query(collection(db, `users/${userId}/${filter}`));
        const userStocksSnapshot = await getDocs(userStocksQuery);

        const stocksData = userStocksSnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }));

        setUserStocks(stocksData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user stocks:', error);
        setLoading(false);
      }
    };

    fetchUserStocks(filter);
  }, []);

  const filterStocks = (period) => {
    // Implement logic to filter stocks based on the selected period (week, month, year)
    // For example, you can filter the stocks array and update state accordingly
    setFilter(period);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <button onClick={() => filterStocks('stocksWeek')}>Week</button>
        <button onClick={() => filterStocks('stocksMonth')}>Month</button>
        <button onClick={() => filterStocks('stocksYear')}>Year</button>
      </div>
      <ul>
        {userStocks.map(stock => (
          <li key={stock.id}>
            <h3>{stock.data.company}</h3>
            <ul>
              {stock.data.dates.map((date, index) => (
                <li key={date}>
                  <p>Date: {date}</p>
                  <p>High: {stock.data.highs[index]}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
