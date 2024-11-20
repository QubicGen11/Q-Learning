import { FiPlus } from "react-icons/fi";
import { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import useCourseStore from "../../../../store/courseStore";

const Lessons = () => {
  const courseData = useCourseStore((state) => state.courseData);
  const updateCourseData = useCourseStore((state) => state.updateCourseData);
  const fetchCourseById = useCourseStore((state) => state.fetchCourseById);
  const mainContentRef = useRef(null);

  useEffect(() => {
    const courseId = new URLSearchParams(window.location.search).get('courseId');
    if (courseId) {
      fetchCourseById(courseId);
    }
  }, [fetchCourseById]);

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

  const handleLessonUpdate = (id, updates) => {
    const updatedLessons = courseData.lessons.map((lesson) => {
      if (lesson.id === id) {
        const mappedUpdates = {};
        if (updates.title) mappedUpdates.lessonTitle = updates.title;
        if (updates.content) mappedUpdates.lessonContent = updates.content;
        if (updates.duration) mappedUpdates.lessonDuration = updates.duration;
        return { ...lesson, ...mappedUpdates };
      }
      return lesson;
    });
    updateCourseData({ lessons: updatedLessons });
  };

  const showLesson = (lessonId) => {
    const mainContent = document.querySelector('.main-content');
    mainContent.setAttribute('data-current-lesson', lessonId);

    const allLessons = document.querySelectorAll('.lesson-content');
    allLessons.forEach(lesson => lesson.style.display = 'none');
    
    const selectedLesson = document.getElementById(`lesson-${lessonId}`);
    if (selectedLesson) {
      selectedLesson.style.display = 'block';
    }

    const allSidebarItems = document.querySelectorAll('.sidebar-item');
    allSidebarItems.forEach(item => {
      item.classList.remove('bg-purple-50', 'text-purple-700');
      item.classList.add('bg-gray-50');
    });
    
    const selectedSidebarItem = document.getElementById(`sidebar-${lessonId}`);
    if (selectedSidebarItem) {
      selectedSidebarItem.classList.remove('bg-gray-50');
      selectedSidebarItem.classList.add('bg-purple-50', 'text-purple-700');
    }
  };

  const handleAddLesson = () => {
    const newLesson = {
      id: Date.now().toString(),
      lessonTitle: 'New Lesson',
      lessonContent: '',
      lessonDuration: '0',
      feedback: ''
    };

    const updatedLessons = [...(courseData.lessons || []), newLesson];
    updateCourseData({ lessons: updatedLessons });
    showLesson(newLesson.id);
  };

  useEffect(() => {
    if (courseData.lessons?.length > 0) {
      const mainContent = document.querySelector('.main-content');
      const currentLessonId = mainContent.getAttribute('data-current-lesson');
      
      if (!currentLessonId) {
        showLesson(courseData.lessons[0].id);
      } else {
        showLesson(currentLessonId);
      }
    }
  }, [courseData.lessons]);

  return (
    <div className="flex h-full gap-6">
      <div className="w-1/4 min-w-[250px] border-r pr-4">
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
          {courseData.lessons?.map((lesson, index) => (
            <div
              key={lesson.id}
              id={`sidebar-${lesson.id}`}
              onClick={() => showLesson(lesson.id)}
              className="sidebar-item p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {index + 1}. {lesson.lessonTitle}
                </span>
                <span className="text-sm text-gray-500">
                  {lesson.lessonDuration} min
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 main-content" data-current-lesson="">
        {courseData.lessons?.map((lesson) => (
          <div 
            id={`lesson-${lesson.id}`}
            key={lesson.id} 
            className="lesson-content border p-6 rounded-lg shadow-sm"
            style={{ display: 'none' }}
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Title
                </label>
                <input
                  type="text"
                  value={lesson.lessonTitle}
                  onChange={(e) => handleLessonUpdate(lesson.id, { title: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  data-lesson-id={lesson.id}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  min="0"
                  value={lesson.lessonDuration}
                  onChange={(e) => handleLessonUpdate(lesson.id, { duration: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  data-lesson-id={lesson.id}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Content
                </label>
                <div className="relative" style={{ height: '250px' }}>
                  <ReactQuill
                    value={lesson.lessonContent || ''}
                    onChange={(content) => handleLessonUpdate(lesson.id, { content })}
                    modules={quillModules}
                    className="h-full"
                    theme="snow"
                    data-lesson-id={lesson.id}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
