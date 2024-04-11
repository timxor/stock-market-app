//import React, { useEffect, useState } from 'react';
const apiKey = "";
//const request = require('request');

class NewsDataService {
  async getNewsDataAddStock (symbol) {
    console.log('This is a message to be printed.');
    let url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&apikey=${apiKey}`;
    
    try {
      const response = await fetch(url);
      console.log(response);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(`Error fetching data for symbol ${symbol}:`, error);
      throw error; // Rethrow the error for handling in the calling code
    }
  }

}

export default new NewsDataService();
