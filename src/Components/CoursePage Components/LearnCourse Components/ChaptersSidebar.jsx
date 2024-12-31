import React, { useState, useEffect } from 'react';
import { FaPlay, FaFile, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import '../../../App.css'
import { useNavigate } from 'react-router-dom';

const ChaptersSidebar = ({ chapters = [], onLessonSelect, currentLesson, currentChapter }) => {
  const navigate = useNavigate();
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

  const handleAssignmentClick = (chapter, index) => {
    // Navigate to assignment view with chapter info
    navigate(`/course/assignment/${chapter.chapterName}`, {
      state: {
        chapterName: chapter.chapterName,
        assignmentNumber: index + 1,
        questions: chapter.chaperQuestions
      }
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
                    {(chapter.chapterLessons?.length > 0 || chapter.chaperQuestions?.length > 0) && (
                      expandedChapterTitle === chapter.chapterName ? (
                        <FaChevronDown className="text-gray-500" />
                      ) : (
                        <FaChevronRight className="text-gray-500" />
                      )
                    )}
                  </div>
                  
                  {expandedChapterTitle === chapter.chapterName && (
                    <div className="bg-gray-50 rounded-b-lg">
                      {/* Lessons */}
                      {chapter.chapterLessons?.map((lessonData, lessonIndex) => {
                        const lesson = lessonData.lesson;
                        const isActive = currentLesson?.lessonTitle === lesson.lessonTitle;
                        
                        return (
                          <div 
                            key={`lesson-${lessonIndex}`}
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

                      {/* Chapter Assignments */}
                      {chapter.chaperQuestions && chapter.chaperQuestions.length > 0 && (
                        <div 
                          className="p-3 pl-8 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                          onClick={() => handleAssignmentClick(chapter, index)}
                        >
                          <svg 
                            className="w-4 h-4 text-gray-500" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                            />
                          </svg>
                          <span className="text-sm">Assignment {index + 1}</span>
                        </div>
                      )}
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