import React from 'react'

const Skillassessment = () => {
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
    }
  ]

  return (
    <div className="bg-[#f5faff] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Skills Assessments</h2>
          <a href="/viewallskillsec" className="text-blue-600 text-sm hover:underline">VIEW ALL</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <div key={assessment.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative">
                <img 
                  src={assessment.image} 
                  alt={assessment.title}
                  className="w-full h-40 object-cover"
                />
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
    </div>
  )
}

export default Skillassessment