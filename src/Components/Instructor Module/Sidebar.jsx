import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSidebarStore from '../../stores/sidebarStore';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const { isCollapsed } = useSidebarStore();
  const location = useLocation();

  const menuItems = [
    { icon: "grid_view", label: "Dashboard", path: "/instructor" },
    { icon: "desktop_windows", label: "Courses", path: "/instructor/courses" },
    { icon: "psychology", label: "Skill Assessments", path: "/instructor/skill-assessments" },
    { icon: "group", label: "Enrolled Students", path: "/instructor/enrolled-students" },
    { icon: "forum", label: "Discussion Forum", path: "/instructor/discussion-forum" },
    { icon: "folder", label: "Management", path: "/instructor/management" },
    { icon: "campaign", label: "Announcements", path: "/instructor/announcements" },
    { icon: "play_circle", label: "Live Sessions", path: "/instructor/live-sessions" },
    { icon: "account_balance_wallet", label: "Earnings", path: "/instructor/earnings" },
    { icon: "notifications_active", label: "Create Notifications", path: "/instructor/create-notifications" },
    { icon: "settings", label: "Settings", path: "/instructor/settings", isBottom: true },
    { icon: "help", label: "Help", path: "/instructor/help", isBottom: true },
  ];

  const isActive = (path) => {
    if (path === '/instructor') {
      return location.pathname === '/instructor';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.div 
      
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className={`fixed top-0 left-0 h-full bg-gradient-to-b from-[#0056B3] to-[#00254D] transition-all duration-300 ease-in-out z-50 
      ${isCollapsed ? 'w-[60px]' : 'w-[240px]'}`}
    >
      {/* Logo with animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`h-16 flex items-center ${isCollapsed ? 'justify-center px-4' : 'px-5'}  border-white/10`}
      >
        <motion.img 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          src={isCollapsed 
            ? "https://res.cloudinary.com/defsu5bfc/image/upload/v1736435279/Icon_Logo_tn7bcr.png"
            : "https://res.cloudinary.com/devewerw3/image/upload/v1734594088/Logo_7_ulr2j8.png"
          }
          alt="QubiNest" 
          className={`${isCollapsed ? 'w-8' : 'h-8'}`}
        />
      </motion.div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col">
        <div className="flex-1 py-2">
          {menuItems.filter(item => !item.isBottom).map((item, index) => (
            <motion.div 
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center transition-colors duration-200
                    ${isCollapsed ? 'px-4 justify-center h-[50px]' : 'px-5 h-[45px]'}
                    ${isActive(item.path) 
                      ? 'bg-white text-[#0056B3]' 
                      : 'text-white/90 hover:bg-white/10'}`}
                >
                  <span 
                    className={`material-icons ${isCollapsed ? 'text-xl' : 'text-[20px] mr-3'}`}
                  >
                    {item.icon}
                  </span>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-[14px] font-normal"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
              {/* Tooltip with animation */}
              {isCollapsed && (
                <div 
                  className="absolute left-12 top-1/2 -translate-y-1/2 
                            bg-gray-600 text-white text-sm rounded-lg px-3 py-2
                            opacity-0 group-hover:opacity-100 pointer-events-none 
                            transition-opacity duration-200 whitespace-nowrap z-[99999]
                            border border-gray-200
                            before:content-[''] before:absolute before:left-[-8px] 
                            before:top-1/2 before:-translate-y-1/2 
                            before:w-3 before:h-3 before:rotate-45
                            before:border-l before:border-b before:border-gray-200
                            before:bg-gray-600"
                >
                  {item.label}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Items with same animations */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="py-2 border-t border-white/10"
        >
          {menuItems.filter(item => item.isBottom).map((item, index) => (
            <motion.div 
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center transition-colors duration-200
                    ${isCollapsed ? 'px-4 justify-center h-[50px]' : 'px-5 h-[45px]'}
                    ${isActive(item.path) 
                      ? 'bg-gray-600 text-white' 
                      : 'text-white/90 hover:bg-white/10'}`}
                >
                  <span 
                    className={`material-icons ${isCollapsed ? 'text-xl' : 'text-[20px] mr-3'}`}
                  >
                    {item.icon}
                  </span>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-[14px] font-normal"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
              {/* Tooltip with animation */}
              {isCollapsed && (
                <div 
                  className="absolute left-12 top-1/2 -translate-y-1/2 
                            bg-gray-600 text-white text-sm rounded-lg px-3 py-2
                            opacity-0 group-hover:opacity-100 pointer-events-none 
                            transition-opacity duration-200 whitespace-nowrap z-[99999]
                            border border-gray-200
                            before:content-[''] before:absolute before:left-[-8px] 
                            before:top-1/2 before:-translate-y-1/2 
                            before:w-3 before:h-3 before:rotate-45
                            before:border-l before:border-b before:border-gray-200
                            before:bg-gray-600"
                >
                  {item.label}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
