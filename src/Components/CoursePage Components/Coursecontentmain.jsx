import React from 'react';
import usePreLoginFeedStore from '../../stores/preLoginFeedStore';
import CourseContent from './CourseContent';
import CourseContentsec from './CourseContentsec';
import CourseDesc from './CourseDesc';

const Coursecontentmain = ({ courseId }) => {
  const { getCourseById } = usePreLoginFeedStore();
  const courseData = getCourseById(courseId);

  console.log('courseData:', courseData);
  console.log('coursePreRequisites:', courseData?.coursePreRequisites);

  if (!courseData) return null;

  return (
    <div>
      <CourseContent 
        curriculum={courseData.curriculum}
        learningObjective={courseData.learningObjective}
        courseOutcome={courseData.courseOutCome}  
        aboutCourse={courseData.aboutCourse}  
      />
      <CourseContentsec 
        aboutCourse={courseData.aboutCourse}
        endObjective={courseData.endObjective}
        technologiesUsed={courseData.technologiesUsed}
        coursePreRequisites={courseData.coursePreRequisites}
        courseAudience={courseData.courseAudience}
      />
      <CourseDesc 
      
        courseAudience={courseData.courseAudience}
        productCovered={courseData.productCovered}
        courseDescription={courseData.courseDescription}
      />
    </div>
  );
};

export default Coursecontentmain;
