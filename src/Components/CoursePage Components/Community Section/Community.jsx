import React, { useState } from 'react';
import { FaPaperclip, FaBold, FaListOl, FaList } from 'react-icons/fa';

const Community = () => {
  const [queryText, setQueryText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [queries, setQueries] = useState([]);
  const maxChars = 410;

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setQueryText(text);
      setCharCount(text.length);
    }
  };

  const handlePostQuery = () => {
    if (queryText.trim()) {
      const newQuery = {
        id: Date.now(),
        text: queryText,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        replies: []
      };
      setQueries([newQuery, ...queries]);
      setQueryText('');
      setCharCount(0);
    }
  };

  return (
    <div className="w-full bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">What Are Some Common Mistakes To Avoid In UX Design?</h2>
            
            <div className="space-y-2">
              <textarea
                value={queryText}
                onChange={handleTextChange}
                placeholder="You don't need to think of anything unique or new to say with this question. It asks about 'common' mistakes, so just talk about the classics. Here's an example:
'One common mistake is to neglect or attempt to work against business needs. Sometimes UX designers have very different priorities than stakeholders, but it's important to realize that we need to work within the system rather than against it.'"
                className="w-full min-h-[150px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <FaPaperclip className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <FaBold className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <FaListOl className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <FaList className="text-gray-600" />
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {charCount}/{maxChars}
                  </span>
                  <button 
                    onClick={handlePostQuery}
                    className="bg-[#0056D2] text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Post Query
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {queries.map((query) => (
            <div key={query.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-800">{query.text}</p>
                  <p className="text-sm text-gray-500 mt-2">{query.timestamp}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-600">
                    <span>👍</span> {query.likes}
                  </button>
                  <button className="text-blue-600">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;