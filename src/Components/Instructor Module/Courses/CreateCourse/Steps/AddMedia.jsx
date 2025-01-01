import React, { useState } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import { toast } from 'react-hot-toast';

const AddMedia = () => {
  const { updateCourseData, setStep, currentStep } = useCourseCreationStore();

  // Single state for media data
  const [mediaData, setMediaData] = useState({
    courseBanner: '',
    courseImage: '',
    categoryImage: ''
  });

  // Just for display
  const [uploadedFiles, setUploadedFiles] = useState({
    courseBanner: '',
    courseImage: '',
    categoryImage: ''
  });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = () => {
        // 1. Update local state
        setMediaData(prev => ({
          ...prev,
          [type]: reader.result
        }));

        // 2. Update file name for display
        setUploadedFiles(prev => ({
          ...prev,
          [type]: file.name
        }));

        // 3. Update store immediately
        updateCourseData('media', {
          [type]: reader.result
        });

        toast.success(`${file.name} uploaded successfully`);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    // Validate
    if (!mediaData.courseBanner || !mediaData.courseImage || !mediaData.categoryImage) {
      toast.error('Please upload all required images');
      return;
    }

    // Double check store update
    updateCourseData('media', mediaData);
    console.log('Final media data:', mediaData);

    setStep(currentStep + 1);
  };

  return (
    <div className="max-w-[700px] mx-auto space-y-8">
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
            {uploadedFiles.courseBanner ? (
              <div className="relative">
                <span className="material-icons text-green-500 text-3xl mb-2">
                  check_circle
                </span>
                <p className="text-sm text-gray-600">
                  {uploadedFiles.courseBanner}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Uploaded Successfully
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
            {uploadedFiles.courseImage ? (
              <div className="relative">
                <span className="material-icons text-green-500 text-3xl mb-2">
                  check_circle
                </span>
                <p className="text-sm text-gray-600">
                  {uploadedFiles.courseImage}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Uploaded Successfully
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
            {uploadedFiles.categoryImage ? (
              <div className="relative">
                <span className="material-icons text-green-500 text-3xl mb-2">
                  check_circle
                </span>
                <p className="text-sm text-gray-600">
                  {uploadedFiles.categoryImage}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Uploaded Successfully
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

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(currentStep - 1)}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddMedia; 