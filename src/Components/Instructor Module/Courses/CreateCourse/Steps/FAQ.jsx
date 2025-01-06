import React, { useState, useEffect } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import { toast } from 'react-hot-toast';

function FAQ() {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const [localFaqs, setLocalFaqs] = useState([]);
  const [collapsedFaqs, setCollapsedFaqs] = useState(new Set());

  // Initialize and sync with courseData
  useEffect(() => {
    let initialFaqs = [];
    if (courseData.courseFaqs) {
      if (Array.isArray(courseData.courseFaqs)) {
        initialFaqs = courseData.courseFaqs;
      } else if (typeof courseData.courseFaqs === 'object') {
        initialFaqs = Object.values(courseData.courseFaqs);
      }
    }
    setLocalFaqs(initialFaqs);
  }, []);

  const toggleFaq = (index) => {
    const newCollapsed = new Set(collapsedFaqs);
    if (newCollapsed.has(index)) {
      newCollapsed.delete(index);
    } else {
      newCollapsed.add(index);
    }
    setCollapsedFaqs(newCollapsed);
  };

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
    <div className="bg-white rounded-lg p-6 ">
      <div className="flex items-center justify-between mb-6 max-w-[800px]">
        <h2 className="font-medium">Frequently Asked Questions</h2>
        <button 
          onClick={() => handleAddQuestion()}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
        >
          <span className="material-icons text-sm">add_circle_outline</span>
          Add Question
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4">
        {Array.isArray(localFaqs) && localFaqs.map((item, index) => (
          <div key={index} className="border rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-gray-600">Question {index + 1}</span>
                <input
                  type="text"
                  placeholder="What is question here..."
                  className="flex-1 p-2 border rounded"
                  value={item.question || ''}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleRemoveQuestion(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <span className="material-icons">delete_outline</span>
                </button>
                <button 
                  onClick={() => toggleFaq(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="material-icons">
                    {collapsedFaqs.has(index) ? 'expand_more' : 'expand_less'}
                  </span>
                </button>
              </div>
            </div>
            
            {!collapsedFaqs.has(index) && (
              <div className="p-4">
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
            )}
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