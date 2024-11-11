import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiClock, FiArrowLeft, FiCheck } from 'react-icons/fi';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import Navbar_main from '../Navbar Components/Navbar_main';

const CourseLesson = () => {
  const { id, lessonId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    const foundCourse = storedCourses.find(c => c.id === parseInt(id));
    if (foundCourse) {
      setCourse(foundCourse);
      const lesson = foundCourse.curriculum?.find(l => l.id === parseInt(lessonId));
      setCurrentLesson(lesson);
    }
  }, [id, lessonId]);

  const handlePreviousLesson = () => {
    if (course && currentLesson) {
      const currentIndex = course.curriculum.findIndex(
        lesson => lesson.id === parseInt(lessonId)
      );
      
      if (currentIndex > 0) {
        const previousLesson = course.curriculum[currentIndex - 1];
        window.location.href = `/courses/${id}/lesson/${previousLesson.id}`;
      }
    }
  };

  const handleNextLesson = () => {
    if (course && currentLesson) {
      const currentIndex = course.curriculum.findIndex(
        lesson => lesson.id === parseInt(lessonId)
      );
      
      if (currentIndex < course.curriculum.length - 1) {
        const nextLesson = course.curriculum[currentIndex + 1];
        window.location.href = `/courses/${id}/lesson/${nextLesson.id}`;
      }
    }
  };

  const isFirstLesson = course?.curriculum?.findIndex(
    lesson => lesson.id === parseInt(lessonId)
  ) === 0;

  const isLastLesson = course?.curriculum?.findIndex(
    lesson => lesson.id === parseInt(lessonId)
  ) === course?.curriculum?.length - 1;

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  const renderContent = (content) => {
    const sanitizedContent = DOMPurify.sanitize(content, {
      ADD_TAGS: ['iframe', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img', 'span'],
      ADD_ATTR: ['target', 'href', 'src', 'alt', 'class', 'style', 'controls', 'allowfullscreen', 'frameborder', 'allow']
    });

    return (
      <div className="lesson-content">
        <style>
          {`
            .lesson-content h1 { font-size: 2em; font-weight: bold; margin-bottom: 1em; }
            .lesson-content h2 { font-size: 1.5em; font-weight: bold; margin-bottom: 0.8em; }
            .lesson-content h3 { font-size: 1.17em; font-weight: bold; margin-bottom: 0.6em; }
            .lesson-content p { margin-bottom: 1em; }
            .lesson-content strong, .lesson-content b { font-weight: bold; }
            .lesson-content em, .lesson-content i { font-style: italic; }
            .lesson-content ul, .lesson-content ol { 
              margin-left: 2em; 
              margin-bottom: 1em; 
              list-style-type: disc; 
            }
            .lesson-content ol { list-style-type: decimal; }
            .lesson-content li { margin-bottom: 0.5em; }
            .lesson-content blockquote {
              border-left: 4px solid #e2e8f0;
              padding-left: 1em;
              margin: 1em 0;
              font-style: italic;
            }
            .lesson-content iframe {
              max-width: 100%;
              margin: 1em 0;
              border-radius: 0.5em;
            }
            .lesson-content img {
              max-width: 100%;
              height: auto;
              margin: 1em 0;
              border-radius: 0.5em;
            }
            .ql-align-center { text-align: center; }
            .ql-align-right { text-align: right; }
            .ql-align-justify { text-align: justify; }
          `}
        </style>
        <div className="ql-editor">
          {parse(sanitizedContent)}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <Navbar_main />
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 
                    transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={`/courses/${id}`} 
                    className="text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-200 
                             transition-colors duration-300">
                <FiArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300">
                  {course.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white">
                  <FiClock className="w-4 h-4" />
                  <span>{currentLesson.duration}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500 dark:text-white">
                {progress}% Complete
              </div>
              <button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm 
                         transition-colors duration-300 relative group"
                onClick={() => {/* Handle completion */}}
              >
                {/* Priority Glow Effect */}
                <div className="absolute inset-0 rounded-lg bg-orange-500/50 blur-md 
                             opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
                Mark as Complete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content Area */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {currentLesson.title}
              </h2>
              
              {/* Lesson Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {renderContent(currentLesson.content)}
              </div>
              
              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                <button 
                  className={`px-4 py-2 border border-gray-200 dark:border-gray-700 rounded
                            text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700
                            transition-colors duration-300
                            ${isFirstLesson ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handlePreviousLesson}
                  disabled={isFirstLesson}
                >
                  Previous Lesson
                </button>
                <button 
                  className={`px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded
                            transition-colors duration-300 relative group
                            ${isLastLesson ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleNextLesson}
                  disabled={isLastLesson}
                >
                  {/* Priority Glow Effect */}
                  <div className="absolute inset-0 rounded bg-orange-500/50 blur-md 
                               opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
                  Next Lesson
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Course Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="font-medium mb-4 text-gray-900 dark:text-white">Course Content</h3>
              <div className="space-y-2">
                {course.curriculum?.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    to={`/courses/${id}/lesson/${lesson.id}`}
                    className={`block p-3 rounded-lg transition-all duration-300 group
                              ${lesson.id === parseInt(lessonId)
                                ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-500'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-white'
                              }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center
                                    ${lesson.isCompleted 
                                      ? 'bg-green-100 dark:bg-green-500/20' 
                                      : 'bg-gray-100 dark:bg-gray-700'}`}>
                        {lesson.isCompleted ? (
                          <FiCheck className="w-4 h-4 text-green-500" />
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-white">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{lesson.title}</div>
                        <div className="text-xs text-gray-500 dark:text-white flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLesson;