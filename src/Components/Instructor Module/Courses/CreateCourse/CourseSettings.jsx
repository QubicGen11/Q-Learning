import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useCourseCreationStore from '../../../../stores/courseCreationStore';

const commonStyles = {
  radioButton: "accent-[#0056B3] h-4 w-4",
  switch: "peer-checked:bg-[#0056B3]", // For toggle switches
  input: "focus:border-[#0056B3] focus:ring-[#0056B3]",
  select: "focus:border-[#0056B3] focus:ring-[#0056B3]"
};

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
    let processedValue = value;
    
    // Special handling for pricingType
    if (field === 'pricingType') {
      const updatedSettings = [{
        ...courseData.courseSettings?.[0],
        pricingType: value,
        // Reset promotionType if freemium is selected
        promotionType: value === 'freemium' ? '' : courseData.courseSettings?.[0]?.promotionType
      }];
      updateCourseData('courseSettings', updatedSettings);
      return;
    }

    // Handle other fields
    if (['accessDuration', 'returnPeriod'].includes(field)) {
      processedValue = String(value);
    } else if (field === 'offeredPrice') {
      processedValue = parseFloat(value) || 0;
    } else if (['maxStudents', 'price', 'discount'].includes(field)) {
      processedValue = parseInt(value, 10) || 0;
    }
    
    const updatedSettings = [{
      ...courseData.courseSettings?.[0],
      [field]: processedValue
    }];

    updateCourseData('courseSettings', updatedSettings);
  };

  return (
    <div className="bg-white p-6 h-[30vw]">
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-72 border-r pr-4 h-full">
          <div className="flex flex-col space-y-3">
            <button
              className={`text-left px-4 py-3  ${
                activeSection === 'courseSettings'
                  ? 'bg-[#f2f9ff] text-[#0056B3] font-medium'
                  : 'text-gray-600 bg-[#f3f4f6] hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('courseSettings')}
            >
              Course Settings
            </button>
            <button
              className={`text-left px-4 py-3  ${
                activeSection === 'enrollment'
                  ? 'bg-[#f2f9ff] text-[#0056B3] font-medium'
                  : 'text-gray-600 bg-[#f3f4f6] hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('enrollment')}
            >
              Enrollment Settings
            </button>
            <button
              className={`text-left px-4 py-3  ${
                activeSection === 'pricing'
                  ? 'bg-[#f2f9ff] text-[#0056B3] font-medium'
                  : 'text-gray-600 bg-[#f3f4f6] hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('pricing')}
            >
              Pricing
            </button>
            <button
              className={`text-left px-4 py-3  ${
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
              <div className="space-y-8 overflow-y-auto pr-2">
                {/* Course Visibility */}
                <div>
                  <h3 className="text-sm font-medium mb-4">Course Visibility</h3>
                  <div className="flex items-center space-x-6 ">
                    <div className="flex items-center space-x-3 w-[450px]">
                      <span className="text-sm text-gray-600">Public</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.publicAccess || false}
                          onChange={(e) => handleSettingChange('publicAccess', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3 w-[450px]">
                      <span className="text-sm text-gray-600">Enable Preview</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.enablePreview || false}
                          onChange={(e) => handleSettingChange('enablePreview', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Course Access */}
                <div>
                  <h3 className="text-sm font-medium mb-4">Course Access</h3>
                  <div className="flex items-center space-x-6 ">
                    <div>
                      <label className="block text-sm mb-2 text-gray-600">Access Duration *</label>
                      <select
                        className="w-[450px] px-3 py-1.5 border rounded text-sm h-9"
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
                    <div className="flex items-center space-x-3 w-[450px] mt-6">
                      <span className="text-sm text-gray-600">Lifetime Access</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.lifeTimeAccess || false}
                          onChange={(e) => handleSettingChange('lifeTimeAccess', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Refund Policy */}
                <div>
                  <h3 className="text-sm font-medium mb-4">Refund Policy</h3>
                  <div className="flex items-center space-x-6 ">
                    <div>
                      <label className="block text-sm mb-2 text-gray-600">Return Period *</label>
                      <input
                        type="number"
                        className="w-[450px] px-3 py-1.5 border rounded text-sm h-9"
                        value={settings.returnPeriod || ''}
                        onChange={(e) => handleSettingChange('returnPeriod', e.target.value)}
                        placeholder="No. of days"
                      />
                    </div>
                    <div className="flex items-center space-x-3 w-[450px] mt-6">
                      <span className="text-sm text-gray-600">Refunds Allowed</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.refundsAllowed || false}
                          onChange={(e) => handleSettingChange('refundsAllowed', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Course Permissions */}
                <div>
                  <h3 className="text-sm font-medium mb-4">Course Permissions</h3>
                  <div className="flex items-center space-x-3  w-[1200px]">
                    <div className="flex items-center space-x-3 w-[450px]">
                      <span className="text-sm text-gray-600">Allow Content Downloads</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.allowContentDownloads || false}
                          onChange={(e) => handleSettingChange('allowContentDownloads', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3 w-[450px]">
                      <span className="text-sm text-gray-600">Allow Discussion Participation</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.allowDiscussionParticipation || false}
                          onChange={(e) => handleSettingChange('allowDiscussionParticipation', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3 w-[450px]">
                      <span className="text-sm text-gray-600">Schedule Live Classes</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.scheduleLiveClasses || false}
                          onChange={(e) => handleSettingChange('scheduleLiveClasses', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3 w-[450px]">
                      <span className="text-sm text-gray-600">Enable Subtitles</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.enableSubtitles || false}
                          onChange={(e) => handleSettingChange('enableSubtitles', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3 w-[450px]">
                      <span className="text-sm text-gray-600">Enable Subtitles</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.enableSubtitles || false}
                          onChange={(e) => handleSettingChange('enableSubtitles', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Course Type */}
                <div>
                  <h3 className="text-sm font-medium mb-4">Course Type</h3>
                  <div>
                    <label className="block text-sm mb-2 text-gray-600">Course type *</label>
                    <select
                      className="w-[450px] px-3 py-1.5 border rounded text-sm h-9"
                      value={settings.courseType || ''}
                      onChange={(e) => handleSettingChange('courseType', e.target.value)}
                    >
                      <option value="">Select</option>
                      {courseTypes.map((type) => (
                        <option key={type.id} value={type.courseType}>
                          {type.courseType}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'enrollment' && (
              <div className="space-y-8 overflow-y-auto pr-2">
                {/* Enrollment Settings */}
                <div>
                  <h3 className="text-sm font-medium mb-4">Enrollment Settings</h3>
                  <div className="flex items-center space-x-6">
                    <div>
                      <label className="block text-sm mb-2 text-gray-600">Maximum Students</label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        className="w-[300px] px-3 py-1.5 border rounded text-sm h-9"
                        value={settings.maxStudents || ''}
                        onChange={(e) => handleSettingChange('maxStudents', e.target.value)}
                        onBlur={(e) => {
                          const value = parseInt(e.target.value, 10) || 0;
                          handleSettingChange('maxStudents', value);
                        }}
                        placeholder="Enter maximum number of students"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-gray-600">Earn Certificate If you reach % *</label>
                      <input
                        type="number"
                        className="w-[300px] px-3 py-1.5 border rounded text-sm h-9 bg-[#e5e7eb]"
                        value={settings.certificatePercentage || ''}
                        onChange={(e) => handleSettingChange('certificatePercentage', e.target.value)}
                        placeholder="Enter"
                      />
                    </div>
                    <div className="flex items-center space-x-3 w-[450px] mt-6 ">
                      <span className="text-sm text-gray-600">Certificate Eligibility</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.certificateEligibility || false}
                          onChange={(e) => handleSettingChange('certificateEligibility', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <h3 className="text-sm font-medium mb-4">Notifications</h3>
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center space-x-3 w-[300px]">
                      <span className="text-sm text-gray-600">Notify Students on Updates</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.notifyStudentsOnUpdate || false}
                          onChange={(e) => handleSettingChange('notifyStudentsOnUpdate', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3 w-[300px]">
                      <span className="text-sm text-gray-600">Notify Students on Assignments</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.notifyStudentsOnAssignment || false}
                          onChange={(e) => handleSettingChange('notifyStudentsOnAssignment', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'pricing' && (
              <div className="space-y-8 overflow-y-auto pr-2">
                {/* Pricing Type */}
                <div className="flex items-center  space-x-32">

                <div>
                  <h3 className="text-sm font-medium mb-4">Pricing Type</h3>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="pricingType"
                        value="freemium"
                        checked={settings.pricingType === 'freemium'}
                        onChange={() => handleSettingChange('pricingType', 'freemium')}
                        className={commonStyles.radioButton}
                      />
                      <span className="text-sm text-gray-600">Freemium</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="pricingType"
                        value="premium"
                        checked={settings.pricingType === 'premium'}
                        onChange={() => handleSettingChange('pricingType', 'premium')}
                        className={commonStyles.radioButton}
                      />
                      <span className="text-sm text-gray-600">Premium</span>
                    </label>
                  </div>
                </div>

                {/* Promotion Type - Always visible but disabled for freemium */}
                <div>
                  <label className={`block text-sm mb-2 ${settings.pricingType === 'freemium' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Promotion Type
                  </label>
                  <select
                    className={`w-[300px] px-3 py-1.5 border rounded text-sm h-9 
                      ${settings.pricingType === 'freemium' 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-900'} ${commonStyles.select}`}
                    value={settings.promotionType || ''}
                    onChange={(e) => handleSettingChange('promotionType', e.target.value)}
                    disabled={settings.pricingType === 'freemium'}
                  >
                    <option value="">Select</option>
                    <option value="nopromotion">No Promotion</option>
                    <option value="featured">Featured</option>
                    <option value="learnerchoice">Learner Choice</option>
                    <option value="qubinestsuggestionsforyou">Qubinest Suggestions for you</option>
                  </select>
                </div>
                </div>

                {/* Price and Discount */}
                <div className=" flex items-center space-x-6">
                  <div>
                    <label className="block text-sm mb-2 text-gray-600">Price *</label>
                    <div className="relative w-[300px]">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        className={`w-full pl-7 pr-3 py-1.5 border rounded text-sm h-9 ${commonStyles.input}`}
                        value={settings.price || ''}
                        onChange={(e) => handleSettingChange('price', e.target.value)}
                        placeholder="Enter price"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-600">Offered Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className={`w-[300px] px-3 py-1.5 border rounded text-sm h-9 ${commonStyles.input}`}
                      value={settings.offeredPrice || ''}
                      onChange={(e) => handleSettingChange('offeredPrice', e.target.value)}
                      placeholder="Enter offered price"
                    />
                  </div>
                </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-600">Discount (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      className={`w-[300px] px-3 py-1.5 border rounded text-sm h-9 ${commonStyles.input}`}
                      value={settings.discount || ''}
                      onChange={(e) => handleSettingChange('discount', e.target.value)}
                      placeholder="Enter discount percentage"
                    />
                  </div>

                {/* Start and End Date */}
                <div className="flex items-center space-x-6">
                  <div>
                    <label className="block text-sm mb-2 text-gray-600">Start date *</label>
                    <input
                      type="date"
                      className={`w-[300px] px-3 py-1.5 border rounded text-sm h-9 ${commonStyles.input}`}
                      value={settings.startDate || ''}
                      onChange={(e) => handleSettingChange('startDate', e.target.value)}
                      placeholder="DD-Mon-YYYY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-600">End date *</label>
                    <input
                      type="date"
                      className={`w-[300px] px-3 py-1.5 border rounded text-sm h-9 ${commonStyles.input}`}
                      value={settings.endDate || ''}
                      onChange={(e) => handleSettingChange('endDate', e.target.value)}
                      placeholder="DD-Mon-YYYY"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'seo' && (
              <div className="space-y-6 overflow-y-auto pr-2">
                <h2 className="font-medium mb-4">SEO Details</h2>
                
                <div className=" rounded-lg ">
                  <div className="flex space-x-28 w-[600px] ">
                    {/* SEO Title */}
                    <div className=''>
                    <div className='p-2'>
                      <label className="block text-sm mb-2 text-gray-600">SEO Title *</label>
                      <input
                        type="text"
                        className={`w-5/5 px-3 py-1.5 border rounded text-sm h-9 ${commonStyles.input}`}
                        value={settings.seoTitle || ''}
                        onChange={(e) => handleSettingChange('seoTitle', e.target.value)}
                        placeholder="Placeholder Text"
                      />
                    </div>

                    {/* SEO Description */}
                    <div className='p-2'>
                      <label className="block text-sm mb-2 text-gray-600">SEO Description *</label>
                      <input
                        type="text"
                        className={`w-5/5 px-3 py-1.5 border rounded text-sm h-9 ${commonStyles.input}`}
                        value={settings.seoDescription || ''}
                        onChange={(e) => handleSettingChange('seoDescription', e.target.value)}
                        placeholder="Placeholder Text"
                      />
                    </div>
                    </div>

                    {/* SEO Keywords */}
                    <div className='p-2'>
                         <div className='p-2'>
                      <label className="block text-sm mb-2 text-gray-600">SEO Keywords *</label>
                      <input
                        type="text"
                        className={`w-5/5 px-3 py-1.5 border rounded text-sm h-9 ${commonStyles.input}`}
                        value={settings.seoKeywords || ''}
                        onChange={(e) => handleSettingChange('seoKeywords', e.target.value)}
                        placeholder="Placeholder Text"
                      />
                    </div>

                    {/* Hashtags */}
                    <div className='p-2'>
                      <label className="block text-sm mb-2 text-gray-600">Hashtags *</label>
                      <div className="relative">
                        <input
                          type="text"
                          className={`w-5/5 px-3 py-1.5 border rounded text-sm h-9 ${commonStyles.input}`}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseSettings; 