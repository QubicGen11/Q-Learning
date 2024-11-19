import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FiPlus } from 'react-icons/fi';
import useCourseStore from '../../../../store/courseStore';

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ]
};

const Lessons = () => {
  const courseData = useCourseStore((state) => state.courseData);
  const updateCourseData = useCourseStore((state) => state.updateCourseData);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    // Set first lesson as selected when lessons load
    if (courseData.lessons?.length > 0 && !selectedLesson) {
      setSelectedLesson(courseData.lessons[0]);
    }
  }, [courseData.lessons]);

  const handleAddLesson = () => {
    const newLesson = {
      id: Date.now().toString(),
      title: 'New Lesson',
      content: '',
      duration: '0',
      feedback: ''
    };

    const updatedLessons = [...(courseData.lessons || []), newLesson];
    updateCourseData({ lessons: updatedLessons });
    setSelectedLesson(newLesson);
  };

  const handleLessonUpdate = (id, updates) => {
    const updatedLessons = courseData.lessons.map(lesson => 
      lesson.id === id ? { ...lesson, ...updates } : lesson
    );
    updateCourseData({ lessons: updatedLessons });
    setSelectedLesson(prev => prev?.id === id ? { ...prev, ...updates } : prev);
  };

  const handleDurationChange = (e) => {
    const duration = e.target.value;
    if (duration === '' || parseInt(duration) >= 0) {
      handleLessonUpdate(selectedLesson.id, { duration });
    }
  };

  return (
    <div className="flex h-full">
      {/* Lessons Sidebar */}
      <div className="w-1/3 border-r pr-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Lessons</h3>
          <button
            onClick={handleAddLesson}
            className="text-purple-600 hover:text-purple-700"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          {(courseData.lessons || []).map(lesson => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className={`w-full text-left p-3 rounded-lg ${
                selectedLesson?.id === lesson.id
                  ? 'bg-purple-50 text-purple-700'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{lesson.title}</span>
                <span className="text-sm text-gray-500">{lesson.duration} min</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Editor */}
      {selectedLesson && (
        <div className="flex-1 pl-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Title
              </label>
              <input
                type="text"
                value={selectedLesson.title || ''}
                onChange={(e) => handleLessonUpdate(selectedLesson.id, { title: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Duration (minutes)*
              </label>
              <input
                type="number"
                min="0"
                value={selectedLesson.duration || ''}
                onChange={handleDurationChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter duration in minutes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Content
              </label>
              <div className="relative" style={{ height: '250px' }}>
                <ReactQuill
                  value={selectedLesson.content || ''}
                  onChange={(content) => handleLessonUpdate(selectedLesson.id, { content })}
                  modules={quillModules}
                  className="h-full"
                  theme="snow"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lessons; 