import React, { useState, useEffect } from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import { FiPlus } from 'react-icons/fi';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import useCourseStore from "../../../../../store/courseStore";
import QuestionForm from './QuestionForm';

const AssignmentForm = ({ 
  selectedAssignmentId, 
  courses, 
  selectedCourse, 
  setSelectedCourse,
  isLoading,
  setOpenQuestionsModal,
  setSavedQuestions,
  currentAssignmentId,
  onShowQuestionForm
}) => {
  const courseData = useCourseStore((state) => state.courseData);
  const updateCourseData = useCourseStore((state) => state.updateCourseData);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [savedLessons, setSavedLessons] = useState([]);

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    setSavedQuestions([]);
  };

  const handleLessonChange = async (assignmentId, lessonTitle) => {
    try {
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
    }
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

  const selectedAssignment = courseData?.assignments?.find(
    a => a.id === selectedAssignmentId
  );

  const handleAddQuestion = () => {
    if (!currentAssignmentId) {
      toast.error('Please create an assignment first');
      return;
    }
    onShowQuestionForm();
  };

  if (!selectedAssignmentId) {
    return (
      <div className="flex-1 bg-white rounded-xl shadow-md p-6 flex items-center justify-center">
        <Typography color="textSecondary">
          Select an assignment from the list
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-6">
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
              value={selectedAssignment?.lessonLink || ''}
              onChange={(e) => handleLessonChange(selectedAssignmentId, e.target.value)}
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
          value={selectedAssignment?.assignmentTitle || ''}
          onChange={(e) => handleAssignmentUpdate(selectedAssignmentId, { 
            assignmentTitle: e.target.value 
          })}
          variant="outlined"
          fullWidth
        />

        <TextField
          label="Duration"
          value={selectedAssignment?.assignmentDuration || ''}
          onChange={(e) => handleAssignmentUpdate(selectedAssignmentId, { 
            assignmentDuration: e.target.value 
          })}
          variant="outlined"
          fullWidth
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <Typography variant="h6">Questions</Typography>
        <div className="flex gap-2">
          <Button
            variant="contained"
            startIcon={<FiPlus />}
            onClick={handleAddQuestion}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Question
          </Button>
          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            onClick={() => setOpenQuestionsModal(true)}
          >
            See Questions
          </Button>
        </div>
      </div>

      {showQuestionForm && (
        <QuestionForm
          assignmentId={selectedAssignmentId}
          onCancel={() => setShowQuestionForm(false)}
          selectedCourse={selectedCourse}
          currentAssignmentId={currentAssignmentId}
          courses={courses}
          onQuestionSaved={() => {
            setShowQuestionForm(false);
            if (selectedAssignment?.lessonLink) {
              handleLessonChange(selectedAssignmentId, selectedAssignment.lessonLink);
            }
          }}
        />
      )}

      {isLoading && (
        <div className="flex justify-center p-8">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default AssignmentForm; 