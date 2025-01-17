import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { BsEmojiSmile } from 'react-icons/bs';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';

const CommentDialog = ({ isOpen, onClose, onSubmit }) => {
  const [comment, setComment] = useState('');
  const [localComments, setLocalComments] = useState({});
  const { courseData, updateCourseData } = useCourseCreationStore();

  // Sync local state with store data
  useEffect(() => {
    if (courseData?.comments) {
      setLocalComments(courseData.comments);
    }
  }, [courseData?.comments]);

  const handleSubmitComment = async () => {
    if (comment.trim()) {
      const newComment = {
        userId: "2251f63d-33df-44a8-88a5-8a9252583e1a",
        role: "INSTRUCTOR",
        text: comment
      };

      // Update local state first
      const updatedComments = {
        "0": newComment
      };
      setLocalComments(updatedComments);

      // Create updated course data
      const updatedCourseData = {
        ...courseData,
        comments: updatedComments
      };

      // Update store
      await updateCourseData(updatedCourseData);

      // Update local storage
      localStorage.setItem('courseCreationData', JSON.stringify(updatedCourseData));
      
      // Clear input
      setComment('');

      // Wait for next tick to ensure all updates are processed
      await new Promise(resolve => setTimeout(resolve, 0));
      
      // Now submit with the latest data
      onSubmit(updatedCourseData);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-25 z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-lg z-50"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Comments</h2>
                <button onClick={onClose}>
                  <IoClose size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {Object.values(localComments).map((comment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border-b"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {comment.role[0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-gray-900">{comment.role}</span>
                            <span className="ml-2 text-sm text-gray-500">Just now</span>
                          </div>
                          <span className="text-sm text-gray-400">#{index + 1}</span>
                        </div>
                        <p className="mt-1 text-gray-600">{comment.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t p-4">
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter your comment"
                    className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-400"
                  />
                  <button className="text-gray-400 hover:text-gray-600">
                    <BsEmojiSmile size={20} />
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmitComment}
                    className="px-4 py-1.5 bg-[#6366F1] text-white rounded-md text-sm font-medium hover:bg-[#5558E3] transition-colors"
                  >
                    Send
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommentDialog; 