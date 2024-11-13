import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const Welcome = () => {
  const [userName, setUserName] = useState('');
  const [gradientClass, setGradientClass] = useState('');

  const getGradientClass = (userName) => {
    const gradientMap = {
      'A': 'from-red-500 via-orange-500 to-yellow-500',
      'B': 'from-blue-500 via-purple-500 to-pink-500',
      'C': 'from-green-500 via-emerald-500 to-teal-500',
      'D': 'from-indigo-500 via-blue-500 to-cyan-500',
      'E': 'from-rose-500 via-pink-500 to-purple-500',
      'F': 'from-amber-500 via-orange-500 to-red-500',
      'G': 'from-teal-500 via-cyan-500 to-blue-500',
      'H': 'from-violet-500 via-purple-500 to-fuchsia-500',
      'I': 'from-yellow-500 via-green-500 to-teal-500',
      'J': 'from-purple-500 via-violet-500 to-indigo-500',
      'K': 'from-pink-500 via-rose-500 to-red-500',
      'L': 'from-cyan-500 via-blue-500 to-indigo-500',
      'M': 'from-orange-500 via-red-500 to-rose-500',
      'N': 'from-emerald-500 via-green-500 to-lime-500',
      'O': 'from-fuchsia-500 via-pink-500 to-rose-500',
      'P': 'from-blue-500 via-indigo-500 to-violet-500',
      'Q': 'from-red-500 via-pink-500 to-purple-500',
      'R': 'from-teal-500 via-emerald-500 to-green-500',
      'S': 'from-yellow-500 via-amber-500 to-orange-500',
      'T': 'from-purple-500 via-blue-500 to-cyan-500',
      'U': 'from-rose-500 via-red-500 to-orange-500',
      'V': 'from-indigo-500 via-violet-500 to-purple-500',
      'W': 'from-green-500 via-teal-500 to-cyan-500',
      'X': 'from-pink-500 via-fuchsia-500 to-purple-500',
      'Y': 'from-orange-500 via-yellow-500 to-amber-500',
      'Z': 'from-blue-500 via-cyan-500 to-teal-500'
    };

    const firstLetter = userName.charAt(0).toUpperCase();
    return gradientMap[firstLetter] || 'from-gray-500 via-gray-600 to-gray-700';
  };

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      const decoded = jwtDecode(token);
      const name = decoded.userName.split(' ')[0];
      setUserName(name);
      setGradientClass(getGradientClass(name));
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center shadow-lg`}>
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
