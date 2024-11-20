import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import useCourseStore from "../../../../store/courseStore";

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
      lessonDuration: 0,
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
    
    const updatedLessons = courseData.lessons.map(lesson => 
      lesson.id === lessonId ? { ...lesson, ...updates } : lesson
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

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ]
    }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <div className="flex h-full gap-6">
      <div className="w-64 sidebar">
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
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setSelectedLessonId(lesson.id)}
              >
                <div>
                  <h4 className="font-medium">
                    Lesson {index + 1}: {lesson.lessonTitle}
                  </h4>
                  <p className="text-sm text-gray-500">{lesson.lessonDuration} min</p>
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

      <div className="flex-1 main-content">
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
                type="number"
                value={lesson.lessonDuration}
                onChange={(e) => handleLessonUpdate(lesson.id, { lessonDuration: parseInt(e.target.value) })}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Content
              </label>
              <div className="relative" style={{ height: '400px' }}>
                <ReactQuill
                  value={lesson.lessonContent}
                  onChange={(content) => handleLessonUpdate(lesson.id, { lessonContent: content })}
                  modules={modules}
                  formats={formats}
                  className="h-full"
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
