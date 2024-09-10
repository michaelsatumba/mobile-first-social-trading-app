import React, { useState } from 'react';

const Comments = () => {
  const [comments, setComments] = useState([
    { id: 1, text: 'Great project!', user: 'User1' },
    { id: 2, text: 'Looking forward to more updates.', user: 'User2' },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const newCommentObj = {
      id: comments.length + 1,
      text: newComment,
      user: 'User3', // Replace with dynamic user if available
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

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
      <form onSubmit={handleAddComment} className="mt-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 p-2 w-full bg-white dark:bg-gray-800 text-black dark:text-white rounded-md"
          placeholder="Add a comment"
        />
        <button
          type="submit"
          className={`mt-2 p-2 w-full rounded-md ${newComment.trim() ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          disabled={!newComment.trim()}
        >
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default Comments;