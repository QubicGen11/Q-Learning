import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePreLoginFeedStore from '../../stores/preLoginFeedStore';
import Newnavbar from '../New Landingpage/New Navbar Components/Newnavbar';
import CourseBanner from './CourseBanner';
import Coursebarsec from './Coursebarsec';

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

  // Extract pricing information from courseSettings
  const pricing = courseData.courseSettings?.[0]?.settings || {
    price: 0,
    discount: 0,
    offeredPrice: 0
  };

  return (
    <div>
      <Newnavbar />
      <CourseBanner 
  title={courseData.courseName}
  courseTagline={courseData.courseTagline}
  description={courseData.courseDescription}
  thumbnail={courseData.courseImage}
  courseBanner={courseData.courseBanner}
  category={courseData.category}
  subCategory={courseData.subCategory}
  updatedAt={courseData.updatedAt}
  teachingLanguage={courseData.teachingLanguage}
  courseRating={courseData.courseRating}
  rating={courseData.rating}  // Add this line
  price={courseData.courseSettings[0]?.settings.price}
  originalPrice={courseData.courseSettings[0]?.settings.offeredPrice}
  discount={courseData.courseSettings[0]?.settings.discount}
/>
      <Coursebarsec 
       
        courseId={courseData.id}
        courseOutcome={courseData.courseOutcome}
      />
    
      
      <Footer />
    </div>
  );
};

export default Coursepagemain;
