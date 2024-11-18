import React, { useState, useRef, useEffect } from 'react';

const Questions = ({ courseId }) => {
  // Use useRef to maintain state reference
  const questionsRef = useRef([
    {
      id: 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }
  ]);

  // Use state for rendering
  const [questions, setQuestions] = useState(questionsRef.current);

  // Update both state and ref when questions change
  const updateQuestions = (newQuestions) => {
    questionsRef.current = newQuestions;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newQuestions = [
      ...questionsRef.current,
      {
        id: questionsRef.current.length + 1,
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ];
    updateQuestions(newQuestions);
  };

  const handleQuestionChange = (questionId, field, value, optionIndex = null, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const newQuestions = questionsRef.current.map(q => {
      if (q.id === questionId) {
        if (optionIndex !== null) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return { ...q, [field]: value };
      }
      return q;
    });
    updateQuestions(newQuestions);
  };

  const handleDeleteQuestion = (questionId, e) => {
    e.preventDefault();
    e.stopPropagation();
    const newQuestions = questionsRef.current.filter(q => q.id !== questionId);
    updateQuestions(newQuestions);
  };

  // Optional: Save questions when component unmounts
  useEffect(() => {
    return () => {
      // Save questions to backend or localStorage
      console.log('Saving questions:', questionsRef.current);
    };
  }, []);

  return (
    <div className="p-6" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Course Questions</h2>
        <button
          onClick={handleAddQuestion}
          className="bg-[#5624D0] text-white px-4 py-2 rounded-md hover:bg-[#4B1F9E]"
        >
          Add Question
        </button>
      </div>

      <div className="space-y-6">
        {questions.map((question, qIndex) => (
          <div 
            key={question.id} 
            className="bg-white p-6 rounded-lg shadow-sm border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold">Question {qIndex + 1}</h3>
              <button
                onClick={(e) => handleDeleteQuestion(question.id, e)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Question Text</label>
                <textarea
                  value={question.question}
                  onChange={(e) => handleQuestionChange(question.id, 'question', e.target.value, null, e)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  placeholder="Enter your question"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                  <div key={index} onClick={(e) => e.stopPropagation()}>
                    <label className="block text-sm font-medium mb-2">
                      Option {index + 1}
                      {question.correctAnswer === index && 
                        <span className="text-green-500 ml-2">(Correct)</span>
                      }
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleQuestionChange(
                          question.id,
                          'options',
                          e.target.value,
                          index,
                          e
                        )}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 p-2 border rounded-md"
                        placeholder={`Option ${index + 1}`}
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleQuestionChange(question.id, 'correctAnswer', index);
                        }}
                        className={`px-3 py-1 rounded-md ${
                          question.correctAnswer === index
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        ✓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions; 