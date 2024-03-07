import { db } from '../components/firebase-config'
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
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
      
    addStock = (newStock) => {
        return addDoc(stockCollectionRef, newStock);
    }

    updateStock = (id, newStock) => {
        const stockDoc = doc(db, 'stock');
        return updateDoc(stockDoc, newStock);
    };

    deleteStock = (id, newStock) => {
        const stockDoc = doc(db, 'stock');
        return deleteDoc(stockDoc);
    };

    getAllStocks = () => {
        return getDocs(stockCollectionRef);
    }

    getStock = (id) => {
        const stockDoc = doc(db, 'stock', id);
        return getDoc(stockDoc);
    };

    //getHigh = (stockName, date){
        
   // }
}

export default new StockDataService();