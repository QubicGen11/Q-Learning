import React, { useState } from 'react';

const CourseDesc = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const description = {
    main: "User Experience, or UX, is an exciting field. It's essentially about empowering people to do the things they want to do, which is both fun and gratifying. And, having a great user experience drives business success.",
    details: "Learning UX, however, can be a challenge. Since it's a relatively young field, there's no real gold standard yet for how things are practiced, or taught, which can frustrate people who are just trying to learn things the right way, in order to apply UX immediately...",
    fullText: `User Experience, or UX, is an exciting field. It's essentially about empowering people to do the things they want to do, which is both fun and gratifying. And, having a great user experience drives business success.

    Learning UX, however, can be a challenge. Since it's a relatively young field, there's no real gold standard yet for how things are practiced, or taught, which can frustrate people who are just trying to learn things the right way, in order to apply UX immediately.

    This course is designed to give you real, practical UX knowledge that you can start using right away. Instead of focusing on buzzwords and theory, we'll look at real examples from real products to help you understand how UX works in the real world.

    By the end of this course, you'll have:
    • A solid understanding of what UX is and why it matters
    • Practical skills you can use in your own projects
    • Real-world examples to learn from
    • A clear path to starting your UX career`
  };

  return (
    <div className="w-full bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Description</h2>
          
          <div className="w-full">
            <div className={`space-y-4 ${isExpanded ? '' : 'line-clamp-3'}`}>
              <p>{description.main}</p>
              {isExpanded && (
                <>
                  <p>{description.details}</p>
                  <div className="whitespace-pre-line">
                    {description.fullText}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#0056B3] font-medium mt-2 hover:underline focus:outline-none"
            >
              {isExpanded ? 'READ LESS' : 'READ MORE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDesc;