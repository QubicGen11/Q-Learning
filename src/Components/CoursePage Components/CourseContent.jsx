import React from 'react';
import { FaCheck } from 'react-icons/fa';

const CourseContent = ({ 
  curriculum, 
  learningObjective, 
  courseOutcome,
  aboutCourse,
  courseName,
  coursePreRequisites,
  technologiesUsed,
  previewMode
}) => {
  console.log("CourseContent - courseOutcome:", courseOutcome);
  console.log("CourseContent - aboutCourse:", aboutCourse);
  console.log("CourseContent - previewMode:", previewMode);

  const courseIncludes = [
    '5 hours on-demand video',
    '31 articles',
    'Access on mobile and TV',
    'Certificate of completion'
  ];

  // Get the appropriate course outcome based on mode
  const getOutcome = () => {
    if (previewMode) {
      return aboutCourse?.courseOutCome || courseOutcome || "No outcome available";
    }
    return courseOutcome || "No outcome available";
  };

  return (
    <div className="w-full bg-[#F8F9FA]">
      <div className="max-w-[1200px] mx-auto px-3 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* What You Will Get */}
          <div>
            <h2 className="text-base font-medium mb-2">What You Will Get</h2>
            {getOutcome() && (
              <div className="flex items-start gap-2">
                <FaCheck className="text-[#0056D2] mt-1 flex-shrink-0 text-xs" />
                <span className="text-gray-600 text-sm">{getOutcome()}</span>
              </div>
            )}
          </div>

          {/* This course includes */}
          <div>
            <h2 className="text-base font-medium mb-2">This course includes:</h2>
            <ul className="space-y-1.5">
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