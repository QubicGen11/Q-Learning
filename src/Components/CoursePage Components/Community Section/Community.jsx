import React, { useState, useEffect } from 'react';
import { FaPaperclip, FaBold, FaListOl, FaList } from 'react-icons/fa';

const Community = () => {
  const [queryText, setQueryText] = useState('');
  const [queries, setQueries] = useState([]);
  const maxChars = 410;

  // Load queries from localStorage on component mount
  useEffect(() => {
    const savedQueries = localStorage.getItem('communityQueries');
    if (savedQueries) {
      setQueries(JSON.parse(savedQueries));
    }
  }, []);

  // Save queries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('communityQueries', JSON.stringify(queries));
  }, [queries]);

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setQueryText(text);
    }
  };

  const handlePostQuery = () => {
    if (queryText.trim()) {
      const newQuery = {
        id: Date.now(),
        text: queryText,
        author: "Jonas Schmedtmann", // You can make this dynamic later
        timestamp: new Date().toLocaleString(),
        likes: 0,
        replies: [],
        attachments: [] // For future attachment functionality
      };
      setQueries([newQuery, ...queries]);
      setQueryText('');
    }
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Question Input Section */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">What Are Some Common Mistakes To Avoid in UX Design?</h2>
          
          <div className="space-y-4">
            <textarea
              value={queryText}
              onChange={handleTextChange}
              className="w-full min-h-[100px] p-3 border rounded-lg resize-none"
              placeholder="Type your response here..."
            />
            
            
            {/* Formatting Tools */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded"><FaPaperclip /></button>
                <button className="p-2 hover:bg-gray-100 rounded"><FaBold /></button>
                <button className="p-2 hover:bg-gray-100 rounded"><FaListOl /></button>
                <button className="p-2 hover:bg-gray-100 rounded"><FaList /></button>
              </div>
              
              <button 
                onClick={handlePostQuery}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Post Query
              </button>
            </div>
          </div>
        </div>

        {/* Discussion Thread Section */}
        <div className="space-y-6">
          <h3 className="font-medium">Discussion Thread(s)</h3>
          
          {queries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No discussions yet. Be the first to start a conversation!
            </div>
          ) : (
            queries.map(query => (
              <div key={query.id} className="bg-white border rounded-lg p-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    {/* Add actual profile image here */}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{query.author}</h4>
                        <p className="text-sm text-gray-500">{query.timestamp}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="text-gray-600 hover:text-gray-800">Like</button>
                        <button className="text-blue-600 hover:text-blue-700">Reply</button>
                      </div>
                    </div>
                    <p className="mt-2">{query.text}</p>
                    
                    {/* Attachment Preview Section */}
                    {query.attachments && query.attachments.length > 0 && (
                      <div className="mt-4 flex gap-2">
                        {query.attachments.map((attachment, index) => (
                          <div key={index} className="w-24 h-24 bg-gray-100 rounded-lg">
                            {/* Add attachment preview here */}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;