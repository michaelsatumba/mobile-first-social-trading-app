import React from 'react';

const User = ({ theme }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <img
        src="https://via.placeholder.com/150"
        alt="User Logo"
        className="rounded-full w-32 h-32 mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">@User3</h2>
      <p className="text-lg">$10,000.96</p>
    </div>
  );
};

export default User;