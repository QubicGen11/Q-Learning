import React from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  Button,
  Stack,
  Paper,
  Tooltip,
  IconButton,
  CircularProgress,
  TextField,
  AppBar,
  Toolbar
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const typographyStyle = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 500
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  outline: 'none',
  overflow: 'hidden',
};

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  isUpdating,
  lessonLink,
  onLessonLinkChange,
  onBack
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper elevation={24} sx={style}>
        <AppBar position="relative" color="transparent" elevation={0}>
          <Toolbar sx={{ minHeight: '48px !important' }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onBack}
              sx={{ mr: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="subtitle1" sx={{ flex: 1 }}>
              Back to Course
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
            {isUpdating ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={20} />
                <Typography>
                  Updating...
                </Typography>
              </Box>
            ) : (
              <>
                <Typography 
                  id="modal-title" 
                  variant="h6" 
                  component="h2" 
                  textAlign="center"
                  sx={typographyStyle}
                >
                  {title}
                </Typography>
                <Tooltip 
                  title="Adding assignments to your course will help students test their knowledge and improve their understanding of the material."
                  arrow
                  placement="top"
                >
                  <IconButton size="small">
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
          
          {!isUpdating && (
            <>
       
              <Typography 
                id="modal-description" 
                textAlign="center"
                sx={{ ...typographyStyle, mb: 3 }}
              >
                {message}
              </Typography>

              <Stack 
                direction="row" 
                spacing={2} 
                justifyContent="center"
              >
                <Tooltip title="Skip assignment creation for now" arrow>
                  <Button 
                    variant="outlined" 
                    onClick={onClose}
                    color="primary"
                    sx={{ width: 100, ...typographyStyle }}
                  >
                    No
                  </Button>
                </Tooltip>
                <Tooltip title="Proceed to create assignments for your course" arrow>
                  <Button 
                    variant="contained" 
                    onClick={onConfirm}
                    color="primary"
                    sx={{ width: 100, ...typographyStyle }}
                  >
                    Yes
                  </Button>
                </Tooltip>
              </Stack>
            </>
          )}
        </Box>
      </Paper>
    </Modal>
  );
};

export default ConfirmationModal; 