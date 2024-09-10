import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const generateRandomData = (range) => {
  const data = [];
  const now = new Date();
  for (let i = 0; i < range; i++) {
    const date = new Date(now);
    if (range === 365) {
      date.setDate(now.getDate() - i * 7); // Generate data points for every week
    } else {
      date.setDate(now.getDate() - i);
    }
    data.push({
      date: date.toISOString(),
      price: (Math.random() * 10000).toFixed(2), // Random price between 0 and 100
    });
  }
  return data.reverse();
};

const MainFeed = ({ theme }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Portfolio Value (USD)',
        data: [],
        borderColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
        backgroundColor: theme === 'light' ? 'rgba(75,192,192,0.2)' : 'rgba(255,99,132,0.2)',
        pointBackgroundColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
        fill: false,
      },
    ],
  });
  const [range, setRange] = useState(1); // State for selected data range (1 day, 7 days, 30 days, or 1 year)
  const [metrics, setMetrics] = useState({ currentPrice: 0, highestPrice: 0, lowestPrice: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const historicalData = generateRandomData(range === 1 ? 24 : range === 7 ? 7 : range === 30 ? 30 : 52); // Generate random data based on selected range
      const filteredData = historicalData.filter((_, index) => {
        if (range === 1) return index % 2 === 0; // Filter for hourly data if range is 1 day
        if (range === 7) return true; // No filter for 7 days
        if (range === 30) return index % 1 === 0; // No filter for daily data if range is 30 days
        if (range === 365) return true; // No filter for weekly data if range is 1 year
      });

      const prices = filteredData.map(item => parseFloat(item.price));
      setMetrics({
        currentPrice: prices[prices.length - 1],
        highestPrice: Math.max(...prices),
        lowestPrice: Math.min(...prices),
      });

      setData({
        labels: filteredData.map(item => range === 1 ? new Date(item.date).toLocaleTimeString() : new Date(item.date).toLocaleDateString()), // Format labels based on range
        datasets: [
          {
            label: 'Portfolio Value (USD)',
            data: prices,
            borderColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
            backgroundColor: theme === 'light' ? 'rgba(75,192,192,0.2)' : 'rgba(255,99,132,0.2)',
            pointBackgroundColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
            fill: false,
          },
        ],
      });
    };

    fetchData();
  }, [range]);

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      datasets: prevData.datasets.map(dataset => ({
        ...dataset,
        borderColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
        backgroundColor: theme === 'light' ? 'rgba(75,192,192,0.2)' : 'rgba(255,99,132,0.2)',
        pointBackgroundColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
        pointHoverBorderColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
      })),
    }));
  }, [theme]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Investing</h2>
      <div className={`rounded-lg p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-md mb-4`}>
        <Line data={data} />
      </div>
      <div className="flex space-x-4 justify-center">
        <button
          onClick={() => setRange(1)}
          className={`px-4 py-2 ${range === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded`}
        >
          24 Hours
        </button>
        <button
          onClick={() => setRange(7)}
          className={`px-4 py-2 ${range === 7 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded`}
        >
          7 Days
        </button>
        <button
          onClick={() => setRange(30)}
          className={`px-4 py-2 ${range === 30 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded`}
        >
          1 Month
        </button>
        <button
          onClick={() => setRange(365)}
          className={`px-4 py-2 ${range === 365 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded`}
        >
          1 Year
        </button>
      </div>
      <div className="flex justify-between mt-4">
        <span>Buying power</span>
        <span>$800 &rarr;</span>
      </div>
      <div className="overflow-auto h-72">
        <div className="flex justify-between mt-4">
          <div className="flex flex-col">
            <span>SOL</span>
            <span className="text-xs">10 SOL</span>
          </div>
          <span>$2000</span>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex flex-col">
            <span>BTC</span>
            <span className="text-xs">0.5 BTC</span>
          </div>
          <span>$25000</span>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex flex-col">
            <span>ETH</span>
            <span className="text-xs">2 ETH</span>
          </div>
          <span>$6000</span>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex flex-col">
            <span>ADA</span>
            <span className="text-xs">1000 ADA</span>
          </div>
          <span>$1500</span>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex flex-col">
            <span>XRP</span>
            <span className="text-xs">500 XRP</span>
          </div>
          <span>$600</span>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex flex-col">
            <span>LTC</span>
            <span className="text-xs">20 LTC</span>
          </div>
          <span>$3000</span>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex flex-col">
            <span>BCH</span>
            <span className="text-xs">5 BCH</span>
          </div>
          <span>$2500</span>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex flex-col">
            <span>DOT</span>
            <span className="text-xs">200 DOT</span>
          </div>
          <span>$4000</span>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex flex-col">
            <span>LINK</span>
            <span className="text-xs">100 LINK</span>
          </div>
          <span>$2500</span>
        </div>
      </div>
    </div>
  );
};

export default MainFeed;