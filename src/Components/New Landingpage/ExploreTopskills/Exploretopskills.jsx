const Exploretopskills = ({ topSkillsAndCertifications }) => {
  // Log the API response for debugging
  console.log("API Response - topSkillsAndCertifications:", topSkillsAndCertifications);

  // Provide a fallback for undefined or null data
  if (!topSkillsAndCertifications || typeof topSkillsAndCertifications !== 'object') {
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

  // Get categories and their data
  const categories = Object.keys(topSkillsAndCertifications);

  // Map over categories to create sections
 

  return (
    <div className="bg-[#374151] py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white text-center mb-8 sm:mb-12 lg:mb-16">
          Explore top skills and certifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-[#3c4656] rounded-lg p-4 sm:p-5 lg:p-6">
              <h3 className="text-white font-medium text-base sm:text-lg mb-4 sm:mb-5 lg:mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {section.courses.length > 0 ? (
                  section.courses.map((course, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center justify-between text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer group"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm pr-2">{course.courseName}</span>
                      </div>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
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
                  ))
                ) : (
                  <li className="text-gray-400 text-xs sm:text-sm">No courses available</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exploretopskills;
