import React, { useState } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Media() {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const [uploading, setUploading] = useState({
    banner: false,
    course: false,
    category: false
  });

  const handleRemoveMedia = (type) => {
    updateCourseData('media', {
      ...courseData.media,
      [`${type === 'banner' ? 'courseBanner' : type === 'course' ? 'courseImage' : 'categoryImage'}`]: null
    });
  };

  const handleFileUpload = async (file, type) => {
    if (!file) return;

    // Check file type for banner (video only)
    if (type === 'banner' && !file.type.startsWith('video/')) {
      toast.error('Please upload a video file for the banner');
      return;
    }

    // Check file type for images
    if ((type === 'course' || type === 'category') && !file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setUploading(prev => ({ ...prev, [type]: true }));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('https://image.qubinest.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data.url) {
        updateCourseData('media', {
          [`${type === 'banner' ? 'courseBanner' : type === 'course' ? 'courseImage' : 'categoryImage'}`]: 
            response.data.url
        });
        toast.success(`${type} uploaded successfully`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`Failed to upload ${type}`);
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="space-y-6">
        {/* Course Banner Video */}
        <div>
          <label className="block text-sm font-medium mb-2">Course Banner Video *</label>
          <div className="flex items-center space-x-4">
            <div className="w-full">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileUpload(e.target.files[0], 'banner')}
                className="hidden"
                id="banner-upload"
              />
              <label
                htmlFor="banner-upload"
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
              >
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">
                    Drag and Drop Or Browse<br />
                    MP4, MKW, PNG, JPG up to 20MB
                  </p>
                  <div className="mt-4">
                    <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      {uploading.banner ? 'Uploading...' : 'Upload Video'}
                    </span>
                  </div>
                </div>
              </label>
            </div>
            {courseData.media.courseBanner && (
              <div className="relative">
                <video 
                  className="w-40 h-24 object-cover rounded"
                  src={courseData.media.courseBanner}
                  controls
                />
                <button
                  onClick={() => handleRemoveMedia('banner')}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Course Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Course Image *</label>
          <div className="flex items-center space-x-4">
            <div className="w-full">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0], 'course')}
                className="hidden"
                id="course-upload"
              />
              <label
                htmlFor="course-upload"
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
              >
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">
                    Drag and Drop Or Browse<br />
                    MP4, MKW, PNG, JPG up to 20MB
                  </p>
                  <div className="mt-4">
                    <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      {uploading.course ? 'Uploading...' : 'Upload Image'}
                    </span>
                  </div>
                </div>
              </label>
            </div>
            {courseData.media.courseImage && (
              <div className="relative">
                <img 
                  className="w-40 h-24 object-cover rounded"
                  src={courseData.media.courseImage}
                  alt="Course"
                />
                <button
                  onClick={() => handleRemoveMedia('course')}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Category Image *</label>
          <div className="flex items-center space-x-4">
            <div className="w-full">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0], 'category')}
                className="hidden"
                id="category-upload"
              />
              <label
                htmlFor="category-upload"
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
              >
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">
                    Drag and Drop Or Browse<br />
                    MP4, MKW, PNG, JPG up to 20MB
                  </p>
                  <div className="mt-4">
                    <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      {uploading.category ? 'Uploading...' : 'Upload Image'}
                    </span>
                  </div>
                </div>
              </label>
            </div>
            {courseData.media.categoryImage && (
              <div className="relative">
                <img 
                  className="w-40 h-24 object-cover rounded"
                  src={courseData.media.categoryImage}
                  alt="Category"
                />
                <button
                  onClick={() => handleRemoveMedia('category')}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Media; 