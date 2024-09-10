import React, { useEffect, useState } from 'react';
import { fetchSolanaData } from '../services/coinGeckoService';

const MainFeed = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const solanaData = await fetchSolanaData();
        console.log('Fetched data:', solanaData); // Debugging line
        setData(solanaData);
      } catch (error) {
        console.error('Error fetching data:', error); // Debugging line
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <div className="text-black dark:text-white">Loading...</div>;
  if (error) return <div className="text-red-500 dark:text-red-400">Error: {error.message}</div>;
  if (!data || !data.market_data) return <div className="text-black dark:text-white">No data available</div>;

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-2xl font-bold">Solana Price: ${data.market_data.current_price.usd}</h1>
      <p>24h Trading Volume: ${data.market_data.total_volume.usd}</p>
      <p>Market Cap: ${data.market_data.market_cap.usd}</p>
      <p>Circulating Supply: {data.market_data.circulating_supply}</p>
    </div>
  );
};

export default MainFeed;