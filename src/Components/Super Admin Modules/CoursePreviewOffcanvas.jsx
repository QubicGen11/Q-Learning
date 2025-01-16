import React from 'react';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { IoExpandOutline } from "react-icons/io5";

const CoursePreviewOffcanvas = ({ isOpen, onClose, course }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0  z-[1000]"
          onClick={onClose}
        />
      )}

      {/* Sliding Panel */}
      <div 
        className={`fixed top-16 right-0 h-[calc(100vh-64px)] w-[530px] bg-white shadow-lg z-[1001] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 left-0 right-0 bg-white z-10 px-4 py-3 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-[18px] font-medium tetx-[#1F2A37] font-[700]">[Course] Preview</h1>
            <div className="flex gap-2">
              <button className="text-gray-600">
                <AiOutlineExpandAlt className='text-[18px] text-[#1F2A37] font-bold' />
              </button>
              <button 
                onClick={onClose}
                className="text-gray-600"
              >
                <IoClose size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 text-[13px]">
          <div className="flex justify-between">
            <label className="block text-gray-600 mb-1 font-[600] w-[130px]">Course Name</label>
            <div className="text-gray-600 font-[500] w-[290px] ml-auto text-end">[Course Name]</div>
          </div>

          <div className="flex justify-between">
            <label className="block text-gray-600 mb-1 font-[600] w-[130px]">Tagline</label>
            <div className="text-gray-600 font-[500] w-[290px] ml-auto text-end">
              Engage with expert instructors in real-time through interactive
            </div>
          </div>

          <div className="flex justify-between">
            <label className="block text-gray-600 mb-1 font-[600] w-[130px]">Category</label>
            <select className=" text-right appearance-none bg-transparent w-[290px] ml-auto">
              <option>Design</option>
            </select>
          </div>

          <div className="flex justify-between">
            <label className="block text-gray-600 mb-1 font-[600] w-[130px]">Sub-Category</label>
            <select className=" text-right appearance-none bg-transparent w-[290px] ml-auto">
              <option>Sub-Category</option>
            </select>
          </div>

          <div className="flex justify-between">
            <label className="block text-gray-600 mb-1 font-[600] w-[130px]">Language</label>
            <div className="text-gray-600 font-[500] w-[290px] ml-auto text-end">Teaching in [Language]</div>
          </div>

          <div className="flex justify-between">
            <label className="block text-gray-600 mb-1 font-[600] w-[130px]">Instructor</label>
            <div className="text-[#0056B3] font-[500] w-[290px] ml-auto text-end underline">Instructor Name</div>
          </div>

          <div className="">
            <label className="block text-gray-600 mb-1 font-[600]">Specify Reason to ask for Re-Submit</label>
            <textarea
              className="w-full border rounded p-2 h-24 text-[13px] resize-none"
              placeholder="Enter Reason Here"
            />
          </div>

          <button className="text-gray-600 text-[14px] bg-[#E5E7EB] rounded px-[6px] py-[8px] font-[400]">
            Send Comment
          </button>

          <div className="pt-3">
            <button className="text-[#0056B3] text-[14px] w-full text-center bg-gray-100 py-2  font-[400] rounded-[100px]">
              Expand Preview for all details
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white ">
          <button className="w-auto flex items-center gap-[8px] bg-[#0056B3] text-white  rounded text-[13px] h-[40px] py-[6px] px-[16px]">
          <FaRegCheckCircle className='text-[16px] w-[16px] h-[20px] font-bold' />
            Approve
          </button>
        </div>
      </div>
    </>
  );
};

export default CoursePreviewOffcanvas; 