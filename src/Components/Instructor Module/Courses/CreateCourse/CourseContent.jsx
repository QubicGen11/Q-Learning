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
  };

  const handlePrevious = () => {
    navigate('/instructor/courses/create'); // Goes back to Basic Information
  };

  const handleNext = () => {
    navigate('/instructor/courses/faq'); // Goes to FAQ section
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
      <div className="border-b border-gray-200 mb-6">
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
                          {lesson.type === 'Video' ? 'play_circle' : 'description'}
                        </span>
                        <span className="text-sm">{lesson.title}</span>
                        <select 
                          className="ml-auto text-xs border rounded px-2 py-0.5"
                          value={lesson.type}
                          onChange={(e) => handleLessonTypeChange(chapter.id, lesson.id, e.target.value)}
                        >
                          <option value="Video">Video</option>
                          <option value="PDF">PDF</option>
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
              {uploadedFiles.lesson && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-blue-600">×</span>
                  <span className="text-sm">{uploadedFiles.lesson.name}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Materials *
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
              {uploadedFiles.material && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-blue-600">×</span>
                  <span className="text-sm">{uploadedFiles.material.name}</span>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-600">
                  Lesson Quiz
                </label>
                <button className="flex items-center gap-1 text-blue-600 text-sm">
                  <span className="material-icons text-sm">add_circle_outline</span>
                  Add Question
                </button>
              </div>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <input
                      type="text"
                      placeholder="What is the question topic here"
                      className="text-sm focus:outline-none flex-1"
                    />
                    <select className="text-sm border rounded px-2 py-1">
                      <option>Open-Ended</option>
                    </select>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <input
                      type="text"
                      placeholder="What is the question topic here"
                      className="text-sm focus:outline-none flex-1"
                    />
                    <select className="text-sm border rounded px-2 py-1">
                      <option>Multiple Choice</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <span className="material-icons">arrow_back</span>
          Previous
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          Next
          <span className="material-icons">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

export default CourseContent; 