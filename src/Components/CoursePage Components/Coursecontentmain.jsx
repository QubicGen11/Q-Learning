import React, { useEffect, useState } from 'react';
import usePreLoginFeedStore from '../../stores/preLoginFeedStore';
import CourseContent from './CourseContent';
import CourseContentsec from './CourseContentsec';
import CourseDesc from './CourseDesc';
import useCourseCreationStore from '../../stores/courseCreationStore';


const Coursecontentmain = ({ courseData, previewMode }) => {
  // Add console log to see what data we're receiving
  console.log("Coursecontentmain - courseData:", courseData);
  console.log("Coursecontentmain - previewMode:", previewMode);

  const getCourseById = usePreLoginFeedStore(state => state.getCourseById);
  const courseDetails = usePreLoginFeedStore(state => state.courseDetails);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [about, setAbout] = useState(null);
  const courseCreationStore = useCourseCreationStore();

  useEffect(() => {
    const fetchCourseData = async () => {
      if (previewMode) {
        console.log("Preview mode - using direct courseData");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await getCourseById(courseData.id);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [courseData?.id, getCourseById, previewMode]);

  useEffect(() => {
    if (previewMode) {
      console.log("Preview mode - using store data");
      setAbout(courseCreationStore.courseData.about || {});
    } else {
      // ... existing code for non-preview mode ...
    }
  }, [courseData, previewMode, courseCreationStore.courseData]);

  // Add console log to see what data we're using
  console.log("Course being used:", previewMode ? courseData : courseDetails?.course);
  console.log("About data:", about);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Use courseData directly in preview mode, otherwise use courseDetails
  const course = previewMode ? courseData : courseDetails?.course;

  if (!course) {
    return <div>No course data available</div>;
  }

  return (
    <div className="course-content-main">
      <CourseContent 
        curriculum={course.curriculum}
        learningObjective={course.learningObjective}
        courseOutcome={previewMode ? about?.courseOutCome : course.courseOutCome}  
        aboutCourse={about}  
        courseName={course.courseName}
        coursePreRequisites={course.coursePreRequisites}
        technologiesUsed={course.technologiesUsed}
        previewMode={previewMode}
        
      />
      <CourseContentsec 
      courseId={course.id}
      aboutCourse={about}
      endObjective={course.endObjective}
      technologiesUsed={course.technologiesUsed}
    
      courseDescription={about?.courseDescription || "No description available"}
        coursePreRequisites={previewMode ? about?.coursePreRequisites : course?.coursePreRequisites}
        courseAudience={previewMode ? about?.courseAudience : course?.courseAudience}
        courseChapters={course.courseChapters}
        previewMode={previewMode}
      />
      <CourseDesc 
        courseDescription={previewMode ? about?.courseDescription : course.courseDescription}
      />
    </div>
  );
};

export default Coursecontentmain;
