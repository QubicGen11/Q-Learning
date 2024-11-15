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
    navigate('/course-manager');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">First, let's find out what type of course you're making.</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setFormData({...formData, courseType: 'course'});
                  handleNext();
                }}
                className="p-6 border rounded-lg hover:border-purple-500 transition-all"
              >
                <div className="text-xl mb-2">Course</div>
                <p className="text-gray-600">Create rich learning experiences with video lectures, quizzes, coding exercises, etc.</p>
              </button>
              <button
                onClick={() => {
                  setFormData({...formData, courseType: 'practice-test'});
                  handleNext();
                }}
                className="p-6 border rounded-lg hover:border-purple-500 transition-all"
              >
                <div className="text-xl mb-2">Practice Test</div>
                <p className="text-gray-600">Help students prepare for certification exams by providing practice questions.</p>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">How about a working title?</h1>
            <p className="mb-4 text-gray-600">It's ok if you can't think of a good title now. You can change it later.</p>
            <input
              type="text"
              placeholder="e.g. Learn Python Programming from Scratch"
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
            <h1 className="text-3xl font-bold mb-4">What category best fits the knowledge you'll share?</h1>
            <p className="mb-4 text-gray-600">If you're not sure about the right category, you can change it later.</p>
            <select 
              className="w-full p-3 border rounded-lg"
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Choose a category</option>
              <option value="development">Development</option>
              <option value="business">Business</option>
              <option value="finance">Finance</option>
              <option value="it-software">IT & Software</option>
              <option value="design">Design</option>
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
            <h1 className="text-3xl font-bold mb-4">How much time can you spend creating your course per week?</h1>
            <p className="mb-4 text-gray-600">There's no wrong answer. We can help you achieve your goals even if you don't have much time.</p>
            <div className="space-y-3">
              {[
                { value: '0-2', label: "I'm very busy right now (0-2 hours)" },
                { value: '2-4', label: "I'll work on this on the side (2-4 hours)" },
                { value: '5+', label: "I have lots of flexibility (5+ hours)" },
                { value: 'undecided', label: "I haven't yet decided if I have time" }
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
              <button onClick={handlePrevious} className="px-4 py-2 border rounded">Previous</button>
              <button 
                onClick={handleSubmit} 
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
                Create Course
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