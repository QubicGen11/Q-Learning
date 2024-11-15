import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Fade } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaEnvelope, FaGithub, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { EmailForm } from './EmailForm';
import { toast, Toaster } from 'react-hot-toast';

export const AuthDialog = ({ open, onClose, title, isSignUp, customContent }) => {
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleSocialAuth = (provider) => {
    switch (provider) {
      case 'google':
        window.location.href = 'http://localhost:8089/qlms/auth/google';
        break;
      case 'github':
        window.location.href = 'http://localhost:8089/qlms/auth/github';
        break;
      case 'email':
        setShowEmailForm(true);
        break;
      default:
        toast.error('This login method is not available yet');
    }
  };

  const socialProviders = [
    { id: 'email', name: 'Email', icon: <FaEnvelope className="w-5 h-5" />, primary: true },
    { id: 'github', name: 'GitHub', icon: <FaGithub className="w-5 h-5" /> },
    { id: 'google', name: 'Google', icon: <FaGoogle className="w-5 h-5" /> },
    { id: 'linkedin', name: 'LinkedIn', icon: <FaLinkedin className="w-5 h-5" /> },
  ];

  const containerVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.98
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
        PaperProps={{
          className: 'rounded-lg overflow-hidden',
          style: { minWidth: '500px' }
        }}
      >
        <motion.div
          initial={false}
          animate={{
            backgroundColor: showEmailForm ? 'rgba(0,0,0,0.02)' : 'transparent'
          }}
          transition={{ duration: 0.6 }}
          className="pb-4"
        >
          <DialogTitle className="flex items-center p-6">
            {showEmailForm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mr-2 p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setShowEmailForm(false)}
              >
                <FaArrowLeft className="w-5 h-5" />
              </motion.button>
            )}
            <motion.span 
              className="text-2xl font-bold flex-grow text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {showEmailForm ? `${title} with Email` : title}
            </motion.span>
          </DialogTitle>

          <DialogContent className="px-6">
            <AnimatePresence mode="wait">
              {customContent ? (
                customContent
              ) : (
                <motion.div
                  key="social"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-3"
                >
                  {socialProviders.map((provider) => (
                    <motion.button
                      key={provider.name}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        w-full p-4 rounded-lg border dark:border-gray-700 
                        flex items-center justify-center space-x-3 
                        ${provider.primary 
                          ? 'bg-blue-600 text-white hover:bg-blue-700 border-transparent' 
                          : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'}
                        transition-all duration-300 shadow-sm hover:shadow-md
                      `}
                      onClick={() => handleSocialAuth(provider.id)}
                    >
                      {provider.icon}
                      <span>{title} with {provider.name}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </motion.div>
      </Dialog>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: '#4CAF50',
              color: 'white',
            },
            duration: 3000,
          },
          error: {
            style: {
              background: '#EF5350',
              color: 'white',
            },
            duration: 3000,
          },
          style: {
            borderRadius: '8px',
            padding: '16px',
            fontSize: '14px',
            maxWidth: '500px',
          },
        }}
      />
    </>
  );
};
