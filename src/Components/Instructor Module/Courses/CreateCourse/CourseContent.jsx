import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import useCourseCreationStore from '../../../../stores/courseCreationStore';
import axios from 'axios';

function CourseContent() {
  const navigate = useNavigate();
  const { updateCourseData } = useCourseCreationStore();
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState();
  const [selectedMaterials, setSelectedMaterials] = useState(null);

  // Add new chapter
  const handleAddChapter = () => {
    const newChapter = {
      chapterName: `Chapter ${chapters.length + 1}`,
      lessons: [],
      questions: []
    };
    const updatedChapters = [...chapters, newChapter];
    setChapters(updatedChapters);
    updateCourseData('content', { chapters: updatedChapters });
  };

  // Select chapter


  // Select lesson and show right content
  const handleSelectLesson = (chapterIndex, lessonIndex) => {
    const lesson = chapters[chapterIndex].lessons[lessonIndex];
    setSelectedChapter(chapterIndex);
    setSelectedLesson({
      ...lesson,
      chapterIndex,
      lessonIndex
    });
  };

  // Add new lesson to chapter
  const handleAddLesson = (chapterIndex) => {
    const newLesson = {
      lessonTitle: `Lesson ${chapters[chapterIndex].lessons.length + 1}`,
      lessonType: 'Video',
      lessonContent: '',
      lessonVideo: '',
      lessonMaterials: ''
    };
    
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].lessons.push(newLesson);
    setChapters(updatedChapters);
    updateCourseData('content', { chapters: updatedChapters });
  };

  // Add question to quiz


  // Handle lesson type change
  const handleLessonTypeChange = (chapterIndex, lessonIndex, newType) => {
    const updatedChapters = [...chapters];
    const lesson = updatedChapters[chapterIndex].lessons[lessonIndex];
    lesson.lessonType = newType;
    
    // Initialize questions array when switching to Quiz type
    if (newType === 'Quiz') {
      lesson.questions = [{
        question: '',
        isOpenSource: true,
        options: [
          { option: '', isCorrect: false },
          { option: '', isCorrect: false }
        ]
      }];
    }
    
    setChapters(updatedChapters);
  };

  // Save course content
  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8089/qlms/createCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('accessToken')}`
        },
        body: JSON.stringify({
          courseChapters: chapters
        })
      });

      if (response.ok) {
        toast.success('Course content saved successfully');
        navigate('/instructor/courses');
      } else {
        throw new Error('Failed to save course');
      }
    } catch (error) {
      toast.error('Failed to save course content');
      console.error(error);
    }
  };

  // Handle file upload to S3
  const handleFileUpload = async (e, type, chapterIndex, lessonIndex) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('https://image.qubinest.com/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data && response.data.url) {
          setSelectedMaterials({
            chapterIndex,
            lessonIndex,
            type,
            name: file.name
          });
          
          const updatedChapters = [...chapters];
          const lesson = updatedChapters[chapterIndex].lessons[lessonIndex];
          
          if (type === 'video') {
            lesson.lessonVideo = response.data.url;
          } else if (type === 'materials') {
            lesson.lessonMaterials = response.data.url;
          }
          
          setChapters(updatedChapters);
          updateCourseData('content', { chapters: updatedChapters });
          
          // Force re-render
          setSelectedLesson({
            ...lesson,
            chapterIndex,
            lessonIndex
          });

          toast.success(`${type === 'video' ? 'Video' : 'Material'} uploaded successfully`);
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`Failed to upload ${type === 'video' ? 'video' : 'material'}`);
      }
    }
  };

  // Get stored file info - Updated to handle URLs
  const getStoredFileInfo = (chapterIndex, lessonIndex, type) => {
    const lesson = chapters[chapterIndex]?.lessons[lessonIndex];
    if (!lesson) return null;

    const fileUrl = type === 'video' ? lesson.lessonVideo : lesson.lessonMaterials;
    if (!fileUrl) return null;

    // Extract filename from URL
    const fileName = fileUrl.split('/').pop();
    return fileName ? { name: fileName } : null;
  };

  // Render right content based on selection
  const renderRightContent = () => {
    if (!selectedLesson) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a lesson to view content
        </div>
      );
    }

    switch (selectedLesson.lessonType.toLowerCase()) {
      case 'video':
        return (
          <div className="p-4">
            <h3>Video Content</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Video Upload</label>
                <div className="relative">
                  <button 
                    onClick={() => document.getElementById(`video-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`).click()}
                    className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                  >
                    Choose file
                  </button>
                  <input
                    id={`video-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, 'video', selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                    className="hidden"
                    key={`video-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                  />
                </div>
                {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'video') && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected video: {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'video').name}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2">Additional Materials</label>
                <div className="relative">
                  <button 
                    onClick={() => document.getElementById(`materials-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`).click()}
                    className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                  >
                    Choose file
                  </button>
                  <input
                    id={`materials-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'materials', selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                    className="hidden"
                    key={`materials-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                  />
                </div>
                {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'materials') && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected material: {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'materials').name}
                  </p>
                )}
              </div>

              {/* Add Quiz Button */}
              <div className="mt-6">
                <button
                  onClick={() => handleAddQuestion(selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <span className="material-icons text-sm">add_circle_outline</span>
                  Add Quiz Question
                </button>
              </div>

              {/* Show Questions if they exist */}
              {selectedLesson.questions && selectedLesson.questions.length > 0 && (
                <div className="mt-4 space-y-4">
                  <h4 className="font-medium">Quiz Questions</h4>
                  {selectedLesson.questions.map((q, qIndex) => (
                    <div key={qIndex} className="border p-4 rounded mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <input
                          type="text"
                          placeholder="Enter your question"
                          value={q.question}
                          onChange={(e) => {
                            const updatedChapters = [...chapters];
                            updatedChapters[selectedLesson.chapterIndex]
                              .lessons[selectedLesson.lessonIndex]
                              .questions[qIndex].question = e.target.value;
                            setChapters(updatedChapters);
                          }}
                          className="w-full p-2 border rounded mb-2"
                        />
                        <button
                          onClick={() => handleRemoveQuestion(selectedLesson.chapterIndex, selectedLesson.lessonIndex, qIndex)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <span className="material-icons">remove_circle_outline</span>
                        </button>
                      </div>
                      
                      {q.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-2 mb-2">
                          <input
                            type="radio"
                            name={`question-${qIndex}`}
                            checked={option.isCorrect}
                            onChange={() => {
                              const updatedChapters = [...chapters];
                              const currentQuestion = updatedChapters[selectedLesson.chapterIndex]
                                .lessons[selectedLesson.lessonIndex]
                                .questions[qIndex];
                              
                              currentQuestion.options = currentQuestion.options.map((opt, idx) => ({
                                ...opt,
                                isCorrect: idx === oIndex
                              }));
                              setChapters(updatedChapters);
                            }}
                          />
                          <input
                            type="text"
                            value={option.option}
                            onChange={(e) => {
                              const updatedChapters = [...chapters];
                              updatedChapters[selectedLesson.chapterIndex]
                                .lessons[selectedLesson.lessonIndex]
                                .questions[qIndex].options[oIndex].option = e.target.value;
                              setChapters(updatedChapters);
                            }}
                            placeholder={`Option ${oIndex + 1}`}
                            className="flex-1 p-2 border rounded"
                          />
                        </div>
                      ))}
                      
                      <button
                        onClick={() => {
                          const updatedChapters = [...chapters];
                          updatedChapters[selectedLesson.chapterIndex]
                            .lessons[selectedLesson.lessonIndex]
                            .questions[qIndex].options.push({ option: '', isCorrect: false });
                          setChapters(updatedChapters);
                        }}
                        className="text-blue-600 text-sm"
                      >
                        + Add Option
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'pdf':
        return (
          <div className="p-4">
            <h3>PDF Content</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">PDF Content</label>
                <textarea
                  value={chapters[selectedLesson.chapterIndex]?.lessons[selectedLesson.lessonIndex]?.lessonContent || ''}
                  onChange={(e) => {
                    const updatedChapters = [...chapters];
                    if (!updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].lessonContent) {
                      updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].lessonContent = '';
                    }
                    updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].lessonContent = e.target.value;
                    setChapters(updatedChapters);
                  }}
                  placeholder="Enter your PDF content here..."
                  className="w-full p-2 border rounded h-40 resize-y"
                />
              </div>

              <div>
                <label className="block mb-2">Additional Materials</label>
                <div className="relative">
                  <button 
                    onClick={() => document.getElementById(`pdf-materials-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`).click()}
                    className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                  >
                    Choose file
                  </button>
                  <input
                    id={`pdf-materials-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'materials', selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                    className="hidden"
                    key={`pdf-materials-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                  />
                </div>
                {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'materials') && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected material: {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'materials').name}
                  </p>
                )}
              </div>

              {/* Add Quiz Button */}
              <div className="mt-6">
                <button
                  onClick={() => handleAddQuestion(selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <span className="material-icons text-sm">add_circle_outline</span>
                  Add Quiz Question
                </button>
              </div>

              {/* Show Questions if they exist */}
              {selectedLesson.questions && selectedLesson.questions.length > 0 && (
                <div className="mt-4 space-y-4">
                  <h4 className="font-medium">Quiz Questions</h4>
                  {selectedLesson.questions.map((q, qIndex) => (
                    <div key={qIndex} className="border p-4 rounded mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <input
                          type="text"
                          placeholder="Enter your question"
                          value={q.question}
                          onChange={(e) => {
                            const updatedChapters = [...chapters];
                            updatedChapters[selectedLesson.chapterIndex]
                              .lessons[selectedLesson.lessonIndex]
                              .questions[qIndex].question = e.target.value;
                            setChapters(updatedChapters);
                          }}
                          className="w-full p-2 border rounded mb-2"
                        />
                        <button
                          onClick={() => handleRemoveQuestion(selectedLesson.chapterIndex, selectedLesson.lessonIndex, qIndex)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <span className="material-icons">remove_circle_outline</span>
                        </button>
                      </div>
                      
                      {q.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-2 mb-2">
                          <input
                            type="radio"
                            name={`question-${qIndex}`}
                            checked={option.isCorrect}
                            onChange={() => {
                              const updatedChapters = [...chapters];
                              const currentQuestion = updatedChapters[selectedLesson.chapterIndex]
                                .lessons[selectedLesson.lessonIndex]
                                .questions[qIndex];
                              
                              currentQuestion.options = currentQuestion.options.map((opt, idx) => ({
                                ...opt,
                                isCorrect: idx === oIndex
                              }));
                              setChapters(updatedChapters);
                            }}
                          />
                          <input
                            type="text"
                            value={option.option}
                            onChange={(e) => {
                              const updatedChapters = [...chapters];
                              updatedChapters[selectedLesson.chapterIndex]
                                .lessons[selectedLesson.lessonIndex]
                                .questions[qIndex].options[oIndex].option = e.target.value;
                              setChapters(updatedChapters);
                            }}
                            placeholder={`Option ${oIndex + 1}`}
                            className="flex-1 p-2 border rounded"
                          />
                        </div>
                      ))}
                      
                      <button
                        onClick={() => {
                          const updatedChapters = [...chapters];
                          updatedChapters[selectedLesson.chapterIndex]
                            .lessons[selectedLesson.lessonIndex]
                            .questions[qIndex].options.push({ option: '', isCorrect: false });
                          setChapters(updatedChapters);
                        }}
                        className="text-blue-600 text-sm"
                      >
                        + Add Option
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="p-4">
            <h3>Quiz Questions</h3>
            {selectedLesson.questions?.map((question, qIndex) => (
              <div key={qIndex} className="border p-4 rounded mb-4">
                <input
                  type="text"
                  placeholder="Enter your question"
                  value={question.question}
                  onChange={(e) => {
                    const updatedChapters = [...chapters];
                    updatedChapters[selectedLesson.chapterIndex]
                      .lessons[selectedLesson.lessonIndex]
                      .questions[qIndex].question = e.target.value;
                    setChapters(updatedChapters);
                  }}
                  className="w-full p-2 border rounded mb-2"
                />
                
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      checked={option.isCorrect}
                      onChange={() => {
                        const updatedChapters = [...chapters];
                        const currentQuestion = updatedChapters[selectedLesson.chapterIndex]
                          .lessons[selectedLesson.lessonIndex]
                          .questions[qIndex];
                        
                        currentQuestion.options = currentQuestion.options.map((opt, idx) => ({
                          ...opt,
                          isCorrect: idx === oIndex
                        }));
                        setChapters(updatedChapters);
                      }}
                    />
                    <input
                      type="text"
                      value={option.option}
                      onChange={(e) => {
                        const updatedChapters = [...chapters];
                        updatedChapters[selectedLesson.chapterIndex]
                          .lessons[selectedLesson.lessonIndex]
                          .questions[qIndex].options[oIndex].option = e.target.value;
                        setChapters(updatedChapters);
                      }}
                      placeholder={`Option ${oIndex + 1}`}
                      className="flex-1 p-2 border rounded"
                    />
                  </div>
                ))}
                
                <button
                  onClick={() => {
                    const updatedChapters = [...chapters];
                    updatedChapters[selectedLesson.chapterIndex]
                      .lessons[selectedLesson.lessonIndex]
                      .questions[qIndex].options.push({ option: '', isCorrect: false });
                    setChapters(updatedChapters);
                  }}
                  className="text-blue-600 text-sm"
                >
                  + Add Option
                </button>
              </div>
            ))}
            
            <button
              onClick={() => {
                const updatedChapters = [...chapters];
                if (!updatedChapters[selectedLesson.chapterIndex]
                    .lessons[selectedLesson.lessonIndex].questions) {
                  updatedChapters[selectedLesson.chapterIndex]
                    .lessons[selectedLesson.lessonIndex].questions = [];
                }
                updatedChapters[selectedLesson.chapterIndex]
                  .lessons[selectedLesson.lessonIndex].questions.push({
                    question: '',
                    isOpenSource: true,
                    options: [
                      { option: '', isCorrect: false },
                      { option: '', isCorrect: false }
                    ]
                  });
                setChapters(updatedChapters);
              }}
              className="text-blue-600"
            >
              + Add Question
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // Handle content changes


  // Add these helper functions at the top of your component


  // Add new question to lesson
  const handleAddQuestion = (chapterIndex, lessonIndex) => {
    const updatedChapters = [...chapters];
    const lesson = updatedChapters[chapterIndex].lessons[lessonIndex];
    
    if (!lesson.questions) {
      lesson.questions = [];
    }

    lesson.questions.push({
      question: '',
      isOpenSource: true,
      options: [
        { option: '', isCorrect: false },
        { option: '', isCorrect: false }
      ]
    });

    setChapters(updatedChapters);
    updateCourseData('content', { chapters: updatedChapters });
    // Force re-render
    setSelectedLesson({
      ...lesson,
      chapterIndex,
      lessonIndex
    });
  };

  // Remove question
  const handleRemoveQuestion = (chapterIndex, lessonIndex, questionIndex) => {
    const updatedChapters = [...chapters];
    const lesson = updatedChapters[chapterIndex].lessons[lessonIndex];
    
    lesson.questions.splice(questionIndex, 1);
    
    setChapters(updatedChapters);
    updateCourseData('content', { chapters: updatedChapters });
    // Force re-render
    setSelectedLesson({
      ...lesson,
      chapterIndex,
      lessonIndex
    });
  };

  // Add function to remove lesson
  const handleRemoveLesson = (chapterIndex, lessonIndex) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].lessons.splice(lessonIndex, 1);
    setChapters(updatedChapters);
    updateCourseData('content', { chapters: updatedChapters });
    
    // Clear selected lesson if it was deleted
    if (selectedLesson?.chapterIndex === chapterIndex && 
        selectedLesson?.lessonIndex === lessonIndex) {
      setSelectedLesson(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex gap-6">
        {/* Left Sidebar - Chapters and Lessons */}
        <div className="w-1/3 bg-white rounded-lg p-4">
          <h2 className="font-medium mb-4">Course Content</h2>
          <button 
            onClick={handleAddChapter}
            className="flex items-center gap-2 text-blue-600 mb-4"
          >
            <span className="material-icons text-sm">add_circle_outline</span>
            Add Chapter
          </button>

          {/* Only render chapters if they exist */}
          {chapters.length > 0 && chapters.map((chapter, chapterIndex) => (
            <div 
              key={chapterIndex} 
              className={`mb-4 border rounded-lg p-4 ${selectedChapter === chapterIndex ? 'border-blue-500' : ''}`}
            >
              <input
                type="text"
                value={chapter.chapterName}
                onChange={(e) => {
                  const updatedChapters = [...chapters];
                  updatedChapters[chapterIndex].chapterName = e.target.value;
                  setChapters(updatedChapters);
                }}
                className="w-full mb-2 p-2 border rounded"
              />

              {/* Lessons List */}
              <div className="space-y-2">
                {chapter.lessons.map((lesson, lessonIndex) => (
                  <div 
                    key={lessonIndex} 
                    className={`ml-4 p-2 border rounded hover:bg-gray-50
                      ${selectedLesson?.chapterIndex === chapterIndex && 
                        selectedLesson?.lessonIndex === lessonIndex ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => handleSelectLesson(chapterIndex, lessonIndex)}
                      >
                        <span>{lesson.lessonTitle}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={lesson.lessonType}
                          onChange={(e) => handleLessonTypeChange(chapterIndex, lessonIndex, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 border rounded text-sm"
                        >
                          <option value="Video">Video</option>
                          <option value="PDF">PDF</option>
                          <option value="Quiz">Quiz</option>
                        </select>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveLesson(chapterIndex, lessonIndex);
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Delete lesson"
                        >
                          <span className="material-icons text-sm">delete_outline</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Lesson Button */}
              <button
                onClick={() => handleAddLesson(chapterIndex)}
                className="mt-2 ml-4 text-blue-600 text-sm flex items-center gap-1"
              >
                <span className="material-icons text-sm">add_circle_outline</span>
                Add Lesson
              </button>
            </div>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 bg-white rounded-lg">
          {renderRightContent()}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Course
        </button>
      </div>
    </div>
  );
}

export default CourseContent; 