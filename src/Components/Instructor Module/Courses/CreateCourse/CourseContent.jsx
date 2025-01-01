import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

function CourseContent() {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Add new chapter
  const handleAddChapter = () => {
    const newChapter = {
      chapterName: `Chapter ${chapters.length + 1}`,
      lessons: [],
      questions: []
    };
    setChapters([...chapters, newChapter]);
  };

  // Select chapter
  const handleSelectChapter = (chapterIndex) => {
    setSelectedChapter(chapterIndex);
    setSelectedLesson(null); // Reset selected lesson when changing chapter
  };

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
  };

  // Add question to quiz
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
  };

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
          <div className="p-6">
            <h3 className="text-xl font-medium mb-6">Video Lesson</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Video Upload</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileUpload(e, 'lessonVideo')}
                  className="w-full p-2 border rounded"
                />
                {selectedLesson.lessonVideo && (
                  <p className="mt-2 text-sm text-gray-600">
                    Current video: {selectedLesson.lessonVideo}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional Materials (PDF)</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e, 'lessonMaterials')}
                  className="w-full p-2 border rounded"
                />
                {selectedLesson.lessonMaterials && (
                  <p className="mt-2 text-sm text-gray-600">
                    Current material: {selectedLesson.lessonMaterials}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={selectedLesson.lessonContent}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="w-full p-2 border rounded h-32"
                  placeholder="Enter lesson description"
                />
              </div>
            </div>
          </div>
        );

      case 'pdf':
        return (
          <div className="p-6">
            <h3 className="text-xl font-medium mb-6">PDF Lesson</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">PDF Upload</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e, 'lessonMaterials')}
                  className="w-full p-2 border rounded"
                />
                {selectedLesson.lessonMaterials && (
                  <p className="mt-2 text-sm text-gray-600">
                    Current PDF: {selectedLesson.lessonMaterials}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={selectedLesson.lessonContent}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="w-full p-2 border rounded h-32"
                  placeholder="Enter lesson description"
                />
              </div>
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
  const handleContentChange = (content) => {
    const updatedChapters = [...chapters];
    updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].lessonContent = content;
    setChapters(updatedChapters);
  };

  // Handle file uploads
  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedChapters = [...chapters];
    updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex][field] = file.name;
    setChapters(updatedChapters);
  };

  // Handle quiz changes
  const handleQuestionChange = (questionIndex, value) => {
    const updatedChapters = [...chapters];
    const lesson = updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex];
    lesson.questions[questionIndex].question = value;
    setChapters(updatedChapters);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedChapters = [...chapters];
    const lesson = updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex];
    lesson.questions[questionIndex].options[optionIndex].option = value;
    setChapters(updatedChapters);
  };

  const handleCorrectOptionChange = (questionIndex, optionIndex) => {
    const updatedChapters = [...chapters];
    const lesson = updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex];
    lesson.questions[questionIndex].options = lesson.questions[questionIndex].options.map((opt, idx) => ({
      ...opt,
      isCorrect: idx === optionIndex
    }));
    setChapters(updatedChapters);
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

          {chapters.map((chapter, chapterIndex) => (
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
                    className={`ml-4 p-2 border rounded cursor-pointer hover:bg-gray-50
                      ${selectedLesson?.chapterIndex === chapterIndex && 
                        selectedLesson?.lessonIndex === lessonIndex ? 'bg-blue-50' : ''}`}
                    onClick={() => handleSelectLesson(chapterIndex, lessonIndex)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{lesson.lessonTitle}</span>
                      <select
                        value={lesson.lessonType}
                        onChange={(e) => handleLessonTypeChange(chapterIndex, lessonIndex, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="ml-2 p-1 border rounded"
                      >
                        <option value="Video">Video</option>
                        <option value="PDF">PDF</option>
                        <option value="Quiz">Quiz</option>
                      </select>
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
          {!selectedLesson ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a lesson to view or edit its content
            </div>
          ) : (
            renderRightContent()
          )}
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