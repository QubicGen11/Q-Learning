import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import useCourseCreationStore from '../../../../stores/courseCreationStore';
import axios from 'axios';
import ReactQuill from 'react-quill';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Coursecontent.css'
import { BsQuestionOctagon } from "react-icons/bs";
import { LiaUploadSolid } from "react-icons/lia";
import { IoIosAddCircleOutline } from 'react-icons/io';
import { CiFileOn, CiPlay1 } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuFileQuestion } from "react-icons/lu";

function CourseContent() {
  const navigate = useNavigate();
  const { updateCourseData } = useCourseCreationStore();
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState();
  // const [selectedMaterials, setSelectedMaterials] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState({ type: '', url: '' });
  const [isLoading, setIsLoading] = useState(false);
  // const [questionsCollapsed, setQuestionsCollapsed] = useState(false);
  const [collapsedQuestions, setCollapsedQuestions] = useState(new Set());
  const [editingChapter, setEditingChapter] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [editName, setEditName] = useState('');

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


  // Handle file upload to S3
  const handleFileUpload = async (e, type, chapterIndex, lessonIndex) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true); // Show loader
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('https://image.qubinest.com/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data && response.data.url) {
          const updatedChapters = [...chapters];
          const lesson = updatedChapters[chapterIndex].lessons[lessonIndex];

          if (type === 'video') {
            lesson.lessonVideo = response.data.url;
          } else if (type === 'materials') {
            lesson.lessonMaterials = response.data.url;
          }

          setChapters(updatedChapters);
          updateCourseData('content', { chapters: updatedChapters });
          toast.success(`${type === 'video' ? 'Video' : 'Material'} uploaded successfully`);
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`Failed to upload ${type === 'video' ? 'video' : 'material'}`);
      } finally {
        setIsLoading(false); // Hide loader
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
            <h3>Lessons</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Lesson *</label>
                <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center relative">
                    <div className="absolute top-0 right-0 flex items-center px-4 py-2 rounded-md bg-[#6B7280] hover:bg-[#4B5563] gap-2">
                      <label
                        htmlFor={`video-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                        className=" text-white rounded  cursor-pointer"
                      >
                        Browse
                      </label>
                      <LiaUploadSolid color='white' size={22} fontWeight={900} />
                    </div>

                    <input
                      type="file"
                      id={`video-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                      className="hidden"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, 'video', selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                    />
                    <label
                      htmlFor={`video-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                      className="cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-1 text-sm text-gray-500">
                          Drag and Drop Or Browse<br />
                          MP4, MKW... up to _MB
                        </p>

                      </div>
                    </label>
                  </div>
                  {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'video') && (
                    <div className="mt-2 text-sm text-gray-600 text-center flex items-center justify-center gap-2">
                      <p
                        className="cursor-pointer hover:text-[#0056B3]"
                        onClick={() => handlePreviewClick('video', chapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].lessonVideo)}
                      >
                        {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'video').name}
                      </p>
                      <button
                        onClick={() => handleRemoveFile('video', selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2">Materials *</label>
                <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center relative">
                    {/* Add Browse button to top right */}
                    <div className="absolute top-0 right-0 flex items-center px-4 py-2 rounded-md bg-[#6B7280] hover:bg-[#4B5563] gap-2">
                      <label
                        htmlFor={`materials-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                        className=" text-white rounded  cursor-pointer"
                      >
                        Browse
                      </label>
                      <LiaUploadSolid color='white' size={22} fontWeight={900} />
                    </div>

                    <input
                      type="file"
                      id={`materials-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, 'materials', selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                    />
                    <label
                      htmlFor={`materials-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                      className="cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-1 text-sm text-gray-500">
                          Drag and Drop Or Browse<br />
                          PDF, DOC, DOCX... up to 20 MB
                        </p>
                      </div>
                    </label>
                  </div>
                  {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'materials') && (
                    <div className="mt-2 text-sm text-gray-600 text-center flex items-center justify-center gap-2">
                      <p
                        className="cursor-pointer hover:text-[#0056B3]"
                        onClick={() => handlePreviewClick('materials', chapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].lessonMaterials)}
                      >
                        {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'materials').name}
                      </p>
                      <button
                        onClick={() => handleRemoveFile('materials', selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Add Quiz Button */}
              <div className="mt-6">
                <button
                  onClick={() => handleAddQuestion(selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                  className="flex items-center gap-2 text-[#0056B3] hover:text-blue-700"
                >
                  <span className="material-icons text-sm">add_circle_outline</span>
                  Add Quiz Question
                </button>
              </div>

              {/* Show Questions if they exist */}
              {selectedLesson.questions && selectedLesson.questions.length > 0 && (
                <div className="flex-1 pl-6 h-full overflow-hidden">
                  <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4 flex-shrink-0">
                      <h2 className="font-medium">Quiz</h2>
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
                              options: [
                                { option: '', isCorrect: false },
                                { option: '', isCorrect: false }
                              ]
                            });
                          setChapters(updatedChapters);
                        }}
                        className="text-[#0056B3] hover:text-[#004494] flex items-center gap-1"
                      >
                        <span className="material-icons text-sm">add_circle_outline</span>
                        Add Another
                      </button>
                    </div>

                    <div className="space-y-2 overflow-y-auto pr-2 flex-grow">
                      {selectedLesson.questions?.map((q, qIndex) => (
                        <div key={qIndex} className="border rounded-lg bg-white shadow-sm">
                          <div className="flex justify-between items-center p-4 border-b bg-[#f3f4f6]">
                            <div className="flex items-center gap-2">
                              {/* <span className="material-icons text-[#0056B3]">quiz</span> */}
                              <BsQuestionOctagon className="text-[#0056B3] font-extrabold" />
                              <span>Question {qIndex + 1}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleRemoveQuestion(selectedLesson.chapterIndex, selectedLesson.lessonIndex, qIndex)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <span className="material-icons">delete_outline</span>
                              </button>
                              <button
                                onClick={() => toggleQuestion(qIndex)}
                                className="text-gray-500"
                              >
                                <span className="material-icons">
                                  {collapsedQuestions.has(qIndex) ? 'expand_more' : 'expand_less'}
                                </span>
                              </button>
                            </div>
                          </div>

                          {!collapsedQuestions.has(qIndex) && (
                            <div className="p-4 space-y-4">
                              <div>
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
                                  className="w-full p-2 border rounded"
                                />
                              </div>

                              <div className="space-y-3">
                                {q.options.map((option, oIndex) => (
                                  <div key={oIndex} className="flex items-center gap-2">
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
                                      className="form-radio text-[#0056B3]"
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
                                    <button
                                      onClick={() => {
                                        const updatedChapters = [...chapters];
                                        updatedChapters[selectedLesson.chapterIndex]
                                          .lessons[selectedLesson.lessonIndex]
                                          .questions[qIndex].options.splice(oIndex, 1);
                                        setChapters(updatedChapters);
                                      }}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <span className="material-icons text-sm">remove_circle_outline</span>
                                    </button>
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
                                  className="text-[#0056B3] hover:text-[#004494] flex items-center gap-1"
                                >
                                  <span className="material-icons text-sm">add_circle_outline</span>
                                  Add Option
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'pdf':
        return (
          <div className="p-4">
            {/* <h3>PDF Content</h3> */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2">PDF Content *</label>
                <ReactQuill
                  value={chapters[selectedLesson.chapterIndex]?.lessons[selectedLesson.lessonIndex]?.lessonContent || ''}
                  onChange={(content) => {
                    const updatedChapters = [...chapters];
                    if (!updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].lessonContent) {
                      updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].lessonContent = '';
                    }
                    updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].lessonContent = content;
                    setChapters(updatedChapters);
                  }}
                  modules={{
                    toolbar: {
                      container: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'align': [] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'color': [] }, { 'background': [] }],
                        ['link'],
                        ['clean']
                      ],
                      handlers: {},
                      tooltip: {
                        bold: 'Bold',
                        italic: 'Italic',
                        underline: 'Underline',
                        strike: 'Strikethrough',
                        link: 'Insert Link',
                        'list-ordered': 'Numbered List',
                        'list-bullet': 'Bullet List',
                        'header-1': 'Heading 1',
                        'header-2': 'Heading 2',
                        'header-3': 'Heading 3',
                        'align-left': 'Left Align',
                        'align-center': 'Center Align',
                        'align-right': 'Right Align',
                        'align-justify': 'Justify',
                        'background': 'Background Color',
                        'color': 'Text Color',
                        'clean': 'Clear Formatting'
                      }
                    }
                  }}
                  className="h-40"
                />
              </div>

              <div className=''>
                <label className="block mt-12 relative">Additional Materials *</label>
                <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center relative">
                    <div className="absolute top-0 right-0 flex items-center px-4 py-2 rounded-md bg-[#6B7280] hover:bg-[#4B5563] gap-2">
                      <label
                        htmlFor={`pdf-materials-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                        className="text-white rounded cursor-pointer"
                      >
                        Browse
                      </label>
                      <LiaUploadSolid color='white' size={22} fontWeight={900} />
                    </div>

                    <input
                      type="file"
                      id={`pdf-materials-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, 'materials', selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                    />
                    <label
                      htmlFor={`pdf-materials-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                      className="cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-1 text-sm text-gray-500">
                          Drag and Drop Or Browse<br />
                          PDF, DOC, DOCX... up to _MB
                        </p>
                      </div>
                    </label>
                  </div>
                  {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'materials') && (
                    <div className="mt-2 text-sm text-gray-600 text-center flex items-center justify-center gap-2">
                      <p
                        className="cursor-pointer hover:text-[#0056B3]"
                        onClick={() => handlePreviewClick('materials', chapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].lessonMaterials)}
                      >
                        {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'materials').name}
                      </p>
                      <button
                        onClick={() => handleRemoveFile('materials', selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Add Quiz Button */}
              <div className="">
                <button
                  onClick={() => handleAddQuestion(selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                  className="flex items-center gap-2 text-[#0056B3] hover:text-blue-700"
                >
                  <span className="material-icons text-sm">add_circle_outline</span>
                  Add Quiz Question
                </button>
              </div>

              {/* Show Questions if they exist */}
              {selectedLesson.questions && selectedLesson.questions.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-4">Quiz Questions</h4>
                  {selectedLesson.questions?.map((q, qIndex) => (
                    <div key={qIndex} className="border rounded-lg bg-white shadow-sm">
                      <div className="flex justify-between items-center p-4 border-b bg-[#f3f4f6]">
                        <div className="flex items-center gap-2">
                          {/* <span className="material-icons text-[#0056B3]">quiz</span> */}
                          <BsQuestionOctagon className="text-[#0056B3] font-extrabold" />
                          <span>Question {qIndex + 1}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRemoveQuestion(selectedLesson.chapterIndex, selectedLesson.lessonIndex, qIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <span className="material-icons">delete_outline</span>
                          </button>
                          <button
                            onClick={() => toggleQuestion(qIndex)}
                            className="text-gray-500"
                          >
                            <span className="material-icons">
                              {collapsedQuestions.has(qIndex) ? 'expand_more' : 'expand_less'}
                            </span>
                          </button>
                        </div>
                      </div>

                      {!collapsedQuestions.has(qIndex) && (
                        <div className="p-4 space-y-4">
                          <div>
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
                              className="w-full p-2 border rounded"
                            />
                          </div>

                          <div className="space-y-3">
                            {q.options.map((option, oIndex) => (
                              <div key={oIndex} className="flex items-center gap-2">
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
                                  className="form-radio text-[#0056B3]"
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
                                <button
                                  onClick={() => {
                                    const updatedChapters = [...chapters];
                                    updatedChapters[selectedLesson.chapterIndex]
                                      .lessons[selectedLesson.lessonIndex]
                                      .questions[qIndex].options.splice(oIndex, 1);
                                    setChapters(updatedChapters);
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <span className="material-icons text-sm">remove_circle_outline</span>
                                </button>
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
                              className="text-[#0056B3] hover:text-[#004494] flex items-center gap-1"
                            >
                              <span className="material-icons text-sm">add_circle_outline</span>
                              Add Option
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="bg-white rounded-lg p-6 h-[calc(100vh-280px)]">
            <div className="flex h-full">
              {/* Left Sidebar */}


              {/* Content Area */}
              <div className="flex-1 pl-6 h-full overflow-hidden">
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="font-medium">Quiz</h2>
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
                            options: [
                              { option: '', isCorrect: false },
                              { option: '', isCorrect: false }
                            ]
                          });
                        setChapters(updatedChapters);
                      }}
                      className="text-[#0056B3] hover:text-[#004494] flex items-center gap-1"
                    >
                      <span className="material-icons text-sm">add_circle_outline</span>
                      Add Another
                    </button>
                  </div>

                  <div className="space-y-2 overflow-y-auto pr-2 flex-grow">
                    {selectedLesson.questions?.map((q, qIndex) => (
                      <div key={qIndex} className="border rounded-lg bg-white shadow-sm">
                        <div className="flex justify-between items-center p-4 border-b bg-[#f3f4f6]">
                          <div className="flex items-center gap-2">
                            {/* <span className="material-icons text-[#0056B3]">quiz</span> */}
                            <BsQuestionOctagon className="text-[#0056B3] font-extrabold" />
                            <span>Question {qIndex + 1}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleRemoveQuestion(selectedLesson.chapterIndex, selectedLesson.lessonIndex, qIndex)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <span className="material-icons">delete_outline</span>
                            </button>
                            <button
                              onClick={() => toggleQuestion(qIndex)}
                              className="text-gray-500"
                            >
                              <span className="material-icons">
                                {collapsedQuestions.has(qIndex) ? 'expand_more' : 'expand_less'}
                              </span>
                            </button>
                          </div>
                        </div>

                        {!collapsedQuestions.has(qIndex) && (
                          <div className="p-4 space-y-4">
                            <div>
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
                                className="w-full p-2 border rounded"
                              />
                            </div>

                            <div className="space-y-3">
                              {q.options.map((option, oIndex) => (
                                <div key={oIndex} className="flex items-center gap-2">
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
                                    className="form-radio text-[#0056B3]"
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
                                  <button
                                    onClick={() => {
                                      const updatedChapters = [...chapters];
                                      updatedChapters[selectedLesson.chapterIndex]
                                        .lessons[selectedLesson.lessonIndex]
                                        .questions[qIndex].options.splice(oIndex, 1);
                                      setChapters(updatedChapters);
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <span className="material-icons text-sm">remove_circle_outline</span>
                                  </button>
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
                                className="text-[#0056B3] hover:text-[#004494] flex items-center gap-1"
                              >
                                <span className="material-icons text-sm">add_circle_outline</span>
                                Add Option
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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

  // Add this function to handle preview clicks
  const handlePreviewClick = (type, url) => {
    setPreviewContent({ type, url });
    setPreviewOpen(true);
  };

  // Add this function to handle file removal
  const handleRemoveFile = (type, chapterIndex, lessonIndex) => {
    const updatedChapters = [...chapters];
    const lesson = updatedChapters[chapterIndex].lessons[lessonIndex];

    if (type === 'video') {
      lesson.lessonVideo = '';
    } else if (type === 'materials') {
      lesson.lessonMaterials = '';
    }

    setChapters(updatedChapters);
    updateCourseData('content', { chapters: updatedChapters });
    toast.success(`${type === 'video' ? 'Video' : 'Material'} removed successfully`);
  };

  // Add these helper functions
  const toggleQuestion = (qIndex) => {
    const newCollapsed = new Set(collapsedQuestions);
    if (newCollapsed.has(qIndex)) {
      newCollapsed.delete(qIndex);
    } else {
      newCollapsed.add(qIndex);
    }
    setCollapsedQuestions(newCollapsed);
  };


  useEffect(() => {
    // Add data-title attributes to toolbar buttons after component mounts
    const toolbar = document.querySelector('.ql-toolbar');
    if (toolbar) {
      const boldButton = toolbar.querySelector('.ql-bold');
      if (boldButton) boldButton.setAttribute('data-title', 'Bold');

      const italicButton = toolbar.querySelector('.ql-italic');
      if (italicButton) italicButton.setAttribute('data-title', 'Italic');

      const underlineButton = toolbar.querySelector('.ql-underline');
      if (underlineButton) underlineButton.setAttribute('data-title', 'Underline');

      const strikeButton = toolbar.querySelector('.ql-strike');
      if (strikeButton) strikeButton.setAttribute('data-title', 'Strikethrough');

      const linkButton = toolbar.querySelector('.ql-link');
      if (linkButton) linkButton.setAttribute('data-title', 'Insert Link');

      const listButton = toolbar.querySelector('.ql-list[value="ordered"]');
      if (listButton) listButton.setAttribute('data-title', 'Numbered List');

      const bulletButton = toolbar.querySelector('.ql-list[value="bullet"]');
      if (bulletButton) bulletButton.setAttribute('data-title', 'Bullet List');

      const alignButtons = toolbar.querySelectorAll('.ql-align');
      alignButtons.forEach(button => {
        const value = button.value || 'left';
        button.setAttribute('data-title', `Align ${value}`);
      });

      const colorPicker = toolbar.querySelector('.ql-color');
      if (colorPicker) colorPicker.setAttribute('data-title', 'Text Color');

      const backgroundPicker = toolbar.querySelector('.ql-background');
      if (backgroundPicker) backgroundPicker.setAttribute('data-title', 'Background Color');

      const cleanButton = toolbar.querySelector('.ql-clean');
      if (cleanButton) cleanButton.setAttribute('data-title', 'Clear Formatting');

      const headerPicker = toolbar.querySelector('.ql-header');
      if (headerPicker) headerPicker.setAttribute('data-title', 'Heading Style');
    }
  }, []); // Run once after component mounts

  return (
    <div className="min-h-screen bg-gray-50 ">

      <div className="flex ">
        {/* Left Sidebar - Chapters and Lessons */}
        <div className="w-[310px] h-[707px]  gap-4  p-4 border-2 border-[#E2E8F0] overflow-x-hidden  overflow-y-auto">
          <h2 className="font-medium mb-4 w-[84px] h-[24px] relative" style={{ fontSize: '16px', fontWeight: '500', lineHeight: '24px', letterSpacing: '0.15px', textAlign: 'left', color: '#1A202C' }}>Curriculum</h2>
          <button
            onClick={handleAddChapter}
            className="flex font-normal items-center text-[14px] h-[36px] w-[278px] gap-2 text-[#0056B3] bg-[#f2f9ff] mb-4 justify-center "
            style={{ padding: '6px 8px 6px 8px', fontWeight: "400" }}
          >
            <span className="material-icons text-xl">add</span>
            Add Chapter
          </button>

          {/* Chapters List */}
          {chapters.length > 0 && chapters.map((chapter, chapterIndex) => (
            <div
              key={chapterIndex}
              className="mb-1 shadow-sm "
            >
              {/* Chapter Header */}
              <div
                className={`flex items-center w-[278px] h-[32px] gap-2 p-2 bg-white rounded cursor-pointer ${
                  selectedChapter === chapterIndex ? 'bg-white' : ''
                }`}
              >
                <span className="material-icons text-[#d1d5db] text-2xl h-[36px] ">drag_indicator</span>
                {editingChapter === chapterIndex ? (
                  <div className="flex items-center flex-1">
                    <span className="text-xs text-gray-700">Chapter {chapterIndex + 1}: </span>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={() => {
                        if (editName.trim() !== '') {
                          const updatedChapters = [...chapters];
                          updatedChapters[chapterIndex] = {
                            ...chapter,
                            chapterName: editName.trim()
                          };
                          setChapters(updatedChapters);
                        }
                        setEditingChapter(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.target.blur();
                        }
                        if (e.key === 'Escape') {
                          setEditingChapter(null);
                        }
                      }}
                      className="text-xs text-gray-700 flex-1 outline-none border-b border-blue-500 ml-1"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                ) : (
                  <>
                    <div
                      className="flex items-center flex-1"
                      onClick={(e) => {
                        setSelectedChapter(selectedChapter === chapterIndex ? null : chapterIndex);
                      }}
                    >
                      <span className="text-xs text-gray-700">Chapter {chapterIndex + 1}: </span>
                      <span
                        className="text-xs text-gray-700 font-bold flex-1 ml-1 truncate"
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          setEditName(chapter.chapterName || '');
                          setEditingChapter(chapterIndex);
                        }}
                        title={chapter.chapterName || ''}
                        style={{
                          maxWidth: '150px',
                          display: 'inline-block'
                        }}
                      >
                        {chapter.chapterName ?
                          (chapter.chapterName.length > 10 ?
                            `${chapter.chapterName.substring(0, 10)}...` :
                            chapter.chapterName
                          ) : ''
                        }
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const updatedChapters = [...chapters];
                        updatedChapters.splice(chapterIndex, 1);
                        setChapters(updatedChapters);
                        if (selectedChapter === chapterIndex) {
                          setSelectedChapter(null);
                        }
                      }}
                      className="text-[#DC3545] hover:text-red-700 p-1 text-lg"
                      title="Delete chapter"
                    >
                      <span className="material-icons text-lg"><RiDeleteBinLine style={{borderRadius:"500px"}} /> </span>
                    </button>
                    <span
                      className="material-icons text-gray-700 text-2xl"
                      onClick={() => {
                        setSelectedChapter(selectedChapter === chapterIndex ? null : chapterIndex);
                      }}
                    >
                      {selectedChapter === chapterIndex ? 'expand_less' : 'expand_more'}
                    </span>
                  </>
                )}
              </div>

              {/* Lessons List - Only show if chapter is selected */}
              {selectedChapter === chapterIndex && (
                <div className="mt-2 space-y-1 p-2 bg-[#f3f4f6]">
                  {chapter.lessons.length === 0 ? (
                    // No lessons message
                    <div className="flex items-center justify-center h-[32px] text-xs text-gray-500 italic">
                      No lessons under this chapter
                    </div>
                  ) : (
                    // Existing lessons mapping
                    chapter.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className={`flex items-center h-[32px] ml-2 gap-2 p-2 rounded cursor-pointer ${
                          selectedLesson?.chapterIndex === chapterIndex &&
                          selectedLesson?.lessonIndex === lessonIndex
                            ? 'bg-[#f2f9ff] border-l-4 border-[#0056B3]'
                            : 'bg-white'
                        }`}
                        onClick={() => handleSelectLesson(chapterIndex, lessonIndex)}
                      >
                        {/* Lesson Icon based on type */}
                        <span className="material-icons text-[#4b5563] text-xl font-bold">
                          {lesson.lessonType === 'Video' ? 
                            <CiPlay1 className="w-5 h-5 font-extrabold stroke-1" /> : 
                            
                            lesson.lessonType === 'Quiz' ?   <LuFileQuestion  className="w-5 h-5 font-extrabold stroke-1" /> : 

                            lesson.lessonType === 'Content' ?  <CiFileOn  className="w-5 h-5 font-extrabold stroke-1" /> : 

                             'article'}
                        </span>

                        <div className="flex items-center flex-1 min-w-0">
                          <span className="text-xs whitespace-nowrap">Lesson {lessonIndex + 1}: </span>
                          {editingLesson === `${chapterIndex}-${lessonIndex}` ? (
                            <>
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onBlur={() => {
                                  if (editName.trim() !== '') {
                                    const updatedChapters = [...chapters];
                                    updatedChapters[chapterIndex].lessons[lessonIndex] = {
                                      ...lesson,
                                      lessonTitle: editName.trim()
                                    };
                                    setChapters(updatedChapters);
                                  }
                                  setEditingLesson(null);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.target.blur();
                                  }
                                  if (e.key === 'Escape') {
                                    setEditingLesson(null);
                                  }
                                }}
                                className="text-xs flex-1 outline-none border-b border-blue-500 ml-1"
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                              />
                            </>
                          ) : (
                            <>
                              <span
                                className="text-xs text-gray-700 font-bold flex-1 ml-1 truncate"
                                onDoubleClick={(e) => {
                                  e.stopPropagation();
                                  setEditName(lesson.lessonTitle || '');
                                  setEditingLesson(`${chapterIndex}-${lessonIndex}`);
                                }}
                                title={lesson.lessonTitle || ''}
                              >
                                {lesson.lessonTitle ?
                                  (lesson.lessonTitle.length > 10 ?
                                    `${lesson.lessonTitle.substring(0, 10)}...` :
                                    lesson.lessonTitle
                                  ) : ''
                                }
                              </span>
                              
                              {/* Only show dropdown and delete when not editing */}
                              <select
  value={lesson.lessonType}
  onChange={(e) => {
    e.stopPropagation();
    handleLessonTypeChange(chapterIndex, lessonIndex, e.target.value);
  }}
  onClick={(e) => e.stopPropagation()}
  className="text-xs border ml-3 rounded bg-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-[#0056B3]"
  style={{
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.5rem center',
    backgroundSize: '1em',
    paddingRight: '1.5rem'
  }}
>
  <option value="Video">Video</option>
  <option value="PDF">Content</option>
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
                               <span className=" text-sm"><RiDeleteBinLine style={{borderRadius:"1000px"}} /> </span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}

                  {/* Add Lesson Button - Keep outside the conditional rendering */}
                  <div className='flex justify-center'>
                    <button
                      onClick={() => handleAddLesson(chapterIndex)}
                      className="flex items-center mt-9 px-2 py-2 rounded-md gap-1 bg-white text-[#0056B3] text-xs w-3/5 justify-center"
                    >
                      <span className="text-sm"><IoIosAddCircleOutline /></span>
                      Add Lesson
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>











        {/* Right Content Area */}
        <div className="flex-1 bg-white rounded-lg">
          {renderRightContent()}
        </div>
      </div>


      {previewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-auto relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {previewContent.type === 'video' ? 'Video Preview' : 'Material Preview'}
              </h3>
              <button
                onClick={() => setPreviewOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <span className="material-icons">close</span>
              </button>
            </div>

            <div className="mb-6">
              {previewContent.type === 'video' ? (
                <div className="relative">
                  <video
                    src={previewContent.url}
                    controls
                    className="w-full rounded-lg"
                    autoPlay
                  />
                </div>
              ) : (
                <iframe
                  src={previewContent.url}
                  className="w-full h-[70vh] rounded-lg"
                  title="Material Preview"
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-3 mt-4 border-t pt-4">
              <button
                onClick={() => {
                  handleRemoveFile(previewContent.type === 'video' ? 'video' : 'materials', selectedLesson.chapterIndex, selectedLesson.lessonIndex);
                  setPreviewOpen(false);
                }}
                className="px-4 py-2 text-[#0056B3] hover:bg-gray-50 rounded border border-[#0056B3]"
              >
                Remove
              </button>
              <button
                onClick={() => setPreviewOpen(false)}
                className="px-4 py-2 bg-[#0056B3] text-white hover:bg-blue-700 rounded"
              >
                Keep
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-700">Uploading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseContent; 