import React from 'react';
import { Button, IconButton } from '@mui/material';
import { FiPlus, FiClock } from 'react-icons/fi';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useCourseStore from "../../../../../store/courseStore";

const AssignmentsList = ({ selectedAssignmentId, onSelectAssignment, courseData }) => {
  const updateCourseData = useCourseStore((state) => state.updateCourseData);

  const handleAddAssignment = () => {
    const newAssignment = {
      id: Date.now(),
      assignmentTitle: "",
      lessonLink: "",
      assignmentDuration: "",
      questions: [],
      showQuestionForm: false
    };

    const updatedAssignments = [...(courseData?.assignments || []), newAssignment];
    updateCourseData({
      ...courseData,
      assignments: updatedAssignments
    });
    localStorage.setItem('courseAssignments', JSON.stringify(updatedAssignments));
    onSelectAssignment(newAssignment.id);
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
      onSelectAssignment(updatedAssignments[0]?.id || null);
    }
  };

  return (
    <div className="w-96 bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Assignments</h3>
        <Button
          onClick={handleAddAssignment}
          variant="contained"
          size="small"
          startIcon={<FiPlus />}
          className="bg-blue-600 hover:bg-blue-700"
        >
          New Assignment
        </Button>
      </div>

      <div className="space-y-4">
        {courseData?.assignments?.map((assignment, index) => (
          <div
            key={assignment.id}
            onClick={() => onSelectAssignment(assignment.id)}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              selectedAssignmentId === assignment.id
                ? "bg-blue-50 border-blue-300 shadow-sm"
                : "hover:bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">Assignment {index + 1}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {assignment.assignmentTitle || 'Untitled Assignment'}
                </p>
                {assignment.assignmentDuration && (
                  <div className="flex items-center text-gray-500 text-sm mt-2">
                    <FiClock className="mr-1" />
                    {assignment.assignmentDuration}
                  </div>
                )}
              </div>
              <IconButton
                size="small"
                className="text-red-500 hover:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveAssignment(assignment.id);
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentsList; 