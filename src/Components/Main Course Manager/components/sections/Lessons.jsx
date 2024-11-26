import { FiPlus } from "react-icons/fi";
import { useEffect, useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import useCourseStore from "../../../../store/courseStore";
import "../../styles/scrollbar.css";
import axios from 'axios';
import './quiltestl.css'
// Import Quill directly
import Quill from 'quill';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Cookies from 'js-cookie';
import config from "../../../../config/apiConfig";

const Lessons = () => {
  const courseData = useCourseStore((state) => state.courseData);
  const updateCourseData = useCourseStore((state) => state.updateCourseData);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [openResourceModal, setOpenResourceModal] = useState(false);
  const [newResource, setNewResource] = useState({
    resourceTitle: '',
    resourceDescription: '',
    resourceLink: '',
    resourceType: 'PDF',
    uploadType: 'link'
  });

  useEffect(() => {
    // Show first lesson by default
    if (courseData?.lessons?.length > 0 && !selectedLessonId) {
      setSelectedLessonId(courseData.lessons[0].id);
    }
  }, [courseData?.lessons]);

  const handleAddLesson = () => {
    if (!courseData.lessons) return;
    
    const newLesson = {
      id: Date.now(),
      lessonTitle: "",
      lessonDuration: "",
      lessonContent: ""
    };

    updateCourseData({
      ...courseData,
      lessons: [...courseData.lessons, newLesson]
    });
    setSelectedLessonId(newLesson.id);
  };

  const handleLessonUpdate = (lessonId, updates) => {
    if (!courseData.lessons) return;
    
    const lessonIndex = courseData.lessons.findIndex(lesson => lesson.id === lessonId);
    const lessonNumber = lessonIndex + 1;

    // Format the lesson title with number if it's a title update
    const formattedUpdates = updates.lessonTitle 
      ? { ...updates, lessonTitle: `Lesson ${lessonNumber}: ${updates.lessonTitle.replace(/^Lesson \d+: /, '')}` }
      : updates;
    
    const updatedLessons = courseData.lessons.map(lesson => 
      lesson.id === lessonId ? { ...lesson, ...formattedUpdates } : lesson
    );

    updateCourseData({
      ...courseData,
      lessons: updatedLessons
    });
  };

  const handleRemoveLesson = (lessonId) => {
    if (!courseData.lessons) return;
    
    const updatedLessons = courseData.lessons.filter(lesson => lesson.id !== lessonId);
    
    updateCourseData({
      ...courseData,
      lessons: updatedLessons
    });

    // If we removed the selected lesson, select the first available lesson
    if (selectedLessonId === lessonId && updatedLessons.length > 0) {
      setSelectedLessonId(updatedLessons[0].id);
    } else if (updatedLessons.length === 0) {
      setSelectedLessonId(null);
    }
  };

  const handleFileUpload = async (file, fileType) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileType', fileType);

      const response = await axios.post(`http://localhost:8082/upload `, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data.url;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const imageHandler = (quillRef) => {
    return async () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        if (!file) return;

        try {
          const imageUrl = await handleFileUpload(file, 'image');
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection(true);
          
          editor.insertText(range.index, 'Uploading image...');
          editor.deleteText(range.index, 'Uploading image...'.length);
          editor.insertEmbed(range.index, 'image', imageUrl);
          editor.setSelection(range.index + 1);
        } catch (error) {
          console.error('Error handling image upload:', error);
          alert('Failed to upload image');
        }
      };
    };
  };

  const videoHandler = (quillRef) => {
    return async () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'video/*');
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        if (!file) return;

        try {
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection(true);

          editor.insertText(range.index, 'Uploading video...');

          const videoUrl = await handleFileUpload(file, 'video');

          editor.deleteText(range.index, 'Uploading video...'.length);

          editor.insertEmbed(range.index, 'video', videoUrl);
          editor.setSelection(range.index + 1);
        } catch (error) {
          console.error('Error handling video upload:', error);
          alert('Failed to upload video');
        }
      };
    };
  };

  // Create a ref for ReactQuill
  const quillRef = useRef(null);

  // Custom Blot for Video
  useEffect(() => {
    const BlockEmbed = Quill.import('blots/block/embed');

    class VideoBlot extends BlockEmbed {
      static create(url) {
        const node = super.create();
        node.setAttribute('class', 'ql-video');
        node.setAttribute('src', url);
        node.setAttribute('controls', true);
        node.setAttribute('controlsList', 'nodownload');
        node.setAttribute('style', 'max-width: 100%;');
        return node;
      }

      static value(node) {
        return node.getAttribute('src');
      }
    }
    VideoBlot.blotName = 'video';
    VideoBlot.tagName = 'video';

    Quill.register(VideoBlot);
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: imageHandler(quillRef),
        video: videoHandler(quillRef)
      }
    }
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  const renderContent = (content) => {
    const sanitizedContent = DOMPurify.sanitize(content, {
      ADD_TAGS: ['iframe', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img', 'span', 'video', 'source'],
      ADD_ATTR: ['target', 'href', 'src', 'alt', 'class', 'style', 'controls', 'allowfullscreen', 'frameborder', 'allow', 'width', 'height', 'controlsList']
    });

    return (
      <div className="lesson-content">
        <style>
          {`
            /* ... existing styles ... */

            /* Add these new styles for video */
            .lesson-content video {
              max-width: 100%;
              height: auto;
              margin: 2rem auto;
              display: block;
              border-radius: 8px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }

            .ql-video {
              width: 100%;
              max-width: 800px;
              height: auto;
              margin: 2rem auto;
              display: block;
            }

            /* Dark mode styles for video */
            @media (prefers-color-scheme: dark) {
              .lesson-content video {
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
              }
            }
          `}
        </style>
        <div className="ql-editor bg-white dark:bg-gray-800">
          {parse(sanitizedContent, {
            replace: (domNode) => {
              // Handle video elements
              if (domNode.name === 'video') {
                return (
                  <video
                    src={domNode.attribs?.src}
                    controls
                    controlsList="nodownload"
                    className="ql-video"
                  >
                    Your browser does not support the video tag.
                  </video>
                );
              }
            }
          })}
        </div>
      </div>
    );
  };

  const handleResourceFileUpload = async (file) => {
    try {
      if (!file) return;

      // Validate file type
      const fileType = file.name.split('.').pop().toLowerCase();
      if (!['pdf', 'xlsx', 'xls'].includes(fileType)) {
        alert('Please upload only PDF or Excel files');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileType', fileType === 'pdf' ? 'pdf' : 'excel'); // Specify file type for backend

      // Update to your S3 upload endpoint
      const response = await axios.post(`http://localhost:8082/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Assuming the response includes the S3 URL
      const s3Url = response.data.url; // This should be the full S3 URL

      setNewResource({
        ...newResource,
        resourceLink: s3Url,
        resourceType: fileType === 'pdf' ? 'PDF' : 'Excel'
      });
    } catch (error) {
      console.error('Error uploading resource:', error);
      alert('Failed to upload resource');
    }
  };

  const handleAddResource = () => {
    if (!courseData.lessons) return;
    
    // Update local state
    const lessonIndex = courseData.lessons.findIndex(lesson => lesson.id === selectedLessonId);
    const currentLesson = courseData.lessons[lessonIndex];
    
    const newResourceWithId = {
      ...newResource,
      id: Date.now() // Add a temporary ID for frontend handling
    };
    
    const updatedLesson = {
      ...currentLesson,
      resources: [...(currentLesson.resources || []), newResourceWithId]
    };

    const updatedLessons = courseData.lessons.map(lesson => 
      lesson.id === selectedLessonId ? updatedLesson : lesson
    );

    updateCourseData({
      ...courseData,
      lessons: updatedLessons
    });

    // Reset form and close modal
    setNewResource({
      resourceTitle: '',
      resourceDescription: '',
      resourceLink: '',
      resourceType: 'PDF',
      uploadType: 'link'
    });
    setOpenResourceModal(false);
  };

  const handleDeleteResource = (lessonId, resourceId) => {
    // Update local state
    const updatedLessons = courseData.lessons.map(lesson => {
      if (lesson.id === lessonId) {
        return {
          ...lesson,
          resources: lesson.resources.filter(resource => resource.id !== resourceId)
        };
      }
      return lesson;
    });

    // Update course data
    updateCourseData({
      ...courseData,
      lessons: updatedLessons
    });
  };

  return (
    <div className="flex  gap-6 h-[85vh]">
      <div className="w-64 sidebar   overflow-y-auto sidebar ">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Lessons</h3>
          <button
            onClick={handleAddLesson}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            <FiPlus />
          </button>
        </div>
        <div className="space-y-2">
          {courseData.lessons?.map((lesson, index) => (
            <div
              key={lesson.id}
              className={`p-3 rounded-lg ${
                selectedLessonId === lesson.id
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              <div 
                className="flex justify-between items-center cursor-pointer "
                onClick={() => setSelectedLessonId(lesson.id)}
              >
                <div>
                  <h4 className="font-medium">
                    Lesson {index + 1}: {lesson.lessonTitle?.length > 14 ? lesson.lessonTitle.substring(0,14) + '..' : lesson.lessonTitle}
                  </h4>
                 
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveLesson(lesson.id);
                  }}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 main-content  h-[85vh]">
        {courseData.lessons?.map((lesson) => (
          <div
            key={lesson.id}
            style={{ display: selectedLessonId === lesson.id ? 'block' : 'none' }}
            className="lesson-content space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Title
              </label>
              <input
                type="text"
                value={lesson.lessonTitle}
                onChange={(e) => handleLessonUpdate(lesson.id, { lessonTitle: e.target.value })}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter lesson title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="text"
                value={lesson.lessonDuration}
                onChange={(e) => handleLessonUpdate(lesson.id, { 
                  lessonDuration: e.target.value
                })}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter duration"
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Resources</label>
                <button
                  onClick={() => setOpenResourceModal(true)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <FiPlus />
                  
                </button>
              </div>


              <div>
              
                {
                  lesson.resources?.map((resource, index) => (
                    <div key={index}>
                     {console.log(resource)}
                    </div>
                  ))
                }
              </div>
              
              {/* Display existing resources */}
              <div className="mt-2 space-y-2">
                {courseData.lessons?.find(l => l.id === selectedLessonId)?.resources?.map((resource) => (
                  <div key={resource.id} className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-lg">{resource.resourceTitle}</h4>
                        <p className="text-sm text-gray-600 mt-1">{resource.resourceDescription}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        resource.resourceType === 'PDF' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {resource.resourceType}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <a 
                        href={resource.resourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-500 hover:text-blue-600"
                        download={`${resource.resourceTitle}.${resource.resourceType.toLowerCase()}`}
                      >
                        <span>Download {resource.resourceType}</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                      <button
                        onClick={() => handleDeleteResource(selectedLessonId, resource.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resource Modal */}
              <div className={`fixed inset-0 z-50 ${openResourceModal ? 'flex' : 'hidden'} items-center justify-center`}>
                <div className="absolute inset-0 bg-black opacity-50" onClick={() => setOpenResourceModal(false)}></div>
                
                <div className="bg-white rounded-lg p-6 w-full max-w-md z-50 relative">
                  <h2 className="text-2xl font-bold mb-4">Add Resource</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Resource Title</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={newResource.resourceTitle}
                        onChange={(e) => setNewResource({...newResource, resourceTitle: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Resource Description</label>
                      <textarea
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        value={newResource.resourceDescription}
                        onChange={(e) => setNewResource({...newResource, resourceDescription: e.target.value})}
                      />
                    </div>

                  

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Type</label>
                      <div className="flex gap-4 mb-4">
                        <button
                          className={`px-4 py-2 rounded ${newResource.uploadType === 'link' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                          onClick={() => setNewResource({...newResource, uploadType: 'link'})}
                        >
                          Link
                        </button>
                        <button
                          className={`px-4 py-2 rounded ${newResource.uploadType === 'file' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                          onClick={() => setNewResource({...newResource, uploadType: 'file'})}
                        >
                          File Upload
                        </button>
                      </div>

                      {newResource.uploadType === 'link' ? (
                        <input
                          type="text"
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter resource URL"
                          value={newResource.resourceLink}
                          onChange={(e) => setNewResource({...newResource, resourceLink: e.target.value})}
                        />
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <input
                            type="file"
                            accept=".pdf,.xlsx,.xls"
                            onChange={(e) => handleResourceFileUpload(e.target.files[0])}
                            className="hidden"
                            id="resource-file"
                          />
                          <label htmlFor="resource-file" className="cursor-pointer">
                            <div className="text-blue-500 hover:text-blue-600">
                              Click to upload or drag and drop
                            </div>
                            <p className="text-sm text-gray-500">PDF or Excel files only</p>
                            {newResource.resourceLink && (
                              <p className="text-sm text-green-500 mt-2">
                                File uploaded successfully! ✓
                              </p>
                            )}
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                      onClick={() => setOpenResourceModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={handleAddResource}
                    >
                      Add Resource
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Content
              </label>
              <div className="relative" style={{ height: '800px' }}>
                <ReactQuill
                  ref={quillRef}
                  value={lesson.lessonContent}
                  onChange={(content) => handleLessonUpdate(lesson.id, { lessonContent: content })}
                  modules={modules}
                  formats={formats}
                  className="h-[550px]"
                  theme="snow"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
