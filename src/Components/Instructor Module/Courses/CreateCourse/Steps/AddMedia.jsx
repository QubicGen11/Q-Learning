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
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileUpload(e.target.files[0], 'banner')}
              className="hidden"
              id="banner-upload"
            />
            <label
              htmlFor="banner-upload"
              className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
            >
              {uploading.banner ? 'Uploading...' : 'Upload Video'}
            </label>
            {courseData.media.courseBanner && (
              <video 
                className="w-40 h-24 object-cover rounded"
                src={courseData.media.courseBanner}
                controls
              />
            )}
          </div>
        </div>

        {/* Course Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Course Image *</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0], 'course')}
              className="hidden"
              id="course-upload"
            />
            <label
              htmlFor="course-upload"
              className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
            >
              {uploading.course ? 'Uploading...' : 'Upload Image'}
            </label>
            {courseData.media.courseImage && (
              <img 
                className="w-40 h-24 object-cover rounded"
                src={courseData.media.courseImage}
                alt="Course"
              />
            )}
          </div>
        </div>

        {/* Category Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Category Image *</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0], 'category')}
              className="hidden"
              id="category-upload"
            />
            <label
              htmlFor="category-upload"
              className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
            >
              {uploading.category ? 'Uploading...' : 'Upload Image'}
            </label>
            {courseData.media.categoryImage && (
              <img 
                className="w-40 h-24 object-cover rounded"
                src={courseData.media.categoryImage}
                alt="Category"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Media; 