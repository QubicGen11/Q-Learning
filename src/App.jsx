import React from 'react';
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
            </Routes>
            <ScrollToTopButton />
          </div>
        </Router>
    
  );
}

export default App;

   