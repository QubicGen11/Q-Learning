import React, { useRef } from 'react';
import { PiCertificate } from "react-icons/pi";
import { motion, useInView } from 'framer-motion';

const Testimonials = ({ testimonials }) => {
  // Reference for the container
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Static testimonials as fallback
  const staticTestimonials = [
    {
      userName: "Sanju Reddy Jogendar",
      linkedInUrl: "https://www.linkedin.com/in/johndoe",
      message: "This course was a game-changer for my career! Highly recommend it to anyone looking to upskill.",
      courseName: "Advanced Data Science",
    },
    {
      userName: "Shaik Hari Thomas",
      linkedInUrl: "https://www.linkedin.com/in/janesmith",
      message: "Fantastic instructors and well-structured content. Helped me land a great job!",
      courseName: "Machine Learning Essentials",
    },
    {
      userName: "Shaik Abudul Reddy",
      linkedInUrl: "https://www.linkedin.com/in/alicejohnson",
      message: "Loved the hands-on approach and real-world examples. Thank you for an amazing experience!",
      courseName: "Deep Learning Fundamentals",
    },
    {
      userName: "Prnaeeth Joseph",
      linkedInUrl: "https://www.linkedin.com/in/bobbrown",
      message: "Exceptional content! The projects were challenging yet rewarding.",
      courseName: "AI for Beginners",
    },
  ];

  // Use provided testimonials or fallback to static ones
  const displayTestimonials = testimonials?.length ? testimonials : staticTestimonials;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  if (!displayTestimonials || displayTestimonials.length === 0) {
    return (
      <motion.div 
        className="bg-gray-50 py-16"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        ref={ref}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-3xl font-semibold text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Testimonials
          </motion.h2>
          <div className="text-center text-gray-600 py-10">
            <p className="text-lg">No testimonials available at the moment.</p>
            <p className="mt-2">Be the first one to share your learning experience!</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-gray-50 py-16"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-3xl font-semibold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Testimonials
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {displayTestimonials?.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm h-[280px] flex flex-col justify-between"
              variants={cardVariants}
              whileHover="hover"
              layout
            >
              {/* Header with name and LinkedIn icon */}
              <div className="flex justify-between items-center mb-4">
                <motion.div 
                  className="text-gray-600 font-medium"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {item.userName}
                </motion.div>
                <motion.a
                  href={item.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0056b3] hover:bg-blue-50 p-1 rounded transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </motion.a>
              </div>

              {/* Testimonial text */}
              <motion.p 
                className="text-gray-800 flex-grow"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                "{item.message}"
              </motion.p>

              {/* Footer with course name and arrow */}
              <motion.div 
                className="flex justify-between items-center text-gray-600 mt-4 pt-2 border-t relative top-3"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PiCertificate size={20} />
                  </motion.div>
                  <span className="text-sm font-medium">{item.courseName}</span>
                </div>
                <motion.svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </motion.svg>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Testimonials;
