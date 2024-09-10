import React, { useEffect, useState } from 'react';
import { fetchSolanaHistoricalData } from '../services/coinGeckoService';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const PortfolioOverview = ({ theme }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Solana Price (USD)',
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
      const historicalData = await fetchSolanaHistoricalData(range); // Fetch data based on selected range
      const filteredData = historicalData.filter((_, index) => {
        if (range === 1) return index % 2 === 0; // Filter for hourly data if range is 1 day
        if (range === 7) return true; // No filter for 7 days
        if (range === 30) return index % 24 === 0; // Filter for daily data if range is 30 days
        if (range === 365) return index % 24 === 0; // Filter for daily data if range is 1 year
      });

      const prices = filteredData.map(item => item.price);
      setMetrics({
        currentPrice: prices[prices.length - 1],
        highestPrice: Math.max(...prices),
        lowestPrice: Math.min(...prices),
      });

      setData({
        labels: filteredData.map(item => range === 1 ? new Date(item.date).toLocaleTimeString() : new Date(item.date).toLocaleDateString()), // Format labels based on range
        datasets: [
          {
            label: 'Solana Price (USD)',
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
      <h2 className="text-2xl font-bold mb-4 text-center">Solana</h2>
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
      <div className="flex justify-center mt-12">
        <button className={`px-4 py-2 rounded ${theme === 'light' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
          Buy Solana
        </button>
      </div>
    </div>
  );
};

export default PortfolioOverview;