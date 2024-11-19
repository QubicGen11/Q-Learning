import React, { useState } from "react";
import { FiHome, FiUsers, FiBookOpen, FiBarChart2, FiSettings, FiBell, FiFileText, FiHelpCircle, FiLogOut } from "react-icons/fi";
import ApprovalsComponent from "./ApprovalsComponent";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const SuperAdmin = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  const handleLogout = () => {
    Cookies.remove('superadminToken');
    Cookies.remove('refreshToken');
    navigate('/');
  };

  const menuItems = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "User Management", icon: <FiUsers /> },
    { name: "Course Management", icon: <FiBookOpen /> },
    { name: "Reports & Analytics", icon: <FiBarChart2 /> },
    { name: "Approvals & Reviews", icon: <FiFileText /> },
    { name: "Notifications", icon: <FiBell /> },
    { name: "System Settings", icon: <FiSettings /> },
    { name: "Feedback & Support", icon: <FiHelpCircle /> },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-amber-600 to-amber-700">
      {/* Sidebar */}
      <div className="w-72 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold">
            <span className="text-[#f44336]">Qubi</span>
            <span className="text-gray-800">Nest</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">Super Admin Panel</p>
        </div>
        
        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => setSelectedMenu(item.name)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    selectedMenu === item.name 
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md" 
                    : "text-gray-600 hover:bg-amber-50"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-72 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#f44336] w-full px-4 py-3 rounded-lg hover:bg-red-50 transition-all duration-200"
          >
            <FiLogOut className="text-lg" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{selectedMenu}</h2>
          
          <div className="bg-gray-50 rounded-lg p-6">
            {selectedMenu === "Dashboard" && <Dashboard />}
            {selectedMenu === "User Management" && <UserManagement />}
            {selectedMenu === "Course Management" && <CourseManagement />}
            {selectedMenu === "Reports & Analytics" && <Reports />}
            {selectedMenu === "Approvals & Reviews" && <ApprovalsComponent />}
            {selectedMenu === "Notifications" && <Notifications />}
            {selectedMenu === "System Settings" && <SystemSettings />}
            {selectedMenu === "Feedback & Support" && <Feedback />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder Components for Each Section
const Dashboard = () => <div>Dashboard Overview</div>;
const UserManagement = () => <div>Manage Users</div>;
const CourseManagement = () => <div>Manage Courses</div>;
const Reports = () => <div>Analytics and Reports</div>;
const Notifications = () => <div>Manage Notifications</div>;
const SystemSettings = () => <div>System Configuration</div>;
const Feedback = () => <div>Feedback and Support</div>;

export default SuperAdmin;
