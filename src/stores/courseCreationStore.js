import { create } from 'zustand';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from 'axios';
import { displayToast } from '../Components/Common/Toast/Toast';

// Helper function to load from localStorage
const loadFromCourseLocalStorage = () => {
  try {
    const savedData = localStorage.getItem('courseCreationData');
    return savedData ? JSON.parse(savedData) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

// Get initial data
const initialData = {
  trainerId: "2251f63d-33df-44a8-88a5-8a9252583e1a",
  trainerName: "Shaik Sajid Hussain",
  courseName: "",
  courseTagline: "",
  courseDuration: "",
  difficultyLevel: "",
  category: "", 
  subCategory: "",
  categoryImage: null,
  teachingLanguage: "",
  courseBanner: null,
  courseImage: null,
  courseOutCome: "",
  courseDescription: "",
  isDraft: true,
  isFeatured: false,
  status: "DRAFT",
  version: "1.0",
  
  glossary: [
    { 
      acronym: "",
      meaning: "" 
    }
  ],
  
  references: [
    { 
      reference: "",
      link: "" 
    }
  ],
  
  coursePreRequisites: [
    { 
      preRequisiteRequired: "",
      preRequisiteLevel: "" 
    }
  ],
  
  courseAudience: [],
  
  courseChapters: [
    {
      chapterName: "",
      chapterLessons: [
        {
          lessonTitle: "",
          lessonType: "", // "Video", "Content", "Quiz", "PDF"
          lessonContent: "",
          lessonVideo: "",
          materials: [
            {
              materialTitle: "",
              materialLink: ""
            }
          ],
          questions: [
            {
              question: "",
              questionType: "MCQ",
              correctAnswer: null,
              options: [
                { 
                  option: "",
                  isCorrect: false 
                }
              ]
            },
            {
              question: "",
              questionType: "True/False",
              correctAnswer: null,
              options: [
                { 
                  option: "True",
                  isCorrect: true 
                },
                { 
                  option: "False",
                  isCorrect: false 
                }
              ]
            },
            {
              question: "",
              questionType: "Free Text",
              correctAnswer: null
            },
            {
              question: "",
              questionType: "CBA",
              correctAnswer: [],
              options: [
                { 
                  option: "",
                  isCorrect: false 
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  
  courseSettings: {
    courseType: "",
    percentageRequired: 80,
    pricingType: "",
    promotionType: "Discount",
    publicAccess: false,
    enablePreview: false,
    price: 0,
    discount: 0,
    offeredPrice: 0,
    startDate: null,
    endDate: null,
    maxStudents: 100,
    certificateEligibility: false,
    accessDuration: "",
    lifeTimeAccess: false,
    notifyStudentsOnUpdate: false,
    notifyStudentsOnAssignment: false,
    returnPeriod: "",
    refundsAllowed: false,
    allowContentDownloads: false,
    allowDiscussionParticipation: false,
    scheduleLiveClasses: false,
    enableSubtitles: false,
    seoTitle: "",
    seoDescription: "",
    seoKeywords: [],
    hashTags: []
  },
  
  courseFaqs: [
    {
      question: '',
      answer: ''
    }
  ],
  
  comments: [
    {
      userId: "2251f63d-33df-44a8-88a5-8a9252583e1a",
      role: "INSTRUCTOR",
      text: "This is a great course to get started with advanced R programming."
    }
  ]
};

// Add these validation functions to your store


const validateAboutCourse = (about) => {
  const errors = {};
  const outcomes = about?.courseOutcome?.split('\n').filter(Boolean) || [];
  if (!about?.courseOutcome || outcomes.length < 3) {
    errors.courseOutcome = 'At least 3 course outcomes are required';
  }
  // ... rest of your about validations
  return errors;
};

const validateContent = (content) => {
  const errors = {};
  
  if (!content?.chapters || content.chapters.length === 0) {
    errors.chapters = 'At least one chapter is required';
    displayToast('error', 'Please add at least one chapter');
    return errors;
  }

  const hasLesson = content.chapters.some(chapter => 
    chapter.lessons && 
    chapter.lessons.length > 0 && 
    chapter.lessons.some(lesson => lesson.lessonTitle?.trim())
  );

  if (!hasLesson) {
    errors.lessons = 'At least one lesson is required';
    displayToast('error', 'Please add at least one lesson');
  }

  return errors;
};

// Add these validation functions
const validateGlossaryAndReferences = (data) => {
  const errors = {};
  
  // Glossary validation
  const validGlossary = data?.glossary?.filter(item => 
    item.acronym?.trim() && item.meaning?.trim()
  );
  if (!validGlossary || validGlossary.length < 1) {
    errors.glossary = 'At least one glossary item is required';
    displayToast('error', 'Please add at least one glossary item with both acronym and meaning');
  }

  // References validation
  const validReferences = data?.references?.filter(item => 
    item.reference?.trim() && item.link?.trim()
  );
  if (!validReferences || validReferences.length < 1) {
    errors.references = 'At least one reference is required';
    displayToast('error', 'Please add at least one reference with both title and link');
  }

  return errors;
};

// Add FAQ validation function
const validateFAQ = (data) => {
  const errors = {};
  
  // FAQ validation
  const validFAQs = data?.faq?.filter(item => 
    item.question?.trim() && item.answer?.trim()
  );
  if (!validFAQs || validFAQs.length < 1) {
    errors.faq = 'At least one FAQ with both question and answer is required';
    displayToast('error', 'Please add at least one FAQ with both question and answer');
  }

  return errors;
};






const useCourseCreationStore = create((set, get) => ({
  currentStep: 1,
  steps: [
    { id: 1, title: 'Basic Information', path: 'basic-info' },
    { id: 2, title: 'Media', path: 'media' },
    { id: 3, title: 'About', path: 'about' },
    { id: 4, title: 'Content', path: 'content' },
    { id: 5, title: 'FAQ', path: 'faq' },
    { id: 6, title: 'Settings', path: 'settings' }
  ],
  
  courseData: loadFromCourseLocalStorage() || {
    basicInfo: {
      courseName: '',
      
      courseTagline: '',
      courseDuration: '',
      difficultyLevel: '',
      category: '',
      subCategory: '',
      teachingLanguage: '',
      hashtags: [],
      courseType: '',
      percentageRequired: '',
    },
    media: {
      courseBanner: null,
      courseImage: null,
      categoryImage: null
    },
    about: {
      courseOutcome: '',
      courseDescription: '',
      coursePreRequisites: [],
      courseAudience: []
    },
    content: { 
      chapters: []
    },
    courseFaqs: [],
    settings: {
      courseVisibility: { public: false, enablePreview: false },
      courseAccess: { duration: '', lifetimeAccess: false },
      pricing: { originalPrice: '', discountedPrice: '', startDate: null, endDate: null },
      enrollment: {
        maxStudents: '',
        certificateEligibility: false,
        notifications: { notifyUpdates: false, notifyAssignments: false }
      }
    },
    courseSettings: [{
      pricingType: '',
      promotionType: '',
      publicAccess: false,
      enablePreview: false,
    }],
    glossary: [
      {
        acronym: '',
        meaning: ''
      }
    ],
    references: [
      {
        reference: '',
        link: ''
      }
    ]
  },

  categories: [],
  subCategories: [],

  courseTypes: [],

  validationErrors: {},
  setValidationErrors: (errors) => set({ validationErrors: errors }),

  setStep: (step) => {
    set({ currentStep: step });
  },

  updateCourseData: (section, data) => {
    set(state => {
      let newCourseData;
      
      if (section === 'courseSettings') {
        console.log('Updating courseSettings with:', data);
        console.log('Previous courseSettings:', state.courseData.courseSettings);
        newCourseData = {
          ...state.courseData,
          courseSettings: data
        };
        console.log('New courseSettings after update:', newCourseData.courseSettings);
      } else {
        // Special handling for different sections
        if (section === 'content') {
          newCourseData = {
            ...state.courseData,
            [section]: {
              chapters: data.chapters.map(chapter => ({
                chapterName: chapter.chapterName,
                isNew: chapter.isNew,
                lessons: chapter.lessons.map(lesson => ({
                  lessonTitle: lesson.lessonTitle,
                  lessonType: lesson.lessonType,
                  lessonContent: lesson.lessonContent,
                  isNew: lesson.isNew,
                  showDropdown: lesson.showDropdown,
                  questions: lesson.questions || [],
                  lessonVideo: lesson.lessonVideo || '',
                  materials: lesson.materials || [],
                  lessonMaterials: lesson.lessonMaterials || ''
                }))
              }))
            }
          };
        } 
        // Add FAQ to special handling sections
        else if (section === 'glossary' || section === 'references' || section === 'faq') {
          newCourseData = {
            ...state.courseData,
            [section]: data // Directly set the array for these sections
          };
        }
        else {
          newCourseData = {
            ...state.courseData,
            [section]: {
              ...state.courseData[section],
              ...data
            }
          };
        }
      }
      
      // Log localStorage save
      console.log('Saving to localStorage:', newCourseData);
      try {
        localStorage.setItem('courseCreationData', JSON.stringify(newCourseData));
        console.log('Successfully saved to localStorage');
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      
      return {
        ...state,
        courseData: newCourseData
      };
    });
  },

  updateChapters: (chapters) => {
    set((state) => ({
      courseData: {
        ...state.courseData,
        content: {
          ...state.courseData.content,
          chapters: chapters
        }
      }
    }));
  },

  // Function to handle next button click and API calls
  handleNext: () => {
    const { currentStep, currentTab, validateBasicInfo, validateMedia } = get();
    
    // Validate based on current step and tab
    if (currentTab === 'info') {
      if (currentStep === 1) {
        // Basic Info validation
        if (!validateBasicInfo()) {
          return false;
        }
      } 
      else if (currentStep === 2) {
        // Media validation
        if (!validateMedia()) {
          return false;
        }
      }
    }

    // If validation passes, proceed to next step
    const { steps } = get();
    if (currentStep < steps.length) {
      set({ currentStep: currentStep + 1 });
      return true;
    }
    return false;
  },

  submitCourse: async () => {
    const { courseData } = get();
    
    try {
      // Get the latest data from localStorage
      const latestData = JSON.parse(localStorage.getItem('courseCreationData') || '{}');
      
      const settings = courseData.courseSettings?.[0];
      
      // Format course settings as a direct object, not an array
      const courseSettings = {
        courseType: settings.courseType,
        percentageRequired: parseInt(settings.percentageRequired),
        pricingType: settings.pricingType,
        promotionType: settings.promotionType,
        publicAccess: Boolean(settings.publicAccess),
        enablePreview: Boolean(settings.enablePreview),
        price: parseFloat(settings.price),
        discount: parseFloat(settings.discount),
        offeredPrice: parseFloat(settings.offeredPrice),
        // Format dates to ISO-8601 with time component
        startDate: settings.startDate ? new Date(settings.startDate).toISOString() : null,
        endDate: settings.endDate ? new Date(settings.endDate).toISOString() : null,
        maxStudents: parseInt(settings.maxStudents),
        certificateEligibility: Boolean(settings.certificateEligibility),
        accessDuration: settings.accessDuration,
        lifeTimeAccess: Boolean(settings.lifeTimeAccess),
        notifyStudentsOnUpdate: Boolean(settings.notifyStudentsOnUpdate),
        notifyStudentsOnAssignment: Boolean(settings.notifyStudentsOnAssignment),
        returnPeriod: settings.returnPeriod,
        refundsAllowed: Boolean(settings.refundsAllowed),
        allowContentDownloads: Boolean(settings.allowContentDownloads),
        allowDiscussionParticipation: Boolean(settings.allowDiscussionParticipation),
        scheduleLiveClasses: Boolean(settings.scheduleLiveClasses),
        enableSubtitles: Boolean(settings.enableSubtitles),
        seoTitle: settings.seoTitle,
        seoDescription: settings.seoDescription,
        seoKeywords: settings.seoKeywords ? [settings.seoKeywords] : [],
        hashTags: settings.hashtags ? 
          settings.hashtags.split(',')
            .map(tag => tag.trim())
            .filter(Boolean) : 
          []
      };

      const formattedData = {
        trainerId: courseData.trainerId,
        trainerName: courseData.trainerName,
        courseName: courseData.basicInfo?.courseName,
        courseTagline: courseData.basicInfo?.courseTagline,
        courseDuration: courseData.basicInfo?.courseDuration,
        difficultyLevel: courseData.basicInfo?.difficultyLevel,
        category: courseData.basicInfo?.category,
        subCategory: courseData.basicInfo?.subCategory,
        teachingLanguage: courseData.basicInfo?.teachingLanguage,
        courseDescription: courseData.about?.courseDescription || '',
        courseOutcome: courseData.about?.courseOutcome || '',
        coursePreRequisites: courseData.about?.coursePreRequisites || [],
        courseAudience: courseData.about?.courseAudience || [],
        categoryImage: courseData.media?.categoryImage || '',
        courseBanner: courseData.media?.courseBanner || '',
        courseImage: courseData.media?.courseImage || '',
        isDraft: true,
        status: 'DRAFT',
        courseChapters: courseData.content?.chapters || [],
        glossary: courseData.glossary || [],
        references: courseData.references || [],
        courseFaqs: courseData.faq || [],
        courseSettings,
        comments: latestData.comments 
          ? Object.values(latestData.comments)
          : []
      };

      // Remove comments from courseSettings if it exists there
      if (formattedData.courseSettings?.comments) {
        delete formattedData.courseSettings.comments;
      }

      console.log('API Request Payload:', JSON.stringify(formattedData, null, 2));

      const token = Cookies.get('accessToken');
      const response = await axios.post(
        'http://localhost:8089/qlms/courses',
        formattedData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('API Error:', error.response?.data);
      throw error;
    }
  },

  resetStore: () => {
    set({
      currentStep: 1,
      courseData: {
        basicInfo: {
          courseName: '',
          courseTagline: '',
          courseDuration: '',
          difficultyLevel: '',
          category: '',
          subCategory: '',
          teachingLanguage: '',
          hashtags: [],
          courseType: '',
          percentageRequired: '',
        },
        media: {
          courseBanner: null,
          courseImage: null,
          categoryImage: null
        },
        about: {
          courseOutcome: '',
          courseDescription: '',
          coursePreRequisites: [],
          courseAudience: []
        },
        content: { 
          chapters: []
        },
        faq: [],
        settings: {
          courseVisibility: { public: false, enablePreview: false },
          courseAccess: { duration: '', lifetimeAccess: false },
          pricing: { originalPrice: '', discountedPrice: '', startDate: null, endDate: null },
          enrollment: {
            maxStudents: '',
            certificateEligibility: false,
            notifications: { notifyUpdates: false, notifyAssignments: false }
          }
        },
        courseSettings: [{
          pricingType: '',
          promotionType: '',
          publicAccess: false,
          enablePreview: false,
        }],
        glossary: [
          {
            acronym: '',
            meaning: ''
          }
        ],
        references: [
          {
            reference: '',
            link: ''
          }
        ]
      }
    });
  },

  fetchCategories: async () => {
    try {
      const response = await fetch('http://localhost:8089/qlms/allCategories');
      const data = await response.json();
      set({ categories: data });
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  },

  fetchSubCategories: async (categoryId) => {
    if (!categoryId) {
      set({ subCategories: [] });
      return;
    }
    try {
      const response = await fetch(`http://localhost:8089/qlms/allSubCategories/${categoryId}`);
      const data = await response.json();
      set({ subCategories: data });
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      toast.error('Failed to load subcategories');
    }
  },

  fetchCourseTypes: async () => {
    try {
      const response = await fetch('http://localhost:8089/qlms/allCourseTypes');
      const data = await response.json();
      set({ courseTypes: data });
    } catch (error) {
      console.error('Error fetching course types:', error);
      toast.error('Failed to load course types');
    }
  },

  breadcrumbTitle: '',
  setBreadcrumbTitle: (title) => set({ breadcrumbTitle: title }),

  validateStep: (step) => {
    const { courseData } = get();
    let errors = {};

    switch(step) {
      case 'media':
        console.log('Validating media:', courseData.media);
        const missingMediaFields = [];

        // Check for required media files
        if (!courseData?.media?.courseBanner) {
          errors.banner = true;
          missingMediaFields.push('Course Banner');
        }
        if (!courseData?.media?.courseImage) {
          errors.course = true;
          missingMediaFields.push('Course Image');
        }
        if (!courseData?.media?.categoryImage) {
          errors.category = true;
          missingMediaFields.push('Category Image');
        }

        if (missingMediaFields.length > 0) {
          displayToast('error', `Missing required files: ${missingMediaFields.join(', ')}`);
          set({ validationErrors: errors });
          return false;
        }
        return true;

      case 'basic-info':
        return get().validateBasicInfo(); // Use existing basic info validation
        
    
      case 'about':
        errors = validateAboutCourse(courseData.about);
        break;
      case 'content':
        errors = validateContent(courseData.content);
        break;
      case 'more-info':
        errors = validateGlossaryAndReferences(courseData);
        break;
      case 'faq':
        errors = validateFAQ(courseData);
        break;
      case 'settings':
        // errors = validateSettings(courseData.settings);
        if (Object.keys(errors).length > 0) {
          displayToast('error', 'Please fill in all required settings fields', 'Error');
          return false; // Prevent submission if there are errors
        }
        break;
      // Add other step validations
    }

    set({ validationErrors: errors });
    return Object.keys(errors).length === 0;
  },

  validateMedia: () => {
    const { courseData } = get();
    const errors = {};

    // Check for required media files
    if (!courseData?.media?.courseBanner) {
      errors.banner = 'Banner video is required';
    }
    if (!courseData?.media?.courseImage) {
      errors.course = 'Course image is required';
    }
    if (!courseData?.media?.categoryImage) {
      errors.category = 'Category image is required';
    }

    set({ validationErrors: errors });
    return Object.keys(errors).length === 0; // Returns true if no errors
  },

  validateBasicInfo: () => {
    const { courseData } = get();
    const { basicInfo } = courseData;
    const errors = {};

    // Similar validation as in BasicInformation component
    if (!basicInfo?.courseName || basicInfo.courseName.length < 10) {
      errors.courseName = 'Course name is required and must be at least 10 characters';
    }
    // ... add other validations similar to BasicInformation component

    set({ validationErrors: errors });
    return Object.keys(errors).length === 0; // Returns true if no errors
  },

  validateSettings: () => {
    const { courseData } = get();
    const settings = courseData.courseSettings?.[0];
    
    if (!settings) {
      displayToast('error', 'Please fill all the settings fields');
      return false;
    }

    // Check all required fields
    const requiredFields = {
      courseType: 'Course type',
      pricingType: 'Pricing type',
      startDate: 'Start date',
      endDate: 'End date'
    };

    let hasError = false;

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!settings[field]) {
        hasError = true;
        displayToast('error', `${label} is required`);
      }
    });

    // Check access settings
    if (!settings.lifeTimeAccess && !settings.accessDuration) {
      hasError = true;
      displayToast('error', 'Please specify either lifetime access or access duration');
    }

    return !hasError;
  }
}));

export default useCourseCreationStore;