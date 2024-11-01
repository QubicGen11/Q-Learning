import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiClock, FiUser } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [showTechLogos, setShowTechLogos] = useState(false);
  const navigate = useNavigate();

  // Tech logos object for predefined images
  const techLogos = {
    html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    redux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    graphql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"
  };

  // Initialize formData with all required arrays
  const initialFormState = {
    id: Date.now(),
    title: '',
    description: '',
    duration: '',
    type: 'Frontend',
    logo: '',
    difficultyLevel: 'Intermediate',
    completionTime: '',
    language: 'English',
    productCovered: 'Studio',
    enrolledStudents: 0,
    diplomaAvailable: true,
    courseAudience: '',
    productAlignment: '',
    learningObjectives: [], // Initialize empty array
    curriculum: [
      {
        id: 1,
        title: 'Introduction to Version Control',
        duration: '45m',
        type: 'REQUIRED',
        isCompleted: false,
        content: `
          <div class="lesson-content">
            <h3>What is Version Control?</h3>
            <p>Version control is a system that records changes to a file or set of files over time.</p>
          </div>
        `
      }
    ]
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login');
      return;
    }
    
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCourses = currentCourse 
      ? courses.map(course => 
          course.id === currentCourse.id ? { ...formData, id: course.id } : course
        )
      : [...courses, { ...formData, id: Date.now() }];
    
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
    resetForm();
  };

  const handleDelete = (id) => {
    const updatedCourses = courses.filter(course => course.id !== id);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
  };

  const handleEdit = (course) => {
    setCurrentCourse(course);
    setFormData({
      ...course,
      learningObjectives: course.learningObjectives || [], // Ensure array exists
      curriculum: course.curriculum || [] // Ensure array exists
    });
  };

  const resetForm = () => {
    setCurrentCourse(null);
    setFormData(initialFormState);
  };

  // Add learning objective
  const addLearningObjective = () => {
    setFormData({
      ...formData,
      learningObjectives: [...(formData.learningObjectives || []), '']
    });
  };

  // Remove learning objective
  const removeLearningObjective = (index) => {
    const newObjectives = [...formData.learningObjectives];
    newObjectives.splice(index, 1);
    setFormData({
      ...formData,
      learningObjectives: newObjectives
    });
  };

  const selectTechLogo = (logoUrl) => {
    setFormData({ ...formData, logo: logoUrl });
    setShowTechLogos(false);
  };

  // Add a function to handle lesson completion
  const handleLessonComplete = (lessonId) => {
    const updatedCourses = courses.map(course => {
      if (course.id === formData.id) {
        const updatedCurriculum = course.curriculum.map(lesson => {
          if (lesson.id === lessonId) {
            return { ...lesson, isCompleted: true };
          }
          return lesson;
        });
        return { ...course, curriculum: updatedCurriculum };
      }
      return course;
    });
    
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
  };

  // Add Quill modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="max-w-[1600px] mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Course Manager</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            {JSON.parse(localStorage.getItem('user'))?.email}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Course Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block mb-2">Course Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Enter course title"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block mb-2">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="e.g., 2h 30m"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Enter course description"
              required
            />
          </div>

          {/* Course Type */}
          <div>
            <label className="block mb-2">Course Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Full Stack">Full Stack</option>
              <option value="DevOps">DevOps</option>
              <option value="Mobile">Mobile Development</option>
            </select>
          </div>

          {/* Enrolled Students */}
          <div>
            <label className="block mb-2">Initial Enrolled Students</label>
            <input
              type="number"
              value={formData.enrolledStudents}
              onChange={(e) => setFormData({...formData, enrolledStudents: parseInt(e.target.value)})}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>

          {/* Logo section (existing code) */}
          <div>
            <label className="block mb-2">Logo</label>
            <div className="space-y-2">
              <input
                type="url"
                value={formData.logo}
                onChange={(e) => setFormData({...formData, logo: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="Enter logo URL"
              />
              <button
                type="button"
                onClick={() => setShowTechLogos(!showTechLogos)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {showTechLogos ? 'Hide Tech Logos' : 'Choose from Tech Logos'}
              </button>
              
              {/* Tech Logos Grid */}
              {showTechLogos && (
                <div className="grid grid-cols-4 gap-4 mt-2 p-4 border rounded">
                  {Object.entries(techLogos).map(([key, url]) => (
                    <div
                      key={key}
                      onClick={() => selectTechLogo(url)}
                      className={`p-2 border rounded cursor-pointer hover:bg-gray-50 ${
                        formData.logo === url ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                    >
                      <img
                        src={url}
                        alt={key}
                        className="h-8 w-8 object-contain mx-auto"
                      />
                      <p className="text-xs text-center mt-1">{key}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Diploma Available */}
          <div>
            <label className="block mb-2">
              <input
                type="checkbox"
                checked={formData.diplomaAvailable}
                onChange={(e) => setFormData({...formData, diplomaAvailable: e.target.checked})}
                className="mr-2"
              />
              Diploma Available
            </label>
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block mb-2">Difficulty Level</label>
            <select
              value={formData.difficultyLevel}
              onChange={(e) => setFormData({...formData, difficultyLevel: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Completion Time */}
          <div>
            <label className="block mb-2">Completion Time</label>
            <input
              type="text"
              value={formData.completionTime}
              onChange={(e) => setFormData({...formData, completionTime: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="e.g., 4hr"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block mb-2">Language</label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({...formData, language: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>

          {/* Product Covered */}
          <div>
            <label className="block mb-2">Product Covered</label>
            <input
              type="text"
              value={formData.productCovered}
              onChange={(e) => setFormData({...formData, productCovered: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="e.g., Studio"
            />
          </div>

          {/* Course Audience */}
          <div className="md:col-span-2">
            <label className="block mb-2">Course Audience</label>
            <textarea
              value={formData.courseAudience}
              onChange={(e) => setFormData({...formData, courseAudience: e.target.value})}
              className="w-full p-2 border rounded"
              rows="2"
              placeholder="Describe the target audience for this course"
            />
          </div>

          {/* Product Alignment */}
          <div className="md:col-span-2">
            <label className="block mb-2">Product Alignment</label>
            <textarea
              value={formData.productAlignment}
              onChange={(e) => setFormData({...formData, productAlignment: e.target.value})}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Describe the product version alignment"
            />
          </div>

          {/* Learning Objectives */}
          <div className="mb-4">
            <label className="block mb-2">Learning Objectives</label>
            <div className="space-y-2">
              {formData.learningObjectives?.map((objective, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) => {
                      const newObjectives = [...formData.learningObjectives];
                      newObjectives[index] = e.target.value;
                      setFormData({...formData, learningObjectives: newObjectives});
                    }}
                    className="flex-1 p-2 border rounded"
                    placeholder="Enter learning objective"
                  />
                  <button
                    type="button"
                    onClick={() => removeLearningObjective(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addLearningObjective}
                className="text-blue-600 hover:text-blue-800"
              >
                + Add Learning Objective
              </button>
            </div>
          </div>

          {/* Curriculum Section */}
          <div className="md:col-span-2">
            <label className="block mb-2">Curriculum</label>
            <div className="space-y-4">
              {formData.curriculum.map((item, index) => (
                <div key={item.id} className="border rounded p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm">Lesson Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const newCurriculum = [...formData.curriculum];
                          newCurriculum[index].title = e.target.value;
                          setFormData({...formData, curriculum: newCurriculum});
                        }}
                        className="w-full p-2 border rounded"
                        placeholder="Enter lesson title"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">Lesson Duration</label>
                      <input
                        type="text"
                        value={item.duration}
                        onChange={(e) => {
                          const newCurriculum = [...formData.curriculum];
                          newCurriculum[index].duration = e.target.value;
                          setFormData({...formData, curriculum: newCurriculum});
                        }}
                        className="w-full p-2 border rounded"
                        placeholder="e.g., 30m"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">Lesson Type</label>
                      <select
                        value={item.type}
                        onChange={(e) => {
                          const newCurriculum = [...formData.curriculum];
                          newCurriculum[index].type = e.target.value;
                          setFormData({...formData, curriculum: newCurriculum});
                        }}
                        className="w-full p-2 border rounded"
                      >
                        <option value="REQUIRED">Required</option>
                        <option value="OPTIONAL">Optional</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">Content</label>
                      <ReactQuill
                        value={item.content}
                        onChange={(content) => {
                          const newCurriculum = [...formData.curriculum];
                          newCurriculum[index].content = content;
                          setFormData({...formData, curriculum: newCurriculum});
                        }}
                        modules={modules}
                        className="h-64 mb-12" // Added height and margin to accommodate toolbar
                      />
                    </div>
                  </div>

                  {/* Remove Lesson Button */}
                  {formData.curriculum.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newCurriculum = formData.curriculum.filter((_, i) => i !== index);
                        setFormData({...formData, curriculum: newCurriculum});
                      }}
                      className="mt-2 text-red-600 text-sm hover:text-red-800"
                    >
                      Remove Lesson
                    </button>
                  )}
                </div>
              ))}

              {/* Add Lesson Button */}
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    ...formData,
                    curriculum: [...formData.curriculum, {
                      id: Date.now(),
                      title: '',
                      duration: '',
                      type: 'REQUIRED',
                      content: '',
                      isCompleted: false
                    }]
                  });
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                + Add Lesson
              </button>
            </div>
          </div>
        </div>

        {/* Form Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {currentCourse ? 'Update Course' : 'Add Course'}
          </button>
          {currentCourse && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Course List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {/* Course Image/Logo - reduced height */}
            <div className="relative h-32 bg-gray-50">
              <img 
                src={course.logo || '/default-course-image.jpg'} 
                alt={course.title}
                className="w-full h-full object-contain p-2"
              />
              {/* Smaller action buttons */}
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={() => handleEdit(course)}
                  className="p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50"
                >
                  <FiEdit className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50"
                >
                  <FiTrash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>

            {/* Course Content - reduced padding */}
            <div className="p-4">
              <h3 className="text-base font-medium mb-1 text-gray-900 line-clamp-1">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {course.description}
              </p>
              
              {/* Course Meta Info - smaller text */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <FiClock className="w-3 h-3" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiUser className="w-3 h-3" />
                  <span>{course.enrolledStudents || 0} students</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManager; 