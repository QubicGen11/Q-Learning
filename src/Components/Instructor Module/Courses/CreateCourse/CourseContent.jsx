import React, { useState } from 'react';
import useCourseCreationStore from '../../../../stores/courseCreationStore';

function CourseContent() {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const { content } = courseData;

  const [selectedLesson, setSelectedLesson] = useState({
    chapterId: null,
    lessonId: null,
    type: 'Video'
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    lesson: null,
    material: null
  });

  const handleAddChapter = () => {
    const newChapter = {
      id: (content.chapters?.length || 0) + 1,
      title: `Chapter ${(content.chapters?.length || 0) + 1}`,
      isExpanded: true,
      lessons: []
    };
    
    updateCourseData('content', {
      chapters: [...(content.chapters || []), newChapter]
    });
  };

  const handleAddLesson = (chapterId) => {
    const updatedChapters = content.chapters.map(chapter => {
      if (chapter.id === chapterId) {
        const newLesson = {
          id: (chapter.lessons.length || 0) + 1,
          title: `Lesson ${(chapter.lessons.length || 0) + 1}`,
          type: 'Video'
        };
        return {
          ...chapter,
          lessons: [...chapter.lessons, newLesson]
        };
      }
      return chapter;
    });

    updateCourseData('content', {
      chapters: updatedChapters
    });
  };

  const toggleChapter = (chapterId) => {
    const updatedChapters = content.chapters.map(chapter => 
      chapter.id === chapterId 
        ? { ...chapter, isExpanded: !chapter.isExpanded }
        : chapter
    );

    updateCourseData('content', {
      chapters: updatedChapters
    });
  };

  const handleLessonTypeChange = (chapterId, lessonId, newType) => {
    const updatedChapters = content.chapters.map(chapter => {
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
    });

    updateCourseData('content', {
      chapters: updatedChapters
    });
    setSelectedLesson({ chapterId, lessonId, type: newType });
  };

  const handleFileUpload = (type, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const renderLessonContent = (type) => {
    switch(type) {
      case 'Video':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Video *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileUpload('lesson', e.target.files[0])}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <span className="material-icons text-gray-400 text-3xl mb-2">
                    videocam
                  </span>
                  <p className="text-sm text-gray-600">
                    {uploadedFiles.lesson?.name || 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    MP4, WebM up to 1GB
                  </p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Materials (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  onChange={(e) => handleFileUpload('material', e.target.files[0])}
                  className="hidden"
                  id="material-upload"
                />
                <label htmlFor="material-upload" className="cursor-pointer">
                  <span className="material-icons text-gray-400 text-3xl mb-2">
                    upload_file
                  </span>
                  <p className="text-sm text-gray-600">
                    {uploadedFiles.material?.name || 'Upload additional materials'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC up to 100MB
                  </p>
                </label>
              </div>
            </div>
          </div>
        );

      case 'Quiz':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Quiz Questions</h3>
            {/* Quiz editor component would go here */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
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
            {content.chapters?.map((chapter) => (
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
                    {chapter.lessons?.map((lesson) => (
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
          {selectedLesson.type && renderLessonContent(selectedLesson.type)}
        </div>
      </div>
    </div>
  );
}

export default CourseContent; 