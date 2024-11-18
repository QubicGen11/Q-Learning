import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiMove } from 'react-icons/fi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useCourseStore from '../../../../store/courseStore';

const Curriculum = () => {
  const courseData = useCourseStore((state) => state.courseData);
  const updateCourseData = useCourseStore((state) => state.updateCourseData);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(courseData.curriculum);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    updateCourseData({ curriculum: items });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Course Curriculum</h2>
        <button
          onClick={() => {
            updateCourseData({
              curriculum: [
                ...courseData.curriculum,
                {
                  id: Date.now(),
                  title: 'New Section',
                  lessons: []
                }
              ]
            });
          }}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
        >
          <FiPlus /> Add Section
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="curriculum">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {courseData.curriculum.map((section, index) => (
                <Draggable
                  key={section.id}
                  draggableId={section.id.toString()}
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
                          {editingSection === section.id ? (
                            <input
                              type="text"
                              value={section.title}
                              onChange={(e) => {
                                const newCurriculum = [...courseData.curriculum];
                                newCurriculum[index].title = e.target.value;
                                updateCourseData({ curriculum: newCurriculum });
                              }}
                              onBlur={() => setEditingSection(null)}
                              autoFocus
                              className="border-b p-1"
                            />
                          ) : (
                            <h3 className="font-medium">{section.title}</h3>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingSection(section.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => {
                              const newCurriculum = courseData.curriculum.filter(
                                (s) => s.id !== section.id
                              );
                              updateCourseData({ curriculum: newCurriculum });
                            }}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>

                      {/* Lessons */}
                      <div className="pl-8 space-y-2">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <span>{lesson.title}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {/* Handle edit lesson */}}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                onClick={() => {
                                  const newCurriculum = [...courseData.curriculum];
                                  newCurriculum[index].lessons = section.lessons.filter(
                                    (l) => l.id !== lesson.id
                                  );
                                  updateCourseData({ curriculum: newCurriculum });
                                }}
                                className="text-gray-400 hover:text-red-600"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newCurriculum = [...courseData.curriculum];
                            newCurriculum[index].lessons.push({
                              id: Date.now(),
                              title: 'New Lesson',
                              content: '',
                              duration: '0:00'
                            });
                            updateCourseData({ curriculum: newCurriculum });
                          }}
                          className="text-purple-600 hover:text-purple-700 text-sm"
                        >
                          + Add Lesson
                        </button>
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