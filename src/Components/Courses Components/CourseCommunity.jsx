import React, { useState } from 'react';
import { FiMessageSquare, FiThumbsUp, FiUser } from 'react-icons/fi';

const CourseCommunity = ({ courseId }) => {
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      },
      content: 'Has anyone completed the final project? I need some guidance.',
      likes: 5,
      replies: [
        {
          id: 1,
          user: {
            name: 'Jane Smith',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
          },
          content: 'I can help you with that!',
          timestamp: '1 hour ago',
        }
      ],
      timestamp: '2 hours ago',
    },
  ]);
  const [newPost, setNewPost] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const newDiscussion = {
      id: discussions.length + 1,
      user: {
        name: 'Current User', // Replace with actual user data
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
      },
      content: newPost,
      likes: 0,
      replies: [],
      timestamp: 'Just now',
    };

    setDiscussions([newDiscussion, ...discussions]);
    setNewPost('');
  };

  const handleReplySubmit = (discussionId) => {
    if (!replyContent.trim()) return;

    const newReply = {
      id: Date.now(),
      user: {
        name: 'Current User', // Replace with actual user data
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
      },
      content: replyContent,
      timestamp: 'Just now',
    };

    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          replies: [...(discussion.replies || []), newReply],
        };
      }
      return discussion;
    }));

    setReplyContent('');
    setReplyingTo(null);
  };

  return (
    <div className="space-y-6">
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
                src={discussion.user.avatar}
                alt={discussion.user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {discussion.user.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {discussion.timestamp}
                </p>
              </div>
            </div>

            {/* Content */}
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {discussion.content}
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
                      src={reply.user.avatar}
                      alt={reply.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {reply.user.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {reply.timestamp}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {reply.content}
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
