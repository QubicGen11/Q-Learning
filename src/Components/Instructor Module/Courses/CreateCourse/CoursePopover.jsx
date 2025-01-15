import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiSend, FiPlus } from "react-icons/fi";
import { TbUserX } from "react-icons/tb";
import { Popover, Checkbox } from "@mui/material";
import { IoClose } from "react-icons/io5";

const CoursePopover = ({ isOpen, onClose, course }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
    setIsPopoverOpen(true);
  };



  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[999]"
          onClick={onClose}
        />
      )}

      {/* Sliding Panel */}
      <div 
        className={`fixed top-[60px] right-0 h-[calc(100vh-60px)] w-[530px] bg-white shadow-lg z-[1000] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header - Fixed */}
        <div className="absolute top-0 left-0 right-0 bg-white z-10 px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{course?.name || 'Course Name'}</h1>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <IoClose 
                size={24} 
                className="text-gray-600"
              />
            </button>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="h-full overflow-y-auto pt-[72px] pb-[80px]"> {/* Added padding for header and footer space */}
          <div className="p-6">
            {/* Course Details */}
            <div className="mt-2">
              <div className="flex gap-[12px] items-center mb-4">
                <button className="px-[8px] py-[6px] w-[120px] h-[32px] bg-[#F3F4F6] text-[#0056B3] rounded-[4px] flex justify-center items-center text-xs gap-[8px]">
                  <FiEdit2 className="text-sm" />EditCourse
                </button>
                <button className="px-[8px] py-[6px] h-[32px] w-[181px] rounded-[4px] bg-[#F3F4F6] text-[#DC3545] justify-center flex items-center gap-[8px] text-xs">
                  <FiTrash2 className="text-sm" /> Delete Entire Course
                </button>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-semibold">Status</div>
                <div className="text-sm text-right">
                  <span className="px-3 py-1 text-[#F5F5F5] bg-[#0056B3] rounded-[4px]">
                    {course?.status || 'Sent for Review'}
                  </span>
                </div>
                <div className="text-sm font-semibold">Enrolled Students</div>
                <div className="text-sm text-right">{course?.enrolledStudents || '32'}</div>
                <div className="text-sm font-semibold">Description</div>
                <div className="text-sm text-right">{course?.description || 'Placeholder Text'}</div>
                <div className="text-sm font-semibold">Added On</div>
                <div className="text-sm text-right">{course?.addedOn || 'DD-MM-YYYY'}</div>
                <div className="text-sm font-semibold">Published On</div>
                <div className="text-sm text-right">{course?.publishedOn || 'DD-MM-YYYY'}</div>
              </div>
            </div>

            {/* Collaborators Section */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-sm">Collaborators</h2>
                <div className="flex gap-2">
                  <button className="px-3 h-[32px] w-[80px] bg-[#F3F4F6] text-[#0056B3] rounded-[4px] justify-center flex items-center gap-[8px] text-sm">
                    <FiSend /> Invite
                  </button>
                  <button className="px-[8px] py-[6px] h-[32px] w-[129px] bg-[#F3F4F6] text-[#0056B3] rounded-[4px] text-sm">
                    Give Permissions
                  </button>
                  <button
                    className="px-3 h-[32px] bg-[#F3F4F6] text-[#DC3545] text-xl rounded-[4px]"
                    onClick={handleOpenPopover}
                  >
                    <TbUserX />
                  </button>
                </div>
              </div>
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-2 py-2 text-center">
                      Select
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Collaborator Name
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Email ID
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(4)].map((_, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <input type="checkbox" />
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        Collaborator Name
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        name@example.com
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Latest Comments Section */}
            <div className="mt-6">
              <h2 className="font-bold text-xl mb-4">Latest Comments from QubiNest</h2>
              <div className="text-sm rounded-[4px]">
                <p className="font-semibold">QubiNest Admin</p>
                <p className="mt-2">
                  Thank you for submitting your course, [Course Title], for review.
                  While the structure and content meet our standards, we recommend
                  adding interactive elements and refining audio quality for better
                  engagement. Once updated, please resubmit for approval.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="absolute bottom-0 left-0 right-0 bg-white py-4 border-t border-gray-200">
          <div className="flex justify-center gap-[8px]">
            <button className="px-[8px] py-[6px] h-[40px] w-[196px] bg-[#0056B3] text-[#F5F5F5] rounded-[4px] text-sm">
              Re-Submit for Review
            </button>
            <button className="px-[8px] py-[6px] h-[40px] w-[213px] bg-[#0056B3] text-[#F5F5F5] rounded-[4px] text-sm flex justify-center items-center gap-[8px]">
              <FiPlus className="items-center" />Add Another Course
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePopover;
 
