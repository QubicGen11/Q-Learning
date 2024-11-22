import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

import AssignmentsList from './AssignmentsList';
import AssignmentForm from './AssignmentForm';
import CreateAssignmentModal from './CreateAssignmentModal';
import QuestionsModal from './QuestionsModal';
import useCourseStore from "../../../../../store/courseStore";
import QuestionForm from './QuestionForm';

const Assignments = () => {
  const courseData = useCourseStore((state) => state.courseData);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openQuestionsModal, setOpenQuestionsModal] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const navigate = useNavigate();

  const [assignmentData, setAssignmentData] = useState({
    assignmentTitle: '',
    assignmentDescription: '',
    duration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    assignmentStatus: 'active',
    courseId: ''
  });

  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedAssignmentId) {
      setCurrentAssignmentId(selectedAssignmentId);
    }
  }, [selectedAssignmentId]);

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

  const handleCreateAssignment = async () => {
    try {
      const accessToken = Cookies.get('accessToken');
      const response = await axios.post(
        'http://localhost:8089/qlms/newAssignment',
        assignmentData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        toast.success('Assignment created successfully');
        const newAssignmentId = response.data.id.toString();
        setCurrentAssignmentId(newAssignmentId);
        setSelectedAssignmentId(newAssignmentId);
        setShowCreateAssignment(false);
        setShowQuestionForm(true);
      }
    } catch (error) {
      console.error('Error creating assignment:', error);
      toast.error('Failed to create assignment');
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:8089/qlms/getQuestions/${assignmentId}`);
      setQuestionCount(response.data.length);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
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
          
          <Button
            variant="contained"
            onClick={() => setShowCreateAssignment(true)}
            className="bg-gradient-to-r from-indigo-600 to-violet-600"
            startIcon={<AddIcon />}
          >
            Create Assignment
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        <AssignmentsList 
          selectedAssignmentId={selectedAssignmentId}
          onSelectAssignment={setSelectedAssignmentId}
          courseData={courseData}
        />
        
        <AssignmentForm
          selectedAssignmentId={selectedAssignmentId}
          courses={courses}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          isLoading={isLoading}
          setOpenQuestionsModal={setOpenQuestionsModal}
          setSavedQuestions={setSavedQuestions}
          currentAssignmentId={currentAssignmentId}
          onShowQuestionForm={() => setShowQuestionForm(true)}
        />
      </div>

      <CreateAssignmentModal 
        open={showCreateAssignment}
        onClose={() => setShowCreateAssignment(false)}
        assignmentData={assignmentData}
        setAssignmentData={setAssignmentData}
        courses={courses}
        setCurrentAssignmentId={setCurrentAssignmentId}
        onShowQuestionForm={() => setShowQuestionForm(true)}
      />

      {showQuestionForm && (
        <QuestionForm
          assignmentId={currentAssignmentId?.toString()}
          onCancel={() => setShowQuestionForm(false)}
          selectedCourse={selectedCourse}
          currentAssignmentId={currentAssignmentId?.toString()}
          courses={courses}
          onQuestionSaved={() => {
            setShowQuestionForm(false);
          }}
        />
      )}

      <QuestionsModal
        open={openQuestionsModal}
        onClose={() => setOpenQuestionsModal(false)}
        savedQuestions={savedQuestions}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Assignments; 