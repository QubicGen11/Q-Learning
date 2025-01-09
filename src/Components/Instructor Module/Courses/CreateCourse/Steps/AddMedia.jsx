import React, { useState, useRef } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Spinner } from '@material-tailwind/react';
import { MdOutlineFileUpload } from "react-icons/md";
 
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
 
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
 
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setShowControls(false);
      }
      setIsPlaying(!isPlaying);
    }
  };
 
  return (
    <div className="max-w-[800px] mx-auto p-4 mt-5">
      <div className="space-y-6">
        {/* Course Banner Video */}
        <div>

          <label className="block text-sm font-medium mb-2">Upload a banner Video & Image *</label>

          <div className="relative w-full border-2 border-dashed border-gray-300 rounded-lg p-6">

            {/* Browse button in top right corner */}

            <div className="absolute top-3 right-3">
              <div className="relative group">
                <label
                  htmlFor={selectedFiles.banner ? undefined : "banner-upload"}
                  className={`px-4 py-1.5 ${
                    selectedFiles.banner 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-gray-500 hover:bg-gray-600 cursor-pointer'
                  } text-white rounded flex items-center gap-1`}
                >
                  Browse
                  <span className="text-xl"><MdOutlineFileUpload /></span>
                </label>
                
                {/* Tooltip */}
                {selectedFiles.banner && (
                  <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 right-0 top-full mt-1 whitespace-nowrap">
                    Remove current file to upload new one
                  </div>
                )}
              </div>
            </div>



            <div className="text-center">

              <input

                type="file"

                id="banner-upload"

                className="hidden"

                onChange={(e) => handleFileSelect(e, 'banner')}

                accept="video/*"

                disabled={selectedFiles.banner}

              />

              <label 

                htmlFor={selectedFiles.banner ? undefined : "banner-upload"}

                className={`cursor-${selectedFiles.banner ? 'default' : 'pointer'} w-full`}

              >

                <div className="flex flex-col items-center justify-center">

                  {uploading.banner ? (

                    <div className="flex flex-col items-center gap-2">

                      <Spinner className="h-12 w-12" />

                      <p className="text-sm text-gray-500">Uploading...</p>

                    </div>

                  ) : (

                    <>

<img src="https://res.cloudinary.com/defsu5bfc/image/upload/v1736341749/image-05_zjmxze.png" alt="" />

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

                className="flex items-center gap-1 h-8 text-sm text-[#4B5563] bg-[#F2F9FF] p-2 rounded-md cursor-pointer"

                onClick={() => handlePreviewClick(selectedFiles.banner, 'banner')}

              >

                <span className='underline  underline-offset-4'>{selectedFiles.banner.name}</span>

                <button

                  onClick={(e) => {

                    e.stopPropagation();

                    handleRemoveFile('banner');

                  }}

                  className="text-[#4B5563] hover:text-gray-700 ml-2 text-2xl mb-1"

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
              <div className="relative group">
                <label
                  htmlFor={selectedFiles.course ? undefined : "course-upload"}
                  className={`px-4 py-1.5 ${
                    selectedFiles.course 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-gray-500 hover:bg-gray-600 cursor-pointer'
                  } text-white rounded flex items-center gap-1`}
                >
                  Browse
                  <span className="text-xl"><MdOutlineFileUpload /></span>
                </label>
                
                {/* Tooltip */}
                {selectedFiles.course && (
                  <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 right-0 top-full mt-1 whitespace-nowrap">
                    Remove current file to upload new one
                  </div>
                )}
              </div>
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
                     <img src="https://res.cloudinary.com/defsu5bfc/image/upload/v1736341749/image-05_zjmxze.png" alt="" />
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
                className="flex items-center gap-1 text-sm h-8 text-[#4B5563] bg-[#F2F9FF] p-2 rounded-md cursor-pointer"
                onClick={() => handlePreviewClick(selectedFiles.course, 'course')}
              >
 
               
                <span className="underline  underline-offset-4">{selectedFiles.course.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile('course');
                  }}
                  className="text-[#4B5563] hover:text-gray-700 ml-2 text-2xl mb-1"
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
              <div className="relative group">
                <label
                  htmlFor={selectedFiles.category ? undefined : "category-upload"}
                  className={`px-4 py-1.5 ${
                    selectedFiles.category 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-gray-500 hover:bg-gray-600 cursor-pointer'
                  } text-white rounded flex items-center gap-1`}
                >
                  Browse
                  <span className="text-xl"><MdOutlineFileUpload /></span>
                </label>
                
                {/* Tooltip */}
                {selectedFiles.category && (
                  <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 right-0 top-full mt-1 whitespace-nowrap">
                    Remove current file to upload new one
                  </div>
                )}
              </div>
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
     <img src="https://res.cloudinary.com/defsu5bfc/image/upload/v1736341749/image-05_zjmxze.png" alt="" />
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
                className="flex items-center gap-1 h-8 text-sm text-[#4B5563] bg-[#F2F9FF] p-2 rounded-md cursor-pointer"
                onClick={() => handlePreviewClick(selectedFiles.category, 'category')}
              >
                <span className='underline  underline-offset-4'>{selectedFiles.category.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile('category');
                  }}
                  className="text-[#4B5563] hover:text-gray-700 ml-2 text-2xl mb-1"
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
            <div className="bg-white  max-w-3xl h-[538px]  w-[732px] overflow-auto">
              <div className="flex justify-start border-b-2 border-[#E5E7EB]  w-[732px] h-[56px] ">
                <p className='text-lg  text-[16px] line-height-[24px] text-[#6B7280] p-1  ' style={{padding:"16px 24px 16px 24px",fontWeight:"700"}}>Preview</p>
                

               
             
              </div>

              
              {previewFile && (
                previewFile.includes('video') || previewFile.includes('.mp4') ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => isPlaying && setShowControls(true)}
                    onMouseLeave={() => isPlaying && setShowControls(false)}
                  >
                    <video
                      ref={videoRef}
                      src={previewFile}
                      controls
                      className="mt-3 ml-[20px] w-[692px] h-[360px]"
                      controlsList="nodownload noplaybackrate"
                      disablePictureInPicture
                      style={{
                        '--webkit-media-controls-timeline': 'none',
                        '--webkit-media-controls-play-button': 'none',
                        '--webkit-media-controls-volume-slider': 'none',
                        '--webkit-media-controls-mute-button': 'none',
                        '--webkit-media-controls-current-time-display': 'none',
                        '--webkit-media-controls-time-remaining-display': 'none'
                      }}
                      onPlay={() => {
                        setIsPlaying(true);
                        setShowControls(false);
                      }}
                      onPause={() => {
                        setIsPlaying(false);
                        setShowControls(true);
                      }}
                      onEnded={() => {
                        setIsPlaying(false);
                        setShowControls(true);
                      }}
                    />
                    
                    {/* Custom Play/Pause Button with Animation */}
                    <div className={`
                      absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      transition-all duration-300 ease-in-out
                      ${showControls 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-50 pointer-events-none'
                      }
                    `}>
                      <button
                        onClick={handlePlayPause}
                        className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center
                                  hover:bg-black/70 transition-all duration-300
                                  hover:scale-110 active:scale-95"
                      >
                        {isPlaying ? (
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                          </svg>
                        ) : (
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <img src={previewFile} alt="Preview" className="mt-3 ml-[20px] w-[692px] h-[360px]" />
                )
              )}
           
            <div className='flex justify-between border-t-2 mt-9 border-[#E5E7EB]  w-[732px] px-8 '>
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
                className="bg-white px-4 h-8 mt-6 rounded-md text-[#0056B3] hover:text-gray-700 mt-3 border border-[#0056B3]"
              >
                Remove
              </button>
 
 
            <button
                  onClick={() => {
                    setPreviewOpen(false);
                    setPreviewFile(null);
                  }}
                  className=" bg-[#0056b3] mt-6 px-4 h-8  rounded-md text-white hover:text-white mt-3"
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
