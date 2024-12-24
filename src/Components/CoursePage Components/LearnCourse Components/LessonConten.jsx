import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import SuperLoader from '../../Common/SuperLoader';
import CaptionControls from './CaptionControls';

const videoStyles = `
  video::-webkit-media-controls-panel,
  video::-webkit-media-controls-enclosure {
    display: flex !important;
    opacity: 1 !important;
  }
  
  video::-webkit-media-controls-overflow-menu-list {
    display: flex !important;
  }
`;

const LessonContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const videoUrl = 'https://d2vg68qr0mu2pv.cloudfront.net/1734603232822_videoplayback.mp4';
  
  // Test VTT content
  const testCaptionsVtt = `WEBVTT

00:00:00.000 --> 00:00:03.000
Welcome to the UX course!

00:00:03.000 --> 00:00:06.000
User Experience is all about making things better for users

00:00:06.000 --> 00:00:09.000
Let's learn how to create amazing experiences

00:00:09.000 --> 00:00:12.000
In this course, we'll cover the fundamentals

00:00:12.000 --> 00:00:15.000
From user research to prototyping

00:00:15.000 --> 00:00:18.000
We'll explore different UX methodologies

00:00:18.000 --> 00:00:21.000
Understanding user needs is crucial

00:00:21.000 --> 00:00:24.000
We'll learn about user personas and journeys

00:00:24.000 --> 00:00:27.000
And how to conduct effective user interviews

00:00:27.000 --> 00:00:30.000
Design thinking will be a key focus

00:00:30.000 --> 00:00:33.000
Along with usability testing principles

00:00:33.000 --> 00:00:36.000
We'll also cover information architecture

00:00:36.000 --> 00:00:39.000
And learn about wireframing best practices

00:00:39.000 --> 00:00:42.000
Interactive prototyping will be covered

00:00:42.000 --> 00:00:45.000
Finally, we'll look at UX analytics

00:00:45.000 --> 00:00:48.000
And how to measure design success

00:00:48.000 --> 00:01:51.000
Let's begin our UX journey together

00:01:51.000 --> 00:02:54.000
Remember to take notes as we proceed

00:02:54.000 --> 00:03:22.000
And feel free to pause and practice concepts`;

  // Create a Blob URL for the VTT content
  const captionsUrl = URL.createObjectURL(
    new Blob([testCaptionsVtt], { type: 'text/vtt' })
  );

  // Cleanup Blob URL on unmount
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(captionsUrl);
    };
  }, []);

  return (
    <div className="w-full">
      <style>{videoStyles}</style>
      {/* Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#e5e7eb] border-b border-gray-200">
        <button className="flex items-center gap-2 text-blue-600 border border-blue-700 px-4 py-2 rounded-md hover:text-blue-700 transition-colors duration-200">
          <IoIosArrowBack className="text-xl" />
          <span className="text-sm font-medium">Previous</span>
        </button>
        
        <div className="flex items-start mr-auto ml-6 space-x-2">
          <h2 className="text-base font-bold text-black">
            Chapter: What&apos;s &quot;Discovery&quot;?
          </h2>
          <span className="text-xs text-gray-500 mt-1 bg-[#F2F9FF] px-2 py-1 rounded-md">Playing</span>
        </div>

        <button className="flex items-center gap-2 text-blue-600 border border-blue-700 px-4 py-2 rounded-md hover:text-blue-700 transition-colors duration-200">
          <span className="text-sm font-medium">Next</span>
          <IoIosArrowForward className="text-xl" />
        </button>
      </div>

      {/* Video Container */}
      <div className="w-full h-[600px] p-2">
        <div className="w-full h-full relative">
          <video
            className="w-full h-full object-cover"
            controls
            playsInline
            onLoadedData={() => setIsLoading(false)}
          >
            <source src={videoUrl} type="video/mp4" />
            
            {/* Test Captions */}
            <track 
              src={captionsUrl}
              label="English" 
              kind="captions" 
              srcLang="en-us" 
              default 
            />

            Your browser does not support the video tag.
          </video>
          {/* <CaptionControls /> */}
        </div>
     
      </div>

      {/* Transcript Section */}
      
    </div>
  );
};

export default LessonContent;