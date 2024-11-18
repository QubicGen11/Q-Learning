import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Button,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const AuthModal = ({ open, handleClose, mode, userType }) => {
  const getTitle = () => {
    const action = mode === 'signin' ? 'Sign In' : 'Sign Up';
    const type = userType.charAt(0).toUpperCase() + userType.slice(1);
    return `${action} as ${type}`;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: '0', sm: '16px' },
          p: { xs: 2, sm: 3 },
          m: { xs: 0, sm: 2 },
          width: '100%',
          position: { xs: 'absolute', sm: 'relative' },
          bottom: { xs: 0, sm: 'auto' },
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
        }
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'grey.500'
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 4 } }}>
          <Typography 
            variant="h5" 
            component="h2" 
            fontWeight="bold" 
            color="#0033A1" 
            sx={{ 
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              mb: 1 
            }}
          >
            {getTitle()}
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              fontSize: { xs: '0.875rem', sm: '1rem' } 
            }}
          >
            Choose your preferred way to continue
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon sx={{ color: '#DB4437' }} />}
            sx={{
              py: { xs: 1, sm: 1.5 },
              px: { xs: 1.5, sm: 2 },
              justifyContent: 'flex-start',
              borderColor: '#e0e0e0',
              '&:hover': { borderColor: '#0033A1', bgcolor: '#f5f5f5' },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Continue with Google
          </Button>

          <Button
            variant="outlined"
            startIcon={<LinkedInIcon sx={{ color: '#0077b5' }} />}
            sx={{
              py: { xs: 1, sm: 1.5 },
              px: { xs: 1.5, sm: 2 },
              justifyContent: 'flex-start',
              borderColor: '#e0e0e0',
              '&:hover': { borderColor: '#0033A1', bgcolor: '#f5f5f5' },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Continue with LinkedIn
          </Button>

          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            sx={{
              py: { xs: 1, sm: 1.5 },
              px: { xs: 1.5, sm: 2 },
              justifyContent: 'flex-start',
              borderColor: '#e0e0e0',
              '&:hover': { borderColor: '#0033A1', bgcolor: '#f5f5f5' },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Continue with GitHub
          </Button>

          <Divider sx={{ my: { xs: 1, sm: 1.5 } }}>
            <Typography 
              color="text.secondary" 
              variant="body2"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              OR
            </Typography>
          </Divider>

          <Button
            variant="contained"
            startIcon={<EmailIcon />}
            sx={{
              py: { xs: 1, sm: 1.5 },
              px: { xs: 1.5, sm: 2 },
              bgcolor: '#0033A1',
              '&:hover': { bgcolor: '#002280' },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Continue with Email
          </Button>
        </Box>

        <Box sx={{ mt: { xs: 2, sm: 3 }, textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
          >
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <Typography
              component="span"
              sx={{
                color: '#0033A1',
                cursor: 'pointer',
                fontWeight: 'bold',
                '&:hover': { textDecoration: 'underline' },
                fontSize: 'inherit'
              }}
              onClick={() => {
                // Add logic to switch between signin/signup
              }}
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </Typography>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal; 