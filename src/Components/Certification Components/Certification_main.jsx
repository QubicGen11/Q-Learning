import React from 'react';
import { Link } from 'react-router-dom';

const CertificationSection = ({ title, subtitle, description, badgeImage, isReversed }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
      {!isReversed ? (
        <>
          {/* Left Image Section */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative group">
              {/* Glow Effect Container */}
              <div className="absolute inset-0 rounded-full 
                           dark:bg-blue-500/20 dark:group-hover:bg-blue-500/30 
                           blur-xl scale-150 opacity-0 dark:opacity-75 
                           transition-all duration-300 -z-10"></div>
              <div className="w-[400px] h-[400px] rounded-full border-8 
                           border-gray-100 dark:border-gray-700 overflow-hidden 
                           transition-transform duration-300 group-hover:scale-105">
                <img 
                  src={badgeImage || "https://images.credly.com/size/680x680/images/709ac5b7-b2fe-4ddf-8a8f-80964a837408/Pearson_PTG_MEANStac.png"}
                  alt={`${title} Certification`} 
                  className="w-full h-full object-cover 
                           dark:opacity-90 group-hover:opacity-100 
                           transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Right Content Section */}
          <div className="space-y-8">
            <ContentSection title={title} subtitle={subtitle} description={description} />
          </div>
        </>
      ) : (
        <>
          {/* Left Content Section (when reversed) */}
          <div className="space-y-8">
            <ContentSection title={title} subtitle={subtitle} description={description} />
          </div>

          {/* Right Image Section (when reversed) */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Glow Effect Container */}
              <div className="absolute inset-0 rounded-full 
                           dark:bg-blue-500/20 dark:group-hover:bg-blue-500/30 
                           blur-xl scale-150 opacity-0 dark:opacity-75 
                           transition-all duration-300 -z-10"></div>
              <div className="w-[400px] h-[400px] rounded-full border-8 
                           border-gray-100 dark:border-gray-700 overflow-hidden 
                           transition-transform duration-300 group-hover:scale-105">
                <img 
                  src={badgeImage || 'https://images.credly.com/images/6af641e2-2e22-466c-9e15-76066cf202a3/Pearson_PTG_FEWebDevrev-2.png'} 
                  alt={`${title} Certification`} 
                  className="w-full h-full object-cover 
                           dark:opacity-90 group-hover:opacity-100 
                           transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ContentSection = ({ title, subtitle, description }) => (
  <>
    <div>
      <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
        {title}
      </h2>
      <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white transition-colors duration-300">
        {subtitle}
      </h3>
    </div>

    <p className="text-gray-700 dark:text-white leading-relaxed transition-colors duration-300">
      {description}
    </p>

    {/* Review Section */}
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
        Review exam outline
      </h3>
      <p className="text-gray-700 dark:text-white transition-colors duration-300">
        Check the{' '}
        <Link to="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 
                               transition-colors duration-300">
          Exam Description Document
        </Link>
        .
      </p>
    </div>

    {/* Readiness Section */}
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
        Check your readiness
      </h3>
      <p className="text-gray-700 dark:text-white transition-colors duration-300">
        <Link to="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 
                               transition-colors duration-300">
          Take free online practice test
        </Link>
        .
      </p>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <Link 
        to="#" 
        className="bg-[#fa4616] text-white px-8 py-4 rounded text-center 
                 hover:bg-[#e03e12] transition-colors duration-200 
                 relative group"
      >
        {/* Priority Glow Effect */}
        <div className="absolute inset-0 rounded bg-[#fa4616]/50 blur-md 
                     opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
        {subtitle} Learning Plan
      </Link>
      <Link 
        to="#" 
        className="bg-gray-900 dark:bg-gray-700 text-white px-8 py-4 rounded text-center 
                 hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
      >
        Schedule your Exam
      </Link>
    </div>
  </>
);

const Certification_main = () => {
  const certifications = [
    {
      title: "Frontend Development Professional",
      subtitle: "Frontend Developer Associate",
      description: "Frontend Developer Associate is expected to have proven understanding and extensive hands-on experience with modern frontend technologies such as React.js, HTML5, CSS3, and JavaScript, with the ability to independently build or lead production-level user interfaces.",
      badgeImage: "/path-to-frontend-badge.png"
    },
    {
      title: "Backend Development Professional",
      subtitle: "Backend Developer Associate",
      description: "Backend Developer Associate is expected to have proven understanding and extensive hands-on experience with server-side technologies such as Node.js, Express.js, and databases, with the ability to independently build or lead production-level backend systems.",
      badgeImage: "/path-to-backend-badge.png"
    },
    {
      title: "Full Stack Development Professional",
      subtitle: "Full Stack Developer Associate",
      description: "Full Stack Developer Associate is expected to have proven understanding and extensive hands-on experience with both frontend and backend technologies, with the ability to independently build or lead production-level full stack applications.",
      badgeImage: "/path-to-fullstack-badge.png"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        {/* Hero Image Section */}
        <div className="w-full h-[150px] bg-[#F7F7F7] dark:bg-gray-800 mb-16 relative overflow-hidden 
                     transition-colors duration-300">
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2">
            <h1 className="text-5xl font-bold text-black dark:text-white transition-colors duration-300">
              Web Development Certifications
            </h1>
          </div>
          <img 
            src="https://staticcontent.cdn.contentraven.com/crcloud/pages/11218/1/en-us/images/botimg%201.png"
            alt="Certification Bot"
            className="absolute right-[15%] top-1/2 -translate-y-1/2 h-[100px] w-auto"
          />
        </div>

        {/* Certification Sections */}
        {certifications.map((cert, index) => (
          <CertificationSection
            key={index}
            {...cert}
            isReversed={index % 2 === 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Certification_main;
