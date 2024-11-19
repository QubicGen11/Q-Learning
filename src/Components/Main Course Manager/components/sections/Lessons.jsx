import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import useCourseStore from "../../../../store/courseStore";

const Lessons = () => {
  const courseData = useCourseStore((state) => state.courseData);
  const updateCourseData = useCourseStore((state) => state.updateCourseData);
  const fetchCourseById = useCourseStore((state) => state.fetchCourseById);
  const [selectedLessonId, setSelectedLessonId] = useState(null);

  // Fetch course data when component mounts
  useEffect(() => {
    const courseId = new URLSearchParams(window.location.search).get('courseId');
    if (courseId) {
      fetchCourseById(courseId);
    }
  }, [fetchCourseById]);

  // Set first lesson as selected when data loads
  useEffect(() => {
    if (courseData.lessons?.length > 0 && !selectedLessonId) {
      setSelectedLessonId(courseData.lessons[0].id);
    }
  }, [courseData.lessons, selectedLessonId]);

  const selectedLesson = courseData.lessons?.find(
    (lesson) => lesson.id === selectedLessonId
  );

  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

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
    setSelectedLessonId(newLesson.id);
  };

  const handleLessonUpdate = (id, updates) => {
    const updatedLessons = courseData.lessons.map((lesson) =>
      lesson.id === id ? { ...lesson, ...updates } : lesson
    );
    updateCourseData({ lessons: updatedLessons });
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
          {courseData.lessons?.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLessonId(lesson.id)}
              className={`w-full text-left p-3 rounded-lg ${
                selectedLessonId === lesson.id
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
                value={selectedLesson.title}
                onChange={(e) => 
                  handleLessonUpdate(selectedLesson.id, { title: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Duration (minutes)
              </label>
              <input
                type="number"
                min="0"
                value={selectedLesson.duration}
                onChange={(e) => 
                  handleLessonUpdate(selectedLesson.id, { duration: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Content
              </label>
              <div className="relative" style={{ height: '250px' }}>
                <ReactQuill
                  value={selectedLesson.content}
                  onChange={(content) => 
                    handleLessonUpdate(selectedLesson.id, { content })
                  }
                  modules={quillModules}
                  className="h-full"
                  theme="snow"
                />
              </div>
            </div>

            {/* Add Save and Delete buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => handleRemoveLesson(selectedLesson.id)}
                className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
              >
                Delete Lesson
              </button>
              <button
                onClick={() => updateCourseData({ lessons: courseData.lessons })}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Save Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lessons;
