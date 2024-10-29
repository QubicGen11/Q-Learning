import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, Drawer } from '@mui/material';
import { styled } from '@mui/system';
import { FiMenu, FiX } from 'react-icons/fi';

// Styled component for nav links with active state
const NavLink = styled(Link)(({ isActive }) => ({
  position: 'relative',
  color: isActive ? '#0d47a1' : '#666',
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

const Navbar_main = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { text: 'HOME', tooltip: 'Go to Home', path: '/' },
    { text: 'COURSES', tooltip: 'Browse Our Courses', path: '/courses' },
    { text: 'LEARNING PLANS', tooltip: 'View Learning Plans', path: '/learning-plans' },
    { text: 'CAREER PATHS', tooltip: 'Explore Career Paths', path: '/career-paths' },
    { text: 'CERTIFICATION', tooltip: 'Get Certified', path: '/certification' },
    { text: 'RESOURCES', tooltip: 'Access Resources', path: '/resources' },
    { text: 'CONTACT', tooltip: 'Contact Us', path: 'https://www.qubicgen.com' }
  ];

  // Mobile drawer content
  const drawer = (
    <div className="w-[280px] h-full bg-white">
      <div className="flex justify-between items-center p-4 border-b">
        <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <span className="text-xl font-bold text-[#fa4616]">QLearning</span>
          <span className="text-xl font-bold text-black">Academy</span>
        </Link>
        <button onClick={() => setMobileOpen(false)} className="p-2">
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
              className="block px-6 py-3 text-sm text-gray-600 hover:text-[#0d47a1]"
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
                  ? 'text-[#0d47a1] bg-blue-50' 
                  : 'text-gray-600'
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
      <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-9xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center ml-7">
              <Link to="/" className="flex items-center space-x-1">
                <span className="text-4xl font-extrabold text-[#0033A1] playwrite-gb-s-logo" style={{
                  fontFamily: '"Playwrite GB S", serif',
                  fontWeight: 900,
                  fontOpticalSizing: 'auto',
                  fontStyle: 'regular'

                }}> <span className='text-yellow-500'>Q</span>lms</span>
                <span className="text-2xl font-bold text-[#0033A1]"></span>
              </Link>
            </div>

            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-600"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu className="w-6 h-6" />
            </button>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Tooltip 
                  key={index} 
                  title={item.tooltip} 
                  placement="bottom" 
                  arrow
                  enterDelay={200}
                  leaveDelay={0}
                >
                  {item.path.startsWith('http') ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs tracking-wide text-gray-600 hover:text-[#0d47a1]"
                      style={{
                        position: 'relative',
                        fontSize: '11px',
                        fontWeight: '500',
                        fontFamily: 'sans-serif'
                      }}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <NavLink 
                      to={item.path}
                      isActive={location.pathname === item.path || 
                                (item.path === '/' && location.pathname === '/')}
                      className="text-xs tracking-wide"
                    >
                      {item.text}
                    </NavLink>
                  )}
                </Tooltip>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Tooltip title="Change Language" arrow>
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.6 9h16.8M3.6 15h16.8" />
                  </svg>
                </button>
              </Tooltip>
              <Link 
                to="/login" 
                className="bg-[#0033A1] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#e03e12] transition-colors duration-200"
              >
                Login/Sign Up
              </Link>
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
    </>
  );
}

export default Navbar_main;
