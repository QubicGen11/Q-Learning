import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiMove, FiMessageSquare } from 'react-icons/fi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useCourseStore from '../../../../store/courseStore';

const Curriculum = () => {
  const courseData = useCourseStore((state) => state.courseData);
  const updateCourseData = useCourseStore((state) => state.updateCourseData);
  const [editingLesson, setEditingLesson] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(courseData.lessons || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    updateCourseData({ lessons: items });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Course Curriculum</h2>
        <button
          onClick={() => {
            updateCourseData({
              lessons: [
                ...(courseData.lessons || []),
                {
                  id: Date.now(),
                  title: 'New Lesson',
                  content: '',
                  duration: '0:00',
                  feedback: ''
                }
              ]
            });
          }}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
        >
          <FiPlus /> Add Lesson
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="lessons">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {(courseData.lessons || []).map((lesson, index) => (
                <Draggable
                  key={lesson.id}
                  draggableId={lesson.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mb-4 border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div {...provided.dragHandleProps}>
                            <FiMove className="text-gray-400 cursor-move" />
                          </div>
                          {editingLesson === lesson.id ? (
                            <input
                              type="text"
                              value={lesson.title}
                              onChange={(e) => {
                                const newLessons = [...(courseData.lessons || [])];
                                newLessons[index].title = e.target.value;
                                updateCourseData({ lessons: newLessons });
                              }}
                              onBlur={() => setEditingLesson(null)}
                              autoFocus
                              className="border-b p-1"
                            />
                          ) : (
                            <h3 className="font-medium">{lesson.title}</h3>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingLesson(lesson.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => {
                              const newLessons = (courseData.lessons || []).filter(
                                (l) => l.id !== lesson.id
                              );
                              updateCourseData({ lessons: newLessons });
                            }}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>

                      {/* Duration Input */}
                      <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Duration</label>
                        <input
                          type="text"
                          value={lesson.duration}
                          onChange={(e) => {
                            const newLessons = [...(courseData.lessons || [])];
                            newLessons[index].duration = e.target.value;
                            updateCourseData({ lessons: newLessons });
                          }}
                          className="border rounded p-2 w-32"
                          placeholder="HH:MM"
                        />
                      </div>

                      {/* Feedback Input */}
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          <FiMessageSquare className="inline mr-2" />
                          Lesson Feedback
                        </label>
                        <textarea
                          value={lesson.feedback || ''}
                          onChange={(e) => {
                            const newLessons = [...(courseData.lessons || [])];
                            newLessons[index].feedback = e.target.value;
                            updateCourseData({ lessons: newLessons });
                          }}
                          className="border rounded p-2 w-full"
                          placeholder="Add feedback for this lesson..."
                          rows={3}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Curriculum; 