import React, { useState } from 'react';
import useCourseCreationStore from '../../../../stores/courseCreationStore';
import { toast } from 'react-hot-toast';

function CourseSettings() {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const [activeSection, setActiveSection] = useState('courseSettings');

  const handleSettingChange = (field, value) => {
    const updatedSettings = [{
      ...courseData.courseSettings?.[0] || {},
      [field]: value
    }];
    updateCourseData('courseSettings', updatedSettings);
  };

  const settings = courseData.courseSettings?.[0] || {};

  const renderCourseSettings = () => (
    <div className="space-y-6">
      {/* Course Visibility */}
      <div>
        <h3 className="text-sm font-medium mb-3">Course Visibility</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Public Access</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={settings.publicAccess || false}
              onChange={(e) => handleSettingChange('publicAccess', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Enable Preview</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={settings.enablePreview || false}
              onChange={(e) => handleSettingChange('enablePreview', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
      </div>

      {/* Course Access */}
      <div>
        <h3 className="text-sm font-medium mb-3">Course Access</h3>
        <div className="mb-3">
          <label className="block text-sm mb-1 text-gray-600">Access Duration *</label>
          <input
            type="text"
            className="w-full px-3 py-1.5 border rounded text-sm h-9"
            value={settings.accessDuration || ''}
            onChange={(e) => handleSettingChange('accessDuration', e.target.value)}
            placeholder="e.g., 12 weeks"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Lifetime Access</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={settings.lifeTimeAccess || false}
              onChange={(e) => handleSettingChange('lifeTimeAccess', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
      </div>

      {/* Pricing */}
      <div>
        <h3 className="text-sm font-medium mb-3">Pricing</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-gray-600">Price *</label>
            <input
              type="number"
              className="w-full px-3 py-1.5 border rounded text-sm h-9"
              value={settings.price || ''}
              onChange={(e) => handleSettingChange('price', parseFloat(e.target.value))}
              placeholder="Enter price"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-600">Discount (%)</label>
            <input
              type="number"
              className="w-full px-3 py-1.5 border rounded text-sm h-9"
              value={settings.discount || ''}
              onChange={(e) => handleSettingChange('discount', parseFloat(e.target.value))}
              placeholder="Enter discount"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm mb-1 text-gray-600">Offered Price</label>
          <input
            type="number"
            className="w-full px-3 py-1.5 border rounded text-sm h-9"
            value={settings.offeredPrice || ''}
            onChange={(e) => handleSettingChange('offeredPrice', parseFloat(e.target.value))}
            placeholder="Enter offered price"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm mb-1 text-gray-600">Start Date</label>
            <input
              type="date"
              className="w-full px-3 py-1.5 border rounded text-sm h-9"
              value={settings.startDate?.split('T')[0] || ''}
              onChange={(e) => handleSettingChange('startDate', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-600">End Date</label>
            <input
              type="date"
              className="w-full px-3 py-1.5 border rounded text-sm h-9"
              value={settings.endDate?.split('T')[0] || ''}
              onChange={(e) => handleSettingChange('endDate', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Enrollment Settings */}
      <div>
        <h3 className="text-sm font-medium mb-3">Enrollment Settings</h3>
        <div className="mb-3">
          <label className="block text-sm mb-1 text-gray-600">Maximum Students</label>
          <input
            type="number"
            className="w-full px-3 py-1.5 border rounded text-sm h-9"
            value={settings.maxStudents || ''}
            onChange={(e) => handleSettingChange('maxStudents', parseInt(e.target.value))}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Certificate Eligibility</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={settings.certificateEligibility || false}
              onChange={(e) => handleSettingChange('certificateEligibility', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h3 className="text-sm font-medium mb-3">Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Notify Students on Updates</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.notifyStudentsOnUpdate || false}
                onChange={(e) => handleSettingChange('notifyStudentsOnUpdate', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Notify Students on Assignments</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.notifyStudentsOnAssignment || false}
                onChange={(e) => handleSettingChange('notifyStudentsOnAssignment', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Refund Policy */}
      <div>
        <h3 className="text-sm font-medium mb-3">Refund Policy</h3>
        <div className="mb-3">
          <label className="block text-sm mb-1 text-gray-600">Return Period (days)</label>
          <input
            type="text"
            className="w-full px-3 py-1.5 border rounded text-sm h-9"
            value={settings.returnPeriod || ''}
            onChange={(e) => handleSettingChange('returnPeriod', e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Refunds Allowed</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={settings.refundsAllowed || false}
              onChange={(e) => handleSettingChange('refundsAllowed', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
      </div>

      {/* Course Permissions */}
      <div>
        <h3 className="text-sm font-medium mb-3">Course Permissions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Allow Content Downloads</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.allowContentDownloads || false}
                onChange={(e) => handleSettingChange('allowContentDownloads', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Allow Discussion Participation</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.allowDiscussionParticipation || false}
                onChange={(e) => handleSettingChange('allowDiscussionParticipation', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Live Classes */}
      <div>
        <h3 className="text-sm font-medium mb-3">Live Classes</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Schedule Live Classes</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.scheduleLiveClasses || false}
                onChange={(e) => handleSettingChange('scheduleLiveClasses', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Enable Subtitles</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.enableSubtitles || false}
                onChange={(e) => handleSettingChange('enableSubtitles', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      </div>

      {/* SEO Settings */}
      <div>
        <h3 className="text-sm font-medium mb-3">SEO Settings</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1 text-gray-600">SEO Title</label>
            <input
              type="text"
              className="w-full px-3 py-1.5 border rounded text-sm h-9"
              value={settings.seoTitle || ''}
              onChange={(e) => handleSettingChange('seoTitle', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-600">SEO Description</label>
            <textarea
              className="w-full px-3 py-1.5 border rounded text-sm"
              value={settings.seoDescription || ''}
              onChange={(e) => handleSettingChange('seoDescription', e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-600">SEO Keywords</label>
            <input
              type="text"
              className="w-full px-3 py-1.5 border rounded text-sm h-9"
              value={settings.seoKeywords || ''}
              onChange={(e) => handleSettingChange('seoKeywords', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="bg-white rounded-lg p-6">
        {renderCourseSettings()}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => updateCourseData('courseSettings', [settings])}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseSettings; 