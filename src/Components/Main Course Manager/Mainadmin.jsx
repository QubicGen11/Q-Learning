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


const Mainadmin = () => {
  const [formData, setFormData] = useState({
    // Basic Info
    courseTitle: '',
    description: '',
    duration: '',
    completionTime: '',
    courseType: 'Frontend',
    difficultyLevel: 'Intermediate',
    language: 'English',
    productCovered: 'Studio',
    category: '',
    thumbnailType: 'predefined',
    bannerImage: null,

    // About Course
    welcomeMessage: '',
    courseOverview: '',
    learningObjectives: [''],
    prerequisites: [''],
    courseAudience: '',

    // Curriculum
    curriculum: [],

    // Lessons
    lessons: [],

    // Assignments
    assignments: [],

    // Resources
    resources: [],

    // Pricing
    price: '',
    originalPrice: '',
    discount: '',
    pricingModel: 'one-time',
    subscriptionDetails: {},

    // Settings
    diplomaAvailable: false,
    certificateTemplate: '',
    accessDuration: 'lifetime',
    enrollmentLimit: '',
    visibility: 'public'
  });

  const [activeSection, setActiveSection] = useState('basicInfo');

  const handleSave = async () => {
    try {
      // API call to save course data
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // Show success message
      }
    } catch (error) {
      // Handle error
    }
  };

  const handlePreview = () => {
    // Handle course preview logic
  };

  // Render the appropriate section based on activeSection
  const renderSection = () => {
    switch (activeSection) {
      case 'basicInfo':
        return <BasicInformation formData={formData} setFormData={setFormData} />;
      case 'aboutCourse':
        return <AboutCourse formData={formData} setFormData={setFormData} />;
      case 'curriculum':
        return <Curriculum formData={formData} setFormData={setFormData} />;
      case 'lessons':
        return <Lessons formData={formData} setFormData={setFormData} />;
      case 'assignments':
        return <Assignments formData={formData} setFormData={setFormData} />;
      case 'resources':
        return <Resources formData={formData} setFormData={setFormData} />;
      case 'pricing':
        return <Pricing formData={formData} setFormData={setFormData} />;
      case 'settings':
        return <Settings formData={formData} setFormData={setFormData} />;
      default:
        return <BasicInformation formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content Area */}
      <div className="ml-64 flex-1 min-h-screen">
        {/* Header */}
        <Header 
          activeSection={activeSection} 
          onPreview={handlePreview} 
          onSave={handleSave} 
        />

        {/* Main Form Area */}
        <div className="p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 h-auto">
            <div className="p-8">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainadmin;
