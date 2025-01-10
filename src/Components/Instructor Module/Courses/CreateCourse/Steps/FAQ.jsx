import React, { useState, useEffect } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import { toast } from 'react-hot-toast';
import { BsQuestionOctagon } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdContentCopy } from 'react-icons/md';

function FAQ() {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const [localFaqs, setLocalFaqs] = useState([]);
  const [collapsedFaqs, setCollapsedFaqs] = useState(new Set());

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

  const handleCopyFaq = (index) => {
    const faqToCopy = localFaqs[index];
    const updatedFaqs = [...localFaqs, { ...faqToCopy }];
    setLocalFaqs(updatedFaqs);
    updateCourseData('courseFaqs', updatedFaqs);
  };

  const handleRemoveQuestion = (index) => {
    const updatedFaqs = localFaqs.filter((_, i) => i !== index);
    setLocalFaqs(updatedFaqs);
    updateCourseData('courseFaqs', updatedFaqs);
    toast.success('FAQ removed successfully');
  };

  const toggleFaq = (index) => {
    setCollapsedFaqs(prev => {
      const newCollapsed = new Set(prev);
      if (newCollapsed.has(index)) {
        newCollapsed.delete(index);
      } else {
        newCollapsed.add(index);
      }
      return newCollapsed;
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedFaqs = localFaqs.map((faq, i) =>
      i === index ? { ...faq, [field]: value } : faq
    );
    setLocalFaqs(updatedFaqs);
    updateCourseData('courseFaqs', updatedFaqs);
  };

  return (
    <div className="bg-white rounded-lg p-6 h-[calc(100vh-280px)] flex justify-center items-center">
      <div className="flex h-full w-[830px] h-[700px]">
        <div className="flex-1 pl-6 h-full overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
              <h2 className="font-[700] text-2xl text-gray-600">Frequently Asked Questions</h2>
              <div className="flex items-center gap-4">
                {localFaqs.length > 0 && (
                  <button
                    onClick={() => {
                      if (localFaqs.some((_, idx) => !collapsedFaqs.has(idx))) {
                        setCollapsedFaqs(new Set(localFaqs.map((_, idx) => idx)));
                      } else {
                        setCollapsedFaqs(new Set());
                      }
                    }}
                    className="text-[#0056B3] hover:text-[#004494] flex items-center gap-1"
                  >
                    <span className="material-icons text-sm">
                      {localFaqs.some((_, idx) => !collapsedFaqs.has(idx)) 
                        ? 'unfold_less' 
                        : 'unfold_more'
                      }
                    </span>
                    {localFaqs.some((_, idx) => !collapsedFaqs.has(idx))
                      ? 'Collapse All'
                      : 'Expand All'
                    }
                  </button>
                )}
                <button
                  onClick={handleAddQuestion}
                  className="text-[#0056B3] hover:text-[#004494] flex items-center gap-1"
                >
                  <span className="material-icons text-sm">add_circle_outline</span>
                  {localFaqs.length > 0 ? 'Add Another' : 'Add FAQ'}
                </button>
              </div>
            </div>

            <div className="space-y-2 overflow-y-auto pr-2 flex-grow">
              {!localFaqs.length ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <p className="text-gray-500 text-3xl">Add FAQs to display</p>
                </div>
              ) : (
                localFaqs.map((faq, index) => (
                  <div key={index} className="border rounded-lg bg-white shadow-sm">
                    <div className="flex justify-between items-center p-4 border-b bg-[#f3f4f6]">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <BsQuestionOctagon className="text-[#0056B3] font-extrabold text-xl" />
                          <span className="text-lg font-[700]">FAQ {index + 1}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyFaq(index)}
                          className="text-gray-500 hover:text-gray-700"
                          title="Copy FAQ"
                        >
                          <MdContentCopy className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleRemoveQuestion(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <RiDeleteBinLine className="text-lg" />
                        </button>
                        <button
                          onClick={() => toggleFaq(index)}
                          className="text-gray-500"
                        >
                          <span className="material-icons">
                            {collapsedFaqs.has(index) ? 'expand_more' : 'expand_less'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {!collapsedFaqs.has(index) && (
                      <div className="p-4 space-y-4">
                        <div className="space-y-2">
                          <label className="block text-gray-700 text-sm mb-1">
                            Question *
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your question"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                            value={faq.question}
                            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-gray-700 text-sm mb-1">
                            Answer *
                          </label>
                          <textarea
                            className="w-full p-2 border rounded min-h-[100px] focus:outline-none focus:ring-2 focus:ring-gray-600"
                            placeholder="Enter your answer"
                            value={faq.answer}
                            onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ; 