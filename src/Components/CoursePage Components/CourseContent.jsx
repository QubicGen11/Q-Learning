import React from 'react';
import { FaCheck } from 'react-icons/fa';

const CourseContent = () => {
  const learningPoints = [
    'Gain UX skills you can immediately apply to improve your projects and career',
    'Learn how to conduct effective and useful research',
    'Understand how to apply UX Strategy to set goals and define success',
    'Learn what you need to know before you start designing',
    'Learn to sketch smarter',
    'Learn to effectively and persuasively present your work',
    'Tips and guidance on staying up to date in the field (and putting it to use!)',
    'Impactful portfolio pieces (if you complete the projects)'
  ];

  const courseIncludes = [
    '5 hours on-demand video',
    '31 articles',
    'Access on mobile and TV',
    'Certificate of completion'
  ];

  return (
    <div className="w-full bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* What You Will Get */}
          <div>
            <h2 className="text-xl font-semibold mb-4">What You Will Get</h2>
            <ul className="space-y-2">
              {learningPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <FaCheck className="text-[#0056D2] mt-1.5 flex-shrink-0 text-sm" />
                  <span className="text-gray-600 text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* This course includes */}
          <div>
            <h2 className="text-xl font-semibold mb-4">This course includes:</h2>
            <ul className="space-y-2">
              {courseIncludes.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">• {item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;