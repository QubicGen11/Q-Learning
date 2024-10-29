import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiClock, FiArrowLeft, FiCheck } from 'react-icons/fi';
import DOMPurify from 'dompurify';

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

  if (!course || !currentLesson) {
    return <div>Loading...</div>;
  }

  const renderContent = (content) => {
    return (
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ 
          __html: DOMPurify.sanitize(content) 
        }} 
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={`/courses/${id}`} className="text-gray-500 hover:text-gray-700">
                <FiArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-sm font-medium text-gray-900">{course.title}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiClock className="w-4 h-4" />
                  <span>{currentLesson.duration}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                {progress}% Complete
              </div>
              <button 
                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600"
                onClick={() => {/* Handle completion */}}
              >
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
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">{currentLesson.title}</h2>
              
              {/* Lesson Content */}
              {renderContent(currentLesson.content)}
              
              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                <button 
                  className="px-4 py-2 border rounded"
                  onClick={() => {/* Handle previous lesson */}}
                >
                  Previous Lesson
                </button>
                <button 
                  className="px-4 py-2 bg-orange-500 text-white rounded"
                  onClick={() => {/* Handle next lesson */}}
                >
                  Next Lesson
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Course Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium mb-4">Course Content</h3>
              <div className="space-y-2">
                {course.curriculum?.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    to={`/courses/${id}/lesson/${lesson.id}`}
                    className={`block p-3 rounded-lg ${
                      lesson.id === parseInt(lessonId)
                        ? 'bg-orange-50 text-orange-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        {lesson.isCompleted ? (
                          <FiCheck className="w-4 h-4 text-green-500" />
                        ) : (
                          <span className="text-sm text-gray-500">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{lesson.title}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
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