import React from 'react';
import usePreLoginFeedStore from '../../stores/preLoginFeedStore';
import CourseContent from './CourseContent';
import CourseContentsec from './CourseContentsec';
import CourseDesc from './CourseDesc';

const Coursecontentmain = ({ courseId, courseOutcome }) => {
  const { getCourseById } = usePreLoginFeedStore();
  const courseData = getCourseById(courseId);

  if (!courseData) return null;

  return (
    <div>
      <CourseContent 
        curriculum={courseData.curriculum}
        learningObjective={courseData.learningObjective}
        courseOutcome={courseOutcome}
        aboutCourse={courseData.aboutCourse}
      />
      <CourseContentsec 
        aboutCourse={courseData.aboutCourse}
        endObjective={courseData.endObjective}
        technologiesUsed={courseData.technologiesUsed}
      />
      <CourseDesc 
        description={courseData.description}
        courseAudience={courseData.courseAudience}
        productCovered={courseData.productCovered}
      />
    </div>
  );
};

export default Coursecontentmain;
