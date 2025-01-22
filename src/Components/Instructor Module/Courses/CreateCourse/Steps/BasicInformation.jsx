import { useEffect, useState, useRef } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

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
    setBreadcrumbTitle,
    fetchCourseById
  } = useCourseCreationStore();
  
  // Add default value for basicInfo
  const { basicInfo = {} } = courseData || {};

  // Add state for validation errors
  const [errors, setErrors] = useState({});
  const [filteredLanguages, setFilteredLanguages] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  const inputRef = useRef(null);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [showSubCategorySuggestions, setShowSubCategorySuggestions] = useState(false);
  const subCategoryInputRef = useRef(null);
  const [subCategoryDropdownPosition, setSubCategoryDropdownPosition] = useState('bottom');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const categoryInputRef = useRef(null);
  const [categoryDropdownPosition, setCategoryDropdownPosition] = useState('bottom');
  const [filteredDifficultyLevels, setFilteredDifficultyLevels] = useState([]);
  const [showDifficultyLevelSuggestions, setShowDifficultyLevelSuggestions] = useState(false);
  const difficultyLevelInputRef = useRef(null);
  const [difficultyLevelDropdownPosition, setDifficultyLevelDropdownPosition] = useState('bottom');

  // Add this constant at the top with other constants
  const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    console.log("Current route:", location.pathname);
    console.log("Route params:", id);
    
    const fetchData = async () => {
      if (id) {
        console.log("Fetching course with ID:", id);
        try {
          await fetchCourseById(id);
          console.log("Fetch completed");
        } catch (error) {
          console.error("Error fetching course:", error);
        }
      } else {
        console.log("No ID provided");
      }
    };

    fetchData();
  }, [id, location, fetchCourseById]);

  // Debug logs
  console.log("Component re-render");
  console.log("ID from params:", id);
  console.log("Current pathname:", location.pathname);
  console.log("Course data:", courseData);

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
    if (basicInfo?.category) {
      const selectedCategory = categories.find(cat => cat.category === basicInfo.category);
      if (selectedCategory) {
        fetchSubCategories(selectedCategory.id);
      }
    }
  }, [basicInfo?.category, categories, fetchSubCategories]);

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

    // Update course data (this will trigger localStorage save)
    updateCourseData('basicInfo', newBasicInfo);

    // Validate if there are existing errors
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

  useEffect(() => {
    const handleDropdownPosition = () => {
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setDropdownPosition(spaceBelow < 200 ? 'top' : 'bottom');
      }
    };

    window.addEventListener('scroll', handleDropdownPosition);
    window.addEventListener('resize', handleDropdownPosition);
    handleDropdownPosition();

    return () => {
      window.removeEventListener('scroll', handleDropdownPosition);
      window.removeEventListener('resize', handleDropdownPosition);
    };
  }, []);

  useEffect(() => {
    const handleDropdownPosition = () => {
      if (subCategoryInputRef.current) {
        const rect = subCategoryInputRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setSubCategoryDropdownPosition(spaceBelow < 200 ? 'top' : 'bottom');
      }
    };

    window.addEventListener('scroll', handleDropdownPosition);
    window.addEventListener('resize', handleDropdownPosition);
    handleDropdownPosition();

    return () => {
      window.removeEventListener('scroll', handleDropdownPosition);
      window.removeEventListener('resize', handleDropdownPosition);
    };
  }, []);

  useEffect(() => {
    const handleDropdownPosition = () => {
      if (categoryInputRef.current) {
        const rect = categoryInputRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setCategoryDropdownPosition(spaceBelow < 200 ? 'top' : 'bottom');
      }
    };

    window.addEventListener('scroll', handleDropdownPosition);
    window.addEventListener('resize', handleDropdownPosition);
    handleDropdownPosition();

    return () => {
      window.removeEventListener('scroll', handleDropdownPosition);
      window.removeEventListener('resize', handleDropdownPosition);
    };
  }, []);

  useEffect(() => {
    const handleDropdownPosition = () => {
      if (difficultyLevelInputRef.current) {
        const rect = difficultyLevelInputRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setDifficultyLevelDropdownPosition(spaceBelow < 200 ? 'top' : 'bottom');
      }
    };

    window.addEventListener('scroll', handleDropdownPosition);
    window.addEventListener('resize', handleDropdownPosition);
    handleDropdownPosition();

    return () => {
      window.removeEventListener('scroll', handleDropdownPosition);
      window.removeEventListener('resize', handleDropdownPosition);
    };
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('courseCreationData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.basicInfo) {
          updateCourseData('basicInfo', parsedData.basicInfo);
        }
      } catch (error) {
        console.error('Error loading saved course data:', error);
      }
    }
  }, []);

  return (
    <div className="max-w-[828px] h-[600px] mx-auto space-y-6 mt-5">
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
            className={`w-full px-3 py-1.5  h-[48px] text-sm border rounded ${
              validationErrors.courseName ? 'border-red-500' : 'border-[#D1D5DB]'
            } focus:outline-none focus:ring-1 focus:ring-gray-600 h-9`}
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
            className={`w-full px-4 py-2 w-[828px] h-[113px] border rounded ${
              validationErrors.courseTagline ? 'border-red-500' : 'border-[#D1D5DB]'
            } focus:outline-none focus:ring-1 focus:ring-gray-600`}
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
            className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 h-9"
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
            className={`w-full px-3 py-1.5 w-[406px] h-[48px] text-sm border rounded ${
              validationErrors.courseDuration ? 'border-red-500' : 'border-[#D1D5DB]'
            } focus:outline-none focus:ring-1 focus:ring-gray-600 h-9`}
          />
          {validationErrors.courseDuration && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.courseDuration}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Difficulty Level *
          </label>
          <div className="relative">
            <input
              ref={difficultyLevelInputRef}
              type="text"
              name="difficultyLevel"
              value={basicInfo?.difficultyLevel || ''}
              onChange={(e) => {
                updateCourseData('basicInfo', {
                  ...basicInfo,
                  difficultyLevel: e.target.value
                });
                const filtered = difficultyLevels.filter(level => 
                  level.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setFilteredDifficultyLevels(filtered);
                setShowDifficultyLevelSuggestions(true);
              }}
              onFocus={() => {
                setFilteredDifficultyLevels(difficultyLevels);
                setShowDifficultyLevelSuggestions(true);
              }}
              onBlur={() => {
                setTimeout(() => setShowDifficultyLevelSuggestions(false), 200);
              }}
              className={`text-sm border rounded px-3 py-1.5 w-[406px] h-[48px] ${
                validationErrors.difficultyLevel ? 'border-red-500' : 'border-[#D1D5DB]'
              } focus:outline-none focus:ring-1 focus:ring-gray-600 pr-8`}
              placeholder="Select Difficulty Level"
            />
            {/* Icon logic: dropdown (default) -> search (focused) -> cross (typing) */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              {basicInfo?.difficultyLevel ? (
                // Show cross mark when there's text
                <button
                  type="button"
                  className="hover:text-gray-600"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateCourseData('basicInfo', {
                      ...basicInfo,
                      difficultyLevel: ''
                    });
                    setShowDifficultyLevelSuggestions(false);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : showDifficultyLevelSuggestions ? (
                // Show search icon when focused but no text
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ) : (
                // Show dropdown icon by default
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>
            {showDifficultyLevelSuggestions && filteredDifficultyLevels.length > 0 && (
              <ul 
                className={`absolute z-10 w-full ${
                  difficultyLevelDropdownPosition === 'top' 
                    ? 'bottom-full mb-1' 
                    : 'top-full mt-1'
                } max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg`}
              >
                {filteredDifficultyLevels.map((level, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      updateCourseData('basicInfo', {
                        ...basicInfo,
                        difficultyLevel: level
                      });
                      setShowDifficultyLevelSuggestions(false);
                    }}
                  >
                    {level}
                  </li>
                ))}
              </ul>
            )}
            {validationErrors.difficultyLevel && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.difficultyLevel}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Category *
          </label>
          <div className="relative">
            <input
              ref={categoryInputRef}
              type="text"
              name="category"
              value={basicInfo?.category || ''}
              onChange={(e) => {
                handleChange('category', e.target.value);
                const filtered = (categories.length > 0 ? categories : testCategories).filter(cat => 
                  cat.category.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setFilteredCategories(filtered);
                setShowCategorySuggestions(true);
              }}
              onFocus={() => {
                setFilteredCategories(categories.length > 0 ? categories : testCategories);
                setShowCategorySuggestions(true);
              }}
              onBlur={() => {
                setTimeout(() => setShowCategorySuggestions(false), 200);
              }}
              className={`text-sm border rounded px-3 py-1.5 w-[406px] h-[48px] ${
                validationErrors.category ? 'border-red-500' : 'border-[#D1D5DB]'
              } focus:outline-none focus:ring-1 focus:ring-gray-600 pr-8`}
              placeholder="Type or select a category"
            />
            {/* Icon logic: dropdown (default) -> search (focused) -> cross (typing) */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              {basicInfo?.category ? (
                // Show cross mark when there's text
                <button
                  type="button"
                  className="hover:text-gray-600"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateCourseData('basicInfo', {
                      ...basicInfo,
                      category: '',
                      subCategory: ''
                    });
                    setShowCategorySuggestions(false);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : showCategorySuggestions ? (
                // Show search icon when focused but no text
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ) : (
                // Show dropdown icon by default
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>
            {showCategorySuggestions && filteredCategories.length > 0 && (
              <ul 
                className={`absolute z-10 w-full ${
                  categoryDropdownPosition === 'top' 
                    ? 'bottom-full mb-1' 
                    : 'top-full mt-1'
                } max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg`}
              >
                {filteredCategories.map((cat) => (
                  <li
                    key={cat.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      updateCourseData('basicInfo', {
                        ...basicInfo,
                        category: cat.category,
                        subCategory: ''
                      });
                      setShowCategorySuggestions(false);
                    }}
                  >
                    {cat.category}
                  </li>
                ))}
              </ul>
            )}
            {validationErrors.category && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Subcategory *
          </label>
          <div className="relative">
            <input
              ref={subCategoryInputRef}
              type="text"
              name="subCategory"
              value={basicInfo?.subCategory || ''}
              onChange={(e) => {
                handleChange('subCategory', e.target.value);
                const filtered = subCategories.filter(subCat => 
                  subCat.subCategory.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setFilteredSubCategories(filtered);
                setShowSubCategorySuggestions(true);
              }}
              onFocus={() => {
                setFilteredSubCategories(subCategories);
                setShowSubCategorySuggestions(true);
              }}
              onBlur={() => {
                setTimeout(() => setShowSubCategorySuggestions(false), 200);
              }}
              disabled={!basicInfo.category}
              className={`text-sm border rounded px-3 py-1.5 w-[406px] h-[48px] ${
                validationErrors.subCategory ? 'border-red-500' : 'border-[#D1D5DB]'
              } focus:outline-none focus:ring-1 focus:ring-gray-600 pr-8 ${
                !basicInfo.category ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
              placeholder={basicInfo.category ? "Type or select a subcategory" : "Select a category first"}
            />
            {/* Icon logic: dropdown (default) -> search (focused) -> cross (typing) */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              {basicInfo?.subCategory ? (
                // Show cross mark when there's text
                <button
                  type="button"
                  className="hover:text-gray-600"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleChange('subCategory', '');
                    setShowSubCategorySuggestions(false);
                  }}
                  disabled={!basicInfo.category}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : showSubCategorySuggestions ? (
                // Show search icon when focused but no text
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ) : (
                // Show dropdown icon by default
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>
            {showSubCategorySuggestions && filteredSubCategories.length > 0 && basicInfo.category && (
              <ul 
                className={`absolute z-10 w-full ${
                  subCategoryDropdownPosition === 'top' 
                    ? 'bottom-full mb-1' 
                    : 'top-full mt-1'
                } max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg`}
              >
                {filteredSubCategories.map((subCat) => (
                  <li
                    key={subCat.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleChange('subCategory', subCat.subCategory);
                      setShowSubCategorySuggestions(false);
                    }}
                  >
                    {subCat.subCategory}
                  </li>
                ))}
              </ul>
            )}
            {validationErrors.subCategory && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.subCategory}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Teaching Language *
          </label>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              name="teachingLanguage"
              value={basicInfo?.teachingLanguage || ''}
              onChange={(e) => {
                handleChange('teachingLanguage', e.target.value);
                const filtered = languages.filter(lang => 
                  lang.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setFilteredLanguages(filtered);
                setShowSuggestions(true);
              }}
              onFocus={() => {
                setFilteredLanguages(languages);
                setShowSuggestions(true);
              }}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              className={`text-sm border rounded px-3 py-1.5 w-[406px] h-[48px] ${
                validationErrors.teachingLanguage ? 'border-red-500' : 'border-[#D1D5DB]'
              } focus:outline-none focus:ring-1 focus:ring-gray-600 pr-8`}
              placeholder="Type or select a language"
            />
            {/* Icon logic: dropdown (default) -> search (focused) -> cross (typing) */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              {basicInfo?.teachingLanguage ? (
                // Show cross mark when there's text
                <button
                  type="button"
                  className="hover:text-gray-600"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleChange('teachingLanguage', '');
                    setShowSuggestions(false);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : showSuggestions ? (
                // Show search icon when focused but no text
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ) : (
                // Show dropdown icon by default
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>
            {showSuggestions && filteredLanguages.length > 0 && (
              <ul 
                className={`absolute z-10 w-full ${
                  dropdownPosition === 'top' 
                    ? 'bottom-full mb-1' 
                    : 'top-full mt-1'
                } max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg`}
              >
                {filteredLanguages.map((language, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleChange('teachingLanguage', language);
                      setShowSuggestions(false);
                    }}
                  >
                    {language}
                  </li>
                ))}
              </ul>
            )}
            {validationErrors.teachingLanguage && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.teachingLanguage}</p>
            )}
          </div>
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
              className="hidden rounded"
              id="transcript-upload"
            />
            <div className="relative">
              <input 
                type="text"
                value={basicInfo?.transcript?.name || ''}
                className=" px-3 rounded py-1.5 w-[406px] h-[48px] text-sm  border border-[#D1D5DB]  focus:outline-none focus:ring-1 focus:ring-gray-600 h-9 pr-20"
                placeholder="No file chosen"
                readOnly
              />
              <label
                htmlFor="transcript-upload"
                className="absolute right-1 top-1/2 -translate-y-1/2 
                  w-[67px] h-[32px] 
                  px-2 py-1.5
                  mr-2
                  flex items-center justify-center gap-2
                  rounded-tl-default
                  bg-[#6B7280] text-neutral-white 
                  cursor-pointer 
                  hover:bg-neutral-dark
                  transition-colors
                  rounded"
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