import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useCourseCreationStore from '../../../../stores/courseCreationStore';

function CourseSettings() {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const [activeSection, setActiveSection] = useState('courseSettings');
  const [courseTypes, setCourseTypes] = useState([]);
  const settings = courseData.courseSettings?.[0] || {};

  useEffect(() => {
    const fetchCourseTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8089/qlms/allCourseTypes');
        setCourseTypes(response.data);
      } catch (error) {
        console.error('Error fetching course types:', error);
      }
    };
    fetchCourseTypes();
  }, []);

  const handleSettingChange = (field, value) => {
    const updatedSettings = [{
      ...courseData.courseSettings?.[0] || {},
      [field]: value
    }];
    updateCourseData('courseSettings', updatedSettings);
  };

  return (
    <div className="bg-white rounded-lg p-6 h-[30vw]">
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-72 border-r pr-4 h-full">
          <div className="flex flex-col space-y-3">
            <button
              className={`text-left px-4 py-3 rounded-lg ${
                activeSection === 'courseSettings'
                  ? 'bg-[#f2f9ff] text-[#0056B3] font-medium'
                  : 'text-gray-600 bg-[#f3f4f6] hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('courseSettings')}
            >
              Course Settings
            </button>
            <button
              className={`text-left px-4 py-3 rounded-lg ${
                activeSection === 'enrollment'
                  ? 'bg-[#f2f9ff] text-[#0056B3] font-medium'
                  : 'text-gray-600 bg-[#f3f4f6] hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('enrollment')}
            >
              Enrollment Settings
            </button>
            <button
              className={`text-left px-4 py-3 rounded-lg ${
                activeSection === 'pricing'
                  ? 'bg-[#f2f9ff] text-[#0056B3] font-medium'
                  : 'text-gray-600 bg-[#f3f4f6] hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('pricing')}
            >
              Pricing
            </button>
            <button
              className={`text-left px-4 py-3 rounded-lg ${
                activeSection === 'seo'
                  ? 'bg-[#f2f9ff] text-[#0056B3] font-medium'
                  : 'text-gray-600 bg-[#f3f4f6] hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('seo')}
            >
              SEO Details
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 pl-6 h-full overflow-hidden">
          <div className="h-full flex flex-col">
            {activeSection === 'courseSettings' && (
              <div className="space-y-6 overflow-y-auto pr-2">
                <h2 className="font-medium mb-4">Course Settings</h2>
                
                {/* Course Visibility */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3">Course Visibility</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Public</span>
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
                </div>

                {/* Course Access */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3">Course Access</h3>
                  <div className="space-y-3">
                    <div className="mb-3">
                      <label className="block text-sm mb-1 text-gray-600">Access Duration *</label>
                      <select
                        className="w-full px-3 py-1.5 border rounded text-sm h-9"
                        value={settings.accessDuration || ''}
                        onChange={(e) => handleSettingChange('accessDuration', e.target.value)}
                      >
                        <option value="">Select Months</option>
                        <option value="1">1 Month</option>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                        <option value="12">12 Months</option>
                      </select>
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
                </div>

                {/* Refund Policy */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3">Refund Policy</h3>
                  <div className="space-y-3">
                    <div className="mb-3">
                      <label className="block text-sm mb-1 text-gray-600">Return Period *</label>
                      <input
                        type="number"
                        className="w-full px-3 py-1.5 border rounded text-sm h-9"
                        value={settings.returnPeriod || ''}
                        onChange={(e) => handleSettingChange('returnPeriod', e.target.value)}
                        placeholder="No.of days"
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
                </div>

                {/* Course Permissions */}
                <div className="border rounded-lg p-4">
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

                {/* Course Type */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3">Course Type</h3>
                  <div className="space-y-3">
                    <div className="mb-3">
                      <label className="block text-sm mb-1 text-gray-600">Course type *</label>
                      <select
                        className="w-full px-3 py-1.5 border rounded text-sm h-9"
                        value={settings.courseType || ''}
                        onChange={(e) => handleSettingChange('courseType', e.target.value)}
                      >
                        <option value="">Select Course Type</option>
                        {courseTypes.map((type) => (
                          <option key={type.id} value={type.courseType}>
                            {type.courseType}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'enrollment' && (
              <div className="space-y-6 overflow-y-auto pr-2">
                <h2 className="font-medium mb-4">Enrollment Settings</h2>
                
                {/* Enrollment Limits */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3">Enrollment Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1 text-gray-600">Max Students *</label>
                      <input
                        type="number"
                        className="w-full px-3 py-1.5 border rounded text-sm h-9"
                        value={settings.maxStudents || ''}
                        onChange={(e) => handleSettingChange('maxStudents', e.target.value)}
                        placeholder="--"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-gray-600">Earn Certificate If you reach % *</label>
                      <input
                        type="number"
                        className="w-full px-3 py-1.5 border rounded text-sm h-9 bg-gray-50"
                        value={settings.certificatePercentage || ''}
                        onChange={(e) => handleSettingChange('certificatePercentage', e.target.value)}
                        placeholder="Enter"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="certificateEligibility"
                        className="rounded border-gray-300 text-blue-600"
                        checked={settings.certificateEligibility || false}
                        onChange={(e) => handleSettingChange('certificateEligibility', e.target.checked)}
                      />
                      <label htmlFor="certificateEligibility" className="text-sm text-gray-600">
                        Certificate Eligibility
                      </label>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Notify Students on Updates</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.notifyUpdates || false}
                          onChange={(e) => handleSettingChange('notifyUpdates', e.target.checked)}
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
                          checked={settings.notifyAssignments || false}
                          onChange={(e) => handleSettingChange('notifyAssignments', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'pricing' && (
              <div className="space-y-6 overflow-y-auto pr-2">
                <h2 className="font-medium mb-4">Pricing</h2>
                
                <div className="border rounded-lg p-4">
                  <div className="space-y-4">
                    {/* Pricing Type */}
                    <div>
                      <label className="block text-sm mb-2 text-gray-600">Pricing Type *</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="pricingType"
                            value="freemium"
                            checked={settings.pricingType === 'freemium'}
                            onChange={(e) => handleSettingChange('pricingType', e.target.value)}
                            className="text-blue-600"
                          />
                          <span className="text-sm text-gray-600">Freemium</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="pricingType"
                            value="premium"
                            checked={settings.pricingType === 'premium'}
                            onChange={(e) => handleSettingChange('pricingType', e.target.value)}
                            className="text-blue-600"
                          />
                          <span className="text-sm text-gray-600">Premium</span>
                        </label>
                      </div>
                    </div>

                    {/* Promotion Type */}
                    <div>
                      <label className="block text-sm mb-2 text-gray-600">Promotion Type</label>
                      <select
                        className="w-full px-3 py-1.5 border rounded text-sm h-9 bg-gray-50"
                        value={settings.promotionType || ''}
                        onChange={(e) => handleSettingChange('promotionType', e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="early_bird">Early Bird</option>
                        <option value="seasonal">Seasonal</option>
                        <option value="special">Special</option>
                      </select>
                    </div>

                    {/* Price and Discount */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2 text-gray-600">Price *</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            className="w-full pl-7 pr-3 py-1.5 border rounded text-sm h-9"
                            value={settings.price || ''}
                            onChange={(e) => handleSettingChange('price', e.target.value)}
                            placeholder="Enter price"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm mb-2 text-gray-600">Discount *</label>
                        <div className="relative">
                          <input
                            type="number"
                            className="w-full pr-7 pl-3 py-1.5 border rounded text-sm h-9"
                            value={settings.discount || ''}
                            onChange={(e) => handleSettingChange('discount', e.target.value)}
                            placeholder="Enter discount"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                        </div>
                      </div>
                    </div>

                    {/* Start and End Date */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2 text-gray-600">Start date *</label>
                        <input
                          type="date"
                          className="w-full px-3 py-1.5 border rounded text-sm h-9"
                          value={settings.startDate || ''}
                          onChange={(e) => handleSettingChange('startDate', e.target.value)}
                          placeholder="DD-Mon-YYYY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2 text-gray-600">End date *</label>
                        <input
                          type="date"
                          className="w-full px-3 py-1.5 border rounded text-sm h-9"
                          value={settings.endDate || ''}
                          onChange={(e) => handleSettingChange('endDate', e.target.value)}
                          placeholder="DD-Mon-YYYY"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'seo' && (
              <div className="space-y-6 overflow-y-auto pr-2">
                <h2 className="font-medium mb-4">SEO Details</h2>
                
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* SEO Title */}
                    <div>
                      <label className="block text-sm mb-2 text-gray-600">SEO Title *</label>
                      <input
                        type="text"
                        className="w-full px-3 py-1.5 border rounded text-sm h-9"
                        value={settings.seoTitle || ''}
                        onChange={(e) => handleSettingChange('seoTitle', e.target.value)}
                        placeholder="Placeholder Text"
                      />
                    </div>

                    {/* SEO Description */}
                    <div>
                      <label className="block text-sm mb-2 text-gray-600">SEO Description *</label>
                      <input
                        type="text"
                        className="w-full px-3 py-1.5 border rounded text-sm h-9"
                        value={settings.seoDescription || ''}
                        onChange={(e) => handleSettingChange('seoDescription', e.target.value)}
                        placeholder="Placeholder Text"
                      />
                    </div>

                    {/* SEO Keywords */}
                    <div>
                      <label className="block text-sm mb-2 text-gray-600">SEO Keywords *</label>
                      <input
                        type="text"
                        className="w-full px-3 py-1.5 border rounded text-sm h-9"
                        value={settings.seoKeywords || ''}
                        onChange={(e) => handleSettingChange('seoKeywords', e.target.value)}
                        placeholder="Placeholder Text"
                      />
                    </div>

                    {/* Hashtags */}
                    <div>
                      <label className="block text-sm mb-2 text-gray-600">Hashtags *</label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-3 py-1.5 border rounded text-sm h-9"
                          value={settings.hashtags || ''}
                          onChange={(e) => handleSettingChange('hashtags', e.target.value)}
                          placeholder="Placeholder Text"
                        />
                        {settings.hashtags && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {settings.hashtags.split(',').map((tag, index) => (
                              <span 
                                key={index} 
                                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"
                              >
                                {tag.trim()}
                                <button
                                  onClick={() => {
                                    const newTags = settings.hashtags
                                      .split(',')
                                      .filter((_, i) => i !== index)
                                      .join(',');
                                    handleSettingChange('hashtags', newTags);
                                  }}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseSettings; 