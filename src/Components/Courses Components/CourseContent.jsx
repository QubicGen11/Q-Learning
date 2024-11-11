import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiClock, FiHeart, FiUser, FiPlay } from 'react-icons/fi';
import Navbar_main from '../Navbar Components/Navbar_main';

const CourseContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [isFavorite, setIsFavorite] = useState(false);
  const [courseProgress, setCourseProgress] = useState(0);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    const foundCourse = storedCourses.find(c => c.id === parseInt(id));
    if (foundCourse) {
      setCourse({
        ...foundCourse,
        learningObjectives: foundCourse.learningObjectives || [],
        curriculum: foundCourse.curriculum || [],
        category: foundCourse.category || 'Development',
        subcategory: foundCourse.subcategory || '',
        difficultyLevel: foundCourse.difficultyLevel || 'Intermediate',
        completionTime: foundCourse.completionTime || '1h',
        language: foundCourse.language || 'English',
        productCovered: foundCourse.productCovered || 'Studio',
        courseAudience: foundCourse.courseAudience || '',
        productAlignment: foundCourse.productAlignment || ''
      });

      if (foundCourse.curriculum && foundCourse.curriculum.length > 0) {
        const completedLessons = foundCourse.curriculum.filter(lesson => lesson.isCompleted).length;
        const totalLessons = foundCourse.curriculum.length;
        const progress = Math.round((completedLessons / totalLessons) * 100);
        setCourseProgress(progress);
      }
    }
  }, [id]);

  const handleResume = () => {
    if (course?.curriculum && course.curriculum.length > 0) {
      const nextLesson = course.curriculum.find(lesson => !lesson.isCompleted) || course.curriculum[0];
      if (nextLesson) {
        navigate(`/courses/${course.id}/lesson/${nextLesson.id}`);
      }
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-[130px] py-4 sm:py-6 
                    bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <Navbar_main />
      {/* Breadcrumb */}
      <div className="mb-4 sm:mb-6 text-xs sm:text-sm">
        <Link to="/courses" className="text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-200">
          All Courses
        </Link>
        <span className="mx-2 text-gray-400 dark:text-white">{'>'}</span>
        <span className="text-gray-700 dark:text-white">{course.title}</span>
      </div>

      {/* Course Header */}
      <div className="mb-8 sm:mb-12">
        <div className="text-orange-500 uppercase text-xs sm:text-sm font-medium mb-2">
          {course.category} {course.subcategory && `• ${course.subcategory}`}
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 
                       text-gray-900 dark:text-white">
          {course.title}
        </h1>
        <p className="text-gray-600 dark:text-white mb-4 max-w-3xl text-sm sm:text-base">
          {course.description}
        </p>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-white">
            <FiUser className="text-gray-400 dark:text-white" />
            <span>{course.enrolledStudents || 0} enrolled students</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-white">
            <FiPlay className="dark:text-white" />
            <span>In progress</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6 sm:mb-8 overflow-x-auto">
        <div className="flex gap-6 sm:gap-12 min-w-max pb-1">
          {['OVERVIEW', 'COURSE_CURRICULUM', 'RELATED_COURSES'].map((tab) => (
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

              {/* Course Audience */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Course Audience</h2>
                <p className="text-gray-600 dark:text-white">{course.courseAudience}</p>
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
                      Resume
                    </button>
                  </div>
                </div>
              </div>

              {/* Curriculum Items */}
              <div className="space-y-3 sm:space-y-4">
                {course.curriculum?.map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full 
                                    flex items-center justify-center text-gray-500 dark:text-gray-400">
                        {item.isCompleted ? '✓' : ''}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <FiClock className="mr-1" />
                          <span>{item.duration}</span>
                          {item.type === 'REQUIRED' && (
                            <span className="ml-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 
                                           px-2 py-0.5 rounded text-xs">
                              REQUIRED
                            </span>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate(`/courses/${course.id}/lesson/${item.id}`)}
                        className="px-6 py-2 border dark:border-gray-600 rounded 
                                 hover:bg-gray-50 dark:hover:bg-gray-700 
                                 text-gray-700 dark:text-gray-300 transition-colors duration-300"
                      >
                        {item.isCompleted ? 'Resume' : 'Start'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

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
              <img src={course.logo} alt="" className="w-24 h-24 sm:w-32 sm:h-32 object-contain relative z-10" />
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
              <button 
                onClick={handleResume}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white 
                               py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium 
                               transition-colors duration-300">
                RESUME COURSE
              </button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent; 