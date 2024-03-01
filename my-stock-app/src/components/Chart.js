// src/components/Chart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ data }) => {
  return (
    <div>
      <Line
        data={data}
        options={{
          title: {
            display: true,
            text: 'Stock Price Over Time',
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        }}
      />
    </div>
  );
};

export default Chart;
