import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiThumbsUp } from 'react-icons/fi';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

// Utility function to retrieve access token from cookies
const getAccessTokenFromCookie = () => {
  const match = document.cookie.match(new RegExp('(^| )accessToken=([^;]+)'));
  return match ? match[2] : null;
};

// Utility function to decode the token and get user info
const getUserInfoFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      userId: decoded.userId,
      userName: decoded.userName,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const CourseCommunity = ({ courseId }) => {
  const [discussions, setDiscussions] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = getAccessTokenFromCookie();
    if (token) {
      const user = getUserInfoFromToken(token);
      setUserInfo(user);
    }
    fetchComments().catch(error => console.error("Error initializing comments:", error));
  }, []);

  const fetchComments = async () => {
    const token = getAccessTokenFromCookie();
    if (!token) {
      console.error("No access token found in cookies");
      return;
    }

    try {
      // First get all comments
      const commentsResponse = await axios.get(
        `http://localhost:8089/qlms/getAllCourseComments/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // For each comment, fetch its replies
      const commentsWithReplies = await Promise.all(
        commentsResponse.data.map(async (comment) => {
          try {
            const repliesResponse = await axios.get(
              `http://localhost:8089/qlms/getCommentReplies/${comment.id}`,  // Adjust this endpoint to match your API
              { headers: { Authorization: `Bearer ${token}` } }
            );
            return {
              ...comment,
              replies: repliesResponse.data || []
            };
          } catch (error) {
            console.error(`Error fetching replies for comment ${comment.id}:`, error);
            return { ...comment, replies: [] };
          }
        })
      );

      setDiscussions(commentsWithReplies);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to load comments");
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
        'http://localhost:8089/qlms/createComment',
        { comment: newPost, courseId },
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
        'http://localhost:8089/qlms/newReply',
        {
          reply: replyContent,
          userId: userInfo?.userId,
          courseId,
          commentId: discussionId,
          userName: userInfo?.userName
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newReply = {
        ...response.data.data,
        userName: userInfo?.userName
      };

      // Update local state immediately for instant feedback
      setDiscussions(prevDiscussions => 
        prevDiscussions.map(discussion => {
          if (discussion.id === discussionId) {
            return {
              ...discussion,
              replies: [...(discussion.replies || []), newReply]
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

      {/* Discussion List */}
      <div className="space-y-4">
        {discussions.map((discussion) => (
          <div 
            key={discussion.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={discussion.user?.avatar || 'default-avatar.png'}
                alt={userInfo?.userName || 'Unknown User'}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {userInfo?.userName || 'Unknown User'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {discussion.timestamp}
                </p>
              </div>
            </div>

            {/* Content */}
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {discussion.comment}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-6 text-sm mb-4">
              <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 
                               hover:text-blue-500 dark:hover:text-blue-400">
                <FiThumbsUp />
                <span>{discussion.likes} Likes</span>
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
              {discussion.replies?.map((reply) => (
                <div key={reply.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={reply.user?.avatar || 'default-avatar.png'}
                      alt={reply.userName || 'Unknown User'}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {reply.userName || userInfo?.userName || 'Unknown User'}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {reply.timestamp}
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
    </div>
  );
};

export default CourseCommunity;
