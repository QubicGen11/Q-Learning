import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Newnavbar from '../New Landingpage/New Navbar Components/Newnavbar';
import CourseBanner from './CourseBanner';
import Coursebarsec from './Coursebarsec';
import Footer from '../New Landingpage/Footer/Footer';
import SuperLoader from '../Common/SuperLoader';
import Cookies from 'js-cookie';

const Coursepagemain = ({ previewMode = false, previewData = null }) => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setIsLoading(true);
        
        if (previewMode && previewData) {
          console.log("Preview Data:", previewData); // Debug log
          setCourseData(previewData);
          setIsLoading(false);
          return;
        }

        const token = Cookies.get('accessToken');
        const response = await axios.get(`http://localhost:8089/qlms/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setCourseData(response.data.course);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [id, previewMode, previewData]);

  if (isLoading) {
    return <SuperLoader />;
  }

  if (error || !courseData) {
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
      
      <CourseBanner {...courseData} 
      previewMode={previewMode}
      title={courseData.courseName}
        courseId={courseData.id}
        teachingLanguage={courseData.teachingLanguage}
        courseRating={courseData.courseRating}
        rating={courseData.rating}
        price={courseData.courseSettings?.[0]?.price}
        originalPrice={courseData.courseSettings?.[0]?.offeredPrice}
        discount={courseData.courseSettings?.[0]?.discount}
      />
      <Coursebarsec 
        courseData={courseData}
        previewMode={previewMode}
      />
      <Footer />
    </div>
  );
};

export default Coursepagemain;
