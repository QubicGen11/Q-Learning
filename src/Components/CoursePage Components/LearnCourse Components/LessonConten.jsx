import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from 'react-icons/io';
import SuperLoader from '../../Common/SuperLoader';
// import { ClipLoader } from "react-spinners";
import Skeleton from 'react-loading-skeleton';
import { FaFolder, FaFilePdf } from 'react-icons/fa6';
import LessonMaterials from './LessonMaterials';
import AssignmentView from './AssignmentView';


const LessonContent = ({ chapter, lesson, allChapters = [], onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

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



  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleQuizSubmit = () => {
    // Calculate results
    let score = 0;
    lesson.lessonQuestions.forEach((questionData, index) => {
      const selectedOption = questionData.question.options[selectedAnswers[index]];
      if (selectedOption?.isCorrect) {
        score++;
      }
    });
    setShowResults(true);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (currentAssignment) {
    return <AssignmentView assignment={currentAssignment} />;
  }

  const renderContent = () => {
    if (isLoading) {
      return <SuperLoader />;
    }

    if (!lesson) {
      return <div>Please select a lesson</div>;
    }

    switch (lesson.lessonType) {
      case 'Video':
        return (
        <div className=" w-full h-[83vh] overflow-y-auto">
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
          <div>
            <LessonMaterials 
              lessonMaterials={lesson.lessonMaterials} 
              lessonQuestions={lesson.lessonQuestions}
            />
            </div>


        </div>
         
        );

      case 'Quiz':
        return (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <div className="max-w-4xl mx-auto py-8 px-4">
              {/* Quiz Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">{lesson.lessonTitle}</h1>
                <p className="text-gray-600">
                  Total Questions: {lesson.lessonQuestions.length}
                </p>
              </div>

              {/* Quiz Questions */}
              <div className="space-y-8">
                {lesson.lessonQuestions.map((questionData, index) => {
                  const { question } = questionData;
                  return (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => (
                          <div 
                            key={optionIndex} 
                            className={`p-3 rounded-lg border cursor-pointer
                              ${selectedAnswers[index] === optionIndex 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-blue-300'}`}
                            onClick={() => handleAnswerSelect(index, optionIndex)}
                          >
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name={`question-${index}`}
                                checked={selectedAnswers[index] === optionIndex}
                                onChange={() => {}}
                                className="h-4 w-4 text-blue-600"
                              />
                              <label className="text-gray-700 cursor-pointer flex-1">
                                {option.option}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                      {showResults && (
                        <div className="mt-4 text-sm">
                          {selectedAnswers[index] !== undefined && 
                           question.options[selectedAnswers[index]]?.isCorrect ? (
                            <p className="text-green-600">Correct!</p>
                          ) : (
                            <p className="text-red-600">
                              Incorrect. The correct answer was: {
                                question.options.find(opt => opt.isCorrect)?.option
                              }
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-center">
                {!showResults ? (
                  <button
                    onClick={handleQuizSubmit}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                             font-medium transition-colors"
                    disabled={Object.keys(selectedAnswers).length !== lesson.lessonQuestions.length}
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavigation('next')}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 
                             font-medium transition-colors"
                  >
                    Continue to Next Lesson
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case 'Article':
        return (
          <div className="p-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold">{lesson.lessonTitle}</h1>
              {lesson.lessonMaterials && (
                <button 
                  onClick={toggleDrawer}
                  className="text-[#0073EA] hover:text-blue-900 flex items-center gap-1 bg-[#F3F4F6] px-3 py-2 rounded-md"
                >
                  <span>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 16 16" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1"
                    >
                      <path
                        d="M2 4C2 3.44772 2.44772 3 3 3H6.5C6.81476 3 7.11115 3.14819 7.30208 3.4L8.19792 4.6C8.38885 4.85181 8.68524 5 9 5H13C13.5523 5 14 5.44772 14 6V12C14 12.5523 13.5523 13 13 13H3C2.44772 13 2 12.5523 2 12V4Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Materials
                </button>
              )}
            </div>
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: lesson.lessonContent }} />
            </div>

            {/* Materials Drawer */}
            <div 
              className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
              } z-50`}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Materials</h2>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {/* Display lesson materials */}
                <div className="mt-4">
                  <a 
                    href={lesson.lessonMaterials}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" 
                        fill="currentColor"
                      />
                    </svg>
                    Download Course Materials
                  </a>
                </div>
              </div>
            </div>

            {/* Overlay */}
            {isDrawerOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setIsDrawerOpen(false)}
              />
            )}
          </div>
        );

      case 'PDF':
        return (
          <div className="relative h-full">
            {/* Materials Button */}
            {lesson.lessonMaterials && (
              <button
                onClick={toggleDrawer}
                className="fixed right-4 top-20 z-10 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                title="View Materials"
              >
                <FaFolder className="text-xl" />
              </button>
            )}

            {/* Materials Drawer */}
            <div
              className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-20
                ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
              <div className="h-full flex flex-col bg-white">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                  <h3 className="font-semibold text-gray-800">Available Materials</h3>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="hover:bg-gray-200 p-2 rounded-full transition-colors"
                  >
                    <IoIosClose className="text-xl" />
                  </button>
                </div>
                <div className="p-4">
                  {lesson.lessonMaterials && (
                    <a
                      href={`${lesson.lessonMaterials}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      <FaFilePdf className="text-red-500 text-2xl" />
                      <span className="text-blue-600 font-medium">PDf</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* PDF Content */}
            <div className="p-6">
              {/* PDF Materials */}
           

              {/* Lesson Content */}
              <div className="prose max-w-none">
                {lesson.lessonContent}
              </div>
            </div>
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
      {/* Only show navigation bar for non-quiz content */}
      {lesson.lessonType !== 'Quiz' && (
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
      )}

      {/* Content Area */}
      <div className="h-auto overflow-y-auto">
        {renderContent()}
      </div>


    </div>
  );
};

export default LessonContent;