import React, { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { CiFilter } from 'react-icons/ci';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import CoursePreviewOffcanvas from './CoursePreviewOffcanvas';
import useSuperAdminStore from '../../stores/superAdminStore';

const ReviewAndApproval = () => {
  const [activeTab, setActiveTab] = useState('Courses');
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { 
    loading, 
    currentPage,
    selectedCourses,
    fetchCoursesForReview,
    toggleCourseSelection,
    selectAllCourses,
    nextPage,
    previousPage,
    getPaginatedData,
    getTotalPages
  } = useSuperAdminStore();

  // Get current page data
  const currentCourses = getPaginatedData();
  const totalPages = getTotalPages();

  useEffect(() => {
    fetchCoursesForReview();
  }, []);

  useEffect(() => {
    if (isOffcanvasOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOffcanvasOpen]);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setIsOffcanvasOpen(true);
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
                <input 
                  type="checkbox" 
                  className="rounded"
                  onChange={selectAllCourses}
                  checked={selectedCourses.length === currentCourses.length && currentCourses.length > 0}
                />
              </th>
              <th className="text-left py-3 px-4">Course Name</th>
              <th className="text-left py-3 px-4">Tag Line</th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-left py-3 px-4">Sub Category</th>
              <th className="text-left py-3 px-4">Language</th>
              <th className="text-left py-3 px-4">Instructor</th>
              <th className="text-left py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4">Loading...</td>
              </tr>
            ) : (
              currentCourses.map((course, index) => (
                <tr key={course.id || index} className="border-b">
                  <td className="py-3 px-4">
                    <input 
                      type="checkbox" 
                      className="rounded"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => toggleCourseSelection(course.id)}
                    />
                  </td>
                  <td 
                    className="py-3 px-4 text-[#0056B3] cursor-pointer hover:underline"
                    onClick={() => handleCourseClick(course)}
                  >
                    {course.courseName}
                  </td>
                  <td className="py-3 px-4 text-[#0056B3]">{course.courseTagline}</td>
                  <td className="py-3 px-4">
                    <select className="border rounded px-2 py-1 w-full">
                      <option>{course.category}</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">{course.subCategory}</td>
                  <td className="py-3 px-4">{course.teachingLanguage}</td>
                  <td className="py-3 px-4 text-[#0056B3]">{course.trainerName}</td>
                  <td className="py-3 px-4 text-[#0056B3]">{course.status}</td>
                </tr>
              ))
            )}
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
        <button 
          className="px-2 py-1"
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button className="w-8 h-8 rounded-full bg-[#0056B3] text-white flex items-center justify-center">
          {currentPage}
        </button>
        <span className="text-gray-600">
          of {totalPages}
        </span>
        <button 
          className="px-2 py-1"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewAndApproval; 