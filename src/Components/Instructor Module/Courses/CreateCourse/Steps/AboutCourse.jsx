import React, { useState } from 'react';
import useCourseStepsStore from '../../../../../stores/courseStepsStore';

function AboutCourse() {
  const { courseData, updateCourseData } = useCourseStepsStore();
  const { about } = courseData;

  const [whatYouGetText, setWhatYouGetText] = useState('');
  const [whatYouGetPoints, setWhatYouGetPoints] = useState([
    'Gain UX skills you can immediately apply to improve your projects and career',
    'Learn how to conduct effective and useful research',
    'Understand how to apply UX Strategy to set goals and define success'
  ]);

  const [whoCanEnrollPoints, setWhoCanEnrollPoints] = useState([
    'People who want to enter the UX field and become practitioners',
    'Professionals who want or need to add UX to their skill set'
  ]);

  const handleListFormat = (field) => {
    if (field === 'whatYouGet' && whatYouGetText) {
      setWhatYouGetPoints([...whatYouGetPoints, whatYouGetText]);
      setWhatYouGetText('');
    }
  };

  const handleKeyPress = (e, field) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (field === 'whatYouGet') {
        setWhatYouGetPoints([...whatYouGetPoints, e.target.value]);
        setWhatYouGetText('');
      }
    }
  };

  const removePoint = (index, field) => {
    if (field === 'whatYouGet') {
      const newPoints = whatYouGetPoints.filter((_, i) => i !== index);
      setWhatYouGetPoints(newPoints);
    }
  };

  return (
    <div className="space-y-6">
      {/* What will you get? */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          What will you get? *
        </label>
        <div className="relative border rounded-lg p-4">
          {/* Bullet Points List */}
          <div className="space-y-2 mb-2">
            {whatYouGetPoints.map((point, index) => (
              <div key={index} className="flex items-start group">
                <span className="text-gray-400 mr-2 mt-1">•</span>
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => {
                      const newPoints = [...whatYouGetPoints];
                      newPoints[index] = e.target.value;
                      setWhatYouGetPoints(newPoints);
                    }}
                    className="flex-1 border-none focus:outline-none p-0"
                  />
                  <button
                    onClick={() => removePoint(index, 'whatYouGet')}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                  >
                    <span className="material-icons text-sm">close</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* New Point Input */}
          <div className="flex items-start">
            <span className="text-gray-400 mr-2 mt-1">•</span>
            <input
              type="text"
              value={whatYouGetText}
              onChange={(e) => setWhatYouGetText(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'whatYouGet')}
              placeholder="Type and press Enter to add new point"
              className="flex-1 border-none focus:outline-none p-0"
            />
          </div>

          {/* Formatting Buttons */}
          <div className="absolute right-3 top-3 flex flex-col gap-1">
            <button className="p-1 hover:bg-gray-100 rounded">
              <span className="material-icons text-gray-400 text-xl">format_bold</span>
            </button>
            <button 
              onClick={() => handleListFormat('whatYouGet')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <span className="material-icons text-gray-400 text-xl">format_list_bulleted</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prerequisites */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Prerequisites *
        </label>
        <div className="relative">
          <input
            type="text"
            defaultValue="Basic familiarity with Adobe and Microsoft products will be helpful."
            className="w-full px-4 py-2.5 border rounded-lg pr-12"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded">
            <span className="material-icons text-gray-400 text-xl">format_list_bulleted</span>
          </button>
        </div>
      </div>

      {/* Who can enrol */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Who can enrol for this course? *
        </label>
        <div className="border rounded-lg p-4">
          {whoCanEnrollPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-2 mb-1">
              <span className="text-gray-400 mt-1">•</span>
              <div className="flex-1">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => {
                    const newPoints = [...whoCanEnrollPoints];
                    newPoints[index] = e.target.value;
                    setWhoCanEnrollPoints(newPoints);
                  }}
                  className="w-full border-none focus:outline-none p-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Most useful reviews */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Most useful reviews if any *
        </label>
        <select className="w-full px-4 py-2.5 border rounded-lg appearance-none bg-white">
          <option>Multi Select</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Description *
        </label>
        <div className="relative">
          <textarea
            defaultValue="User Experience, or UX, is an exciting field. It's essentially about empowering people to do the things they want to do, which is both fun and gratifying. And, having a great user experience drives business success."
            rows={4}
            className="w-full px-4 py-3 border rounded-lg pr-12 resize-none"
          />
          <div className="absolute right-3 top-3 flex flex-col gap-1">
            <button className="p-1 hover:bg-gray-100 rounded">
              <span className="material-icons text-gray-400 text-xl">format_bold</span>
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <span className="material-icons text-gray-400 text-xl">format_list_bulleted</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCourse; 