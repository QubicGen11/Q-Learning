import React, { useState } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';

function AboutCourse() {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const { about } = courseData;

  const [whatYouGetText, setWhatYouGetText] = useState('');
  const [prerequisiteText, setPrerequisiteText] = useState('');
  const [audienceText, setAudienceText] = useState('');

  const handleAddPoint = (field, text, setText) => {
    if (!text.trim()) return;

    let newText = text;
    
    // Handle bold text
    if (text.startsWith('B ') || text.startsWith('b ')) {
      newText = `**${text.substring(2)}**`;
    }
    
    // Handle list items
    if (text.startsWith('* ')) {
      newText = `• ${text.substring(2)}`;
    }

    updateCourseData('about', {
      ...about,
      [field]: [...(about[field] || []), newText]
    });
    setText('');
  };

  const handleRemovePoint = (field, index) => {
    const updatedPoints = about[field].filter((_, i) => i !== index);
    updateCourseData('about', {
      ...about,
      [field]: updatedPoints
    });
  };

  const handleKeyPress = (e, field, text, setText) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPoint(field, text, setText);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto space-y-3">
      {/* What will you get? */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          What will you get? *
        </label>
        <div className="relative border rounded-lg p-3">
          {/* Bullet Points List */}
          <div className="space-y-1.5 mb-1.5">
            {about.courseOutcome?.map((point, index) => (
              <div key={index} className="flex items-start group">
                <span className="text-gray-400 mr-2">•</span>
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={point}
                    className={`flex-1 border-none focus:outline-none p-0 text-sm h-7 ${
                      point.startsWith('**') ? 'font-bold' : ''
                    }`}
                    onChange={(e) => {
                      const updatedOutcomes = [...about.courseOutcome];
                      updatedOutcomes[index] = e.target.value;
                      updateCourseData('about', {
                        ...about,
                        courseOutcome: updatedOutcomes
                      });
                    }}
                  />
                  <button
                    onClick={() => handleRemovePoint('courseOutcome', index)}
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
            <span className="text-gray-400 mr-2">•</span>
            <input
              type="text"
              value={whatYouGetText}
              onChange={(e) => setWhatYouGetText(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'courseOutcome', whatYouGetText, setWhatYouGetText)}
              placeholder="Type 'B' for bold or '*' for list item"
              className="flex-1 border-none focus:outline-none p-0 text-sm h-7"
            />
          </div>

          {/* Formatting Buttons */}
          <div className="absolute right-2 top-2 flex flex-col gap-0.5">
            <button 
              onClick={() => handleAddPoint('courseOutcome', 'B ' + whatYouGetText, setWhatYouGetText)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <span className="material-icons text-gray-400 text-lg">format_bold</span>
            </button>
            <button 
              onClick={() => handleAddPoint('courseOutcome', '* ' + whatYouGetText, setWhatYouGetText)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <span className="material-icons text-gray-400 text-lg">format_list_bulleted</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prerequisites */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Prerequisites *
        </label>
        <div className="relative border rounded-lg p-3">
          <div className="space-y-1.5 mb-1.5">
            {about.prerequisites?.map((prereq, index) => (
              <div key={index} className="flex items-start group">
                <span className="text-gray-400 mr-2">•</span>
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={prereq}
                    className={`flex-1 border-none focus:outline-none p-0 text-sm h-7 ${
                      prereq.startsWith('**') ? 'font-bold' : ''
                    }`}
                    onChange={(e) => {
                      const updatedPrereqs = [...about.prerequisites];
                      updatedPrereqs[index] = e.target.value;
                      updateCourseData('about', {
                        ...about,
                        prerequisites: updatedPrereqs
                      });
                    }}
                  />
                  <button
                    onClick={() => handleRemovePoint('prerequisites', index)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                  >
                    <span className="material-icons text-sm">close</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start">
            <span className="text-gray-400 mr-2">•</span>
            <input
              type="text"
              value={prerequisiteText}
              onChange={(e) => setPrerequisiteText(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'prerequisites', prerequisiteText, setPrerequisiteText)}
              placeholder="Type 'B' for bold or '*' for list item"
              className="flex-1 border-none focus:outline-none p-0 text-sm h-7"
            />
          </div>
        </div>
      </div>

      {/* Who can enrol */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Who can enrol for this course? *
        </label>
        <div className="relative border rounded-lg p-3">
          <div className="space-y-1.5 mb-1.5">
            {about.targetAudience?.map((audience, index) => (
              <div key={index} className="flex items-start group">
                <span className="text-gray-400 mr-2">•</span>
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={audience}
                    className={`flex-1 border-none focus:outline-none p-0 text-sm h-7 ${
                      audience.startsWith('**') ? 'font-bold' : ''
                    }`}
                    onChange={(e) => {
                      const updatedAudience = [...about.targetAudience];
                      updatedAudience[index] = e.target.value;
                      updateCourseData('about', {
                        ...about,
                        targetAudience: updatedAudience
                      });
                    }}
                  />
                  <button
                    onClick={() => handleRemovePoint('targetAudience', index)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                  >
                    <span className="material-icons text-sm">close</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start">
            <span className="text-gray-400 mr-2">•</span>
            <input
              type="text"
              value={audienceText}
              onChange={(e) => setAudienceText(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'targetAudience', audienceText, setAudienceText)}
              placeholder="Type 'B' for bold or '*' for list item"
              className="flex-1 border-none focus:outline-none p-0 text-sm h-7"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Description *
        </label>
        <div className="relative">
          <textarea
            value={about.description}
            onChange={(e) => updateCourseData('about', { ...about, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-1.5 text-sm border rounded-lg pr-10 resize-none min-h-[60px]"
            placeholder="Enter course description..."
          />
          <div className="absolute right-2 top-2 flex flex-col gap-0.5">
            <button className="p-1 hover:bg-gray-100 rounded">
              <span className="material-icons text-gray-400 text-lg">format_bold</span>
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <span className="material-icons text-gray-400 text-lg">format_list_bulleted</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCourse;