import React, { useState } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BasicInformation = ({ formData, setFormData }) => {
  const [previewImage, setPreviewImage] = useState(formData.bannerImage);

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

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        handleInputChange('bannerImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    handleInputChange('bannerImage', null);
  };

  return (
    <div className="space-y-8">
      {/* Course Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Title*
        </label>
        <input
          type="text"
          value={formData.courseTitle}
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
            value={formData.description}
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
            value={formData.duration}
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
            value={formData.completionTime}
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
            value={formData.courseType}
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
            value={formData.difficultyLevel}
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
            value={formData.language}
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
            value={formData.productCovered}
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
          value={formData.category}
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

      {/* Course Banner Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Banner Image
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          {previewImage ? (
            <div className="relative">
              <img
                src={previewImage}
                alt="Course banner"
                className="max-h-48 rounded-lg"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                <FiX className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <FiImage className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageUpload}
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

      {/* Thumbnail Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thumbnail Type
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="predefined"
              checked={formData.thumbnailType === 'predefined'}
              onChange={(e) => handleInputChange('thumbnailType', e.target.value)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2">Choose from predefined thumbnails</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="custom"
              checked={formData.thumbnailType === 'custom'}
              onChange={(e) => handleInputChange('thumbnailType', e.target.value)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2">Upload custom thumbnail</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation; 