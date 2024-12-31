import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AssignmentView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { chapterName, assignmentNumber, questions } = location.state || {};
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!questions) {
    return <div>No assignment data found</div>;
  }

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: option
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Handle submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Course
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">Assignment {assignmentNumber}: {chapterName}</h1>
          <p className="text-gray-600 mb-4">Complete all questions to proceed</p>
        </div>

        <div className="space-y-6">
          {questions.map((questionObj, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">
                Question {index + 1}: {questionObj.question.question}
              </h3>
              <div className="space-y-3">
                {questionObj.question.options.map((option, optionIndex) => (
                  <div 
                    key={optionIndex}
                    onClick={() => !isSubmitted && handleOptionSelect(index, option)}
                    className={`p-4 rounded-lg cursor-pointer border transition-colors
                      ${selectedAnswers[index] === option ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                      ${isSubmitted ? 'cursor-default' : 'hover:border-gray-300'}
                      ${isSubmitted && option.isCorrect ? 'bg-green-50 border-green-500' : ''}
                      ${isSubmitted && selectedAnswers[index] === option && !option.isCorrect ? 'bg-red-50 border-red-500' : ''}
                    `}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                        ${selectedAnswers[index] === option ? 'border-blue-500' : 'border-gray-300'}
                        ${isSubmitted && option.isCorrect ? 'border-green-500' : ''}
                        ${isSubmitted && selectedAnswers[index] === option && !option.isCorrect ? 'border-red-500' : ''}
                      `}>
                        {selectedAnswers[index] === option && (
                          <div className={`w-3 h-3 rounded-full
                            ${isSubmitted && option.isCorrect ? 'bg-green-500' : ''}
                            ${isSubmitted && !option.isCorrect ? 'bg-red-500' : 'bg-blue-500'}
                          `} />
                        )}
                      </div>
                      <span>{option.option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!isSubmitted && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Assignment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentView; 