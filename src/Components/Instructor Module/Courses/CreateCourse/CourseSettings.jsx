import React, { useState } from 'react';
import useCourseCreationStore from '../../../../stores/courseCreationStore';

function CourseSettings() {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const { settings } = courseData;
  const [activeSection, setActiveSection] = useState('courseSettings');

  const handleSettingChange = (section, field, value) => {
    updateCourseData('settings', {
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    });
  };

  const renderCourseSettings = () => (
    <div className="space-y-6">
      {/* Course Visibility */}
      <div>
        <h3 className="text-sm font-medium mb-3">Course Visibility</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Public</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Enable Preview</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
      </div>

      {/* Course Access */}
      <div>
        <h3 className="text-sm font-medium mb-3">Course Access</h3>
        <div className="mb-3">
          <label className="block text-sm mb-1 text-gray-600">Access Duration *</label>
          <select className="w-full px-3 py-1.5 border rounded text-sm h-9">
            <option value="">Select Months</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Lifetime Access</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
      </div>

      {/* Refund Policy */}
      <div>
        <h3 className="text-sm font-medium mb-3">Refund Policy</h3>
        <div>
          <label className="block text-sm mb-1 text-gray-600">Return Period *</label>
          <div className="flex items-center gap-4">
            <input 
              type="text" 
              placeholder="No. of days" 
              className="flex-1 px-3 py-1.5 border rounded text-sm h-9"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Refunds Allowed</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Course Permissions */}
      <div>
        <h3 className="text-sm font-medium mb-3">Course Permissions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Allow Content Downloads</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Allow Discussion Participation</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Live Classes Integration */}
      <div>
        <h3 className="text-sm font-medium mb-3">Live Classes Integration</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Schedule Live Classes</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Enable Subtitles</span>
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderEnrollmentSettings = () => (
    <div className="space-y-6">
      <h3 className="text-sm font-medium mb-3">Enrollment Settings</h3>
      
      {/* Max Students */}
      <div>
        <label className="block text-sm mb-1 text-gray-600">Max Students *</label>
        <input
          type="number"
          className="w-full px-3 py-1.5 border rounded text-sm h-9"
          placeholder="—"
        />
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="certificateEligibility"
            className="rounded border-gray-300"
          />
          <label htmlFor="certificateEligibility" className="text-sm text-gray-600">
            Certificate Eligibility
          </label>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h4 className="text-sm font-medium mb-3">Notifications</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Notify Students on Updates</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Notify Students on Assignments</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPricingSettings = () => (
    <div className="space-y-6">
      <h3 className="text-sm font-medium mb-3">Pricing</h3>
      
      <div>
        <label className="block text-sm mb-1 text-gray-600">Original Price *</label>
        <input
          type="number"
          className="w-full px-3 py-1.5 border rounded text-sm h-9"
          placeholder="Enter original price"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-gray-600">Offered Price</label>
        <input
          type="number"
          className="w-full px-3 py-1.5 border rounded text-sm h-9"
          placeholder="Enter offered price"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-gray-600">Discounted Price</label>
        <input
          type="number"
          className="w-full px-3 py-1.5 border rounded text-sm h-9"
          placeholder="Enter discounted price"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 text-gray-600">Start Date</label>
          <input
            type="date"
            className="w-full px-3 py-1.5 border rounded text-sm h-9"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-600">End Date</label>
          <input
            type="date"
            className="w-full px-3 py-1.5 border rounded text-sm h-9"
          />
        </div>
      </div>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <h3 className="text-sm font-medium mb-3">Advanced Settings</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* SEO Title */}
        <div>
          <label className="block text-sm mb-1 text-gray-600">
            SEO Title *
          </label>
          <input
            type="text"
            placeholder="Placeholder Text"
            className="w-full px-3 py-1.5 border rounded text-sm h-9"
          />
        </div>

        {/* SEO Description */}
        <div>
          <label className="block text-sm mb-1 text-gray-600">    
            SEO Description *
          </label>
          <input
            type="text"
            placeholder="Placeholder Text"
            className="w-full px-3 py-1.5 border rounded text-sm h-9"
          />
        </div>
      </div>

      {/* SEO Keywords */}
      <div>
        <label className="block text-sm mb-1 text-gray-600">
          SEO Keywords *
        </label>
        <input
          type="text"
          placeholder="Placeholder Text"
          className="w-full px-3 py-1.5 border rounded text-sm h-9"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="flex gap-6">
        {/* Left Sidebar Navigation */}
        <div className="w-48">
          <div className="space-y-1">
            <div 
              onClick={() => setActiveSection('courseSettings')}
              className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${
                activeSection === 'courseSettings' ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Course Settings
            </div>
            <div 
              onClick={() => setActiveSection('enrollment')}
              className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${
                activeSection === 'enrollment' ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Enrollment Settings
            </div>
            <div 
              onClick={() => setActiveSection('pricing')}
              className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${
                activeSection === 'pricing' ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Pricing
            </div>
            <div 
              onClick={() => setActiveSection('advanced')}
              className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${
                activeSection === 'advanced' ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Advanced Settings
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {activeSection === 'courseSettings' && renderCourseSettings()}
          {activeSection === 'enrollment' && renderEnrollmentSettings()}
          {activeSection === 'pricing' && renderPricingSettings()}
          {activeSection === 'advanced' && renderAdvancedSettings()}
          {/* Other sections will be added when needed */}
        </div>
      </div>
    </div>
  );
}

export default CourseSettings; 