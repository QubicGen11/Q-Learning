import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseContent() {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([
    {
      id: 1,
      title: 'Starting Chapter 1',
      isExpanded: true,
      lessons: [
        { id: 1, title: 'Lesson 1', type: 'Video' },
        { id: 2, title: 'Lesson 2', type: 'PDF' }
      ]
    }
  ]);

  const [uploadedFiles, setUploadedFiles] = useState({
    lesson: { name: 'video_name.mp4' },
    material: { name: 'nameof.exe' }
  });

  const [selectedLesson, setSelectedLesson] = useState({
    chapterId: 1,
    lessonId: 1,
    type: 'Video'
  });

  const [quizQuestions, setQuizQuestions] = useState([
    {
      id: 1,
      questionType: 'Multiple Choice',
      question: '',
      description: '',
      hasMedia: false,
      options: ['Yes', 'No']
    }
  ]);

  const handleAddChapter = () => {
    const newChapter = {
      id: chapters.length + 1,
      title: `Chapter ${chapters.length + 1}`,
      isExpanded: false,
      lessons: []
    };
    setChapters([...chapters, newChapter]);
  };

  const handleAddLesson = (chapterId) => {
    setChapters(chapters.map(chapter => {
      if (chapter.id === chapterId) {
        const newLesson = {
          id: chapter.lessons.length + 1,
          title: `Lesson ${chapter.lessons.length + 1}`,
          type: 'Video'
        };
        return {
          ...chapter,
          lessons: [...chapter.lessons, newLesson]
        };
      }
      return chapter;
    }));
  };

  const toggleChapter = (chapterId) => {
    setChapters(chapters.map(chapter => 
      chapter.id === chapterId 
        ? { ...chapter, isExpanded: !chapter.isExpanded }
        : chapter
    ));
  };

  const handleLessonTypeChange = (chapterId, lessonId, newType) => {
    setChapters(chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          lessons: chapter.lessons.map(lesson => 
            lesson.id === lessonId 
              ? { ...lesson, type: newType }
              : lesson
          )
        };
      }
      return chapter;
    }));
    setSelectedLesson({ chapterId, lessonId, type: newType });
  };

  const handlePrevious = () => {
    navigate('/instructor/courses/create'); // Goes back to Basic Information
  };

  const handleNext = () => {
    navigate('/instructor/courses/faq'); // Goes to FAQ section
  };

  const addNewQuestion = () => {
    setQuizQuestions([
      ...quizQuestions,
      {
        id: quizQuestions.length + 1,
        questionType: 'Multiple Choice',
        question: '',
        description: '',
        hasMedia: false,
        options: ['Yes', 'No']
      }
    ]);
  };

  const handleQuestionChange = (questionId, field, value) => {
    setQuizQuestions(quizQuestions.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const renderLessonContent = (type) => {
    switch(type) {
      case 'Video':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Lessons *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center">
                  <img src="/path-to-upload-icon.svg" alt="" className="mb-2" />
                  <p className="text-gray-500 mb-1">Or Drag and Drop</p>
                  <p className="text-sm text-gray-400">MP4, MKW... up to 1MB</p>
                  <button className="mt-4 px-4 py-1.5 bg-gray-100 text-sm rounded">
                    Browse
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Materials *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center">
                  <img src="/path-to-upload-icon.svg" alt="" className="mb-2" />
                  <p className="text-gray-500 mb-1">Or Drag and Drop</p>
                  <p className="text-sm text-gray-400">PDF, DOC... up to 1MB</p>
                  <button className="mt-4 px-4 py-1.5 bg-gray-100 text-sm rounded">
                    Browse
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'PDF':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Content *
              </label>
              <textarea
                className="w-full h-64 p-4 border rounded-lg text-sm resize-none"
                placeholder="Enter your content here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Materials *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center">
                  <img src="/path-to-upload-icon.svg" alt="" className="mb-2" />
                  <p className="text-gray-500 mb-1">Or Drag and Drop</p>
                  <p className="text-sm text-gray-400">PDF, DOC... up to 1MB</p>
                  <button className="mt-4 px-4 py-1.5 bg-gray-100 text-sm rounded">
                    Browse
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Quiz':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">Quiz</h3>
              <button 
                onClick={addNewQuestion}
                className="text-blue-600 flex items-center gap-1"
              >
                <span className="material-icons text-sm">add_circle_outline</span>
                Add Question
              </button>
            </div>

            {quizQuestions.map((question, index) => (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Question {question.id}</span>
                    <select 
                      className="text-sm border rounded px-2 py-1"
                      value={question.questionType}
                      onChange={(e) => handleQuestionChange(question.id, 'questionType', e.target.value)}
                    >
                      <option>Multiple Choice</option>
                      <option>Open Ended</option>
                      <option>Dropdown</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1">
                      <span className="material-icons text-gray-400">content_copy</span>
                    </button>
                    <button 
                      className="p-1"
                      onClick={() => setQuizQuestions(quizQuestions.filter(q => q.id !== question.id))}
                    >
                      <span className="material-icons text-gray-400">delete</span>
                    </button>
                    <button className="p-1">
                      <span className="material-icons text-gray-400">unfold_less</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Question *"
                    className="w-full p-2 border rounded text-sm"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(question.id, 'question', e.target.value)}
                  />
                  <textarea
                    placeholder="Description"
                    className="w-full p-2 border rounded text-sm"
                    rows="3"
                    value={question.description}
                    onChange={(e) => handleQuestionChange(question.id, 'description', e.target.value)}
                  />
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id={`addImage-${question.id}`}
                      checked={question.hasMedia}
                      onChange={(e) => handleQuestionChange(question.id, 'hasMedia', e.target.checked)}
                    />
                    <label htmlFor={`addImage-${question.id}`} className="text-sm">
                      Add Image or Video
                    </label>
                  </div>

                  {question.hasMedia && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <div className="flex flex-col items-center">
                        <p className="text-gray-500 mb-1">Drag and Drop Or Browse</p>
                        <p className="text-sm text-gray-400">MP4, MKW, PNG, JPG(up to 20MB)</p>
                        <button className="mt-4 px-4 py-1.5 bg-gray-100 text-sm rounded">
                          Browse
                        </button>
                      </div>
                    </div>
                  )}

                  {question.questionType === 'Multiple Choice' && (
                    <div className="space-y-2">
                      {question.options.map((option, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name={`question-${question.id}`} 
                            id={`option-${question.id}-${idx}`}
                          />
                          <input
                            type="text"
                            className="flex-1 p-2 border rounded text-sm"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...question.options];
                              newOptions[idx] = e.target.value;
                              handleQuestionChange(question.id, 'options', newOptions);
                            }}
                          />
                          <button 
                            onClick={() => {
                              const newOptions = question.options.filter((_, i) => i !== idx);
                              handleQuestionChange(question.id, 'options', newOptions);
                            }}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <span className="material-icons text-sm">close</span>
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={() => {
                          const newOptions = [...question.options, ''];
                          handleQuestionChange(question.id, 'options', newOptions);
                        }}
                        className="text-blue-600 text-sm flex items-center gap-1"
                      >
                        <span className="material-icons text-sm">add_circle_outline</span>
                        Add Option
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with breadcrumb and buttons */}
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
      <div className="border-b border-gray-200 mb-6 bg-white p-2 rounded-lg flex justify-between items-center">
        <div className="flex gap-8">
          <button className="py-4 px-1 text-gray-500">
            Basic Information
          </button>
          <button className="py-4 px-1 -mb-px text-blue-600 border-b-2 border-blue-600 font-medium">
            Course Content
          </button>
          <button className="py-4 px-1 text-gray-500">
            Settings
          </button>
        </div>
        <div className="flex justify-between space-x-4">
        <button
          onClick={handlePrevious}
          className="flex items-center gap-2 text-[#0056B3] hover:text-blue-700 bg-[#F3F4F6] px-3 py-1.5 rounded-lg"
        >
          <span className="material-icons">arrow_back</span>
          Previous
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 text-[#0056B3] hover:text-blue-700 bg-[#F3F4F6] px-3 py-1.5 rounded-lg"
        >
          Next
          <span className="material-icons">arrow_forward</span>
        </button>
      </div>
      </div>

      {/* Steps Progress */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex justify-between">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
              1
            </div>
            <div>
              <h3 className="font-medium">Content</h3>
              <p className="text-sm text-gray-500">Videos, PDFs and content for course</p>
            </div>
          </div>

          <div className="flex-1 border-t-2 border-gray-200 mt-4 mx-8" />

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-sm">
              2
            </div>
            <div>
              <h3 className="font-medium">FAQs</h3>
              <p className="text-sm text-gray-500">Q&A for Quick clarifications</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex gap-6">
        {/* Left Sidebar - Curriculum */}
        <div className="w-1/3 bg-white rounded-lg p-4">
          <h2 className="font-medium mb-4">Curriculum</h2>
          <button 
            onClick={handleAddChapter}
            className="flex items-center gap-2 text-blue-600 mb-4 text-sm"
          >
            <span className="material-icons text-sm">add_circle_outline</span>
            Add Chapter
          </button>

          <div className="space-y-2">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="border rounded-lg">
                <div 
                  className="flex items-center justify-between p-3 cursor-pointer"
                  onClick={() => toggleChapter(chapter.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-gray-400 text-sm">
                      {chapter.isExpanded ? 'expand_more' : 'chevron_right'}
                    </span>
                    <span className="text-sm">{chapter.title}</span>
                  </div>
                </div>
                {chapter.isExpanded && (
                  <div className="px-3 pb-3">
                    {chapter.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center gap-2 py-2 pl-6">
                        <span className="material-icons text-gray-400 text-sm">
                          {lesson.type === 'Video' ? 'play_circle' : 
                           lesson.type === 'Quiz' ? 'quiz' : 'description'}
                        </span>
                        <span className="text-sm">{lesson.title}</span>
                        <select 
                          className="ml-auto text-xs border rounded px-2 py-0.5"
                          value={lesson.type}
                          onChange={(e) => handleLessonTypeChange(chapter.id, lesson.id, e.target.value)}
                        >
                          <option value="Video">Video</option>
                          <option value="PDF">PDF</option>
                          <option value="Quiz">Quiz</option>
                        </select>
                      </div>
                    ))}
                    <button 
                      onClick={() => handleAddLesson(chapter.id)}
                      className="flex items-center gap-2 text-blue-600 text-sm pl-6 mt-2"
                    >
                      <span className="material-icons text-sm">add_circle_outline</span>
                      Add Lesson
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 bg-white rounded-lg p-6">
          {renderLessonContent(selectedLesson.type)}
        </div>
      </div>

      {/* Bottom Navigation */}
     
    </div>
  );
}

export default CourseContent; 