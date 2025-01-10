import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import useCourseCreationStore from '../../../../stores/courseCreationStore';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { TbCopy } from "react-icons/tb";
import './CourseSettings.css'
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Coursecontent.css'
import { BsQuestionOctagon } from "react-icons/bs";
import { LiaEdit, LiaUploadSolid } from "react-icons/lia";
import { IoIosAddCircleOutline } from 'react-icons/io';
import { CiFileOn, CiPlay1 } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuFileQuestion, LuFileText } from "react-icons/lu";
import { MdOutlineFileUpload } from 'react-icons/md';
import { BiBookContent } from 'react-icons/bi';
import { PiExam } from 'react-icons/pi';
import { MdContentCopy } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
  const [editingContentTitle, setEditingContentTitle] = useState(false);
  const [isMandatory, setIsMandatory] = useState(false);

  // Add new chapter
  const handleAddChapter = () => {
    const newChapter = {
      chapterName: '',
      lessons: [],
      isNew: true  // Add this flag to identify new chapters
    };
    setChapters([...chapters, newChapter]);
    setSelectedChapter(chapters.length);
    setEditingChapter(chapters.length);
    setEditName('');
  };

  // Select chapter


  // Select lesson and show right content
  const handleSelectLesson = (chapterIndex, lessonIndex) => {
    const lesson = chapters[chapterIndex].lessons[lessonIndex];
    
    // Initialize questions array if needed
    if ((lesson.lessonType === 'Quiz' || lesson.lessonType === 'PDF') && !lesson.questions) {
      const updatedChapters = [...chapters];
      updatedChapters[chapterIndex].lessons[lessonIndex] = {
        ...lesson,
        questions: []
      };
      setChapters(updatedChapters);
    }

    // Set selected chapter and lesson
    setSelectedChapter(chapterIndex);
    setSelectedLesson({
      ...lesson,
      chapterIndex,
      lessonIndex
    });
  };

  // Add new lesson to chapter
  const handleAddLesson = (chapterIndex) => {
    const updatedChapters = [...chapters];
    const newLessonIndex = updatedChapters[chapterIndex].lessons.length;
    
    updatedChapters[chapterIndex].lessons.push({
      lessonTitle: '',
      lessonType: 'Video',
      lessonContent: '',
      isNew: true,
      showDropdown: true
    });
    
    setChapters(updatedChapters);
    handleSelectLesson(chapterIndex, newLessonIndex);
    setEditName('');
    setEditingLesson(`${chapterIndex}-${newLessonIndex}`);
  };

  // Add question to quiz


  // Handle lesson type change
  const handleLessonTypeChange = (chapterIndex, lessonIndex, newType) => {
    // First select the lesson
    handleSelectLesson(chapterIndex, lessonIndex);
    
    // Then update the type
    const updatedChapters = [...chapters];
    const lesson = updatedChapters[chapterIndex].lessons[lessonIndex];
    
    const updatedLesson = {
      ...lesson,
      lessonType: newType,
      lessonContent: newType === 'PDF' ? '' : lesson.lessonContent,
      questions: (newType === 'Quiz' || newType === 'PDF') ? [] : undefined,
      videoUrl: newType === 'Video' ? '' : undefined,
      materials: newType === 'PDF' ? [] : undefined,
    };
    
    updatedChapters[chapterIndex].lessons[lessonIndex] = updatedLesson;
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
    // Show message when no lesson is selected or when there are no lessons
    if (!selectedLesson || !chapters.some(chapter => chapter.lessons.length > 0)) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <span className=" translate-y-[-700%] text-gray-500 text-lg">Add lesson to show content</span>
        </div>
      );
    }

    switch (selectedLesson.lessonType.toLowerCase()) {
      case 'video':
        return (
          <div className="p-4">
            <div className="flex justify-between items-center gap-2 w-[790px] ">
              <div>
                {editingContentTitle ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onBlur={() => {
                      if (editName.trim() !== '') {
                        const updatedChapters = [...chapters];
                        updatedChapters[selectedLesson.chapterIndex]
                          .lessons[selectedLesson.lessonIndex].lessonTitle = editName.trim();
                        setChapters(updatedChapters);
                      }
                      setEditingContentTitle(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.target.blur();
                      }
                      if (e.key === 'Escape') {
                        setEditingContentTitle(false);
                      }
                    }}
                    className="text-lg font-medium outline-none border-b border-blue-500"
                    autoFocus
                  />
                ) : (
                  <>

                    <div className='flex justify-between items-center gap-2'>

                      <h3 className="font-bold text-lg">
                        <p className='text-[#4b5563]'> <span className='font-bold'> Lesson Name: </span >
                          {chapters[selectedLesson.chapterIndex]?.lessons[selectedLesson.lessonIndex]?.lessonTitle || ''}
                        </p>
                        <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveLesson(chapterIndex, lessonIndex);
                                  }}
                                  className="text-red-500 hover:text-red-700 p-1"
                                  title="Delete lesson"
                                >
                                  <span className="text-sm">
                                    <RiDeleteBinLine style={{ borderRadius: "1000px" }} />
                                  </span>
                                </button>
                      </h3>

                      <button
                        onClick={() => {
                          setEditName(chapters[selectedLesson.chapterIndex]?.lessons[selectedLesson.lessonIndex]?.lessonTitle || '');
                          setEditingContentTitle(true);
                        }}
                        className="text-gray-500 hover:text-gray-700 "
                      >
                        <span className=" font-bold text-xl text-[#4b5563]"><LiaEdit style={{ fontWeight: "bold", borderRadius: "1000px" }} /></span>
                      </button>
                    </div>
                  </>
                )}



              </div>

              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer h-[24px] w-[42px]"
                    checked={isMandatory}
                    onChange={(e) => setIsMandatory(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span className="text-sm text-gray-600" style={{ fontWeight: "" }}>Mandatory</span>

              </div>


            </div>



            <div className="space-y-4 mt-6">
              <div>
                <label className="block mb-2">Upload Lesson Video*</label>
                <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-2">
                  <div className="text-center relative">
                    <div className="absolute top-0 right-0">
                      <label
                        htmlFor={getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'video') ? undefined : `video-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                        className={`px-4 py-1.5 ${getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'video')
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-gray-500 hover:bg-gray-600 cursor-pointer'} text-white rounded flex items-center gap-1`}
                      >
                        Browse
                        <span className="text-xl"><MdOutlineFileUpload /></span>
                      </label>
                    </div>

                    <input
                      type="file"
                      id={`video-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                      className="hidden"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, 'video', selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                      disabled={getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'video')}
                    />
                    <label
                      htmlFor={getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'video') ? undefined : `video-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                      className={`cursor-${getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'video') ? 'default' : 'pointer'}`}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <img src="https://res.cloudinary.com/defsu5bfc/image/upload/v1736341749/image-05_zjmxze.png" alt="" />
                        <p className="mt-1 text-sm text-gray-500">
                          Drag and Drop Or Browse<br />
                          MP4, ... up to 200 MB
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className=' flex relative bottom-2 '>

                <div >

                  {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'video') && (
                    <div className=" text-sm h-8 text-[#4B5563] bg-[#F2F9FF] p-2 rounded-md cursor-pointer flex space-x-3 items-center">
                      <p
                        className="cursor-pointer hover:text-[#0056B3] underline  underline-offset-4 text-[#4B5563]"
                        onClick={() => handlePreviewClick('video', chapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].lessonVideo)}
                      >
                        {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'video').name}
                      </p>

                      <button
                        onClick={() => handleRemoveFile('video', selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                        className="text-[#4B5563] hover:text-gray-700 ml-2 text-2xl mb-1"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>

              </div>

              <div>
                <label className="block mb-2">Upload Lesson Materials (Optional)</label>
                <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-2">
                  <div className="text-center relative">
                    {/* Add Browse button to top right */}
                    <div className="absolute top-0 right-0">
                      <label
                        htmlFor="category-upload"
                        className="px-4 py-1.5 bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-600 flex items-center gap-1"
                      >
                        Browse
                        <span className=" text-xl"><MdOutlineFileUpload /></span>
                      </label>
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
                        <img src="https://res.cloudinary.com/defsu5bfc/image/upload/v1736341749/image-05_zjmxze.png" alt="" />
                        <p className="mt-1 text-sm text-gray-500">
                          Drag and Drop Or Browse<br />
                          PDF, DOC, DOCX... up to 20 MB
                        </p>
                      </div>
                    </label>
                  </div>



                </div>
              </div>


              <div className=' flex relative bottom-2 '>
                <div>
                  {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'materials') && (
                    <div className="  text-sm h-8 text-[#4B5563] bg-[#F2F9FF] p-2 rounded-md cursor-pointer flex space-x-3 items-center">
                      <p
                        className="cursor-pointer hover:text-[#0056B3] underline  underline-offset-4 text-[#4B5563]"
                        onClick={() => handlePreviewClick('materials', chapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].lessonMaterials)}
                      >
                        {getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'materials').name}
                      </p>
                      <button
                        onClick={() => handleRemoveFile('materials', selectedLesson.chapterIndex, selectedLesson.lessonIndex)}
                        className="text-[#4B5563] hover:text-gray-700 ml-2 text-2xl mb-1"
                      >
                        ×
                      </button>
                    </div>
                  )}

                </div>




                <div >

                </div>
              </div>

              {/* Quiz Section */}
              <div className="mt-8 h-[50vh] overflow-y-auto overflow-x-hidden w-[829px]">
                {(!selectedLesson.questions || selectedLesson.questions.length === 0) ? (
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => {
                        const updatedChapters = [...chapters];
                        if (!updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].questions) {
                          updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].questions = [];
                        }
                        updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].questions.push({
                          question: '',
                          questionType: 'mcq',
                          options: [
                            { option: '', isCorrect: false },
                            { option: '', isCorrect: false }
                          ]
                        });
                        setChapters(updatedChapters);
                      }}
                      className="flex items-center  bg-[#f2f9ff] px-2 py-1  rounded text-xl text-center gap-2 text-[#4B5563] border border-[#0056B3] hover:text-blue-700"
                    >
                      <span className="material-icons text-xl">add_circle_outline</span>
                      Add Quiz Question
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 h-full overflow-hidden w-[829px]">
                    <div className="h-full flex flex-col">
                      <div className="flex justify-between items-center mb-4 flex-shrink-0">
                        <h2 className="font-[700] text-2xl text-gray-600">Quiz</h2>
                        <div className="flex gap-4">
                          <button
                            onClick={() => {
                              if (selectedLesson.questions?.some((_, idx) => !collapsedQuestions.has(idx))) {
                                // If any question is expanded, collapse all
                                setCollapsedQuestions(new Set(selectedLesson.questions.map((_, idx) => idx)));
                              } else {
                                // If all are collapsed, expand all
                                setCollapsedQuestions(new Set());
                              }
                            }}
                            className="text-[#0056B3] hover:text-[#004494] flex items-center gap-1"
                          >
                            <span className="material-icons text-sm">
                              {selectedLesson.questions?.some((_, idx) => !collapsedQuestions.has(idx)) 
                                ? 'unfold_less' 
                                : 'unfold_more'
                              }
                            </span>
                            {selectedLesson.questions?.some((_, idx) => !collapsedQuestions.has(idx))
                              ? 'Collapse All'
                              : 'Expand All'
                            }
                          </button>
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
                                  questionType: 'mcq',
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
                            {selectedLesson.questions?.length > 0 ? 'Add Another' : 'Add Question'}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 overflow-y-auto pr-2 flex-grow">
                        {!selectedLesson.questions?.length ? (
                          <div className="h-full flex flex-col items-center justify-center">
                            <p className="text-gray-500 text-lg">Add questions to display</p>
                          </div>
                        ) : (
                          selectedLesson.questions?.map((q, qIndex) => (
                            <div key={qIndex} className="border rounded-lg bg-white shadow-sm">
                              <div className="flex justify-between items-center p-4 border-b bg-[#f3f4f6] h-[56px] rounded border border-[#6B7280] ">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <BsQuestionOctagon className="text-[#0056B3] font-extrabold text-xl" />
                                    <span className='text-lg font-[700]'>Question {qIndex + 1}</span>
                                  </div>

                                  <select
                                    value={q.questionType || 'mcq'}
                                    onChange={(e) => {
                                      const updatedChapters = [...chapters];
                                      updatedChapters[selectedLesson.chapterIndex]
                                        .lessons[selectedLesson.lessonIndex]
                                        .questions[qIndex].questionType = e.target.value;
                                      setChapters(updatedChapters);
                                    }}
                                    className="text-sm border rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                                  >
                                    <option value="mcq">MCQs</option>
                                    <option value="best">Choose the best answer</option>
                                  </select>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleCopyQuestion(selectedLesson.chapterIndex, selectedLesson.lessonIndex, qIndex)}
                                    className="text-gray-500 hover:text-gray-700"
                                    title="Copy question"
                                  >
                                    <TbCopy className="text-lg" />
                                  </button>
                                  <button
                                    onClick={() => handleRemoveQuestion(selectedLesson.chapterIndex, selectedLesson.lessonIndex, qIndex)}
                                    className="text-[#DC3545] hover:text-red-700"
                                  >
                                    <span className="text-lg">
                                      <RiDeleteBinLine style={{ borderRadius: "500px" }} />
                                    </span>
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
                                  <div className="space-y-2">
                                    <label className="block text-gray-700 text-sm mb-1">
                                      Question *
                                    </label>
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
                                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    />
                                  </div>

                                  <div className="space-y-3">
                                    <label className="block text-gray-700 text-sm mb-1">
                                      Options * ( Select the right answers)
                                    </label>
                                    {q.options.map((option, oIndex) => (
                                      <div key={oIndex} className="flex items-center gap-2">
                                        {q.questionType === 'mcq' ? (
                                          <input
                                            type="checkbox"
                                            checked={option.isCorrect}
                                            onChange={() => {
                                              const updatedChapters = [...chapters];
                                              const currentQuestion = updatedChapters[selectedLesson.chapterIndex]
                                                .lessons[selectedLesson.lessonIndex]
                                                .questions[qIndex];
                                              currentQuestion.options[oIndex].isCorrect = !option.isCorrect;
                                              setChapters(updatedChapters);
                                            }}
                                            className="form-checkbox text-[#0056B3]"
                                          />
                                        ) : (
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
                                        )}
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
                                          placeholder={`Enter option ${oIndex + 1}`}
                                          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
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
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>


          </div>
        );

      case 'pdf':
        return (
          <div className="p-4">
            <div className="space-y-4">
              <div className="">
                <label className="block mb-2">Lesson Content *</label>
                <div className="quill-wrapper">
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
                      }
                    }}
                    className="rounded-lg"
                  />
                  <style>
                    {`
                      .quill-wrapper {
                        position: relative;
                        border-radius: 0.5rem;
                      }
                      .quill-wrapper:focus-within {
                        outline: none;
                        box-shadow: 0 0 0 2px rgb(75 85 99);
                      }
                      .quill-wrapper .ql-container {
                        border: 1px solid #e2e8f0;
                        border-top: none;
                        height: 400px !important;
                        overflow-y: auto;
                        border-bottom-left-radius: 0.5rem;
                        border-bottom-right-radius: 0.5rem;
                      }
                      .quill-wrapper .ql-editor {
                        height: 100%;
                        overflow-y: auto;
                      }
                      .quill-wrapper .ql-toolbar {
                        border: 1px solid #e2e8f0;
                        border-top-left-radius: 0.5rem;
                        border-top-right-radius: 0.5rem;
                        position: sticky;
                        top: 0;
                        background: white;
                        z-index: 1;
                      }
                      .quill-wrapper .ql-picker:focus-within {
                        outline: none;
                        box-shadow: 0 0 0 2px rgb(75 85 99);
                        border-radius: 0.25rem;
                      }
                      .quill-wrapper .ql-picker-options {
                        border: 1px solid #e2e8f0;
                        border-radius: 0.25rem;
                      }
                      .quill-wrapper .ql-picker-label:focus {
                        outline: none;
                        box-shadow: 0 0 0 2px rgb(75 85 99);
                        border-radius: 0.25rem;
                      }
                    `}
                  </style>
                </div>
              </div>

              <div className=''>
                <label className="block mt-12 relative">Additional Materials *</label>
                <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-2">
                  <div className="text-center relative">
                    <div className="absolute top-0 right-0">
                      <label
                        htmlFor={getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'video') ? undefined : `video-${selectedLesson.chapterIndex}-${selectedLesson.lessonIndex}`}
                        className={`px-4 py-1.5 ${getStoredFileInfo(selectedLesson.chapterIndex, selectedLesson.lessonIndex, 'video')
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-gray-500 hover:bg-gray-600 cursor-pointer'} text-white rounded flex items-center gap-1`}
                      >
                        Browse
                        <span className="text-xl"><MdOutlineFileUpload /></span>
                      </label>
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
                        <img src="https://res.cloudinary.com/defsu5bfc/image/upload/v1736341749/image-05_zjmxze.png" alt="" />
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

              {/* Quiz Section - Exactly the same as the main case */}
              <div className="mt-8">
                {(!selectedLesson.questions || selectedLesson.questions.length === 0) ? (
                  <div className="flex justify-center items-center">
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
                            questionType: 'mcq',
                            options: [
                              { option: '', isCorrect: false },
                              { option: '', isCorrect: false }
                            ]
                          });
                        setChapters(updatedChapters);
                      }}
                      className="fflex items-center  bg-[#f2f9ff] px-2 py-1  rounded text-xl text-center gap-2 text-[#4B5563] border border-[#0056B3] hover:text-blue-700"
                    >
                      <span className="material-icons text-xl">add_circle_outline</span>
                      Add Quiz Question
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 h-full overflow-hidden w-[829px]">
                    <div className="h-full flex flex-col">
                      <div className="flex justify-between items-center mb-4 flex-shrink-0">
                        <h2 className="font-[700] text-2xl text-gray-600">Quiz</h2>
                        <div className="flex gap-4">
                          <button
                            onClick={() => {
                              if (selectedLesson.questions?.some((_, idx) => !collapsedQuestions.has(idx))) {
                                // If any question is expanded, collapse all
                                setCollapsedQuestions(new Set(selectedLesson.questions.map((_, idx) => idx)));
                              } else {
                                // If all are collapsed, expand all
                                setCollapsedQuestions(new Set());
                              }
                            }}
                            className="text-[#0056B3] hover:text-[#004494] flex items-center gap-1"
                          >
                            <span className="material-icons text-sm">
                              {selectedLesson.questions?.some((_, idx) => !collapsedQuestions.has(idx)) 
                                ? 'unfold_less' 
                                : 'unfold_more'
                              }
                            </span>
                            {selectedLesson.questions?.some((_, idx) => !collapsedQuestions.has(idx))
                              ? 'Collapse All'
                              : 'Expand All'
                            }
                          </button>
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
                                  questionType: 'mcq',
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
                            {selectedLesson.questions?.length > 0 ? 'Add Another' : 'Add Question'}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 overflow-y-auto pr-2 flex-grow">
                        {!selectedLesson.questions?.length ? (
                          <div className="h-full flex flex-col items-center justify-center">
                            <p className="text-gray-500 text-lg">Add questions to display</p>
                          </div>
                        ) : (
                          selectedLesson.questions?.map((q, qIndex) => (
                            <div key={qIndex} className="border rounded-lg bg-white shadow-sm">
                              <div className="flex justify-between items-center p-4 border-b bg-[#f3f4f6]">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                  <BsQuestionOctagon className="text-[#0056B3] font-extrabold text-xl" />
                                  <span className='text-lg font-[700]'>Question {qIndex + 1}</span>
                                  </div>

                                  <select
                                    value={q.questionType || 'mcq'}
                                    onChange={(e) => {
                                      const updatedChapters = [...chapters];
                                      updatedChapters[selectedLesson.chapterIndex]
                                        .lessons[selectedLesson.lessonIndex]
                                        .questions[qIndex].questionType = e.target.value;
                                      setChapters(updatedChapters);
                                    }}
                                    className="text-sm border rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                                  >
                                    <option value="mcq">MCQs</option>
                                    <option value="best">Choose the best answer</option>
                                  </select>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleCopyQuestion(selectedLesson.chapterIndex, selectedLesson.lessonIndex, qIndex)}
                                    className="text-gray-500 hover:text-gray-700"
                                    title="Copy question"
                                  >
                                    <MdContentCopy className="text-lg" />
                                  </button>
                                  <button
                                    onClick={() => handleRemoveQuestion(selectedLesson.chapterIndex, selectedLesson.lessonIndex, qIndex)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <span className="text-lg">
                                      <RiDeleteBinLine style={{ borderRadius: "500px" }} />
                                    </span>
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
                                  <div className="space-y-2">
                                    <label className="block text-gray-700 text-sm mb-1">
                                      Question *
                                    </label>
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
                                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    />
                                  </div>

                                  <div className="space-y-3">
                                    <label className="block text-gray-700 text-sm mb-1">
                                      Options * ( Select the right answers)
                                    </label>
                                    {q.options.map((option, oIndex) => (
                                      <div key={oIndex} className="flex items-center gap-2">
                                        {q.questionType === 'mcq' ? (
                                          <input
                                            type="checkbox"
                                            checked={option.isCorrect}
                                            onChange={() => {
                                              const updatedChapters = [...chapters];
                                              const currentQuestion = updatedChapters[selectedLesson.chapterIndex]
                                                .lessons[selectedLesson.lessonIndex]
                                                .questions[qIndex];
                                              currentQuestion.options[oIndex].isCorrect = !option.isCorrect;
                                              setChapters(updatedChapters);
                                            }}
                                            className="form-checkbox text-[#0056B3]"
                                          />
                                        ) : (
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
                                        )}
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
                                          placeholder={`Enter option ${oIndex + 1}`}
                                          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
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
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'quiz':
        return (
          <>
            <div className="bg-white rounded-lg p-6 h-[calc(100vh-280px)]">
              <div className="flex h-full">
                <div className="flex-1 pl-6 h-full overflow-hidden">
                  <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4 flex-shrink-0">
                      <h2 className="font-[700] text-2xl text-gray-600">Quiz</h2>
                      <div className="flex items-center gap-4">
                        {selectedLesson.questions?.length > 0 && (
                          <button
                            onClick={() => {
                              if (selectedLesson.questions?.some((_, idx) => !collapsedQuestions.has(idx))) {
                                setCollapsedQuestions(new Set(selectedLesson.questions.map((_, idx) => idx)));
                              } else {
                                setCollapsedQuestions(new Set());
                              }
                            }}
                            className="text-[#0056B3] hover:text-[#004494] flex items-center gap-1"
                          >
                            <span className="material-icons text-sm">
                              {selectedLesson.questions?.some((_, idx) => !collapsedQuestions.has(idx)) 
                                ? 'unfold_less' 
                                : 'unfold_more'
                              }
                            </span>
                              {selectedLesson.questions?.some((_, idx) => !collapsedQuestions.has(idx))
                                ? 'Collapse All'
                                : 'Expand All'
                              }
                            </button>
                        )}
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
                                questionType: 'mcq',
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
                          {selectedLesson.questions?.length > 0 ? 'Add Another' : 'Add Question'}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 overflow-y-auto pr-2 flex-grow">
                      {!selectedLesson.questions?.length ? (
                        <div className="h-full flex flex-col items-center justify-center">
                          <p className="text-gray-500 text-3xl ">Add questions to display</p>
                        </div>
                      ) : (
                        selectedLesson.questions?.map((q, qIndex) => (
                          <div key={qIndex} className="border rounded-lg bg-white shadow-sm">
                            <div className="flex justify-between items-center p-4 border-b bg-[#f3f4f6]">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <BsQuestionOctagon className="text-[#0056B3] font-extrabold text-xl" />
                                    <span className='text-lg font-[700]'>Question {qIndex + 1}</span>
                                </div>

                                <select
                                  value={q.questionType || 'mcq'}
                                  onChange={(e) => {
                                    const updatedChapters = [...chapters];
                                    updatedChapters[selectedLesson.chapterIndex]
                                      .lessons[selectedLesson.lessonIndex]
                                      .questions[qIndex].questionType = e.target.value;
                                    setChapters(updatedChapters);
                                  }}
                                  className="text-sm border rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                                >
                                  <option value="mcq">MCQs</option>
                                  <option value="best">Choose the best answer</option>
                                </select>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleCopyQuestion(selectedLesson.chapterIndex, selectedLesson.lessonIndex, qIndex)}
                                  className="text-gray-500 hover:text-gray-700"
                                  title="Copy question"
                                >
                                  <MdContentCopy className="text-lg" />
                                </button>
                                <button
                                  onClick={() => handleRemoveQuestion(selectedLesson.chapterIndex, selectedLesson.lessonIndex, qIndex)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <span className="text-lg">
                                    <RiDeleteBinLine style={{ borderRadius: "500px" }} />
                                  </span>
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
                                <div className="space-y-2">
                                  <label className="block text-gray-700 text-sm mb-1">
                                    Question *
                                  </label>
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
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                                  />
                                </div>

                                <div className="space-y-3">
                                  <label className="block text-gray-700 text-sm mb-1">
                                    Options * ( Select the right answers)
                                  </label>
                                  {q.options.map((option, oIndex) => (
                                    <div key={oIndex} className="flex items-center gap-2">
                                      {q.questionType === 'mcq' ? (
                                        <input
                                          type="checkbox"
                                          checked={option.isCorrect}
                                          onChange={() => {
                                            const updatedChapters = [...chapters];
                                            const currentQuestion = updatedChapters[selectedLesson.chapterIndex]
                                              .lessons[selectedLesson.lessonIndex]
                                              .questions[qIndex];
                                            currentQuestion.options[oIndex].isCorrect = !option.isCorrect;
                                            setChapters(updatedChapters);
                                          }}
                                          className="form-checkbox text-[#0056B3]"
                                        />
                                      ) : (
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
                                      )}
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
                                        placeholder={`Enter option ${oIndex + 1}`}
                                        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
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
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
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
      questionType: 'mcq', // Add default question type
      isOpenSource: true,
      options: [
        { option: '', isCorrect: false },
        { option: '', isCorrect: false }
      ]
    });

    setChapters(updatedChapters);
    updateCourseData('content', { chapters: updatedChapters });
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

  // Add this new function to handle copying questions
  const handleCopyQuestion = (chapterIndex, lessonIndex, questionIndex) => {
    const updatedChapters = [...chapters];
    const lesson = updatedChapters[chapterIndex].lessons[lessonIndex];

    // Deep clone the question to copy
    const questionToCopy = JSON.parse(JSON.stringify(lesson.questions[questionIndex]));

    // Insert the copied question after the current question
    lesson.questions.splice(questionIndex + 1, 0, questionToCopy);

    setChapters(updatedChapters);
    updateCourseData('content', { chapters: updatedChapters });
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

  useEffect(() => {
    if (selectedLesson && selectedLesson.lessonType === 'Video' && !selectedLesson.questions) {
      const updatedChapters = [...chapters];
      if (!updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].questions) {
        updatedChapters[selectedLesson.chapterIndex].lessons[selectedLesson.lessonIndex].questions = [];
        setChapters(updatedChapters);
      }
    }
  }, [selectedLesson]);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="fixed calc-height w-[310px] h-[600px] gap-4 p-4 border-2 border-[#E2E8F0] overflow-x-hidden overflow-y-auto bg-white">
                  <style>
                    {`
          .calc-height {
            height: calc(100vh - 300px); /* Adjust the pixel value based on your header and navigation heights */
            min-height: 400px; /* Set a minimum height to prevent content from being too compressed */
          }
        `}
          </style>
          <h2 className="font-medium mb-4 w-[84px] h-[24px] relative" style={{ fontSize: '16px', fontWeight: '500', lineHeight: '24px', letterSpacing: '0.15px', textAlign: 'left', color: '#1A202C' }}>Curriculum</h2>
          <button
            onClick={handleAddChapter}
            className="flex font-normal items-center rounded text-[14px] h-[36px] w-[278px] gap-2 text-[#0056B3] bg-[#f2f9ff] mb-4 justify-center "
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
                className={`flex items-center w-[278px] h-[32px] gap-2 p-2 bg-white rounded cursor-pointer ${selectedChapter === chapterIndex ? 'bg-white' : ''
                  }`}
              >
                <span className="material-icons text-[#d1d5db] text-2xl h-[36px] mt-1 ">drag_indicator</span>
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
                            chapterName: editName.trim(),
                            isNew: false
                          };
                          setChapters(updatedChapters);
                        } else if (chapter.isNew) {
                          // Remove the chapter if it's new and name is empty
                          const updatedChapters = [...chapters];
                          updatedChapters.splice(chapterIndex, 1);
                          setChapters(updatedChapters);
                        }
                        setEditingChapter(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (editName.trim() === '' && chapter.isNew) {
                            // Remove the chapter if it's new and name is empty
                            const updatedChapters = [...chapters];
                            updatedChapters.splice(chapterIndex, 1);
                            setChapters(updatedChapters);
                          }
                          e.target.blur();
                        }
                        if (e.key === 'Escape') {
                          if (chapter.isNew) {
                            // Remove the chapter if it's new
                            const updatedChapters = [...chapters];
                            updatedChapters.splice(chapterIndex, 1);
                            setChapters(updatedChapters);
                          }
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
                          e.preventDefault();
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
                      <span className="material-icons text-lg"><RiDeleteBinLine style={{ borderRadius: "500px" }} /> </span>
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
                <div className="mt-2 space-y-1.5 p-3 bg-[#f3f4f6]">
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
                        className={`flex items-center h-[32px] w-[250px] rounded cursor-pointer   ${
                          selectedLesson?.chapterIndex === chapterIndex &&
                          selectedLesson?.lessonIndex === lessonIndex
                          ? 'bg-[#f2f9ff] border-l-4 border-[#0056B3]'
                          : 'bg-white'
                        }`}
                        style={{padding:"6px 16px 6px 16px"}}
                        onClick={() => handleSelectLesson(chapterIndex, lessonIndex)}
                      >
                        {/* Lesson Icon based on type */}
                        <span className="material-icons text-[#4b5563] text-xl font-bold">
                          {lesson.lessonType === 'Video' ?
                            <CiPlay1 className="w-5 h-5 font-extrabold stroke-1" /> :

                            lesson.lessonType === 'Quiz' ? <PiExam className="w-5 h-5 font-extrabold stroke-1" /> :

                              lesson.lessonType === 'Content' ? <BiBookContent className="w-5 h-5 " /> : <BiBookContent className="w-5 h-5 " />


                          }
                        </span>

                        <div className="flex items-center flex-1 min-w-0">
                          {/* <span className="text-xs whitespace-nowrap">Lesson {lessonIndex + 1}: </span> */}
                          {editingLesson === `${chapterIndex}-${lessonIndex}` ? (
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center flex-1">
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  onBlur={(e) => {
                                    // Check if clicking dropdown
                                    const relatedTarget = e.relatedTarget;
                                    const isClickingDropdown = relatedTarget && 
                                      (relatedTarget.tagName === 'SELECT' || 
                                       relatedTarget.tagName === 'OPTION');

                                    if (isClickingDropdown) {
                                      // If clicking dropdown and name is empty, keep the lesson but don't save it
                                      if (editName.trim() === '') {
                                        return;
                                      }
                                    }

                                    if (lesson.isNew) {
                                      if (editName.trim() !== '') {
                                        // Save only if name is not empty
                                        const updatedChapters = [...chapters];
                                        updatedChapters[chapterIndex].lessons[lessonIndex] = {
                                          ...lesson,
                                          lessonTitle: editName.trim(),
                                          isNew: false,
                                          showDropdown: false
                                        };
                                        setChapters(updatedChapters);
                                        setEditingLesson(null);
                                        handleSelectLesson(chapterIndex, lessonIndex);
                                      } else if (!isClickingDropdown) {
                                        // Remove only if not clicking dropdown and name is empty
                                        const updatedChapters = [...chapters];
                                        updatedChapters[chapterIndex].lessons.splice(lessonIndex, 1);
                                        setChapters(updatedChapters);
                                        setEditingLesson(null);
                                      }
                                    } else {
                                      // For existing lessons, keep old name if empty
                                      const updatedChapters = [...chapters];
                                      updatedChapters[chapterIndex].lessons[lessonIndex] = {
                                        ...lesson,
                                        lessonTitle: editName.trim() || lesson.lessonTitle
                                      };
                                      setChapters(updatedChapters);
                                      setEditingLesson(null);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      if (editName.trim() === '' && lesson.isNew) {
                                        const updatedChapters = [...chapters];
                                        updatedChapters[chapterIndex].lessons.splice(lessonIndex, 1);
                                        setChapters(updatedChapters);
                                      }
                                      e.target.blur();
                                    }
                                    if (e.key === 'Escape') {
                                      if (lesson.isNew) {
                                        const updatedChapters = [...chapters];
                                        updatedChapters[chapterIndex].lessons.splice(lessonIndex, 1);
                                        setChapters(updatedChapters);
                                      }
                                      setEditingLesson(null);
                                    }
                                  }}
                                  className="text-xs ml-2 w-[80px] flex-1 outline-none rounded border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 placeholder:pl-2"
                                  autoFocus
                                  placeholder="Lesson name"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {lesson.isNew && (
                                  <select
                                    value={lesson.lessonType}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      const lessonType = e.target.value;
                                      const updatedChapters = [...chapters];
                                      updatedChapters[chapterIndex].lessons[lessonIndex] = {
                                        ...lesson,
                                        lessonType,
                                        showDropdown: true,
                                        isNew: lesson.isNew  // Keep existing isNew state
                                      };
                                      setChapters(updatedChapters);
                                      
                                      // Update selected lesson to trigger right side content update
                                      handleSelectLesson(chapterIndex, lessonIndex);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-xs w-[70px] border rounded bg-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    style={{
                                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                      backgroundRepeat: 'no-repeat', 
                                      backgroundPosition: 'right 0.5rem center',
                                      backgroundSize: '1em',
                                      padding: '4px 8px'
                                    }}
                                  >
                                    <option value="Video">Video</option>
                                    <option value="PDF">Content</option>
                                    <option value="Quiz">Quiz</option>
                                  </select>
                                )}
                                
                               
                              </div>
                            </div>
                          ) : (
                            <>
                              <span
                                className="text-xs text-gray-700 font-bold flex-1 ml-1 truncate"
                                onDoubleClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const currentLesson = chapters[chapterIndex].lessons[lessonIndex];
                                  setEditName(currentLesson.lessonTitle || '');
                                  setEditingLesson(`${chapterIndex}-${lessonIndex}`);
                                  handleSelectLesson(chapterIndex, lessonIndex);
                                }}
                                title={lesson.lessonTitle || ''}
                              >
                                {lesson.lessonTitle ?
                                  (lesson.lessonTitle.length > 13 ?
                                    `${lesson.lessonTitle.substring(0, 13)}...` :
                                    lesson.lessonTitle
                                  ) : ''
                                }
                              </span>

                              <select
                                value={lesson.lessonType}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectLesson(chapterIndex, lessonIndex);
                                }}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleLessonTypeChange(chapterIndex, lessonIndex, e.target.value);
                                }}
                                className="text-xs border ml-3 rounded bg-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-gray-600"
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

                           
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}

                  {/* Add Lesson Button - with conditional disabled state and tooltip */}
                  <div className='flex justify-center'>
                    <button
                      onClick={() => handleAddLesson(chapterIndex)}
                      disabled={chapter.lessons.some(lesson => !lesson.lessonTitle?.trim())}
                      title={chapter.lessons.some(lesson => !lesson.lessonTitle?.trim()) ? "Please enter lesson name before adding new lesson" : ""}
                      className={`flex items-center mt-9 px-2 py-2 rounded-md gap-1 bg-white text-xs w-3/5 justify-center ${
                        chapter.lessons.some(lesson => !lesson.lessonTitle?.trim())
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-[#0056B3] hover:bg-[#f2f9ff]'
                      }`}
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
        <div className="flex-1 flex justify-center items-center ml-[310px]">
          <div className='w-[830px] h-[700px]'>
            {renderRightContent()}
          </div>
        </div>
      </div>

      {previewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-3xl h-[538px] w-[732px] overflow-auto">
            <div className="flex justify-start border-b-2 border-[#E5E7EB] w-[732px] h-[56px]">
              <p
                className='text-lg text-[16px] line-height-[24px] text-[#6B7280] p-1'
                style={{ padding: "16px 24px 16px 24px", fontWeight: "700" }}
              >
                {previewContent.type === 'video' ? 'Video Preview' : 'Material Preview'}
              </p>
            </div>

            <div className="mb-6">
              {previewContent.type === 'video' ? (
                <div className="relative">
                  <video
                    src={previewContent.url}
                    controls
                    className="mt-3 ml-[20px] w-[692px] h-[360px]"
                    autoPlay
                  />
                </div>
              ) : (
                <iframe
                  src={previewContent.url}
                  className="mt-3 ml-[20px] w-[692px] h-[360px]"
                  title="Material Preview"
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className='flex justify-between border-t-2 mt-9 border-[#E5E7EB] w-[732px] px-8'>
              <button
                onClick={() => {
                  handleRemoveFile(
                    previewContent.type === 'video' ? 'video' : 'materials',
                    selectedLesson.chapterIndex,
                    selectedLesson.lessonIndex
                  );
                  setPreviewOpen(false);
                }}
                className="bg-white px-4 h-8 mt-6 rounded-md text-[#0056B3] hover:text-gray-700 mt-3 border border-[#0056B3]"
              >
                Remove
              </button>

              <button
                onClick={() => setPreviewOpen(false)}
                className="bg-[#0056b3] mt-6 px-4 h-8 rounded-md text-white hover:text-white mt-3"
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