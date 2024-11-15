import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MdSpaceDashboard,
  MdSchool,
  MdGroup,
  MdInsights,
  MdSettings,
  MdHelpCenter,
  MdLogout
} from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Main',
      items: [
        { 
          icon: MdSpaceDashboard, 
          text: 'Homepage', 
          path: '/',
        },
        { 
          icon: MdSchool, 
          text: 'Explore Courses', 
          path: '/courses',
        },
        { 
          icon: MdGroup, 
          text: 'Become a Instructor', 
          path: '/become-instructor',
        },
        { 
            icon: MdSettings, 
            text: 'About Us', 
            path: '/about',
          },
          { 
            icon: MdHelpCenter, 
            text: 'Help & Support', 
            path: '/support',
          }
      ]
    },

  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-2">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                  <span className="text-[#fa4616]">Q</span>
                  <span className="dark:text-white">LMS</span>
                </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="px-4 py-6 space-y-8">
        {menuItems.map((section, idx) => (
          <div key={idx}>
         
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-6 rounded-lg text-sm font-medium transition-colors duration-150 ${
                        isActive 
                          ? 'bg-purple-50 text-purple-700' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-purple-700' : 'text-gray-400'}`} />
                      {item.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <button 
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-150"
          onClick={() => {/* Add logout logic */}}
        >
          <MdLogout className="w-5 h-5 mr-3 text-gray-400" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 