import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const User = ({ theme }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <FontAwesomeIcon icon={faUser} size="3x"/>
      <h2 className="text-2xl font-bold mb-2">@User3</h2>
      <p className="text-lg">$10,000.96</p>
    </div>
  );
};

export default User;