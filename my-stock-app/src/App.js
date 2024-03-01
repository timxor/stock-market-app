// src/App.js
import React, { useEffect, useState } from 'react';
import Chart from './components/Chart.js';

const App = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual Alpha Vantage API key
    const apiKey = 'SF2U3E47WRBLTDU8';
    const symbol = 'MSFT'; // Replace with the desired stock symbol

    // Alpha Vantage API endpoint
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`;

    // Simulate API call delay (remove this in a real application)
    const delay = setTimeout(() => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Extracting data from Alpha Vantage response
          const timeSeries = data['Monthly Time Series'];
          const labels = Object.keys(timeSeries).reverse();
          const closePrices = labels.map((date) => parseFloat(timeSeries[date]['4. close']));

          // Creating the API response structure for the chart
          const apiResponse = {
            labels,
            datasets: [
              {
                label: 'Closing Prices',
                data: closePrices,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.4)',
              },
            ],
          };

          setApiData(apiResponse);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, 1000);

    // Cleanup timeout to avoid memory leaks
    return () => clearTimeout(delay);
  }, []);

  return (
    <div>
      <h1>Stock Price Chart</h1>
      {apiData && <Chart data={apiData} />}
    </div>
  );
};

export default App;
