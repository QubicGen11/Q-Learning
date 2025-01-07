import React, { useState } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Spinner } from '@material-tailwind/react';

function Media() {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const [selectedFiles, setSelectedFiles] = useState({
    banner: null,
    course: null,
    category: null
  });
  const [uploading, setUploading] = useState({
    banner: false,
    course: false,
    category: false
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileSelect = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFiles(prev => ({
        ...prev,
        [type]: file
      }));
      handleFileUpload(file, type);
    }
  };

  const handleRemoveFile = (type) => {
    console.log('handleRemoveFile called with type:', type);
    setSelectedFiles(prev => {
      console.log('Previous selected files:', prev);
      const updated = {
        ...prev,
        [type]: null
      };
      console.log('Updated selected files:', updated);
      return updated;
    });
  };

  const handleRemoveMedia = (type) => {
    console.log('handleRemoveMedia called with type:', type);
    const updatedMedia = { ...courseData.media };
    console.log('Previous media:', updatedMedia);
    
    switch(type) {
      case 'banner':
        updatedMedia.courseBanner = null;
        break;
      case 'course':
        updatedMedia.courseImage = null;
        break;
      case 'category':
        updatedMedia.categoryImage = null;
        break;
    }
    
    console.log('Updated media:', updatedMedia);
    updateCourseData('media', updatedMedia);
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
          ...courseData.media,
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

  const handlePreviewClick = (file, type) => {
    if (type === 'banner') {
      setPreviewFile(courseData.media.courseBanner);
    } else {
      setPreviewFile(URL.createObjectURL(file));
    }
    setPreviewOpen(true);
  };

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="space-y-6">
        {/* Course Banner Video */}
        <div>
          <label className="block text-sm font-medium mb-2">Upload a banner Video & Image *</label>
          <div className="relative w-full border-2 border-dashed border-gray-300 rounded-lg p-6">
            {/* Browse button in top right corner */}
            <div className="absolute top-3 right-3">
              <label 
                htmlFor="banner-upload" 
                className="px-4 py-1.5 bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-600 flex items-center gap-1"
              >
                Browse
                <span className="material-icons text-sm">upload</span>
              </label>
            </div>

            <div className="text-center">
              <input
                type="file"
                id="banner-upload"
                className="hidden"
                onChange={(e) => handleFileSelect(e, 'banner')}
                accept="video/*"
              />
              <label htmlFor="banner-upload" className="cursor-pointer w-full">
                <div className="flex flex-col items-center justify-center">
                  {uploading.banner ? (
                    <div className="flex flex-col items-center gap-2">
                      <Spinner className="h-12 w-12" />
                      <p className="text-sm text-gray-500">Uploading...</p>
                    </div>
                  ) : (
                    <>
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-1 text-sm text-gray-500">
                        Drag and Drop Or Browse<br />
                        MP4, MKW, up to 20MB
                      </p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>
          
          {/* File names display */}
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedFiles.banner && (
              <div 
                className="flex items-center gap-1 text-sm text-[#4B5563] bg-[#F2F9FF] p-2 rounded-md cursor-pointer"
                onClick={() => handlePreviewClick(selectedFiles.banner, 'banner')}
              >
                <span>{selectedFiles.banner.name}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile('banner');
                  }}
                  className="text-gray-500 hover:text-gray-700 ml-2"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Course Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Course Image *</label>
          <div className="relative w-full border-2 border-dashed border-gray-300 rounded-lg p-6">
            {/* Browse button in top right corner */}
            <div className="absolute top-3 right-3">
              <label 
                htmlFor="course-upload" 
                className="px-4 py-1.5 bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-600 flex items-center gap-1"
              >
                Browse
                <span className="material-icons text-sm">upload</span>
              </label>
            </div>

            <div className="text-center">
              <input
                type="file"
                id="course-upload"
                className="hidden"
                onChange={(e) => handleFileSelect(e, 'course')}
                accept="image/*"
              />
              <label htmlFor="course-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  {uploading.course ? (
                    <div className="flex flex-col items-center gap-2">
                      <Spinner className="h-12 w-12" />
                      <p className="text-sm text-gray-500">Uploading image...</p>
                    </div>
                  ) : (
                    <>
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-1 text-sm text-gray-500">
                        Drag and Drop Or Browse<br />
                        PNG, JPG up to 20MB
                      </p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>
          
          {/* File names display */}
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedFiles.course && (
              <div 
                className="flex items-center gap-1 text-sm text-[#4B5563] bg-[#F2F9FF] p-2 rounded-md cursor-pointer"
                onClick={() => handlePreviewClick(selectedFiles.course, 'course')}
              >
                <span>{selectedFiles.course.name}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile('course');
                  }}
                  className="text-gray-500 hover:text-gray-700 ml-2"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Category Image *</label>
          <div className="relative w-full border-2 border-dashed border-gray-300 rounded-lg p-6">
            {/* Browse button in top right corner */}
            <div className="absolute top-3 right-3">
              <label 
                htmlFor="category-upload" 
                className="px-4 py-1.5 bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-600 flex items-center gap-1"
              >
                Browse
                <span className="material-icons text-sm">upload</span>
              </label>
            </div>

            <div className="text-center">
              <input
                type="file"
                id="category-upload"
                className="hidden"
                onChange={(e) => handleFileSelect(e, 'category')}
                accept="image/*"
              />
              <label htmlFor="category-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  {uploading.category ? (
                    <div className="flex flex-col items-center gap-2">
                      <Spinner className="h-12 w-12" />
                      <p className="text-sm text-gray-500">Uploading image...</p>
                    </div>
                  ) : (
                    <>
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-1 text-sm text-gray-500">
                        Drag and Drop Or Browse<br />
                        PNG, JPG up to 20MB
                      </p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>
          
          {/* File names display */}
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedFiles.category && (
              <div 
                className="flex items-center gap-1 text-sm text-[#4B5563] bg-[#F2F9FF] p-2 rounded-md cursor-pointer"
                onClick={() => handlePreviewClick(selectedFiles.category, 'category')}
              >
                <span>{selectedFiles.category.name}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile('category');
                  }}
                  className="text-gray-500 hover:text-gray-700 ml-2"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preview Modal - Updated to handle both images and videos */}
        {previewOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
              <div className="flex justify-start border-b border-[#E5E7EB] w-[100%]">
                <p className='text-lg font-semibold text-[#6B7280] p-1'>Preview</p>

                
              
              </div>
              {previewFile && (
                previewFile.includes('video') || previewFile.includes('.mp4') ? (
                  <video 
                    src={previewFile} 
                    controls 
                    className="max-w-full mt-2"
                    autoPlay
                  />
                ) : (
                  <img src={previewFile} alt="Preview" className="max-w-full" />
                )
              )}
            
            <div className='flex justify-between border-t mt-2 border-[#E5E7EB]'>
              {/* <hr /> */}

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  
                  // Improved type detection
                  let type;
                  console.log('Current preview file:', previewFile);
                  console.log('Course Image in courseData:', courseData.media.courseImage);
                  console.log('Selected Files:', selectedFiles);

                  // Check if the preview is a blob URL
                  if (previewFile.startsWith('blob:')) {
                    // Determine type based on selected files
                    if (selectedFiles.course) {
                      type = 'course';
                    } else if (selectedFiles.banner) {
                      type = 'banner';
                    } else if (selectedFiles.category) {
                      type = 'category';
                    }
                  } else {
                    // For URLs from courseData
                    if (previewFile === courseData.media.courseImage) {
                      type = 'course';
                    } else if (previewFile === courseData.media.courseBanner) {
                      type = 'banner';
                    } else {
                      type = 'category';
                    }
                  }

                  console.log('Detected type:', type);

                  // Clear both the file and media states
                  handleRemoveFile(type);
                  handleRemoveMedia(type);
                  
                  if (type === 'course') {
                    console.log('Removing course image specifically');
                    const courseFileInput = document.getElementById('course-upload');
                    if (courseFileInput) {
                      courseFileInput.value = '';
                    }
                    
                    setSelectedFiles(prev => {
                      const updated = {
                        ...prev,
                        course: null
                      };
                      console.log('Updated selected files for course:', updated);
                      return updated;
                    });
                    
                    updateCourseData('media', {
                      ...courseData.media,
                      courseImage: null
                    });
                  }

                  setPreviewOpen(false);
                  setPreviewFile(null);
                }}
                className="bg-white px-4 h-8 rounded-md text-[#0056B3] hover:text-gray-700 mt-3 border border-[#0056B3]"
              >
                Remove
              </button>


            <button 
                  onClick={() => {
                    setPreviewOpen(false);
                    setPreviewFile(null);
                  }}
                  className=" bg-[#0056b3] px-4 h-8  rounded-md text-white hover:text-gray-700 mt-3"
                >
                  Keep
              </button>


            </div>
         



            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default Media; 