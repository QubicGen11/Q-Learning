import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Newlogin from './Components/New Login Components/Newlogin';
import NewRegister from './Components/New Login Components/NewRegister';
import Landingpage from './Components/New Landingpage/Landingpage';
import Afterlogin from './Components/After login landing page/Afterlogin';
import Whenuserlogout from './Components/When User Logout/Whenuserlogout';
import ScrollToTopButton from './Components/ScrollToTopButton';
import './App.css';
import Notfound from './Components/Not Found Page/Notfound';
import Categoriesmain from './Components/Categories Components/Categoriesmain';
import useAuthStore from './stores/authStore';
import Cookies from 'js-cookie';
import Coursepagemain from './Components/CoursePage Components/Coursepagemain';
import Cart from './Components/New Landingpage/New Navbar Components/Cart';
import SuperLoader from './Components/Common/SuperLoader';
import CourseLearnInterface from './Components/CoursePage Components/LearnCourse Components/CourseLearnInterface';
import SplineScene from './Components/SplineScene';
import InstructorLayout from './Components/Instructor Module/InstructorLayout';
import CoursesPage from './Components/Instructor Module/Courses/CoursesPage';
import CreateCourse from './Components/Instructor Module/Courses/CreateCourse/CreateCourse';
import CourseContent from './Components/Instructor Module/Courses/CreateCourse/CourseContent';
import FAQ from './Components/Instructor Module/Courses/CreateCourse/Steps/FAQ';
import Viewallskillsec from './Components/New Landingpage/Skill Assessent Module/Viewallskillsec';
import CourseSettings from './Components/Instructor Module/Courses/CreateCourse/CourseSettings';
import AssignmentView from './Components/CoursePage Components/LearnCourse Components/AssignmentView';
import BasicInformation from './Components/Instructor Module/Courses/CreateCourse/Steps/BasicInformation';
import AddMedia from './Components/Instructor Module/Courses/CreateCourse/Steps/AddMedia';
import AboutCourse from './Components/Instructor Module/Courses/CreateCourse/Steps/AboutCourse';
// import CreateCourse from './Components/Instructor Module/Courses/CreateCourse/CreateCourse';

// Configure default options for all SweetAlert2 popups
Swal.mixin({
  customClass: {
    confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2',
    cancelButton: 'bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'
  },
  buttonsStyling: false
});

// Create a Home component that contains all the landing page components


function App() {
  useEffect(() => {
    const cleanup = useAuthStore.getState().initializeTokenListener();
    return () => cleanup();
  }, []);

  return (
 
        <Router>
          <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900">
            
           
        
            <Routes>
           
         
              {/* <Route path="/" element={<Home />} /> */}
              {/* <Route path="/courses" element={<Courses_main />} />
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
              <Route path="/tetslessons" element={<TestLesson/>} /> */}
              {/* <Route path="/assignmentsadd" element={<AssignmentManager/>} /> */}
              {/* <Route path="/assignments" element={<Assignments/>} /> */}



                 {/* Latest one are below  */}
              <Route path="/login" element={<Newlogin/>} />
              <Route path="/register" element={<NewRegister/>} />
              <Route path="/" element={<Landingpage/>} />
              {/* Contact Route - Redirects to external URL */} 
              <Route
                path="/contact"
                element={<Navigate to="https://www.qubicgen.com" replace />}
              />

              {/* <Route path="/cart" element={<Cart />} /> */}
              <Route path="/afterlogin" element={<Afterlogin/>} />
              <Route path="/whenuserlogout" element={<Whenuserlogout/>} />
              <Route path="*" element={<Notfound/>} />
              <Route path="/categories" element={<Categoriesmain/>} />
              <Route path="/course/:id" element={<Coursepagemain/>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/loader" element={<SuperLoader />} />
              {/* <Route path="/course/:id/learn" element={<CourseLearnInterface/>} /> */}
              <Route path="/spline" element={<SplineScene/>} />
              <Route path="/viewallskillsec" element={<Viewallskillsec/>} />
     
              <Route path="/learn-course/:courseId" element={<CourseLearnInterface />} />
              <Route path="/course/assignment/:chapterName" element={<AssignmentView />} />
              <Route path="/instructor" element={<InstructorLayout />}>
                <Route path="courses">
                  <Route index element={<CoursesPage />} />
                  <Route path="create" element={<CreateCourse />}>
                    <Route path="basic-info" element={<BasicInformation />} />
                    <Route path="media" element={<AddMedia />} />
                    <Route path="about" element={<AboutCourse />} />
                    <Route path="content" element={<CourseContent />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="settings" element={<CourseSettings />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
            <ScrollToTopButton />
          </div>
        </Router>
    
  );
}

export default App;

   