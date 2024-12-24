import React from 'react';
import useCourseStepsStore from '../../../../../stores/courseStepsStore';

const AddMedia = () => {
  const { courseData, updateCourseData } = useCourseStepsStore();
  const { media } = courseData;

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    updateCourseData('media', {
      [type]: file
    });
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
            onChange={(e) => handleFileChange(e, 'banner')}
            className="hidden"
            id="banner-upload"
          />
          <label htmlFor="banner-upload" className="cursor-pointer">
            <span className="material-icons text-gray-400 text-3xl mb-2">
              cloud_upload
            </span>
            <p className="text-sm text-gray-600">
              {media.banner ? media.banner.name : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG up to 10MB
            </p>
          </label>
        </div>
      </div>

      {/* Video Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Video *
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e, 'video')}
            className="hidden"
            id="video-upload"
          />
          <label htmlFor="video-upload" className="cursor-pointer">
            <span className="material-icons text-gray-400 text-3xl mb-2">
              videocam
            </span>
            <p className="text-sm text-gray-600">
              {media.video ? media.video.name : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              MP4, WebM up to 1GB
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddMedia; 