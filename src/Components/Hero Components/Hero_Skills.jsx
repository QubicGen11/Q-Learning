import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description, link, linkText }) => {
  return (
    <div className="flex flex-col max-w-sm">
      {/* Red line at top */}
      <div className="w-12 h-1 bg-[#fa4616] mb-6"></div>
      
      {/* Title */}
      <h2 className="text-3xl font-normal mb-6">
        {title}
      </h2>
      
      {/* Description */}
      <p className="text-gray-600 mb-6 leading-relaxed">
        {description}
      </p>
      
      {/* Link - only render if link props are provided */}
      {link && linkText && (
        <Link 
          to={link} 
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium"
        >
          {linkText}
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
      )}
    </div>
  );
};

const Hero_Features = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <FeatureCard 
          title="Learn skills"
          description="Stay ahead of the curve by leveling up your automation skills. Our QLearning Academy training is completely free of charge."
          link="/get-started"
          linkText="New to automation?"
        />
        
        <FeatureCard 
          title="Earn credentials"
          description="Score industry-recognized certifications and credentials, showcasing your automation skills to your peers and potential employers."
        />
        
        <FeatureCard 
          title="Join communities"
          description="Get on-demand help from automation peers, and join a lively automation community where you can learn, contribute, and have a great time."
        />
      </div>
    </div>
  );
};

export default Hero_Features;
