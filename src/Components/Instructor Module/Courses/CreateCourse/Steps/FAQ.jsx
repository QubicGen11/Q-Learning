import React from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';

function FAQ() {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const { faq } = courseData;

  const handleAddQuestion = () => {
    const newFaq = {
      id: (faq?.length || 0) + 1,
      question: '',
      answer: ''
    };
    
    updateCourseData('faq', [...(faq || []), newFaq]);
  };

  const handleQuestionChange = (id, field, value) => {
    const updatedFaqs = faq.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    
    updateCourseData('faq', updatedFaqs);
  };

  const handleRemoveQuestion = (id) => {
    const updatedFaqs = faq.filter(item => item.id !== id);
    updateCourseData('faq', updatedFaqs);
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
        {faq?.map((item) => (
          <div key={item.id} className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  placeholder="What is question here..."
                  className="w-full px-4 py-2 border rounded-lg text-sm"
                  value={item.question}
                  onChange={(e) => handleQuestionChange(item.id, 'question', e.target.value)}
                />
              </div>
              <button 
                onClick={() => handleRemoveQuestion(item.id)}
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
                value={item.answer}
                onChange={(e) => handleQuestionChange(item.id, 'answer', e.target.value)}
                placeholder="Type your answer here..."
              />
            </div>
          </div>
        ))}

        {(!faq || faq.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            No FAQs added yet. Click "Add Question" to get started.
          </div>
        )}
      </div>
    </div>
  );
}

export default FAQ; 