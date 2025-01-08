import { useEffect, useState } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import axios from 'axios';

function BasicInfo() {
  const languages = [
    // Global Languages
    "English",
    "Spanish",
    "Mandarin Chinese",
    "French",
    "Hindi",
    "Arabic",
    "Bengali",
    "Portuguese",
    "Russian",
    "German",
  
    // India's Famous Languages
    "Hindi",
    "Bengali",
    "Marathi",
    "Telugu",
    "Tamil",
    "Gujarati",
    "Kannada",
    "Malayalam",
    "Odia",
    "Punjabi",
    "Assamese",
    "Urdu",
    "Sanskrit",
  
    // Regional Languages - Asia
    "Japanese",
    "Korean",
    "Thai",
    "Vietnamese",
  
    // Regional Languages - Europe
    "Italian",
    "Dutch",
    "Polish",
    "Greek",
  
    // Regional Languages - Africa
    "Swahili",
    "Amharic",
    "Zulu",
    "Hausa",
  
    // Regional Languages - Americas
    "Quechua",
    "Navajo",
    "Haitian Creole",
  
    // Regional Languages - Oceania
    "Maori",
    "Samoan",
    "Hawaiian",
  
    // Option for Custom Input
    "Other"
  ];
  
  const [courseTypes, setCourseTypes] = useState([]);
  const { 
    courseData, 
    updateCourseData, 
    categories, 
    subCategories, 
    fetchCategories, 
    fetchSubCategories,
    validationErrors,
    setValidationErrors,
    setBreadcrumbTitle
  } = useCourseCreationStore();
  const { basicInfo } = courseData;

  // Add state for validation errors
  const [errors, setErrors] = useState({});

  // Validation function
  const validateField = (field, value) => {
    switch (field) {
      case 'courseName':
        return (!value || value.length < 10) ? 'Course name is required and must be at least 10 characters' : '';
      case 'courseTagline':
        return (!value || value.length < 20) ? 'Course tagline is required and must be at least 20 characters' : '';
      case 'courseDuration':
        return (!value || isNaN(value) || Number(value) <= 0) ? 'Course duration must be a valid number greater than 0' : '';
      case 'difficultyLevel':
        return !value ? 'Difficulty level is required' : '';
      case 'category':
        return !value ? 'Category is required' : '';
      case 'subCategory':
        return !value ? 'Subcategory is required' : '';
      case 'teachingLanguage':
        return !value ? 'Teaching language is required' : '';
      default:
        return '';
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (basicInfo.category) {
      const selectedCategory = categories.find(cat => cat.category === basicInfo.category);
      if (selectedCategory) {
        fetchSubCategories(selectedCategory.id);
      }
    }
  }, [basicInfo.category, categories, fetchSubCategories]);

  // Fetch course types on component mount
  useEffect(() => {
    const fetchCourseTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8089/qlms/allCourseTypes');
        setCourseTypes(response.data);
      } catch (error) {
        console.error('Error fetching course types:', error);
      }
    };
    fetchCourseTypes();
  }, []);

  const validateAllFields = (currentData) => {
    const errors = {};
    
    if (!currentData?.courseName || currentData.courseName.length < 10) {
      errors.courseName = 'Course name is required and must be at least 10 characters';
    }
    if (!currentData?.courseTagline || currentData.courseTagline.length < 20) {
      errors.courseTagline = 'Course tagline is required and must be at least 20 characters';
    }
    if (!currentData?.courseDuration || isNaN(currentData.courseDuration) || Number(currentData.courseDuration) <= 0) {
      errors.courseDuration = 'Course duration must be a valid number greater than 0';
    }
    if (!currentData?.difficultyLevel) {
      errors.difficultyLevel = 'Difficulty level is required';
    }
    if (!currentData?.category) {
      errors.category = 'Category is required';
    }
    if (!currentData?.subCategory) {
      errors.subCategory = 'Subcategory is required';
    }
    if (!currentData?.teachingLanguage) {
      errors.teachingLanguage = 'Teaching language is required';
    }
    
    return errors;
  };

  const handleChange = (field, value) => {
    let newBasicInfo;
    
    if (field === 'courseName') {
      setBreadcrumbTitle(value);
    }
    
    // Update the course data
    if (field === 'category') {
      newBasicInfo = {
        ...basicInfo,
        category: value,
        subCategory: ''
      };
    } else if (field === 'hashtags') {
      const hashtagArray = value.split(',')
        .map(tag => tag.trim())
        .filter(Boolean)
        .map(tag => ({ tagName: tag }));

      newBasicInfo = {
        ...basicInfo,
        hashtags: hashtagArray
      };
    } else {
      newBasicInfo = {
        ...basicInfo,
        [field]: value
      };
    }

    // Update course data
    updateCourseData('basicInfo', newBasicInfo);

    // Only validate if there are existing validation errors
    if (Object.keys(validationErrors).length > 0) {
      const newErrors = validateAllFields(newBasicInfo);
      setValidationErrors(newErrors);
    }
  };

  // Add blur handler for validation
  const handleBlur = (field) => {
    const value = basicInfo[field];
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const testCategories = [
    { id: 1, category: "Development" },
    { id: 2, category: "Business" },
    { id: 3, category: "Design" },
    { id: 4, category: "Marketing" },
    { id: 5, category: "IT & Software" },
    { id: 6, category: "Personal Development" },
    { id: 7, category: "Photography & Video" },
    { id: 8, category: "Music" },
    { id: 9, category: "Health & Fitness" },
    { id: 10, category: "Teaching & Academics" }
  ];

  return (
    <div className="max-w-[700px] mx-auto space-y-6">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Course Name *
        </label>
        <div className="relative">
          <input
            type="text"
            name="courseName"
            value={basicInfo?.courseName || ''}
            onChange={(e) => handleChange('courseName', e.target.value)}
            onBlur={() => handleBlur('courseName')}
            maxLength={80}
            placeholder="Real World UX Learn User Experience & Start Your Career"
            className={`w-full px-3 py-1.5 text-sm border ${
              validationErrors.courseName ? 'border-red-500' : 'border-[#D1D5DB]'
            } focus:outline-none focus:ring-2 focus:ring-[#bbbfc4] h-9`}
          />
          {validationErrors.courseName && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.courseName}</p>
          )}
          <span className="absolute right-2 bottom-1.5 text-xs text-gray-500">
            {(basicInfo?.courseName?.length || 0)}/80
          </span>
        </div>
      </div>
   
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Course Tagline *
        </label>
        <div className="relative">
          <textarea
            name="courseTagline"
            value={basicInfo?.courseTagline || ''}
            onChange={(e) => handleChange('courseTagline', e.target.value)}
            placeholder="UX based on real world examples..."
            maxLength={300}
            rows={3}
            className={`w-full px-4 py-2 border ${
              validationErrors.courseTagline ? 'border-red-500' : 'border-[#D1D5DB]'
            } focus:outline-none focus:ring-2 focus:ring-[#bbbfc4]`}
          />
          {validationErrors.courseTagline && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.courseTagline}</p>
          )}
          <span className="absolute right-2 bottom-2 text-xs text-gray-500">
            {(basicInfo?.courseTagline?.length || 0)}/300
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
       

        {/* <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Percentage Required *
          </label>
          <input
            type="number"
            name="percentageRequired"
            value={basicInfo?.percentageRequired || ''}
            onChange={(e) => handleChange('percentageRequired', parseFloat(e.target.value))}
            placeholder="e.g., 99.9"
            min="0"
            max="100"
            step="0.1"
            className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-9"
          />
        </div> */}

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Course Duration (Hours) *
          </label>
          <input
            type="number"
            name="courseDuration"
            value={basicInfo?.courseDuration || ''}
            onChange={(e) => handleChange('courseDuration', e.target.value.toString())}
            className={`w-full px-3 py-1.5 text-sm border ${
              validationErrors.courseDuration ? 'border-red-500' : 'border-[#D1D5DB]'
            } focus:outline-none focus:ring-2 focus:ring-[#bbbfc4] h-9`}
          />
          {validationErrors.courseDuration && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.courseDuration}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Difficulty Level *
          </label>
          <select
            name="difficultyLevel"
            value={basicInfo?.difficultyLevel || ''}
            onChange={(e) => handleChange('difficultyLevel', e.target.value)}
            className={`w-full px-3 py-1.5 text-sm border ${
              validationErrors.difficultyLevel ? 'border-red-500' : 'border-[#D1D5DB]'
            } focus:outline-none focus:ring-2 focus:ring-[#bbbfc4] h-9`}
          >
            <option value="">Select Difficulty Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          {validationErrors.difficultyLevel && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.difficultyLevel}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            name="category"
            value={basicInfo?.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
            className={`w-full px-3 py-1.5 text-sm border ${
              validationErrors.category ? 'border-red-500' : 'border-[#D1D5DB]'
            } focus:outline-none focus:ring-2 focus:ring-[#bbbfc4] h-9`}
          >
            <option value="">Select a category</option>
            {(categories.length > 0 ? categories : testCategories).map((cat) => (
              <option key={cat.id} value={cat.category}>{cat.category}</option>
            ))}
          </select>
          {validationErrors.category && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Subcategory *
          </label>
          <select
            name="subCategory"
            value={basicInfo?.subCategory || ''}
            onChange={(e) => handleChange('subCategory', e.target.value)}
            disabled={!basicInfo.category}
            className={`w-full px-3 py-1.5 text-sm border ${
              validationErrors.subCategory ? 'border-red-500' : 'border-[#D1D5DB]'
            } focus:outline-none focus:ring-2 focus:ring-[#bbbfc4] h-9`}
          >
            <option value="">Select a subcategory</option>
            {subCategories.map((subCat) => (
              <option key={subCat.id} value={subCat.subCategory}>{subCat.subCategory}</option>
            ))}
          </select>
          {validationErrors.subCategory && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.subCategory}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Teaching Language *
          </label>
          <select
            name="teachingLanguage"
            value={basicInfo?.teachingLanguage || ''}
            onChange={(e) => handleChange('teachingLanguage', e.target.value)}
            className={`w-full px-3 py-1.5 text-sm border ${
              validationErrors.teachingLanguage ? 'border-red-500' : 'border-[#D1D5DB]'
            } focus:outline-none focus:ring-2 focus:ring-[#bbbfc4] h-9`}
          >
            <option value="">Select a language</option>
            {languages.map((language, index) => (
              <option key={index} value={language}>{language}</option>
            ))}
          </select>
          {validationErrors.teachingLanguage && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.teachingLanguage}</p>
          )}
        </div>



        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Upload Transcript
          </label>
          <div className="relative w-full">
            <input
              type="file"
              name="transcript"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => handleChange('transcript', e.target.files[0])}
              className="hidden"
              id="transcript-upload"
            />
            <div className="relative">
              <input 
                type="text"
                value={basicInfo?.transcript?.name || ''}
                className="w-full px-3 py-1.5 text-sm  border border-[#D1D5DB]  focus:outline-none focus:ring-2 focus:ring-[#bbbfc4] h-9 pr-20"
                placeholder="No file chosen"
                readOnly
              />
              <label
                htmlFor="transcript-upload"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1 text-sm bg-[#6b7280] text-white rounded cursor-pointer hover:bg-gray-600"
              >
                Browse
              </label>
            </div>
          </div>
        </div>

      </div>

    
    </div>
  );
}

export default BasicInfo;