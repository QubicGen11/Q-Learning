import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Course Settings');
  const [settings, setSettings] = useState({
    courseVisibility: {
      public: false,
      enablePreview: false
    },
    courseAccess: {
      duration: '',
      lifetimeAccess: false
    },
    refundPolicy: {
      returnPeriod: '',
      refundsAllowed: false
    },
    coursePermissions: {
      allowContentDownloads: false,
      allowDiscussionParticipation: false
    },
    liveClasses: {
      scheduleLiveClasses: false,
      enableSubtitles: false
    },
    enrollment: {
      maxStudents: '',
      certificateEligibility: false,
      notifications: {
        notifyUpdates: false,
        notifyAssignments: false
      }
    },
    pricing: {
      price: '',
      discount: '',
      startDate: '',
      endDate: ''
    },
    advanced: {
      seoTitle: '',
      seoDescription: '',
      seoKeywords: ''
    }
  });

  const tabs = [
    'Course Settings',
    'Enrolment Settings',
    'Pricing',
    'Advanced Settings'
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'Course Settings':
        return (
          <>
            {/* Course Visibility */}
            <div>
              <h3 className="text-base font-medium mb-4">Course Visibility</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.courseVisibility.public}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        courseVisibility: {
                          ...prev.courseVisibility,
                          public: e.target.checked
                        }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm">Public</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.courseVisibility.enablePreview}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        courseVisibility: {
                          ...prev.courseVisibility,
                          enablePreview: e.target.checked
                        }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm">Enable Preview</span>
                </div>
              </div>
            </div>

            {/* Course Access */}
            <div>
              <h3 className="text-base font-medium mb-4">Course Access</h3>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <label className="block text-sm mb-2">Access Duration *</label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    value={settings.courseAccess.duration}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      courseAccess: {
                        ...prev.courseAccess,
                        duration: e.target.value
                      }
                    }))}
                  >
                    <option value="">Select Months</option>
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.courseAccess.lifetimeAccess}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        courseAccess: {
                          ...prev.courseAccess,
                          lifetimeAccess: e.target.checked
                        }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm">Lifetime Access</span>
                </div>
              </div>
            </div>

            {/* Refund Policy */}
            <div>
              <h3 className="text-base font-medium mb-4">Refund Policy</h3>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <label className="block text-sm mb-2">Return Period *</label>
                  <input
                    type="text"
                    placeholder="No. of days"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    value={settings.refundPolicy.returnPeriod}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      refundPolicy: {
                        ...prev.refundPolicy,
                        returnPeriod: e.target.value
                      }
                    }))}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.refundPolicy.refundsAllowed}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        refundPolicy: {
                          ...prev.refundPolicy,
                          refundsAllowed: e.target.checked
                        }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm">Refunds Allowed</span>
                </div>
              </div>
            </div>

            {/* Course Permissions */}
            <div>
              <h3 className="text-base font-medium mb-4">Course Permissions</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.coursePermissions.allowContentDownloads}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        coursePermissions: {
                          ...prev.coursePermissions,
                          allowContentDownloads: e.target.checked
                        }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm">Allow Content Downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.coursePermissions.allowDiscussionParticipation}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        coursePermissions: {
                          ...prev.coursePermissions,
                          allowDiscussionParticipation: e.target.checked
                        }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm">Allow Discussion Participation</span>
                </div>
              </div>
            </div>

            {/* Live Classes Integration */}
            <div>
              <h3 className="text-base font-medium mb-4">Live Classes Integration</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.liveClasses.scheduleLiveClasses}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        liveClasses: {
                          ...prev.liveClasses,
                          scheduleLiveClasses: e.target.checked
                        }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm">Schedule Live Classes</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.liveClasses.enableSubtitles}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      liveClasses: {
                        ...prev.liveClasses,
                        enableSubtitles: e.target.checked
                      }
                    }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-sm">Enable Subtitles</span>
                </div>
              </div>
            </div>
          </>
        );

      case 'Enrolment Settings':
        return (
          <>
            {/* Enrollment Settings */}
            <div>
              <h3 className="text-base font-medium mb-4">Enrolment Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Max Students *</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="--"
                    value={settings.enrollment.maxStudents}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      enrollment: {
                        ...prev.enrollment,
                        maxStudents: e.target.value
                      }
                    }))}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.enrollment.certificateEligibility}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      enrollment: {
                        ...prev.enrollment,
                        certificateEligibility: e.target.checked
                      }
                    }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-sm">Certificate Eligibility</span>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="mt-8">
              <h3 className="text-base font-medium mb-4">Notifications</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enrollment.notifications.notifyUpdates}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        enrollment: {
                          ...prev.enrollment,
                          notifications: {
                            ...prev.enrollment.notifications,
                            notifyUpdates: e.target.checked
                          }
                        }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm">Notify Students on Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enrollment.notifications.notifyAssignments}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        enrollment: {
                          ...prev.enrollment,
                          notifications: {
                            ...prev.enrollment.notifications,
                            notifyAssignments: e.target.checked
                          }
                        }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm">Notify Students on Assignments</span>
                </div>
              </div>
            </div>
          </>
        );

      case 'Pricing':
        return (
          <>
            <div>
              <h3 className="text-base font-medium mb-4">Pricing</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">Price *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="text"
                      className="w-full pl-6 pr-3 py-2 border rounded-lg text-sm"
                      placeholder="0.00"
                      value={settings.pricing.price}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        pricing: {
                          ...prev.pricing,
                          price: e.target.value
                        }
                      }))}
                    />
                    <button className="absolute right-2 top-2.5">
                      <span className="material-icons text-gray-400 text-lg">expand_more</span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">Discount *</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pl-3 pr-6 py-2 border rounded-lg text-sm"
                      placeholder="0"
                      value={settings.pricing.discount}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        pricing: {
                          ...prev.pricing,
                          discount: e.target.value
                        }
                      }))}
                    />
                    <span className="absolute right-3 top-2.5 text-gray-500">%</span>
                    <button className="absolute right-2 top-2.5">
                      <span className="material-icons text-gray-400 text-lg">expand_more</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">Start date *</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="DD-Mon-YYYY"
                      value={settings.pricing.startDate}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        pricing: {
                          ...prev.pricing,
                          startDate: e.target.value
                        }
                      }))}
                    />
                    <button className="absolute right-2 top-2.5">
                      <span className="material-icons text-gray-400 text-lg">calendar_today</span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">End date *</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="DD-Mon-YYYY"
                      value={settings.pricing.endDate}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        pricing: {
                          ...prev.pricing,
                          endDate: e.target.value
                        }
                      }))}
                    />
                    <button className="absolute right-2 top-2.5">
                      <span className="material-icons text-gray-400 text-lg">calendar_today</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 'Advanced Settings':
        return (
          <>
            <div>
              <h3 className="text-base font-medium mb-4">Advanced Settings</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-2">SEO Title *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="Placeholder Text"
                      value={settings.advanced.seoTitle}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        advanced: {
                          ...prev.advanced,
                          seoTitle: e.target.value
                        }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">SEO Description *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="Placeholder Text"
                      value={settings.advanced.seoDescription}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        advanced: {
                          ...prev.advanced,
                          seoDescription: e.target.value
                        }
                      }))}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm mb-2">SEO Keywords *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="Placeholder Text"
                    value={settings.advanced.seoKeywords}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      advanced: {
                        ...prev.advanced,
                        seoKeywords: e.target.value
                      }
                    }))}
                  />
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 py-2 text-sm">
            <span 
              onClick={() => navigate('/instructor/courses')}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Courses
            </span>
            <span className="text-gray-400">/</span>
            <span>
            Add Course</span>
            {/* <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">Published</span> */}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-6">
        <div className="border-b border-gray-200 mb-4 flex justify-between items-center bg-white p-2 rounded-lg">
          <div className="flex gap-6">
            <button 
              onClick={() => navigate('/instructor/courses/basic-info')}
              className="py-2 px-1 text-gray-500"
            >
              Basic Information
            </button>
            <button 
              onClick={() => navigate('/instructor/courses/content')}
              className="py-2 px-1 text-gray-500"
            >
              Course Content
            </button>
            <button 
              className="py-2 px-1 text-blue-600 border-b-2 border-blue-600 font-medium"
            >
              Settings
            </button>
          </div>
          <div className="flex justify-between space-x-6">
            <button
              onClick={() => navigate('/instructor/courses/faq')}
              className="flex items-center gap-2 text-[#0056B3] hover:text-blue-700 bg-[#F3F4F6] px-3 py-1.5 rounded-lg"
            >
              <span className="material-icons">arrow_back</span>
              Previous
            </button>
            <button
              onClick={() => navigate('/instructor/courses/settings')}
              className="flex items-center gap-2 text-[#0056B3] hover:text-blue-700 bg-[#F3F4F6] px-3 py-1.5 rounded-lg"
            >
              Save as Draft
              <span className="material-icons text-sm">arrow_drop_down</span>
            </button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg">
              Submit for review
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-xl mb-6">Settings</h1>
        
        <div className="flex gap-6">
          <div className="w-64">
            <div className="bg-gray-50">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-3 text-sm ${
                    activeTab === tab 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg p-6 space-y-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseSettings; 