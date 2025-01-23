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
        // hashTags: [] 
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
      const outcomes = about?.courseOutCome?.split('\n').filter(Boolean) || [];
      if (!about?.courseOutCome || outcomes.length < 3) {
        errors.courseOutCome = 'At least 3 course outcomes are required';
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

    // Add this function to save state changes to localStorage
    const saveToLocalStorage = (state) => {
      try {
        localStorage.setItem('courseCreationData', JSON.stringify(state.courseData));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    };  

    // Add this helper function at the top with other helpers


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
      
      courseData: loadFromCourseLocalStorage() || initialData,
      courseId: null,

      categories: [],
      subCategories: [],

      courseTypes: [],

      validationErrors: {},
      setValidationErrors: (errors) => set({ validationErrors: errors }),

      setStep: (step) => {
        set({ currentStep: step });
      },

      updateCourseData: (section, data) => {
        console.log("Updating section:", section, "with data:", data);
      
        set((state) => {
          // Create a deep copy of the current courseData
          const newCourseData = {
            ...state.courseData,
          };

          if (section === "comments") {
            data = Array.isArray(data) ? data : Object.values(data || {});
          }
          
      
          // Special handling for courseSettings section
          if (section === 'courseSettings') {

            // If courseSettings is an array, update the first item
            if (Array.isArray(newCourseData.courseSettings)) {
              newCourseData.courseSettings = [
                {
                  ...newCourseData.courseSettings[0], // Keep existing ID and other fields
                  ...data, // Update with new data
                },
              ];
            } else {
              // If not an array, create one with a single item
              newCourseData.courseSettings = [
                {
                  ...data,
                },
              ];
            }
          } else {
            // Handle other sections as before
            newCourseData[section] = data;
          }
      
          console.log("Updated courseData:", newCourseData);
      
          // Save to localStorage
          saveToLocalStorage({ courseData: newCourseData });
      
          return { courseData: newCourseData };
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

      submitCourse: async (isDraft = true) => {
        const { courseData } = get();
      
        try {
          const settings = courseData.courseSettings?.[0] || {};
          console.log('1. Original settings:', settings);
      
          // Format the data with cleaned settings
          const formattedData = {
            courseId: courseData.courseId || localStorage.getItem('currentCourseId'),
            action: isDraft ? 'DRAFT' : 'PUBLISH',
            trainerId: courseData.trainerId || '',
            trainerName: courseData.trainerName || '',
            courseName: courseData.basicInfo?.courseName || '',
            courseTagline: courseData.basicInfo?.courseTagline || '',
            courseDuration: courseData.basicInfo?.courseDuration || '',
            difficultyLevel: courseData.basicInfo?.difficultyLevel || '',
            category: courseData.basicInfo?.category || '',
            subCategory: courseData.basicInfo?.subCategory || '',
            teachingLanguage: courseData.basicInfo?.teachingLanguage || '',
            courseDescription: courseData.about?.courseDescription || '',
            courseOutCome: courseData.about?.courseOutCome || '',
            coursePreRequisites: courseData.about?.coursePreRequisites || [],
            courseAudience: courseData.about?.courseAudience || [],
            categoryImage: courseData.media?.categoryImage || '',
            courseBanner: courseData.media?.courseBanner || '',
            courseImage: courseData.media?.courseImage || '',
            isDraft: isDraft,
            isFeatured: false,
            status: isDraft ? 'DRAFT' : 'PENDING_APPROVAL',
            version: '1.0',
            courseChapters: courseData.content?.chapters?.map((chapter) => ({
              chapterName: chapter?.chapterName || '',
              chapterLessons: chapter?.lessons?.map((lesson) => ({
                lessonTitle: lesson?.lessonTitle || '',
                lessonType: lesson?.lessonType || '',
                lessonContent: lesson?.lessonContent || '',
                lessonVideo: lesson?.lessonVideo || '',
                materials: lesson?.materials || [],
                questions: lesson?.questions || [],
              })) || [],
            })) || [],
            glossary: courseData.glossary || [],
            references: courseData.references || [],
            courseFaqs: courseData.faq || [],
            courseSettings: courseData.courseSettings || [],
      
            // Fix for comments: ensure it's always an array
            comments: Array.isArray(courseData.comments)
              ? courseData.comments
              : Object.values(courseData.comments || {}),
          };
      
          console.log('2. Final formatted data:', formattedData);
      
          const token = Cookies.get('accessToken');
          const response = await axios.post(
            'http://localhost:8089/qlms/courses/draft',
            formattedData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
      
          console.log('3. API Response:', response.data);
      
          if (response.data) {
            set((state) => ({
              ...state,
              courseId: response.data.draft.id,
            }));
      
            toast.success(
              courseData.courseId
                ? 'Course draft updated successfully!'
                : 'New course draft created successfully!'
            );
            return response.data;
          }
        } catch (error) {
          console.error('4. API Error:', error);
          toast.error(error.response?.data?.message || 'Failed to save course');
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
              // hashtags: [],
              courseType: '',
              percentageRequired: '',
            },
            media: {
              courseBanner: null,
              courseImage: null,
              categoryImage: null
            },
            about: {
              courseOutCome: '',
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
      },

      // Add new state for fetching course by ID
      courseLoading: false,
      courseError: null,

      // Add new function to fetch course by ID
      fetchCourseById: async (courseId) => {
        try {
          const token = Cookies.get('accessToken');
          const response = await axios.get(
            `http://localhost:8089/qlms/courses/${courseId}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          const courseData = response.data.course;
          
          // First, let's handle the chapter data separately to ensure it's always loaded
          const chaptersData = courseData.courseChapters?.map(chapterItem => {
            if (!chapterItem.chapter) return null;
            
            return {
              id: chapterItem.chapter.id,
              chapterId: chapterItem.chapterId,
              chapterName: chapterItem.chapter.chapterName,
              lessons: chapterItem.chapter.chapterLessons?.map(lesson => ({
                id: lesson.id,
                lessonTitle: lesson.lessonTitle || '',
                lessonType: lesson.lessonType || '',
                lessonContent: lesson.lessonContent || '',
                lessonVideo: lesson.lessonVideo || '',
                materials: lesson.materials?.map(material => ({
                  id: material.id,
                  materialTitle: material.materialTitle,
                  materialLink: material.materialLink
                })) || [],
                questions: lesson.questions?.map(question => ({
                  id: question.id,
                  question: question.question,
                  questionType: question.questionType,
                  correctAnswer: question.correctAnswer || null,
                  options: question.options?.map(option => ({
                    id: option.id,
                    option: option.option,
                    isCorrect: !!option.isCorrect
                  })) || []
                })) || [],
                isNew: false,
                showDropdown: false
              })) || [],
              isNew: false
            };
          }).filter(Boolean) || [];

          console.log("Mapped chapters data:", chaptersData);
          
          set(state => {
            const newState = {
              courseData: {
                ...state.courseData,
                trainerId: courseData.trainerId,
                trainerName: courseData.trainerName,
                basicInfo: {
                  courseName: courseData.courseName || '',
                  courseTagline: courseData.courseTagline || '',
                  courseDuration: courseData.courseDuration || '',
                  difficultyLevel: courseData.difficultyLevel || '',
                  category: courseData.category || '',
                  subCategory: courseData.subCategory || '',
                  teachingLanguage: courseData.teachingLanguage || '',
                  // hashtags: courseData.courseSettings?.[0]?.hashTags || [],
                },
                media: {
                  courseBanner: courseData.courseBanner || null,
                  courseImage: courseData.courseImage || null,
                  categoryImage: courseData.categoryImage || null
                },
                about: {
                  courseOutCome: courseData.courseOutCome || '',
                  courseDescription: courseData.courseDescription || '',
                  coursePreRequisites: courseData.coursePreRequisites?.map(item => ({
                    preRequisiteRequired: item.preRequisites?.preRequisiteRequired || '',
                    preRequisiteLevel: item.preRequisites?.preRequisiteLevel || 'Beginner'
                  })) || [],
                  courseAudience: courseData.courseAudience?.map(item => 
                    item.audience
                  ) || []
                },
                content: {
                  chapters: chaptersData // Use our separately processed chapters data
                },
                glossary: courseData.glossary?.map(item => ({
                  id: item.id || '',
                  acronym: item.acronym || '',
                  meaning: item.meaning || ''
                })) || [],
                references: courseData.references?.map(item => ({
                  id: item.id || '',
                  reference: item.reference || '',
                  link: item.link || ''
                })) || [],
                faq: courseData.courseFaqs?.map(item => ({
                  id: item.id || '',
                  question: item.faq?.question || '',
                  answer: item.faq?.answer || ''
                })) || [],
                  courseSettings: courseData.courseSettings?.map(setting => ({
                    id: setting.id || '',
                    courseType: setting.courseType || '',
                    percentageRequired: setting.percentageRequired || 80,
                    pricingType: setting.pricingType || '',
                    promotionType: setting.promotionType || 'No Promotion',
                    publicAccess: setting.publicAccess || false,
                    enablePreview: setting.enablePreview || false,
                    price: setting.price || 0,
                    discount: setting.discount || 0,
                    offeredPrice: setting.offeredPrice || 0,
                    startDate: setting.startDate || null,
                    endDate: setting.endDate || null,
                    maxStudents: setting.maxStudents || 100,
                    certificateEligibility: setting.certificateEligibility || false,
                    accessDuration: setting.accessDuration || '',
                    lifeTimeAccess: setting.lifeTimeAccess || false,
                    notifyStudentsOnUpdate: setting.notifyStudentsOnUpdate || false,
                    notifyStudentsOnAssignment: setting.notifyStudentsOnAssignment || false,
                    returnPeriod: setting.returnPeriod || '',
                    refundsAllowed: setting.refundsAllowed || false,
                    allowContentDownloads: setting.allowContentDownloads || false,
                    allowDiscussionParticipation: setting.allowDiscussionParticipation || false,
                    scheduleLiveClasses: setting.scheduleLiveClasses || false,
                    enableSubtitles: setting.enableSubtitles || false,
                    seoTitle: setting.seoTitle || '',
                    seoDescription: setting.seoDescription || '',
                    seoKeywords: setting.seoKeywords || [],
                    // hashTags: setting.hashTags || []
                  })) || []
              }
            };

            console.log("New state to be set:", newState);
            
            // Save to localStorage after ensuring chapters are properly loaded
            localStorage.setItem('courseCreationData', JSON.stringify(newState.courseData));
            
            return newState;
          });

        } catch (error) {
          console.error("Error in fetchCourse:", error);
          displayToast('error', 'Failed to fetch course data');
          throw error;
        }
      },

      // Modified setCurrentCourseId
      setCurrentCourseId: (id) => {
        console.log('🔑 Setting courseId:', id);
        set({ courseId: id });
        localStorage.setItem('currentCourseId', id);
      },

      // Modified fetchCourse
      fetchCourse: async (id) => {
        console.log('🔍 1. fetchCourse called with id:', id);
        
        try {
          const token = Cookies.get('accessToken');
          set({ courseId: id }); // Set ID immediately
          
          const response = await axios.get(`http://localhost:8089/qlms/courses/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          console.log('✅ 2. API Response received');
          
          set(state => ({
            courseId: id, // Ensure ID is set again
            courseData: {
              ...response.data,
              id: id // Explicitly include ID in courseData
            }
          }));

          console.log('📊 3. Store state after update:', {
            courseId: get().courseId,
            hasData: !!get().courseData
          });

        } catch (error) {
          console.error("❌ Error in fetchCourse:", error);
          throw error;
        }
      },

      // Add a new method to ensure courseId persistence
      ensureCourseId: (id) => {
        set(state => {
          if (!state.courseId) {
            console.log('🔄 Restoring courseId:', id);
            return { courseId: id };
          }
          return state;
        });
      }
    }));

    export default useCourseCreationStore;