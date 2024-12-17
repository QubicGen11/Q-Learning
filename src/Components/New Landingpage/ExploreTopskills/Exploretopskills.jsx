const Exploretopskills = ({topSkillsAndCertifications}) => {
  // Get categories and their data
  const categories = Object.keys(topSkillsAndCertifications || {});
  
  // Create sections using first 3 categories
  const sections = categories.slice(0, 3).map(category => ({
    title: category.toUpperCase(),
    items: topSkillsAndCertifications[category].map(item => item.courseTitle)
  }));

  // Create bottom sections using next 3 categories
  const bottomSections = categories.slice(3, 6).map(category => ({
    title: category.toUpperCase(),
    items: topSkillsAndCertifications[category].map(item => item.courseTitle)
  }));

  // If there aren't enough categories, fill with defaults
  while (sections.length < 3) {
    sections.push({
      title: "ADDITIONAL SKILLS",
      items: ["No courses available"]
    });
  }

  while (bottomSections.length < 3) {
    bottomSections.push({
      title: "ADDITIONAL SKILLS",
      items: ["No courses available"]
    });
  }

  return (
    <div className="bg-[#374151] py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white text-center mb-8 sm:mb-12 lg:mb-16">
          Explore top skills and certifications
        </h2>

        {/* Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-[#3c4656] rounded-lg p-4 sm:p-5 lg:p-6">
              <h3 className="text-white font-medium text-base sm:text-lg mb-4 sm:mb-5 lg:mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {section.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex} 
                    className="flex items-center justify-between text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer group"
                  >
                    <span className="text-xs sm:text-sm pr-2">{item}</span>
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 opacity-100 transition-opacity duration-200 flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {bottomSections.map((section, index) => (
            <div key={index} className="bg-[#3c4656] rounded-lg p-4 sm:p-5 lg:p-6">
              <h3 className="text-white font-medium text-base sm:text-lg mb-4 sm:mb-5 lg:mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {section.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex} 
                    className="flex items-center justify-between text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer group"
                  >
                    <span className="text-xs sm:text-sm pr-2">{item}</span>
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 opacity-100 transition-opacity duration-200 flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exploretopskills;