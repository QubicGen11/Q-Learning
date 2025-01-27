import React, { useEffect, useState } from 'react';
import usePreLoginFeedStore from '../../stores/preLoginFeedStore';
import CourseContent from './CourseContent';
import CourseContentsec from './CourseContentsec';
import CourseDesc from './CourseDesc';

const Coursecontentmain = ({ courseId }) => {
  const getCourseById = usePreLoginFeedStore(state => state.getCourseById);
  const courseDetails = usePreLoginFeedStore(state => state.courseDetails);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setIsLoading(true);
        await getCourseById(courseId);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId, getCourseById]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!courseDetails || !courseDetails.course) {
    return <div>No course data available</div>;
  }

  const course = courseDetails.course;
  console.log('Course Details:', courseDetails);

  return (
    <div>
      <CourseContent 
        curriculum={course.curriculum}
        learningObjective={course.learningObjective}
        courseOutcome={course.courseOutCome}  
        aboutCourse={course.aboutCourse}  
      />
      <CourseContentsec 
        courseId={courseId}
        aboutCourse={course.aboutCourse}
        endObjective={course.endObjective}
        technologiesUsed={course.technologiesUsed}
        coursePreRequisites={course.coursePreRequisites}
        courseAudience={course.courseAudience}
        courseChapters={course.courseChapters}
      />
      <CourseDesc 
        courseAudience={course.courseAudience}
        productCovered={course.productCovered}
        courseDescription={course.courseDescription}
      />
    </div>
  );
};

export default Coursecontentmain;
