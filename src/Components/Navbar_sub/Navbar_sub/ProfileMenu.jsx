import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
export const ProfileMenu = ({ handleLogout }) => {
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUserInitial(decoded.userName.charAt(0));
    }
  }, []);

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
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