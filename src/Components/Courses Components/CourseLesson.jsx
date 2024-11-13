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
  const [courseImage, setCourseImage] = useState(null);
  const [currentSection, setCurrentSection] = useState('about');

  const currentIndex = course?.curriculum?.findIndex(
    lesson => lesson.id === parseInt(lessonId)
  );

  const nextLessonId = currentIndex < (course?.curriculum?.length - 1) 
    ? course?.curriculum[currentIndex + 1]?.id 
    : null;

  const previousLessonId = currentIndex > 0 
    ? course?.curriculum[currentIndex - 1]?.id 
    : null;

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    const foundCourse = storedCourses.find(c => c.id === parseInt(id));
    if (foundCourse) {
      setCourse(foundCourse);
      const lesson = foundCourse.curriculum?.find(l => l.id === parseInt(lessonId));
      setCurrentLesson(lesson);
      setCourseImage(foundCourse.courseImage);
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

  const handleSectionClick = (section) => {
    setCurrentSection(section);
  };

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  const renderContent = (content) => {
    const sanitizedContent = DOMPurify.sanitize(content, {
      ADD_TAGS: ['iframe', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img', 'span', 'video', 'source'],
      ADD_ATTR: ['target', 'href', 'src', 'alt', 'class', 'style', 'controls', 'allowfullscreen', 'frameborder', 'allow', 'width', 'height']
    });

    return (
      <div className="lesson-content">
        <style>
          {`
            .lesson-content {
              font-size: 16px;
              line-height: 1.6;
            }

            .lesson-content p {
              margin-bottom: 1.5rem;
            }

            .lesson-content h1, 
            .lesson-content h2, 
            .lesson-content h3 {
              margin-top: 2rem;
              margin-bottom: 1rem;
              font-weight: 600;
            }

            .lesson-content img {
              max-width: 100%;
              height: auto;
              margin: 2rem auto;
              display: block;
            }

            .lesson-content ul, 
            .lesson-content ol {
              margin-left: 1.5rem;
              margin-bottom: 1.5rem;
            }

            .lesson-content li {
              margin-bottom: 0.5rem;
            }

            .lesson-content table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 1.5rem;
            }

            .lesson-content td, 
            .lesson-content th {
              border: 1px solid #e2e8f0;
              padding: 0.75rem;
            }

            .lesson-content code {
              background-color: #f1f5f9;
              padding: 0.2em 0.4em;
              border-radius: 0.25rem;
              font-size: 0.875em;
            }

            /* Preserve whitespace in certain elements */
            .lesson-content pre,
            .lesson-content code {
              white-space: pre-wrap;
            }

            /* Fix spacing between inline elements */
            .lesson-content span {
              display: inline;
              margin: 0;
              padding: 0;
            }
          `}
        </style>
        <div className="ql-editor">
          {parse(sanitizedContent)}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <div className="bg-black text-white h-14 flex items-center justify-between px-4 fixed w-full top-0 z-50">
        <div className="flex items-center space-x-4">
          <Link to={`/courses/${id}`} className="flex items-center">
            <span className="mr-2">←</span>
            Back to courses
          </Link>
          <span className="font-bold">{course?.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Course structure</span>
          {nextLessonId && (
            <Link 
              to={`/courses/${id}/lesson/${nextLessonId}`} 
              className="text-blue-400 hover:text-blue-300"
            >
              Next →
            </Link>
          )}
        </div>
      </div>

      {/* Main Content Area with Fixed Sidebar */}
      <div className="flex pt-14">
        {/* Fixed Left Sidebar */}
        <div className="w-72 bg-gray-100 dark:bg-gray-800 fixed h-[calc(100vh-56px)] overflow-y-auto">
          {/* Course Banner */}
          <div className="relative h-48">
            {courseImage && (
              <>
                {/* Main background image with overlay */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-black/60 z-10" />
                  <img 
                    src={courseImage} 
                    alt={course?.title}
                    className="w-full h-full object-cover"
                    style={{
                      opacity: `${course?.bannerSettings?.opacity || 70}%`,
                      objectPosition: `center ${course?.bannerSettings?.yPosition || 50}%`
                    }}
                  />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent z-20" />
              </>
            )}

            {/* Course Title and Progress */}
            <div className="relative z-30 p-6">
              <h1 className="text-xl font-bold text-white mb-2">{course?.title}</h1>
              <div className="text-sm text-gray-300 mb-4">
                {progress}% COMPLETE
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full">
                <div 
                  className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Course Navigation */}
          <div className="px-4 py-4">
            {/* Introduction Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                <span>INTRODUCTION</span>
              </div>
              
              {/* About this course button */}
              <button 
                onClick={() => handleSectionClick('about')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors
                  ${currentSection === 'about' 
                    ? 'bg-white dark:bg-gray-700 shadow-sm' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">1</span>
                </div>
                <span className="text-sm font-medium">About this course</span>
              </button>
            </div>

            {/* Course Content Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                <span>COURSE CONTENT</span>
              </div>
              
              {/* Existing course curriculum mapping */}
              {course?.curriculum?.map((lesson, index) => (
                <Link
                  key={lesson.id}
                  to={`/courses/${id}/lesson/${lesson.id}`}
                  className={`block p-3 rounded-lg mb-2 transition-all duration-300
                    ${lesson.id === parseInt(lessonId)
                      ? 'bg-white dark:bg-gray-700 shadow-sm'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center
                      ${lesson.isCompleted 
                        ? 'bg-green-100 dark:bg-green-500/20' 
                        : 'bg-gray-200 dark:bg-gray-600'}`}
                    >
                      {lesson.isCompleted ? (
                        <FiCheck className="w-4 h-4 text-green-500" />
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{lesson.title}</div>
                      {lesson.duration && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          <span>{lesson.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Adjusted margin and max-width */}
        <div className="ml-72 flex-1">
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 border-b dark:border-gray-700">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {currentLesson?.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FiClock className="w-4 h-4" />
                <span>Duration: {currentLesson?.duration}</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              {/* About This Course Section */}
              {currentLesson?.id === course?.curriculum[0]?.id && (
                <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                  
                  {/* Welcome Message */}
                  {course.aboutCourse?.welcome && (
                    <div className="prose dark:prose-invert mb-6">
                      <p>{course.aboutCourse.welcome}</p>
                    </div>
                  )}
                  
                  {/* Prerequisites */}
                  {course.aboutCourse?.prerequisites?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {course.aboutCourse.prerequisites.map((prereq, index) => (
                          <li key={index}>{prereq}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Requirements */}
                  {course.aboutCourse?.requirements?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Course Requirements</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {course.aboutCourse.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Learning Outcomes */}
                  {course.aboutCourse?.learningOutcomes?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {course.aboutCourse.learningOutcomes.map((outcome, index) => (
                          <li key={index}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              {/* Lesson Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {renderContent(currentLesson?.content)}
              </div>
              
              {/* Navigation Buttons - Updated Style */}
              <div className="mt-12 flex items-center justify-between border-t dark:border-gray-700 pt-6">
                {!isFirstLesson && (
                  <Link 
                    to={`/courses/${id}/lesson/${previousLessonId}`}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <span>←</span>
                    <span>Previous</span>
                  </Link>
                )}
                
                {!isLastLesson && (
                  <Link 
                    to={`/courses/${id}/lesson/${nextLessonId}`}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-600 ml-auto transition-colors"
                  >
                    <span>Next</span>
                    <span>→</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLesson;