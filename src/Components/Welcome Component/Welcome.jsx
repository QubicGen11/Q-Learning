import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const Welcome = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.userName.split(' ')[0]);
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-white">
              {userName.charAt(0)}
            </span>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {userName}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Ready to continue learning?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
