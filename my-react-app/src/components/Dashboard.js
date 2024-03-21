// Dashboard.js
import React, { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db, auth } from './firebase-config';

const Dashboard = () => {
  const [userStocks, setUserStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStocks = async () => {
      try {
        const userId = auth.currentUser.uid;

        const userStocksQuery = query(collection(db, `users/${userId}/stocks`));

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

    fetchUserStocks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {userStocks.map(stock => (
          <li key={stock.id}>
            <h3>{stock.data.company}</h3>
            <p>Date: {stock.data.date}</p>
            <p>High: {stock.data.high}</p>
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
