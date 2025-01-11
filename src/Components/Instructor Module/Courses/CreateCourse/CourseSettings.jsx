import React, { useState, useEffect, useRef } from 'react';
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
  const [showAccessDurationSuggestions, setShowAccessDurationSuggestions] = useState(false);
  const [showCourseTypeSuggestions, setShowCourseTypeSuggestions] = useState(false);
  const [filteredAccessDurations, setFilteredAccessDurations] = useState([]);
  const [filteredCourseTypes, setFilteredCourseTypes] = useState([]);
  const accessDurationInputRef = useRef(null);
  const courseTypeInputRef = useRef(null);
  const [showPromotionTypeSuggestions, setShowPromotionTypeSuggestions] = useState(false);
  const [filteredPromotionTypes, setFilteredPromotionTypes] = useState([]);
  const promotionTypeInputRef = useRef(null);

  const accessDurationOptions = ["1 Month", "3 Months", "6 Months", "12 Months"];
  const promotionTypeOptions = [
    'No Promotion',
    'Featured',
    'Learner Choice',
    'Qubinest Suggestions for you'
  ];

  // Log initial settings
  console.log('Initial courseSettings:', courseData.courseSettings);

  const calculateDropdownPosition = (inputRef) => {
    if (!inputRef.current) return 'bottom';
    
    const rect = inputRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    // If space below is less than 200px and we have more space above, show dropdown on top
    return spaceBelow < 200 && spaceAbove > spaceBelow ? 'top' : 'bottom';
  };

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
    console.log(`Changing setting ${field} to:`, value);
    console.log('Current settings before change:', courseData.courseSettings);
    
    const currentSettings = courseData.courseSettings?.[0] || {};
    const updatedSettings = [{
      ...currentSettings,
      [field]: value
    }];
    
    console.log('Updated settings to be saved:', updatedSettings);
    updateCourseData('courseSettings', updatedSettings);
  };

  return (
    <>
    
    <div className="bg-white  h-[30vw]">
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="fixed calc-height w-[310px] h-[600px] gap-4 p-4 border-2 border-[#E2E8F0] overflow-x-hidden overflow-y-auto bg-white">
          <div className="flex flex-col space-y-3">
            <button
              className={`text-left px-4  h-[32px] w-[278px]  ${
                activeSection === 'courseSettings'
                  ? 'bg-[#f2f9ff] text-[#0056B3] font-medium  border-l-4 rounded border-[#0056B3]'
                  : 'text-gray-600 bg-[#f3f4f6] hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('courseSettings')}
            >
              Course Settings
            </button>
            <button
              className={`text-left px-4 h-[32px] w-[278px]   ${
                activeSection === 'enrollment'
                  ? 'bg-[#f2f9ff] text-[#0056B3] font-medium  border-l-4 rounded border-[#0056B3]'
                  : 'text-gray-600 bg-[#f3f4f6] hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('enrollment')}
            >
              Enrollment Settings
            </button>
            <button
              className={`text-left px-4 h-[32px] w-[278px]   ${
                activeSection === 'pricing'
                  ? 'bg-[#f2f9ff] text-[#0056B3] font-medium  border-l-4 rounded border-[#0056B3]'
                  : 'text-gray-600 bg-[#f3f4f6] hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('pricing')}
            >
              Pricing
            </button>
            <button
              className={`text-left px-4 h-[32px] w-[278px]   ${
                activeSection === 'seo'
                  ? 'bg-[#f2f9ff] text-[#0056B3] font-medium  border-l-4 rounded border-[#0056B3]'
                  : 'text-gray-600 bg-[#f3f4f6] hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('seo')}
            >
              SEO Details
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex justify-start ml-[60px] items-center  p-6">
          <div className="h-full flex flex-col ">
            {activeSection === 'courseSettings' && (
              <div className="space-y-8 overflow-y-auto pr-2 ml-[250px] scrollbar-hide">
                {/* Course Visibility */}
                <div>
                  <h3 className="text-sm font-medium mb-4 text-gray-600" style={{ fontWeight: '700' }}>Course Visibility</h3>
                  <div className="grid grid-cols-2 gap-x-32">
                    <div className="flex items-center space-x-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.publicAccess || false}
                          onChange={(e) => handleSettingChange('publicAccess', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                      <span className="text-sm text-gray-600">Public</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.enablePreview || false}
                          onChange={(e) => handleSettingChange('enablePreview', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                      <span className="text-sm text-gray-600">Enable Preview</span>
                    </div>
                  </div>
                </div>

                {/* Course Access */}
                <div>
                  <h3 className="text-sm font-medium mb-4 text-gray-600" style={{ fontWeight: '700' }}>Course Access</h3>
                  <div className="grid grid-cols-2 gap-x-32">
                    <div>
                      <label className="block text-sm mb-2 text-gray-600">Access Duration *</label>
                      <div className="relative">
                        <input
                          ref={accessDurationInputRef}
                          type="text"
                          className="w-[290px] h-[40px] px-3 py-1.5 border rounded text-sm"
                          value={settings.accessDuration || ''}
                          onChange={(e) => {
                            handleSettingChange('accessDuration', e.target.value);
                            const filtered = accessDurationOptions.filter(duration =>
                              duration.toLowerCase().includes(e.target.value.toLowerCase())
                            );
                            setFilteredAccessDurations(filtered);
                            setShowAccessDurationSuggestions(true);
                          }}
                          onFocus={() => {
                            setFilteredAccessDurations(accessDurationOptions);
                            setShowAccessDurationSuggestions(true);
                          }}
                          onBlur={() => {
                            setTimeout(() => setShowAccessDurationSuggestions(false), 200);
                          }}
                          placeholder="Select Months"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                          {settings.accessDuration ? (
                            <button
                              type="button"
                              className="hover:text-gray-600"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSettingChange('accessDuration', '');
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          ) : showAccessDurationSuggestions ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </div>
                        {showAccessDurationSuggestions && filteredAccessDurations.length > 0 && (
                          <ul className={`absolute z-10 w-full ${
                            calculateDropdownPosition(accessDurationInputRef) === 'top' 
                              ? 'bottom-full mb-1' 
                              : 'top-full mt-1'
                          } max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg`}>
                            {filteredAccessDurations.map((duration, index) => (
                              <li
                                key={index}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  handleSettingChange('accessDuration', duration);
                                  setShowAccessDurationSuggestions(false);
                                }}
                              >
                                {duration}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 self-end mb-1.5">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.lifeTimeAccess || false}
                          onChange={(e) => handleSettingChange('lifeTimeAccess', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                      <span className="text-sm text-gray-600">Lifetime Access</span>
                    </div>
                  </div>
                </div>

                {/* Refund Policy */}
                <div>
                  <h3 className="text-sm font-medium mb-4 text-gray-600" style={{ fontWeight: '700' }}>Refund Policy</h3>
                  <div className="grid grid-cols-2 gap-x-32">
                    <div>
                      <label className="block text-sm mb-2 text-gray-600">Return Period *</label>
                      <input
                        type="number"
                        className="w-[290px] h-[40px] px-3 py-1.5 border rounded text-sm "
                        value={settings.returnPeriod || ''}
                        onChange={(e) => handleSettingChange('returnPeriod', e.target.value)}
                        placeholder="No. of days"
                      />
                    </div>
                    <div className="flex items-center space-x-3 self-end mb-1.5">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.refundsAllowed || false}
                          onChange={(e) => handleSettingChange('refundsAllowed', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                      <span className="text-sm text-gray-600">Refunds Allowed</span>
                    </div>
                  </div>
                </div>

                {/* Course Permissions */}
                <div>
                  <h3 className="text-sm font-medium mb-4 text-gray-600" style={{ fontWeight: '700' }}>Course Permissions</h3>
                  <div className="grid grid-cols-2 gap-x-32 gap-y-6">
                    <div className="flex items-center space-x-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.allowContentDownloads || false}
                          onChange={(e) => handleSettingChange('allowContentDownloads', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                      <span className="text-sm text-gray-600">Allow Content Downloads</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.allowDiscussionParticipation || false}
                          onChange={(e) => handleSettingChange('allowDiscussionParticipation', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                      <span className="text-sm text-gray-600">Allow Discussion Participation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.scheduleLiveClasses || false}
                          onChange={(e) => handleSettingChange('scheduleLiveClasses', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                      <span className="text-sm text-gray-600">Schedule Live Classes</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.enableSubtitles || false}
                          onChange={(e) => handleSettingChange('enableSubtitles', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0056B3] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                      <span className="text-sm text-gray-600">Enable Subtitles</span>
                    </div>
                  </div>
                </div>

                {/* Course Type */}
                <div>
                  <h3 className="text-sm font-medium mb-4 text-gray-600" style={{ fontWeight: '700' }}>Course Type</h3>
                  <div className="grid grid-cols-2 gap-x-32">
                    <div>
                      <label className="block text-sm mb-2 text-gray-600">Course type *</label>
                      <div className="relative">
                        <input
                          ref={courseTypeInputRef}
                          type="text"
                          className="w-[290px] h-[40px] px-3 py-1.5 border rounded text-sm"
                          value={settings.courseType || ''}
                          onChange={(e) => {
                            handleSettingChange('courseType', e.target.value);
                            const filtered = courseTypes.filter(type =>
                              type.courseType.toLowerCase().includes(e.target.value.toLowerCase())
                            );
                            setFilteredCourseTypes(filtered);
                            setShowCourseTypeSuggestions(true);
                          }}
                          onFocus={() => {
                            setFilteredCourseTypes(courseTypes);
                            setShowCourseTypeSuggestions(true);
                          }}
                          onBlur={() => {
                            setTimeout(() => setShowCourseTypeSuggestions(false), 200);
                          }}
                          placeholder="Select Course Type"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                          {settings.courseType ? (
                            <button
                              type="button"
                              className="hover:text-gray-600"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSettingChange('courseType', '');
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          ) : showCourseTypeSuggestions ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </div>
                        {showCourseTypeSuggestions && filteredCourseTypes.length > 0 && (
                          <ul className={`absolute z-10 w-full ${
                            calculateDropdownPosition(courseTypeInputRef) === 'top' 
                              ? 'bottom-full mb-1' 
                              : 'top-full mt-1'
                          } max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg`}>
                            {filteredCourseTypes.map((type) => (
                              <li
                                key={type.id}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  handleSettingChange('courseType', type.courseType);
                                  setShowCourseTypeSuggestions(false);
                                }}
                              >
                                {type.courseType}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'enrollment' && (
              <div className="space-y-8 overflow-y-auto pr-2 ml-[250px]">
                {/* Enrollment Settings */}
                <div>
                  <h3 className="text-sm font-medium mb-4  text-gray-600" style={{ fontWeight: '700' }}>Enrollment Settings</h3>
                  <div className="flex items-center space-x-6">
                    <div>
                      <label className="block text-sm mb-2 text-gray-600">Maximum Students</label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        className="w-[290px] h-[40px] px-3 py-1.5 border rounded text-sm"
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
                        className="w-[290px] px-3 py-1.5 border rounded text-sm h-9 bg-[#e5e7eb]"
                        value={settings.percentageRequired || ''}
                        onChange={(e) => handleSettingChange('percentageRequired', e.target.value)}
                        placeholder="Enter percentage required"
                      />
                    </div>
                    <div className="flex items-center space-x-3 w-[450px] mt-6">
                      <label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 
                          focus:ring-[#0056B3] focus:ring-offset-0
                          text-[#0056B3] 
                          checked:bg-[#0056B3] 
                          checked:hover:bg-[#0056B3] 
                          checked:focus:bg-[#0056B3]
                          accent-[#0056B3]"
                          checked={settings.certificateEligibility || false}
                          onChange={(e) => handleSettingChange('certificateEligibility', e.target.checked)}
                        />
                        <span className="text-sm text-gray-600 ml-2">Certificate Eligibility</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <h3 className="text-sm font-medium mb-4  text-gray-600" style={{ fontWeight: '700' }}>Notifications</h3>
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
                          className="sr-only peer bg-[#0056B3]"
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
              <div className="space-y-8 overflow-y-auto pr-2 ml-[250px]">
               
                <div className="flex items-center  space-x-32">

                <div>
                  <h3 className="text-sm font-lg mb-4 text-gray-600" style={{ fontWeight: '700' }}>Pricing </h3>
       <div className='flex items-center space-x-32 '>
       <div className=''>

<h3 className="text-sm font-normal mb-4 text-gray-600">Pricing Type</h3>
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
<div className=''>
<label className={`block text-sm mb-2 ${settings.pricingType === 'freemium' ? 'text-gray-400' : 'text-gray-600'}`}>
  Promotion Type
</label>
<div className="grid grid-cols-2 gap-x-32">
  <div className="relative">
    <input
      ref={promotionTypeInputRef}
      type="text"
      className="w-[290px] h-[40px] px-3 py-1.5 border rounded text-sm"
      value={settings.promotionType || ''}
      onChange={(e) => {
        handleSettingChange('promotionType', e.target.value);
        const filtered = promotionTypeOptions.filter(type =>
          type.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredPromotionTypes(filtered);
        setShowPromotionTypeSuggestions(true);
      }}
      onFocus={() => {
        if (!settings.pricingType === 'freemium') {
          setFilteredPromotionTypes(promotionTypeOptions);
          setShowPromotionTypeSuggestions(true);
        }
      }}
      onBlur={() => {
        setTimeout(() => setShowPromotionTypeSuggestions(false), 200);
      }}
      placeholder="Select Promotion Type"
      disabled={settings.pricingType === 'freemium'}
    />
    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
      {settings.promotionType ? (
        <button
          type="button"
          className="hover:text-gray-600"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSettingChange('promotionType', '');
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      ) : showPromotionTypeSuggestions ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </div>
    {showPromotionTypeSuggestions && filteredPromotionTypes.length > 0 && (
      <ul className={`absolute z-10 w-[290px] ${
        calculateDropdownPosition(promotionTypeInputRef) === 'top' 
          ? 'bottom-full mb-1' 
          : 'top-full mt-1'
      } max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg`}>
        {filteredPromotionTypes.map((type, index) => (
          <li
            key={index}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            onMouseDown={(e) => {
              e.preventDefault();
              handleSettingChange('promotionType', type);
              setShowPromotionTypeSuggestions(false);
            }}
          >
            {type}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
</div>



       </div>
                  
                
                 </div> 
                </div>

                {/* Promotion Type - Always visible but disabled for freemium */}
               

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
              <div className="space-y-6 overflow-y-auto pr-2 ml-[250px]">
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
    </>
  );
}

export default CourseSettings; 