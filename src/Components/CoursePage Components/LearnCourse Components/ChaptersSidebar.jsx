import React, { useState, useEffect } from 'react';
import { FaPlay, FaFile, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import '../../../App.css'

const ChaptersSidebar = ({ chapters = [], onLessonSelect, currentLesson, currentChapter }) => {
  const [isChaptersOpen, setIsChaptersOpen] = useState(true);
  
  // Set expanded chapter based on currentChapter
  const [expandedChapterTitle, setExpandedChapterTitle] = useState(
    currentChapter?.chapterName || null
  );

  // Update expandedChapterTitle when currentChapter changes
  useEffect(() => {
    if (currentChapter?.chapterName) {
      setExpandedChapterTitle(currentChapter.chapterName);
    }
  }, [currentChapter]);

  const handleChapterClick = (chapterName) => {
    setExpandedChapterTitle(prev => prev === chapterName ? null : chapterName);
  };

  const handleLessonClick = (chapter, lesson) => {
    onLessonSelect({
      chapter: chapter,
      lesson: lesson
    });
  };

  return (
    <div className="h-full bg-white p-4 overflow-hidden flex flex-col">
      {/* Chapters Header */}
      <div 
        className="p-4 border-b cursor-pointer"
        onClick={() => setIsChaptersOpen(!isChaptersOpen)}
      >
        <div className="flex items-center space-x-2">
          {isChaptersOpen ? (
            <FaChevronDown className="text-gray-500" />
          ) : (
            <FaChevronRight className="text-gray-500" />
          )}
          <span className="font-medium">Chapters</span>
        </div>
      </div>

      {/* Scrollable Chapter Content */}
      <div className="flex-1 overflow-y-auto">
        {isChaptersOpen && (
          <div className="space-y-2 mt-2">
            {Array.isArray(chapters) && [...chapters].map((chapterData, index) => {
              const chapter = chapterData.chapter;
              return (
                <div key={index} className="bg-white rounded-lg">
                  <div 
                    className="p-3 hover:bg-gray-50 flex items-center justify-between cursor-pointer rounded-lg"
                    onClick={() => handleChapterClick(chapter.chapterName)}
                  >
                    <span className="text-sm">{chapter.chapterName}</span>
                    {chapter.chapterLessons?.length > 0 && (
                      expandedChapterTitle === chapter.chapterName ? (
                        <FaChevronDown className="text-gray-500" />
                      ) : (
                        <FaChevronRight className="text-gray-500" />
                      )
                    )}
                  </div>
                  
                  {expandedChapterTitle === chapter.chapterName && chapter.chapterLessons?.length > 0 && (
                    <div className="bg-gray-50 rounded-b-lg">
                      {[...chapter.chapterLessons].map((lessonData, lessonIndex) => {
                        const lesson = lessonData.lesson;
                        const isActive = currentLesson?.lessonTitle === lesson.lessonTitle;
                        
                        return (
                          <div 
                            key={lessonIndex}
                            className={`p-3 pl-8 hover:bg-gray-100 flex items-center gap-2 cursor-pointer
                              ${isActive ? 'bg-[#f2f9ff] text-[#0056B3]' : ''}
                            `}
                            onClick={() => handleLessonClick(chapter, lesson)}
                          >
                            {lesson.lessonType === 'Video' ? (
                              <FaPlay className={`text-xs ${isActive ? 'text-[#0056B3]' : 'text-gray-500'}`} />
                            ) : (
                              <FaFile className={`text-xs ${isActive ? 'text-[#0056B3]' : 'text-gray-500'}`} />
                            )}
                            <span className="text-sm">{lesson.lessonTitle}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fixed Bottom Items */}
      <div className="mt-auto border-t pt-2">
        <div className="bg-white rounded-lg">
          <div className="p-4 hover:bg-gray-50 flex items-center space-x-2 cursor-pointer">
            <span className="text-sm">Glossary</span>
          </div>
        </div>
        <div className="bg-white rounded-lg">
          <div className="p-4 hover:bg-gray-50 flex items-center space-x-2 cursor-pointer">
            <FaChevronRight className="text-gray-500" />
            <span className="text-sm">References</span>
          </div>
        </div>
        <div className="bg-white rounded-lg">
          <div className="p-4 hover:bg-gray-50 flex items-center space-x-2 cursor-pointer">
            <FaChevronRight className="text-gray-500" />
            <span className="text-sm">Provide Feedback & Get your Certificate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChaptersSidebar;