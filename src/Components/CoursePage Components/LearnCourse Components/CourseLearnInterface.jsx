import React from 'react';
import CourseTracker from './CourseTracker';
import ChaptersSidebar from './ChaptersSidebar';
import LessonContent from './LessonConten';
import LessonMaterials from './LessonMaterials';


const CourseLearnInterface = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Course Tracker - Top Bar */}
      <CourseTracker />
      
      <div className="flex flex-1">
        {/* Left Sidebar - Chapters */}
        <div className="w-80 border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto">
          <ChaptersSidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video/Lesson Content */}
          <div className="flex-1">
            <LessonContent />
          </div>
          
          {/* Materials and Transcript */}
          <div className="h-48 border-t border-gray-200">
            <LessonMaterials />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearnInterface;
