import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiClock, FiHeart, FiUser, FiPlay, FiShoppingCart, FiBook } from 'react-icons/fi';
import Navbar_main from '../Navbar Components/Navbar_main';
import CourseCommunity from './CourseCommunity';
import config from '../../config/apiConfig';
import Loader from '../Common/Loader';
import { toast } from 'react-hot-toast';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
// import { div } from 'three/webgpu';

const CourseContent = ({ previewMode = false, previewData = null }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [isFavorite, setIsFavorite] = useState(false);
  const [courseProgress, setCourseProgress] = useState(0);
  const [courseImage, setCourseImage] = useState(null);
  const [techLogos, setTechLogos] = useState({
    html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    redux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    graphql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [savedAssignments, setSavedAssignments] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const customTechLogos = localStorage.getItem('customTechLogos');
    if (customTechLogos) {
      try {
        const parsedLogos = JSON.parse(customTechLogos);
        setTechLogos(prevLogos => ({
          ...prevLogos,
          ...parsedLogos
        }));
      } catch (error) {
        console.error('Error parsing custom tech logos:', error);
      }
    }
  }, []);

  useEffect(() => {
    const savedQuestionsStr = localStorage.getItem('savedQuestions');
    if (savedQuestionsStr) {
      try {
        const questions = JSON.parse(savedQuestionsStr);
        setSavedAssignments(questions);
      } catch (error) {
        console.error('Error parsing saved assignments:', error);
      }
    }
  }, []);

  useEffect(() => {
    const storedAssignments = JSON.parse(localStorage.getItem('courseAssignments')) || [];
    setAssignments(storedAssignments);
  }, []);

  useEffect(() => {
    if (previewMode && previewData) {
      setCourse(previewData);
      setCourseImage(previewData.courseBanner);
      return;
    }

    const fetchCourse = async () => {
      try {
        setIsLoading(true);  // Start loading
        // Get access token from cookies
        const accessToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('accessToken='))
          ?.split('=')[1];

        const response = await fetch(`${config.CURRENT_URL}/qlms/getCourseById/${id}`, {
        
        });

        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }

        const data = await response.json();
        
        // Process the course data to match your component's expected format
        const processedCourse = {
          id: data.id,
          title: data.courseTitle,
          description: data.description,
          category: data.category,
          subcategory: data.subCategory,
          difficultyLevel: data.difficultyLevel,
          completionTime: data.completionTime,
          language: data.language,
          productCovered: data.productCovered,
          courseAudience: data.courseAudience,
          learningObjectives: data.learningObjective.split(',').map(obj => obj.trim()),
          price: data.price,
          originalPrice: data.originalPrice,
          discount: data.discount,
          duration: data.duration,
          courseImage: data.courseBanner,
          logo: data.technologyImage,
          curriculum: data.courseLesson.map(lesson => ({
            id: lesson.lessonId,
            title: lesson.lesson.lessonTitle,
            duration: lesson.lesson.lessonDuration,
            content: lesson.lesson.lessonContent,
            type: 'REQUIRED',
            isCompleted: false,
            // Add assignment if exists for this lesson
            assignment: data.assignments.find(
              assignment => assignment.lessonId === lesson.lessonId
            )
          })),
          techStackData: data.technologiesUsed.split(',').map(tech => ({
            name: tech.trim(),
            url: techLogos[tech.toLowerCase().trim()] || techLogos.html
          })),
          prerequisites: data.coursePreRequisites.map(prereq => ({
            required: prereq.preRequisites.preRequisiteRequired,
            level: prereq.preRequisites.preRequisiteLevel
          })),
          coursePreRequisites: data.coursePreRequisites || []
        };

        setCourse(processedCourse);
        setCourseImage(data.courseBanner);
      } catch (error) {
        console.error('Error loading course:', error);
        toast.error('Failed to load course');
      } finally {
        setIsLoading(false);  // Stop loading
      }
    };

    fetchCourse();
  }, [id, previewMode, previewData, techLogos]);

  const handleResume = () => {
    if (previewMode) return;
    if (course?.curriculum && course.curriculum.length > 0) {
      const nextLesson = course.curriculum.find(lesson => !lesson.isCompleted) || course.curriculum[0];
      if (nextLesson) {
        navigate(`/courses/${course.id}/lesson/${nextLesson.id}`);
      }
    }
  };

  const handleAddToCart = (course) => {
    // Implement add to cart logic here
  };

  const renderAssignments = () => {
    const assignments = JSON.parse(localStorage.getItem('courseAssignments')) || [];
    
    return (
      <div className="mt-8">

      </div>
    );
  };

  if (!course) {
    return <Loader/>;
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-[130px] py-4 sm:py-6 
                    bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {!previewMode && <Navbar_main />}
      {/* Breadcrumb */}
      <div className="mb-4 sm:mb-6 text-xs sm:text-sm">
        <Link to="/courses" className="text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-200">
          All Courses
        </Link>
        <span className="mx-2 text-gray-400 dark:text-white">{'>'}</span>
        <span className="text-gray-700 dark:text-white">{course.title}</span>
      </div>

      {/* Course Header with Banner */}
      <div className="relative mb-8 sm:mb-12">
        {courseImage && (
          <>
            {/* Main background image with overlay */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark overlay */}
              <img 
                src={courseImage} 
                alt={course.title}
                className="w-full h-full object-cover"
                style={{
                  opacity: `${course.bannerSettings?.opacity || 70}%`,
                  objectPosition: `center ${course.bannerSettings?.yPosition || 50}%`
                }}
              />
            </div>

            {/* Dark mode specific overlay */}
            <div className="absolute inset-0 overflow-hidden rounded-lg hidden dark:block">
              <div className="absolute inset-0 bg-black/80 z-10" /> {/* Darker overlay for dark mode */}
              <img 
                src={courseImage} 
                alt={course.title}
                className="w-full h-full object-cover"
                style={{
                  opacity: `${course.bannerSettings?.darkModeOpacity || 40}%`,
                  objectPosition: `center ${course.bannerSettings?.yPosition || 50}%`
                }}
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-20" />
          </>
        )}
        
        {/* Content */}
        <div className="relative z-30 p-6 sm:p-8">
          <div className="text-orange-500 uppercase text-xs sm:text-sm font-medium mb-2">
            {course.category} {course.subcategory && `• ${course.subcategory}`}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white">
            {course.title}
          </h1>
          <p className="text-gray-200 mb-4 max-w-3xl text-sm sm:text-base">
            {parse(DOMPurify.sanitize(course.description))}
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-200">
              <FiUser className="text-gray-300" />
              <span>{course.enrolledStudents || 0} enrolled students</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <FiPlay className="text-gray-300" />
              <span>In progress</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6 sm:mb-8 overflow-x-auto">
        <div className="flex gap-6 sm:gap-12 min-w-max pb-1">
          {['OVERVIEW', 'COURSE_CURRICULUM', 'COMMUNITY', 'RELATED_COURSES'].map((tab) => (
            <button
              key={tab}
              className={`pb-3 sm:pb-4 px-1 text-sm sm:text-base whitespace-nowrap transition-colors duration-300
                ${activeTab === tab 
                  ? 'border-b-2 border-orange-500 text-orange-500' 
                  : 'text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-200'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2">
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-6 sm:space-y-8">
              {/* Course Details */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 
                             text-gray-900 dark:text-white">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Course details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    { label: 'CATEGORY', value: `${course.category || 'Development'}${course.subcategory ? ` • ${course.subcategory}` : ''}` },
                    { label: 'DIFFICULTY LEVEL', value: course.difficultyLevel },
                    { label: 'COMPLETION TIME', value: course.completionTime },
                    { label: 'LANGUAGE', value: course.language },
                    { label: 'PRODUCT COVERED', value: course.productCovered }
                  ].map((detail, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div>
                        <h3 className="text-orange-500 font-medium mb-1">{detail.label}</h3>
                        <p className="text-gray-700 dark:text-white">{detail.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites Section */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Prerequisites
                </h2>
                
                <div className="dark:bg-gray-800 p-4 rounded-lg">
                  {course?.coursePreRequisites?.map((prereq, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      {prereq?.preRequisites?.preRequisiteRequired && (
                        <div className="space-y-4">
                          <div 
                            className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-200"
                          >
                            <li>
                              {parse(DOMPurify.sanitize(prereq.preRequisites.preRequisiteRequired))}
                            </li>
                            {/* {parse(DOMPurify.sanitize(prereq.preRequisites.preRequisiteRequired))} */}
                          </div>
                     
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Audience */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Course Audience</h2>
                <div 
                  className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-200 [&_ol]:list-none [&_ol>li]:before:content-none"
                >
                  {course?.courseAudience ? (
                    parse(DOMPurify.sanitize(course.courseAudience, {
                      USE_PROFILES: { html: true },
                      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h3', 'h4'],
                      ALLOWED_ATTR: ['class'],
                      FORBID_TAGS: ['style'],
                      FORBID_ATTR: ['style'],
                    }))
                  ) : (
                    <p>No audience information available</p>
                  )}
                </div>
              </div>

              {/* Learning Objectives */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Learning Objectives</h2>
                <p className="text-gray-600 dark:text-white mb-4">
                  At the end of this course, you should be able to:
                </p>
                <ul className="space-y-3">
                  {course.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-white">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Alignment */}
              {course.productAlignment && (
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="font-medium mb-2 text-gray-900 dark:text-white">Product alignment:</p>
                  <p className="text-gray-600 dark:text-white">{course.productAlignment}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'COURSE_CURRICULUM' && (
            <>
              {/* Continue Section */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 font-medium mb-4">
                  Continue where you left off
                </h2>
                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 relative group">
                      {/* Glow effect */}
                      <div className="absolute inset-0 dark:bg-blue-500/20 rounded-full 
                                    blur-xl scale-150 opacity-0 dark:opacity-0 
                                    dark:group-hover:opacity-75 transition-all duration-300 -z-10"></div>
                      <img src={course.logo} alt="" className="w-full h-full object-contain relative z-10" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-medium text-sm sm:text-base truncate text-gray-900 dark:text-white">
                        {course.title}
                      </h3>
                      <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        <FiClock className="mr-1" />
                        <span>{course.duration}</span>
                        <span className="ml-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 
                                       px-2 py-0.5 rounded text-xs">
                          REQUIRED
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={handleResume}
                      className="px-4 sm:px-6 py-1.5 sm:py-2 border dark:border-gray-600 rounded 
                               text-sm hover:bg-gray-50 dark:hover:bg-gray-700 
                               text-gray-700 dark:text-gray-300 transition-colors duration-300">
                      Start
                    </button>
                  </div>
                </div>
              </div>

              {/* Curriculum Items */}
              <div className="space-y-4">
                {course?.curriculum
                  .sort((a, b) => {
                    // Extract lesson numbers and compare
                    const aMatch = a.title.match(/Lesson (\d+):/);
                    const bMatch = b.title.match(/Lesson (\d+):/);
                    const aNum = aMatch ? parseInt(aMatch[1]) : 0;
                    const bNum = bMatch ? parseInt(bMatch[1]) : 0;
                    return aNum - bNum;
                  })
                  .map((lesson, index) => (
                    <div 
                      key={lesson.id} 
                      className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden"
                    >
                      {/* Lesson Header */}
                      <div className="p-4 border-b dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-500">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">{lesson.title}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                <FiClock className="w-4 h-4" />
                                <span>{lesson.duration} minutes</span>
                              </div>
                            </div>
                          </div>
                          <button 
                            className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-300"
                            onClick={() => navigate(`/courses/${course.id}/lesson/${lesson.id}`)}
                          >
                            Start Lesson
                          </button>
                        </div>
                      </div>

                      {/* Assignment Section (if exists) */}
                      {lesson.assignment && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                <FiBook className="text-orange-500" />
                                Assignment: {lesson.assignment.assignmentTitle}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                <FiClock className="w-4 h-4" />
                                <span>{lesson.assignment.duration} minutes</span>
                                <span>•</span>
                                <span>{lesson.assignment.assignmentQuestions?.length || 0} questions</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 text-xs rounded ${
                                lesson.assignment.assignmentStatus === 'COMPLETED' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                              }`}>
                                {lesson.assignment.assignmentStatus || 'PENDING'}
                              </span>
                              <button 
                                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
                                onClick={() => {
                                  // Handle starting assignment
                                  console.log('Starting assignment:', lesson.assignment.id);
                                }}
                              >
                                Start Assignment
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              {/* Add the assignments section */}
              {renderAssignments()}

              {/* Diploma Section */}
              <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="text-yellow-500 text-3xl">🏆</div>
                  <div>
                    <h3 className="text-xl font-medium mb-1 text-gray-900 dark:text-white">
                      Diploma of completion
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">Complete the Course to unlock</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'COMMUNITY' && (
            <CourseCommunity courseId={id} />
          )}

          {activeTab === 'RELATED_COURSES' && (
            // ... existing related courses content ...
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                Related Courses
              </h2>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 order-first lg:order-last">
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 sm:p-6 
                         lg:sticky lg:top-6">
            <div className="flex items-center justify-center mb-4 sm:mb-6 relative group">
              {/* Glow effect for logo */}
              <div className="absolute inset-0 dark:bg-blue-500/20 rounded-full 
                            blur-xl scale-150 opacity-0 dark:opacity-0 
                            dark:group-hover:opacity-75 transition-all duration-300 -z-10"></div>
              <img 
                src={course.logo || techLogos[course.techStack?.[0]] || techLogos.html}
                alt="" 
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain relative z-10" 
              />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">
              {course.title}
            </h2>
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 text-sm sm:text-base">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FiClock />
                <span>{course.duration}</span>
              </div>
              {course.diplomaAvailable && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>🎓</span>
                  <span>Diploma of Completion included</span>
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Course Progress</span>
                <span>{courseProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${courseProgress}%` }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {/* Add to Cart Button */}
              <button 
                onClick={() => handleAddToCart(course)}
                className="w-full bg-[#A435F0] hover:bg-[#8710ED] text-white 
                           py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium 
                           transition-colors duration-300 flex items-center justify-center gap-2">
                <FiShoppingCart />
                ADD TO CART
              </button>

              {/* Favorite Button */}
              <button 
                className="w-full border dark:border-gray-600 py-2.5 sm:py-3 rounded-lg 
                         flex items-center justify-center gap-2 text-sm sm:text-base 
                         hover:bg-gray-50 dark:hover:bg-gray-700 
                         text-gray-700 dark:text-gray-300 transition-colors duration-300"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <FiHeart className={isFavorite ? "text-red-500 fill-current" : ""} />
                FAVORITE
              </button>

              {/* Price Display */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₹{course.price || 0}
                  </span>
                  {course.originalPrice && course.originalPrice > course.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{course.originalPrice}
                    </span>
                  )}
                </div>
                {course.discount > 0 && (
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {course.discount}% OFF
                  </span>
                )}
              </div>

              {/* Course Info */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FiClock />
                  <span>{course.duration}</span>
                </div>
                {course.diplomaAvailable && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <span>🎓</span>
                    <span>Diploma of Completion included</span>
                  </div>
                )}
              </div>

              {/* Progress Bar - Only show for enrolled courses */}
              {courseProgress > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Course Progress</span>
                    <span>{courseProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${courseProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            {course.techStackData && course.techStackData.length > 0 && (
              <div className="flex justify-center gap-2 mb-4">
                {course.techStackData.map(tech => (
                  <img 
                    key={tech.name}
                    src={tech.url}
                    alt={tech.name}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = techLogos.html;
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent; 