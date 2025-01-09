import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import useSidebarStore from '../../stores/sidebarStore';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { PiCaretRightBold, PiPresentationBold } from 'react-icons/pi';
import useCourseCreationStore from '../../stores/courseCreationStore';
// import useCourseCreationStore from '../../../stores/courseCreationStore';

const InstructorLayout = () => {
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { breadcrumbTitle, currentStep } = useCourseCreationStore();
  
  const isCreateCoursePath = location.pathname.includes('/instructor/courses/create');

  // Check for route changes and collapse sidebar if on course routes
  useEffect(() => {
    if (location.pathname.includes('/instructor/courses') && !isCollapsed) {
      toggleSidebar();
    }
  }, [location.pathname, isCollapsed, toggleSidebar]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('accessToken');
      
      if (!token) {
        const result = await Swal.fire({
          title: 'Authentication Required',
          text: 'Please login first to access the instructor dashboard',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Go to Login',
          cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
          navigate('/login');
        } else {
          navigate('/');
        }
        return;
      }

      setIsAuthenticated(true);
    };

    checkAuth();
  }, [navigate]);

  // Function to get current step label
  const getCurrentStepLabel = () => {
    const path = location.pathname.split('/').pop();
    
    if (path.includes('basic-info') || path.includes('media') || path.includes('about')) {
      return 'Course Information';
    } else if (path.includes('content') || path.includes('more-info') || path.includes('faq')) {
      return 'Course Content';
    } else if (path.includes('settings')) {
      return 'Settings';
    }
    return '';
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <div className="fixed h-screen z-40">
        <Sidebar />
      </div>

      <div className={`flex-1 ${isCollapsed ? 'ml-[60px]' : 'ml-64'}`}>
        <div className="sticky top-0 z-30">
          <Navbar />
        </div>
        <main className="p-6 bg-[#f2f9ff] relative z-20">
          <div className='text-md text-[#0077FF] flex items-center gap-1 relative bottom-3'>
            
     
            
            {location.pathname.match(/^\/instructor\/courses\/create/) && (
                <>
                 <PiPresentationBold className='text-lg font-bold' />
                 <a href="/instructor/courses"><p className='text-md'>Courses</p></a>
                  <span>
                    <PiCaretRightBold className='text-xs' />
                  </span>
                  <Link to="/instructor/courses/create">
                    <p className='text-md text-[#4B5563] inline-flex items-center'>
                      {breadcrumbTitle 
                        ? (breadcrumbTitle.length > 15
                            ? `${breadcrumbTitle.substring(0, 15)}...` 
                            : breadcrumbTitle)
                        : 'Untitled Course'
                      }
                    </p>
                  </Link>  
                  
                  {/* Show step and substep */}
                  {location.pathname.includes('/settings') ? (
                    // For Settings
                    <>
                      <span>
                        <PiCaretRightBold className='text-xs' />
                      </span>
                      <p className='text-md text-[#4B5563]'>Settings</p>
                    </>
                  ) : (
                    <>
                      <span>
                        <PiCaretRightBold className='text-xs' />
                      </span>
                      {/* Add Course Information as parent level */}
                      {(location.pathname.includes('basic-info') || 
                        location.pathname.includes('media') || 
                        location.pathname.includes('about')) && (
                        <>
                          <p className='text-md text-[#4B5563]'>Course Information</p>
                          <span><PiCaretRightBold className='text-xs' /></span>
                          {/* Course Information sub-steps with links */}
                          <Link to="/instructor/courses/create/basic-info">
                            <span className={`${!location.pathname.includes('basic-info') ? 'text-[#0077FF] underline' : 'text-[#4B5563]'}`}>
                              Course Details
                            </span>
                          </Link>
                          {(location.pathname.includes('media') || location.pathname.includes('about')) && (
                            <>
                              <span><PiCaretRightBold className='text-xs mx-1' /></span>
                              <Link to="/instructor/courses/create/media">
                                <span className={`${!location.pathname.includes('media') ? 'text-[#0077FF] underline' : 'text-[#4B5563]'}`}>
                                  Add Media
                                </span>
                              </Link>
                            </>
                          )}
                          {location.pathname.includes('about') && (
                            <>
                              <span><PiCaretRightBold className='text-xs mx-1' /></span>
                              <span className='text-[#4B5563]'>About Course</span>
                            </>
                          )}
                        </>
                      )}
                      {/* Course Content with sub-steps */}
                      {(location.pathname.includes('/content') || 
                        location.pathname.includes('more-info') || 
                        location.pathname.includes('faq')) && (
                        <>
                          <span className='text-[#4B5563]'>Course Content</span>
                          <span><PiCaretRightBold className='text-xs mx-1' /></span>
                          <Link to="/instructor/courses/create/content">
                            <span className={`${!location.pathname.includes('/content') ? 'text-[#0077FF] underline' : 'text-[#4B5563]'}`}>
                              Add sections and lectures
                            </span>
                          </Link>
                          {(location.pathname.includes('more-info') || location.pathname.includes('faq')) && (
                            <>
                              <span><PiCaretRightBold className='text-xs mx-1' /></span>
                              <Link to="/instructor/courses/create/more-info">
                                <span className={`${!location.pathname.includes('more-info') ? 'text-[#0077FF] underline' : 'text-[#4B5563]'}`}>
                                  Glossary and References
                                </span>
                              </Link>
                            </>
                          )}
                          {location.pathname.includes('faq') && (
                            <>
                              <span><PiCaretRightBold className='text-xs mx-1' /></span>
                              <span className='text-[#4B5563]'>FAQ's</span>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
            )}

            {location.pathname.match(/^\/instructor\/courses\/create/) && (
              <div className='bg-gray-500 text-white rounded-md ml-3 w-[70px] text-center' style={{padding:"1px 8px 1px 8px"}}>
                Drafts
              </div>
            )}
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InstructorLayout;
