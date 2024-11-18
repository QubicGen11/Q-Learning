import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiMove } from 'react-icons/fi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Curriculum = ({ formData, setFormData }) => {
  const [editingSection, setEditingSection] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sections = Array.from(formData.curriculum);
    const [reorderedSection] = sections.splice(result.source.index, 1);
    sections.splice(result.destination.index, 0, reorderedSection);

    setFormData({...formData, curriculum: sections});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Course Curriculum</h2>
        <button
          onClick={() => {
            setFormData({
              ...formData,
              curriculum: [
                ...formData.curriculum,
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
              {formData.curriculum.map((section, index) => (
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
                                const newCurriculum = [...formData.curriculum];
                                newCurriculum[index].title = e.target.value;
                                setFormData({...formData, curriculum: newCurriculum});
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
                              const newCurriculum = formData.curriculum.filter(
                                (s) => s.id !== section.id
                              );
                              setFormData({...formData, curriculum: newCurriculum});
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
                                  const newCurriculum = [...formData.curriculum];
                                  newCurriculum[index].lessons = section.lessons.filter(
                                    (l) => l.id !== lesson.id
                                  );
                                  setFormData({...formData, curriculum: newCurriculum});
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
                            const newCurriculum = [...formData.curriculum];
                            newCurriculum[index].lessons.push({
                              id: Date.now(),
                              title: 'New Lesson',
                              content: '',
                              duration: '0:00'
                            });
                            setFormData({...formData, curriculum: newCurriculum});
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