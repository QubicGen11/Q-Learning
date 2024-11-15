import React, { useState } from 'react';
import { FaBold, FaItalic } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { ProfileMenu } from '../Navbar_sub/Navbar_sub/ProfileMenu';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    headline: '',
    biography: '',
    website: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    language: '',
    profileImage: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className=" min-h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center ml-64">Profile Settings</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                <ProfileMenu />
             

            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex px-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-4 text-sm font-medium border-b-2 -mb-px ${
                    activeTab === 'profile'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Udemy Profile
                </button>
                <button
                  onClick={() => setActiveTab('picture')}
                  className={`px-4 py-4 text-sm font-medium border-b-2 -mb-px ${
                    activeTab === 'picture'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Profile Picture
                </button>
               
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Keep your existing tab content here */}
              {activeTab === 'profile' && (
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    {/* Headline */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Headline</label>
                      <input
                        type="text"
                        name="headline"
                        value={formData.headline}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        maxLength={60}
                      />
                      <span className="text-sm text-gray-500">60 characters remaining</span>
                    </div>

                    {/* Biography */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Biography</label>
                      <div className="border rounded-md">
                        <div className="border-b p-2">
                          <button type="button" className="p-1 hover:bg-gray-100 rounded">
                            <FaBold />
                          </button>
                          <button type="button" className="p-1 hover:bg-gray-100 rounded ml-2">
                            <FaItalic />
                          </button>
                        </div>
                        <textarea
                          name="biography"
                          value={formData.biography}
                          onChange={handleInputChange}
                          className="w-full p-2 min-h-[150px]"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        To help learners learn more about you, your bio should reflect your Credibility, Empathy, Passion, and Personality.
                        Your biography should have at least 50 words, links and coupon codes are not permitted.
                      </p>
                    </div>

                    {/* Social Links */}
                    <div className="md:col-span-2 space-y-4">
                      <h3 className="font-medium">Social Links</h3>
                      
                      {/* Website */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Website</label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="Url"
                          className="w-full p-2 border rounded-md"
                        />
                      </div>

                      {/* Twitter */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Twitter</label>
                        <div className="flex">
                          <span className="bg-gray-50 border rounded-l-md p-2 text-gray-500 w-[190px]">
                            http://www.twitter.com/
                          </span>
                          <input
                            type="text"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className="flex-1 p-2 border-t border-b border-r rounded-r-md"
                          />
                        </div>
                      </div>

                      {/* Facebook */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Facebook</label>
                        <div className="flex">
                          <span className="bg-gray-50 border rounded-l-md p-2 text-gray-500 w-[190px]">
                            http://www.facebook.com/
                          </span>
                          <input
                            type="text"
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className="flex-1 p-2 border-t border-b border-r rounded-r-md"
                          />
                        </div>
                      </div>

                      {/* LinkedIn */}
                      <div>
                        <label className="block text-sm font-medium mb-2">LinkedIn</label>
                        <div className="flex">
                          <span className="bg-gray-50 border rounded-l-md p-2 text-gray-500 w-[190px]">
                            http://www.linkedin.com/
                          </span>
                          <input
                            type="text"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            placeholder="Resource ID"
                            className="flex-1 p-2 border-t border-b border-r rounded-r-md"
                          />
                        </div>
                      </div>

                      {/* YouTube */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Youtube</label>
                        <div className="flex">
                          <span className="bg-gray-50 border rounded-l-md p-2 text-gray-500 w-[190px]">
                            http://www.youtube.com/
                          </span>
                          <input
                            type="text"
                            name="youtube"
                            value={formData.youtube}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className="flex-1 p-2 border-t border-b border-r rounded-r-md"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Language Selection */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Language</label>
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select language</option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        {/* Add more language options */}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                  >
                    Save
                  </button>
                </form>
              )}

              {activeTab === 'picture' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm text-gray-600 mb-2">Image preview</h3>
                    <p className="text-xs text-gray-500">Minimum 200x200 pixels, Maximum 6000x6000 pixels</p>
                    
                    <div className="mt-4 border rounded-md p-4">
                      <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                        {formData.profileImage ? (
                          <img
                            src={URL.createObjectURL(formData.profileImage)}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <svg className="w-16 h-16 text-gray-400" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between border rounded-md">
                      <span className="p-2 text-gray-500">No file selected</span>
                      <label className="cursor-pointer bg-white px-4 py-2 border-l">
                        Upload image
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;