import React from 'react'

const EducationAspiration = () => {
    const aspirations = [
      {
        title: "Hands-On Learning",
        image: "https://res.cloudinary.com/devewerw3/image/upload/v1733734811/image_17_hkhoan.png"
      },
      {
        title: "Certification Prep",
        image: "https://res.cloudinary.com/devewerw3/image/upload/v1733734810/image_18_z6cezz.png"
      },
      {
        title: "Analytics and Insights",
        image: "https://res.cloudinary.com/devewerw3/image/upload/v1733734811/image_19_c54qpo.png"
      },
      {
        title: "Collaborative Learning",
        image: "https://res.cloudinary.com/devewerw3/image/upload/v1733734810/image_20_qrfyld.png"
      }
    ];
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold mb-12">
          Education tailored to your aspirations.
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aspirations.map((item, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </div>
              <h3 className="text-center text-lg font-medium">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default EducationAspiration;


