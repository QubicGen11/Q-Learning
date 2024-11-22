import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  IconButton, 
  Button 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';
import useCourseStore from "../../../../../store/courseStore";

const QuestionForm = ({ 
  assignmentId, 
  onCancel, 
  selectedCourse,
  courses,
  onQuestionSaved 
}) => {
  const [question, setQuestion] = useState('');
  const [questionType, setQuestionType] = useState('single');
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(assignmentId || '');
  const [options, setOptions] = useState([
    { option: '', isCorrect: false },
    { option: '', isCorrect: false },
    { option: '', isCorrect: false },
    { option: '', isCorrect: false }
  ]);

  // Fetch assignments when component mounts
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await axios.get(
          'http://localhost:8089/qlms/allAssignments',
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        toast.error('Failed to load assignments');
      }
    };

    fetchAssignments();
  }, []);

  const handleQuestionTypeChange = (value) => {
    setQuestionType(value);
  };

  const handleSaveQuestion = async () => {
    try {
      if (!selectedAssignment && !assignmentId) {
        toast.error('Please select an assignment');
        return;
      }

      const accessToken = Cookies.get('accessToken');
      
      // Find the lesson ID from the current assignment
      const selectedCourseData = courses?.find(c => c.id === selectedCourse);
      const selectedLesson = selectedCourseData?.courseLesson?.[0]?.lesson;

      if (!selectedLesson) {
        toast.error('Lesson not found');
        return;
      }

      // Use the assignmentId from props or selected from dropdown
      const finalAssignmentId = assignmentId || selectedAssignment;
      console.log('Using assignment ID:', finalAssignmentId); // Debug log

      const payload = {
        questions: [{
          questionText: question,
          lessonId: selectedLesson.id,
          courseId: selectedCourse,
          assignmentId: finalAssignmentId, // Use the final assignment ID
          isOpenSource: false,
          options: options.filter(opt => opt.option).map(opt => ({
            option: opt.option,
            isCorrect: opt.isCorrect
          }))
        }]
      };

      console.log('Sending payload:', payload); // Debug log

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

      if (response.status === 201) {
        toast.success('Question saved successfully');
        onQuestionSaved();
        // Reset form
        setQuestion('');
        setOptions([
          { option: '', isCorrect: false },
          { option: '', isCorrect: false },
          { option: '', isCorrect: false },
          { option: '', isCorrect: false }
        ]);
      }
    } catch (error) {
      console.error('Error saving question:', error);
      toast.error(error.response?.data?.message || 'Failed to save question');
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].option = value;
    setOptions(newOptions);
  };

  const handleCorrectChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].isCorrect = value;
    setOptions(newOptions);
  };

  return (
    <Card variant="outlined" className="mb-8 border-2 border-gray-200">
      <CardContent className="space-y-6">
        <Typography variant="h6" className="font-semibold text-gray-800">
          New Question
        </Typography>

        {/* Assignment Selector */}
        <FormControl fullWidth className="bg-gray-50 rounded">
          <InputLabel>Select Assignment</InputLabel>
          <Select
            value={selectedAssignment}
            onChange={(e) => setSelectedAssignment(e.target.value)}
            label="Select Assignment"
          >
            {assignments.map((assignment) => (
              <MenuItem key={assignment.id} value={assignment.id}>
                {assignment.assignmentTitle || 'Untitled Assignment'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth className="bg-gray-50 rounded">
          <InputLabel>Question Type</InputLabel>
          <Select
            value={questionType}
            onChange={(e) => handleQuestionTypeChange(e.target.value)}
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
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          multiline
          rows={2}
        />

        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-3 bg-gray-50 p-2 rounded">
              <TextField
                value={option.option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                disabled={questionType === 'true-false'}
                fullWidth
                placeholder={`Option ${index + 1}`}
              />
              <IconButton
                onClick={() => handleCorrectChange(index, !option.isCorrect)}
                color={option.isCorrect ? "success" : "default"}
              >
                {option.isCorrect ? <CheckCircleIcon /> : <CancelIcon />}
              </IconButton>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outlined"
            onClick={onCancel}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveQuestion}
            disabled={!question || !options.some(opt => opt.option) || !selectedAssignment}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save Question
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionForm; 