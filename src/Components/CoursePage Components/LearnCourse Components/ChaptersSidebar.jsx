import React, { useState, useEffect } from 'react';
import { FaPlay, FaFile, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import '../../../App.css'

const ChaptersSidebar = ({ chapters = [], onLessonSelect, currentLesson, currentChapter }) => {
  const [expandedChapterTitle, setExpandedChapterTitle] = useState(null);
  const [isChaptersOpen, setIsChaptersOpen] = useState(true);
  const [activeLesson, setActiveLesson] = useState(null);

  const handleChapterClick = (chapterName) => {
    setExpandedChapterTitle(prev => prev === chapterName ? null : chapterName);
  };

  const handleLessonClick = (chapterName, lesson) => {
    setActiveLesson(lesson.lessonTitle);
    onLessonSelect({
      chapter: chapterName,
      lesson: lesson
    });
  };

  return (
    <div className="h-full bg-white p-4 overflow-hidden">
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

      {isChaptersOpen && (
        <div className="scrollbar overflow-y-auto space-y-1" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {/* Overview */}
          <div className="bg-white rounded-lg">
            <div className="p-4 hover:bg-gray-50 flex items-center space-x-2">
              <span className="text-sm">Overview</span>
            </div>
          </div>

          {/* Dynamic Chapters */}
          {Array.isArray(chapters) && [...chapters].reverse().map((chapterData, index) => {
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
                    {[...chapter.chapterLessons].reverse().map((lessonData, lessonIndex) => {
                      const lesson = lessonData.lesson;
                      return (
                        <div 
                          key={lessonIndex}
                          className={`p-3 pl-8 hover:bg-gray-100 flex items-center gap-2 cursor-pointer
                            ${activeLesson === lesson.lessonTitle ? 'bg-[#f2f9ff] text-[#0056B3]' : ''}
                          `}
                          onClick={() => handleLessonClick(chapter.chapterName, lesson)}
                        >
                          {lesson.lessonType === 'Video' ? (
                            <FaPlay className={`text-xs ${activeLesson === lesson.lessonTitle ? 'text-[#0056B3]' : 'text-gray-500'}`} />
                          ) : (
                            <FaFile className={`text-xs ${activeLesson === lesson.lessonTitle ? 'text-[#0056B3]' : 'text-gray-500'}`} />
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

          {/* Fixed bottom items */}
          <div className="bg-white rounded-lg">
            <div className="p-4 hover:bg-gray-50 flex items-center space-x-2">
              <span className="text-sm">Glossary</span>
            </div>
          </div>
          <div className="bg-white rounded-lg">
            <div className="p-4 hover:bg-gray-50 flex items-center space-x-2">
              <FaChevronRight className="text-gray-500" />
              <span className="text-sm">References</span>
            </div>
          </div>
          <div className="bg-white rounded-lg">
            <div className="p-4 hover:bg-gray-50 flex items-center space-x-2">
              <FaChevronRight className="text-gray-500" />
              <span className="text-sm">Provide Feedback & Get your Certificate</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChaptersSidebar;