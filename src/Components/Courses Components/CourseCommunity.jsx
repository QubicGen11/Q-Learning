import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiThumbsUp } from 'react-icons/fi';
import axios from 'axios';
import Loader from '../Common/Loader';
import config from '../../config/apiConfig';

// Utility function to retrieve access token from cookies
const getAccessTokenFromCookie = () => {
  const match = document.cookie.match(new RegExp('(^| )accessToken=([^;]+)'));
  return match ? match[2] : null;
};

// Add these utility functions at the top
const getInitialAvatar = (userName) => {
  if (!userName) return 'U';
  return userName.charAt(0).toUpperCase();
};

// Function to get a consistent gradient based on the username
const getGradientColor = (userName) => {
  if (!userName) return 'bg-gradient-to-r from-gray-400 to-gray-500';
  
  // List of gradient combinations
  const gradients = [
    'bg-gradient-to-r from-pink-500 to-purple-500',
    'bg-gradient-to-r from-blue-500 to-teal-500',
    'bg-gradient-to-r from-green-400 to-blue-500',
    'bg-gradient-to-r from-yellow-400 to-orange-500',
    'bg-gradient-to-r from-indigo-500 to-purple-500',
    'bg-gradient-to-r from-red-500 to-pink-500',
    'bg-gradient-to-r from-teal-400 to-blue-500',
    'bg-gradient-to-r from-orange-500 to-red-500'
  ];
  
  // Use the first character's char code to select a gradient
  const index = userName.charCodeAt(0) % gradients.length;
  return gradients[index];
};

const CourseCommunity = ({ courseId }) => {
  const [discussions, setDiscussions] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likedComments, setLikedComments] = useState(new Set());

  useEffect(() => {
    fetchComments().catch(error => console.error("Error initializing comments:", error));
  }, []);

  const fetchComments = async () => {
    setIsLoading(true);
    const token = getAccessTokenFromCookie();
    if (!token) {
      console.error("No access token found in cookies");
      setIsLoading(false);
      return;
    }

    try {
      // Get comments
      const commentsResponse = await axios.get(
        `${config.CURRENT_URL}/qlms/getAllCourseComments/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Get liked status for each comment
      const likedStatusSet = new Set();
      for (const comment of commentsResponse.data) {
        try {
          const likeStatusResponse = await axios.get(
            `${config.CURRENT_URL}/qlms/isCommentLiked/${comment.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (likeStatusResponse.data.isLiked) {
            likedStatusSet.add(comment.id);
          }
        } catch (error) {
          console.error(`Error fetching like status for comment ${comment.id}:`, error);
        }
      }

      setLikedComments(likedStatusSet);
      setDiscussions(commentsResponse.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to load comments");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const token = getAccessTokenFromCookie();
    if (!token) {
      console.error("No access token found in cookies");
      return;
    }

    try {
      const response = await axios.post(
        `${config.CURRENT_URL}/qlms/createComment`,
        { 
          comment: newPost, 
          courseId 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDiscussions([response.data.data, ...discussions]);
      setNewPost('');
    } catch (error) {
      console.error("Error posting comment:", error);
      setError("Failed to post comment");
    }
  };

  const handleReplySubmit = async (discussionId) => {
    if (!replyContent.trim()) return;

    const token = getAccessTokenFromCookie();
    if (!token) {
      console.error("No access token found in cookies");
      return;
    }

    try {
      const response = await axios.post(
        `${config.CURRENT_URL}/qlms/newReply`,
        {
          reply: replyContent,
          commentId: discussionId,
          courseId
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update discussions with new reply
      setDiscussions(prevDiscussions => 
        prevDiscussions.map(discussion => {
          if (discussion.id === discussionId) {
            return {
              ...discussion,
              commentReply: [...(discussion.commentReply || []), response.data.data]
            };
          }
          return discussion;
        })
      );
      
      setReplyContent('');
      setReplyingTo(null);
    } catch (error) {
      console.error("Error posting reply:", error);
      setError("Failed to post reply");
    }
  };

  const handleLikeComment = async (discussionId) => {
    const token = getAccessTokenFromCookie();
    if (!token) {
      console.error("No access token found in cookies");
      return;
    }

    try {
      const response = await axios.post(
        `${config.CURRENT_URL}/qlms/likeAComment`,
        { commentId: discussionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Toggle like status
      setLikedComments(prev => {
        const newSet = new Set(prev);
        if (newSet.has(discussionId)) {
          newSet.delete(discussionId);
        } else {
          newSet.add(discussionId);
        }
        return newSet;
      });

      // Update like count in discussions
      setDiscussions(prevDiscussions =>
        prevDiscussions.map(discussion => {
          if (discussion.id === discussionId) {
            const likeDelta = response.data.message === "Comment liked" ? 1 : -1;
            return {
              ...discussion,
              likes: (discussion.likes || 0) + likeDelta
            };
          }
          return discussion;
        })
      );
    } catch (error) {
      console.error("Error liking comment:", error);
      setError("Failed to like comment");
    }
  };

  return (
    <div className="space-y-6">
      {error && <div className="text-red-500">{error}</div>}
      
      {/* Create New Post */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <form onSubmit={handlePostSubmit} className="p-4">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Start a discussion..."
            className="w-full p-3 border dark:border-gray-700 rounded-lg 
                     bg-gray-50 dark:bg-gray-900 
                     text-gray-900 dark:text-white
                     placeholder-gray-500 dark:placeholder-gray-400
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#5624d0] text-white rounded-lg
                       hover:bg-[#4c1fb1] transition-colors duration-200"
            >
              Post Discussion
            </button>
          </div>
        </form>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader />
        </div>
      ) : (
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center gap-3 mb-3">
                {/* Discussion avatar with gradient */}
                <div 
                  className={`w-10 h-10 rounded-full ${getGradientColor(discussion.userName)} 
                             text-white flex items-center justify-center font-semibold text-lg
                             shadow-md transition-transform hover:scale-105`}
                >
                  {getInitialAvatar(discussion.userName)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {discussion.userName || 'Unknown User'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(discussion.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {discussion.comment}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-6 text-sm mb-4">
                <button 
                  onClick={() => handleLikeComment(discussion.id)}
                  className={`flex items-center gap-2 ${
                    likedComments.has(discussion.id)
                      ? 'text-blue-500 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                  }`}
                >
                  <FiThumbsUp className={likedComments.has(discussion.id) ? 'fill-current' : ''} />
                  <span>{discussion.likes || 0} Likes</span>
                </button>
                <button 
                  onClick={() => setReplyingTo(discussion.id)}
                  className="flex items-center gap-2 text-gray-500 dark:text-gray-400 
                           hover:text-blue-500 dark:hover:text-blue-400"
                >
                  <FiMessageSquare />
                  <span>{discussion.replies?.length || 0} Replies</span>
                </button>
              </div>

              {/* Replies Section */}
              <div className="ml-8 space-y-4">
                {discussion.commentReply?.map((reply) => (
                  <div key={reply.id} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex items-center gap-3 mb-2">
                      {/* Reply avatar with gradient */}
                      <div 
                        className={`w-8 h-8 rounded-full ${getGradientColor(reply.userName)} 
                                   text-white flex items-center justify-center font-semibold
                                   shadow-md transition-transform hover:scale-105`}
                      >
                        {getInitialAvatar(reply.userName)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {reply.userName || 'Unknown User'}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {reply.reply}
                    </p>
                  </div>
                ))}

                {/* Reply Form */}
                {replyingTo === discussion.id && (
                  <div className="mt-4">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full p-3 border dark:border-gray-700 rounded-lg 
                               bg-gray-50 dark:bg-gray-900 
                               text-gray-900 dark:text-white
                               placeholder-gray-500 dark:placeholder-gray-400
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="2"
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="px-3 py-1 text-gray-600 dark:text-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReplySubmit(discussion.id)}
                        className="px-3 py-1 bg-[#5624d0] text-white rounded-lg
                                 hover:bg-[#4c1fb1] transition-colors duration-200"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseCommunity;
