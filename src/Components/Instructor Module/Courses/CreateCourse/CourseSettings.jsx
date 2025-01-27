import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useCourseCreationStore from '../../../../stores/courseCreationStore';
import Cookies from 'js-cookie';

const commonStyles = {
  radioButton: "accent-[#0056B3] h-4 w-4",
  switch: "peer-checked:bg-[#0056B3]", // For toggle switches
  input: "focus:border-[#0056B3] focus:ring-[#0056B3]",
  select: "focus:border-[#0056B3] focus:ring-[#0056B3]"
};

function CourseSettings() {
  const { courseData, updateCourseData, validationErrors } = useCourseCreationStore();
  const [activeSection, setActiveSection] = useState('courseSettings');
  const [courseTypes, setCourseTypes] = useState([]);
  const [settings, setSettings] = useState({
    hashTags: [] // Initialize hashTags as empty array
  });
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

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = Cookies.get('accessToken');
        const courseId = localStorage.getItem('currentCourseId');
        
        const response = await axios.get(`http://localhost:8089/qlms/courses/${courseId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data.course.courseSettings?.[0]) {
          const settingsData = response.data.course.courseSettings[0];
          
          // Convert hashTags to array if it's a string
       
          setSettings({
            ...settingsData,
           
              seoKeywords: Array.isArray(settingsData.seoKeywords) ? settingsData.seoKeywords.join(',') : '',
               // Convert string to array for hashTags if it comes as string
               hashTags: typeof settingsData.hashTags === 'string' 
               ? settingsData.hashTags.split(',') 
               : Array.isArray(settingsData.hashTags) 
                 ? settingsData.hashTags 
                 : []
             
          });
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleSettingChange = (field, value) => {
    console.log('Updating setting:', field, 'with value:', value);

    const updatedSettings = {
      ...settings,
      [field]: value
    };

    console.log('Updated settings:', updatedSettings);

    updateCourseData('courseSettings', updatedSettings);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!accessDurationOptions.includes(settings.accessDuration)) {
        setSettings(prev => ({
          ...prev,
          accessDuration: ''
        }));
        handleSettingChange('accessDuration', '');
      }
      setShowAccessDurationSuggestions(false);
    }, 200);
  };

  const handleCourseTypeBlur = () => {
    setTimeout(() => {
      if (!courseTypes.some(type => type.courseType === settings.courseType)) {
        setSettings(prev => ({
          ...prev,
          courseType: ''
        }));
        handleSettingChange('courseType', '');
      }
      setShowCourseTypeSuggestions(false);
    }, 200);
  };

  const calculateOfferedPrice = (price, discount) => {
    const numPrice = parseFloat(price) || 0;
    const numDiscount = parseFloat(discount) || 0;
    const discountAmount = (numPrice * numDiscount) / 100;
    return (numPrice - discountAmount).toFixed(2);
  };

  return (
    <>

      <div className="bg-white  h-[30vw]">
        <div className="flex h-full">
          {/* Left Sidebar */}
          <div className="fixed calc-height w-[310px] h-[600px] gap-4 p-4 border-2 border-[#E2E8F0] overflow-x-hidden overflow-y-auto bg-white">
            <div className="flex flex-col space-y-3">
              <button
                className={`text-left px-4  h-[32px] w-[278px]  ${activeSection === 'courseSettings'
                    ? 'bg-[#f2f9ff] text-[#0056B3] font-medium  border-l-4 rounded border-[#0056B3]'
                    : 'text-gray-600 bg-[#f3f4f6] hover:bg-gray-50'
                  }`}
                onClick={() => setActiveSection('courseSettings')}
              >
                Course Settings
              </button>
              <button
                className={`text-left px-4 h-[32px] w-[278px]   ${activeSection === 'enrollment'
                    ? 'bg-[#f2f9ff] text-[#0056B3] font-medium  border-l-4 rounded border-[#0056B3]'
                    : 'text-gray-600 bg-[#f3f4f6] hover:bg-gray-50'
                  }`}
                onClick={() => setActiveSection('enrollment')}
              >
                Enrollment Settings
              </button>
              <button
                className={`text-left px-4 h-[32px] w-[278px]   ${activeSection === 'pricing'
                    ? 'bg-[#f2f9ff] text-[#0056B3] font-medium  border-l-4 rounded border-[#0056B3]'
                    : 'text-gray-600 bg-[#f3f4f6] hover:bg-gray-50'
                  }`}
                onClick={() => setActiveSection('pricing')}
              >
                Pricing
              </button>
              <button
                className={`text-left px-4 h-[32px] w-[278px]   ${activeSection === 'seo'
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
          <div className="flex-1 flex justify-start ml-[60px] items-center  p-6 overflow-x-hidden">
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
                            checked={settings.publicAccess}
                            onChange={(e) => {
                              handleSettingChange('publicAccess', e.target.checked);
                              setSettings(prev => ({
                                ...prev,
                                publicAccess: e.target.checked
                              }));
                            }}
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
                            checked={settings.enablePreview}
                            onChange={(e) => {
                              handleSettingChange('enablePreview', e.target.checked);
                              setSettings(prev => ({
                                ...prev,
                                enablePreview: e.target.checked
                              }));
                            }}
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
                            className={`w-[290px] h-[40px] px-3 py-1.5 border rounded text-sm ${settings.lifeTimeAccess ? 'bg-gray-100 cursor-not-allowed' : ''
                              }`}
                            value={settings.accessDuration || ''}
                            onClick={() => {
                              if (!settings.lifeTimeAccess) {
                                setFilteredAccessDurations(accessDurationOptions);
                                setShowAccessDurationSuggestions(true);
                              }
                            }}
                            onChange={(e) => {
                              if (!settings.lifeTimeAccess) {
                                const newValue = e.target.value;
                                setSettings(prev => ({
                                  ...prev,
                                  accessDuration: newValue
                                }));
                                handleSettingChange('accessDuration', newValue);
                                const filtered = accessDurationOptions.filter(duration =>
                                  duration.toLowerCase().includes(newValue.toLowerCase())
                                );
                                setFilteredAccessDurations(filtered);
                              }
                            }}
                            onBlur={handleInputBlur}
                            disabled={settings.lifeTimeAccess}
                            placeholder={settings.lifeTimeAccess ? "Lifetime Access Enabled" : "Select Months"}
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                            {!settings.lifeTimeAccess && (
                              settings.accessDuration ? (
                                <button
                                  type="button"
                                  className="hover:text-gray-600"
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setSettings(prev => ({
                                      ...prev,
                                      accessDuration: ''
                                    }));
                                    handleSettingChange('accessDuration', '');
                                    setShowAccessDurationSuggestions(false);
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
                              )
                            )}
                          </div>
                          {!settings.lifeTimeAccess && showAccessDurationSuggestions && filteredAccessDurations.length > 0 && (
                            <ul className={`absolute z-10 w-full ${calculateDropdownPosition(accessDurationInputRef) === 'top'
                                ? 'bottom-full mb-1'
                                : 'top-full mt-1'
                              } max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg`}>
                              {filteredAccessDurations.map((duration, index) => (
                                <li
                                  key={index}
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    setSettings(prev => ({
                                      ...prev,
                                      accessDuration: duration
                                    }));
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
                            checked={settings.lifeTimeAccess}
                            onChange={(e) => {
                              const isLifetimeEnabled = e.target.checked;
                              setSettings(prev => ({
                                ...prev,
                                lifeTimeAccess: isLifetimeEnabled,
                                accessDuration: isLifetimeEnabled ? '' : prev.accessDuration
                              }));
                              handleSettingChange('lifeTimeAccess', isLifetimeEnabled);
                            }}
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
                          className={`w-[290px] h-[40px] px-3 py-1.5 border rounded text-sm ${
                            !settings.refundsAllowed ? 'bg-gray-100 cursor-not-allowed' : ''
                          }`}
                          value={settings.returnPeriod || ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            setSettings(prev => ({
                              ...prev,
                              returnPeriod: value
                            }));
                            handleSettingChange('returnPeriod', value);
                          }}
                          placeholder={!settings.refundsAllowed ? "Refunds not allowed" : "No. of days"}
                          disabled={!settings.refundsAllowed}
                        />
                      </div>
                      <div className="flex items-center space-x-3 self-end mb-1.5">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={settings.refundsAllowed || false}
                            onChange={(e) => {
                              const isRefundsAllowed = e.target.checked;
                              setSettings(prev => ({
                                ...prev,
                                refundsAllowed: isRefundsAllowed,
                                returnPeriod: isRefundsAllowed ? prev.returnPeriod : ''
                              }));
                              handleSettingChange('refundsAllowed', isRefundsAllowed);
                              if (!isRefundsAllowed) {
                                handleSettingChange('returnPeriod', '');
                              }
                            }}
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
                            checked={settings.allowContentDownloads}
                            onChange={(e) => {
                              setSettings(prev => ({
                                ...prev,
                                allowContentDownloads: e.target.checked
                              }));
                              handleSettingChange('allowContentDownloads', e.target.checked);
                            }}
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
                            checked={settings.allowDiscussionParticipation}
                            onChange={(e) => {
                              setSettings(prev => ({
                                ...prev,
                                allowDiscussionParticipation: e.target.checked
                              }));
                              handleSettingChange('allowDiscussionParticipation', e.target.checked);
                            }}
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
                            checked={settings.scheduleLiveClasses}
                            onChange={(e) => {
                              setSettings(prev => ({
                                ...prev,
                                scheduleLiveClasses: e.target.checked
                              }));
                              handleSettingChange('scheduleLiveClasses', e.target.checked);
                            }}
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
                            checked={settings.enableSubtitles}
                            onChange={(e) => {
                              setSettings(prev => ({
                                ...prev,
                                enableSubtitles: e.target.checked
                              }));
                              handleSettingChange('enableSubtitles', e.target.checked);
                            }}
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
                            onClick={() => {
                              setFilteredCourseTypes(courseTypes);
                              setShowCourseTypeSuggestions(true);
                            }}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              setSettings(prev => ({
                                ...prev,
                                courseType: newValue
                              }));
                              // Update both local state and parent state
                              handleSettingChange('courseType', newValue);
                              const filtered = courseTypes.filter(type =>
                                type.courseType.toLowerCase().includes(newValue.toLowerCase())
                              );
                              setFilteredCourseTypes(filtered);
                            }}
                            onBlur={handleCourseTypeBlur}
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
                                  setSettings(prev => ({ ...prev, courseType: '' })); // Update local state
                                  handleSettingChange('courseType', ''); // Update parent state
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
                                    setSettings(prev => ({ ...prev, courseType: type.courseType })); // Update local state
                                    handleSettingChange('courseType', type.courseType); // Update parent state
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
                <div className="space-y-8 overflow-y-auto pr-2 ml-[240px] overflow-x-hidden">
                  <div>
                    <h3 className="text-sm font-medium mb-4 text-gray-600" style={{ fontWeight: '700' }}>Enrollment Settings</h3>
                    <div className="flex items-center space-x-6">
                      <div>
                        <label className="block text-sm mb-2 text-gray-600">Maximum Students</label>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          className="w-[290px] h-[40px] px-3 py-1.5 border rounded text-sm"
                          value={settings.maxStudents === 0 ? '' : settings.maxStudents}
                          onChange={(e) => {
                            const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                            setSettings(prev => ({
                              ...prev,
                              maxStudents: value
                            }));
                            handleSettingChange('maxStudents', value);
                          }}
                          onFocus={(e) => {
                            if (settings.maxStudents === 0) {
                              setSettings(prev => ({
                                ...prev,
                                maxStudents: ''
                              }));
                              handleSettingChange('maxStudents', '');
                            }
                          }}
                          placeholder="Enter maximum number of students"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2 text-gray-600">Earn Certificate If you reach % *</label>
                        <input
                          type="number"
                          className={`w-[290px] px-3 py-1.5 border rounded text-sm h-9 ${!settings.certificateEligibility ? 'bg-[#e5e7eb] cursor-not-allowed' : ''
                            }`}
                          value={settings.percentageRequired || ''}
                          onChange={(e) => {
                            if (settings.certificateEligibility) {
                              setSettings(prev => ({
                                ...prev,
                                percentageRequired: e.target.value
                              }));
                              handleSettingChange('percentageRequired', e.target.value);
                            }
                          }}
                          disabled={!settings.certificateEligibility}
                          placeholder="Enter percentage required"
                        />
                      </div>
                      <div className="flex items-center space-x-3 w-[400px] mt-6">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 focus:ring-[#0056B3] focus:ring-offset-0 text-[#0056B3] checked:bg-[#0056B3] checked:hover:bg-[#0056B3] checked:focus:bg-[#0056B3] accent-[#0056B3]"
                            checked={settings.certificateEligibility}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              setSettings(prev => ({
                                ...prev,
                                certificateEligibility: isChecked,
                                percentageRequired: isChecked ? prev.percentageRequired : ''
                              }));
                              handleSettingChange('certificateEligibility', isChecked);
                              if (!isChecked) {
                                handleSettingChange('percentageRequired', '');
                              }
                            }}
                          />
                          <span className="text-sm text-gray-600 ml-2">Certificate Eligibility</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div>
                    <h3 className="text-sm font-medium mb-4 text-gray-600" style={{ fontWeight: '700' }}>Notifications</h3>
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center space-x-3 w-[300px]">
                        <span className="text-sm text-gray-600">Notify Students on Updates</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={settings.notifyStudentsOnUpdate}
                            onChange={(e) => {
                              setSettings(prev => ({
                                ...prev,
                                notifyStudentsOnUpdate: e.target.checked
                              }));
                              handleSettingChange('notifyStudentsOnUpdate', e.target.checked);
                            }}
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
                            checked={settings.notifyStudentsOnAssignment}
                            onChange={(e) => {
                              setSettings(prev => ({
                                ...prev,
                                notifyStudentsOnAssignment: e.target.checked
                              }));
                              handleSettingChange('notifyStudentsOnAssignment', e.target.checked);
                            }}
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
                                onChange={() => {
                                  const updatedSettings = {
                                    ...settings,
                                    pricingType: 'freemium',
                                    promotionType: 'No Promotion',
                                    price: 0,
                                    discount: 0,
                                    offeredPrice: 0
                                  };
                                  setSettings(updatedSettings);
                                  handleSettingChange('pricingType', 'freemium');
                                  handleSettingChange('promotionType', 'No Promotion');
                                  handleSettingChange('price', '0');
                                  handleSettingChange('discount', '0');
                                  handleSettingChange('offeredPrice', '0');
                                  setShowPromotionTypeSuggestions(false);
                                }}
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
                                onChange={() => {
                                  const updatedSettings = {
                                    ...settings,
                                    pricingType: 'premium',
                                    promotionType: 'No Promotion'
                                  };
                                  setSettings(updatedSettings);
                                  handleSettingChange('pricingType', 'premium');
                                  handleSettingChange('promotionType', 'No Promotion');
                                }}
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
                                className={`w-[290px] h-[40px] px-3 py-1.5 border rounded text-sm ${
                                  settings.pricingType === 'freemium' ? 'bg-gray-100 cursor-not-allowed' : ''
                                }`}
                                value={settings.promotionType}
                                onChange={(e) => {
                                  if (settings.pricingType !== 'freemium') {
                                    const value = e.target.value;
                                    setSettings(prev => ({
                                      ...prev,
                                      promotionType: value
                                    }));
                                    handleSettingChange('promotionType', value);
                                    const filtered = promotionTypeOptions.filter(type =>
                                      type.toLowerCase().includes(value.toLowerCase())
                                    );
                                    setFilteredPromotionTypes(filtered);
                                    setShowPromotionTypeSuggestions(true);
                                  }
                                }}
                                onFocus={() => {
                                  if (settings.pricingType !== 'freemium') {
                                    setFilteredPromotionTypes(promotionTypeOptions);
                                    setShowPromotionTypeSuggestions(true);
                                  }
                                }}
                                disabled={settings.pricingType === 'freemium'}
                                placeholder={settings.pricingType === 'freemium' ? 'Not Available for Freemium' : 'Select Promotion Type'}
                              />
                              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                                {settings.promotionType ? (
                                  <button
                                    type="button"
                                    className="hover:text-gray-600"
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      const updatedSettings = {
                                        ...settings,
                                        promotionType: ''
                                      };
                                      setSettings(updatedSettings);
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
                                <ul className={`absolute z-10 w-[290px] ${calculateDropdownPosition(promotionTypeInputRef) === 'top'
                                    ? 'bottom-full mb-1'
                                    : 'top-full mt-1'
                                  } max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg`}>
                                  {filteredPromotionTypes.map((type, index) => (
                                    <li
                                      key={index}
                                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        const updatedSettings = {
                                          ...settings,
                                          promotionType: type
                                        };
                                        setSettings(updatedSettings);
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
                          onChange={(e) => {
                            const newPrice = e.target.value;
                            const newOfferedPrice = calculateOfferedPrice(newPrice, settings.discount);
                            setSettings(prev => ({
                              ...prev,
                              price: newPrice,
                              offeredPrice: newOfferedPrice
                            }));
                            handleSettingChange('price', newPrice);
                            handleSettingChange('offeredPrice', newOfferedPrice);
                          }}
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
                        className={`w-[300px] px-3 py-1.5 border rounded text-sm h-9 bg-gray-100 ${commonStyles.input}`}
                        value={settings.offeredPrice || ''}
                        onChange={(e) => {
                          const newOfferedPrice = e.target.value;
                          const newDiscount = settings.discount;
                          const newPrice = calculateOfferedPrice(newOfferedPrice, newDiscount);
                          setSettings(prev => ({
                            ...prev,
                            price: newPrice,
                            offeredPrice: newOfferedPrice
                          }));
                          handleSettingChange('price', newPrice);
                          handleSettingChange('offeredPrice', newOfferedPrice);
                        }}
                        placeholder="Enter offered price"
                        readOnly
                        disabled
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
                      onChange={(e) => {
                        const newDiscount = e.target.value;
                        const newOfferedPrice = calculateOfferedPrice(settings.price, newDiscount);
                        setSettings(prev => ({
                          ...prev,
                          discount: newDiscount,
                          offeredPrice: newOfferedPrice
                        }));
                        handleSettingChange('discount', newDiscount);
                        handleSettingChange('offeredPrice', newOfferedPrice);
                      }}
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
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-gray-600">End date *</label>
                      <input
                        type="date"
                        className={`w-[300px] px-3 py-1.5 border rounded text-sm h-9 ${commonStyles.input}`}
                        value={settings.endDate || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSettings(prev => ({
                            ...prev,
                            endDate: value
                          }));
                          handleSettingChange('endDate', value);
                        }}
                        placeholder="DD-Mon-YYYY"
                        min={settings.startDate || new Date().toISOString().split('T')[0]}
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
                            onChange={(e) => {
                              const value = e.target.value;
                              setSettings(prev => ({
                                ...prev,
                                seoTitle: value
                              }));
                              handleSettingChange('seoTitle', value);
                            }}
                            placeholder="Enter SEO Title"
                          />
                        </div>

                        {/* SEO Description */}
                        <div className='p-2'>
                          <label className="block text-sm mb-2 text-gray-600">SEO Description *</label>
                          <input
                            type="text"
                            className={`w-5/5 px-3 py-1.5 border rounded text-sm h-9 ${commonStyles.input}`}
                            value={settings.seoDescription || ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              setSettings(prev => ({
                                ...prev,
                                seoDescription: value
                              }));
                              handleSettingChange('seoDescription', value);
                            }}
                            placeholder="Enter SEO Description"
                          />
                        </div>
                      </div>

                      {/* SEO Keywords */}
                      <div className='p-2'>
                      <div className='p-2'>
                          <label className="block text-sm mb-2 text-gray-600">SEO Keywords *</label>
                          <div className="relative">
                            <input
                              type="text"
                              className={`w-5/5 px-3 py-1.5 border rounded text-sm h-9 ${commonStyles.input}`}
                              value={settings.seoKeywords || ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                setSettings(prev => ({
                                  ...prev,
                                  seoKeywords: value
                                }));
                                handleSettingChange('seoKeywords', value);
                              }}
                              placeholder="Enter SEO Keywords"
                            />
                            {settings.seoKeywords && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {settings.seoKeywords.split(',').map((keyword, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"
                                  >
                                    {keyword.trim()}
                                    <button
                                      onClick={() => {
                                        const newKeywords = settings.seoKeywords
                                          .split(',')
                                          .filter((_, i) => i !== index)
                                          .join(',');
                                        handleSettingChange('seoKeywords', newKeywords);
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

                        {/* Hashtags */}
                        <div className='p-2'>
                          <label className="block text-sm mb-2 text-gray-600">Hashtags *</label>
                          <div className="relative">
                        
<input
  type="text"
  className={`w-5/5 px-3 py-1.5 border rounded text-sm h-9 ${commonStyles.input}`}
  value={settings.hashTags || ''}
  onChange={(e) => {
    const value = e.target.value;
    // Convert comma-separated string to array
    const hashTagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setSettings(prev => ({
      ...prev,
      hashTags: hashTagsArray
    }));
    handleSettingChange('hashTags', hashTagsArray);
  }}
  placeholder="Enter Hashtags (comma-separated)"
/>

{/* Display hashtags */}
{Array.isArray(settings.hashTags) && settings.hashTags.map((tag, index) => (
  <span
    key={index}
    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"
  >
    {tag}
    <button
      onClick={() => {
        const newTags = settings.hashTags.filter((_, i) => i !== index);
        setSettings(prev => ({
          ...prev,
          hashTags: newTags
        }));
        handleSettingChange('hashTags', newTags);
      }}
      className="text-gray-500 hover:text-gray-700"
    >   
      ×
    </button>
  </span>
))}
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