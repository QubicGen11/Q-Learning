import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Drawer } from '@mui/material';
import { FiMenu } from 'react-icons/fi';
import { FaSun, FaMoon, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import Cookies from 'js-cookie';
import { SearchFilters } from '../Navbar_sub/Navbar_sub/SearchFilters';
import { ProfileMenu } from '../Navbar_sub/Navbar_sub/ProfileMenu';
import { MobileDrawer } from '../Navbar_sub/Navbar_sub/MobileDrawer';
import { AuthDialog } from '../Navbar_sub/Navbar_sub/AuthDialog';
import { toast } from 'react-hot-toast';
import useAuthStore from '../../store/authStore';

const Navbar_main = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const { sessionExpired, setSessionExpired, showStayLoggedIn, setShowStayLoggedIn, refreshSession } = useAuthStore();
  const isAuthenticated = !!Cookies.get('accessToken');

  useEffect(() => {
    let previousAuthState = isAuthenticated;

    const checkAuth = () => {
      const currentAuthState = !!Cookies.get('accessToken');
      
      if (previousAuthState && !currentAuthState) {
        const hasRefreshToken = !!Cookies.get('refreshToken');
        if (hasRefreshToken) {
          setShowStayLoggedIn(true);
        } else {
          setSessionExpired(true);
          toast.error('Session expired. Please login again.');
        }
      }
      
      previousAuthState = currentAuthState;
    };

    const intervalId = setInterval(checkAuth, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    window.location.reload(); // Force refresh after logout
  };

  const navItems = isAuthenticated ? [
    { text: 'Explore Courses', tooltip: 'View Your Courses', path: '/courses' },
    { text: 'My Learning', tooltip: 'View Your Courses', path: '/my-learning' },
    { text: 'Become an Instructor', tooltip: 'Start Teaching', path: '/instructor' },
  ] : [
    { text: 'Explore Courses', tooltip: 'Browse Our Courses', path: '/courses' },
    { text: 'Contact Us', tooltip: 'Contact Us', path: '/contact' },
    { text: 'About Us', tooltip: 'Access Resources', path: '/resources' }
  ];

  const SessionExpiredDialog = () => (
    <AuthDialog
      open={sessionExpired}
      onClose={() => {
        setSessionExpired(false);
        setLoginDialogOpen(true);
      }}
      title="Session Expired"
      customContent={
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Your session has expired</h2>
          <p className="mb-6">Please login again to continue.</p>
          <button
            onClick={() => {
              setSessionExpired(false);
              setLoginDialogOpen(true);
            }}
            className="px-6 py-2 bg-[#5624d0] text-white rounded-md hover:bg-[#4c1fb1]"
          >
            Login
          </button>
        </div>
      }
    />
  );

  const StayLoggedInDialog = () => (
    <AuthDialog
      open={showStayLoggedIn}
      onClose={() => {
        setShowStayLoggedIn(false);
        setSessionExpired(true);
      }}
      title="Stay Logged In?"
      customContent={
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Would you like to stay logged in?</h2>
          <p className="mb-6">Your session has expired, but we can keep you logged in.</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                refreshSession();
                toast.success('Session extended successfully');
              }}
              className="px-6 py-2 bg-[#5624d0] text-white rounded-md hover:bg-[#4c1fb1]"
            >
              Stay Logged In
            </button>
            <button
              onClick={() => {
                setShowStayLoggedIn(false);
                handleLogout();
              }}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Logout
            </button>
          </div>
        </div>
      }
    />
  );

  return (
    <>
      <div className="h-16"></div>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 
                      fixed top-0 left-0 right-0 z-50 transition-colors duration-200">
        <div className="max-w-full mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">
            {/* Left Section */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                  <span className="text-[#fa4616]">Q</span>
                  <span className="dark:text-white">LMS</span>
                </span>
              </Link>

              <button 
                onClick={() => setMobileOpen(true)}
                className="ml-2 lg:hidden p-2 sm:p-3 hover:bg-gray-100 
                           dark:hover:bg-gray-800 rounded-full"
              >
                <FiMenu className="w-5 h-5 sm:w-6 sm:h-6 dark:text-white" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="hidden sm:flex flex-grow max-w-3xl mx-4 lg:mx-8">
              <div className="relative flex w-full items-center h-10 sm:h-12 
                            border border-gray-900 dark:border-gray-600 
                            bg-[#f8fafb] dark:bg-gray-800">
                <SearchFilters />
                <div className="flex-grow flex items-center">
                  <input
                    type="text"
                    placeholder="Search for Courses"
                    className="w-full h-full pl-2 sm:pl-4
                              bg-transparent
                              text-sm text-gray-900 dark:text-gray-100
                              focus:outline-none
                              placeholder-gray-600 dark:placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center sm:gap-2">
              <div className="hidden lg:flex items-center">
                {navItems.map((item, index) => (
                  <Link key={index} to={item.path}>
                    <button className="px-2 sm:px-3 py-2 text-xs sm:text-sm 
                                     whitespace-nowrap hover:text-[#5624d0] 
                                     dark:text-gray-200 dark:hover:text-gray-50">
                      {item.text}
                    </button>
                  </Link>
                ))}
              </div>

              <button
                onClick={toggleDarkMode}
                className="p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                {isDarkMode ? 
                  <FaSun className="w-5 h-5 text-white" /> : 
                  <FaMoon className="w-5 h-5" />
                }
              </button>

              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Link to="/wishlist">
                    <button className="p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                      <FaHeart className="w-5 h-5 sm:w-6 sm:h-6 dark:text-white" />
                    </button>
                  </Link>

                  <Link to="/cart">
                    <button className="p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative">
                      <FaShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 dark:text-white" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                                     text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 
                                     flex items-center justify-center">
                        0
                      </span>
                    </button>
                  </Link>

                  <ProfileMenu handleLogout={handleLogout} />
                </div>
              ) : (
                <div className="flex items-center sm:gap-2 space-x-2">
                  <button
                    onClick={() => setLoginDialogOpen(true)}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-bold 
                             border border-gray-900 dark:border-white 
                             hover:bg-[#f8fafb] dark:hover:bg-gray-800"
                  >
                    Log in
                  </button>

                  <button
                    onClick={() => setSignupDialogOpen(true)}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-bold 
                             text-white bg-gray-900 dark:bg-white dark:text-gray-900 
                             border border-gray-900 dark:border-white 
                             hover:bg-gray-800 dark:hover:bg-gray-100"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          <div className="sm:hidden pb-2 px-2">
            <div className="relative flex items-center h-10 border border-gray-900 
                          dark:border-gray-600 bg-[#f8fafb] dark:bg-gray-800">
              <input
                type="text"
                placeholder="Search for Courses"
                className="w-full h-full pl-4 pr-10 bg-transparent
                          text-sm text-gray-900 dark:text-gray-100
                          focus:outline-none
                          placeholder-gray-600 dark:placeholder-gray-400"
              />
              <button className="absolute right-2 p-2">
                <svg className="w-5 h-5 dark:text-white" fill="none" 
                     stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true
        }}
      >
        <MobileDrawer 
          navItems={navItems}
          location={location}
          setMobileOpen={setMobileOpen}
        />
      </Drawer>

      <StayLoggedInDialog />
      <SessionExpiredDialog />
      <AuthDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        title="Sign In"
        isSignUp={false}
      />
      <AuthDialog
        open={signupDialogOpen}
        onClose={() => setSignupDialogOpen(false)}
        title="Sign Up"
        isSignUp={true}
      />
    </>
  );
}

export default Navbar_main;