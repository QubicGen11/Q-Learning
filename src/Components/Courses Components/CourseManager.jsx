import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiClock, FiUser, FiSearch, FiBook } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Navbar_main from '../Navbar Components/Navbar_main';

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

  // Add predefined categories
  const courseCategories = [
    {
      title: "Development",
      subcategories: [
        "Web Development",
        "Mobile Development",
        "Programming Languages",
        "Game Development",
        "Database Design"
      ]
    },
    {
      title: "Business",
      subcategories: [
        "Entrepreneurship",
        "Communication",
        "Management",
        "Sales",
        "Strategy"
      ]
    },
    {
      title: "IT & Software",
      subcategories: [
        "IT Certifications",
        "Network Security",
        "Hardware",
        "Operating Systems",
        "Cloud Computing"
      ]
    }
  ];

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
    ],
    category: '',
    subcategory: '',
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

  // Add these tabs at the top of the form
  const [activeTab, setActiveTab] = useState('basicInfo');

  // Add these states for filtering and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Add this filter function
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || course.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Course List Section
  return (
    <div className="max-w-[1600px] mx-auto p-6">
        <Navbar_main />
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
      <div className="mb-8">
        {/* Form Tabs */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab('basicInfo')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'basicInfo'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Basic Information
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'curriculum'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Curriculum
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'details'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Additional Details
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          {activeTab === 'basicInfo' && (
            <div className="space-y-6">
              {/* Basic Information Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title & Duration */}
                <div>
                  <label className="block text-sm font-medium mb-2">Course Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter course title"
                    required
                  />
                </div>
                
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({
                      ...formData, 
                      category: e.target.value,
                      subcategory: ''
                    })}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Category</option>
                    {courseCategories.map((cat) => (
                      <option key={cat.title} value={cat.title}>{cat.title}</option>
                    ))}
                  </select>
                </div>

                {/* Subcategory - Only shows when category is selected */}
                {formData.category && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Subcategory</label>
                    <select
                      value={formData.subcategory}
                      onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select Subcategory</option>
                      {courseCategories
                        .find(cat => cat.title === formData.category)
                        ?.subcategories.map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                    </select>
                  </div>
                )}

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500"
                    rows="4"
                    placeholder="Enter course description"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              {/* Curriculum Section */}
              <div className="border rounded-lg p-4">
                {formData.curriculum.map((item, index) => (
                  <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-50">
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
                  className="flex items-center gap-2 text-orange-500 hover:text-orange-600"
                >
                  <span className="text-xl">+</span> Add New Lesson
                </button>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Additional Details Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="mt-8 flex justify-end gap-4">
            {currentCourse && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              {currentCourse ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>

      {/* Course List */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Courses ({courses.length})
          </h2>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 
                       transition-colors duration-200 flex items-center gap-2"
          >
            <span className="text-xl">+</span> Create New Course
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 
                           focus:ring-orange-500 focus:border-orange-500"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            {/* Category Filter */}
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full p-2.5 border rounded-lg focus:ring-2 
                         focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">All Categories</option>
              {courseCategories.map(cat => (
                <option key={cat.title} value={cat.title}>{cat.title}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2.5 border rounded-lg focus:ring-2 
                         focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="students">Most Students</option>
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} 
                 className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 
                            transform hover:-translate-y-1">
              {/* Course Image/Logo */}
              <div className="relative h-40 bg-gray-50 rounded-t-lg overflow-hidden">
                <img 
                  src={course.logo || '/default-course-image.jpg'} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="p-2 bg-white/90 rounded-full shadow hover:bg-white 
                               transition-colors duration-200"
                  >
                    <FiEdit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="p-2 bg-white/90 rounded-full shadow hover:bg-white 
                               transition-colors duration-200"
                  >
                    <FiTrash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-4">
                {/* Category Badge */}
                {course.category && (
                  <span className="inline-block px-2.5 py-1 mb-2 text-xs font-medium 
                                  bg-orange-100 text-orange-800 rounded-full">
                    {course.category}
                    {course.subcategory && ` • ${course.subcategory}`}
                  </span>
                )}

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 text-gray-900 line-clamp-1">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      {course.duration || 'N/A'}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiUser className="w-4 h-4" />
                      {course.enrolledStudents || 0}
                    </span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    course.difficultyLevel === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.difficultyLevel === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.difficultyLevel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FiBook className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManager; 