import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import Quill from 'quill';
import { FiTrash2, FiEdit2, FiImage, FiClock, FiUser, FiCheck, FiX, FiPlus, FiEye, FiSave } from 'react-icons/fi';
import CourseContent from './CourseContent';

// Register modules
Quill.register('modules/imageResize', ImageResize);

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

// Enhanced Quill configuration
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize', 'Toolbar'],
    displayStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: 'white'
    },
    handleStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: 'white'
    },
    toolbarStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: 'white'
    }
  },
  clipboard: {
    matchVisual: false
  }
};

const quillFormats = [
  'font',
  'header',
  'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script',
  'align',
  'blockquote', 'code-block',
  'list', 'bullet',
  'indent',
  'link', 'image', 'video',
  'direction'
];

// Add custom styles
const customStyles = `
.ql-editor {
  min-height: 400px;
  font-size: 16px;
  line-height: 1.6;
  padding: 20px;
}

.ql-toolbar.ql-snow {
  border-radius: 8px 8px 0 0;
  border-color: #e2e8f0;
  padding: 8px;
  background: #f8fafc;
}

.ql-container.ql-snow {
  border-radius: 0 0 8px 8px;
  border-color: #e2e8f0;
}

.ql-editor img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1em auto;
}

.ql-editor .image-resizer {
  border: 2px solid #0ea5e9;
  position: absolute;
}

.ql-editor .image-resizer .resize-handle {
  width: 12px;
  height: 12px;
  background-color: #0ea5e9;
  border: 2px solid white;
  border-radius: 50%;
  position: absolute;
}

.ql-formats {
  margin-right: 15px !important;
}

.ql-toolbar button {
  height: 28px;
  width: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.ql-toolbar button:hover {
  background-color: #e2e8f0;
  border-radius: 4px;
}

.ql-editor img {
  cursor: pointer;
}

.ql-editor img.selected {
  border: 2px solid #5624D0;
}

.image-resize-handles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.image-resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: black;
  border: 1px solid white;
}

.image-resize-handle.se {
  bottom: -5px;
  right: -5px;
  cursor: se-resize;
}

.image-resize-handle.sw {
  bottom: -5px;
  left: -5px;
  cursor: sw-resize;
}

.image-resize-handle.ne {
  top: -5px;
  right: -5px;
  cursor: ne-resize;
}

.image-resize-handle.nw {
  top: -5px;
  left: -5px;
  cursor: nw-resize;
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = customStyles;
document.head.appendChild(styleSheet);

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
  const [activeLesson, setActiveLesson] = useState(null);
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
    originalPrice: '',
    discount: '',
    prerequisites: '',
    techStack: [],
    techStackData: [],
    courseImage: null,
    aboutCourse: {
      welcome: '',
      prerequisites: [],
      requirements: [],
      duration: '',
      learningOutcomes: []
    }
  });
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  // Add this state for editor content
  const [editorContent, setEditorContent] = useState('');

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

  // When adding a new custom technology
  const handleAddTechnology = (name, url) => {
    // Update form data
    setFormData({
      ...formData,
      techStack: [...(formData.techStack || []), name],
      techStackData: [...(formData.techStackData || []), { name, url }]
    });

    // Save custom tech logo to localStorage
    const customTechLogos = JSON.parse(localStorage.getItem('customTechLogos') || '{}');
    customTechLogos[name] = url;
    localStorage.setItem('customTechLogos', JSON.stringify(customTechLogos));
  };

  // Add this function to handle file uploads
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the URL input value to the base64 string
        document.getElementById('techUrlInput').value = reader.result;
        
        // Show preview
        const preview = document.getElementById('techPreview');
        preview.src = reader.result;
        preview.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    }
  };

  // Add preview button next to the submit button
  const previewButton = (
    <button
      type="button"
      onClick={() => setShowPreview(true)}
      className="w-full mt-4 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
    >
      <FiEye /> Preview Course
    </button>
  );

  const handlePreview = () => {
    // Create preview data from your form data
    const preview = {
      ...formData,
      id: 'preview',
      enrolledStudents: 0,
      bannerSettings: {
        opacity: 70,
        darkModeOpacity: 40,
        yPosition: 50
      },
      price: formData.price || 0,
      originalPrice: formData.originalPrice || 0,
      duration: formData.duration || '0 hours',
      courseImage: formData.courseImage || '',
      logo: formData.logo || '',
      curriculum: formData.curriculum || [],
      techStackData: formData.techStackData || [],
      learningObjectives: formData.learningObjectives || [],
      courseAudience: formData.courseAudience || '',
      productAlignment: formData.productAlignment || '',
      category: formData.category || 'Development',
      subcategory: formData.subcategory || '',
      difficultyLevel: formData.difficultyLevel || 'Beginner',
      language: formData.language || 'English'
    };

    setPreviewData(preview);
    setShowPreview(true);
  };

  // Update the handleLessonContentUpdate function
  const handleLessonContentUpdate = (lessonIndex, content) => {
    try {
      const newCurriculum = [...formData.curriculum];
      const images = Array.from(document.querySelectorAll('.ql-editor img'));
      
      newCurriculum[lessonIndex] = {
        ...newCurriculum[lessonIndex],
        content: content,
        layout: {
          version: 1,
          images: images.map(img => ({
            src: img.src,
            width: img.width,
            height: img.height,
            style: img.getAttribute('style') || '',
            class: img.getAttribute('class') || '',
          }))
        }
      };
      
      setFormData(prev => ({
        ...prev,
        curriculum: newCurriculum
      }));

      // Update editor content
      setEditorContent(content);
      
      // Save to localStorage
      const updatedCourses = [...courses];
      if (currentCourse) {
        const courseIndex = courses.findIndex(course => course.id === currentCourse.id);
        if (courseIndex !== -1) {
          updatedCourses[courseIndex] = {
            ...formData,
            curriculum: newCurriculum
          };
          localStorage.setItem('courses', JSON.stringify(updatedCourses));
          setCourses(updatedCourses);
        }
      }
    } catch (error) {
      console.error('Error updating lesson content:', error);
    }
  };

  // Add useEffect to handle lesson changes
  useEffect(() => {
    if (activeLesson !== null && formData.curriculum[activeLesson]) {
      setEditorContent(formData.curriculum[activeLesson].content || '');
    }
  }, [activeLesson, formData.curriculum]);

  // Add a function to restore layout when switching lessons
  const restoreLayout = (content, layout) => {
    if (!layout || !layout.images) return content;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    const images = tempDiv.querySelectorAll('img');
    layout.images.forEach((savedImg, index) => {
      if (images[index]) {
        images[index].width = savedImg.width;
        images[index].height = savedImg.height;
        if (savedImg.style) images[index].setAttribute('style', savedImg.style);
        if (savedImg.class) images[index].setAttribute('class', savedImg.class);
      }
    });
    
    return tempDiv.innerHTML;
  };

  // Add this function to handle the lesson update
  const handleUpdateLesson = async (lessonIndex) => {
    try {
      // Show loading state
      setIsLoading(true);
      
      // Get the current lesson data
      const lessonToUpdate = formData.curriculum[lessonIndex];
      
      // Show the lesson content in the editor
      setEditorContent(lessonToUpdate.content || '');
      
      // Show the lesson title and duration in the input fields
      setFormData(prev => ({
        ...prev,
        curriculum: prev.curriculum.map((lesson, index) => {
          if (index === lessonIndex) {
            return {
              ...lesson,
              title: lessonToUpdate.title || '',
              duration: lessonToUpdate.duration || ''
            };
          }
          return lesson;
        })
      }));
      
      // Hide the loading state
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating lesson:', error);
      // Hide the loading state
      setIsLoading(false);
    }
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
                  onClick={() => {
                    setActiveTab('basicInfo');
                    setActiveLesson(null); // Reset active lesson
                  }}
                />
              </div>
            </div>

            {/* Lessons Section */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Lessons</h3>
              <div className="space-y-4">
                {formData.curriculum.map((lesson, index) => (
                  <SidebarItem
                    key={lesson.id}
                    label={lesson.title || `Lesson ${index + 1}`}
                    isCompleted={lesson.isCompleted}
                    isActive={activeTab === 'curriculum' && activeLesson === index}
                    onClick={() => {
                      setActiveTab('curriculum');
                      setActiveLesson(index);
                    }}
                  />
                ))}
                <button
                  onClick={() => {
                    const newLesson = {
                      id: Date.now(),
                      title: `Lesson ${formData.curriculum.length + 1}`,
                      duration: '',
                      type: 'REQUIRED',
                      content: '',
                      isCompleted: false
                    };
                    setFormData({
                      ...formData,
                      curriculum: [...formData.curriculum, newLesson]
                    });
                    setActiveTab('curriculum');
                    setActiveLesson(formData.curriculum.length);
                  }}
                  className="flex items-center gap-2 text-[#5624D0] hover:text-[#4B1F9E] pl-8"
                >
                  <FiPlus /> Add Lesson
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
                    <label className="block text-sm font-medium mb-2">Price (₹)*</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      placeholder="Enter course price"
                      required
                    />
                  </div>

                  {/* Original Price (for discounts) */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Original Price (₹)</label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({...formData, originalPrice: Number(e.target.value)})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      placeholder="Enter original price"
                    />
                  </div>

                  {/* Discount Percentage */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Discount (%)</label>
                    <input
                      type="number"
                      value={formData.discount}
                      onChange={(e) => {
                        const discount = Math.min(100, Math.max(0, Number(e.target.value)));
                        setFormData({...formData, discount});
                      }}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      placeholder="Enter discount percentage"
                      min="0"
                      max="100"
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

                {/* Tech Logos Section - With Custom URL Input */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Technologies Used
                  </label>
                  
                  {/* Predefined Tech Stack */}
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
                    {Object.entries(techLogos).map(([name, url]) => (
                      <div
                        key={name}
                        onClick={() => {
                          const newTechStack = [...(formData.techStack || [])];
                          const newTechStackData = [...(formData.techStackData || [])];
                          const index = newTechStack.indexOf(name);
                          
                          if (index === -1) {
                            newTechStack.push(name);
                            newTechStackData.push({ name, url });
                          } else {
                            newTechStack.splice(index, 1);
                            newTechStackData.splice(index, 1);
                          }
                          
                          setFormData({
                            ...formData,
                            techStack: newTechStack,
                            techStackData: newTechStackData
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

                  {/* Custom Technology Input with Local Upload */}
                  <div className="mt-6 p-4 border rounded-lg">
                    <h4 className="font-medium mb-4">Add Custom Technology</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Technology Name</label>
                        <input
                          type="text"
                          id="techNameInput"
                          placeholder="Enter technology name"
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Technology Image</label>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <input
                                type="url"
                                id="techUrlInput"
                                placeholder="Enter image URL"
                                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                                onChange={(e) => {
                                  const preview = document.getElementById('techPreview');
                                  if (e.target.value) {
                                    preview.src = e.target.value;
                                    preview.classList.remove('hidden');
                                  } else {
                                    preview.classList.add('hidden');
                                  }
                                }}
                              />
                              <span className="text-gray-500">or</span>
                              <label className="cursor-pointer px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleFileUpload}
                                />
                                <span className="text-sm text-gray-700">Upload</span>
                              </label>
                            </div>
                            {/* Preview */}
                            <div className="mt-2 h-16 border rounded-lg overflow-hidden">
                              <img
                                id="techPreview"
                                src=""
                                alt="Preview"
                                className="w-full h-full object-contain hidden"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const nameInput = document.getElementById('techNameInput');
                              const urlInput = document.getElementById('techUrlInput');
                              
                              if (nameInput.value && urlInput.value) {
                                const name = nameInput.value.toLowerCase();
                                const url = urlInput.value;
                                
                                // Save to localStorage first
                                const customTechLogos = JSON.parse(localStorage.getItem('customTechLogos') || '{}');
                                customTechLogos[name] = url;
                                localStorage.setItem('customTechLogos', JSON.stringify(customTechLogos));
                                
                                // Then update form data
                                setFormData({
                                  ...formData,
                                  techStack: [...(formData.techStack || []), name],
                                  techStackData: [...(formData.techStackData || []), { name, url }]
                                });
                                
                                // Clear inputs and preview
                                nameInput.value = '';
                                urlInput.value = '';
                                const preview = document.getElementById('techPreview');
                                preview.src = '';
                                preview.classList.add('hidden');
                              }
                            }}
                            className="px-4 py-2 bg-[#5624D0] text-white rounded-lg hover:bg-[#4B1F9E] h-12"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add this script to handle preview */}
                  <script
                    dangerouslySetInnerHTML={{
                      __html: `
                        document.getElementById('techUrlInput').addEventListener('input', function(e) {
                          const preview = document.getElementById('techPreview');
                          if (e.target.value) {
                            preview.src = e.target.value;
                            preview.classList.remove('hidden');
                            preview.onerror = function() {
                              preview.classList.add('hidden');
                            };
                          } else {
                            preview.classList.add('hidden');
                          }
                        });
                      `
                    }}
                  />

                  {/* Selected Technologies Display */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {formData.techStackData?.map(({ name, url }) => (
                      <div
                        key={name}
                        className="flex items-center gap-2 px-3 py-1 bg-[#5624D0] text-white rounded-full"
                      >
                        <img 
                          src={url}
                          alt={name}
                          className="w-4 h-4"
                        />
                        <span className="text-sm capitalize">{name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              techStack: formData.techStack.filter(t => t !== name),
                              techStackData: formData.techStackData.filter(t => t.name !== name)
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

                {/* Course Image */}
                <div>
                  <label className="block text-sm font-medium mb-2">Course Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="course-image" className="relative cursor-pointer bg-white rounded-md font-medium text-[#5624D0] hover:text-[#4B1F9E]">
                          <span>Upload a file</span>
                          <input 
                            id="course-image" 
                            type="file" 
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setFormData({
                                    ...formData,
                                    courseImage: reader.result
                                  });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  {formData.courseImage && (
                    <div className="mt-4">
                      <img 
                        src={formData.courseImage} 
                        alt="Course preview" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* About This Course Section */}
                <div className="mt-8 border-t pt-8">
                  <h3 className="text-xl font-bold mb-4">About This Course</h3>
                  
                  {/* Welcome Message */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Welcome Message</label>
                    <textarea
                      value={formData.aboutCourse.welcome}
                      onChange={(e) => setFormData({
                        ...formData,
                        aboutCourse: {
                          ...formData.aboutCourse,
                          welcome: e.target.value
                        }
                      })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                      rows={4}
                      placeholder="Add a welcome message for your students"
                    />
                  </div>

                  {/* Prerequisites */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Prerequisites</label>
                    <div className="space-y-2">
                      {formData.aboutCourse.prerequisites.map((prereq, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={prereq}
                            onChange={(e) => {
                              const newPrereqs = [...formData.aboutCourse.prerequisites];
                              newPrereqs[index] = e.target.value;
                              setFormData({
                                ...formData,
                                aboutCourse: {
                                  ...formData.aboutCourse,
                                  prerequisites: newPrereqs
                                }
                              });
                            }}
                            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#5624D0]"
                            placeholder="Enter prerequisite"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newPrereqs = formData.aboutCourse.prerequisites.filter((_, i) => i !== index);
                              setFormData({
                                ...formData,
                                aboutCourse: {
                                  ...formData.aboutCourse,
                                  prerequisites: newPrereqs
                                }
                              });
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          aboutCourse: {
                            ...formData.aboutCourse,
                            prerequisites: [...formData.aboutCourse.prerequisites, '']
                          }
                        })}
                        className="text-[#5624D0] hover:text-[#4B1F9E] flex items-center gap-2"
                      >
                        <FiPlus /> Add Prerequisite
                      </button>
                    </div>
                  </div>

                  {/* Course Requirements */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Course Requirements</label>
                    <div className="space-y-2">
                      {/* Similar structure as prerequisites, but for requirements */}
                      {/* Add your requirements input fields here */}
                    </div>
                  </div>

                  {/* Learning Outcomes */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">What You'll Learn</label>
                    <div className="space-y-2">
                      {/* Similar structure as prerequisites, but for learning outcomes */}
                      {/* Add your learning outcomes input fields here */}
                    </div>
                  </div>
                </div>

                {/* Add Preview and Submit buttons together */}
                <div className="mt-6 space-y-4">
                  {/* Preview Button */}
                  <button
                    type="button"
                    onClick={handlePreview}
                    className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
                  >
                    <FiEye className="w-5 h-5" /> Preview Course
                  </button>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#5624D0] text-white py-3 rounded-lg hover:bg-[#4B1F9E]"
                  >
                    {currentCourse ? 'Update Course' : 'Create Course'}
                  </button>
                </div>
              </div>
            )}

            {/* Curriculum Tab - Show single lesson */}
            {activeTab === 'curriculum' && activeLesson !== null && (
              <div className="space-y-6">
                <div className="p-6 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-full">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Lesson Title</label>
                            <input
                              type="text"
                              value={formData.curriculum[activeLesson]?.title || ''}
                              onChange={(e) => handleLessonTitleChange(activeLesson, e.target.value)}
                              className="w-full border rounded px-3 py-2"
                              placeholder="Enter lesson title"
                            />
                          </div>
                          <div className="w-32">
                            <label className="block text-sm font-medium mb-1">Duration</label>
                            <input
                              type="text"
                              value={formData.curriculum[activeLesson]?.duration || ''}
                              onChange={(e) => handleLessonDurationChange(activeLesson, e.target.value)}
                              className="w-full border rounded px-3 py-2"
                              placeholder="20min"
                            />
                          </div>
                          <div className="flex items-end">
                            <button
                              onClick={() => handleUpdateLesson(activeLesson)}
                              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                              <FiSave className="w-4 h-4" />
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lesson-editor">
                    <ReactQuill
                      theme="snow"
                      value={editorContent}
                      onChange={(content) => {
                        setEditorContent(content);
                        handleLessonContentUpdate(activeLesson, content);
                      }}
                      modules={quillModules}
                      formats={[
                        'header',
                        'bold', 'italic', 'underline', 'strike',
                        'blockquote', 'code-block',
                        'list', 'bullet',
                        'script',
                        'indent',
                        'direction',
                        'size',
                        'color', 'background',
                        'font',
                        'align',
                        'link', 'image', 'video',
                        'clean',
                        'width', 'height', 'style'
                      ]}
                      className="lesson-quill-editor h-[500px]"
                      preserveWhitespace={true}
                    />
                  </div>
                </div>
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

      {/* Preview Modal */}
      {showPreview && previewData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen">
            <div className="relative bg-white dark:bg-gray-900 w-full min-h-screen">
              {/* Modal Header */}
              <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between">
                <h3 className="text-xl font-semibold">Course Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Course Content Preview */}
              <div className="overflow-y-auto">
                <CourseContent 
                  previewMode={true}
                  previewData={previewData}
                />
              </div>
            </div>
          </div>
        </div>
      )}
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