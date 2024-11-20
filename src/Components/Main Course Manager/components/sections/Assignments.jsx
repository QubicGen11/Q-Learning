import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiClock, FiAward, FiCheck, FiX } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useCourseStore from "../../../../store/courseStore";

const Assignments = () => {
  const courseData = useCourseStore((state) => state.courseData);
  const updateCourseData = useCourseStore((state) => state.updateCourseData);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);

  const handleAddAssignment = () => {
    const currentAssignments = courseData?.assignments || [];
    
    const newAssignment = {
      id: Date.now(),
      assignmentTitle: "",
      assignmentDuration: "",
      assignmentContent: "",
      question: "",
      options: [
        { id: Date.now() + 1, option: "", isCorrect: false },
        { id: Date.now() + 2, option: "", isCorrect: false },
        { id: Date.now() + 3, option: "", isCorrect: false },
        { id: Date.now() + 4, option: "", isCorrect: false }
      ]
    };

    updateCourseData({
      ...courseData,
      assignments: [...currentAssignments, newAssignment]
    });
    setSelectedAssignmentId(newAssignment.id);
  };

  const handleAssignmentUpdate = (assignmentId, updates) => {
    if (!courseData?.assignments) return;
    
    const updatedAssignments = courseData.assignments.map(assignment => 
      assignment.id === assignmentId ? { ...assignment, ...updates } : assignment
    );

    updateCourseData({
      ...courseData,
      assignments: updatedAssignments
    });
  };

  const handleOptionUpdate = (assignmentId, optionIndex, updates) => {
    if (!courseData?.assignments) return;
    
    const updatedAssignments = courseData.assignments.map(assignment => {
      if (assignment.id === assignmentId) {
        const updatedOptions = [...assignment.options];
        updatedOptions[optionIndex] = { ...updatedOptions[optionIndex], ...updates };
        return { ...assignment, options: updatedOptions };
      }
      return assignment;
    });

    updateCourseData({
      ...courseData,
      assignments: updatedAssignments
    });
  };

  const handleRemoveAssignment = (assignmentId) => {
    if (!courseData?.assignments) return;
    
    const updatedAssignments = courseData.assignments.filter(
      assignment => assignment.id !== assignmentId
    );
    
    updateCourseData({
      ...courseData,
      assignments: updatedAssignments
    });

    if (selectedAssignmentId === assignmentId) {
      setSelectedAssignmentId(updatedAssignments[0]?.id || null);
    }
  };

  return (
    <div className="flex h-full gap-6">
      <div className="w-64 sidebar">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Assignments</h3>
          <button
            onClick={handleAddAssignment}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            <FiPlus />
          </button>
        </div>
        <div className="space-y-2">
          {courseData?.assignments?.map((assignment, index) => (
            <div
              key={assignment.id}
              className={`p-3 rounded-lg ${
                selectedAssignmentId === assignment.id
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setSelectedAssignmentId(assignment.id)}
              >
                <div>
                  <h4 className="font-medium">Assignment {index + 1}: {assignment.assignmentTitle}</h4>
                  <p className="text-sm text-gray-500">{assignment.assignmentDuration}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveAssignment(assignment.id);
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
        {courseData?.assignments?.map((assignment) => (
          <div
            key={assignment.id}
            style={{ display: selectedAssignmentId === assignment.id ? 'block' : 'none' }}
            className="assignment-content space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Title
              </label>
              <input
                type="text"
                value={assignment.assignmentTitle}
                onChange={(e) => handleAssignmentUpdate(assignment.id, { 
                  assignmentTitle: e.target.value 
                })}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter assignment title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question
              </label>
              <input
                type="text"
                value={assignment.question}
                onChange={(e) => handleAssignmentUpdate(assignment.id, { 
                  question: e.target.value 
                })}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your question"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options
              </label>
              <div className="space-y-3">
                {assignment.options?.map((option, index) => (
                  <div key={option.id} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={option.option}
                      onChange={(e) => handleOptionUpdate(assignment.id, index, { 
                        option: e.target.value 
                      })}
                      className="flex-1 p-2 border rounded-lg"
                      placeholder={`Option ${index + 1}`}
                    />
                    <button
                      onClick={() => handleOptionUpdate(assignment.id, index, { 
                        isCorrect: !option.isCorrect 
                      })}
                      className={`p-2 rounded-lg ${
                        option.isCorrect 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      {option.isCorrect ? <FiCheck /> : <FiX />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Instructions
              </label>
              <div className="relative" style={{ height: '200px' }}>
                <ReactQuill
                  value={assignment.assignmentContent}
                  onChange={(content) => handleAssignmentUpdate(assignment.id, { 
                    assignmentContent: content 
                  })}
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

export default Assignments; 