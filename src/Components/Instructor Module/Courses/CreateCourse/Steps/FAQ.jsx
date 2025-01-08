import React, { useState, useEffect } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import { toast } from 'react-hot-toast';

function FAQ() {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const [localFaqs, setLocalFaqs] = useState([]);
  const [collapsedFaqs, setCollapsedFaqs] = useState(new Set());

  // Initialize and sync with courseData
  useEffect(() => {
    let initialFaqs = courseData.courseFaqs || [];
    setLocalFaqs(initialFaqs);
  }, [courseData.courseFaqs]);

  const handleAddQuestion = () => {
    const newFaq = { question: '', answer: '' };
    const updatedFaqs = [...localFaqs, newFaq];
    setLocalFaqs(updatedFaqs);
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

  const toggleFaq = (index) => {
    const newCollapsed = new Set(collapsedFaqs);
    if (newCollapsed.has(index)) {
      newCollapsed.delete(index);
    } else {
      newCollapsed.add(index);
    }
    setCollapsedFaqs(newCollapsed);
  };

  return (
    <div className="bg-white rounded-lg p-6 ">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">FAQs</h2>
        <button 
          onClick={handleAddQuestion}
          className="flex items-center gap-2 text-[#0056B3] hover:text-blue-700"
        >
          <span className="material-icons text-lg">add</span>
          Add Question
        </button>
      </div>

      <div className="space-y-4 max-w-[700px] mx-auto ">
        {localFaqs.map((faq, index) => (
          <div key={index} className="border rounded-lg shadow-sm">
            <div className="flex items-center p-4 border-b bg-[#f3f4f6]">
              <div className="flex items-center gap-3 flex-1">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0056B3] text-white text-sm">
                  {index + 1}
                </span>
                <span className="text-gray-700">
                  {faq.question || `Question ${index + 1}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleRemoveQuestion(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <span className="material-icons">delete</span>
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
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question
                    </label>
                    <input
                      type="text"
                      placeholder="Enter question here..."
                      className="w-full px-3 py-2 border rounded-lg focus:ring-[#0056B3] focus:border-[#0056B3]"
                      value={faq.question}
                      onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Answer
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-lg focus:ring-[#0056B3] focus:border-[#0056B3] min-h-[100px]"
                      placeholder="Type your answer here..."
                      value={faq.answer}
                      onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                    />
                  </div>

              
                </div>
              </div>
            )}
          </div>
        ))}

        {localFaqs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No FAQs added yet. Click "Add Question" to get started.
          </div>
        )}
      </div>
    </div>
  );
}

export default FAQ; 