import React, { useState, useRef } from 'react';
import { IoChevronBackOutline, IoClose } from 'react-icons/io5';
import { IoArrowBack } from "react-icons/io5";
import { FaRegCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import CommentDialog from '../Instructor Module/Courses/CreateCourse/Components/CommentDialog';
import { displayToast } from '../Common/Toast/Toast';



const CourseFullPreview = ({ isOpen, onClose, course }) => {
    const [activeTab, setActiveTab] = useState('Course Information');
    const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handleApprove = async () => {
        try {
            const accessToken = Cookies.get('accessToken');
            await axios.post(`http://localhost:8089/qlms/courses/${course?.id}/status`, 
                { action: "APPROVE" },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            displayToast('success', "Course approved successfully!");
            setTimeout(() => {
                onClose(); // Close the preview after toast is shown
            }, 1000);
        } catch (error) {
            console.error('Error approving course:', error);
            const errorMessage = error.response?.data?.error || "Failed to approve course. Please try again.";
            displayToast('error', errorMessage);
        }
    };

    const handleReject = async (commentData) => {
        try {
            const accessToken = Cookies.get('accessToken');
            if (!commentData?.comments?.[0]?.text) {
                displayToast('error', "Please provide a rejection reason");
                return;
            }
            
            await axios.post(`http://localhost:8089/qlms/courses/${course?.id}/status`, 
                { 
                    action: "REJECT",
                    comment: commentData?.comments?.[0]?.text 
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            displayToast('success', "Course rejected successfully!");
            setIsCommentDialogOpen(false);
            onClose();
        } catch (error) {
            console.error('Error rejecting course:', error);
            const errorMessage = error.response?.data?.error || "Failed to reject course. Please try again.";
            displayToast('error', errorMessage);
        }
    };

    const handleVideoClick = () => {
        setPreviewFile(course?.courseBanner);
        setPreviewOpen(true);
    };

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <div className={`fixed top-16 left-[240px] right-0 bottom-0 bg-white z-[40]  inset-0 bg-white z-[1002] transform transition-all duration-300 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                {/* Header */}
                <div className="h-14 border-b flex items-center px-4 justify-between bg-white sticky top-0 z-[1003]">
                    <div className="flex items-center gap-2 h-[36px]">
                        <button
                            onClick={onClose}
                            className="p-1.5 flex gap-2 items-center bg-gray-100 rounded"
                        >
                            <IoChevronBackOutline size={16} />
                            <span className="text-[13px] text-gray-600">Back to collapsed view</span>
                        </button>
                        <div className="text-[18px] text-gray-800 font-[700]">
                            {course?.courseName} Preview
                        </div>
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

                {/* Main Content Area - adjust top padding to account for header */}
                <div className="h-[calc(100%-56px)] overflow-y-auto pt-16">
                    <div className="p-11 ">
                        {/* Two Column Layout */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-3 w-[550px] border-r border-gray-300 ">
                                <div className="flex items-center ">
                                    <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Course Name</label>
                                    <div className="text-[13px] flex justify-end w-[400px] ">
                                        {course?.courseName}
                                    </div>
                                </div>

                      
                                <div className="flex">
                                    <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Tagline</label>
                                    <div className="text-right text-[13px] flex justify-end w-[400px] ">
                                        {course?.courseTagline}
                                    </div>
                                </div>
                                <div className="flex">
                                    <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Category</label>
                                    <div className="text-right text-[12px] flex justify-end w-[400px] font-[500] relative">
                                       
                                        <p>{course?.category}</p>
                                     
                                    </div>
                                </div>

                                <div className="flex">
                                    <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Sub-Category</label>
                                    <div className="text-right text-[12px] flex justify-end w-[400px] font-[500] relative">
                                        <p>{course?.subCategory}</p>
                                           
                                
                                     
                                    </div>
                                </div>
                                <div className="flex">
                                    <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Language</label>
                                    <div className="text-right text-[12px] flex justify-end w-[400px] font-[500] ">
                                        Teaching in {course?.teachingLanguage}
                                    </div>
                                </div>
                                <div className="flex">
                                    <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Instructor</label>
                                    <div className="text-right text-[12px] flex justify-end w-[400px] font-[500]  text-[#0056B3] underline">
                                        {course?.trainerName}
                                    </div>
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
                                <div className="flex items-start">
                                    <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Course Duration</label>
                                    <div className="text-[12px] font-[500] flex justify-end w-[400px]">
                                        {course?.courseDuration} hours
                                    </div>
                                </div>

                                <div className="flex">
                                    <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Difficulty Level</label>
                                    <div className='text-[12px] font-[500] flex justify-end w-[400px]'>
                                        {course?.difficultyLevel}
                                    </div>
                                </div>

                                <div className="flex">
                                    <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Banner Video & Image</label>
                                    <div className="flex gap-2 w-[420px] justify-end">
                                        <div className="w-[180px] h-[100px] rounded-md border overflow-hidden">
                                            <img
                                                src={course?.courseImage}
                                                alt="Course"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="w-[180px] h-[100px] rounded-md border overflow-hidden relative cursor-pointer"
                                             onClick={handleVideoClick}>
                                            <video
                                                src={course?.courseBanner}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="ml-1">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-5">
                                    <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Prerequisites</label>
                                    <div className="text-[12px] font-[500] w-[400px] text-right">
                                        {course?.coursePreRequisites?.map(pre => pre.preRequisites.preRequisiteRequired).join(', ')}
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
                                        {course?.courseAudience?.map(aud => aud.audience).join(', ')}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <label className="w-[120px] text-gray-600 text-[14px] font-[600]">Description</label>
                                    <div className="text-[12px] font-[500] w-[400px]"
                                         dangerouslySetInnerHTML={{ __html: course?.courseDescription }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom buttons - update z-index */}
                    <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white flex gap-2 z-[1003]">
                        <button 
                            onClick={handleApprove}
                            className="bg-[#0056B3] text-white h-9 px-4 rounded flex items-center gap-2 text-[13px]"
                        >
                            <FaRegCheckCircle size={14} /> Approve
                        </button>
                        <button 
                            onClick={() => setIsCommentDialogOpen(true)}
                            className="bg-red-500 text-white h-9 px-4 rounded flex items-center gap-2 text-[13px]"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Video Preview Modal */}
            {previewOpen && (
                <div className="fixed inset-0 bg-black/70 z-[1005] flex items-center justify-center">
                    <div className="relative bg-white rounded-lg p-4 max-w-[732px]">
                        <div className="relative">
                            <video
                                ref={videoRef}
                                src={previewFile}
                                className="w-[692px] h-[360px] object-cover"
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                    onClick={handlePlayPause}
                                    className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center
                                            hover:bg-black/70 transition-all duration-300
                                            hover:scale-110 active:scale-95"
                                >
                                    {isPlaying ? (
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                                        </svg>
                                    ) : (
                                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className='flex justify-between  border-[#E5E7EB] w-[732px] px-8'>
                            <button
                                onClick={() => {
                                    setPreviewOpen(false);
                                    setPreviewFile(null);
                                    if (videoRef.current) {
                                        videoRef.current.pause();
                                    }
                                    setIsPlaying(false);
                                }}
                                className="bg-[#0056b3] mt-6 px-4 h-8 rounded-md text-white hover:text-white mt-3"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Comment Dialog - update z-index */}
            <div className={`${isCommentDialogOpen ? 'fixed inset-0 z-[1004]' : ''}`}>
                <CommentDialog 
                    isOpen={isCommentDialogOpen}
                    onClose={() => setIsCommentDialogOpen(false)}
                    onSubmit={handleReject}
                />
            </div>
        </>
    );
};

export default CourseFullPreview; 