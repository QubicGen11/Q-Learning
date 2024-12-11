import React from 'react'
import { PiCertificate } from "react-icons/pi";
const Testimonials = () => {
    const testimonials = [
      {
        name: "Sarah Johnson",
        text: "Because of this course I was able to clear my two interviews... Thanks for making such wonderful content.",
        courseName: "Full Stack Web Development"
      },
      {
        name: "Michael Chen",
        text: "This has helped me so much in my career...I joined as a frontend engineer and eventually transitioned to full stack engineer with the help of this course.",
        courseName: "Advanced JavaScript Mastery"
      },
      {
        name: "Emily Rodriguez",
        text: "Today, I am a software developer, and I credit a significant part of my success to the solid foundation laid by this course.",
        courseName: "Python Programming Expert"
      },
      {
        name: "David Kumar",
        text: "I would highly recommend this Web Development Bootcamp to anyone interested in pursuing a career in web development or looking to enhance their skills in this field.",
        courseName: "MERN Stack Development"
      }
    ];
  
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Testimonials
          </h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm h-[280px] flex flex-col justify-between">
                {/* Header with name and LinkedIn icon */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-gray-600 font-medium">
                    {item.name}
                  </div>
                  <button className="text-[#0056b3] hover:bg-blue-50 p-1 rounded transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </button>
                </div>
  
                {/* Testimonial text */}
                <p className="text-gray-800 flex-grow">
                  "{item.text}"
                </p>
  
                {/* Footer with course name and arrow */}
                <div className="flex justify-between items-center text-gray-600 mt-4 pt-2 border-t relative top-3">
                  <div className="flex items-center gap-2">
                  <PiCertificate size={20} />
                    <span className="text-sm font-medium ">{item.courseName}</span>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  
export default Testimonials
