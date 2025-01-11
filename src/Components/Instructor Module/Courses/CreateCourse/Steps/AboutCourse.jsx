import React, { useState } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import { toast } from 'react-hot-toast';
import './Aboucourse.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AboutCourse() {
  const { courseData, updateCourseData, setStep, currentStep } = useCourseCreationStore();
  
  // Add this to ensure about object exists
  const about = courseData?.about || {
    courseOutcome: '',
    coursePreRequisites: [],
    courseAudience: [],
    courseDescription: '',
    reviews: []
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

  const handleChange = (field, value) => {
    console.log(`Updating ${field}:`, value);
    
    // Create a new about object with existing or default values
    const updatedAbout = {
      ...about,
      courseOutcome: about.courseOutcome || '',
      coursePreRequisites: about.coursePreRequisites || [],
      courseAudience: about.courseAudience || [],
      courseDescription: about.courseDescription || '',
      reviews: about.reviews || []
    };

    if (field === 'coursePreRequisites') {
      const prerequisites = value.split(',')
        .map(item => item.trim())
        .filter(Boolean)
        .map(item => ({
          preRequisiteRequired: item,
          preRequisiteLevel: 'Beginner'
        }));

      updatedAbout.coursePreRequisites = prerequisites;
    } 
    else if (field === 'courseAudience') {
      const audiences = value.split(',')
        .map(item => item.trim())
        .filter(Boolean);

      updatedAbout.courseAudience = audiences;
    }
    else {
      updatedAbout[field] = value;
    }

    updateCourseData('about', updatedAbout);
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
          className="w-full rounded p-[16px] h-[110px] border border-[#D1D5DB] focus:outline-none focus:border-[#bbbfc4] placeholder:text-sm placeholder:text-gray-400"
          rows={4}
          placeholder={`• Example :
• Gain UX skills you can immediately apply to improve your projects and career
• Learn how to conduct effective and useful research
`}
        />
      </div>

      {/* Prerequisites */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          Prerequisites * 
        </label>
        <div >
          <textarea
            value={about.coursePreRequisites?.map(prereq => `• ${prereq.preRequisiteRequired}`).join('\n') || ''}
            onChange={(e) => {
              const prerequisites = e.target.value
                .split('\n')
                .map(item => item.replace('• ', ''))
                .filter(Boolean)
                .map(item => ({
                  preRequisiteRequired: item,
                  preRequisiteLevel: 'Beginner'
                }));
              updateCourseData('about', {
                ...about,
                coursePreRequisites: prerequisites
              });
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
            className="w-full rounded p-[16px] border border-[#D1D5DB]  h-[100px] focus:outline-none focus:border-[#bbbfc4] placeholder:text-sm placeholder:text-gray-400"
            rows={4}
            
            placeholder={`• Example :
• Basic understanding of HTML and CSS
• Familiarity with JavaScript programming concepts
`}
          />
        </div>
      </div>

      {/* Who can enroll for this course */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          Who can enrol for this course * 
        </label>
        <div>
          <textarea
            value={about.courseAudience?.map(item => `• ${item}`).join('\n') || ''}
            onChange={(e) => {
              const audiences = e.target.value
                .split('\n')
                .map(item => item.replace('• ', ''))
                .filter(Boolean);
              updateCourseData('about', {
                ...about,
                courseAudience: audiences
              });
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
            className="w-full rounded p-[16px] border border-[#D1D5DB] h-[100px] focus:outline-none focus:border-[#bbbfc4] placeholder:text-sm placeholder:text-gray-400"
            rows={4}
            placeholder={`• Example :
• Students interested in learning web development
• Beginners looking to start a career in programming `}
          />
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
          className="h-[110px] mb-12"
          placeholder={`Example:
User Experience, or UX, is an exciting field. It's essentially about empowering people to do the things they want to do, which is both fun and gratifying.`}
          theme="snow"
        />
      </div>

      {/* Navigation Buttons */}
   
    </div>
  );
}

export default AboutCourse;