import './SkillsHomepage.css'
const SkillsHomepage = () => {
  const categories = [
    "Design", "Data Science", "Web Development", "Civil Engineering", 
    "Electronics", "Chip Level", "Communication", "IT Certifications", 
    "Leadership", "Photography"
  ];

  const designCourses = [
    {
      title: "Web Design",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1733726886/image-2_qyye1q.png"
    },
    {
      title: "2D Animation",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1733726885/image_fbx6gp.png"
    },
    {
      title: "Motion Design",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1733726887/image-3_vrgrlf.png"
    },
    {
      title: "UX-UI Design",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1733726887/image-5_u4mnm5.png"
    },
    {
      title: "Basic Fundamentals",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png"
    },
    {
      title: "Arts & Crafts",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png"
    }
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-20 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        SKILLS FOR YOUR PRESENT (AND YOUR FUTURE)
      </h2>
      
      {/* Categories Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide space-x-6 mb-8 pb-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-all duration-300 ${
              index === 0 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Design Courses Section */}
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-xl text-gray-700 font-medium">Design Courses</h3>
        <button className="text-blue-600 hover:text-blue-700 bg-white px-4 py-2 rounded-md border border-blue-600 transition-all duration-300 hover:bg-blue-50">
          View all Web Design Courses
        </button>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {designCourses.map((course, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="text-center text-gray-800 text-sm font-medium">{course.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsHomepage;