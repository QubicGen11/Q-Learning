import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, Drawer, Dialog, DialogContent, DialogTitle, Fade } from '@mui/material';
import { styled } from '@mui/system';
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon, FaUser, FaChalkboardTeacher, FaArrowLeft, FaGithub, FaGoogle, FaFacebook, FaTwitter, FaLinkedin, FaEnvelope, FaShoppingCart } from 'react-icons/fa';
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
  const [showEmailForm, setShowEmailForm] = useState(false);

  const socialProviders = [
    { id: 'email', name: 'Email', icon: <FaEnvelope className="w-5 h-5" />, primary: true },
    { id: 'github', name: 'GitHub', icon: <FaGithub className="w-5 h-5" /> },
    { id: 'google', name: 'Google', icon: <FaGoogle className="w-5 h-5" /> },
    { id: 'facebook', name: 'Facebook', icon: <FaFacebook className="w-5 h-5" /> },
    { id: 'twitter', name: 'Twitter', icon: <FaTwitter className="w-5 h-5" /> },
    { id: 'linkedin', name: 'LinkedIn', icon: <FaLinkedin className="w-5 h-5" /> }
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
          backgroundColor: showEmailForm ? 'rgba(0,0,0,0.02)' : 'transparent'
        }}
        transition={{ duration: 0.6 }}
        className="pb-4"
      >
        <DialogTitle className="flex items-center p-6">
          {showEmailForm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mr-2 p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setShowEmailForm(false)}
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
            {showEmailForm ? `${title} with Email` : title}
          </motion.span>
        </DialogTitle>

        <DialogContent className="px-6">
          <AnimatePresence mode="wait">
            {showEmailForm ? (
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

const SearchFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    {
      title: "Development",
      items: [
        "Web Development",
        "Mobile Development",
        "Programming Languages",
        "Game Development",
        "Database Design"
      ]
    },
    {
      title: "Business",
      items: [
        "Entrepreneurship",
        "Communication",
        "Management",
        "Sales",
        "Strategy"
      ]
    },
    {
      title: "IT & Software",
      items: [
        "IT Certifications",
        "Network Security",
        "Hardware",
        "Operating Systems",
        "Cloud Computing"
      ]
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-full px-4 border-r border-gray-900 dark:border-gray-600 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <span className="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
          {selectedCategory}
        </span>
        <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-full mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
            <div className="max-h-[70vh] overflow-y-auto">
              <button
                onClick={() => {
                  setSelectedCategory('All Categories');
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                All Categories
              </button>
              {categories.map((category, index) => (
                <div key={index} className="group relative">
                  <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{category.title}</span>
                    <FiChevronRight className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="hidden group-hover:block absolute left-full top-0 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                    {category.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        onClick={() => {
                          setSelectedCategory(item);
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
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
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 
                      fixed top-0 left-0 right-0 z-50 transition-colors duration-200">
        <div className="max-w-full mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">
            {/* Left Section */}
            <div className="flex items-center">
              {/* Logo - Responsive size */}
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                  <span className="text-[#fa4616]">Q</span>
                  <span className="dark:text-white">LMS</span>
                </span>
              </Link>

              {/* Menu Button - Mobile only */}
              <button 
                onClick={() => setMobileOpen(true)}
                className="ml-2 lg:hidden p-2 sm:p-3 hover:bg-gray-100 
                           dark:hover:bg-gray-800 rounded-full"
              >
                <FiMenu className="w-5 h-5 sm:w-6 sm:h-6 dark:text-white" />
              </button>
            </div>

            {/* Search Bar - Hide on mobile, custom breakpoints */}
            <div className="hidden sm:flex flex-grow max-w-3xl mx-4 lg:mx-8">
              <div className="relative flex w-full items-center h-10 sm:h-12 
                            border border-gray-900 dark:border-gray-600 
                            bg-[#f8fafb] dark:bg-gray-800">
                {/* Search Filters - Responsive padding */}
                <SearchFilters />
                
                {/* Search Input */}
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

            {/* Right Section - Responsive spacing */}
            <div className="flex items-center  sm:gap-2">
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center">
                <Link to="/courses">
                  <button className="px-2 sm:px-3 py-2 text-xs sm:text-sm 
                                   whitespace-nowrap hover:text-[#5624d0] 
                                   dark:text-gray-200 dark:hover:text-gray-50">
                    Explore Courses
                  </button>
                </Link>
                <Link to="/about">
                <button className="hidden xl:block px-3 py-2 text-sm 
                                 whitespace-nowrap hover:text-[#5624d0] 
                                 dark:text-gray-200 dark:hover:text-gray-50">
                 About Us
                </button>
                </Link>
                <button className="hidden xl:block px-3 py-2 text-sm 
                                 whitespace-nowrap hover:text-[#5624d0] 
                                 dark:text-gray-200 dark:hover:text-gray-50">
                  Contact Us
                </button>
              </div>

              {/* Cart Icon - Show on tablet and up */}
              <div className="hidden sm:flex items-center mr-4">
                <Link to="/cart">
                  <button className="p-2 sm:p-3 hover:bg-gray-100 
                                   dark:hover:bg-gray-800 rounded-full relative">
                    <FaShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 dark:text-white" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                                   text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 
                                   flex items-center justify-center">
                      0
                    </span>
                  </button>
                </Link>
              </div>

              {/* Auth Buttons - Responsive sizing */}
              <div className="flex items-center sm:gap-2  space-x-2">
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

              {/* Utility Buttons - Show on tablet and up */}
              <div className="hidden sm:flex items-center">
                
                <button
                  onClick={toggleDarkMode}
                  className="p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  {isDarkMode ? 
                    <FaSun className="w-5 h-5 text-white" /> : 
                    <FaMoon className="w-5 h-5" />
                  }
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search - Show only on mobile */}
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
