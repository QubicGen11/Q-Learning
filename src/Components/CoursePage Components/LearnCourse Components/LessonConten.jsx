import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
 
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import SuperLoader from '../../Common/SuperLoader';
 
const LessonContent = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
 
  const videoUrl = 'https://d2vg68qr0mu2pv.cloudfront.net/1734603232822_videoplayback.mp4';
 
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
 
  useEffect(() => {
    if (!mounted) return;
 
    if (!playerRef.current) {
      const videoElement = videoRef.current;
     
      if (!videoElement) return;
 
      const options = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        aspectRatio: '16:9',
        playbackRates: [0.5, 1, 1.5, 2],
        sources: [{
          src: videoUrl,
          type: 'video/mp4',
          label: '1080p',
          selected: true
        }],
        controlBar: {
          children: [
            'playToggle',
            'volumePanel',
            'currentTimeDisplay',
            'timeDivider',
            'durationDisplay',
            'progressControl',
            'playbackRateMenuButton',
            'subsCapsButton',
            'qualitySelector',
            'fullscreenToggle'
          ]
        },
        html5: {
          nativeTextTracks: false
        },
        tracks: [
          {
            kind: 'captions',
            src: 'path/to/captions.vtt',
            srclang: 'en',
            label: 'English',
            default: true
          }
        ]
      };
 
      const player = videojs(videoElement, options, function onPlayerReady() {
        console.log('Player is ready');
        this.show();
       
        if ('webkitSpeechRecognition' in window) {
          const recognition = new webkitSpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
 
          this.on('play', () => {
            recognition.start();
          });
 
          this.on('pause', () => {
            recognition.stop();
          });
 
          this.on('ended', () => {
            recognition.stop();
          });
 
          recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
              .map(result => result[0].transcript)
              .join('');
           
            if (!this.textTracks().length) {
              this.addTextTrack('captions', 'English', 'en');
            }
           
            const track = this.textTracks()[0];
            if (track) {
              const cue = new VTTCue(
                this.currentTime(),
                this.currentTime() + 2,
                transcript
              );
              track.addCue(cue);
            }
          };
        }
 
        this.src({
          src: videoUrl,
          type: 'video/mp4',
          label: '1080p'
        });
        this.load();
 
        this.on('loadeddata', () => {
          setIsLoading(false);
        });
 
        this.on('waiting', () => {
          setIsLoading(true);
        });
 
        this.on('playing', () => {
          setIsLoading(false);
        });
      });
 
      playerRef.current = player;
    }
 
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
          playerRef.current = null;
        } catch (e) {
          console.error("Error disposing video player:", e);
        }
      }
    };
  }, [mounted, videoUrl]);
 
  return (
    <div className="w-full bg-black">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#e5e7eb] border-b border-gray-200">
        <button className="flex items-center gap-2 text-blue-600 border border-blue-700 px-4 py-2 rounded-md hover:text-blue-700 transition-colors duration-200">
          <IoIosArrowBack className="text-xl" />
          <span className="text-sm font-medium">Previous</span>
        </button>
       
<div className="flex  items-start mr-auto ml-6 space-x-2">
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
      <div className="w-full  flex items-center justify-center bg-black ">
     
          <video
            ref={videoRef}
            className="video-js vjs-big-play-centered vjs-theme-city "
          >
            <source
              src={videoUrl}
              type="video/mp4"
              label="1080p"
              className=""
   
            />
            <p className="vjs-no-js">
              To view this video please enable JavaScript, and consider upgrading to a
              web browser that supports HTML5 video
            </p>
          </video>
        
     
   
      </div>
      
    </div>
    
  );
};
 
export default LessonContent;