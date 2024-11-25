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
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

const SECTIONS = {
  ABOUT: 'about',
  LESSON: 'lesson',
  ASSIGNMENT: 'assignment'
};

const CourseLesson = () => {
  const { id, lessonId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [progress, setProgress] = useState(0);
  const [courseImage, setCourseImage] = useState(null);
  const [currentSection, setCurrentSection] = useState(SECTIONS.LESSON);
  const [readingProgress, setReadingProgress] = useState(0);
  const scrollRef = useRef(null);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [assignmentQuestions, setAssignmentQuestions] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isLessonComplete, setIsLessonComplete] = useState(false);
  const [hasViewedContent, setHasViewedContent] = useState(false);
  const [activeAssignmentId, setActiveAssignmentId] = useState(null);
  const mediaCache = useRef(new Map());
  const [mediaUrls, setMediaUrls] = useState(new Map());

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
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        const courseData = response.data;
        console.log('Raw course data:', courseData);

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
          curriculum: courseData.courseLesson
            .sort((a, b) => {
              // Extract lesson numbers from titles
              const aMatch = a.lesson.lessonTitle.match(/Lesson (\d+):/);
              const bMatch = b.lesson.lessonTitle.match(/Lesson (\d+):/);
              const aNum = aMatch ? parseInt(aMatch[1]) : 0;
              const bNum = bMatch ? parseInt(bMatch[1]) : 0;
              return aNum - bNum;
            })
            .map((lessonItem) => {
              const lessonAssignment = courseData.assignments?.find(
                assignment => assignment.lessonId === lessonItem.lesson.id
              );

              return {
                id: lessonItem.lesson.id,
                title: lessonItem.lesson.lessonTitle, // Keep the original title with lesson number
                duration: lessonItem.lesson.lessonDuration,
                content: lessonItem.lesson.lessonContent,
                order: lessonItem.lesson.order,
                isCompleted: false,
                resources: lessonItem.lesson.lessonResources?.map(resource => ({
                  id: resource.resources.id,
                  title: resource.resources.resourceTitle,
                  description: resource.resources.resourceDescription,
                  link: resource.resources.resourceLink,
                  type: resource.resources.resourceType
                })) || [],
                assignments: lessonAssignment ? [{
                  id: lessonAssignment.id,
                  assignmentTitle: lessonAssignment.assignmentTitle,
                  duration: lessonAssignment.duration,
                  assignmentStatus: lessonAssignment.assignmentStatus || 'pending',
                  assignmentQuestions: lessonAssignment.assignmentQuestions || []
                }] : []
              };
            })
        };

        console.log('Transformed course:', transformedCourse);
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
        setIsLessonComplete(true);
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

  useEffect(() => {
    if (currentSection === SECTIONS.LESSON && currentLesson) {
      // Mark as viewed after 3 seconds (adjust timing as needed)
      const timer = setTimeout(() => {
        setHasViewedContent(true);
        setIsLessonComplete(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
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

  const handleStartAssignment = (lessonId) => {
    try {
      console.log('Starting assignment for lesson:', lessonId);
      const currentLesson = course?.curriculum?.find(l => l.id === lessonId);
      
      if (currentLesson?.assignments && currentLesson.assignments.length > 0) {
        const assignment = currentLesson.assignments[0];
        console.log('Found assignment:', assignment);
        
        setCurrentAssignment(assignment);
        setActiveAssignmentId(assignment.id);
        setAssignmentQuestions(assignment.assignmentQuestions.filter(q => q.questions !== null));
        setCurrentSection(SECTIONS.ASSIGNMENT);
        
        // Scroll the sidebar to show the active assignment
        const assignmentElement = document.getElementById(`assignment-${assignment.id}`);
        if (assignmentElement) {
          assignmentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        toast.error('No assignment found for this lesson');
      }
    } catch (error) {
      console.error('Error handling assignment:', error);
      toast.error('Failed to load assignment');
    }
  };

  useEffect(() => {
    console.log('State changed:', {
      currentSection,
      currentAssignment,
      assignmentQuestions: assignmentQuestions?.length
    });
  }, [currentSection, currentAssignment, assignmentQuestions]);

  useEffect(() => {
    if (currentSection === SECTIONS.ASSIGNMENT) {
      console.log('Assignment View Active:', {
        currentSection,
        assignmentTitle: currentAssignment?.assignmentTitle,
        questions: assignmentQuestions
      });
    }
  }, [currentSection, currentAssignment, assignmentQuestions]);

  const canAccessLesson = (lessonIndex) => {
    if (lessonIndex === 0) return true; // First lesson is always accessible
    
    // Get all previous lessons
    const previousLessons = course?.curriculum.slice(0, lessonIndex);
    // Check if all previous lessons are completed
    return previousLessons.every(lesson => completedLessons.includes(lesson.id));
  };

  const handleLessonComplete = () => {
    try {
      // Update local state
      setCompletedLessons(prev => [...prev, currentLesson.id]);
      
      // Update course state to reflect completion
      setCourse(prevCourse => ({
        ...prevCourse,
        curriculum: prevCourse.curriculum.map(lesson => ({
          ...lesson,
          isCompleted: lesson.id === currentLesson.id ? true : lesson.isCompleted
        }))
      }));

      // Save to localStorage to persist the data
      const savedCompletedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      localStorage.setItem('completedLessons', JSON.stringify([...savedCompletedLessons, currentLesson.id]));

      toast.success('Lesson completed!');

      // If there's an assignment, prompt to start it
      if (currentLesson?.assignments?.length > 0) {
        Swal.fire({
          title: 'Lesson Completed!',
          text: 'Would you like to start the assignment?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Start Assignment',
          cancelButtonText: 'Stay here'
        }).then((result) => {
          if (result.isConfirmed) {
            handleStartAssignment(currentLesson.id);
          }
        });
      }
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
      toast.error('Failed to mark lesson as complete');
    }
  };

  useEffect(() => {
    const savedCompletedLessons = localStorage.getItem('completedLessons');
    if (savedCompletedLessons) {
      setCompletedLessons(JSON.parse(savedCompletedLessons));
    }
  }, []);

  const handleAssignmentSubmit = async () => {
    try {
      // Your submission logic here
      
      // After successful submission, mark the lesson as completed
      if (currentLesson?.id) {
        handleLessonComplete();
        toast.success('Assignment completed successfully!');
        setCurrentSection(SECTIONS.LESSON);
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
      toast.error('Failed to submit assignment');
    }
  };

  useEffect(() => {
    // Only fetch media content once when lesson content changes
    if (currentLesson?.content) {
      const mediaElements = document.querySelectorAll('video, audio');
      mediaElements.forEach(async (element) => {
        const sourceUrl = element.getAttribute('src');
        if (sourceUrl && !mediaCache.current.has(sourceUrl)) {
          try {
            const response = await axios.get(sourceUrl, {
              responseType: 'blob',
              headers: {
                'Cache-Control': 'max-age=3600',
                'Pragma': 'cache'
              }
            });
            
            const blobUrl = URL.createObjectURL(response.data);
            mediaCache.current.set(sourceUrl, blobUrl);
            setMediaUrls(prev => new Map(prev).set(sourceUrl, blobUrl));
          } catch (error) {
            console.error('Error loading media:', error);
          }
        }
      });
    }
  }, [currentLesson?.content]);

  // Use this function to render media content
  const renderContent = (content) => {
    const sanitizedContent = DOMPurify.sanitize(content, {
      ADD_TAGS: ['video', 'source'],
      ADD_ATTR: ['src', 'controls']
    });

    return parse(sanitizedContent, {
      replace: (domNode) => {
        if (domNode.name === 'video' && domNode.attribs?.src) {
          const cachedUrl = mediaUrls.get(domNode.attribs.src);
          if (cachedUrl) {
            return (
              <video 
                controls
                src={cachedUrl}
                className="max-w-full"
              />
            );
          }
        }
        return domNode;
      }
    });
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

  const renderAboutContent = () => {
    if (!course?.aboutCourse) return null;

    return (
      <div className="space-y-8">
        {/* Welcome Message */}
        {course.aboutCourse.welcome && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Welcome Message
            </h3>
            <div className="prose prose-lg dark:prose-invert">
              {parse(course.aboutCourse.welcome)}
            </div>
          </div>
        )}

        {/* What you'll learn */}
        {course.aboutCourse.whatYoullLearn && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              What you'll learn
            </h3>
            <div className="prose prose-lg dark:prose-invert">
              {parse(course.aboutCourse.whatYoullLearn)}
            </div>
          </div>
        )}

        {/* Prerequisites */}
        {course.aboutCourse.prerequisites?.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Prerequisites
            </h3>
            <ul className="space-y-2">
              {course.aboutCourse.prerequisites.map((prerequisite, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                >
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{prerequisite}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* End Objectives */}
        {course.aboutCourse.endObjectives && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Course Objectives
            </h3>
            <div className="prose prose-lg dark:prose-invert">
              {parse(course.aboutCourse.endObjectives)}
            </div>
          </div>
        )}
      </div>
    );
  };

  const LessonFooter = () => {
    const hasAssignment = currentLesson?.assignments?.length > 0;

    return (
      <div className="mt-8 border-t pt-6 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            {previousLessonId && (
              <Link
                to={`/courses/${id}/lesson/${previousLessonId}`}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 
                         hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                Previous Lesson
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!completedLessons.includes(currentLesson?.id) && (
              <button
                onClick={handleLessonComplete}
                disabled={!hasViewedContent}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center gap-2
                  ${hasViewedContent 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              >
                {hasViewedContent ? (
                  <>
                    <FiCheck className="w-4 h-4" />
                    Complete Lesson
                  </>
                ) : (
                  <>
                    <FiClock className="w-4 h-4" />
                    Viewing Lesson...
                  </>
                )}
              </button>
            )}

            {hasAssignment && completedLessons.includes(currentLesson?.id) && (
              <button
                onClick={() => handleStartAssignment(currentLesson.id)}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white 
                         rounded-lg transition-colors flex items-center gap-2"
              >
                Start Assignment
                <FiArrowRight className="w-4 h-4" />
              </button>
            )}

            {!hasAssignment && nextLessonId && (
              <Link
                to={`/courses/${id}/lesson/${nextLessonId}`}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white 
                         rounded-lg transition-colors flex items-center gap-2"
              >
                Next Lesson
                <FiArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderLessonResources = (resources) => {
    if (!resources || resources.length === 0) return null;

    return (
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Lesson Resources
        </h3>
        <div className="space-y-4">
          {resources.map((resource) => (
            <div 
              key={resource.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-lg text-gray-900 dark:text-white">
                    {resource.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {resource.description}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  resource.type === 'PDF' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {resource.type}
                </span>
              </div>
              <div className="mt-4">
                <a 
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  download
                >
                  <span>Download {resource.type}</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
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
              
              {course?.curriculum?.map((lesson, index) => (
                <div key={lesson.id}>
                  {/* Existing lesson content */}
                  <div className="relative flex items-center">
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
                        <div className="flex items-center gap-2">
                          {/* Remove the progress circle for lessons */}
                          <div className="text-sm font-medium break-words w-full">
                            {lesson.title}
                          </div>
                        </div>
                   
                      </div>
                    </button>
                  </div>

                  {/* Assignment Section */}
                  {lesson.assignments && lesson.assignments.length > 0 && (
                    <div className="ml-12 space-y-2 mt-2">
                      {lesson.assignments.map((assignment) => {
                        const isActive = activeAssignmentId === assignment.id;
                        
                        return (
                          <div 
                            key={assignment.id}
                            id={`assignment-${assignment.id}`}
                            className={`p-3 rounded-lg border transition-all duration-200 ${
                              isActive 
                                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 shadow-sm' 
                                : 'bg-gray-50 dark:bg-gray-750 border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              {/* Add progress circle for assignment */}
                              <div className="flex items-center gap-2">
                                <div className="relative w-5 h-5">
                                  <svg className="w-5 h-5" viewBox="0 0 36 36">
                                    <circle
                                      cx="18"
                                      cy="18"
                                      r="16"
                                      fill="none"
                                      className="stroke-current text-gray-200 dark:text-gray-700"
                                      strokeWidth="2"
                                    />
                                    <circle
                                      cx="18"
                                      cy="18"
                                      r="16"
                                      fill="none"
                                      className="stroke-current text-blue-500"
                                      strokeWidth="2"
                                      strokeDasharray={100}
                                      strokeDashoffset={isActive ? 0 : 100}
                                      transform="rotate(-90 18 18)"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    {isActive ? (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                    ) : (
                                      <span className="text-xs text-gray-500">A</span>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <h4 className={`text-sm font-medium ${
                                    isActive 
                                      ? 'text-blue-600 dark:text-blue-400'
                                      : 'text-gray-900 dark:text-gray-100'
                                  }`}>
                                    {assignment.assignmentTitle || 'Assignment'}
                                  </h4>
                                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                    <FiClock className="w-3 h-3" />
                                    <span>{assignment.duration} minutes</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
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
            <div className="max-w-9xl mx-auto">
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
            <div className="max-w-8xl mx-auto">
              <button
                onClick={() => {
                  console.log('Current state:', {
                    currentSection,
                    hasAssignment: !!currentAssignment,
                    questionCount: assignmentQuestions?.length
                  });
                  setCurrentSection(SECTIONS.ASSIGNMENT);
                }}
                className="fixed top-0 right-0 bg-red-500 text-white p-2"
              >
                Debug Switch
              </button>
              {currentSection === SECTIONS.ASSIGNMENT ? (
                // Assignment Content
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentAssignment?.assignmentTitle || 'Assignment'}
                    </h2>
                    <button
                      onClick={() => {
                        setCurrentSection(SECTIONS.LESSON);
                        setCurrentAssignment(null);
                        setAssignmentQuestions([]);
                      }}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 
                               dark:hover:text-white flex items-center gap-2"
                    >
                      <FiArrowLeft /> Back to Lesson
                    </button>
                  </div>

                  {assignmentQuestions.map((item, index) => (
                    item.questions && (
                      <div 
                        key={item.id}
                        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                      >
                        <div className="mb-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Question {index + 1}
                          </span>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                            {item.questions.question}
                          </h3>
                        </div>

                        <div className="space-y-3">
                          {item.questions?.options?.map((option) => (
                            <label
                              key={option.id}
                              className="flex items-center p-3 rounded-lg border border-gray-200 
                                       dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 
                                       cursor-pointer transition-colors duration-150"
                            >
                              <input
                                type="radio"
                                name={`question-${item.questions.id}`}
                                value={option.id}
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="ml-3">{option.option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )
                  ))}

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleAssignmentSubmit}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg 
                               hover:bg-blue-600 transition-colors"
                    >
                      Submit Assignment
                    </button>
                  </div>
                </div>
              ) : currentSection === SECTIONS.ABOUT ? (
                // About Content
                renderAboutContent()
              ) : (
                // Lesson Contentbra
                <div className="space-y-6">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {renderContent(currentLesson?.content)}
                  </div>
                  {renderLessonResources(currentLesson?.resources)}
                  <LessonFooter />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLesson;
