import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiClock, FiArrowLeft, FiCheck, FiArrowRight } from 'react-icons/fi';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import Navbar_main from '../Navbar Components/Navbar_main';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../../config/apiConfig';
import './Course.css';
import Loader from '../Common/Loader';

const CourseLesson = () => {
  const { id, lessonId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [progress, setProgress] = useState(0);
  const [courseImage, setCourseImage] = useState(null);
  const [currentSection, setCurrentSection] = useState('about');
  const [readingProgress, setReadingProgress] = useState(0);
  const scrollRef = useRef(null);

  const currentIndex = course?.curriculum?.findIndex(
    lesson => lesson.id === lessonId
  );

  const nextLessonId = currentIndex < (course?.curriculum?.length - 1) 
    ? course?.curriculum[currentIndex + 1]?.id 
    : null;

  const previousLessonId = currentIndex > 0 
    ? course?.curriculum[currentIndex - 1]?.id 
    : null;

  const isFirstLesson = currentIndex === 0;
  const isLastLesson = currentIndex === (course?.curriculum?.length - 1);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await axios.get(`${config.CURRENT_URL}/qlms/getCourseById/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const courseData = response.data;
        
        // Transform the API data to match your existing structure
        const transformedCourse = {
          id: courseData.id,
          title: courseData.courseTitle,
          courseImage: courseData.courseBanner,
          aboutCourse: {
            welcome: courseData.welcome,
            prerequisites: courseData.coursePreRequisites.map(pre => pre.preRequisites.preRequisiteRequired),
            whatYoullLearn: courseData.learningObjective,
            endObjectives: courseData.endObjective,
          },
          curriculum: courseData.courseLesson.map(lessonItem => ({
            id: lessonItem.lesson.id,
            title: lessonItem.lesson.lessonTitle,
            duration: lessonItem.lesson.lessonDuration,
            content: lessonItem.lesson.lessonContent,
            isCompleted: false
          }))
        };

        setCourse(transformedCourse);
        const lesson = transformedCourse.curriculum?.find(l => l.id === lessonId);
        setCurrentLesson(lesson);
        setCourseImage(transformedCourse.courseImage);
      } catch (error) {
        console.error('Error fetching course:', error);
        // Handle error appropriately
      }
    };

    if (id) {
      fetchCourseData();
    }
  }, [id, lessonId]);

  useEffect(() => {
    const calculateReadingProgress = () => {
      if (!scrollRef.current || currentSection === 'about') {
        setReadingProgress(0);
        return;
      }
      
      const element = scrollRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const windowScrollTop = element.scrollTop;
      
      if (windowScrollTop === 0) {
        setReadingProgress(0);
      } else if (windowScrollTop + element.clientHeight >= element.scrollHeight - 10) {
        setReadingProgress(100);
      } else {
        const progress = (windowScrollTop / totalHeight) * 100;
        setReadingProgress(Math.round(progress));
      }
    };

    const contentElement = scrollRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', calculateReadingProgress);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', calculateReadingProgress);
      }
    };
  }, [currentLesson, currentSection]);

  const handleSectionClick = (section) => {
    setCurrentSection(section);
    if (section !== 'about') {
      const lesson = course.curriculum.find(l => l.id === section);
      setCurrentLesson(lesson);
    } else {
      setCurrentLesson(null);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div>
          <Loader/>
        </div>
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

            /* Code block styling */
            .lesson-content pre,
            .lesson-content code {
              background-color: #f6f8fa;  /* Light gray background */
              border: 1px solid #e1e4e8;  /* Light border */
              border-radius: 6px;
              padding: 16px;
              margin: 8px 0;
              font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
              font-size: 14px;
              line-height: 1.45;
              overflow-x: auto;
              color: #24292e;  /* Dark text color */
            }

            /* Dark mode styles */
            @media (prefers-color-scheme: dark) {
              .lesson-content pre,
              .lesson-content code {
                background-color: #1f2937;  /* Dark background */
                border-color: #374151;
                color: #e5e7eb;  /* Light text color */
              }
            }

            /* Inline code styling */
            .lesson-content code:not(pre code) {
              background-color: rgba(175, 184, 193, 0.2);
              padding: 0.2em 0.4em;
              border-radius: 6px;
              font-size: 85%;
            }

            /* Code block header (for language name) */
            .lesson-content pre::before {
              content: attr(data-language);
              display: block;
              background-color: #f1f5f9;
              padding: 4px 16px;
              margin: -16px -16px 16px -16px;
              border-bottom: 1px solid #e1e4e8;
              border-radius: 6px 6px 0 0;
              font-size: 12px;
              color: #57606a;
            }

            /* Copy button styles */
            .code-block-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              background-color: #f1f5f9;
              padding: 8px 16px;
              border-bottom: 1px solid #e1e4e8;
            }

            .copy-button {
              padding: 4px 8px;
              background-color: transparent;
              border: 1px solid #d1d5db;
              border-radius: 4px;
              cursor: pointer;
              font-size: 12px;
              color: #57606a;
            }

            .copy-button:hover {
              background-color: #f3f4f6;
            }
          `}
        </style>
        <div className="ql-editor bg-white dark:bg-gray-800">
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
              
              {/* Changed from reverse to normal order */}
              {course?.curriculum?.map((lesson, index) => (
                <div key={lesson.id} className="relative flex items-center">
                  {/* Progress Circle */}
                  <div className="absolute -left-2 flex items-center justify-center">
                    <div className="relative w-8 h-8">
                      {/* Background Circle */}
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-gray-200 dark:text-gray-700"
                          strokeWidth="2"
                        />
                        {/* Progress Circle */}
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-blue-500"
                          strokeWidth="2"
                          strokeDasharray={100}
                          strokeDashoffset={currentLesson?.id === lesson.id && currentSection !== 'about' 
                            ? 100 - readingProgress 
                            : 100}
                          transform="rotate(-90 18 18)"
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Center Number/Check */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {lesson.isCompleted ? (
                          <FiCheck className="w-4 h-4 text-green-500" />
                        ) : (
                          <span className="text-sm text-gray-600">{index + 1}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Lesson Button */}
                  <button
                    onClick={() => handleSectionClick(lesson.id)}
                    className={`w-full ml-8 flex items-center gap-3 p-3 rounded-lg transition-colors
                      ${currentLesson?.id === lesson.id
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  >
                    <div className="flex flex-col items-start text-left">
                      <div className="text-sm font-medium break-words w-full">{lesson.title}</div>
                      {lesson.duration && (
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          <span>{lesson.duration}</span>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Adjusted margin and max-width */}
        <div 
          ref={scrollRef}
          className="ml-72 flex-1 overflow-y-auto"
          style={{ height: 'calc(100vh - 56px)' }}
        >
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 border-b dark:border-gray-700">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {currentSection === 'about' ? 'About This Course' : currentLesson?.title}
              </h1>
              {currentSection !== 'about' && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FiClock className="w-4 h-4" />
                  <span>Duration: {currentLesson?.duration}</span>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              {/* About This Course Section */}
              {currentSection === 'about' && (
                <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                  
                  {/* Welcome Message */}
                  {course.aboutCourse?.welcome && (
                    <div className="prose dark:prose-invert mb-6">
                      {parse(DOMPurify.sanitize(course.aboutCourse.welcome))}
                    </div>
                  )}
                  
                  {/* Prerequisites */}
                  {course.aboutCourse?.prerequisites?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Prerequisites</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {course.aboutCourse.prerequisites.map((prereq, index) => (
                          <li 
                            key={index}
                            className="text-gray-700 dark:text-gray-300"
                          >
                            {parse(DOMPurify.sanitize(prereq))}
                          </li>
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
                  
                  {/* What You'll Learn */}
                  {course.aboutCourse?.whatYoullLearn && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
                      <div className="prose dark:prose-invert">
                        {parse(DOMPurify.sanitize(course.aboutCourse.whatYoullLearn))}
                      </div>
                    </div>
                  )}
                  
                  {/* End Objectives */}
                  {course.aboutCourse?.endObjectives && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">At the End of This Course, You Should Be Able To:</h3>
                      <div className="prose dark:prose-invert">
                        {parse(DOMPurify.sanitize(course.aboutCourse.endObjectives))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Lesson Content */}
              {currentSection !== 'about' && (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {renderContent(currentLesson?.content)}
                </div>
              )}
              
              {/* Navigation Buttons - Updated Style */}
              <div className="mt-12 flex items-center justify-between border-t dark:border-gray-700 pt-6">
                {currentSection !== 'about' && (
                  <>
                    {!isFirstLesson && previousLessonId && (
                      <Link 
                        to={`/courses/${id}/lesson/${previousLessonId}`}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <FiArrowLeft className="w-4 h-4" />
                        <span>Previous Lesson</span>
                      </Link>
                    )}
                    
                    {!isLastLesson && nextLessonId && (
                      <Link 
                        to={`/courses/${id}/lesson/${nextLessonId}`}
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-600 ml-auto transition-colors"
                      >
                        <span>Next Lesson</span>
                        <FiArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </>
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