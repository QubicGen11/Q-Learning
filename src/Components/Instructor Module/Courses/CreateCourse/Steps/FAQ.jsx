import React, { useState, useEffect } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import { toast } from 'react-hot-toast';

function FAQ() {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const [localFaqs, setLocalFaqs] = useState([]);

  // Initialize and sync with courseData
  useEffect(() => {
    // Convert to array if it's an object
    let initialFaqs = [];
    if (courseData.courseFaqs) {
      if (Array.isArray(courseData.courseFaqs)) {
        initialFaqs = courseData.courseFaqs;
      } else if (typeof courseData.courseFaqs === 'object') {
        // Convert object to array
        initialFaqs = Object.values(courseData.courseFaqs);
      }
    }
    setLocalFaqs(initialFaqs);
  }, []);

  const handleAddQuestion = () => {
    const newFaq = {
      question: '',
      answer: ''
    };
    
    const updatedFaqs = [...localFaqs, newFaq];
    setLocalFaqs(updatedFaqs);
    // Ensure we're sending an array
    updateCourseData('courseFaqs', updatedFaqs);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedFaqs = localFaqs.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    
    setLocalFaqs(updatedFaqs);
    // Ensure we're sending an array
    updateCourseData('courseFaqs', updatedFaqs);
  };

  const handleRemoveQuestion = (index) => {
    const updatedFaqs = localFaqs.filter((_, i) => i !== index);
    setLocalFaqs(updatedFaqs);
    // Ensure we're sending an array
    updateCourseData('courseFaqs', updatedFaqs);
  };

  const handleSaveFaqs = () => {
    // Ensure we're sending an array
    updateCourseData('courseFaqs', [...localFaqs]);
    toast.success('FAQs saved successfully');
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-medium">Frequently Asked Questions</h2>
        <button 
          onClick={handleAddQuestion}
          className="flex items-center gap-1 text-blue-600 text-sm"
        >
          <span className="material-icons text-sm">add_circle_outline</span>
          Add Question
        </button>
      </div>

      <div className="space-y-6">
        {Array.isArray(localFaqs) && localFaqs.map((item, index) => (
          <div key={index} className="space-y-4 border p-4 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  placeholder="What is question here..."
                  className="w-full px-4 py-2 border rounded-lg text-sm"
                  value={item.question || ''}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                />
              </div>
              <button 
                onClick={() => handleRemoveQuestion(index)}
                className="mt-8 text-gray-400 hover:text-gray-600"
              >
                <span className="material-icons text-sm">close</span>
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Answer *
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg text-sm min-h-[120px]"
                value={item.answer || ''}
                onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                placeholder="Type your answer here..."
              />
            </div>
          </div>
        ))}

        {(!localFaqs || localFaqs.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            No FAQs added yet. Click "Add Question" to get started.
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSaveFaqs}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save FAQs
        </button>
      </div>
    </div>
  );
}

export default FAQ; 