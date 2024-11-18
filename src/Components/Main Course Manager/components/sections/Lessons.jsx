import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FiPlus, FiVideo, FiFile, FiLink, FiTarget, FiList } from 'react-icons/fi';
import useCourseStore from '../../../../store/courseStore';

const Lessons = () => {
  const { lessons, addLesson, updateLesson, deleteLesson } = useCourseStore();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('content'); // 'content', 'objectives', 'prerequisites'

  const handleAddLesson = () => {
    const newLesson = {
      id: Date.now(),
      title: 'New Lesson',
      content: '',
      resources: [],
      videoUrl: '',
      duration: '0:00',
      isPublished: false,
      objectives: [''],
      prerequisites: ['']
    };

    addLesson(newLesson);
  };

  const renderTabContent = () => {
    if (!selectedLesson) return null;

    switch (activeTab) {
      case 'content':
        return (
          <div className="space-y-6">
            {/* Lesson Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Title
              </label>
              <input
                type="text"
                value={selectedLesson.title}
                onChange={(e) => updateLesson(selectedLesson.id, { title: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={selectedLesson.videoUrl}
                  onChange={(e) => updateLesson(selectedLesson.id, { videoUrl: e.target.value })}
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="Enter video URL"
                />
                <button className="p-2 border rounded-lg hover:bg-gray-50">
                  <FiVideo className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lesson Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Content
              </label>
              <ReactQuill
                value={selectedLesson.content}
                onChange={(content) => updateLesson(selectedLesson.id, { content: content })}
                className="h-64"
              />
            </div>

            {/* Resources */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resources
              </label>
              <div className="space-y-2">
                {selectedLesson.resources.map((resource, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={resource.title}
                      onChange={(e) => {
                        const newResources = [...selectedLesson.resources];
                        newResources[index].title = e.target.value;
                        updateLesson(selectedLesson.id, { resources: newResources });
                      }}
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <button className="p-2 border rounded-lg hover:bg-gray-50">
                      <FiLink className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newResources = [
                      ...selectedLesson.resources,
                      { title: '', url: '' }
                    ];
                    updateLesson(selectedLesson.id, { resources: newResources });
                  }}
                  className="text-purple-600 hover:text-purple-700"
                >
                  + Add Resource
                </button>
              </div>
            </div>
          </div>
        );

      case 'objectives':
        return (
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <FiTarget /> Learning Objectives
            </h3>
            <div className="space-y-2">
              {selectedLesson.objectives.map((objective, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) => {
                      const newObjectives = [...selectedLesson.objectives];
                      newObjectives[index] = e.target.value;
                      updateLesson(selectedLesson.id, { objectives: newObjectives });
                    }}
                    className="flex-1 p-2 border rounded"
                    placeholder="Enter learning objective"
                  />
                  <button
                    onClick={() => {
                      const newObjectives = selectedLesson.objectives.filter((_, i) => i !== index);
                      updateLesson(selectedLesson.id, { objectives: newObjectives });
                    }}
                    className="text-red-500 px-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newObjectives = [...selectedLesson.objectives, ''];
                  updateLesson(selectedLesson.id, { objectives: newObjectives });
                }}
                className="text-purple-600 hover:text-purple-700"
              >
                + Add Learning Objective
              </button>
            </div>
          </div>
        );

      case 'prerequisites':
        return (
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <FiList /> Prerequisites
            </h3>
            <div className="space-y-2">
              {selectedLesson.prerequisites.map((prerequisite, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={prerequisite}
                    onChange={(e) => {
                      const newPrerequisites = [...selectedLesson.prerequisites];
                      newPrerequisites[index] = e.target.value;
                      updateLesson(selectedLesson.id, { prerequisites: newPrerequisites });
                    }}
                    className="flex-1 p-2 border rounded"
                    placeholder="Enter prerequisite"
                  />
                  <button
                    onClick={() => {
                      const newPrerequisites = selectedLesson.prerequisites.filter((_, i) => i !== index);
                      updateLesson(selectedLesson.id, { prerequisites: newPrerequisites });
                    }}
                    className="text-red-500 px-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newPrerequisites = [...selectedLesson.prerequisites, ''];
                  updateLesson(selectedLesson.id, { prerequisites: newPrerequisites });
                }}
                className="text-purple-600 hover:text-purple-700"
              >
                + Add Prerequisite
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full">
      {/* Lessons Sidebar */}
      <div className="w-1/3 border-r pr-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Lessons</h3>
          <button
            onClick={handleAddLesson}
            className="text-purple-600 hover:text-purple-700"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          {lessons.map(lesson => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className={`w-full text-left p-3 rounded-lg ${
                selectedLesson?.id === lesson.id
                  ? 'bg-purple-50 text-purple-700'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{lesson.title}</span>
                <span className="text-sm text-gray-500">{lesson.duration}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Editor */}
      {selectedLesson && (
        <div className="flex-1 pl-6">
          {/* Tabs */}
          <div className="mb-6 border-b">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('content')}
                className={`py-2 px-4 border-b-2 ${
                  activeTab === 'content'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                Content
              </button>
              <button
                onClick={() => setActiveTab('objectives')}
                className={`py-2 px-4 border-b-2 ${
                  activeTab === 'objectives'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                Objectives
              </button>
              <button
                onClick={() => setActiveTab('prerequisites')}
                className={`py-2 px-4 border-b-2 ${
                  activeTab === 'prerequisites'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                Prerequisites
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      )}
    </div>
  );
};

export default Lessons; 