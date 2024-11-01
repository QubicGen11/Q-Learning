import React from 'react';
import { Link } from 'react-router-dom';
import './Careerpaths_main.css';

const CareerCard = ({ image, title, salary, description, actionText }) => {
  return (
    <div className="flex flex-col items-center text-center mb-16 px-6 
                    bg-white dark:bg-gray-800 hover:shadow-lg 
                    dark:hover:shadow-blue-500/10 transition-all duration-300 
                    rounded-lg max-w-[300px] mx-auto p-6 group
                    border border-gray-100 dark:border-gray-700">
      {/* Image Container with Glow Effect */}
      <div className="relative mb-4">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full 
                      dark:bg-blue-500/20 dark:group-hover:bg-blue-500/30 
                      blur-xl scale-150 opacity-0 dark:opacity-75 
                      transition-all duration-300 -z-10"></div>
        <img 
          src={image} 
          alt={title} 
          className="rounded-full relative z-10 
                     dark:opacity-90 group-hover:opacity-100
                     transition-all duration-300
                     group-hover:scale-105"
        />
      </div>

      <div className="mb-2">
        <div className="text-gray-600 dark:text-white mb-1 text-sm">
          US Average Starting Salary:
        </div>
        <div className="font-semibold text-lg text-gray-900 dark:text-white">
          ${salary}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-white mb-4 text-sm">
        {description}
      </p>

      <Link 
        to="#" 
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 
                 dark:hover:text-blue-300 flex items-center gap-2 text-sm
                 transition-colors duration-300 group"
      >
        {actionText}
        <svg 
          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
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
    </div>
  );
};

const Careerpaths_main = () => {
  const careers = [
    {
      image: "https://staticcontent.cdn.contentraven.com/crcloud/pages/11218/1/en-us/images/thumb_2.png",
      title: "Frontend Developer",
      salary: "85,000",
      description: "Specializes in creating responsive user interfaces using HTML, CSS, JavaScript, React.js, and modern frontend frameworks.",
      actionText: "Explore Frontend Development"
    },
    {
      image: "https://staticcontent.cdn.contentraven.com/crcloud/pages/11218/1/en-us/images/thumb_3.png",
      title: "Backend Developer",
      salary: "92,000",
      description: "Builds server-side applications using Node.js, Express.js, and manages databases with MongoDB and Prisma.",
      actionText: "Discover Backend Development"
    },
    {
      image: "https://staticcontent.cdn.contentraven.com/crcloud/pages/11218/1/en-us/images/thumb_1.png",
      title: "Full Stack Developer",
      salary: "98,000",
      description: "Masters both frontend and backend technologies, capable of building complete web applications from start to finish.",
      actionText: "Master Full Stack Development"
    },
    {
      image: "https://staticcontent.cdn.contentraven.com/crcloud/pages/11218/1/en-us/images/thumb_4.png",
      title: "DevOps Engineer",
      salary: "105,000",
      description: "Manages deployment, version control with Git/GitHub, and maintains development infrastructure.",
      actionText: "Learn DevOps Practices"
    },
    {
      image: "https://staticcontent.cdn.contentraven.com/crcloud/pages/11218/1/en-us/images/thumb_5.png",
      title: "UI/UX Developer",
      salary: "88,000",
      description: "Creates user-friendly interfaces and experiences while implementing modern design principles in code.",
      actionText: "Explore UI/UX Development"
    },
    {
      image: "https://staticcontent.cdn.contentraven.com/crcloud/pages/11218/1/en-us/images/test-automation-engineer.png",
      title: "Web Security Specialist",
      salary: "95,000",
      description: "Focuses on implementing security best practices and protecting web applications from vulnerabilities.",
      actionText: "Learn Web Security"
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-16 bg-white dark:bg-gray-900 
                    transition-colors duration-300">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="w-16 h-1 bg-red-500 mx-auto mb-6"></div>
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Build Your Web Development Career
        </h2>
        <p className="text-gray-600 dark:text-white max-w-2xl mx-auto text-lg">
          Discover the various roles in web development, their required skillsets, 
          and potential career paths. From frontend to backend, find your perfect 
          fit in the world of web development.
        </p>
      </div>

      {/* Career Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 
                    justify-items-center">
        {careers.map((career, index) => (
          <CareerCard
            key={index}
            image={career.image}
            title={career.title}
            salary={career.salary}
            description={career.description}
            actionText={career.actionText}
          />
        ))}
      </div>
    </div>
  );
};

export default Careerpaths_main;
