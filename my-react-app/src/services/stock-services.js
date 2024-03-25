import { db } from '../components/firebase-config'
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc, query, where } from 'firebase/firestore'
const stockCollectionRef = collection(db, 'stocks');

const apiKey = 'SF2U3E47WRBLTDU8';
const symbol = 'MSFT'; // Replace with the desired stock symbol

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+ symbol +'&apikey=' + apiKey;
var response = "hi";
// Simulate API call delay (remove this in a real application)

class StockDataService{
  getStockData = async (symbol) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data for symbol ${symbol}:`, error);
      throw error; // Rethrow the error for handling in the calling code
    }
  };

  addStockToUser = async (userId, company, dates, highs) => {
    try {
      // Reference to the stocksWeek subcollection for the current user
      const stocksWeekCollectionRef = collection(db, 'users', userId, 'stocksWeek');
  
      // Check if the stocksWeek subcollection exists for the user
      const snapshot = await getDocs(stocksWeekCollectionRef);
      if (snapshot.empty) {
        // Create the stocksWeek subcollection if it doesn't exist
        await setDoc(doc(db, 'users', userId), { stocksWeek: true }, { merge: true });
      }
  
      // Add the stock document to the user's stocksWeek subcollection
      const newStockRef = await addDoc(stocksWeekCollectionRef, {
        company,
        dates,
        highs
      });
  
      console.log('New stock added with ID:', newStockRef.id);
    } catch (error) {
      console.error('Error adding stock:', error);
      throw error;
    }
  };
  
  

    updateStock = (id, newStock) => {
        const stockDoc = doc(db, 'stockWeek');
        return updateDoc(stockDoc, newStock);
    };

    deleteStock = (id, newStock) => {
        const stockDoc = doc(db, 'stockWeek');
        return deleteDoc(stockDoc);
    };

    async getUserStocks(userId) {
      try {
        // Reference the collection where user's stocks are stored
        const userStocksRef = collection(db, 'users', userId, 'stocks');
  
        // Get all documents from the user's "stocks" subcollection
        const querySnapshot = await getDocs(userStocksRef);
        console.log('Snapshot:', querySnapshot);
        return querySnapshot.docs.map(doc => doc.data());
      } catch (error) {
        console.error('Error fetching user stocks:', error);
        throw error; // Rethrow the error for handling in the calling code
      }
    }

    getStock = (id) => {
        const stockDoc = doc(db, 'stock', id);
        return getDoc(stockDoc);
    };

    //getHigh = (stockName, date){
        
   // }
}

export default new StockDataService();