import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar_main from './Components/Navbar Components/Navbar_main';
import Hero_Heading from './Components/Hero Components/Hero_Heading';
import Hero_Features from './Components/Hero Components/Hero_Skills';
import Paths from './Components/Hero Components/Paths';
import Educational_Ecosystem from './Components/Ecosystem Components/Ecosystem';
import Testimonial from './Components/Testimonial Components/Testimonial';
import Courses_main from './Components/Courses Components/Courses_main';
import Careerpaths_main from './Components/Career Path Components/Careerpaths_main';
import Certification_main from './Components/Certification Components/Certification_main';
import ScrollToTopButton from './Components/ScrollToTopButton';

import CourseManager from './Components/Courses Components/CourseManager';
import CourseContent from './Components/Courses Components/CourseContent';
import CourseLesson from './Components/Courses Components/CourseLesson';

// Create a Home component that contains all the landing page components
const Home = () => {
  return (
    <>
      <Hero_Heading />
      <Hero_Features />
      <Paths />
      <Educational_Ecosystem />
      <Testimonial />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar_main />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses_main />} />
          <Route path="/courses/:id" element={<CourseContent />} />
          <Route path="/courses/:id/lesson/:lessonId" element={<CourseLesson />} />
          <Route path="/learning-plans" element={<div>Learning Plans Page</div>} />
          <Route path="/career-paths" element={<Careerpaths_main />} />
          <Route path="/certification" element={<Certification_main />} />
          <Route path="/resources" element={<div>Resources Page</div>} />
          <Route path="/admin" element={<CourseManager />} />
          <Route path="/admin/courses" element={<CourseManager />} />
          <Route path="/courses" element={<Courses_main />} />
          <Route path="/courses/:id" element={<CourseContent />} />
          
          <Route path="/courses/:id/lesson/:lessonId" element={<CourseLesson />} />
          {/* Contact Route - Redirects to external URL */}
          <Route
            path="/contact"
            element={<Navigate to="https://www.qubicgen.com" replace />}
          />

          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        
        </Routes>
        <ScrollToTopButton /> 
      </div>
    </BrowserRouter>
  );
}

export default App;
