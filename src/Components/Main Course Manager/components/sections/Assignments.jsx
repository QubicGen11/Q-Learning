import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiClock, FiAward, FiCheck, FiX } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import useCourseStore from "../../../../store/courseStore";
import { 
  Button, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel,
  TextField,
  IconButton,
  Card,
  CardContent,
  Typography 
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Assignments = () => {
  const courseData = useCourseStore((state) => state.courseData);
  const updateCourseData = useCourseStore((state) => state.updateCourseData);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('savedQuestions')) || [];
    setSavedQuestions(storedQuestions);
  }, []);

  const handleAddAssignment = () => {
    const currentAssignments = courseData?.assignments || [];
    
    const newAssignment = {
      id: Date.now(),
      assignmentTitle: "",
      lessonLink: "",
      assignmentDuration: "",
      questions: [],
      showQuestionForm: false
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
        
        if (updates.hasOwnProperty('isCorrect')) {
          switch(assignment.questionType) {
            case 'single':
            case 'true-false':
              updatedOptions.forEach((opt, idx) => {
                updatedOptions[idx] = { 
                  ...opt, 
                  isCorrect: idx === optionIndex ? updates.isCorrect : false 
                };
              });
              break;
            case 'multiple':
              updatedOptions[optionIndex] = { ...updatedOptions[optionIndex], ...updates };
              break;
          }
        } else {
          updatedOptions[optionIndex] = { ...updatedOptions[optionIndex], ...updates };
        }
        
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

  const handleSaveQuestion = (assignmentId) => {
    const assignment = courseData.assignments.find(a => a.id === assignmentId);
    if (!assignment || !assignment.question || !assignment.options.some(option => option.option)) {
      return;
    }

    const newQuestion = {
      assignmentId,
      question: assignment.question,
      options: assignment.options,
      questionType: assignment.questionType
    };

    if (editingQuestionIndex !== null) {
      const updatedQuestions = [...savedQuestions];
      updatedQuestions[editingQuestionIndex] = newQuestion;
      setSavedQuestions(updatedQuestions);
      localStorage.setItem('savedQuestions', JSON.stringify(updatedQuestions));
    } else {
      const updatedQuestions = [...savedQuestions, newQuestion];
      setSavedQuestions(updatedQuestions);
      localStorage.setItem('savedQuestions', JSON.stringify(updatedQuestions));
    }

    setEditingQuestionIndex(null);
    setShowQuestionForm(false);
    
    handleAssignmentUpdate(assignmentId, {
      question: '',
      options: assignment.options.map(opt => ({ ...opt, option: '', isCorrect: false })),
      questionType: 'single'
    });
  };

  const handleEditQuestion = (index) => {
    const questionToEdit = savedQuestions[index];
    setEditingQuestionIndex(index);
    setShowQuestionForm(true);
    setSelectedAssignmentId(questionToEdit.assignmentId);
    
    handleAssignmentUpdate(questionToEdit.assignmentId, {
      question: questionToEdit.question,
      options: questionToEdit.options,
      questionType: questionToEdit.questionType
    });
  };

  const handleCancelEdit = () => {
    setShowQuestionForm(false);
    setEditingQuestionIndex(null);
    
    const currentAssignment = courseData.assignments.find(a => a.id === selectedAssignmentId);
    if (currentAssignment) {
      handleAssignmentUpdate(selectedAssignmentId, {
        question: '',
        options: currentAssignment.options.map(opt => ({ ...opt, option: '', isCorrect: false })),
        questionType: 'single'
      });
    }
  };

  const handleQuestionTypeChange = (assignmentId, questionType) => {
    let options;
    switch(questionType) {
      case 'true-false':
        options = [
          { id: Date.now() + 1, option: "True", isCorrect: false },
          { id: Date.now() + 2, option: "False", isCorrect: false }
        ];
        break;
      case 'multiple':
      case 'single':
        options = [
          { id: Date.now() + 1, option: "", isCorrect: false },
          { id: Date.now() + 2, option: "", isCorrect: false },
          { id: Date.now() + 3, option: "", isCorrect: false },
          { id: Date.now() + 4, option: "", isCorrect: false }
        ];
        break;
      default:
        options = [];
    }

    handleAssignmentUpdate(assignmentId, { 
      questionType,
      options 
    });
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = savedQuestions.filter((_, idx) => idx !== index);
    setSavedQuestions(updatedQuestions);
    localStorage.setItem('savedQuestions', JSON.stringify(updatedQuestions));
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
            className="space-y-4"
          >
            <div className="grid grid-cols-3 gap-4">
              <TextField
                label="Assignment Title"
                value={assignment.assignmentTitle}
                onChange={(e) => handleAssignmentUpdate(assignment.id, { 
                  assignmentTitle: e.target.value 
                })}
                size="small"
                fullWidth
              />
              <TextField
                label="Lesson Link"
                value={assignment.lessonLink}
                onChange={(e) => handleAssignmentUpdate(assignment.id, { 
                  lessonLink: e.target.value 
                })}
                size="small"
                fullWidth
              />
              <TextField
                label="Duration"
                value={assignment.assignmentDuration}
                onChange={(e) => handleAssignmentUpdate(assignment.id, { 
                  assignmentDuration: e.target.value 
                })}
                size="small"
                fullWidth
              />
            </div>

            {!showQuestionForm ? (
              <Button
                variant="outlined"
                className='float-right'
                startIcon={<AddIcon />}
                onClick={() => setShowQuestionForm(true)}
                size="small"
              >
                Add Question
              </Button>
            ) : (
              <Card variant="outlined" className="mt-4">
                <CardContent className="space-y-4">
                  <FormControl fullWidth size="small">
                    <InputLabel>Question Type</InputLabel>
                    <Select
                      value={assignment.questionType || 'single'}
                      onChange={(e) => handleQuestionTypeChange(assignment.id, e.target.value)}
                      label="Question Type"
                    >
                      <MenuItem value="single">Choose the Best Answer</MenuItem>
                      <MenuItem value="multiple">Multiple Correct Answers</MenuItem>
                      <MenuItem value="true-false">True/False</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Question"
                    value={assignment.question || ''}
                    onChange={(e) => handleAssignmentUpdate(assignment.id, { 
                      question: e.target.value 
                    })}
                    size="small"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    {assignment.options?.map((option, index) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <TextField
                          size="small"
                          value={option.option}
                          onChange={(e) => handleOptionUpdate(assignment.id, index, { 
                            option: e.target.value 
                          })}
                          disabled={assignment.questionType === 'true-false'}
                          fullWidth
                          placeholder={`Option ${index + 1}`}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleOptionUpdate(assignment.id, index, { 
                            isCorrect: !option.isCorrect 
                          })}
                          color={option.isCorrect ? "success" : "default"}
                        >
                          {option.isCorrect ? <CheckCircleIcon /> : <CancelIcon />}
                        </IconButton>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        handleSaveQuestion(assignment.id);
                        setShowQuestionForm(false);
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {savedQuestions
              .filter(item => item.assignmentId === assignment.id)
              .map((item, index) => (
                <Card key={index} variant="outlined" className="mb-4">
                  <CardContent>
                    <div className="flex justify-between items-start mb-2">
                      <Typography variant="subtitle1">
                        Question {index + 1}
                      </Typography>
                      <div className="flex gap-1">
                        <IconButton
                          size="small"
                          onClick={() => handleEditQuestion(index)}
                          sx={{ color: '#2196f3' }}
                        >
                          <CreateIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteQuestion(index)}
                          sx={{ color: '#f44336' }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                    <Typography variant="body2" className="mb-2">
                      {item.question}
                    </Typography>
                    <div className="grid grid-cols-2 gap-2">
                      {item.options.map((option, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded text-sm ${
                            option.isCorrect 
                              ? 'bg-green-50 text-green-700' 
                              : 'bg-gray-50'
                          }`}
                        >
                          {option.option}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;