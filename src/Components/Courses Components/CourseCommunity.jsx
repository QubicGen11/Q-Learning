import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiThumbsUp } from 'react-icons/fi';
import axios from 'axios';
import Loader from '../Common/Loader';
import config from '../../config/apiConfig';
import { toast } from 'react-hot-toast';

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
  const [likedComments, setLikedComments] = useState(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem(`likedComments_${courseId}`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Save liked comments to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      `likedComments_${courseId}`,
      JSON.stringify([...likedComments])
    );
  }, [likedComments, courseId]);

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
      const commentsResponse = await axios.get(
        `${config.CURRENT_URL}/qlms/getAllCourseComments/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const commentsWithData = await Promise.all(commentsResponse.data.map(async (comment) => {
        try {
          const [likesResponse, repliesResponse] = await Promise.all([
            axios.get(
              `${config.CURRENT_URL}/qlms/getAllCommentLikes/${comment.id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            ),
            axios.get(
              `${config.CURRENT_URL}/qlms/getCommentReplies/${comment.id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            ).catch(() => ({ data: [] }))
          ]);

          return {
            ...comment,
            likes: likesResponse.data.numberOfLikes,
            replies: repliesResponse.data || [],
            commentReply: repliesResponse.data || []
          };
        } catch (error) {
          console.error(`Error fetching data for comment ${comment.id}:`, error);
          return {
            ...comment,
            likes: 0,
            replies: [],
            commentReply: []
          };
        }
      }));

      setDiscussions(commentsWithData);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments");
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
      // First make the API call to create reply with correct payload
      const response = await axios.post(
        `${config.CURRENT_URL}/qlms/newReply`,
        {
          reply: replyContent,
          commentId: discussionId,
          courseId: courseId,
          userId: getUserIdFromToken() // You'll need to implement this function
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Get fresh replies using correct endpoint
      const repliesResponse = await axios.get(
        `${config.CURRENT_URL}/qlms/getCommentReplies/${discussionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update state with fresh data
      setDiscussions(prevDiscussions =>
        prevDiscussions.map(discussion => {
          if (discussion.id === discussionId) {
            return {
              ...discussion,
              commentReply: repliesResponse.data || []
            };
          }
          return discussion;
        })
      );

      setReplyContent('');
      setReplyingTo(null);
      toast.success('Reply posted successfully');

    } catch (error) {
      console.error("Error posting reply:", error);
      toast.error("Failed to post reply");
    }
  };

  const handleLikeComment = async (discussionId) => {
    const token = getAccessTokenFromCookie();
    if (!token) {
      console.error("No access token found in cookies");
      return;
    }

    try {
      // 1. Post the like
      const likeResponse = await axios.post(
        `${config.CURRENT_URL}/qlms/likeAComment`,
        {
          commentId: discussionId
        },
        { 
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // 2. Get updated like count
      const updatedLikesResponse = await axios.get(
        `${config.CURRENT_URL}/qlms/getAllCommentLikes/${discussionId}`,
        { 
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // 3. Update the discussions state with new like count
      setDiscussions(prevDiscussions =>
        prevDiscussions.map(discussion => {
          if (discussion.id === discussionId) {
            return {
              ...discussion,
              likes: updatedLikesResponse.data.numberOfLikes
            };
          }
          return discussion;
        })
      );

      // Show success message
      toast.success(likeResponse.data.message);

    } catch (error) {
      console.error("Error liking comment:", error);
      toast.error("Failed to update like");
    }
  };

  // Initialize liked state from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem(`likedComments_${courseId}`);
    if (savedLikes) {
      const likedSet = new Set(JSON.parse(savedLikes));
      setDiscussions(prev => 
        prev.map(discussion => ({
          ...discussion,
          isLiked: likedSet.has(discussion.id)
        }))
      );
    }
  }, [courseId]);

  // Add this useEffect to fetch fresh data periodically or on focus
  useEffect(() => {
    fetchComments();

    // Refresh data when window gains focus
    const handleFocus = () => {
      fetchComments();
    };

    window.addEventListener('focus', handleFocus);

    // Optional: Periodic refresh
    const intervalId = setInterval(fetchComments, 30000); // Refresh every 30 seconds

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(intervalId);
    };
  }, [courseId]);

  // Add this utility function to get userId from token
  const getUserIdFromToken = () => {
    const token = getAccessTokenFromCookie();
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId; // Adjust this based on your token structure
    } catch (error) {
      console.error("Error extracting userId from token:", error);
      return null;
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
                  className="flex items-center gap-2 text-gray-500 dark:text-gray-400 
                           hover:text-blue-500 dark:hover:text-blue-400"
                >
                  <FiThumbsUp className={discussion.isLiked ? 'fill-current' : ''} />
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
