import React, { useState, useEffect } from "react";
import CoursePopover from "./CreateCourse/CoursePopover";

import { HiArrowsUpDown } from "react-icons/hi2";

import { FiFilter, FiSend } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "react-responsive-pagination/themes/classic.css";
import { SlPencil } from "react-icons/sl";
import { MdOutlineAdd } from "react-icons/md";
import './Coursepage.css'
import useCourseStore from "../../../stores/courseStore";



 
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`w-8 h-8 rounded-full ${
          currentPage === 1 ? 'bg-[#0056B3] text-white' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        1
      </button>
    );

    if (currentPage > 3) {
      pages.push(<span key="ellipsis1" className="text-gray-400">...</span>);
    }

    // Show current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip if it's first or last page
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 rounded-full ${
            currentPage === i ? 'bg-[#0056B3] text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      pages.push(<span key="ellipsis2" className="text-gray-400">...</span>);
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`w-8 h-8 rounded-full ${
            currentPage === totalPages ? 'bg-[#0056B3] text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-gray-600 hover:text-gray-800 disabled:opacity-50 flex items-center gap-1"
      >
        <IoIosArrowBack size={16} />
        Previous
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-gray-600 hover:text-gray-800 disabled:opacity-50 flex items-center gap-1"
      >
        Next
        <IoIosArrowForward size={16} />
      </button>
    </div>
  );
};

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Add back the queries state
  const [queries] = useState([
    { courseName: "Course Name 1", query: "Why is this draft?" },
    { courseName: "Course Name 2", query: "How do I publish this course?" },
    { courseName: "Course Name 3", query: "How to add collaborators?" },
  ]);

  // Get courses from store
  const { courses, loading, error, fetchCourses } = useCourseStore();

  // Fetch courses when component mounts
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const totalPages = Math.ceil(courses.length / rowsPerPage);

  // Get rows for the current page
  const paginatedCourses = courses.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const filteredCourses = paginatedCourses.filter((course) =>
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCourseClick = (course) => {
    console.log('Course clicked:', course);
    console.log('Course ID:', course.id);
    
    // Set the selected course directly without any conditions
    setSelectedCourse(course);
    console.log('Selected course after setting:', course); // Should show the course object
    setIsOffcanvasOpen(true);
  };

  return (
    <div className="container mx-auto p-6 bg-[#ffffff]">
      <h1 className="text-[18px] font-bold text-[#1F2A37]">Courses</h1>
      {/* Header */}
      <div className="flex justify-between items-center mb-5 mt-3">
        {/* Search Bar */}
        <div className="flex items-center w-[300px] h-[40px] border border-gray-200 rounded-md focus-within:ring-2 focus-within:ring-[#0056B3]">
          <input
            type="text"
            placeholder="Search Course Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full  pl-2 focus:outline-none"
          />
          <IoSearchOutline className="text-gray-500 mr-3" size={20} />
        </div>
 
        <div className="flex gap-4 ">
          <button className="px-[16px] py-[6px] gap-[8px] w-[91px] h-[40px] bg-[#F3F4F6] text-[#0056B3] rounded flex  items-center ">
          <SlPencil size={15} /> Edit
          </button>
          <button className="px-[16px] py-[6px] gap-[8px] w-[91px] h-[40px] bg-[#F3F4F6] text-[#0056B3] rounded flex  items-center">
            <FiSend size={20} /> Invite
          </button>
          <button className=" px-[16px] py-[6px] gap-[8px] w-[168px] h-[40px] bg-[#0056B3] text-[#F5F5F5] rounded flex  items-center justify-center">
            Submit for Review
          </button>
          <a href="/instructor/courses/create">
          <button className="px-[16px] py-[6px] gap-[8px] w-[150px] h-[40px] bg-[#0056B3] text-[#F5F5F5] rounded flex  items-center">
          <MdOutlineAdd size={20}/> Add Course
          </button>
          </a>
          <button className="px-[16px] py-[6px] gap-[8px] w-[91px] h-[40px] bg-[#F3F4F6] text-[#0056B3] rounded flex  items-center">
            <FiFilter size={16} /> Filter
          </button>
        </div>
      </div>
 
      {/* Courses Table */}
      {loading ? (
        <div className="text-center py-4">Loading courses...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">Error: {error}</div>
      ) : (
        <table className="w-full border-collapse border border-b-[#F3F4F6] text-left">
          <thead className="text-[#4B5563 ]">
          <tr className="border-b border-b-[#F3F4F6]">
    <th className="px-4 py-2 text-left">
      <input  type="checkbox" className=" rounded border-gray-300 
                            focus:ring-[#0056B3] focus:ring-offset-0
                            text-[#0056B3] 
                            checked:bg-[#0056B3] 
                            checked:hover:bg-[#0056B3] 
                            checked:focus:bg-[#0056B3]
                            accent-[#0056B3]"  />
    </th>
    <th className="px-4 py-2 text-left ">
      <span className="flex items-center">
        Course Name <HiArrowsUpDown className="ml-1" />
      </span>
    </th>
    <th className="px-4 py-2 text-left">
      Collaboration
    </th>
    <th className="px-4 py-2 ">
      <span className="flex items-center justify-between">
        Status <HiArrowsUpDown className="mr-5" />
      </span>
    </th>
    <th className="px-4 py-2 text-left ">
      <span className="flex items-center">
        Enrolled Students <HiArrowsUpDown className="ml-5" />
      </span>
    </th>
    <th className="px-4 py-2 text-left">
      Version
    </th>
    <th className="px-4 py-2 text-left">
      <span className="flex items-center">
        Added On <HiArrowsUpDown className="ml-3" />
      </span>
    </th>
    <th className="px-4 py-2 text-left">
      <span className="flex items-center">
        Published On <HiArrowsUpDown className="ml-1" />
      </span>
    </th>
  </tr>
 
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 border-b border-b-[#F3F4F6] h-[45px]"
                >
                  <td className="px-4 py-2 h-[40px]">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td
                    className="px-4 py-2 text-[#0056B3] cursor-pointer hover:underline"
                    onClick={() => handleCourseClick(course)}
                  >
                    {course.courseName}
                  </td>
                  <td className="px-4 py-2">{course.collaboration || 'None'}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-[8px] py-[1px] rounded h-[22px] w-[120px] ${
                        getStatusStyle(course.status)
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{course.enrolledStudents || 0}</td>
                  <td className="px-4 py-2">{course.version || '1.0'}</td>
                  <td className="px-4 py-2">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {course.publishedOn ? 
                      new Date(course.publishedOn).toLocaleDateString() : 
                      'Not published'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
 
      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
 
      {/* Bottom Section */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        {/* Recent Queries */}
        <div className="border p-6 rounded-md border-b-[#F3F4F6]">
          <div className="flex justify-between pb-3">
            <h2 className="text-lg font-bold mb-2">Recent Queries</h2>
            <button className="px-4 h-8 bg-[#F3F4F6] text-[#0056B3] rounded-md flex gap-3 items-center">
              View all in Discussion forum
            </button>
          </div>
          <table className="w-full border-collapse border border-b-[#F3F4F6] text-left">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2 bg-[#F5F5F5]">
                  Course Name
                </th>
                <th className="border border-gray-200 px-4 py-2 bg-[#F5F5F5]">
                  Query
                </th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-b-[#F3F4F6] px-4 py-2">
                    {query.courseName}
                  </td>
                  <td className="border border-b-[#F3F4F6] px-4 py-2">
                    {query.query}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
 
        {/* Members of Collaboration */}
        <div className="border p-6 rounded-md border-b-[#F3F4F6] ">
          <div className="flex justify-between">
          <h2 className="text-lg font-bold mb-2">Members of Collaboration</h2>
          <button className="px-4 h-8 bg-[#F3F4F6] text-[#0056B3] rounded-md flex gap-3 items-center">
            <FiSend /> Invite
          </button>
 
          </div>
          <div className="flex items-center gap-4 pb-10 h-full justify-center -space-x-6">
            <img
              src="https://images.unsplash.com/photo-1529527263931-a4ca4d89eabf?q=80&w=1816&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Member 1"
              className="rounded-full h-[64px] w-[64px] border-2 border-white"
            />
            <img
              src="https://media.istockphoto.com/id/1949501832/photo/handsome-hispanic-senior-business-man-with-crossed-arms-smiling-at-camera-indian-or-latin.webp?a=1&b=1&s=612x612&w=0&k=20&c=myjjInVm75nzuTTvwn1i7NjJm2hfdGIOuXW6LO1Idy4="
              alt="Member 2"
              className="rounded-full h-[64px] w-[64px] border-2 border-white"
            />
            <img
              src="https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Member 3"
              className="rounded-full h-[64px] w-[64px] border-2 border-white"
            />
            <div className="bg-[#F3F4F6] w-14 h-8 rounded-2xl text-center pt-1">+ 1</div>
          </div>
        </div>
      </div>

      <CoursePopover 
        isOpen={isOffcanvasOpen}
        onClose={() => setIsOffcanvasOpen(false)}
        course={selectedCourse}
      />
    </div>
  );
};

// Helper function for status styles
const getStatusStyle = (status) => {
  const styles = {
    PUBLISHED: "bg-white border border-[#28A745] text-[#28A745]", // Green outline for Published
    DRAFT: "bg-white border border-[#4B5563] text-[#4B5563]", // Gray outline for Draft
    NEEDS_RESUBMISSION: "bg-[#DC3545] text-white", // Red background for Needs Re-Submission
    UNPUBLISHED: "bg-white border border-[#DC3545] text-[#DC3545]", // Red outline for Unpublished
    SENT_FOR_REVIEW: "bg-white border border-[#0056B3] text-[#0056B3]", // Blue outline for Sent for Review
    PENDING_APPROVAL: "bg-white border border-[#0056B3] text-[#0056B3]", // Blue outline for Pending Approval
  };
  return styles[status] || "";
};

export default Courses;