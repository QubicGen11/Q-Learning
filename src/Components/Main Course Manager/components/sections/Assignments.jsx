import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiClock, FiAward, FiCheck, FiX } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-hot-toast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import parse from 'html-react-parser';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

import useCourseStore from "../../../../store/courseStore";
import useQuestionStore from '../../../../store/questionStore';
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
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
  const [savedLessons, setSavedLessons] = useState([]);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const { 
    questions,
    loading,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    fetchQuestions
  } = useQuestionStore();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openQuestionsModal, setOpenQuestionsModal] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(null);
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const accessToken = Cookies.get('accessToken');
      const response = await axios.get('http://localhost:8089/qlms/getUserCreatedCourse', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to fetch courses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    setSavedQuestions([]);
  };

  const handleLessonChange = async (assignmentId, lessonTitle) => {
    try {
      setIsLoading(true);
      setSavedQuestions([]);
      
      const selectedCourseData = courses.find(c => c.id === selectedCourse);
      const selectedLesson = selectedCourseData?.courseLesson.find(
        l => l.lesson.lessonTitle === lessonTitle
      );

      if (selectedLesson) {
        const accessToken = Cookies.get('accessToken');
        const response = await axios.get(
          `http://localhost:8089/qlms/getLessonQuestions/${selectedLesson.lesson.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        setSavedQuestions(response.data.questions || []);
      }

      handleAssignmentUpdate(assignmentId, {
        lessonLink: lessonTitle
      });
    } catch (error) {
      console.error('Error in handleLessonChange:', error);
      toast.error('Failed to fetch questions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAssignment = () => {
    const newAssignment = {
      id: Date.now(),
      assignmentTitle: "",
      lessonLink: "",
      assignmentDuration: "",
      assignmentDescription: "",
      questions: [],
      questionType: 'single',
      options: [
        { id: Date.now() + 1, option: "", isCorrect: false },
        { id: Date.now() + 2, option: "", isCorrect: false },
        { id: Date.now() + 3, option: "", isCorrect: false },
        { id: Date.now() + 4, option: "", isCorrect: false }
      ],
      showQuestionForm: false
    };

    const updatedAssignments = [...(courseData?.assignments || []), newAssignment];
    updateCourseData({
      ...courseData,
      assignments: updatedAssignments
    });
    localStorage.setItem('courseAssignments', JSON.stringify(updatedAssignments));
    setSelectedAssignmentId(newAssignment.id);
  };

  const handleAssignmentUpdate = (assignmentId, updates) => {
    if (!courseData?.assignments) return;
    
    const updatedAssignments = courseData.assignments.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, ...updates } 
        : assignment
    );

    console.log('Updated Assignment:', updatedAssignments.find(a => a.id === assignmentId));

    updateCourseData({
      ...courseData,
      assignments: updatedAssignments
    });
  };

  const handleOptionUpdate = (assignmentId, optionIndex, updates) => {
    if (!courseData?.assignments) return;
    
    console.log('Updating option:', { optionIndex, updates }); // Debug log
    
    const updatedAssignments = courseData.assignments.map(assignment => {
      if (assignment.id === assignmentId) {
        const updatedOptions = [...assignment.options];
        
        if (updates.hasOwnProperty('isCorrect')) {
          if (assignment.questionType === 'multiple') {
            // For multiple choice, just toggle the current option
            updatedOptions[optionIndex] = {
              ...updatedOptions[optionIndex],
              isCorrect: updates.isCorrect
            };
          } else {
            // For single choice, make sure only one is selected
            updatedOptions.forEach((opt, idx) => {
              updatedOptions[idx] = {
                ...opt,
                isCorrect: idx === optionIndex ? updates.isCorrect : false
              };
            });
          }
        } else {
          // Update option text
          updatedOptions[optionIndex] = {
            ...updatedOptions[optionIndex],
            ...updates
          };
        }
        
        return { ...assignment, options: updatedOptions };
      }
      return assignment;
    });

    console.log('Updated assignment:', updatedAssignments.find(a => a.id === assignmentId)); // Debug log
    
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

  const handleSaveQuestion = async (assignmentId) => {
    const currentAssignment = courseData?.assignments?.find(a => a.id === assignmentId);
    
    if (!currentAssignment?.backendId) {
      toast.error('Please create the assignment first');
      return;
    }

    try {
      const accessToken = Cookies.get('accessToken');
      
      const payload = {
        "questionText": currentAssignment.question,
        "lessonId": selectedCourse,
        "courseId": selectedCourse,
        "assignmentId": currentAssignment.backendId,
        "isOpenSource": false,
        "options": currentAssignment.options
          .filter(opt => opt.option)
          .map(opt => ({
            "option": opt.option,
            "isCorrect": opt.isCorrect
          }))
      };

      const response = await axios.post(
        'http://localhost:8089/qlms/newQuestion',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.message === "Question created and associated with assignment successfully") {
        toast.success('Question saved successfully');
        
        // Update the assignment's questions array with the new question
        const updatedAssignments = courseData.assignments.map(a => {
          if (a.id === assignmentId) {
            return {
              ...a,
              questions: [...(a.questions || []), response.data.question]
            };
          }
          return a;
        });

        // Update course data with new question
        updateCourseData({
          ...courseData,
          assignments: updatedAssignments
        });

        // Reset the question form
        handleAssignmentUpdate(assignmentId, {
          question: '',
          options: currentAssignment.options.map(opt => ({ 
            ...opt, 
            option: '', 
            isCorrect: false 
          }))
        });
        
        setShowQuestionForm(false);

        // Refresh the questions list if needed
        if (selectedCourse) {
          await fetchLessonQuestions(selectedCourse);
        }
      }
    } catch (error) {
      console.error('Error saving question:', error);
      toast.error(error.response?.data?.message || 'Failed to save question');
    }
  };

  const handleEditQuestion = async (questionId, lessonId, updatedQuestion) => {
    try {
      const accessToken = Cookies.get('accessToken');
      
      // Format payload exactly as required
      const payload = {
        question: updatedQuestion.question,
        lessonId: lessonId,
        options: updatedQuestion.options.map(opt => ({
          option: opt.option,
          isCorrect: opt.isCorrect
        }))
      };

      console.log('Sending update payload:', payload); // Debug log

      const response = await axios.put(
        `http://localhost:8089/qlms/updateQuestion/${questionId}`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Update response:', response.data); // Debug log

      if (response.data.message === "Question updated successfully") {
        toast.success('Question updated successfully');
        await fetchLessonQuestions(lessonId);
        setEditingQuestionIndex(null);
      }
    } catch (error) {
      console.error('Error updating question:', error);
      toast.error(error.response?.data?.message || 'Failed to update question');
    }
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

  const handleDeleteQuestion = async (lessonId, questionId) => {
    try {
      await deleteQuestion(lessonId, questionId);
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  // Add useEffect to fetch questions when lessonId changes
  useEffect(() => {
    if (selectedCourse && selectedAssignmentId) {
      const selectedCourseData = courses.find(c => c.id === selectedCourse);
      const currentAssignment = courseData?.assignments?.find(a => a.id === selectedAssignmentId);
      const selectedLesson = selectedCourseData?.courseLesson.find(
        l => l.lesson.lessonTitle === currentAssignment?.lessonLink
      );
      
      if (selectedLesson) {
        fetchQuestions(selectedLesson.lesson.id);
      }
    }
  }, [selectedCourse, selectedAssignmentId, courseData]);

  // Fetch lesson questions function
  const fetchLessonQuestions = async (lessonId) => {
    try {
      const accessToken = Cookies.get('accessToken');
      const response = await axios.get(
        `http://localhost:8089/qlms/getLessonQuestions/${lessonId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      console.log('Fetched questions response:', response.data);
      // Update to access the questions array from the response
      setSavedQuestions(response.data.questions || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Failed to fetch questions');
    }
  };

  // Modal style
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    overflow: 'auto'
  };

  // When starting to edit, initialize the edited question
  const handleStartEdit = (question, index) => {
    setEditedQuestion({...question}); // Create a copy of the question
    setEditingQuestionIndex(index);
  };

  const handleCreateAssignment = async (assignmentId) => {
    const currentAssignment = courseData?.assignments?.find(a => a.id === assignmentId);
    
    if (!currentAssignment?.assignmentTitle || 
        !currentAssignment?.assignmentDuration || 
        !selectedCourse ||
        !currentAssignment?.lessonLink) {  // Add check for lessonLink
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const accessToken = Cookies.get('accessToken');
      
      // Get the lesson ID from the selected lesson
      const selectedCourseData = courses.find(c => c.id === selectedCourse);
      const selectedLesson = selectedCourseData?.courseLesson.find(
        l => l.lesson.lessonTitle === currentAssignment.lessonLink
      );

      if (!selectedLesson) {
        toast.error('Please select a valid lesson');
        return;
      }

      const payload = {
        assignmentTitle: currentAssignment.assignmentTitle,
        assignmentDescription: currentAssignment.assignmentDescription || "",
        duration: new Date(currentAssignment.assignmentDuration).toISOString(),
        assignmentStatus: "active",
        courseId: selectedCourse,
        lessonId: selectedLesson.lesson.id  // Add lessonId to payload
      };

      console.log('Creating assignment with payload:', payload); // Debug log

      const response = await axios.post(
        'http://localhost:8089/qlms/newAssignment',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.assignment?.id) {
        toast.success('Assignment created successfully');
        setCurrentAssignmentId(response.data.assignment.id);
        
        // Update the assignment in courseData with the backend ID
        const updatedAssignments = courseData.assignments.map(a => 
          a.id === assignmentId 
            ? { 
                ...a, 
                backendId: response.data.assignment.id,
                lessonId: selectedLesson.lesson.id  // Store lessonId in local state too
              }
            : a
        );
        
        updateCourseData({
          ...courseData,
          assignments: updatedAssignments
        });
        
        return response.data.assignment.id;
      }
    } catch (error) {
      console.error('Error creating assignment:', error);
      toast.error(error.response?.data?.message || 'Failed to create assignment');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex items-center">
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => navigate('/courses')}
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">
          Back to Course
        </Typography>
      </div>

      <div className="flex gap-8">
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
                onClick={() => setSelectedAssignmentId(assignment.id)}
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

        <div className="flex-1 bg-white rounded-xl shadow-md p-6">
          {courseData?.assignments?.map((assignment) => (
            <div
              key={assignment.id}
              style={{ display: selectedAssignmentId === assignment.id ? 'block' : 'none' }}
            >
              <div className="grid grid-cols-4 gap-6 mb-8">
                <FormControl fullWidth className="bg-gray-50">
                  <InputLabel>Select Course</InputLabel>
                  <Select
                    value={selectedCourse}
                    onChange={handleCourseChange}
                  >
                    <MenuItem value="">
                      <em>Select a course</em>
                    </MenuItem>
                    {courses.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.courseTitle}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {selectedCourse && (
                  <FormControl fullWidth className="bg-gray-50">
                    <InputLabel>Select Lesson</InputLabel>
                    <Select
                      value={assignment.lessonLink || ''}
                      onChange={(e) => handleLessonChange(assignment.id, e.target.value)}
                    >
                      <MenuItem value="">
                        <em>Select a lesson</em>
                      </MenuItem>
                      {courses
                        .find(course => course.id === selectedCourse)
                        ?.courseLesson.map((lessonItem) => (
                          <MenuItem 
                            key={lessonItem.lesson.id} 
                            value={lessonItem.lesson.lessonTitle}
                          >
                            {lessonItem.lesson.lessonTitle}
                          </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                <TextField
                  label="Assignment Title"
                  value={assignment.assignmentTitle}
                  onChange={(e) => handleAssignmentUpdate(assignment.id, { assignmentTitle: e.target.value })}
                  variant="outlined"
                  fullWidth
                  className="mb-4"
                />

                <TextField
                  label="Duration"
                  type="datetime-local"
                  value={assignment.assignmentDuration}
                  onChange={(e) => handleAssignmentUpdate(assignment.id, { assignmentDuration: e.target.value })}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: new Date().toISOString().slice(0, 16) // This sets min date to current date
                  }}
                  className="mb-4"
                />

                <div className="col-span-4 flex justify-end">
                  <Button
                    variant="contained"
                    onClick={() => handleCreateAssignment(selectedAssignmentId)}
                    disabled={!selectedCourse || !courseData?.assignments?.find(a => a.id === selectedAssignmentId)?.assignmentTitle}
                    className="bg-green-600 hover:bg-green-700 mr-4"
                  >
                    Create Assignment
                  </Button>
                </div>
              </div>

              {!showQuestionForm ? (
                <div className="flex justify-end mb-6">
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setShowQuestionForm(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Add Question
                  </Button>
                </div>
              ) : (
                <Card variant="outlined" className="mb-8 border-2 border-gray-200">
                  <CardContent className="space-y-6">
                    <Typography variant="h6" className="font-semibold text-gray-800">
                      New Question
                    </Typography>

                    <FormControl fullWidth className="bg-gray-50 rounded">
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
                      label="Question Text"
                      value={assignment.question || ''}
                      onChange={(e) => handleAssignmentUpdate(assignment.id, { 
                        question: e.target.value 
                      })}
                      multiline
                      rows={2}
                    />

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {assignment.options?.map((option, index) => (
                        <div key={option.id} className="flex items-center gap-3 bg-gray-50 p-2 rounded">
                          <TextField
                            value={option.option}
                            onChange={(e) => handleOptionUpdate(assignment.id, index, { 
                              option: e.target.value 
                            })}
                            disabled={assignment.questionType === 'true-false'}
                            fullWidth
                            placeholder={`Option ${index + 1}`}
                          />
                          <IconButton
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

                    <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                      <Button
                        variant="outlined"
                        onClick={handleCancelEdit}
                        className="border-gray-300"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleSaveQuestion(assignment.id)}
                        disabled={
                          !assignment.question ||
                          !assignment.options?.some(opt => opt.option.trim() !== '') ||
                          !assignment.options?.some(opt => opt.isCorrect) ||
                          !assignment.backendId ||
                          !selectedCourse
                        }
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Save Question
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="mt-8">
                <Typography variant="h6" className="mb-4">
                  Saved Questions ({savedQuestions.length})
                </Typography>
                
                {isLoading ? (
                  <CircularProgress />
                ) : savedQuestions && savedQuestions.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 overflow-x-auto">
              
                  </div>
                ) : (
                  <Typography color="textSecondary">
                    No questions saved for this lesson
                  </Typography>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenQuestionsModal(true)}
                  startIcon={<VisibilityIcon />}
                >
                  See Questions
                </Button>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-center p-8">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>

      {/* Questions Modal */}
      <Modal
        open={openQuestionsModal}
        onClose={() => setOpenQuestionsModal(false)}
        aria-labelledby="questions-modal-title"
      >
        <Box sx={modalStyle}>
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <Typography variant="h5" component="h2" className="font-semibold text-gray-800">
              Saved Questions
            </Typography>
            <IconButton 
              onClick={() => setOpenQuestionsModal(false)}
              className="hover:bg-gray-100"
            >
              <CloseIcon />
            </IconButton>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-8">
              <CircularProgress />
            </div>
          ) : savedQuestions && savedQuestions.length > 0 ? (
            <div className="space-y-6">
              {savedQuestions.map((question, index) => (
                <Card 
                  key={question.id} 
                  variant="outlined" 
                  className="hover:shadow-md transition-shadow duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Typography className="font-semibold text-blue-600">
                            {index + 1}
                          </Typography>
                        </div>
                      </div>
                      <div className="flex-grow">
                        {editingQuestionIndex === index ? (
                          <div className="space-y-4">
                            <TextField
                              fullWidth
                              label="Question"
                              value={editedQuestion.question}
                              onChange={(e) => {
                                setEditedQuestion({
                                  ...editedQuestion,
                                  question: e.target.value
                                });
                              }}
                            />
                            <div className="grid grid-cols-2 gap-4">
                              {editedQuestion.options.map((option, optIndex) => (
                                <div key={option.id} className="flex items-center gap-2">
                                  <TextField
                                    fullWidth
                                    size="small"
                                    value={option.option}
                                    onChange={(e) => {
                                      const updatedOptions = [...editedQuestion.options];
                                      updatedOptions[optIndex] = {
                                        ...updatedOptions[optIndex],
                                        option: e.target.value
                                      };
                                      setEditedQuestion({
                                        ...editedQuestion,
                                        options: updatedOptions
                                      });
                                    }}
                                  />
                                  <IconButton
                                    onClick={() => {
                                      const updatedOptions = [...editedQuestion.options];
                                      // For single correct answer questions
                                      if (true) { // You can add logic here for different question types
                                        updatedOptions.forEach((opt, idx) => {
                                          opt.isCorrect = idx === optIndex;
                                        });
                                      }
                                      setEditedQuestion({
                                        ...editedQuestion,
                                        options: updatedOptions
                                      });
                                    }}
                                    color={option.isCorrect ? "success" : "default"}
                                  >
                                    {option.isCorrect ? <CheckCircleIcon /> : <CancelIcon />}
                                  </IconButton>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outlined"
                                onClick={() => {
                                  setEditingQuestionIndex(null);
                                  setEditedQuestion(null);
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => handleEditQuestion(
                                  editedQuestion.id,
                                  editedQuestion.lessonId,
                                  editedQuestion
                                )}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-start mb-4">
                              <Typography variant="subtitle1" className="font-medium text-gray-800">
                                {question.question}
                              </Typography>
                              <div className="flex gap-2">
                                <IconButton
                                  size="small"
                                  onClick={() => handleStartEdit(question, index)}
                                  className="text-blue-600 hover:bg-blue-50"
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteQuestion(question.lessonId, question.id)}
                                  className="text-red-500 hover:bg-red-50"
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pl-4">
                              {question.options.map((option, optIndex) => (
                                <div 
                                  key={option.id} 
                                  className={`flex items-center gap-2 p-3 rounded-lg ${
                                    option.isCorrect ? 'bg-green-50' : 'bg-gray-50'
                                  }`}
                                >
                                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white">
                                    <Typography className="text-sm text-gray-600">
                                      {String.fromCharCode(65 + optIndex)}
                                    </Typography>
                                  </div>
                                  {option.isCorrect ? (
                                    <CheckCircleIcon className="text-green-500" fontSize="small" />
                                  ) : (
                                    <CancelIcon className="text-gray-400" fontSize="small" />
                                  )}
                                  <Typography className="flex-grow">
                                    {option.option}
                                  </Typography>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <Typography color="textSecondary" className="text-lg">
                No questions saved for this lesson
              </Typography>
            </div>
          )}

          <div className="flex justify-end mt-6 pt-4 border-t">
            <Button
              variant="contained"
              onClick={() => setOpenQuestionsModal(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Assignments;