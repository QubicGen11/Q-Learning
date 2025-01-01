import { create } from 'zustand';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

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
  
  courseData: {
    basicInfo: {
      courseName: 'Test Course',
      courseTagline: 'A test course for development',
      courseDuration: '8 weeks',
      difficultyLevel: 'Beginner',
      category: 'Technology',
      subCategory: 'Web Development',
      teachingLanguage: 'English',
      hashtags: ['test', 'development']
    },
    media: {
      courseBanner: null,
      courseImage: null,
      categoryImage: null
    },
    about: {
      courseOutcome: 'Students will learn test development skills',
      description: 'This is a test course description for development purposes.',
      prerequisites: ['Basic computer knowledge', 'Internet connection'],
      targetAudience: ['Beginners', 'Students', 'Developers']
    },
    content: { 
      chapters: [
        {
          name: 'Introduction',
          lessons: [
            {
              title: 'Getting Started',
              type: 'Video',
              content: 'Introduction to the course',
              videoUrl: 'https://example.com/video.mp4',
              materials: 'https://example.com/materials.pdf'
            }
          ],
          questions: [
            {
              question: 'What is this course about?',
              isOpenSource: true,
              options: [
                { option: 'Testing', isCorrect: true },
                { option: 'Production', isCorrect: false }
              ]
            }
          ]
        }
      ]
    },
    faq: [
      {
        question: 'Is this a test course?',
        answer: 'Yes, this is a test course for development purposes.'
      }
    ],
    settings: {
      courseVisibility: { 
        public: true, 
        enablePreview: true 
      },
      courseAccess: { 
        duration: '2 months', 
        lifetimeAccess: false 
      },
      pricing: { 
        originalPrice: '99.99', 
        discountedPrice: '79.99', 
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30*24*60*60*1000).toISOString() // 30 days from now
      },
      enrollment: {
        maxStudents: '100',
        certificateEligibility: true,
        notifications: {
          notifyUpdates: true,
          notifyAssignments: true
        }
      }
    }
  },

  setStep: (step) => set({ currentStep: step }),
  
  updateCourseData: (section, data) => set(state => ({
    courseData: {
      ...state.courseData,
      [section]: data
    }
  })),

  resetStore: () => set({
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
        hashtags: []
      },
      media: {
        courseBanner: null,
        courseImage: null,
        categoryImage: null
      },
      about: {
        courseOutcome: '',
        description: '',
        prerequisites: [],
        targetAudience: []
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
      }
    }
  }),

  validateCourse: () => {
    const { courseData } = get();
    const { basicInfo, media, about, content, settings } = courseData;

    console.log('Starting validation...');
    console.log('Content data:', content);
    console.log('Chapters:', content?.chapters);

    // Basic Information validation
    if (!basicInfo?.courseName?.trim() || !basicInfo?.courseTagline?.trim() || 
        !basicInfo?.courseDuration?.trim() || !basicInfo?.difficultyLevel?.trim() || 
        !basicInfo?.category?.trim() || !basicInfo?.teachingLanguage?.trim()) {
      console.log('Basic Info validation failed:', basicInfo);
      toast.error('Please fill all required fields in Basic Information');
      return false;
    }

    // Media validation
    if (!media?.courseBanner?.file || !media?.courseImage?.file || !media?.categoryImage?.file) {
      console.log('Media validation failed:', media);
      toast.error('Please upload all required media files');
      return false;
    }

    // About validation
    if (!about?.courseOutcome?.trim() || !about?.description?.trim() || 
        !about?.prerequisites?.length || !about?.targetAudience?.length) {
      console.log('About validation failed:', about);
      toast.error('Please complete all fields in About Course section');
      return false;
    }

    // Content validation
    if (!content?.chapters?.length) {
      console.log('Content validation failed: No chapters found');
      toast.error('Please add at least one chapter with content');
      return false;
    }

    // Validate each chapter has required content
    const invalidChapters = content.chapters.filter(chapter => {
      console.log('Validating chapter:', chapter);
      return !chapter.name || !chapter.lessons || !chapter.lessons.length;
    });

    if (invalidChapters.length > 0) {
      console.log('Invalid chapters found:', invalidChapters);
      toast.error('Please ensure all chapters have a name and at least one lesson');
      return false;
    }

    // Settings validation
    if (!settings?.pricing?.originalPrice) {
      console.log('Settings validation failed:', settings);
      toast.error('Please set course pricing');
      return false;
    }

    console.log('All validations passed!');
    return true;
  },

  submitCourse: async (navigate) => {
    const store = get();
    
    try {
      if (!store.validateCourse()) {
        return;
      }

      const { courseData } = store;
      
      // Get access token
      const accessToken = Cookies.get('accessToken');
      if (!accessToken) {
        toast.error('Authentication required. Please login again.');
        return;
      }

      // Create the course data object
      const coursePayload = {
        courseName: courseData.basicInfo.courseName || "Introduction to Web Development",
        courseTagline: courseData.basicInfo.courseTagline || "Learn the basics of web development",
        courseDuration: courseData.basicInfo.courseDuration || "12 weeks",
        difficultyLevel: courseData.basicInfo.difficultyLevel || "Beginner",
        category: courseData.basicInfo.category || "Technology",
        subCategory: courseData.basicInfo.subCategory || "Web Development",
        categoryImage: "https://example.com/category-image.jpg", // Default image URL
        teachingLanguage: courseData.basicInfo.teachingLanguage || "English",
        isDraft: false,
        hashTags: [
          { tagName: "WebDev" },
          { tagName: "JavaScript" },
          { tagName: "Frontend" }
        ],
        courseBanner: "https://example.com/course-banner.jpg", // Default image URL
        courseImage: "https://example.com/course-image.jpg", // Default image URL
        courseOutcome: courseData.about.courseOutcome || "Understand the core concepts of web development",
        courseDescription: courseData.about.description || "This course will teach you the fundamentals of web development",
        coursePreRequisites: [
          { 
            preRequisiteRequired: "Basic computer knowledge", 
            preRequisiteLevel: "Beginner" 
          }
        ],
        courseAudience: [
          "Beginners looking to learn web development"
        ],
        courseChapters: [
          {
            chapterName: "Introduction to HTML",
            lessons: [
              {
                lessonTitle: "What is HTML?",
                lessonType: "Video",
                lessonContent: "HTML is the standard markup language for documents",
                lessonVideo: "https://example.com/html-lesson1.mp4",
                lessonMaterials: "https://example.com/html-material1.pdf"
              }
            ],
            questions: [
              {
                question: "What is HTML used for?",
                isOpenSource: true,
                options: [
                  { option: "Building websites", isCorrect: true },
                  { option: "Editing videos", isCorrect: false }
                ]
              }
            ]
          }
        ],
        courseFaqs: [
          {
            question: "Do I need any prior knowledge?",
            answer: "No, this course is designed for beginners."
          }
        ],
        courseSettings: [{
          publicAccess: true,
          enablePreview: true,
          price: 49.99,
          discount: 10,
          offeredPrice: 39.99,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          maxStudents: 100,
          certificateEligibility: true,
          accessDuration: "12 weeks",
          lifeTimeAccess: false,
          notifyStudentsOnUpdate: true,
          notifyStudentsOnAssignment: true,
          returnPeriod: "30 days",
          refundsAllowed: true,
          allowContentDownloads: true,
          allowDiscussionParticipation: true,
          scheduleLiveClasses: true,
          enableSubtitles: true,
          seoTitle: "Introduction to Web Development - Learn HTML, CSS, and JavaScript",
          seoDescription: "A comprehensive beginner's course on web development.",
          seoKeywords: "HTML, CSS, JavaScript, Web Development"
        }]
      };

      console.log('Making API call to create course...', JSON.stringify(coursePayload, null, 2));

      const response = await fetch('http://localhost:8089/qlms/createCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(coursePayload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        throw new Error(errorData.error || 'Failed to create course');
      }

      const responseData = await response.json();
      console.log('API Success Response:', responseData);

      toast.success('Course created successfully!');
      store.resetStore();
      navigate('/instructor/courses');

    } catch (error) {
      console.error('Error creating course:', error);
      toast.error(error.message || 'Failed to create course. Please try again.');
    }
  }
}));

export default useCourseCreationStore;