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
    }
  });

  const tabs = [
    'Course Settings',
    'Enrolment Settings',
    'Pricing',
    'Advanced Settings'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-medium mb-6">Settings</h1>

      <div className="flex gap-6">
        {/* Left Sidebar */}
        <div className="w-64">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 text-sm ${
                activeTab === tab 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'bg-gray-50 text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-white rounded-lg p-6 space-y-8">
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
        </div>
      </div>
    </div>
  );
}

export default CourseSettings; 