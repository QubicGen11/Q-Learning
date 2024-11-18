import React, { useState } from 'react';
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
  const courseData = useCourseStore((state) => state.courseData);
  const submitCourse = useCourseStore((state) => state.submitCourse);
  const updateCourseData = useCourseStore((state) => state.updateCourseData);
  const [activeSection, setActiveSection] = useState('basicInfo');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleSave = async () => {
    try {
      await submitCourse();
      alert('Course created successfully!');
    } catch (error) {
      alert('Failed to create course: ' + error.message);
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
    //   case 'curriculum':
    //     return <Curriculum />;
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="ml-64 flex-1 min-h-screen">
        <Header 
          activeSection={activeSection} 
          onSave={handleSave}
          onPreview={handlePreview}
        />
        <div className="p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 h-auto">
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
