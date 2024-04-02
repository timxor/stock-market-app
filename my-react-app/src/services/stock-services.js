import { db } from '../components/firebase-config';
import { collection, getDocs, addDoc, doc, setDoc } from 'firebase/firestore';

const apiKey = 'ML4ZZM2TS1V1DNRN';

class StockDataService {
  async getStockData(symbol, interval) {
    let url;
    if (interval === "day") {
      interval = "DAILY";
    } else if (interval === "week") {
      interval = "WEEKLY";
    } else if (interval === "month") {
      interval = "MONTHLY";
    } else {
      interval = "INTRADAY";
    }

    if (interval === "INTRADAY") {
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_${interval}&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
    } else {
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_${interval}&symbol=${symbol}&apikey=${apiKey}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data for symbol ${symbol}:`, error);
      throw error; // Rethrow the error for handling in the calling code
    }
  }

  async addStockToUser(userId, company, dates, highs, interval) {
    try {
      let collectionName = '';
      if (interval === "day") {
        collectionName = "stocksDay";
      } else if (interval === "week") {
        collectionName = "stocksWeek";
      } else if (interval === "month") {
        collectionName = "stocksMonth";
      } else {
        collectionName = "stocksIntraday";
      }

      // Reference to the stocks subcollection for the current user
      const stocksCollectionRef = collection(db, 'users', userId, collectionName);

      // Check if the stocks subcollection exists for the user
      const snapshot = await getDocs(stocksCollectionRef);
      if (snapshot.empty) {
        // Create the stocks subcollection if it doesn't exist
        await setDoc(doc(db, 'users', userId), { [collectionName]: true }, { merge: true });
      }

      // Add the stock document to the user's stocks subcollection
      const newStockRef = await addDoc(stocksCollectionRef, {
        company,
        dates,
        highs
      });

      console.log('New stock added with ID:', newStockRef.id);
    } catch (error) {
      console.error('Error adding stock:', error);
      throw error;
    }
  }
  async getStocksDay(userId) {
    const stocksCollectionRef = collection(db, 'users', userId, 'stocksDay');
    return await getDocs(stocksCollectionRef);
  }

  async getStocksWeek(userId) {
    const stocksCollectionRef = collection(db, 'users', userId, 'stocksWeek');
    return await getDocs(stocksCollectionRef);
  }

  async getStocksMonth(userId) {
    const stocksCollectionRef = collection(db, 'users', userId, 'stocksMonth');
    return await getDocs(stocksCollectionRef);
  }

  async getStocksIntraday(userId) {
    const stocksCollectionRef = collection(db, 'users', userId, 'stocksIntraday');
    return await getDocs(stocksCollectionRef);
  }
}

export default new StockDataService();
