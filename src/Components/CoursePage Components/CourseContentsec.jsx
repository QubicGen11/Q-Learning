import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaPlayCircle, FaFile } from 'react-icons/fa';
import './CourseContentsec.css';

const CourseContentsec = () => {
  const [expandedSections, setExpandedSections] = useState(['Discovery Learning']);
  const [allExpanded, setAllExpanded] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  const toggleSection = (sectionTitle) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(title => title !== sectionTitle) // Remove if present
        : [...prev, sectionTitle] // Add if not present
    );
  };

  const toggleAllSections = () => {
    if (allExpanded) {
      setExpandedSections([]); // Collapse all
    } else {
      setExpandedSections(sections.map(section => section.title)); // Expand all
    }
    setAllExpanded(!allExpanded);
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const previousReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const sections = [
    {
      title: 'Overview',
      duration: '101 lectures • 13min',
      isExpanded: false
    },
    {
      title: 'Introduction to Class Projects',
      duration: '3 Lectures • 5min',
      isExpanded: false
    },
    {
      title: 'Discovery Learning - Understand Your Business Space and Users',
      duration: '13 Lectures • 1hour 1min',
      isExpanded: true,
      subsections: [
        { title: "What's 'Discovery'?", duration: '04:52', type: 'video' },
        { title: 'Discovery Overview', duration: '02:09', type: 'video' },
        { title: 'Stakeholder Interviews', duration: '08:53', type: 'video' },
        { title: 'Strategic UX Project - Stakeholder Interviews (optional)', duration: '00:21', type: 'file' },
        { title: 'Secondary Research', duration: '03:23', type: 'video' },
        { title: 'Strategic UX Project - Secondary Research', duration: '01:08', type: 'file' },
        { title: 'Analytics', duration: '09:03', type: 'video' },
        { title: 'Strategic UX Project - Analytics Research', duration: '01:23', type: 'file' },
        { title: 'Competitive Analysis', duration: '14:02', type: 'video' },
        { title: 'Heuristic Evaluation', duration: '05:05', type: 'video' },
        { title: 'Strategic UX Project - Competitive Analysis', duration: '01:40', type: 'file' },
        { title: 'Exploratory User Research', duration: '04:44', type: 'video' },
        { title: "How's it going?", duration: '00:19', type: 'file' }
      ]
    },
    {
      title: 'Discovery Learning (Continued) - How to Conduct User Research',
      duration: '14 Lectures • 1hour 6min',
      isExpanded: false
    },
    {
      title: 'Strategic UX - Define Users and Big Goals',
      duration: '15 Lectures • 1hour 10min',
      isExpanded: false
    },
    {
      title: 'Presenting - Get Alignment and Move Things Forward',
      duration: '5 Lectures • 14min',
      isExpanded: false
    },
    {
      title: 'Interaction Design - Defining the Experience and Interface',
      duration: '17 Lectures • 1 hour',
      isExpanded: false
    },
    {
      title: 'Next Steps - Moving Towards a Career in UX',
      duration: '5 Lectures • 22min',
      isExpanded: false
    }
  ];

  const reviews = [
    {
      name: 'Hanna Y.',
      rating: 4,
      text: 'Excellent, if UX design sounded obvious but tactically vague to you as it was for me. It was great having someone walk you through the entire process start to finish. It was clear never once did I feel in-over my-head although I have very little experience.',
      timeAgo: '4 Years Ago',
      linkedIn: true
    },
    {
      name: 'John D.',
      rating: 5,
      text: 'Another great review example here...',
      timeAgo: '3 Years Ago',
      linkedIn: true
    },
    {
      name: 'John D.',
      rating: 5,
      text: 'Another great review example here...',
      timeAgo: '3 Years Ago',
      linkedIn: true
    },
    {
      name: 'John D.',
      rating: 5,
      text: 'Another great review example here...',
      timeAgo: '3 Years Ago',
      linkedIn: true
    },
    {
      name: 'John D.',
      rating: 5,
      text: 'Another great review example here...',
      timeAgo: '3 Years Ago',
      linkedIn: true
    },
    // Add more reviews as needed
  ];

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Course content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">Course content</h2>
                <p className="text-sm text-gray-600">8 sections • 82 lectures • 5h 31m total length</p>
              </div>
              <button 
                className="text-[#0056B3] font-medium"
                onClick={toggleAllSections}
              >
                {allExpanded ? 'COLLAPSE ALL SECTIONS' : 'EXPAND ALL SECTIONS'}
              </button>
            </div>

            {/* Course Sections with smooth transition */}
            <div className="border rounded-lg">
              {sections.map((section, index) => (
                <div key={index} className="border-b last:border-b-0">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="transition-transform duration-200">
                        {expandedSections.includes(section.title) ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                      <span className="font-medium">{section.title}</span>
                    </div>
                    <span className="text-sm text-gray-600">{section.duration}</span>
                  </button>

                  {/* Subsections with smooth height transition */}
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      expandedSections.includes(section.title) ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {section.subsections?.map((subsection, subIndex) => (
                      <div
                        key={subIndex}
                        className="px-12 py-3 flex justify-between items-center border-t hover:bg-gray-100 bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          {subsection.type === 'video' ? (
                            <FaPlayCircle className="text-gray-400" />
                          ) : (
                            <FaFile className="text-gray-400" />
                          )}
                          <span className="text-sm">{subsection.title}</span>
                        </div>
                        <span className="text-sm text-gray-600">{subsection.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Requirements, Reviews, and Enrollment */}
          <div className="lg:col-span-1 space-y-8">
            {/* Requirements Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <p className="text-gray-600">
                This course was created for students of all levels, but a basic familiarity with Adobe and Microsoft 
                products will be helpful if you plan to do the class projects.
              </p>
            </div>

            {/* Most Useful Reviews */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Most Useful Reviews</h3>
              <div className="border rounded-lg p-4">
                <div className="relative">
                  <div className="overflow-hidden">
                    <div 
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(-${currentReview * 100}%)` }}
                    >
                      {reviews.map((review, index) => (
                        <div 
                          key={index} 
                          className="w-full flex-shrink-0"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-grow">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{review.name}</span>
                                  <div className="flex text-yellow-400">
                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                  </div>
                                </div>
                                {review.linkedIn && (
                                  <button className="text-blue-600">
                                    <img 
                                      src="/linkedin-icon.png" 
                                      alt="LinkedIn" 
                                      className="w-5 h-5"
                                    />
                                  </button>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-2">
                                {review.text}
                              </p>
                              <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-500">Was This Review Helpful?</span>
                                  <button className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                  </button>
                                  <button className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2" />
                                    </svg>
                                  </button>
                                </div>
                                <span className="text-sm text-gray-500">{review.timeAgo}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation dots */}
                  <div className="flex justify-center gap-1 mt-4">
                    {reviews.map((_, index) => (
                      <button 
                        key={index}
                        onClick={() => setCurrentReview(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          currentReview === index ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Who can enrol */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Who can enrol for this course</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-gray-600">• People who want to enter the UX field and become practitioners</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600">• Professionals who want or need to add UX to their skill set</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600">• Anyone at an agency or company who needs to quickly learn real-world UX fundamentals you can use on the job</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContentsec;
