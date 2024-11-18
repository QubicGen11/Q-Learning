import React from 'react';
import { 
  FiBook, 
  FiVideo, 
  FiLayout,
  FiDollarSign,
  FiUsers,
  FiSettings 
} from 'react-icons/fi';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const sidebarSections = [
    {
      title: 'Course Setup',
      items: [
        { id: 'basicInfo', label: 'Basic Information', icon: <FiBook /> },
        { id: 'aboutCourse', label: 'About This Course', icon: <FiLayout /> },
        { id: 'curriculum', label: 'Curriculum', icon: <FiVideo /> }
      ]
    },
    {
      title: 'Content',
      items: [
        { id: 'lessons', label: 'Lessons', icon: <FiBook /> },
        { id: 'assignments', label: 'Assignments', icon: <FiLayout /> },
        { id: 'resources', label: 'Resources', icon: <FiVideo /> }
      ]
    },
    {
      title: 'Settings',
      items: [
        { id: 'pricing', label: 'Pricing', icon: <FiDollarSign /> },
        { id: 'access', label: 'Access Control', icon: <FiUsers /> },
        { id: 'settings', label: 'Course Settings', icon: <FiSettings /> }
      ]
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 fixed h-full">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-800">Course Creator</h1>
          <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
        </div>

        {sidebarSections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-purple-50 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 