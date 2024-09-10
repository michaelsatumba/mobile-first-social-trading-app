import React, { useState } from 'react';

const Comments = () => {
  const [comments, setComments] = useState([
    { id: 1, text: 'Great project!', user: 'User1' },
    { id: 2, text: 'Looking forward to more updates.', user: 'User2' },
  ]);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <ul className="space-y-2">
        {comments.map((comment) => (
          <li key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-2">
            <strong className="text-black dark:text-white">{comment.user}:</strong> {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;