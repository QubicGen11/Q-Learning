import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, Drawer, Dialog, DialogContent, DialogTitle, Fade } from '@mui/material';
import { styled } from '@mui/system';
import { FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon, FaUser, FaChalkboardTeacher, FaArrowLeft, FaGithub, FaGoogle, FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
// Updated NavLink styled component with dark mode
const NavLink = styled(Link)(({ isActive, theme }) => ({
  position: 'relative',
  color: isActive ? '#0d47a1' : 'inherit',
  textDecoration: 'none',
  fontSize: '11px',
  fontWeight: '500',
  fontFamily: 'sans-serif',
  margin: '0 10px',
  padding: '4px 0',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '2px',
    bottom: 0,
    left: 0,
    backgroundColor: '#0d47a1',
    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
    transformOrigin: 'bottom left',
    transition: 'transform 0.25s ease-out'  
  },
  '&:hover': {
    color: '#0d47a1',
    '&:after': {
      transform: 'scaleX(1)',
      transformOrigin: 'bottom left'
    }
  }
}));

const AuthDialog = ({ open, onClose, title, isSignUp }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const socialProviders = [
    { id: 'email', name: 'Email', icon: <FaEnvelope className="w-5 h-5" />, primary: true },
    { id: 'github', name: 'GitHub', icon: <FaGithub className="w-5 h-5" /> },
    { id: 'google', name: 'Google', icon: <FaGoogle className="w-5 h-5" /> },
    { id: 'facebook', name: 'Facebook', icon: <FaFacebook className="w-5 h-5" /> },
    { id: 'twitter', name: 'Twitter', icon: <FaTwitter className="w-5 h-5" /> },
    { id: 'linkedin', name: 'LinkedIn', icon: <FaLinkedin className="w-5 h-5" /> }
  ];

  const roleProviders = [
    { 
      name: 'Student', 
      icon: <FaUser className="w-5 h-5" />, 
      description: isSignUp ? 'Start your learning journey' : 'Access your courses and continue learning'
    },
    { 
      name: 'Instructor', 
      icon: <FaChalkboardTeacher className="w-5 h-5" />, 
      description: isSignUp ? 'Create and manage courses' : 'Manage your content and students'
    }
  ];

  // Smoother animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.98
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  const EmailForm = ({ isSignUp }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Enter your email"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder={isSignUp ? "Create password" : "Enter password"}
        />
      </div>
      
      {/* Show Confirm Password only for Sign Up */}
      {isSignUp && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Confirm password"
          />
        </div>
      )}

      {/* Show Forgot Password link only for Sign In */}
      {!isSignUp && (
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Forgot Password?
          </motion.button>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        {isSignUp ? "Create Account" : "Sign In"}
      </motion.button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Login Icons */}
      <div className="flex justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <FaGoogle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <FaGithub className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <FaFacebook className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <FaTwitter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <FaLinkedin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <Dialog 
      open={open} 
      onClose={() => {
        onClose();
        setSelectedRole(null);
        setShowEmailForm(false);
      }}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 500 }}
      PaperProps={{
        className: 'rounded-lg overflow-hidden',
        style: { minWidth: '500px' }
      }}
    >
      <motion.div
        initial={false}
        animate={{
          backgroundColor: selectedRole ? 'rgba(0,0,0,0.02)' : 'transparent'
        }}
        transition={{ duration: 0.6 }}
        className="pb-4"
      >
        <DialogTitle className="flex items-center p-6">
          {(selectedRole || showEmailForm) && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mr-2 p-2 hover:bg-gray-100 rounded-full"
              onClick={() => {
                if (showEmailForm) {
                  setShowEmailForm(false);
                } else {
                  setSelectedRole(null);
                }
              }}
            >
              <FaArrowLeft className="w-5 h-5" />
            </motion.button>
          )}
          <motion.span 
            className="text-2xl font-bold flex-grow text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {showEmailForm 
              ? `${title} with Email` 
              : selectedRole 
                ? `${title} as ${selectedRole}` 
                : title}
          </motion.span>
        </DialogTitle>

        <DialogContent className="px-6">
          <AnimatePresence mode="wait">
            {!selectedRole ? (
              <motion.div
                key="roles"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-2 gap-4"
              >
                {roleProviders.map((provider) => (
                  <motion.button
                    key={provider.name}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      w-full p-4 rounded-lg border dark:border-gray-700 
                      flex flex-col items-center justify-center space-y-3 
                      hover:bg-blue-50 dark:hover:bg-blue-900/20
                      transition-all duration-300 shadow-sm hover:shadow-md
                    "
                    onClick={() => setSelectedRole(provider.name)}
                  >
                    <div className="text-3xl mb-2">
                      {provider.icon}
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{provider.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {provider.description}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : showEmailForm ? (
              <EmailForm isSignUp={isSignUp} />
            ) : (
              <motion.div
                key="social"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-3"
              >
                {socialProviders.map((provider) => (
                  <motion.button
                    key={provider.name}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full p-4 rounded-lg border dark:border-gray-700 
                      flex items-center justify-center space-x-3 
                      ${provider.primary 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 border-transparent' 
                        : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'}
                      transition-all duration-300 shadow-sm hover:shadow-md
                    `}
                    onClick={() => {
                      if (provider.id === 'email') {
                        setShowEmailForm(true);
                      } else {
                        onClose();
                        setSelectedRole(null);
                        setShowEmailForm(false);
                      }
                    }}
                  >
                    {provider.icon}
                    <span>{title} with {provider.name}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
};

const Navbar_main = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);

  const navItems = [
    { text: 'HOME', tooltip: 'Go to Home', path: '/' },
    { text: 'COURSES', tooltip: 'Browse Our Courses', path: '/courses' },
    { text: 'LEARNING PLANS', tooltip: 'View Learning Plans', path: '/learning-plans' },
    { text: 'CAREER PATHS', tooltip: 'Explore Career Paths', path: '/career-paths' },
    { text: 'CERTIFICATION', tooltip: 'Get Certified', path: '/certification' },
    { text: 'RESOURCES', tooltip: 'Access Resources', path: '/resources' },
    { text: 'CONTACT', tooltip: 'Contact Us', path: 'https://www.qubicgen.com' }
  ];

  const authProviders = [
    { name: 'Student', icon: <FaUser className="w-5 h-5" /> },
    { name: 'Instructor', icon: <FaChalkboardTeacher className="w-5 h-5" /> }
  ];

  // Updated drawer with dark mode
  const drawer = (
    <div className="w-[280px] h-full bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <span className="text-xl font-bold text-[#fa4616]">Q</span>
          <span className="text-xl font-bold dark:text-white">LMS</span>
        </Link>
        <button onClick={() => setMobileOpen(false)} className="p-2 dark:text-white">
          <FiX className="w-6 h-6" />
        </button>
      </div>
      <div className="py-4">
        {navItems.map((item, index) => (
          item.path.startsWith('http') ? (
            <a
              key={index}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-[#0d47a1] dark:hover:text-[#4d7cc7]"
            >
              {item.text}
            </a>
          ) : (
            <Link
              key={index}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 text-sm ${
                location.pathname === item.path 
                  ? 'text-[#0d47a1] bg-blue-50 dark:bg-blue-900 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {item.text}
            </Link>
          )
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="h-16"></div>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50 transition-colors duration-200">
        <div className="max-w-full mx-auto px-2.5">
          <div className="flex items-center h-[72px] gap-2">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center mr-2">
              <span className="text-2xl md:text-3xl font-bold">
                <span className="text-[#fa4616]">Q</span>
                <span className="dark:text-white">LMS</span>
              </span>
            </Link>

            {/* Menu Icon for Mobile */}
            <button 
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <FiMenu className="w-6 h-6 dark:text-white" />
            </button>

            {/* Categories Dropdown - Hidden on mobile */}
            <div className="hidden lg:block">
              <button className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-sm text-[#1c1d1f] dark:text-white font-normal text-sm">
                Categories
              </button>
            </div>

            {/* Search Bar - Responsive width */}
            <div className="flex-grow relative mx-2 hidden sm:block">
              <div className="relative flex items-center h-12 max-w-[692px]">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search for anything"
                    className="w-full h-12 pl-12 pr-4 border border-gray-900 dark:border-gray-600 
                             bg-[#f8fafb] dark:bg-gray-800 
                             text-sm text-gray-900 dark:text-gray-100
                             focus:outline-none focus:border-[#1c1d1f] dark:focus:border-gray-400
                             placeholder-gray-600 dark:placeholder-gray-400"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Icon for Mobile */}
            <button className="sm:hidden p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Right Side Menu - Responsive */}
            <div className="flex items-center gap-1">
              {/* Desktop-only buttons */}
              <div className="hidden lg:flex items-center gap-1">
                <button className="px-3 py-2 text-sm whitespace-nowrap hover:text-[#5624d0] dark:text-gray-200 dark:hover:text-gray-50">
                  Plans & Pricing
                </button>
                <button className="px-3 py-2 text-sm whitespace-nowrap hover:text-[#5624d0] dark:text-gray-200 dark:hover:text-gray-50">
                  QLMS Business
                </button>
                <button className="px-3 py-2 text-sm whitespace-nowrap hover:text-[#5624d0] dark:text-gray-200 dark:hover:text-gray-50">
                  Teach on QLMS
                </button>
              </div>

              {/* Cart - Hidden on smallest screens */}
              <button className="hidden xs:block p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>

              {/* Auth Buttons - Responsive text size */}
              <button
                onClick={() => setLoginDialogOpen(true)}
                className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-bold border border-gray-900 dark:border-white hover:bg-[#f8fafb] dark:hover:bg-gray-800"
              >
                Log in
              </button>

              <button
                onClick={() => setSignupDialogOpen(true)}
                className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-bold text-white bg-gray-900 dark:bg-white dark:text-gray-900 border border-gray-900 dark:border-white hover:bg-gray-800 dark:hover:bg-gray-100"
              >
                Sign up
              </button>

              {/* Utility buttons - Hidden on smallest screens */}
              <div className="hidden xs:flex items-center">
                <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </button>

                <button
                  onClick={toggleDarkMode}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  {isDarkMode ? 
                    <FaSun className="w-5 h-5 text-white" /> : 
                    <FaMoon className="w-5 h-5" />
                  }
                </button>
              </div>
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
        {drawer}
      </Drawer>

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
