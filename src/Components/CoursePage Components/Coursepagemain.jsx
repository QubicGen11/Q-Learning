import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Newnavbar from '../New Landingpage/New Navbar Components/Newnavbar';
import CourseBanner from './CourseBanner';
import Coursebarsec from './Coursebarsec';
import Footer from '../New Landingpage/Footer/Footer';
import SuperLoader from '../Common/SuperLoader';
import Cookies from 'js-cookie';

const Coursepagemain = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setIsLoading(true);
      
        const token = Cookies.get('accessToken');
        const response = await axios.get(`http://localhost:8089/qlms/courses/dacc6ea6-0ef0-4235-ba24-091641328c40`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setCourseData(response.data);
        setCourseData(response.data.course); // Access the course object from the response
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

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
      <CourseBanner 
        title={courseData.courseName}
        courseId={courseData.id}
        courseTagline={courseData.courseTagline}
        description={courseData.courseDescription}
        thumbnail={courseData.courseImage}
        courseBanner={courseData.courseBanner}
        categoryImage={courseData.categoryImage}
        courseImage={courseData.courseImage}
        category={courseData.category}
        subCategory={courseData.subCategory}
        updatedAt={courseData.updatedAt}
        teachingLanguage={courseData.teachingLanguage}
        courseRating={courseData.courseRating}
        rating={courseData.rating}
        price={courseData.courseSettings?.[0]?.price}
        originalPrice={courseData.courseSettings?.[0]?.offeredPrice}
        discount={courseData.courseSettings?.[0]?.discount}
        trainerName={courseData.trainerName}
        courseDuration={courseData.courseDuration}
        difficultyLevel={courseData.difficultyLevel}
        prerequisites={courseData.coursePreRequisites}
        audience={courseData.courseAudience}
        glossary={courseData.glossary}
        references={courseData.references}
        faqs={courseData.courseFaqs}
      />
      <Coursebarsec 
        courseId={courseData.id}
        courseOutcome={courseData.courseOutCome}
        chapters={courseData.courseChapters}
      />
      <Footer />
    </div>
  );
};

export default Coursepagemain;
