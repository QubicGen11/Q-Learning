import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar_main from './Components/Navbar Components/Navbar_main';
import Hero_Heading from './Components/Hero Components/Hero Components/Hero_Heading';
import Hero_Features from './Components/Hero Components/Hero Components/Hero_Skills';
import Paths from './Components/Hero Components/Hero Components/Paths';
import Educational_Ecosystem from './Components/Ecosystem Components/Ecosystem';
import Testimonial from './Components/Testimonial Components/Testimonial';
import Courses_main from './Components/Courses Components/Courses_main';
import Careerpaths_main from './Components/Career Path Components/Careerpaths_main';
import Certification_main from './Components/Certification Components/Certification_main';
import ScrollToTopButton from './Components/ScrollToTopButton';
import Login from './Components/Auth/Login';
import CourseManager from './Components/Courses Components/CourseManager';
import CourseContent from './Components/Courses Components/CourseContent';
import CourseLesson from './Components/Courses Components/CourseLesson';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';
import Carousel_main from './Components/Carousel Components/Carousel_main';
import SkillsSection from './Components/SkillsSection';
import Learners_main from './Components/Learners Components/Learners_main';
import ContactSection from './Components/Contact Us Home/Contact_usmain';
import { CartProvider } from './context/CartContext';
import Cart from './Components/Cart/Cart';
import About from './Components/About Components/About';
import Welcome from './Components/Welcome Component/Welcome';
import Cookies from 'js-cookie';
import ProfileSettings from './Components/Profile Components/ProfileSettings';
import BecomeInstructor from './Components/Instructor/BecomeInstructor';
import Swal from 'sweetalert2';
import Loader from './Components/Common/Loader';
import Mainadmin from './Components/Main Course Manager/Mainadmin';
import SuperAdmin from './Components/SuperAdmin Components/SuperAdmin';
import Superadminlogin from './Components/SuperAdmin Components/Superadminlogin';
import TestLesson from './Components/Main Course Manager/components/sections/TestLesson';
import AssignmentManager from './Components/Main Course Manager/components/sections/Assignments';
import Assignments from './Components/Main Course Manager/components/sections/Assignments';
import Newlogin from './Components/New Login Components/Newlogin';
import NewRegister from './Components/New Login Components/NewRegister';

// Configure default options for all SweetAlert2 popups
Swal.mixin({
  customClass: {
    confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2',
    cancelButton: 'bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'
  },
  buttonsStyling: false
});

// Create a Home component that contains all the landing page components
const Home = () => {
  const token = Cookies.get('accessToken');

  return (
    <>
      <Navbar_main />
      {token && (
        <div className="welcome-carousel-container">
          <Welcome />
          <Carousel_main />
        </div>
      )}
      {!token && (
        <div className="mt-4">
          <Carousel_main />
        </div>
      )}
      <SkillsSection />
      <Learners_main />
      <Hero_Features />
      <Educational_Ecosystem />
      <ContactSection />
      <Testimonial />

      <style jsx>{`
        .welcome-carousel-container {
          position: relative;
          background: white;
          dark:bg-gray-900;
        }
      `}</style>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900">
            
           
        
            <Routes>
           
         
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses_main />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses/:id" element={<CourseContent />} />
              <Route path="/courses/:id/lesson/:lessonId" element={<CourseLesson />} />
              <Route path="/learning-plans" element={<div>Learning Plans Page</div>} />
              <Route path="/career-paths" element={<Careerpaths_main />} />
              <Route path="/certification" element={<Certification_main />} />
              <Route path="/resources" element={<div>Resources Page</div>} />
              <Route path="/become-instructor" element={<CourseManager />} />
              <Route path="/admin/courses" element={<CourseManager />} />
              <Route path="/courses" element={<Courses_main />} />
              <Route path="/courses/:id" element={<CourseContent />} />
              <Route path="/courses/:id/lesson/:lessonId" element={<CourseLesson />} />
              <Route path="/profile" element={<ProfileSettings />} />
              <Route path="/instructor" element={<BecomeInstructor />} />
              <Route path="/loader" element={<Loader/>} />
              <Route path="/mainadmin/:courseId?" element={<Mainadmin />} />
              <Route path="/mainadmin" element={<Mainadmin />} />
              <Route path="/superadmin" element={<SuperAdmin/>} />
              <Route path="/superadminlogin" element={<Superadminlogin/>} />
              <Route path="/tetslessons" element={<TestLesson/>} />
              {/* <Route path="/assignmentsadd" element={<AssignmentManager/>} /> */}
              <Route path="/assignments" element={<Assignments/>} />
              <Route path="/login" element={<Newlogin/>} />
              <Route path="/register" element={<NewRegister/>} />
              {/* Contact Route - Redirects to external URL */} 
              <Route
                path="/contact"
                element={<Navigate to="https://www.qubicgen.com" replace />}
              />

              <Route path="/cart" element={<Cart />} />

              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
            <ScrollToTopButton />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;

   