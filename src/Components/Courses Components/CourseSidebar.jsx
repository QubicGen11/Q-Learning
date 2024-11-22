import React from 'react';
import { FiClock, FiFileText } from 'react-icons/fi';

const CourseSidebar = ({
  course,
  currentSection,
  currentLesson,
  currentAssignment,
  handleSectionClick,
  handleAssignmentClick,
  isAssessmentActive
}) => {
  return (
    <div className={`w-72 bg-gray-100 dark:bg-gray-800 fixed h-[calc(100vh-56px)] overflow-y-auto
      ${isAssessmentActive ? 'hidden' : ''}`}>
      <div className="px-4 py-4">
        {/* Introduction Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            <span>INTRODUCTION</span>
          </div>
          
          {/* About this course button */}
          <button 
            onClick={() => handleSectionClick('about')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors
              ${currentSection === 'about' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">1</span>
            </div>
            <span className="text-sm font-medium text-left">About this course</span>
          </button>
        </div>

        {/* Course Content Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            <span>COURSE CONTENT</span>
          </div>
          
          {course?.courseLesson?.map((lessonItem, index) => (
            <div key={lessonItem.id}>
              {/* Lesson Button */}
              <button
                onClick={() => handleSectionClick(lessonItem.lesson.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors
                  ${currentLesson?.id === lessonItem.lesson.id
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{index + 1}</span>
                </div>
                <div className="flex flex-col items-start text-left">
                  <div className="text-sm font-medium break-words w-full">{lessonItem.lesson.lessonTitle}</div>
                  {lessonItem.lesson.lessonDuration && (
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <FiClock className="w-3 h-3" />
                      <span>{lessonItem.lesson.lessonDuration} min</span>
                    </div>
                  )}
                </div>
              </button>

              {/* Assignments for this lesson */}
              {course?.assignments?.filter(assignment => 
                assignment.lessonId === lessonItem.lesson.id
              ).map(assignment => (
                <button
                  key={assignment.id}
                  onClick={() => handleAssignmentClick(assignment)}
                  className={`w-full ml-8 flex items-center gap-3 p-2 rounded-lg transition-colors
                    ${currentAssignment?.id === assignment.id
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  <div className="flex items-center gap-2">
                    <FiFileText className="w-4 h-4" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm">{assignment.assignmentTitle}</span>
                      <span className="text-xs text-gray-500">{assignment.duration} min</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;
