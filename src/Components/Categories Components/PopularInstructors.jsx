import React from 'react';

const InstructorCard = ({ courses, rating, students }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3">
        <img 
          src="https://placekitten.com/50/50" // Placeholder image - replace with actual instructor image
          alt="Instructor"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium">Jonas Schmedtmann</h3>
          <p className="text-gray-600 text-sm">UX, Visual Design</p>
        </div>
      </div>
      
      <div className="mt-3 flex items-center gap-2">
        <span className="text-white  px-2 py-1 rounded text-sm bg-[#4b5563]">
          {courses} Courses
        </span>
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm">{rating} Instructor Rating</span>
        </div>
      </div>
      
      <p className="mt-2 text-sm text-gray-600">
        {students.toLocaleString()} students learned from him
      </p>
    </div>
  );
};

const PopularInstructors = () => {
  const instructors = [
    {
      courses: 7,
      rating: 4.7,
      students: 2070742
    },
    {
      courses: 7,
      rating: 4.7,
      students: 2070742
    },
    {
      courses: 7,
      rating: 4.7,
      students: 2070742
    },
    {
      courses: 7,
      rating: 4.7,
      students: 2070742
    }
  ];

  return (
    <div className="bg-[#4b5563] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-2">Popular Instructors</h2>
        <p className="text-gray-300 mb-8">These real-world experts are highly rated by learners like you.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor, index) => (
            <InstructorCard 
              key={index}
              courses={instructor.courses}
              rating={instructor.rating}
              students={instructor.students}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularInstructors;