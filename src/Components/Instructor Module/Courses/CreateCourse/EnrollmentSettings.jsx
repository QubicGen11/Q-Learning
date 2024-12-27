import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EnrollmentSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    maxStudents: '',
    certificateEligibility: false,
    notifications: {
      notifyUpdates: false,
      notifyAssignments: false
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 py-2 text-sm">
            <span className="text-blue-600 cursor-pointer">Courses</span>
            <span className="text-gray-400">/</span>
            <span>Real World UX | Learn User Experience & Start Your Career</span>
            <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">Published</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-8">
            <button className="text-gray-500">Basic Information</button>
            <button className="text-gray-500">Course Content</button>
            <button className="text-blue-600 border-b-2 border-blue-600 pb-4">Settings</button>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm border rounded-lg flex items-center gap-2">
              <span>Save as Draft</span>
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
          {/* Left Sidebar */}
          <div className="w-64">
            <div className="bg-gray-50">
              <button className="w-full text-left px-4 py-3 text-sm">Course Settings</button>
              <button className="w-full text-left px-4 py-3 text-sm bg-blue-50 text-blue-600 border-l-4 border-blue-600">
                Enrolment Settings
              </button>
              <button className="w-full text-left px-4 py-3 text-sm">Pricing</button>
              <button className="w-full text-left px-4 py-3 text-sm">Advanced Settings</button>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 bg-white rounded-lg p-6 space-y-8">
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
                    value={settings.maxStudents}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      maxStudents: e.target.value
                    }))}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.certificateEligibility}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      certificateEligibility: e.target.checked
                    }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-sm">Certificate Eligibility</span>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h3 className="text-base font-medium mb-4">Notifications</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.notifyUpdates}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          notifyUpdates: e.target.checked
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
                      checked={settings.notifications.notifyAssignments}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          notifyAssignments: e.target.checked
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentSettings; 