import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import SuperLoader from '../../Common/SuperLoader';
// import { ClipLoader } from "react-spinners";
import Skeleton from 'react-loading-skeleton';


const LessonContent = ({ chapter, lesson, allChapters = [], onNavigate }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state when lesson changes
  useEffect(() => {
    setIsLoading(true);
    
    // Add a small delay to show loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [lesson?.lessonTitle]); // Reset when lesson changes

  // Find current chapter and lesson indices
  const currentChapterIndex = allChapters.findIndex(
    (ch) => ch.chapter.chapterName === chapter.chapterName
  );

  const currentChapter = allChapters[currentChapterIndex]?.chapter;
  const lessons = currentChapter?.chapterLessons || [];
  const currentLessonIndex = lessons.findIndex(
    (l) => l.lesson.lessonTitle === lesson.lessonTitle
  );

  const handleNavigation = (direction) => {
    if (!onNavigate) return;

    if (direction === 'next' && currentLessonIndex < lessons.length - 1) {
      const nextLesson = lessons[currentLessonIndex + 1].lesson;
      onNavigate({
        chapter: currentChapter,
        lesson: nextLesson
      });
    } else if (direction === 'prev' && currentLessonIndex > 0) {
      const prevLesson = lessons[currentLessonIndex - 1].lesson;
      onNavigate({
        chapter: currentChapter,
        lesson: prevLesson
      });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-50 w-full h-full">
        <div className="space-y-4">
          {/* Main loader circle */}
          <Skeleton 
            height={100} 
            width={100} 
            circle={true}
            baseColor="#e2e8f0"
            highlightColor="#94a3b8"
          />
          {/* Loading text bars */}
          <div className="space-y-2">
            <Skeleton width={200} height={20} />
            <Skeleton width={160} height={20} />
          </div>
        </div>
      </div>
      );
    }

    if (!lesson) {
      return <div>Please select a lesson</div>;
    }

    switch (lesson.lessonType) {
      case 'Video':
        return (
          <div className="w-full h-[600px] p-2">
            <div className="w-full h-full relative">
              <video
                key={lesson.lessonVideo} // Add key to force video reload
                className="w-full h-full object-cover"
                controls
                playsInline
                onLoadedData={() => setIsLoading(false)}
              >
                <source src={lesson.lessonVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 w-full h-full">
                  <SuperLoader />
                </div>
              )}
            </div>
          </div>
        );

      case 'Article':
        return (
          <div className="p-4">
            <div className="prose max-w-none">
              {lesson.lessonContent}
            </div>
            {lesson.lessonMaterials && (
              <div className="mt-4">
                <a 
                  href={lesson.lessonMaterials} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Download Materials
                </a>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="p-4">
            <div className="prose max-w-none">
              {lesson.lessonContent}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#e5e7eb] border-b border-gray-200">
        <button 
          className={`flex items-center gap-2 px-4 py-2 rounded-md
            ${currentLessonIndex > 0 
              ? 'text-blue-600 border border-blue-700 hover:text-blue-700' 
              : 'text-gray-400 border border-gray-300 cursor-not-allowed'}`}
          onClick={() => handleNavigation('prev')}
          disabled={currentLessonIndex <= 0 || isLoading}
        >
          <IoIosArrowBack className="text-xl" />
          <span className="text-sm font-medium">Previous</span>
        </button>
        
        <div className="flex items-start mr-auto ml-6 space-x-2">
          <h2 className="text-base font-bold text-black">
            Chapter: {chapter?.chapterName}
          </h2>
          <span className="text-xs text-gray-500 mt-1 bg-[#F2F9FF] px-2 py-1 rounded-md">
            {lesson?.lessonType || 'Loading...'}
          </span>
        </div>

        <button 
          className={`flex items-center gap-2 px-4 py-2 rounded-md
            ${currentLessonIndex < lessons.length - 1 
              ? 'text-blue-600 border border-blue-700 hover:text-blue-700' 
              : 'text-gray-400 border border-gray-300 cursor-not-allowed'}`}
          onClick={() => handleNavigation('next')}
          disabled={currentLessonIndex >= lessons.length - 1 || isLoading}
        >
          <span className="text-sm font-medium">Next</span>
          <IoIosArrowForward className="text-xl" />
        </button>
      </div>

      {/* Content Area */}
      <div className="h-auto overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default LessonContent;