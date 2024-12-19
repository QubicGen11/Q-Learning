import React, { useState } from 'react';
import { FaPlay, FaFile, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import '../../../App.css'

const ChaptersSidebar = () => {
  const [expandedChapter, setExpandedChapter] = useState('Discovery Learning - Understanding Users');
  const [isChaptersOpen, setIsChaptersOpen] = useState(true);

  const chapters = [
    {
      title: 'Overview',
      type: 'single'
    },
    {
      title: 'Discovery Learning - Understanding Users',
      type: 'group',
      items: [
        { title: "What's \"Discovery\"?", icon: 'play' },
        { title: 'Discovery Overview', icon: 'play' },
        { title: 'Stakeholder Interviews', icon: 'play' },
        { title: 'Stakeholder Interviews (optional)', icon: 'file' },
        { title: 'Secondary Research', icon: 'play' },
        { title: 'Secondary Research', icon: 'file' },
        { title: 'Analytics', icon: 'play' },
        { title: 'Analytics Research', icon: 'file' },
        { title: 'Competitive Analysis', icon: 'play' },
        { title: 'Heuristic Evaluation', icon: 'play' },
        { title: 'Competitive Analysis', icon: 'file' },
        { title: 'Exploratory User Research', icon: 'play' }
      ]
    },
    {
      title: 'Discovery Learning (Continued)',
      type: 'group',
      items: []
    },
    {
      title: 'Presenting - Get Alignment',
      type: 'group',
      items: []
    },
    {
      title: 'Interaction Design - Define User Flow',
      type: 'group',
      items: []
    },
    {
      title: 'Strategic UX - Define User Flow',
      type: 'group',
      items: []
    },
    {
      title: 'Next Steps - Moving Towards Implementation',
      type: 'group',
      items: []
    },
    {
      title: 'Glossary',
      type: 'single'
    },
    {
      title: 'References',
      type: 'single'
    },
    {
      title: 'Provide Feedback & Get your Certificate',
      type: 'single'
    }
  ];

  const toggleChapter = (chapterTitle) => {
    if (expandedChapter === chapterTitle) {
      setExpandedChapter(null);
    } else {
      setExpandedChapter(chapterTitle);
    }
  };

  return (
    <div className="h-full bg-white overflow-hidden">
      {/* Chapters Header */}
      <div 
        className="p-4 border-b cursor-pointer"
        onClick={() => setIsChaptersOpen(!isChaptersOpen)}
      >
        <div className="flex items-center space-x-2">
          {isChaptersOpen ? (
            <FaChevronDown className="text-gray-500" />
          ) : (
            <FaChevronRight className="text-gray-500" />
          )}
          <span className="font-medium">Chapters</span>
        </div>
      </div>

      {/* Chapter List */}
      {isChaptersOpen && (
        <div className="scrollbar overflow-y-auto" style={{ maxHeight: 'calc(100vh - 116px)' }}>
          {chapters.map((chapter, index) => (
            <div key={index} className="border-b">
              {chapter.type === 'single' ? (
                <div className="p-4 hover:bg-gray-50 flex items-center space-x-2">
                  {chapter.title === 'Overview' ? null : <FaChevronRight className="text-gray-500" />}
                  <span className="text-sm">{chapter.title}</span>
                </div>
              ) : (
                <>
                  <div 
                    className="p-4 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleChapter(chapter.title)}
                  >
                    <span className="text-sm">{chapter.title}</span>
                    {expandedChapter === chapter.title ? (
                      <FaChevronDown className="text-gray-500" />
                    ) : (
                      <FaChevronRight className="text-gray-500" />
                    )}
                  </div>
                  {expandedChapter === chapter.title && chapter.items && chapter.items.length > 0 && (
                    <div className="bg-gray-50">
                      {chapter.items.map((item, itemIndex) => (
                        <div 
                          key={itemIndex}
                          className="p-3 pl-8 hover:bg-gray-100 flex items-center space-x-2"
                        >
                          {item.icon === 'play' ? (
                            <FaPlay className="text-gray-500 text-xs" />
                          ) : (
                            <FaFile className="text-gray-500 text-xs" />
                          )}
                          <span className="text-sm text-gray-700">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChaptersSidebar;