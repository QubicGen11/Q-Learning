import React, { useState } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';

const AddMedia = () => {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const { media } = courseData;

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Create URL for preview if needed
      const previewUrl = URL.createObjectURL(file);
      
      updateCourseData('media', {
        ...media,
        [type]: {
          file,
          preview: previewUrl,
          name: file.name
        }
      });
    }
  };

  return (
    <div className="max-w-[700px] mx-auto space-y-4">
      {/* Banner Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Banner Image *
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'courseBanner')}
            className="hidden"
            id="banner-upload"
          />
          <label htmlFor="banner-upload" className="cursor-pointer">
            {media.courseBanner?.preview ? (
              <div className="relative">
                <img 
                  src={media.courseBanner.preview} 
                  alt="Banner preview" 
                  className="max-h-40 mx-auto"
                />
                <p className="text-sm text-gray-600 mt-2">
                  {media.courseBanner.name}
                </p>
              </div>
            ) : (
              <>
                <span className="material-icons text-gray-400 text-3xl mb-2">
                  cloud_upload
                </span>
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 10MB
                </p>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Course Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Course Image *
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'courseImage')}
            className="hidden"
            id="course-image-upload"
          />
          <label htmlFor="course-image-upload" className="cursor-pointer">
            {media.courseImage?.preview ? (
              <div className="relative">
                <img 
                  src={media.courseImage.preview} 
                  alt="Course image preview" 
                  className="max-h-40 mx-auto"
                />
                <p className="text-sm text-gray-600 mt-2">
                  {media.courseImage.name}
                </p>
              </div>
            ) : (
              <>
                <span className="material-icons text-gray-400 text-3xl mb-2">
                  image
                </span>
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 5MB
                </p>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Category Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Category Image *
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'categoryImage')}
            className="hidden"
            id="category-image-upload"
          />
          <label htmlFor="category-image-upload" className="cursor-pointer">
            {media.categoryImage?.preview ? (
              <div className="relative">
                <img 
                  src={media.categoryImage.preview} 
                  alt="Category image preview" 
                  className="max-h-40 mx-auto"
                />
                <p className="text-sm text-gray-600 mt-2">
                  {media.categoryImage.name}
                </p>
              </div>
            ) : (
              <>
                <span className="material-icons text-gray-400 text-3xl mb-2">
                  category
                </span>
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 5MB
                </p>
              </>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddMedia; 