import React from 'react';
import { Link } from 'react-router-dom';

const EcosystemCard = ({ Icon, title, description, imageSrc }) => {
  return (
    <div className="flex flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg transition-colors duration-300">
      {/* Image container with glow effect */}
      <div className="flex-shrink-0 relative group">
        {/* Glow effect background - only visible in dark mode */}
        <div className="absolute inset-0 dark:bg-blue-500/20 dark:group-hover:bg-blue-500/30 
                        rounded-full blur-xl scale-150 opacity-0 dark:opacity-100 
                        transition-all duration-300 -z-10"></div>
        
        {/* Image */}
        <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg p-2 
                        transition-transform duration-300 group-hover:scale-105">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain 
                       dark:opacity-90 transition-opacity duration-300
                       group-hover:opacity-100" 
          />
        </div>
      </div>
      
      {/* Text content */}
      <div className="flex flex-col">
        <h3 className="text-xl sm:text-2xl font-normal mb-2 sm:mb-4 
                       text-gray-900 dark:text-white transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 
                      leading-relaxed transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

const Educational_Ecosystem = () => {
  return (
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-[150px] bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Main Heading */}
      <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal mb-4 sm:mb-6 lg:mb-8 text-gray-900 dark:text-white transition-colors duration-300">
          Leverage our entire educational ecosystem
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
          Our educational ecosystem is the central hub for every step of your automation career. 
          Get guidance on the career and skills that best align with your interests and abilities. 
          Start your chosen path with our free online Academy training. Earn industry-recognized 
          credentials to prove your new abilities. Get the support you need from our Docs, Forum, 
          and Community.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
        <EcosystemCard
          imageSrc="https://staticcontent.cdn.contentraven.com/crcloud/pages/11218/1/en-us/images/White%20Paper.png"
          title="Documentation"
          description="Explore UiPath product documentation and guides."
        />
        <EcosystemCard
          imageSrc="https://staticcontent.cdn.contentraven.com/crcloud/pages/11218/1/en-us/images/certifi.png"
          title="Certifications"
          description="Lead the future of work. Become a UiPath Certified Professional."
        />
        <EcosystemCard
          imageSrc="https://staticcontent.cdn.contentraven.com/crcloud/pages/11218/1/en-us/images/Generic.png"
          title="Forum"
          description="Ask questions, find just-in-time solutions, help others get unstuck."
        />
        <EcosystemCard
          imageSrc="https://staticcontent.cdn.contentraven.com/crcloud/pages/11218/1/en-us/images/Blog%20Post.png"
          title="Community"
          description="Network with like-minded professionals. Learn and innovate collectively."
        />
      </div>

      {/* Bot Image */}
      <div className="flex justify-end mt-8 sm:mt-12 px-4">
        <img 
          src="https://res.cloudinary.com/defsu5bfc/image/upload/v1714828410/logo_3_jizb6b.png"
          alt="Friendly bot" 
          style={{rotate: '0deg'}}
          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 animate-bounce dark:opacity-90 "
        />
      </div>
    </div>
  );
};

export default Educational_Ecosystem;
