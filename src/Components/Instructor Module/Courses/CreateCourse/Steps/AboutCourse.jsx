import React, { useState, useEffect } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import { toast } from 'react-hot-toast';
import './Aboucourse.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function AboutCourse() {
  const { 
    courseData, 
    updateCourseData, 
    validationErrors,
    setValidationErrors
  } = useCourseCreationStore();
  
  // Add console logs to see what's happening
  console.log('Raw courseData:', courseData);
  console.log('Raw about:', courseData?.about);
  console.log('Prerequisites:', courseData?.about?.coursePreRequisites);

  // Initialize about properly
  const about = {
    courseOutcome: courseData?.about?.courseOutcome || '',
    coursePreRequisites: Array.isArray(courseData?.about?.coursePreRequisites) 
      ? courseData.about.coursePreRequisites 
      : [],
    courseAudience: Array.isArray(courseData?.about?.courseAudience) 
      ? courseData.about.courseAudience 
      : [],
    courseDescription: courseData?.about?.courseDescription || '',
    reviews: courseData?.about?.reviews || []
  };

  // Update the prerequisites textarea value handling
  const getPreRequisitesText = () => {
    if (!about.coursePreRequisites || !Array.isArray(about.coursePreRequisites)) {
      return '';
    }
    return about.coursePreRequisites
      .map(prereq => typeof prereq === 'object' 
        ? `• ${prereq.preRequisiteRequired}` 
        : `• ${prereq}`)
      .join('\n');
  };

  // Initialize state with default values
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReviews, setSelectedReviews] = useState(about.reviews || []);

  const reviews = [
    {
      id: 1,
      review: "Great course! The practical examples really helped me understand UX concepts better.",
      author: "John Doe",
      rating: 5
    },
    {
      id: 2,
      review: "Very comprehensive coverage of UX principles. Highly recommended!",
      author: "Sarah Smith",
      rating: 5
    },
    {
      id: 3,
      review: "The instructor's explanation style made complex topics easy to understand.",
      author: "Mike Johnson",
      rating: 4
    },
    {
      id: 4,
      review: "Perfect balance of theory and practical exercises. Worth every penny!",
      author: "Emily Brown",
      rating: 5
    },
    {
      id: 5,
      review: "Excellent course structure and content delivery. Very engaging!",
      author: "David Wilson",
      rating: 4
    }
  ];

  const handleReviewSelect = (reviewId) => {
    setSelectedReviews(prev => {
      const isSelected = prev.includes(reviewId);
      const newSelection = isSelected 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId];
      handleChange('reviews', newSelection);
      return newSelection;
    });
  };

  // Add validateAllFields function
  const validateAllFields = (currentData) => {
    const errors = {};
    
    // Course Outcomes validation
    const outcomes = currentData?.courseOutcome?.split('\n').filter(Boolean) || [];
    if (!currentData?.courseOutcome || outcomes.length < 3) {
      errors.courseOutcome = 'At least 3 course outcomes are required';
    }

    // Prerequisites validation
    const prereqs = Array.isArray(currentData?.coursePreRequisites) ? currentData.coursePreRequisites : [];
    if (!prereqs || prereqs.length < 2) {
      errors.coursePreRequisites = 'At least 2 prerequisites are required';
    }

    // Target Audience validation
    const audience = Array.isArray(currentData?.courseAudience) ? currentData.courseAudience : [];
    if (!audience || audience.length < 2) {
      errors.courseAudience = 'At least 2 target audience entries are required';
    }

    // Description validation
    const cleanDesc = currentData?.courseDescription?.replace(/<[^>]*>/g, '').trim() || '';
    if (!cleanDesc || cleanDesc.length < 100) {
      errors.courseDescription = 'Description must be at least 100 characters';
    }

    return errors;
  };

  // Update handleChange to maintain all errors
  const handleChange = (field, value) => {
    let processedValue = value;
    
    if (field === 'coursePreRequisites') {
      processedValue = value.split('\n')
        .filter(line => line.trim())
        .map(line => ({
          preRequisiteRequired: line.replace('• ', '').trim(),
          preRequisiteLevel: 'Beginner'
        }));
    }

    const updatedAbout = {
      ...about,
      [field]: processedValue
    };

    // Update the data
    updateCourseData('about', updatedAbout);

    // If there are any existing errors, validate all fields again
    if (Object.keys(validationErrors).length > 0) {
      const newErrors = validateAllFields(updatedAbout);
      setValidationErrors(newErrors);
    }
  };

  // Add blur handler for initial validation
  const handleBlur = (field) => {
    const newErrors = validateAllFields(about);
    setValidationErrors(newErrors);
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ]
  };

  const formats = [
    'bold', 'italic', 'underline',
    'list', 'bullet'
  ];

  // Initial validation on mount
  useEffect(() => {
    const errors = validateAllFields(about);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    }
  }, []); // Only run once on mount

  // Add a function to check if all fields are valid
  const areAllFieldsValid = () => {
    const requiredFields = [
      'courseOutcome',
      'coursePreRequisites',
      'courseAudience',
      'courseDescription'
    ];

    return requiredFields.every(field => !validationErrors[field]);
  };

  return (
    <div className="max-w-[800px] mx-auto mt-5 p-4">
      {/* What will you get */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          What Audience will get ?* 
        </label>
        <textarea
          value={about?.courseOutcome ? about.courseOutcome.split('\n').map(line => `• ${line.replace('• ', '')}`).join('\n') : ''}
          onChange={(e) => {
            const outcomes = e.target.value
              .split('\n')
              .map(line => line.replace('• ', ''))
              .filter(Boolean)
              .join('\n');
            handleChange('courseOutcome', outcomes);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const target = e.target;
              const value = target.value;
              const cursorPos = target.selectionStart;
              
              const newValue = value.slice(0, cursorPos) + '\n• ' + value.slice(cursorPos);
              target.value = newValue;
              
              const event = new Event('input', { bubbles: true });
              target.dispatchEvent(event);
              
              target.selectionStart = target.selectionEnd = cursorPos + 3;
            }
          }}
          className={`w-full rounded p-[16px] border ${
            validationErrors?.courseOutcome 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-[#D1D5DB] focus:border-[#bbbfc4]'
          } h-[100px] focus:outline-none placeholder:text-sm placeholder:text-gray-400`}
          rows={4}
          placeholder={`• Example :
• Gain UX skills you can immediately apply to improve your projects and career
• Learn how to conduct effective and useful research
`}
        />
        {validationErrors?.courseOutcome && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.courseOutcome}
          </p>
        )}
      </div>

      {/* Prerequisites */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          Prerequisites * 
        </label>
        <div >
          <textarea
            value={getPreRequisitesText()}
            onChange={(e) => handleChange('coursePreRequisites', e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const target = e.target;
                const value = target.value;
                const cursorPos = target.selectionStart;
                
                const newValue = value.slice(0, cursorPos) + '\n• ' + value.slice(cursorPos);
                target.value = newValue;
                
                const event = new Event('input', { bubbles: true });
                target.dispatchEvent(event);
                
                target.selectionStart = target.selectionEnd = cursorPos + 3;
              }
            }}
            className={`w-full rounded p-[16px] border ${
              validationErrors?.coursePreRequisites 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-[#D1D5DB] focus:border-[#bbbfc4]'
            } h-[100px] focus:outline-none placeholder:text-sm placeholder:text-gray-400`}
            rows={4}
            
            placeholder={`• Example :
• Basic understanding of HTML and CSS
• Familiarity with JavaScript programming concepts
`}
          />
          {validationErrors?.coursePreRequisites && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.coursePreRequisites}
            </p>
          )}
        </div>
      </div>

      {/* Who can enroll for this course */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          Who can enrol for this course * 
        </label>
        <div>
          <textarea
            value={about?.courseAudience ? about.courseAudience.join('\n') : ''}
            onChange={(e) => {
              const audiences = e.target.value
                .split('\n')
                .filter(line => line.trim());
              handleChange('courseAudience', audiences);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const target = e.target;
                const value = target.value;
                const cursorPos = target.selectionStart;
                
                const newValue = value.slice(0, cursorPos) + '\n• ' + value.slice(cursorPos);
                target.value = newValue;
                
                const event = new Event('input', { bubbles: true });
                target.dispatchEvent(event);
                
                target.selectionStart = target.selectionEnd = cursorPos + 3;
              }
            }}
            className={`w-full rounded p-[16px] border ${
              validationErrors?.courseAudience 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-[#D1D5DB] focus:border-[#bbbfc4]'
            } h-[100px] focus:outline-none placeholder:text-sm placeholder:text-gray-400`}
            rows={4}
            placeholder={`• Example :
• Students interested in learning web development
• Beginners looking to start a career in programming `}
          />
          {validationErrors?.courseAudience && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.courseAudience}
            </p>
          )}
        </div>
      </div>

      {/* Most useful reviews if any */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          Most useful reviews if any *
        </label>
        <div className="relative">
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full rounded text-sm border border-[#D1D5DB] focus:outline-none focus:border-[#bbbfc4] bg-white cursor-pointer flex justify-between items-center"
            style={{ padding: '8px 16px 8px 16px' }}
          >
            <span className="text-gray-500">
              {selectedReviews.length ? `${selectedReviews.length} reviews selected` : 'Select Top 10 reviews to Display'}
            </span>
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {reviews.map(review => (
                <div 
                  key={review.id}
                  className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleReviewSelect(review.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedReviews.includes(review.id)}
                    onChange={() => {}}
                    className="mr-3 h-4 w-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.author}</span>
                      <span className="text-yellow-500">({review.rating}★)</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{review.review}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          Description *
        </label>
        <ReactQuill
          value={about.courseDescription || ''}
          onChange={(content) => handleChange('courseDescription', content)}
          modules={modules}
          formats={formats}
          className={`${
            validationErrors?.courseDescription 
              ? 'border-red-500' 
              : 'border-[#D1D5DB]'
          } h-[110px] mb-12`}
          placeholder={`Example:
User Experience, or UX, is an exciting field. It's essentially about empowering people to do the things they want to do, which is both fun and gratifying.`}
          theme="snow"
        />
        {validationErrors?.courseDescription && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.courseDescription}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
   
    </div>
  );
}

export default AboutCourse;