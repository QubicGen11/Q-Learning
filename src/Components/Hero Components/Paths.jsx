import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Paths = () => {
  const [selectedRole, setSelectedRole] = useState('Frontend Developer');

  const careerPaths = [
    {
      title: 'Frontend Developer',
      description: 'Create responsive and interactive user interfaces.',
      details: 'Frontend Developers bring designs to life using HTML, CSS, and JavaScript. They specialize in React.js and Next.js to build modern, scalable web applications with seamless user experiences. They focus on performance optimization and responsive design principles.',
      link: 'Explore Frontend Development'
    },
    {
      title: 'Backend Developer',
      description: 'Build robust server-side applications and APIs.',
      details: 'Backend Developers create secure and efficient server-side applications using Express.js, handle data with MongoDB and Prisma, and implement complex business logic. They ensure scalability, security, and optimal performance of web applications.',
      link: 'Learn about Backend Development'
    },
    {
      title: 'Full Stack Developer',
      description: 'Master both frontend and backend technologies.',
      details: 'Full Stack Developers are proficient in both client and server-side development. They work with the complete web stack: React.js/Next.js for frontend, Express.js for backend, MongoDB for databases, and implement end-to-end features.',
      link: 'Discover Full Stack Development'
    },
    {
      title: 'UI/UX Developer',
      description: 'Design and implement user-centric interfaces.',
      details: 'UI/UX Developers combine design principles with frontend technologies to create intuitive user interfaces. They use HTML, CSS, and JavaScript to implement responsive designs while ensuring optimal user experience.',
      link: 'Explore UI/UX Development'
    },
    {
      title: 'DevOps Engineer',
      description: 'Streamline development and deployment processes.',
      details: 'DevOps Engineers manage version control with Git/GitHub, implement CI/CD pipelines, and ensure smooth deployment processes. They focus on automation, monitoring, and maintaining development infrastructure.',
      link: 'Learn about DevOps'
    },
    {
      title: 'Database Specialist',
      description: 'Design and optimize database architectures.',
      details: 'Database Specialists work with MongoDB, implement data models using Prisma, and ensure efficient data operations. They focus on database design, optimization, and maintaining data integrity.',
      link: 'Explore Database Management'
    },
    {
      title: 'API Developer',
      description: 'Create and maintain robust API architectures.',
      details: 'API Developers design and implement RESTful APIs using Express.js, integrate with databases, and ensure secure data communication. They focus on API documentation, testing, and maintaining API standards.',
      link: 'Discover API Development'
    }
  ];

  const selectedCareer = careerPaths.find(path => path.title === selectedRole);

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-[150px]">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-normal mb-6">
            Explore Web Development Paths
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Behind every successful web application, there is a skilled development team. Each member 
            brings unique expertise in modern web technologies and best practices.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column - Career List */}
          <div className="md:col-span-4">
            <div className="space-y-2">
              {careerPaths.map((path) => (
                <button
                  key={path.title}
                  onClick={() => setSelectedRole(path.title)}
                  className={`w-full text-left px-4 py-3 rounded transition-colors
                    ${selectedRole === path.title 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-200'}`}
                >
                  {path.title}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-8 bg-white p-8 rounded-lg relative">
            {/* Dot Pattern Background */}
            <div className="absolute right-0 top-0 w-48 h-48 grid grid-cols-8 gap-2 opacity-10">
              {[...Array(64)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"/>
              ))}
            </div>

            <h3 className="text-2xl font-normal mb-4">
              {selectedCareer?.description}
            </h3>
            
            <p className="text-gray-600 mb-6">
              {selectedCareer?.details}
            </p>

            <Link 
              to="#" 
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              {selectedCareer?.link}
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            {/* Tech Stack Icons */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              {selectedRole === 'Frontend Developer' && (
                <>
                  <img src="https://staticcontent.cdn.contentraven.com/crcloud/pages/11218/1/en-us/images/thumb_1.png" alt="React" className="w-8 h-8" />
                  <img src="https://staticcontent.cdn.contentraven.com/crcloud/pages/11218/1/en-us/images/thumb_5.png" alt="Next.js" className="w-8 h-8" />
                </>
              )}
              {/* Add similar conditions for other roles */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paths;
