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

const Lessons = () => {
  const courseData = useCourseStore((state) => state.courseData);
  const updateCourseData = useCourseStore((state) => state.updateCourseData);
  const [selectedLessonId, setSelectedLessonId] = useState(null);

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

      const response = await axios.post('http://localhost:8082/upload', formData, {
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
