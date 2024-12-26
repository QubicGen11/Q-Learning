import React, { useState } from 'react';
import CourseTracker from './CourseTracker';
import ChaptersSidebar from './ChaptersSidebar';
import LessonContent from './LessonConten';
import LessonMaterials from './LessonMaterials';

const CourseLearnInterface = () => {
  const [currentLesson, setCurrentLesson] = useState({
    chapter: '',
    lesson: '',
    type: ''
  });

  const handleLessonSelect = (lessonData) => {
    setCurrentLesson(lessonData);
  };

  const handleNavigation = (lessonData) => {
    setCurrentLesson(lessonData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CourseTracker />
      
      <div className="flex flex-1">
        <div className="w-80 border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto">
          <ChaptersSidebar 
            onLessonSelect={handleLessonSelect} 
            currentLesson={currentLesson}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <LessonContent 
              lessonData={currentLesson} 
              onNavigate={handleNavigation}
            />
          </div>
          
          <div className="h-48 border-t border-gray-200">
            <LessonMaterials lessonData={currentLesson} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearnInterface;
