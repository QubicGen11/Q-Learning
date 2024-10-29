import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiClock, FiHeart, FiUser, FiPlay } from 'react-icons/fi';

const CourseContent = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    const foundCourse = storedCourses.find(c => c.id === parseInt(id));
    if (foundCourse) {
      setCourse({
        ...foundCourse,
        learningObjectives: foundCourse.learningObjectives || [],
        curriculum: foundCourse.curriculum || [],
        difficultyLevel: foundCourse.difficultyLevel || 'Intermediate',
        completionTime: foundCourse.completionTime || '1h',
        language: foundCourse.language || 'English',
        productCovered: foundCourse.productCovered || 'Studio',
        courseAudience: foundCourse.courseAudience || '',
        productAlignment: foundCourse.productAlignment || ''
      });
    }
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-[130px] py-4 sm:py-6">
      {/* Breadcrumb */}
      <div className="mb-4 sm:mb-6 text-xs sm:text-sm">
        <Link to="/courses" className="text-gray-500 hover:text-gray-700">All Courses</Link>
        <span className="mx-2">{'>'}</span>
        <span className="text-gray-700">{course.title}</span>
      </div>

      {/* Course Header */}
      <div className="mb-8 sm:mb-12">
        <div className="text-orange-500 uppercase text-xs sm:text-sm font-medium mb-2">COURSE</div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{course.title}</h1>
        <p className="text-gray-600 mb-4 max-w-3xl text-sm sm:text-base">{course.description}</p>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
          <div className="flex items-center gap-2">
            <FiUser className="text-gray-400" />
            <span>{course.enrolledStudents || 0} enrolled students</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <FiPlay />
            <span>In progress</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6 sm:mb-8 overflow-x-auto">
        <div className="flex gap-6 sm:gap-12 min-w-max pb-1">
          <button
            className={`pb-3 sm:pb-4 px-1 text-sm sm:text-base whitespace-nowrap
              ${activeTab === 'OVERVIEW' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('OVERVIEW')}
          >
            OVERVIEW
          </button>
          <button
            className={`pb-3 sm:pb-4 px-1 text-sm sm:text-base whitespace-nowrap
              ${activeTab === 'COURSE_CURRICULUM' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('COURSE_CURRICULUM')}
          >
            COURSE CURRICULUM
          </button>
          <button
            className={`pb-3 sm:pb-4 px-1 text-sm sm:text-base whitespace-nowrap
              ${activeTab === 'RELATED_COURSES' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('RELATED_COURSES')}
          >
            RELATED COURSES
          </button>
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
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Course details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex items-start gap-3">
                    <div>
                      <h3 className="text-orange-500 font-medium mb-1">DIFFICULTY LEVEL</h3>
                      <p>{course.difficultyLevel}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div>
                      <h3 className="text-orange-500 font-medium mb-1">COMPLETION TIME</h3>
                      <p>{course.completionTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div>
                      <h3 className="text-orange-500 font-medium mb-1">LANGUAGE</h3>
                      <p>{course.language}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div>
                      <h3 className="text-orange-500 font-medium mb-1">PRODUCT COVERED</h3>
                      <p>{course.productCovered}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Audience */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Course Audience</h2>
                <p className="text-gray-600">{course.courseAudience}</p>
              </div>

              {/* Learning Objectives */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Learning Objectives</h2>
                <p className="text-gray-600 mb-4">At the end of this course, you should be able to:</p>
                <ul className="space-y-3">
                  {Array.isArray(course.learningObjectives) && course.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Alignment */}
              {course.productAlignment && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium mb-2">Product alignment:</p>
                  <p className="text-gray-600">{course.productAlignment}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'COURSE_CURRICULUM' && (
            <>
              {/* Continue Section */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl text-gray-700 font-medium mb-4">
                  Continue where you left off
                </h2>
                <div className="bg-white border rounded-lg p-3 sm:p-4">
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                      <img src={course.logo} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-medium text-sm sm:text-base truncate">{course.title}</h3>
                      <div className="flex items-center text-xs sm:text-sm text-gray-500">
                        <FiClock className="mr-1" />
                        <span>{course.duration}</span>
                        <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs">
                          REQUIRED
                        </span>
                      </div>
                    </div>
                    <button className="px-4 sm:px-6 py-1.5 sm:py-2 border rounded text-sm hover:bg-gray-50">
                      Resume
                    </button>
                  </div>
                </div>
              </div>

              {/* Curriculum Section */}
              <div className="space-y-3 sm:space-y-4">
                {course.curriculum?.map((item, index) => (
                  <div key={index} className="bg-white border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        {item.isCompleted ? '✓' : ''}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <FiClock className="mr-1" />
                          <span>{item.duration}</span>
                          {item.type === 'REQUIRED' && (
                            <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs">
                              REQUIRED
                            </span>
                          )}
                        </div>
                      </div>
                      <Link 
                        to={`/courses/${course.id}/lesson/${item.id}`}
                        className="px-6 py-2 border rounded hover:bg-gray-50"
                      >
                        {item.isCompleted ? 'Resume' : 'Start'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Diploma Section */}
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="text-yellow-500 text-3xl">🏆</div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Diploma of completion</h3>
                    <p className="text-gray-500">Complete the Course to unlock</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 order-first lg:order-last">
          <div className="bg-white border rounded-lg p-4 sm:p-6 lg:sticky lg:top-6">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <img src={course.logo} alt="" className="w-24 h-24 sm:w-32 sm:h-32 object-contain" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{course.title}</h2>
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 text-sm sm:text-base">
              <div className="flex items-center gap-2 text-gray-600">
                <FiClock />
                <span>{course.duration}</span>
              </div>
              {course.diplomaAvailable && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span>🎓</span>
                  <span>Diploma of Completion included</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <button className="w-full bg-orange-500 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-orange-600">
                RESUME COURSE
              </button>
              <button 
                className="w-full border border-gray-300 py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-gray-50"
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