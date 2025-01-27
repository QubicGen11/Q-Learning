const Exploretopskills = ({ exploreTopSkillsAndCertifications }) => {
  // Log the API response for debugging
  console.log("API Response - exploreTopSkillsAndCertifications:", exploreTopSkillsAndCertifications);

  // Provide a fallback for undefined or null data
  if (!exploreTopSkillsAndCertifications || typeof exploreTopSkillsAndCertifications !== 'object') {
    return (
      <div className="bg-[#374151] py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white text-center mb-8 sm:mb-12 lg:mb-16">
            Explore top skills and certifications
          </h2>
          <p className="text-center text-gray-400">No data available to display.</p>
        </div>
      </div>
    );
  }

  // Define sections to display
  const sections = [
    { key: 'certifiedCourses', title: 'Certified Courses' },
    { key: 'diverseCourses', title: 'Diverse Courses' },
    { key: 'masterSkills', title: 'Master Skills' },
    { key: 'trendingSkills', title: 'Trending Skills' },
    { key: 'unlockPotential', title: 'Unlock Potential' }
  ];

  return (
    <div className="bg-[#374151] py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white text-center mb-8 sm:mb-12 lg:mb-16">
          Explore top skills and certifications
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map(section => (
            <div key={section.key} className="bg-[#1F2937] rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {exploreTopSkillsAndCertifications[section.key]?.map(course => (
                  <li key={course.id} className="group flex items-center justify-between hover:bg-[#4B5563] rounded-lg p-2 transition-colors duration-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs sm:text-sm text-gray-300">{course.courseName}</span>
                    </div>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-300"
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
