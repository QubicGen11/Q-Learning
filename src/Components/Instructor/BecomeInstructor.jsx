import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BecomeInstructor = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    courseType: '',
    courseTitle: '',
    category: '',
    timeCommitment: ''
  });
  
  const navigate = useNavigate();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    navigate('/mainadmin');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Choose Your Teaching Format</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setFormData({...formData, courseType: 'course'});
                  handleNext();
                }}
                className="p-6 border rounded-lg hover:border-purple-500 transition-all"
              >
                <div className="text-xl mb-2">Full Course</div>
                <p className="text-gray-600">Build comprehensive learning journeys with interactive lessons, hands-on projects, and assessments.</p>
              </button>
              <button
                onClick={() => {
                  setFormData({...formData, courseType: 'practice-test'});
                  handleNext();
                }}
                className="p-6 border rounded-lg hover:border-purple-500 transition-all"
              >
                <div className="text-xl mb-2">Skill Assessment</div>
                <p className="text-gray-600">Create focused practice sets and mock exams to help learners master specific skills.</p>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Name Your Learning Experience</h1>
            <p className="mb-4 text-gray-600">Choose a title that captures attention. Don't worry, you can perfect it later.</p>
            <input
              type="text"
              placeholder="e.g. Master Modern Web Development with React"
              className="w-full p-3 border rounded-lg"
              maxLength={60}
              onChange={(e) => setFormData({...formData, courseTitle: e.target.value})}
            />
            <div className="mt-6 flex justify-between">
              <button onClick={handlePrevious} className="px-4 py-2 border rounded">Previous</button>
              <button onClick={handleNext} className="px-4 py-2 bg-purple-600 text-white rounded">Continue</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Select Your Area of Expertise</h1>
            <p className="mb-4 text-gray-600">Choose the category that best matches your content. You can refine this later.</p>
            <select 
              className="w-full p-3 border rounded-lg"
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select a category</option>
              <option value="development">Programming & Development</option>
              <option value="business">Business & Entrepreneurship</option>
              <option value="finance">Finance & Analytics</option>
              <option value="it-software">Tech & Software</option>
              <option value="design">Digital Design & Creative</option>
            </select>
            <div className="mt-6 flex justify-between">
              <button onClick={handlePrevious} className="px-4 py-2 border rounded">Previous</button>
              <button onClick={handleNext} className="px-4 py-2 bg-purple-600 text-white rounded">Continue</button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">What's Your Availability Like?</h1>
            <p className="mb-4 text-gray-600">Let us know your schedule so we can help you plan your course creation journey.</p>
            <div className="space-y-3">
              {[
                { value: '0-2', label: "Just getting started (0-2 hours weekly)" },
                { value: '2-4', label: "Part-time creator (2-4 hours weekly)" },
                { value: '5+', label: "Dedicated instructor (5+ hours weekly)" },
                { value: 'undecided', label: "Still planning my schedule" }
              ].map((option) => (
                <div 
                  key={option.value}
                  className="p-4 border rounded-lg cursor-pointer hover:border-purple-500"
                  onClick={() => {
                    setFormData({...formData, timeCommitment: option.value});
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <button onClick={handlePrevious} className="px-4 py-2 border rounded">Back</button>
              <button 
                onClick={handleSubmit} 
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
                Launch Your Course
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <div className="text-sm text-gray-600">
            Step {step} of 4
          </div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default BecomeInstructor;