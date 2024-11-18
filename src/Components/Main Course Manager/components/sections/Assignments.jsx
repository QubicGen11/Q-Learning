import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiClock, FiAward } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Assignments = ({ formData, setFormData }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleAddAssignment = () => {
    const newAssignment = {
      id: Date.now(),
      title: 'New Assignment',
      description: '',
      dueDate: '',
      totalPoints: 100,
      passingScore: 60,
      instructions: '',
      submissionType: 'file',
      allowedFileTypes: ['pdf', 'doc', 'docx'],
      maxFileSize: 5, // in MB
      isGroupAssignment: false,
      rubric: []
    };

    setFormData({
      ...formData,
      assignments: [...formData.assignments, newAssignment]
    });
    setSelectedAssignment(newAssignment);
  };

  return (
    <div className="flex h-full gap-6">
      {/* Assignments List */}
      <div className="w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Assignments</h3>
          <button
            onClick={handleAddAssignment}
            className="text-purple-600 hover:text-purple-700 p-2 rounded-lg"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {formData.assignments.map(assignment => (
            <button
              key={assignment.id}
              onClick={() => setSelectedAssignment(assignment)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selectedAssignment?.id === assignment.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{assignment.title}</span>
                <span className="text-sm text-gray-500">
                  {assignment.totalPoints} pts
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Due: {assignment.dueDate || 'Not set'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Assignment Editor */}
      {selectedAssignment && (
        <div className="flex-1 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Title
              </label>
              <input
                type="text"
                value={selectedAssignment.title}
                onChange={(e) => {
                  const updated = formData.assignments.map(a =>
                    a.id === selectedAssignment.id
                      ? { ...a, title: e.target.value }
                      : a
                  );
                  setFormData({ ...formData, assignments: updated });
                }}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="datetime-local"
                value={selectedAssignment.dueDate}
                onChange={(e) => {
                  const updated = formData.assignments.map(a =>
                    a.id === selectedAssignment.id
                      ? { ...a, dueDate: e.target.value }
                      : a
                  );
                  setFormData({ ...formData, assignments: updated });
                }}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          {/* Points and Passing Score */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Points
              </label>
              <input
                type="number"
                value={selectedAssignment.totalPoints}
                onChange={(e) => {
                  const updated = formData.assignments.map(a =>
                    a.id === selectedAssignment.id
                      ? { ...a, totalPoints: parseInt(e.target.value) }
                      : a
                  );
                  setFormData({ ...formData, assignments: updated });
                }}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passing Score (%)
              </label>
              <input
                type="number"
                value={selectedAssignment.passingScore}
                onChange={(e) => {
                  const updated = formData.assignments.map(a =>
                    a.id === selectedAssignment.id
                      ? { ...a, passingScore: parseInt(e.target.value) }
                      : a
                  );
                  setFormData({ ...formData, assignments: updated });
                }}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions
            </label>
            <ReactQuill
              value={selectedAssignment.instructions}
              onChange={(content) => {
                const updated = formData.assignments.map(a =>
                  a.id === selectedAssignment.id
                    ? { ...a, instructions: content }
                    : a
                );
                setFormData({ ...formData, assignments: updated });
              }}
              className="h-64"
            />
          </div>

          {/* Submission Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Submission Settings</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Submission Type
                </label>
                <select
                  value={selectedAssignment.submissionType}
                  onChange={(e) => {
                    const updated = formData.assignments.map(a =>
                      a.id === selectedAssignment.id
                        ? { ...a, submissionType: e.target.value }
                        : a
                    );
                    setFormData({ ...formData, assignments: updated });
                  }}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="file">File Upload</option>
                  <option value="text">Text Submission</option>
                  <option value="link">URL Link</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max File Size (MB)
                </label>
                <input
                  type="number"
                  value={selectedAssignment.maxFileSize}
                  onChange={(e) => {
                    const updated = formData.assignments.map(a =>
                      a.id === selectedAssignment.id
                        ? { ...a, maxFileSize: parseInt(e.target.value) }
                        : a
                    );
                    setFormData({ ...formData, assignments: updated });
                  }}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Rubric */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Rubric</h4>
              <button
                onClick={() => {
                  const updated = formData.assignments.map(a =>
                    a.id === selectedAssignment.id
                      ? {
                          ...a,
                          rubric: [
                            ...a.rubric,
                            { criteria: '', points: 0, description: '' }
                          ]
                        }
                      : a
                  );
                  setFormData({ ...formData, assignments: updated });
                }}
                className="text-purple-600 hover:text-purple-700"
              >
                <FiPlus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {selectedAssignment.rubric.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-start">
                  <input
                    className="col-span-4 p-2 border rounded"
                    placeholder="Criteria"
                    value={item.criteria}
                    onChange={(e) => {
                      const updated = formData.assignments.map(a =>
                        a.id === selectedAssignment.id
                          ? {
                              ...a,
                              rubric: a.rubric.map((r, i) =>
                                i === index
                                  ? { ...r, criteria: e.target.value }
                                  : r
                              )
                            }
                          : a
                      );
                      setFormData({ ...formData, assignments: updated });
                    }}
                  />
                  <input
                    type="number"
                    className="col-span-2 p-2 border rounded"
                    placeholder="Points"
                    value={item.points}
                    onChange={(e) => {
                      const updated = formData.assignments.map(a =>
                        a.id === selectedAssignment.id
                          ? {
                              ...a,
                              rubric: a.rubric.map((r, i) =>
                                i === index
                                  ? { ...r, points: parseInt(e.target.value) }
                                  : r
                              )
                            }
                          : a
                      );
                      setFormData({ ...formData, assignments: updated });
                    }}
                  />
                  <input
                    className="col-span-5 p-2 border rounded"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => {
                      const updated = formData.assignments.map(a =>
                        a.id === selectedAssignment.id
                          ? {
                              ...a,
                              rubric: a.rubric.map((r, i) =>
                                i === index
                                  ? { ...r, description: e.target.value }
                                  : r
                              )
                            }
                          : a
                      );
                      setFormData({ ...formData, assignments: updated });
                    }}
                  />
                  <button
                    onClick={() => {
                      const updated = formData.assignments.map(a =>
                        a.id === selectedAssignment.id
                          ? {
                              ...a,
                              rubric: a.rubric.filter((_, i) => i !== index)
                            }
                          : a
                      );
                      setFormData({ ...formData, assignments: updated });
                    }}
                    className="col-span-1 p-2 text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments; 