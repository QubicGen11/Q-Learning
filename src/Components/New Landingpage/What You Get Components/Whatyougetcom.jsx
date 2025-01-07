import React from 'react'

const Whatyougetcom = () => {
  const features = [
    {
      title: "Online Courses",
      image: "https://res.cloudinary.com/defsu5bfc/image/upload/v1736253423/Component1_bgeonr.png", // Replace with your image path
      link: "/courses"
    },
    {
      title: "Skill Assessments",
      image: "https://res.cloudinary.com/defsu5bfc/image/upload/v1736253423/Component2_o2xy85.png", // Replace with your image path
      link: "/assessments"
    },
    {
      title: "Live Sessions",
      image: "https://res.cloudinary.com/defsu5bfc/image/upload/v1736253423/Component3_ppyr0g.png", // Replace with your image path
      link: "/live-sessions"
    }
  ];

  return (
    <div className="bg-[#f3f4f6] py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-[#4B5563] mb-4">
            QubiNest a Product from QubicGen Company
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto text-center font-normal text-md">
            QubiNest gives a wide variety of ways to learn new interested skills and upgrading of a existing skills to reach a better position both personally and professionally. One can gain knowledge through courses by subscribing, skill assessment by doing the quiz etc., and registering to live sessions from top and best instructors
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                {/* Image Container */}
                <div className="h-64 relative overflow-hidden group bg-[#f3f4f6]">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-[403px] h-[225px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                  {/* Overlay with hover effect */}
               
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Whatyougetcom
