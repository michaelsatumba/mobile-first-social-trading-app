import React from 'react';

const PortfolioOverview = () => {
  // Use mock data for demonstration
  const portfolio = [
    { name: 'Solana', amount: 10, value: 1000 },
    { name: 'Bitcoin', amount: 0.5, value: 25000 },
  ];

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-xl font-bold mb-4">Portfolio Overview</h2>
      <ul className="space-y-2">
        {portfolio.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.name}: {item.amount}</span>
            <span>${item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioOverview;