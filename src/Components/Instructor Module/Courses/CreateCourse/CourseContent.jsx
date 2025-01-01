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
      
      ]
    }
  ]);

  const [uploadedFiles, setUploadedFiles] = useState({

  });

  const [selectedLesson, setSelectedLesson] = useState({
    chapterId: 1,
    lessonId: 1,
    type: 'Video',
    content: '',
    materials: null
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

  const handleDeleteLesson = (chapterId, lessonId) => {
    setChapters(chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          lessons: chapter.lessons.filter(lesson => lesson.id !== lessonId)
        };
      }
      return chapter;
    }));
  };

  const handleFileUpload = (type, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: file
    }));

    setSelectedLesson(prev => ({
      ...prev,
      materials: file
    }));

    setChapters(chapters.map(chapter => {
      if (chapter.id === selectedLesson.chapterId) {
        return {
          ...chapter,
          lessons: chapter.lessons.map(lesson => {
            if (lesson.id === selectedLesson.lessonId) {
              return {
                ...lesson,
                materials: file
              };
            }
            return lesson;
          })
        };
      }
      return chapter;
    }));
  };

  const handleContentChange = (content) => {
    setSelectedLesson(prev => ({
      ...prev,
      content: content
    }));

    setChapters(chapters.map(chapter => {
      if (chapter.id === selectedLesson.chapterId) {
        return {
          ...chapter,
          lessons: chapter.lessons.map(lesson => {
            if (lesson.id === selectedLesson.lessonId) {
              return {
                ...lesson,
                content: content
              };
            }
            return lesson;
          })
        };
      }
      return chapter;
    }));
  };

  const handleLessonSelect = (chapterId, lesson) => {
    setChapters(prevChapters => prevChapters.map(chapter => {
      if (chapter.id === selectedLesson.chapterId) {
        return {
          ...chapter,
          lessons: chapter.lessons.map(l => {
            if (l.id === selectedLesson.lessonId) {
              return {
                ...l,
                content: selectedLesson.content,
                materials: selectedLesson.materials
              };
            }
            return l;
          })
        };
      }
      return chapter;
    }));

    const targetLesson = chapters
      .find(ch => ch.id === chapterId)
      ?.lessons.find(l => l.id === lesson.id);

    setSelectedLesson({
      chapterId,
      lessonId: lesson.id,
      type: lesson.type,
      content: targetLesson?.content || '',
      materials: targetLesson?.materials || null
    });
    
    if (targetLesson?.materials) {
      setUploadedFiles({
        ...uploadedFiles,
        material: targetLesson.materials
      });
    } else {
      setUploadedFiles({});
    }
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
                  {uploadedFiles.lesson ? (
                    <div className="flex items-center gap-2">
                      <span>{uploadedFiles.lesson.name}</span>
                      <button 
                        onClick={() => handleFileUpload('lesson', null)}
                        className="text-red-500"
                      >
                        <span className="material-icons text-sm">close</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-500 mb-1">Or Drag and Drop</p>
                      <p className="text-sm text-gray-400">MP4, MKW... up to 1MB</p>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        id="lesson-upload"
                        onChange={(e) => handleFileUpload('lesson', e.target.files[0])}
                      />
                      <label 
                        htmlFor="lesson-upload" 
                        className="mt-4 px-4 py-1.5 bg-gray-100 text-sm rounded cursor-pointer"
                      >
                        Browse
                      </label>
                    </>
                  )}
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
                  {uploadedFiles.material ? (
                    <div className="flex items-center gap-2">
                      <span>{uploadedFiles.material.name}</span>
                      <button 
                        onClick={() => handleFileUpload('material', null)}
                        className="text-red-500"
                      >
                        <span className="material-icons text-sm">close</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-500 mb-1">Or Drag and Drop</p>
                      <p className="text-sm text-gray-400">PDF, DOC... up to 1MB</p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        id="material-upload"
                        onChange={(e) => handleFileUpload('material', e.target.files[0])}
                      />
                      <label 
                        htmlFor="material-upload" 
                        className="mt-4 px-4 py-1.5 bg-gray-100 text-sm rounded cursor-pointer"
                      >
                        Browse
                      </label>
                    </>
                  )}
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
                value={selectedLesson.content}
                onChange={(e) => handleContentChange(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Materials *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center">
                  <img src="/path-to-upload-icon.svg" alt="" className="mb-2" />
                  {uploadedFiles.material ? (
                    <div className="flex items-center gap-2">
                      <span>{uploadedFiles.material.name}</span>
                      <button 
                        onClick={() => handleFileUpload('material', null)}
                        className="text-red-500"
                      >
                        <span className="material-icons text-sm">close</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-500 mb-1">Or Drag and Drop</p>
                      <p className="text-sm text-gray-400">PDF, DOC... up to 1MB</p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        id="pdf-material-upload"
                        onChange={(e) => handleFileUpload('material', e.target.files[0])}
                      />
                      <label 
                        htmlFor="pdf-material-upload" 
                        className="mt-4 px-4 py-1.5 bg-gray-100 text-sm rounded cursor-pointer"
                      >
                        Browse
                      </label>
                    </>
                  )}
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
     

   

      {/* Steps Progress */}
     

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
                      <div 
                        key={lesson.id} 
                        className={`flex items-center gap-2 py-2 pl-6 cursor-pointer ${
                          selectedLesson.lessonId === lesson.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleLessonSelect(chapter.id, lesson)}
                      >
                        <span className="material-icons text-gray-400 text-sm">
                          {lesson.type === 'Video' ? 'play_circle' : 
                           lesson.type === 'Quiz' ? 'quiz' : 'description'}
                        </span>
                        <span className="text-sm">{lesson.title}</span>
                        <select 
                          className="ml-auto text-xs border rounded px-2 py-0.5"
                          value={lesson.type}
                          onChange={(e) => handleLessonTypeChange(chapter.id, lesson.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option value="Video">Video</option>
                          <option value="PDF">PDF</option>
                          <option value="Quiz">Quiz</option>
                        </select>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLesson(chapter.id, lesson.id);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <span className="material-icons text-sm">delete</span>
                        </button>
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