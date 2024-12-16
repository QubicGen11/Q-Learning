import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

const RelatedCourses = () => {
    const relatedCourses = [
        {
          title: "Basic Fundamentals of User Experience Design",
          instructor: "Instructor Name",
          rating: "21",
          reviews: "418",
          price: "₹399/-",
          originalPrice: "₹1999/-",
          image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXIlMjBleHBlcmllbmNlfGVufDB8fDB8fHww",
          totalHours: "11 Total hours",
          lectures: "64 lectures",
          level: "Begginer",
          tag: "New"
        },
        {
          title: "Basic Fundamentals of User Experience Design",
          instructor: "Instructor Name",
          rating: "21",
          reviews: "418",
          price: "₹399/-",
          originalPrice: "₹1999/-",
          image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHVzZXIlMjBleHBlcmllbmNlfGVufDB8fDB8fHww",
          totalHours: "11 Total hours",
          lectures: "64 lectures",
          level: "Begginer",
          tag: "New"
        },
        {
          title: "Basic Fundamentals of User Experience Design",
          instructor: "Instructor Name",
          rating: "21",
          reviews: "418",
          price: "₹399/-",
          originalPrice: "₹1999/-",
          image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXIlMjBleHBlcmllbmNlfGVufDB8fDB8fHww",
          totalHours: "11 Total hours",
          lectures: "64 lectures",
          level: "Begginer",
          tag: "Best Seller"
        },
        {
          title: "Basic Fundamentals of User Experience Design",
          instructor: "Instructor Name",
          rating: "21",
          reviews: "418",
          price: "₹399/-",
          originalPrice: "₹1999/-",
          image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMGV4cGVyaWVuY2V8ZW58MHx8MHx8fDA%3D",
          totalHours: "11 Total hours",
          lectures: "64 lectures",
          level: "Begginer",
          tag: "Trending"
        },
    ];

    const getTagColor = (tag) => {
        switch(tag) {
            case 'New':
                return 'bg-orange-500';
            case 'Best Seller':
                return 'bg-green-500';
            case 'Trending':
                return 'bg-purple-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <>
            <div className="mt-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Related Courses</h2>
                    <button className="text-[#0073EA] text-sm font-medium">VIEW ALL</button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {relatedCourses.map((course, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md relative hover:scale-105 transition-all duration-300">
                          <div className="relative">
    <img 
        src={course.image} 
        alt={course.title} 
        className="w-full h-40 object-cover rounded-t-lg "
    />
    <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
        <AiOutlineHeart className="text-gray-600 text-xl" />
    </button>
    {/* Add price overlay */}
    <div className="absolute bottom-2 right-2 bg-white rounded px-2 py-1 flex items-center gap-1">
        <span className="text-sm font-medium text-[#0073EA]">{course.price}</span>
        <span className="text-xs line-through text-[#0073EA]">{course.originalPrice}</span>
    </div>
</div>
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`${getTagColor(course.tag)} text-white text-xs px-2 py-0.5 rounded`}>
                                        {course.tag}
                                    </span>
                                </div>
                                <h3 className="text-sm font-medium mb-1">{course.title}</h3>
                                <p className="text-xs text-gray-500 mb-1">{course.instructor}</p>
                                <div className="flex items-center gap-1 mb-1">
                                    <div className="flex">
                                        {[...Array(3)].map((_, i) => (
                                            <span key={i} className="text-yellow-400">★</span>
                                        ))}
                                        {[...Array(2)].map((_, i) => (
                                            <span key={i} className="text-gray-300">★</span>
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500">({course.rating} | {course.reviews})</span>
                                </div>
                               
                                <div className="text-xs text-gray-500">
                                    {course.totalHours} • {course.lectures} • {course.level}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default RelatedCourses