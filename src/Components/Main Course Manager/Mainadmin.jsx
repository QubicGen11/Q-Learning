import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AboutCourse from './components/sections/AboutCourse';
import Curriculum from './components/sections/Curriculum';
import Lessons from './components/sections/Lessons';
import Assignments from './components/sections/Assignments';
import Resources from './components/sections/Resources';
import Pricing from './components/sections/Pricing';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BasicInformation from './components/sections/BasicInformation';
import useCourseStore from '../../store/courseStore';
import PreviewModal from './components/sections/PreviewModal';


const Mainadmin = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const courseData = useCourseStore((state) => state.courseData);
  const submitCourse = useCourseStore((state) => state.submitCourse);
  const updateCourse = useCourseStore((state) => state.updateCourse);
  const updateCourseData = useCourseStore((state) => state.updateCourseData);
  const fetchCourseById = useCourseStore((state) => state.fetchCourseById);
  const resetCourseData = useCourseStore((state) => state.resetCourseData);
  const [activeSection, setActiveSection] = useState('basicInfo');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      if (courseId) {
        setIsLoading(true);
        try {
          await fetchCourseById(courseId);
        } catch (error) {
          console.error('Error loading course:', error);
          alert('Failed to load course details');
        }
        setIsLoading(false);
      } else {
        resetCourseData();
      }
    };

    loadCourse();
  }, [courseId, fetchCourseById, resetCourseData]);

  const handleSave = async () => {
    try {
      if (courseId) {
        await updateCourse(courseId, courseData);
        alert('Course updated successfully!');
      } else {
        await submitCourse(courseData);
        alert('Course created successfully!');
      }
      navigate('/courses');
    } catch (error) {
      console.error('Save error:', error);
      alert(`Failed to ${courseId ? 'update' : 'create'} course: ${error.message}`);
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'basicInfo':
        return <BasicInformation />;
      case 'aboutCourse':
        return <AboutCourse />;
      case 'curriculum':
        return <Curriculum />;
      case 'lessons':
        return <Lessons />;
      case 'assignments':
        return <Assignments />;
      case 'resources':
        return <Resources />;
      case 'pricing':
        return <Pricing />;
      default:
        return <BasicInformation />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="ml-64 flex-1 min-h-screen">
        <Header 
          activeSection={activeSection} 
          onSave={handleSave}
          onPreview={handlePreview}
          isEditing={!!courseId}
        />
        <div className="p-8">
          <div className="max-w-8xl mx-auto  rounded-xl shadow-sm border border-gray-200 h-auto">
            <div className="p-8">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        courseData={courseData}
      />
    </div>
  );
};

export default Mainadmin;
