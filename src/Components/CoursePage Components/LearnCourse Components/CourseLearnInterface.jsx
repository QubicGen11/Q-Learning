import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCourseLearnStore from '../../../stores/courseLearnStore';
import CourseTracker from './CourseTracker';
import ChaptersSidebar from './ChaptersSidebar';
// import LessonContent from './LessonConten';
import LessonMaterials from './LessonMaterials';


const CourseLearnInterface = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { 
    currentCourse,
    isLoading,
    error,
    currentChapter,
    currentLesson,
    fetchCourseById,
    setCurrentChapter,
    setCurrentLesson
  } = useCourseLearnStore();

  useEffect(() => {
    console.log('CourseId from params:', courseId);
    
    if (!courseId) {
      console.error('No courseId provided');
      navigate('/courses'); // Redirect to courses page if no ID
      return;
    }

    fetchCourseById(courseId);
  }, [courseId, navigate, fetchCourseById]);

  // Debug current URL
  useEffect(() => {
    console.log('Current URL:', window.location.pathname);
  }, []);

  useEffect(() => {
    if (currentCourse) {
      console.log('Fetched course data:', {
        courseName: currentCourse.courseName,
        courseId: currentCourse.id,
        fullData: currentCourse
      });
    }
  }, [currentCourse]);

  const handleLessonSelect = (lessonData) => {
    setCurrentChapter(lessonData.chapterId);
    setCurrentLesson(lessonData.lessonId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentCourse) {
    return <div>No course data available</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CourseTracker 
        courseName={currentCourse.courseName}
        progress={currentCourse.progress || 0}
      />
      
      <div className="flex flex-1">
        <div className="w-80 border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto">
          <ChaptersSidebar 
            chapters={currentCourse?.chapters || []}
            currentChapter={currentChapter}
            currentLesson={currentLesson}
            onLessonSelect={handleLessonSelect}
          />
        </div>

        <div className="flex-1 flex flex-col">
          {/* <div className="flex-1">
            <LessonContent
              lesson={currentLesson}
              onNavigate={handleLessonSelect}
            />
          </div>
           */}
          <div className="h-48 border-t border-gray-200">
            <LessonMaterials materials={currentLesson?.materials} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearnInterface;
