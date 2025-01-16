import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { CiFilter } from 'react-icons/ci';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import CoursePreviewOffcanvas from './CoursePreviewOffcanvas';

const ReviewAndApproval = () => {
  const [activeTab, setActiveTab] = useState('Courses');
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const tableData = [
    { courseName: "Course Name", tagLine: "tagline of the course c...", category: "Design", subCategory: "Sub Category Name", language: "Teaching in this Course", instructor: "Instructor Name" },
    { courseName: "Course Name", tagLine: "tagline of the course c...", category: "Development", subCategory: "Sub Category Name", language: "Teaching in this Course", instructor: "Instructor Name" },
    { courseName: "Course Name", tagLine: "tagline of the course c...", category: "Music", subCategory: "Sub Category Name", language: "Teaching in this Course", instructor: "Instructor Name" },
    { courseName: "Course Name", tagLine: "tagline of the course c...", category: "LeaderShip", subCategory: "Sub Category Name", language: "Teaching in this Course", instructor: "Instructor Name" },
    { courseName: "Course Name", tagLine: "tagline of the course c...", category: "Communication", subCategory: "Sub Category Name", language: "Teaching in this Course", instructor: "Instructor Name" },
    { courseName: "Course Name", tagLine: "tagline of the course c...", category: "Generative AI", subCategory: "Sub Category Name", language: "Teaching in this Course", instructor: "Instructor Name" },
    { courseName: "Course Name", tagLine: "tagline of the course c...", category: "Civil Softwares", subCategory: "Sub Category Name", language: "Teaching in this Course", instructor: "Instructor Name" },
    { courseName: "Course Name", tagLine: "tagline of the course c...", category: "Dance", subCategory: "Sub Category Name", language: "Teaching in this Course", instructor: "Instructor Name" },
    { courseName: "Course Name", tagLine: "tagline of the course c...", category: "Devotional", subCategory: "Sub Category Name", language: "Teaching in this Course", instructor: "Instructor Name" },
  ];

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setIsOffcanvasOpen(true);
    console.log("success");
  };

  return (
    <div className="bg-white rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Review and Approval</h2>
      
      {/* Tabs */}
      <div className="border-b mb-4">
        <div className="flex gap-1 ">
          <button 
            className={`w-auto h-[33px] text-[16px] py-[4px] px-[16px] px-1 ${activeTab === 'Courses' ? 'text-black border-b-2 border-[#0056B3] bg-[#f2f9ff] ' : 'text-gray-500 bg-[#F3F4F6]'}`}
            onClick={() => setActiveTab('Courses')}
          >
            Courses
          </button>
          <button 
            className={`w-auto h-[33px] text-[16px] py-[4px] px-[16px] px-1 ${activeTab === 'Skills Assessments' ? 'text-black border-b-2 border-[#0056B3] bg-[#f2f9ff] ' : 'text-gray-500 bg-[#F3F4F6]'}`}
            onClick={() => setActiveTab('Skills Assessments')}
          >
            Skills Assessments
          </button>
        </div>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative h-[40px] max-w-[300px]">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border rounded w-[300px]"
          />
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="flex gap-2 font-[400px]">
          <button className="text-[#0056B3] text-[16px] bg-gray-100 px-4 py-2 h-[40px]">Modify</button>
          <button className="text-[#0056B3] text-[16px] bg-gray-100 px-4 py-2 h-[40px]">Ask for Re-Submit</button>

          <button className="bg-[#0056B3] text-[16px] text-[#F5F5F5] px-4 py-2 rounded h-[40px] flex items-center gap-2"><FaRegCheckCircle className='text-[16px] w-[20px] h-[20px] font-bold' /> Approve</button>
          <button className="text-[#0056B3] text-[16px] bg-gray-100 px-4 py-2 rounded flex items-center gap-2 h-[40px]">
          <FiFilter  className=' text-[16px] w-[20px] h-[20px] font-bold' />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="w-10 py-3 px-4">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="text-left py-3 px-4">Course Name</th>
              <th className="text-left py-3 px-4">Tag Line</th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-left py-3 px-4">Sub Category</th>
              <th className="text-left py-3 px-4">Language</th>
              <th className="text-left py-3 px-4">Instructor</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td 
                  className="py-3 px-4 text-[#0056B3] cursor-pointer hover:underline"
                  onClick={() => handleCourseClick(row)}
                >
                  {row.courseName}
                </td>
                <td className="py-3 px-4 text-[#0056B3]">{row.tagLine}</td>
                <td className="py-3 px-4">
                  <select className="border rounded px-2 py-1 w-full">
                    <option>{row.category}</option>
                  </select>
                </td>
                <td className="py-3 px-4">{row.subCategory}</td>
                <td className="py-3 px-4">{row.language}</td>
                <td className="py-3 px-4 text-[#0056B3]">{row.instructor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CoursePreviewOffcanvas 
        isOpen={isOffcanvasOpen}
        onClose={() => setIsOffcanvasOpen(false)}
        course={selectedCourse}
      />

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button className="px-2 py-1">Previous</button>
        <button className="w-8 h-8 rounded-full bg-[#0056B3] text-white flex items-center justify-center">1</button>
        <button className="w-8 h-8 rounded-full text-gray-600 flex items-center justify-center">2</button>
        <button className="w-8 h-8 rounded-full text-gray-600 flex items-center justify-center">3</button>
        <span className="text-gray-600">...</span>
        <button className="w-8 h-8 rounded-full text-gray-600 flex items-center justify-center">8</button>
        <button className="w-8 h-8 rounded-full text-gray-600 flex items-center justify-center">9</button>
        <button className="px-2 py-1">Next</button>
      </div>
    </div>
  );
};

export default ReviewAndApproval; 