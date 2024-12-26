import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import SuperLoader from '../../Common/SuperLoader';
// import CaptionControls from './CaptionControls';

const LessonContent = ({ lessonData, onNavigate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(null);

  // Sample content for different lesson types
  const lessonContents = {
    // Video lessons
    "What's \"Discovery\"?": {
      type: 'video',
      url: 'https://d2vg68qr0mu2pv.cloudfront.net/1734603232822_videoplayback.mp4',
      transcript: 'User Experience, or UX, is an exciting field...'
    },
    'Discovery Overview': {
      type: 'video',
      url: 'https://res.cloudinary.com/defsu5bfc/video/upload/v1733042798/prompting_7_rmcwjy.mp4',
      transcript: 'In this overview, well explore the key aspects...'
    },
    // PDF documents
    'Stakeholder Interviews (optional)': {
      type: 'document',
      content: `
        <div class="p-6 bg-white rounded-lg">
          <h2 class="text-2xl font-bold mb-4">Stakeholder Interview Guide</h2>
          <div class="space-y-4">
            <p>This document provides a comprehensive guide for conducting stakeholder interviews...</p>
            <h3 class="text-xl font-semibold">Key Questions to Ask:</h3>
            <ul class="list-disc pl-5">
              <li>What are your main goals for this project?</li>
              <li>Who are the target users?</li>
              <li>What are the biggest challenges you're facing?</li>
            </ul>
          </div>
        </div>
      `
    },
    'Secondary Research': {
      type: 'document',
      content: `
        <div class="p-6 bg-white rounded-lg">
          <h2 class="text-2xl font-bold mb-4">Secondary Research Methods</h2>
          <div class="space-y-4">
            <p>Secondary research involves analyzing existing data and research...</p>
            <h3 class="text-xl font-semibold">Sources to Consider:</h3>
            <ul class="list-disc pl-5">
              <li>Academic journals and publications</li>
              <li>Industry reports and white papers</li>
              <li>Market research data</li>
              <li>Competitor analysis</li>
            </ul>
          </div>
        </div>
      `
    },
    // Interactive content
    'Analytics Research': {
      type: 'interactive',
      content: `
        <div class="p-6 bg-white rounded-lg">
          <h2 class="text-2xl font-bold mb-4">Analytics Dashboard Exercise</h2>
          <div class="space-y-6">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">Exercise 1: Data Analysis</h3>
              <p>Review the following analytics dashboard and identify key metrics...</p>
              <img src="/sample-analytics.png" alt="Analytics Dashboard" class="my-4 rounded-lg shadow" />
              <div class="space-y-2">
                <label class="block font-medium">What insights can you draw?</label>
                <textarea class="w-full p-2 border rounded" rows="3"></textarea>
              </div>
            </div>
          </div>
        </div>
      `
    }
  };

  // Get all lessons in a flat array for navigation
  const allLessons = [
    { title: "What's \"Discovery\"?", chapter: "Discovery Learning - Understanding Users", type: "play" },
    { title: "Discovery Overview", chapter: "Discovery Learning - Understanding Users", type: "play" },
    { title: "Stakeholder Interviews", chapter: "Discovery Learning - Understanding Users", type: "play" },
    { title: "Stakeholder Interviews (optional)", chapter: "Discovery Learning - Understanding Users", type: "file" },
    { title: "Secondary Research", chapter: "Discovery Learning - Understanding Users", type: "play" },
    // ... add all other lessons in sequence
  ];

  // Find current lesson index
  const currentIndex = allLessons.findIndex(lesson => lesson.title === lessonData.lesson);

  const handleNavigation = (direction) => {
    if (direction === 'next' && currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      onNavigate({
        chapter: nextLesson.chapter,
        lesson: nextLesson.title,
        type: nextLesson.type
      });
    } else if (direction === 'prev' && currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1];
      onNavigate({
        chapter: prevLesson.chapter,
        lesson: prevLesson.title,
        type: prevLesson.type
      });
    }
  };

  useEffect(() => {
    if (lessonData.lesson) {
      setIsLoading(true);
      setTimeout(() => {
        setContent(lessonContents[lessonData.lesson] || {
          type: 'default',
          content: `
            <div class="p-6 bg-white rounded-lg">
              <h2 class="text-xl font-semibold mb-4">${lessonData.lesson}</h2>
              <p>Content for this lesson is being developed...</p>
            </div>
          `
        });
        setIsLoading(false);
      }, 500);
    }
  }, [lessonData]);

  const renderContent = () => {
    if (isLoading) {
      return <SuperLoader />;
    }

    if (!content) {
      return <div>Please select a lesson</div>;
    }

    switch (content.type) {
      case 'video':
        return (
          <div className="w-full h-[600px] p-2">
            <div className="w-full h-full relative">
              <video
                className="w-full h-full object-cover"
                controls
                playsInline
                onLoadedData={() => setIsLoading(false)}
              >
                <source src={content.url} type="video/mp4" />
                
                {/* Multiple language tracks */}
                {/* <track 
                  src={englishCaptionsUrl}
                  label="English" 
                  kind="captions" 
                  srcLang="en"
                  default 
                />
                <track 
                  src={hindiCaptionsUrl}
                  label="हिंदी" 
                  kind="captions" 
                  srcLang="hi"
                />
                <track 
                  src={teluguCaptionsUrl}
                  label="తెలుగు" 
                  kind="captions" 
                  srcLang="te"
                /> */}

                Your browser does not support the video tag.
              </video>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
                  <SuperLoader />
                </div>
              )}
            </div>
          </div>
        );

      case 'document':
      case 'interactive':
        return (
          <div className="p-4">
            <div dangerouslySetInnerHTML={{ __html: content.content }} />
          </div>
        );

      default:
        return (
          <div className="p-4">
            <div dangerouslySetInnerHTML={{ __html: content.content }} />
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#e5e7eb] border-b border-gray-200">
        <button 
          className={`flex items-center gap-2 px-4 py-2 rounded-md
            ${currentIndex > 0 
              ? 'text-blue-600 border border-blue-700 hover:text-blue-700' 
              : 'text-gray-400 border border-gray-300 cursor-not-allowed'}`}
          onClick={() => handleNavigation('prev')}
          disabled={currentIndex <= 0}
        >
          <IoIosArrowBack className="text-xl" />
          <span className="text-sm font-medium">Previous</span>
        </button>
        
        <div className="flex items-start mr-auto ml-6 space-x-2">
          <h2 className="text-base font-bold text-black">
            Chapter: {lessonData.chapter}
          </h2>
          <span className="text-xs text-gray-500 mt-1 bg-[#F2F9FF] px-2 py-1 rounded-md">
            {lessonData.type === 'play' ? 'Playing' : 'Reading'}
          </span>
        </div>

        <button 
          className={`flex items-center gap-2 px-4 py-2 rounded-md
            ${currentIndex < allLessons.length - 1 
              ? 'text-blue-600 border border-blue-700 hover:text-blue-700' 
              : 'text-gray-400 border border-gray-300 cursor-not-allowed'}`}
          onClick={() => handleNavigation('next')}
          disabled={currentIndex >= allLessons.length - 1}
        >
          <span className="text-sm font-medium">Next</span>
          <IoIosArrowForward className="text-xl" />
        </button>
      </div>

      {/* Content Area */}
      <div className="h-auto overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default LessonContent;