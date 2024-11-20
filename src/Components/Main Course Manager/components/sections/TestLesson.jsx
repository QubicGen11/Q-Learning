import { useState, useCallback, useEffect } from 'react';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/snow.css';
import { FiPlus, FiSave, FiTrash2, FiEdit3, FiZap } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import Quill from 'quill';

const TestLesson = () => {
  // Add quillModules configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  // State Management
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState({
    id: null,
    title: '',
    description: '',
    content: '',
    duration: '',
    order: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // API Base URL
  const API_BASE_URL = 'http://localhost:8089/qlms';

  // Get token for API calls
  const getAuthHeader = () => ({
    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
    'Content-Type': 'application/json'
  });

  // AI Prompt Templates
  const AI_PROMPTS = {
    title: "Generate a clear and engaging title for a lesson about:",
    description: "Write a brief description for a lesson covering:",
    content: "Create detailed lesson content about:",
    outline: "Generate a structured outline for a lesson about:"
  };

  // Fetch existing lessons
  const fetchLessons = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getLessons`, {
        headers: getAuthHeader()
      });
      if (!response.ok) throw new Error('Failed to fetch lessons');
      const data = await response.json();
      setLessons(data);
    } catch (error) {
      toast.error('Error fetching lessons: ' + error.message);
    }
  }, []);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  // AI Generation Handler
  const generateWithAI = async (type, prompt) => {
    setAiLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/ai/generate`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({
          prompt: `${AI_PROMPTS[type]} ${prompt}`,
          type: type
        })
      });

      if (!response.ok) throw new Error('AI generation failed');
      
      const data = await response.json();
      
      setCurrentLesson(prev => ({
        ...prev,
        [type]: data.content
      }));

      toast.success(`Generated ${type} successfully!`);
    } catch (error) {
      toast.error('AI generation failed: ' + error.message);
    } finally {
      setAiLoading(false);
    }
  };

  // Save/Update Lesson
  const saveLessonToAPI = async (lessonData) => {
    try {
      setLoading(true);
      const endpoint = lessonData.id 
        ? `${API_BASE_URL}/updateLesson/${lessonData.id}`
        : `${API_BASE_URL}/createLesson`;
      
      const response = await fetch(endpoint, {
        method: lessonData.id ? 'PUT' : 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({
          lessonTitle: lessonData.title,
          lessonDescription: lessonData.description,
          lessonContent: lessonData.content,
          lessonDuration: `${lessonData.duration} minutes`,
          order: lessonData.order
        })
      });

      if (!response.ok) throw new Error('Failed to save lesson');
      
      const savedLesson = await response.json();
      toast.success(lessonData.id ? 'Lesson updated!' : 'Lesson created!');
      fetchLessons(); // Refresh lessons list
      return savedLesson;
    } catch (error) {
      toast.error('Error saving lesson: ' + error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Modified handleSaveLesson function
  const handleSaveLesson = async (e) => {
    e.preventDefault();
    
    if (!currentLesson.title.trim()) {
      toast.error('Title is required!');
      return;
    }

    try {
      setLoading(true);
      const token = Cookies.get('accessToken');
      
      // Prepare the lesson data according to your API structure
      const lessonData = {
        lessonTitle: currentLesson.title,
        lessonDuration: `${currentLesson.duration} minutes`,
        lessonContent: currentLesson.content,
        feedback: currentLesson.feedback || '',
        // Add any other required fields
      };

      const endpoint = `http://localhost:8089/qlms/${currentLesson.id ? 'updateLesson/' + currentLesson.id : 'createLesson'}`;
      
      const response = await fetch(endpoint, {
        method: currentLesson.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(lessonData)
      });

      if (!response.ok) {
        throw new Error('Failed to save lesson');
      }

      const savedLesson = await response.json();
      
      // Update lessons list
      setLessons(prev => {
        if (currentLesson.id) {
          return prev.map(lesson => 
            lesson.id === currentLesson.id ? savedLesson : lesson
          );
        }
        return [...prev, savedLesson];
      });

      toast.success(currentLesson.id ? 'Lesson updated!' : 'Lesson created!');
      resetForm();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Error saving lesson: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset form function
  const resetForm = () => {
    setCurrentLesson({
      id: null,
      title: '',
      content: '',
      duration: '',
      feedback: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lessons List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Lessons</h2>
            <button
              onClick={resetForm}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <FiPlus /> New Lesson
            </button>
          </div>
          
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{lesson.title}</h3>
                  <p className="text-sm text-gray-500">{lesson.duration} mins</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditLesson(lesson)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    <FiEdit3 />
                  </button>
                  <button
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lesson Form */}
        <form onSubmit={handleSaveLesson} className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">
            {isEditing ? 'Edit Lesson' : 'Create New Lesson'}
          </h2>
          
          <div className="space-y-6">
            {/* Title Input with AI */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <button
                  type="button"
                  onClick={() => generateWithAI('title', currentLesson.description)}
                  className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                  disabled={aiLoading}
                >
                  <FiZap /> Generate Title
                </button>
              </div>
              <input
                type="text"
                value={currentLesson.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter lesson title"
              />
            </div>

            {/* Description Input with AI */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <button
                  type="button"
                  onClick={() => generateWithAI('description', currentLesson.title)}
                  className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                  disabled={aiLoading}
                >
                  <FiZap /> Generate Description
                </button>
              </div>
              <textarea
                value={currentLesson.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-2 border rounded-md"
                rows="3"
                placeholder="Brief description of the lesson"
              />
            </div>

            {/* Content Editor with AI */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => generateWithAI('outline', `${currentLesson.title}. ${currentLesson.description}`)}
                    className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                    disabled={aiLoading}
                  >
                    <FiZap /> Generate Outline
                  </button>
                  <button
                    type="button"
                    onClick={() => generateWithAI('content', `${currentLesson.title}. ${currentLesson.description}`)}
                    className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                    disabled={aiLoading}
                  >
                    <FiZap /> Generate Content
                  </button>
                </div>
              </div>
              <div className="border rounded-md">
                <ReactQuill
                  value={currentLesson.content}
                  onChange={(content) => handleInputChange('content', content)}
                  modules={quillModules}
                  className="h-64"
                />
              </div>
            </div>

            {/* Duration Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={currentLesson.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="w-full p-2 border rounded-md"
                min="1"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
                disabled={loading || aiLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                disabled={loading || aiLoading}
              >
                <FiSave />
                {loading ? 'Saving...' : 'Save Lesson'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestLesson; 