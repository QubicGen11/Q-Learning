import React from 'react';

const PopularTopics = () => {
  const topics = [
    { id: 1, name: 'Adobe Photoshop' },
    { id: 2, name: 'Figma' },
    { id: 3, name: 'UX Design' },
    { id: 4, name: 'Visual Design' },
    { id: 5, name: 'Design System' },
    { id: 6, name: 'Adobe' },
    { id: 7, name: 'Blender' },
    { id: 8, name: 'Animation' },
    { id: 9, name: '3D Modelling' },
    { id: 10, name: 'Web Design' },
    { id: 11, name: 'Mobile Design' },
    { id: 12, name: 'Adobe Suite' },
  ];

  return (
    <div className="bg-[#f8f9fa] py-12">
      <div className="max-w-[1400px] mx-auto px-16">
        <h2 className="text-[22px] font-medium text-gray-800 mb-8">Popular Topics</h2>
        
        <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {topics.map((topic) => (
            <button
              key={topic.id}
              className="bg-white px-4 py-3 rounded-lg text-sm text-gray-700 hover:shadow-md transition-shadow duration-300 text-center"
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularTopics;
