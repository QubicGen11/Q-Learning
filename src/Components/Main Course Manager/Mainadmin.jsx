import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AboutCourse from './components/sections/AboutCourse';
import Curriculum from './components/sections/Curriculum';
import Lessons from './components/sections/Lessons';
import Resources from './components/sections/Resources';
import Pricing from './components/sections/Pricing';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BasicInformation from './components/sections/BasicInformation';
import useCourseStore from '../../store/courseStore';
import PreviewModal from './components/sections/PreviewModal';
import ConfirmationModal from './components/ConfirmationModal';
import ScrollToTop from '../Common/ScrollToTop.jsx';
import useDraftStore from '../../store/draftStore';


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
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const saveDraft = useDraftStore((state) => state.saveDraft);
  const isEditing = !!courseId;

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [activeSection]);

  const handleSave = async () => {
    try {
      setIsUpdating(true);
      if (courseId) {
        await updateCourse(courseId, courseData);
      } else {
        await submitCourse(courseData);
      }
      setShowQuestionModal(true);
    } catch (error) {
      console.error('Save error:', error);
      alert(`Failed to ${courseId ? 'update' : 'create'} course: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleQuestionResponse = (wantToAddQuestions) => {
    setShowQuestionModal(false);
    if (wantToAddQuestions) {
      navigate('/assignments');
    } else {
      setShowExitModal(true);
    }
  };

  const handleExitResponse = (confirmExit) => {
    setShowExitModal(false);
    if (confirmExit) {
      navigate('/courses');
    }
  };

  const handleNextSection = () => {
    const sections = ['basicInfo', 'aboutCourse', 'curriculum', 'lessons', 'resources', 'pricing'];
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  const handlePreviousSection = () => {
    const sections = ['basicInfo', 'aboutCourse', 'curriculum', 'lessons', 'resources', 'pricing'];
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };

  const handleSaveAsDraft = async () => {
    try {
      await saveDraft(courseData);
      alert('Course saved as draft successfully!');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'basicInfo':
        return <BasicInformation />;
      case 'aboutCourse':
        return <AboutCourse />;

      case 'lessons':
        return <Lessons />;

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
    <>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="ml-64 flex-1 min-h-screen">
          <Header 
            activeSection={activeSection} 
            onSave={handleSave}
            onPreview={handlePreview}
            isEditing={isEditing}
          />
          <div className="p-8">
            <div className="max-w-8xl mx-auto rounded-xl shadow-sm border border-gray-200 h-auto">
              <div className="p-8">
                {renderSection()}
              </div>
              
              <div className="flex justify-between items-center p-6 border-t border-gray-200">
                <button
                  onClick={handlePreviousSection}
                  className={`px-4 py-2 text-gray-600 border border-gray-300 rounded-md ${
                    activeSection === 'basicInfo' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                  }`}
                  disabled={activeSection === 'basicInfo'}
                >
                  Previous
                </button>
                
                <div className="flex gap-4">
                  <button
                    onClick={handleSaveAsDraft}
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                  >
                    Save as Draft
                  </button>
                  
                  {activeSection === 'pricing' ? (
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      {isEditing ? 'Update Course' : 'Create Course'}
                    </button>
                  ) : (
                    <button
                      onClick={handleNextSection}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Next
                    </button>
                  )}
                </div>
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

      <ConfirmationModal
        isOpen={showQuestionModal}
        onClose={() => handleQuestionResponse(false)}
        onConfirm={() => handleQuestionResponse(true)}
        title="Add Questions"
        message="Do you want to add questions to this course?"
        isUpdating={isUpdating}
      />

      <ConfirmationModal
        isOpen={showExitModal}
        onClose={() => handleExitResponse(false)}
        onConfirm={() => handleExitResponse(true)}
        title="Confirm Exit"
        message="Are you sure you want to exit without adding questions?"
      />

      <ScrollToTop />
    </>
  );
};

export default Mainadmin;
