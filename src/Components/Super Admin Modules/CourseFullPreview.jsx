import React, { useState } from 'react';
import { IoChevronBackOutline, IoClose } from 'react-icons/io5';
import { IoArrowBack } from "react-icons/io5";
import { FaRegCheckCircle } from 'react-icons/fa';

const CourseFullPreview = ({ isOpen, onClose, course }) => {
    const [activeTab, setActiveTab] = useState('Course Information');

    return (
        <div className={`fixed top-16 left-[240px] right-0 bottom-0 bg-white z-[1002] transform transition-all duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
            {/* Header */}
            <div className="h-14 border-b flex items-center px-4 justify-between bg-white">
                <div className="flex items-center gap-2 h-[36px]">
                    <button
                        onClick={onClose}
                        className="p-1.5 flex gap-2 items-center bg-gray-100 rounded"
                    >
                        <IoChevronBackOutline size={16} />
                        <span className="text-[13px] text-gray-600">Back to collapsed view</span>
                    </button>
                    <div className="text-[18px] text-gray-800 font-[700]">[Course] Preview</div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-1.5">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M15 1v14H1V1h14m1-1H0v16h16V0z" />
                        </svg>
                    </button>
                    <button onClick={onClose} className="p-1.5">
                        <IoClose size={16} />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="h-[calc(100%-56px)] overflow-y-auto">
                <div className="p-11 ">
                    {/* Two Column Layout */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-3 w-[550px] border-r border-gray-300 ">
                            <div className="flex items-center ">
                                <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Course Name</label>
                                <div className="text-[13px] flex justify-end w-[400px] ">[Course Name]</div>
                            </div>
                            <div className="flex">
                                <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Tagline</label>
                                <div className="text-right text-[13px] flex justify-end w-[400px] ">
                                    Engage with expert instructors in real-time through interactive
                                </div>
                            </div>
                            <div className="flex">
                                <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Category</label>
                                <div className="text-right text-[12px] flex justify-end w-[400px] font-[500] relative">
                                    <select className="appearance-none bg-transparent pr-6 text-right w-full cursor-pointer">
                                        <option>Design</option>
                                    </select>
                                    <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex">
                                <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Sub-Category</label>
                                <div className="text-right text-[12px] flex justify-end w-[400px] font-[500] relative">
                                    <select className="appearance-none bg-transparent pr-6 text-right w-full cursor-pointer">
                                        <option>Sub-Category</option>
                                    </select>
                                    <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Language</label>
                                <div className="text-right text-[12px] flex justify-end w-[400px] font-[500] ">Teaching in [Language]</div>
                            </div>
                            <div className="flex">
                                <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Instructor</label>
                                <div className="text-right text-[12px] flex justify-end w-[400px] font-[500]  text-[#0056B3] underline">Instructor Name</div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div>
                            <div className="space-y-3 w-[550px]">
                                <div>
                                    <label className="block text-gray-600 mb-1.5 text-[13px] font-[400]">
                                        Specify Reason to ask for Re-Submit
                                    </label>
                                    <textarea
                                        className="w-full border rounded p-2 h-24 text-[13px] resize-none"
                                        placeholder="Enter Reason Here"
                                    />
                                </div>
                                <button className="text-gray-600 bg-white px-3 py-1.5 rounded text-[13px] font-[400] border border-gray-200">
                                    Send Comment
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-6 border-b">
                        <div className="flex gap-1">
                            {['Course Information', 'Course Content', 'Settings'].map((tab) => (
                                <button
                                    key={tab}
                                    className={`pb-2 text-[13px] ${activeTab === tab
                                        ? 'border-b-2 border-[#0056B3]  bg-[#f2f9ff] py-[4px] px-[6px] rounded text-gray-600 font-[400]'
                                        : 'text-gray-500 bg-[#f3f4f6] py-[4px] px-[6px] rounded  font-[400]'
                                        }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4 grid grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-3 w-[550px] border-r border-gray-300">
                            {/* Course Duration */}
                            <div className="flex items-start">
                                <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Course Duration</label>
                                <div className="text-[12px] font-[500] flex justify-end w-[400px]">DD-Mon-YYYY</div>
                            </div>

                            {/* Difficulty Level */}
                            <div className="flex">
                                <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Difficulty Level</label>
                                <div className='text-[12px] font-[500] flex justify-end w-[400px]'>Beginner</div>
                            </div>

                            {/* Transcript Attached */}
                            <div className="flex">
                                <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Transcript Attached</label>
                                <div className='text-[12px] font-[500] flex justify-end w-[400px]'>No</div>
                            </div>

                            {/* Banner Video & Image */}
                            <div className="flex">
                                <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Banner Video & Image</label>
                                <div className="flex gap-2 w-[420px] justify-end">
                                    {/* Graph/Chart Image */}
                                    <div className="w-[180px] h-[100px] rounded-md border overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1735542214686-a745d3684c39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8"
                                            alt="Analytics Graph"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Video Container */}
                                    <div className="w-[180px] h-[100px] rounded-md border overflow-hidden relative">
                                        <video
                                            src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                                            poster="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww"
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="white"
                                                    className="ml-1"
                                                >
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* What Will you get */}
                            <div className="flex space-x-5">
                                <label className="w-[150px] text-gray-600 text-[14px] font-[600]">What Will you get</label>
                                <div className="w-[420px]">
                                    <ul className="list-disc pl-5 space-y-2 text-[12px] font-[500]">
                                        <li>Gain UX skills you can immediately apply to improve your projects and career</li>
                                        <li>Learn how to conduct effective and useful research</li>
                                        <li>Understand how to apply UX Strategy to set goals and define success</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Prerequisites */}
                            <div className="flex space-x-5">
                                <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Prerequisites</label>
                                <div className="text-[12px] font-[500] w-[400px] text-right">
                                    Basic familiarity with Adobe and Microsoft products will be helpful.
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <label className="w-[120px] text-gray-600 text-[14px] font-[600]">
                                    Who can enrol for this course
                                </label>
                                <div className="text-[12px] font-[500] text-gray-700 w-[400px]">
                                    People who want to enter the UX field and become practitioners
                                    <br />
                                    Professionals who want or need to add UX to their skill set
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Description</label>
                                <div className="text-[12px] font-[500] w-[400px]">
                                    User Experience, or UX, is an exciting field. It's essentially about empowering people to do the things they want to do, which is both fun and gratifying. And, having a great user experience drives business success.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Approve Button - Bottom Left */}
                <div className="bottom-0 left-[240px] p-4 border-t bg-white w-[calc(100%-240px)]">
                    <button className="bg-[#0056B3] text-white h-9 px-4 rounded flex items-center gap-2 text-[13px]">
                        <FaRegCheckCircle size={14} /> Approve
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseFullPreview; 