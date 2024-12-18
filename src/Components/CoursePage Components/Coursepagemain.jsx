import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePreLoginFeedStore from '../../stores/preLoginFeedStore';
import Newnavbar from '../New Landingpage/New Navbar Components/Newnavbar';
import CourseBanner from './CourseBanner';
import Coursebarsec from './Coursebarsec';
import CourseContent from './CourseContent';
import CourseContentsec from './CourseContentsec';
import CourseDesc from './CourseDesc';
import Footer from '../New Landingpage/Footer/Footer';
import SuperLoader from '../Common/SuperLoader';

const Coursepagemain = () => {
  const { id } = useParams();
  const { getCourseById, isLoading, fetchPreLoginFeed } = usePreLoginFeedStore();
  
  useEffect(() => {
    // Fetch data when component mounts
    fetchPreLoginFeed();
  }, []); // Empty dependency array means this runs once when component mounts

  const courseData = getCourseById(id);

  if (isLoading) {
    return <SuperLoader />;
  }

  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Course Not Found</h2>
          <p className="text-gray-600">The requested course could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Newnavbar />
      <CourseBanner 
        title={courseData.courseTitle}
        description={courseData.description}
        thumbnail={courseData.thumbnail}
        owner={courseData.courseOwner}
        price={courseData.price}
        originalPrice={courseData.originalPrice}
        discount={courseData.discount}
        courseBanner={courseData.courseBanner}
        category={courseData.category}
        subCategory={courseData.subCategory}  
        updatedAt={courseData.updatedAt}
        courseRating={courseData.courseRating}
      />
      <Coursebarsec 
        difficultyLevel={courseData.difficultyLevel}
        duration={courseData.duration}
        language={courseData.language}
        courseType={courseData.courseType}
      />
    
      
      <Footer />
    </div>
  );
};

export default Coursepagemain;
