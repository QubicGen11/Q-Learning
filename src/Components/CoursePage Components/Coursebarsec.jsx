import React, { useState } from 'react';
import Coursecontentmain from './Coursecontentmain';
import RelatedCoursesmain from './RelatedCourse/RelatedCoursesmain';
import Community from './Community Section/Community';
import usePreLoginFeedStore from '../../stores/preLoginFeedStore';

const Coursebarsec = ({ courseId, courseOutcome }) => {
  const [activeLink, setActiveLink] = useState('Course Content');

  const navLinks = [
    'Course Content',
    'Related Courses & About Instructor',
    'Community Support'
  ];

  // Function to render the appropriate component based on active link
  const renderContent = () => {
    switch (activeLink) {
      case 'Course Content':
        return <Coursecontentmain courseId={courseId} courseOutcome={courseOutcome} />;
      case 'Related Courses & About Instructor':
        return <RelatedCoursesmain courseId={courseId} />;
      case 'Community Support':
        return <Community courseId={courseId} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="border-b border-gray-200 bg-white  top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8 px-4">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => setActiveLink(link)}
                className={`py-4 px-1 relative ${
                  activeLink === link
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="text-sm font-medium">{link}</span>
                {activeLink === link && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="content-section">
        {renderContent()}
      </div>
    </>
  );
};

export default Coursebarsec;