import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3/coins/solana';

export const fetchSolanaData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching Solana data:', error);
    throw error;
  }
};