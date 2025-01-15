import React, { useState } from 'react';
import { displayToast } from '../Components/Common/Toast/Toast';

const ToastDemo = () => {
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const showToast = (type) => {
    displayToast(type, message || 'Default message', imageUrl);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Toast Demo</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Message:</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter toast message"
          />
        </div>

        <div>
          <label className="block mb-2">Image URL (optional):</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter image URL"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => showToast('info')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Show Info Toast
          </button>
          <button
            onClick={() => showToast('success')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Show Success Toast
          </button>
          <button
            onClick={() => showToast('error')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Show Error Toast
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToastDemo; 