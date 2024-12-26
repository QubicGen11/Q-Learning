import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FAQ() {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: '',
      answer: [
        'People who want to enter the UX field and become practitioners',
        'Professionals who want or need to add UX to their skill set',
        'Points',
        'Points',
        'Points'
      ]
    }
  ]);

  const handleAddQuestion = () => {
    setFaqs([...faqs, {
      id: faqs.length + 1,
      question: '',
      answer: []
    }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-blue-600 cursor-pointer">Courses</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Add Course</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm border rounded-lg">
            Save as Draft
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg">
            Submit for review
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6 flex justify-between items-center bg-white px-4 rounded-lg">
        <div className="flex gap-8">
          <button className="py-4 px-1 text-gray-500">
            Basic Information
          </button>
          <button className="py-4 px-1 text-blue-600 border-b-2 border-blue-600">
            Course Content
          </button>
          <button className="py-4 px-1 text-gray-500">
            Settings
          </button>
        </div>
        <div className="flex justify-between space-x-4">
        <button
          onClick={() => navigate('/instructor/courses/content')}
          className="flex items-center gap-2 text-[#0056B3] bg-[#F3F4F6] px-2 py-2 rounded-lg"
        >
          <span className="material-icons">arrow_back</span>
          Previous
        </button>
        <button
          onClick={() => navigate('/instructor/courses/settings')}
          className="flex items-center gap-2 text-[#0056B3] bg-[#F3F4F6] px-2 py-2 rounded-lg"
        >
          Next Settings
          <span className="material-icons">arrow_forward</span>
        </button>
      </div>
      </div>

      {/* Steps Progress */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex justify-between">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
              1
            </div>
            <div>
              <h3 className="font-medium">Content</h3>
              <p className="text-sm text-gray-500">Videos, PDFs and content for course</p>
            </div>
          </div>

          <div className="flex-1 border-t-2 border-gray-200 mt-4 mx-8" />

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
              2
            </div>
            <div>
              <h3 className="font-medium">FAQs</h3>
              <p className="text-sm text-gray-500">Q&A for Quick clarifications</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
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
          {faqs.map((faq) => (
            <div key={faq.id} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  placeholder="What is question here..."
                  className="w-full px-4 py-2 border rounded-lg text-sm"
                  value={faq.question}
                  onChange={(e) => {
                    const updatedFaqs = faqs.map(f => 
                      f.id === faq.id ? { ...f, question: e.target.value } : f
                    );
                    setFaqs(updatedFaqs);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Answer *
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg text-sm min-h-[120px]"
                  value={faq.answer.join('\n')}
                  onChange={(e) => {
                    const updatedFaqs = faqs.map(f => 
                      f.id === faq.id ? { ...f, answer: e.target.value.split('\n') } : f
                    );
                    setFaqs(updatedFaqs);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
     
    </div>
  );
}

export default FAQ; 