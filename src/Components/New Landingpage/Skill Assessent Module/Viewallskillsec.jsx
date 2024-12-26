import React from 'react'
import Newnavbar from '../New Navbar Components/Newnavbar';
import PopularTopics from '../../Categories Components/PopularTopics';
import PopularInstructors from '../../Categories Components/PopularInstructors';
import Footer from '../Footer/Footer';

const Viewallskillsec = () => {
  const categories = [
    "UX Design",
    "Web Design",
    "Graphic Design & Illustration",
    "Design Tools",
    "Game Design",
    "3D Animation",
    "Fashion Design",
    "Architectural Design",
    "Leadership"
  ];

  const assessments = [
    {
      id: 1,
      title: "Evaluate your knowledge on HTML & CSS",
      instructor: "Instructor Name",
      price: "₹91/-",
      originalPrice: "₹239/-",
      tag: "High Valued Skill",
      tagColor: "bg-teal-500",
      image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Evaluate your knowledge on HTML & CSS",
      instructor: "Instructor Name",
      tag: "Trending",
      tagColor: "bg-purple-500",
      enrollType: "ENROL FOR FREE",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Evaluate your knowledge on HTML & CSS",
      instructor: "Instructor Name",
      tag: "Best in Content",
      tagColor: "bg-green-500",
      enrollType: "ENROL FOR FREE",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Evaluate your knowledge on HTML & CSS",
      instructor: "Instructor Name",
      tag: "Best in Content",
      tagColor: "bg-green-500",
      enrollType: "ENROL FOR FREE",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Evaluate your knowledge on HTML & CSS",
      instructor: "Instructor Name",
      price: "₹91/-",
      originalPrice: "₹239/-",
      tag: "High Valued Skill",
      tagColor: "bg-teal-500",
      image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Evaluate your knowledge on HTML & CSS",
      instructor: "Instructor Name",
      tag: "Trending",
      tagColor: "bg-purple-500",
      enrollType: "ENROL FOR FREE",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=500&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
        <Newnavbar/>
      {/* Header */}
      <div className="bg-[#004DB3] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-semibold text-center mb-2">Skills Assessment</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span>Home</span>
            <span>{'>'}</span>
            <span>Skills Assessment</span>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={index}
                className="text-gray-600 hover:text-gray-900 whitespace-nowrap text-sm"
              >
                {category}
              </button>
            ))}
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2">
              <span className="material-icons">more_horiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">UX Design</h2>
        </div>

        {/* Grid of Assessment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <div key={assessment.id} className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="relative">
                <img 
                  src={assessment.image} 
                  alt={assessment.title}
                  className="w-full h-40 object-cover"
                />
                <button className="absolute top-3 right-3 text-white">
                  <span className="material-icons">favorite_border</span>
                </button>
                <span className={`absolute top-3 left-3 ${assessment.tagColor} text-white text-xs px-2 py-1 rounded`}>
                  {assessment.tag}
                </span>
              </div>
              
              <div className="p-4">
                <h3 className="text-sm font-medium mb-1">{assessment.title}</h3>
                <p className="text-gray-500 text-xs mb-3">{assessment.instructor}</p>
                
                <div className="flex items-center justify-between">
                  {assessment.price ? (
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 font-medium">{assessment.price}</span>
                      <span className="text-gray-400 text-sm line-through">{assessment.originalPrice}</span>
                    </div>
                  ) : (
                    <button className="text-gray-500 text-sm hover:text-gray-700">
                      {assessment.enrollType}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PopularTopics/>
      <PopularInstructors/>
      <Footer/>
    </div>
  )
}

export default Viewallskillsec