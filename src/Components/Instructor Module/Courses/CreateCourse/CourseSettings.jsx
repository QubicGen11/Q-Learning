import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseSettings.css';

function CourseSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    courseVisibility: {
      public: false,
      enablePreview: false
    },
    pricing: {
      price: '',
      discount: '',
      startDate: '',
      endDate: ''
    },
    enrollmentSettings: {
      maxStudents: '',
      certificateEligibility: false
    },
    courseAccess: {
      duration: 'Select Months',
      lifetimeAccess: false
    },
    notifications: {
      notifyUpdates: false,
      notifyAssignments: false
    },
    refundPolicy: {
      returnPeriod: '',
      refundsAllowed: false
    },
    coursePermissions: {
      allowDownloads: false,
      allowDiscussion: false
    },
    liveClasses: {
      scheduleLiveClasses: false,
      enableSubtitles: false
    },
    seoSettings: {
      title: '',
      description: '',
      keywords: ''
    }
  });

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-blue-600 cursor-pointer">Courses</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Settings</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm border rounded-lg">
            Save as Draft
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg">
            Submit for review
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6 flex justify-between items-center bg-white px-4 rounded-lg">
        <div className="flex gap-8">
          <button className="py-4 px-1 text-gray-500">
            Basic Information
          </button>
          <button className="py-4 px-1 text-gray-500">
            Course Content
          </button>
          <button className="py-4 px-1 text-blue-600 border-b-2 border-blue-600">
            Settings
          </button>
        </div>
        <div className="flex justify-between space-x-4">
        <button
          onClick={() => navigate('/instructor/courses/faq')}
          className="flex items-center gap-2 text-[#0056B3] bg-[#F3F4F6] px-2 py-2 rounded-lg"
        >
          <span className="material-icons">arrow_back</span>
          Previous
        </button>
     
      </div>
      </div>

      {/* Settings Form */}
      <div className="bg-white rounded-lg p-6 space-y-8">
        {/* Course Visibility */}
        <div>
          <h3 className="text-base font-medium mb-4">Course Visibility</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-sm">Public</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  checked={settings.courseVisibility.public}
                  onChange={(e) => handleChange('courseVisibility', 'public', e.target.checked)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Enable Preview</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  checked={settings.courseVisibility.enablePreview}
                  onChange={(e) => handleChange('courseVisibility', 'enablePreview', e.target.checked)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div>
          <h3 className="text-base font-medium mb-4">Pricing</h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm mb-2">Price *</label>
              <div className="relative">
                <span className="absolute left-3 top-2">$</span>
                <input
                  type="text"
                  className="w-full pl-6 pr-3 py-2 border rounded-lg text-sm"
                  value={settings.pricing.price}
                  onChange={(e) => handleChange('pricing', 'price', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Discount *</label>
              <div className="relative">
                <span className="absolute right-3 top-2">%</span>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={settings.pricing.discount}
                  onChange={(e) => handleChange('pricing', 'discount', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Start date *</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={settings.pricing.startDate}
                onChange={(e) => handleChange('pricing', 'startDate', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-2">End date *</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={settings.pricing.endDate}
                onChange={(e) => handleChange('pricing', 'endDate', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Enrollment Settings */}
        <div>
          <h3 className="text-base font-medium mb-4">Enrollment Settings</h3>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <label className="block text-sm mb-2">Max Students *</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={settings.enrollmentSettings.maxStudents}
                onChange={(e) => handleChange('enrollmentSettings', 'maxStudents', e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.enrollmentSettings.certificateEligibility}
                onChange={(e) => handleChange('enrollmentSettings', 'certificateEligibility', e.target.checked)}
              />
              <label className="text-sm">Certificate Eligibility</label>
            </div>
          </div>
        </div>

        {/* Continue with other sections following the same pattern... */}
        
        {/* Course Access */}
        <div>
          <h3 className="text-base font-medium mb-4">Course Access</h3>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <label className="block text-sm mb-2">Access Duration *</label>
              <select
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={settings.courseAccess.duration}
                onChange={(e) => handleChange('courseAccess', 'duration', e.target.value)}
              >
                <option>Select Months</option>
                <option value="1">1 Month</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Lifetime Access</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  checked={settings.courseAccess.lifetimeAccess}
                  onChange={(e) => handleChange('courseAccess', 'lifetimeAccess', e.target.checked)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div>
          <h3 className="text-base font-medium mb-4">Advanced Settings</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-2">SEO Title *</label>
              <input
                type="text"
                placeholder="Placeholder Text"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={settings.seoSettings.title}
                onChange={(e) => handleChange('seoSettings', 'title', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-2">SEO Description *</label>
              <input
                type="text"
                placeholder="Placeholder Text"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={settings.seoSettings.description}
                onChange={(e) => handleChange('seoSettings', 'description', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-2">SEO Keywords *</label>
              <input
                type="text"
                placeholder="Placeholder Text"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={settings.seoSettings.keywords}
                onChange={(e) => handleChange('seoSettings', 'keywords', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseSettings; 