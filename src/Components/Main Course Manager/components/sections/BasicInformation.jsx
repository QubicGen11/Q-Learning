import React, { useState } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useCourseStore from '../../../../store/courseStore';

const BasicInformation = () => {
  const courseData = useCourseStore((state) => state.courseData);
  const updateCourseData = useCourseStore((state) => state.updateCourseData);
  const [previewBannerImage, setPreviewBannerImage] = useState(courseData.courseBanner);
  const [previewThumbnailImage, setPreviewThumbnailImage] = useState(null);
  const [previewTechImage, setPreviewTechImage] = useState(null);
  const [previewCustomTechImage, setPreviewCustomTechImage] = useState(null);
  const [showTechModal, setShowTechModal] = useState(false);
  const [uploadType, setUploadType] = useState(''); // 'local' or 'predefined'

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };
  const techLogos = {
    html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    redux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    graphql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"
  };
  
  const handleInputChange = (field, value) => {
    if (field === 'courseBanner') {
      // If it's a predefined thumbnail
      if (value && value.startsWith('https://')) {
        updateCourseData({ 
          courseBanner: value,
          thumbnailType: 'predefined'
        });
      } else {
        // If it's a custom uploaded image
        updateCourseData({ 
          courseBanner: value,
          thumbnailType: 'custom'
        });
      }
    } else {
      updateCourseData({ [field]: value });
    }
  };

  const handleImageUpload = async (event, imageType) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        
        switch(imageType) {
          case 'banner':
            setPreviewBannerImage(base64);
            handleInputChange('courseBanner', base64);
            break;
          case 'thumbnail':
            setPreviewThumbnailImage(base64);
            handleInputChange('thumbnail', base64);
            break;
          case 'technology':
            setPreviewTechImage(base64);
            handleInputChange('technologyImage', base64);
            break;
          case 'customTechnology':
            setPreviewCustomTechImage(base64);
            handleInputChange('coustomTechnologyImg', base64);
            break;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      }
    }
  };

  const removeImage = (imageType) => {
    switch(imageType) {
      case 'banner':
        setPreviewBannerImage(null);
        handleInputChange('courseBanner', null);
        break;
      case 'thumbnail':
        setPreviewThumbnailImage(null);
        handleInputChange('thumbnail', null);
        break;
      case 'technology':
        setPreviewTechImage(null);
        handleInputChange('technologyImage', null);
        break;
      case 'customTechnology':
        setPreviewCustomTechImage(null);
        handleInputChange('coustomTechnologyImg', null);
        break;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Course Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Title*
        </label>
        <input
          type="text"
          value={courseData.courseTitle}
          onChange={(e) => handleInputChange('courseTitle', e.target.value)}
          placeholder="Enter course title"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      {/* Updated Course Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description*
        </label>
        <div className="relative" style={{ height: '200px' }}>
          <ReactQuill
            value={courseData.description}
            onChange={(content) => handleInputChange('description', content)}
            modules={quillModules}
            className="h-full"
            theme="snow"
            placeholder="Enter course description..."
          />
        </div>
      </div>

      {/* Add custom styles for ReactQuill */}
      <style jsx global>{`
        .ql-container {
          height: calc(100% - 42px) !important;
        }
        .ql-editor {
          min-height: 100%;
          max-height: 100%;
          overflow-y: auto;
        }
      `}</style>

      {/* Course Duration and Completion Time */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration*
          </label>
          <input
            type="text"
            value={courseData.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            placeholder="e.g., 8 weeks"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Completion Time
          </label>
          <input
            type="text"
            value={courseData.completionTime}
            onChange={(e) => handleInputChange('completionTime', e.target.value)}
            placeholder="e.g., 2-3 hours per week"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Course Type and Difficulty Level */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Type*
          </label>
          <select
            value={courseData.courseType}
            onChange={(e) => handleInputChange('courseType', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="FullStack">Full Stack</option>
            <option value="Mobile">Mobile Development</option>
            <option value="DevOps">DevOps</option>
            <option value="DataScience">Data Science</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Level*
          </label>
          <select
            value={courseData.difficultyLevel}
            onChange={(e) => handleInputChange('difficultyLevel', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
      </div>

      {/* Language and Product Covered */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language*
          </label>
          <select
            value={courseData.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Covered
          </label>
          <input
            type="text"
            value={courseData.productCovered}
            onChange={(e) => handleInputChange('productCovered', e.target.value)}
            placeholder="e.g., React, Node.js, etc."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category*
        </label>
        <select
          value={courseData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Category</option>
          <option value="WebDevelopment">Web Development</option>
          <option value="MobileDevelopment">Mobile Development</option>
          <option value="Programming">Programming</option>
          <option value="DataScience">Data Science</option>
          <option value="MachineLearning">Machine Learning</option>
          <option value="CloudComputing">Cloud Computing</option>
        </select>
      </div>

      {/* Banner Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Banner Image
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          {previewBannerImage ? (
            <div className="relative">
              <img
                src={previewBannerImage}
                alt="Course banner"
                className="max-h-48 rounded-lg"
              />
              <button
                onClick={() => removeImage('banner')}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                <FiX className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <FiImage className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'banner')}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Technologies Used */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Technologies Used
        </label>
        <input
          type="text"
          value={courseData.technologiesUsed || ''}
          onChange={(e) => handleInputChange('technologiesUsed', e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Technologies covered in this course"
        />
      </div>

      {/* Technology Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Technology Image
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          {previewTechImage ? (
            <div className="relative">
              <img
                src={previewTechImage}
                alt="Technology"
                className="max-h-48 rounded-lg"
              />
              <button
                onClick={() => removeImage('technology')}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                <FiX className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={() => setShowTechModal(true)}
                className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
              >
                <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <span>Upload Image</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tech Image Upload Modal */}
      {showTechModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[80%] max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Select Technology Image</h3>
              <button
                onClick={() => setShowTechModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setUploadType('local')}
                className={`flex-1 py-2 px-4 rounded ${
                  uploadType === 'local'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                Upload Local File
              </button>
              <button
                onClick={() => setUploadType('predefined')}
                className={`flex-1 py-2 px-4 rounded ${
                  uploadType === 'predefined'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                Choose Predefined
              </button>
            </div>

            {uploadType === 'local' && (
              <div className="text-center p-4 border-2 border-dashed rounded-lg">
                <input
                  type="file"
                  className="hidden"
                  id="tech-image-upload"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageUpload(e, 'technology');
                    setShowTechModal(false);
                  }}
                />
                <label
                  htmlFor="tech-image-upload"
                  className="cursor-pointer text-purple-600 hover:text-purple-500"
                >
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <span>Click to upload or drag and drop</span>
                </label>
              </div>
            )}

            {uploadType === 'predefined' && (
              <div className="grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
                {Object.entries(techLogos).map(([key, url]) => (
                  <div
                    key={key}
                    onClick={() => {
                      setPreviewTechImage(url);
                      handleInputChange('technologyImage', url);
                      setShowTechModal(false);
                    }}
                    className="p-4 border rounded-lg cursor-pointer hover:border-purple-500 transition-all"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={url}
                        alt={key}
                        className="w-16 h-16 object-contain"
                      />
                      <span className="text-sm text-gray-600 capitalize">
                        {key}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom Technology */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Technology
        </label>
        <select
          value={courseData.customTechnology || 'No'}
          onChange={(e) => handleInputChange('customTechnology', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {courseData.customTechnology === 'Yes' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Technology Image
          </label>
          <input
            type="text"
            value={courseData.coustomTechnologyImg || ''}
            onChange={(e) => handleInputChange('coustomTechnologyImg', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="URL for custom technology image"
          />
        </div>
      )}

      {/* Course Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Type
        </label>
        <select
          value={courseData.courseType || ''}
          onChange={(e) => handleInputChange('courseType', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Course Type</option>
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
          <option value="Enterprise">Enterprise</option>
        </select>
      </div>

      {/* Difficulty Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Difficulty Level
        </label>
        <select
          value={courseData.difficultyLevel || ''}
          onChange={(e) => handleInputChange('difficultyLevel', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Difficulty Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Sub Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sub Category
        </label>
        <select
          value={courseData.subCategory || ''}
          onChange={(e) => handleInputChange('subCategory', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Sub Category</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="FullStack">FullStack</option>
        </select>
      </div>
    </div>
  );
};

export default BasicInformation; 