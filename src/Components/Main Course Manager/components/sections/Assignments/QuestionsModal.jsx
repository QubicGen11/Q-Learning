import React, { useState } from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  IconButton, 
  Card, 
  CardContent, 
  TextField, 
  Button,
  CircularProgress 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';

const QuestionsModal = ({ 
  open, 
  onClose, 
  savedQuestions, 
  isLoading 
}) => {
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState(null);

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

  const handleStartEdit = (question, index) => {
    setEditedQuestion({...question});
    setEditingQuestionIndex(index);
  };

  const handleEditQuestion = async (questionId, lessonId, updatedQuestion) => {
    try {
      const accessToken = Cookies.get('accessToken');
      
      const payload = {
        question: updatedQuestion.question,
        lessonId: lessonId,
        options: updatedQuestion.options.map(opt => ({
          option: opt.option,
          isCorrect: opt.isCorrect
        }))
      };

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

      if (response.data.message === "Question updated successfully") {
        toast.success('Question updated successfully');
        setEditingQuestionIndex(null);
      }
    } catch (error) {
      console.error('Error updating question:', error);
      toast.error(error.response?.data?.message || 'Failed to update question');
    }
  };

  const handleDeleteQuestion = async (lessonId, questionId) => {
    try {
      const accessToken = Cookies.get('accessToken');
      const response = await axios.delete(
        `http://localhost:8089/qlms/deleteQuestion/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      
      if (response.data.message === "Question deleted successfully") {
        toast.success('Question deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.error('Failed to delete question');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="questions-modal-title"
    >
      <Box sx={modalStyle}>
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <Typography variant="h5" component="h2" className="font-semibold text-gray-800">
            Saved Questions
          </Typography>
          <IconButton 
            onClick={onClose}
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
                                <IconButton
                                  onClick={() => {
                                    const updatedOptions = [...editedQuestion.options];
                                    updatedOptions.forEach((opt, idx) => {
                                      opt.isCorrect = idx === optIndex;
                                    });
                                    setEditedQuestion({
                                      ...editedQuestion,
                                      options: updatedOptions
                                    });
                                  }}
                                  color={option.isCorrect ? "success" : "default"}
                                >
                                  {option.isCorrect ? <CheckCircleIcon /> : <CancelIcon />}
                                </IconButton>
                                <Typography className="flex-grow">
                                  {option.option}
                                </Typography>
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
                        </>
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
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default QuestionsModal;
 