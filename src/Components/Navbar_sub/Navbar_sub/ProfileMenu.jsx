import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
export const ProfileMenu = ({ handleLogout }) => {
  const [userInitial, setUserInitial] = useState('');
  const [gradientClass, setGradientClass] = useState('');

  const getGradientClass = (userName) => {
    // Map of letters to specific gradients
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

    // Get first letter and convert to uppercase
    const firstLetter = userName.charAt(0).toUpperCase();
    
    // Get gradient or use default if letter not found
    const gradient = gradientMap[firstLetter] || 'from-gray-500 via-gray-600 to-gray-700';
    
    console.log('Username:', userName);
    console.log('First Letter:', firstLetter);
    console.log('Selected gradient:', gradient);
    
    return gradient;
  };

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);
        const initial = decoded.userName.charAt(0).toUpperCase();
        setUserInitial(initial);
        const gradient = getGradientClass(decoded.userName);
        setGradientClass(gradient);
      } catch (error) {
        console.error('Error processing token:', error);
      }
    }
  }, []);

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
        <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r ${gradientClass}`}>
          <span className="text-white font-bold text-lg">
            {userInitial}
          </span>
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 
                            rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link to="/profile" className={`${
                  active ? 'bg-gray-100 dark:bg-gray-700' : ''
                } flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                  <FaUserCircle className="mr-3 w-5 h-5" />
                  Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link to="/settings" className={`${
                  active ? 'bg-gray-100 dark:bg-gray-700' : ''
                } flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                  <FaCog className="mr-3 w-5 h-5" />
                  Settings
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400`}
                >
                  <FaSignOutAlt className="mr-3 w-5 h-5" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}; 