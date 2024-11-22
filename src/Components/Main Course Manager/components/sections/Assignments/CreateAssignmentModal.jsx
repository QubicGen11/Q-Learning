import React from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  IconButton 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateAssignmentModal = ({ 
  open, 
  onClose, 
  assignmentData, 
  setAssignmentData, 
  courses, 
  onCreateAssignment,
  setCurrentAssignmentId 
}) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    p: 4,
    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
  };

  const handleCreateAssignment = async () => {
    try {
      const accessToken = Cookies.get('accessToken');
      const payload = {
        assignmentTitle: assignmentData.assignmentTitle,
        assignmentDescription: assignmentData.assignmentDescription,
        duration: assignmentData.duration + ':59.000Z',
        assignmentStatus: 'active',
        courseId: assignmentData.courseId
      };

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

      if (response.data) {
        toast.success('Assignment created successfully');
        setCurrentAssignmentId(response.data.id);
        onClose();
      }
    } catch (error) {
      console.error('Error creating assignment:', error);
      toast.error('Failed to create assignment');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create-assignment-modal"
    >
      <Box sx={modalStyle}>
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <Typography 
              variant="h6" 
              className="font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
            >
              Create New Assignment
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className="space-y-4">
            <TextField
              fullWidth
              label="Assignment Title"
              value={assignmentData.assignmentTitle}
              onChange={(e) => setAssignmentData({
                ...assignmentData,
                assignmentTitle: e.target.value
              })}
              className="bg-white"
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Assignment Description"
              value={assignmentData.assignmentDescription}
              onChange={(e) => setAssignmentData({
                ...assignmentData,
                assignmentDescription: e.target.value
              })}
              className="bg-white"
            />

            <TextField
              fullWidth
              type="datetime-local"
              label="Duration"
              InputLabelProps={{ shrink: true }}
              value={assignmentData.duration}
              onChange={(e) => setAssignmentData({
                ...assignmentData,
                duration: e.target.value + ':59.000Z'
              })}
              className="bg-white"
            />

            <FormControl fullWidth className="bg-white">
              <InputLabel>Select Course</InputLabel>
              <Select
                value={assignmentData.courseId}
                onChange={(e) => setAssignmentData({
                  ...assignmentData,
                  courseId: e.target.value
                })}
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.courseTitle}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outlined"
              onClick={onClose}
              className="text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCreateAssignment}
              disabled={!assignmentData.assignmentTitle || !assignmentData.courseId}
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
            >
              Create Assignment
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateAssignmentModal; 