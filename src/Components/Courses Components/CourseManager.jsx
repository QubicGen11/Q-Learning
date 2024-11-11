import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FiTrash2, FiEdit2, FiImage, FiClock, FiUser, FiCheck, FiX, FiPlus } from 'react-icons/fi';

// Tech logos data with CDN links
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

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-600">
          <h2>Something went wrong.</h2>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const CourseManager = () => {
  const navigate = useNavigate();

  // Course Categories Data
  const courseCategories = [
    {
      title: "Development",
      subcategories: [
        "Web Development",
        "Mobile Development",
        "Programming Languages",
        "Game Development",
        "Database Design",
        "Software Testing",
        "Software Engineering",
        "Development Tools"
      ]
    },
    {
      title: "Business",
      subcategories: [
        "Entrepreneurship",
        "Communication",
        "Management",
        "Sales",
        "Strategy",
        "Operations",
        "Project Management",
        "Business Law"
      ]
    },
    {
      title: "IT & Software",
      subcategories: [
        "IT Certifications",
        "Network Security",
        "Hardware",
        "Operating Systems",
        "Cloud Computing",
        "Cybersecurity",
        "Data Storage",
        "DevOps"
      ]
    },
    {
      title: "Design",
      subcategories: [
        "Web Design",
        "Graphic Design",
        "Design Tools",
        "User Experience",
        "Game Design",
        "3D & Animation",
        "Fashion Design",
        "Architectural Design"
      ]
    },
    {
      title: "Marketing",
      subcategories: [
        "Digital Marketing",
        "Social Media Marketing",
        "Content Marketing",
        "SEO",
        "Branding",
        "Marketing Analytics",
        "Public Relations",
        "Advertising"
      ]
    }
  ];

  // State definitions
  const [activeTab, setActiveTab] = useState('basicInfo');
  const [activeLesson, setActiveLesson] = useState(0);
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [showTechLogos, setShowTechLogos] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
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
    learningObjectives: [],
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
    price: '',
    prerequisites: '',
    techStack: []
  });

  // Fetch courses on mount
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login');
      return;
    }
    
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCourses = [...courses];
      if (currentCourse) {
        // Update existing course
        const index = courses.findIndex(course => course.id === currentCourse.id);
        updatedCourses[index] = formData;
      } else {
        // Add new course
        updatedCourses.push(formData);
      }
      
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      setCourses(updatedCourses);
      
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      
      setFormData({
        ...formData,
        id: Date.now(),
        title: '',
        description: '',
        // ... reset other fields as needed
      });
      setCurrentCourse(null);
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  // Handle course deletion
  const handleDelete = (id) => {
    const updatedCourses = courses.filter(course => course.id !== id);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
  };

  // Handle course editing
  const handleEdit = (course) => {
    setCurrentCourse(course);
    setFormData(course);
    setActiveTab('basicInfo');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-black text-white h-14 flex items-center justify-between px-4 fixed w-full top-0 z-50">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/courses')}
            className="flex items-center"
          >
            <span className="mr-2">←</span>
            Back to courses
          </button>
          <span className="font-bold">{formData.title || 'New Course'}</span>
        </div>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="flex pt-14">
        {/* Left Sidebar */}
        <div className="w-64 bg-white h-[calc(100vh-56px)] fixed border-r border-gray-200">
          <div className="p-6 space-y-8">
            {/* Plan your course */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Plan your course</h3>
              <div className="space-y-4">
                <SidebarItem 
                  label="Basic Info" 
                  isActive={activeTab === 'basicInfo'}
                  onClick={() => setActiveTab('basicInfo')}
                />
                <SidebarItem 
                  label="Curriculum" 
                  isCompleted={formData.curriculum.length > 0}
                  isActive={activeTab === 'curriculum'}
                  onClick={() => setActiveTab('curriculum')}
                />
              </div>
            </div>

            {/* Create your content */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Create your content</h3>
              <div className="space-y-4">
                {formData.curriculum.map((lesson, index) => (
                  <SidebarItem
                    key={lesson.id}
                    label={lesson.title || `Lesson ${index + 1}`}
                    isCompleted={lesson.isCompleted}
                    isActive={activeLesson === index}
                    onClick={() => {
                      setActiveTab('curriculum');
                      setActiveLesson(index);
                    }}
                  />
                ))}
                <button
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
                    setActiveTab('curriculum');
                    setActiveLesson(formData.curriculum.length);
                  }}
                  className="flex items-center gap-2 text-[#5624D0] hover:text-[#4B1F9E] pl-8"
                >
                  <span>+</span> Add Lesson
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          {showSuccessMessage && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
              Course saved successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Basic Info Tab */}
            {activeTab === 'basicInfo' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Course Title*</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      placeholder="Enter course title"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Description*</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      rows={3}
                      placeholder="Course description"
                      required
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration*</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      placeholder="e.g., 8 weeks"
                      required
                    />
                  </div>

                  {/* Completion Time */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Completion Time</label>
                    <input
                      type="text"
                      value={formData.completionTime}
                      onChange={(e) => setFormData({...formData, completionTime: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      placeholder="e.g., 2-3 hours per week"
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Course Type*</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      required
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Full Stack">Full Stack</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Mobile">Mobile Development</option>
                    </select>
                  </div>

                  {/* Difficulty Level */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Difficulty Level*</label>
                    <select
                      value={formData.difficultyLevel}
                      onChange={(e) => setFormData({...formData, difficultyLevel: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      required
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Language*</label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({...formData, language: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      required
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                    </select>
                  </div>

                  {/* Product Covered */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Covered</label>
                    <input
                      type="text"
                      value={formData.productCovered}
                      onChange={(e) => setFormData({...formData, productCovered: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      placeholder="Enter product covered"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Category*</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      required
                    >
                      <option value="">Select Category</option>
                      {courseCategories.map(category => (
                        <option key={category.title} value={category.title}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subcategory - Only show if category is selected */}
                  {formData.category && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Subcategory</label>
                      <select
                        value={formData.subcategory}
                        onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      >
                        <option value="">Select Subcategory</option>
                        {courseCategories
                          .find(cat => cat.title === formData.category)
                          ?.subcategories.map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))}
                      </select>
                    </div>
                  )}

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Price*</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      placeholder="Enter price"
                      required
                    />
                  </div>

                  {/* Prerequisites */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Prerequisites</label>
                    <input
                      type="text"
                      value={formData.prerequisites}
                      onChange={(e) => setFormData({...formData, prerequisites: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      placeholder="Enter prerequisites"
                    />
                  </div>

                  {/* Course Audience */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Course Audience</label>
                    <input
                      type="text"
                      value={formData.courseAudience}
                      onChange={(e) => setFormData({...formData, courseAudience: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      placeholder="Who is this course for?"
                    />
                  </div>

                  {/* Diploma Available */}
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.diplomaAvailable}
                        onChange={(e) => setFormData({...formData, diplomaAvailable: e.target.checked})}
                        className="rounded border-gray-300 text-[#5624D0] focus:ring-[#5624D0]"
                      />
                      <span className="text-sm font-medium">Diploma Available</span>
                    </label>
                  </div>
                </div>

                {/* Learning Objectives */}
                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">Learning Objectives</label>
                  {formData.learningObjectives.map((objective, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => {
                          const newObjectives = [...formData.learningObjectives];
                          newObjectives[index] = e.target.value;
                          setFormData({...formData, learningObjectives: newObjectives});
                        }}
                        className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                        placeholder="Enter learning objective"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newObjectives = formData.learningObjectives.filter((_, i) => i !== index);
                          setFormData({...formData, learningObjectives: newObjectives});
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        learningObjectives: [...formData.learningObjectives, '']
                      });
                    }}
                    className="mt-2 text-[#5624D0] hover:text-[#4B1F9E] flex items-center gap-2"
                  >
                    <span>+</span> Add Learning Objective
                  </button>
                </div>

                {/* Tech Logos Section */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Technologies Used
                  </label>
                  
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
                    {Object.entries(techLogos).map(([name, url]) => (
                      <div
                        key={name}
                        onClick={() => {
                          const newTechStack = [...(formData.techStack || [])];
                          const index = newTechStack.indexOf(name);
                          
                          if (index === -1) {
                            newTechStack.push(name);
                          } else {
                            newTechStack.splice(index, 1);
                          }
                          
                          setFormData({
                            ...formData,
                            techStack: newTechStack
                          });
                        }}
                        className={`
                          p-4 rounded-lg cursor-pointer transition-all duration-200
                          ${formData.techStack?.includes(name) ? 'bg-[#5624D0]' : 'bg-white'}
                        `}
                      >
                        <img 
                          src={url}
                          alt={name}
                          className="w-full h-12 object-contain mb-2"
                        />
                        <p className={`text-center text-sm capitalize ${
                          formData.techStack?.includes(name) ? 'text-white' : 'text-gray-700'
                        }`}>
                          {name}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Selected Technologies */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {formData.techStack?.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-2 px-3 py-1 bg-[#5624D0] text-white rounded-full"
                      >
                        <img 
                          src={techLogos[tech]}
                          alt={tech}
                          className="w-4 h-4"
                        />
                        <span className="text-sm capitalize">{tech}</span>
                        <button
                          onClick={() => {
                            setFormData({
                              ...formData,
                              techStack: formData.techStack.filter(t => t !== tech)
                            });
                          }}
                          className="ml-1 hover:text-red-200"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-[#5624D0] text-white py-3 rounded-lg hover:bg-[#4B1F9E]"
                  >
                    {currentCourse ? 'Update Course' : 'Create Course'}
                  </button>
                </div>
              </div>
            )}

            {/* Curriculum Tab */}
            {activeTab === 'curriculum' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                {formData.curriculum.map((lesson, index) => (
                  <div 
                    key={lesson.id}
                    className={`p-6 border rounded-lg ${
                      activeLesson === index ? 'border-[#5624D0] shadow-sm' : ''
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Lesson Title</label>
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) => {
                            const newCurriculum = [...formData.curriculum];
                            newCurriculum[index].title = e.target.value;
                            setFormData({...formData, curriculum: newCurriculum});
                          }}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                          placeholder="Enter lesson title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Duration</label>
                        <input
                          type="text"
                          value={lesson.duration}
                          onChange={(e) => {
                            const newCurriculum = [...formData.curriculum];
                            newCurriculum[index].duration = e.target.value;
                            setFormData({...formData, curriculum: newCurriculum});
                          }}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                          placeholder="e.g., 45m"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Content</label>
                      <ReactQuill
                        value={lesson.content}
                        onChange={(content) => {
                          const newCurriculum = [...formData.curriculum];
                          newCurriculum[index].content = content;
                          setFormData({...formData, curriculum: newCurriculum});
                        }}
                        className="h-64 mb-12"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>

          {/* Display existing courses */}
          {activeTab === 'basicInfo' && courses.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Your Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                  <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Course card content */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(course)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// SidebarItem component
const SidebarItem = ({ label, isActive, isCompleted, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left pl-8 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-[#5624D0] text-white' 
          : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-2">
        {isCompleted && <span className="text-green-500">✓</span>}
        <span>{label}</span>
      </div>
    </button>
  );
};

// Wrap the export with ErrorBoundary
export default function CourseManagerWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <CourseManager />
    </ErrorBoundary>
  );
} 