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
    fetchSubCategories 
  } = useCourseCreationStore();
  const { basicInfo } = courseData;

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

  const handleChange = (field, value) => {
    if (field === 'category') {
      updateCourseData('basicInfo', {
        ...basicInfo,
        category: value,
        subCategory: '' // Reset subcategory when category changes
      });
    } else if (field === 'hashtags') {
      // Convert comma-separated string to array of objects
      const hashtagArray = value.split(',')
        .map(tag => tag.trim())
        .filter(Boolean)
        .map(tag => ({ tagName: tag }));

      updateCourseData('basicInfo', {
        ...basicInfo,
        hashtags: hashtagArray
      });
    } else {
      updateCourseData('basicInfo', {
        ...basicInfo,
        [field]: value
      });
    }
  };  

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
            maxLength={100}
            placeholder="Real World UX Learn User Experience & Start Your Career"
            className="w-full px-3 py-1.5 text-sm  border border-[#D1D5DB]  focus:outline-none focus:ring-2 focus:ring-[#bbbfc4] h-9"
          />
          <span className="absolute right-2 top-1.5 text-xs text-gray-500">
            {(basicInfo?.courseName?.length || 0)}/100
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
            placeholder="UX based on real world examples. Gain powerful UX skills you can use to start a UX career or improve your projects."
            maxLength={300}
            rows={3}
            className="w-full px-4 py-2 border border-[#D1D5DB]  focus:outline-none focus:ring-2 focus:ring-[#bbbfc4] "
          />
          <span className="absolute right-2 top-2 text-xs text-gray-500">
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
            placeholder="e.g., 10"
            min="0"
            step="0.5"
            className="w-full px-3 py-1.5 text-sm  border border-[#D1D5DB]  focus:outline-none focus:ring-2 focus:ring-[#bbbfc4] h-9"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Difficulty Level *
          </label>
          <select
            name="difficultyLevel"
            value={basicInfo?.difficultyLevel || ''}
            onChange={(e) => handleChange('difficultyLevel', e.target.value)}
            className="w-full px-3 py-1.5 text-sm  border border-[#D1D5DB]  focus:outline-none focus:ring-2 focus:ring-[#bbbfc4] h-9"
          >
            <option value="">Select Difficulty Level</option>
          
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-xs font-medium text-gray-700 mb-1">
            Category *
          </label>
          <div className="relative">
            <select
              id="category"
              value={basicInfo.category || ''}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-1.5 text-sm  border border-[#D1D5DB]  focus:outline-none focus:ring-2 focus:ring-[#bbbfc4] h-9"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.category} className='text-sm'>
                  {cat.category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="subcategory" className="block text-xs font-medium text-gray-700 mb-1">
            Subcategory *
          </label>
          <div className="relative">
            <select
              id="subcategory"
              value={basicInfo.subCategory || ''}
              onChange={(e) => handleChange('subCategory', e.target.value)}
              className="w-full px-3 py-1.5 text-sm  border border-[#D1D5DB]  focus:outline-none focus:ring-2 focus:ring-[#bbbfc4] h-9 disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
              disabled={!basicInfo.category}
            >
              <option value="">Select a subcategory</option>
              {subCategories.map((subCat, index) => (
                <option key={index} value={subCat.subCategory} className='text-sm'>
                  {subCat.subCategory}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Teaching Language *
          </label>
          <select
            name="teachingLanguage"
            value={basicInfo?.teachingLanguage || ''}
            onChange={(e) => handleChange('teachingLanguage', e.target.value)}
            className=" w-full px-3 py-1.5 text-sm  border border-[#D1D5DB]  focus:outline-none focus:ring-2 focus:ring-[#bbbfc4] h-9"
          >
            <option value="">Select a language</option>
            {languages
              .sort((a, b) => a.localeCompare(b))
              .map((language, index) => (
                <option key={index} value={language}>{language}</option>
              ))
            }
          </select>
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