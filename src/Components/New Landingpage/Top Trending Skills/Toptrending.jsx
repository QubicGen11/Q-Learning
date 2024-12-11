import React from 'react';

const Toptrending = () => {
  const trendingSkills = {
    design: [
      {
        title: '3d Design Blender',
        enrolled: '32,000+ Enrolled'
      },
      {
        title: 'Graphic Design',
        enrolled: '30,000+ Enrolled'
      },
      {
        title: 'UX/UX Design',
        enrolled: '27,000+ Enrolled'
      }
    ],
    development: [
      {
        title: 'Python',
        enrolled: '35,000+ Enrolled'
      },
      {
        title: 'Web Development',
        enrolled: '31,000+ Enrolled'
      },
      {
        title: 'Data Science',
        enrolled: '28,000+ Enrolled'
      }
    ],
    business: [
      {
        title: 'Power BI',
        enrolled: '29,000+ Enrolled'
      },
      {
        title: 'PMI',
        enrolled: '26,000+ Enrolled'
      },
      {
        title: 'SAFe® Agile',
        enrolled: '27,000+ Enrolled'
      }
    ]
  };

  return (
    <div className="bg-[#F5F5F5] p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Top Trending Skills</h2>
        
        <div className="grid grid-cols-4 gap-8">
          {/* Left Column */}
          <div className="col-span-1">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-1">Prompt Engineering is a Top Skill</h3>
              <a href="#" className="text-[#0056B3] hover:underline text-sm block mb-2">
                View Generative AI Courses
              </a>
              <div className="flex items-center text-sm text-gray-600 mb-4  border-gray-200 pb-2">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H6v-.99c.2-.72 3.3-2.01 6-2.01s5.8 1.29 6 2v1z"/>
                </svg>
                32,000+ Enrolled
              </div>
              <button className="w-full bg-orange-500 text-white text-sm py-2 px-4 rounded hover:bg-orange-600 flex items-center justify-center">
                Show all trending courses
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Columns */}
          <div className="col-span-3 grid grid-cols-3 gap-8">
            {/* Design Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Design</h3>
              <div className="space-y-4">
                {trendingSkills.design.map((skill, index) => (
                  <div key={index}>
                    <a href="#" className="text-[#0056B3] hover:underline flex items-center mb-1">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M5 7l5 5-5 5" />
                      </svg>
                      {skill.title}
                    </a>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H6v-.99c.2-.72 3.3-2.01 6-2.01s5.8 1.29 6 2v1z"/>
                      </svg>
                      {skill.enrolled}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Development Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Development</h3>
              <div className="space-y-4">
                {trendingSkills.development.map((skill, index) => (
                  <div key={index}>
                    <a href="#" className="text-[#0056B3] hover:underline flex items-center mb-1">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M5 7l5 5-5 5" />
                      </svg>
                      {skill.title}
                    </a>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-1 ml-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H6v-.99c.2-.72 3.3-2.01 6-2.01s5.8 1.29 6 2v1z"/>
                      </svg>
                      {skill.enrolled}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Business</h3>
              <div className="space-y-4">
                {trendingSkills.business.map((skill, index) => (
                  <div key={index}>
                    <a href="#" className="text-[#0056B3] hover:underline flex items-center mb-1">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M5 7l5 5-5 5" />
                      </svg>
                      {skill.title}
                    </a>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H6v-.99c.2-.72 3.3-2.01 6-2.01s5.8 1.29 6 2v1z"/>
                      </svg>
                      {skill.enrolled}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toptrending;