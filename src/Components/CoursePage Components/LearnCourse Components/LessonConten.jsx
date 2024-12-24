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
  
  // Test VTT content for different languages
  const englishCaptionsVtt = `WEBVTT

00:00:00.000 --> 00:00:03.000
Welcome to the UX course!

00:00:03.000 --> 00:00:06.000
User Experience is all about making things better for users

00:00:06.000 --> 00:00:09.000
Let's learn how to create amazing experiences

00:00:09.000 --> 00:00:12.000
We'll cover the fundamentals of UX design

00:00:12.000 --> 00:00:15.000
Including user research and prototyping

00:00:15.000 --> 00:00:18.000
Understanding user needs is crucial

00:00:18.000 --> 00:00:21.000
We'll learn various research methods

00:00:21.000 --> 00:00:24.000
And how to apply them effectively

00:00:24.000 --> 00:00:27.000
Then we'll move on to wireframing

00:00:27.000 --> 00:00:30.000
Creating interactive prototypes

00:00:30.000 --> 00:00:33.000
And testing with real users

00:00:33.000 --> 00:00:36.000
By the end, you'll be ready to create

00:00:36.000 --> 00:00:39.000
User-centered design solutions

00:00:39.000 --> 00:00:42.000
That solve real problems

00:00:42.000 --> 00:03:22.000
Let's dive deeper into UX design principles and best practices

00:03:22.000 --> 00:03:25.000
This concludes our introduction to UX design`;

  const hindiCaptionsVtt = `WEBVTT

00:00:00.000 --> 00:00:03.000
यूएक्स कोर्स में आपका स्वागत है!

00:00:03.000 --> 00:00:06.000
यूजर एक्सपीरियंस का मतलब है उपयोगकर्ताओं के लिए चीजों को बेहतर बनाना

00:00:06.000 --> 00:00:09.000
आइए जानें कि कैसे बनाएं शानदार अनुभव

00:00:09.000 --> 00:00:12.000
हम यूएक्स डिजाइन की मूल बातें सीखेंगे

00:00:12.000 --> 00:00:15.000
इसमें यूजर रिसर्च और प्रोटोटाइपिंग शामिल है

00:00:15.000 --> 00:00:18.000
उपयोगकर्ता की जरूरतों को समझना महत्वपूर्ण है

00:00:18.000 --> 00:00:21.000
हम विभिन्न शोध विधियों को सीखेंगे

00:00:21.000 --> 00:00:24.000
और उन्हें प्रभावी ढंग से लागू करना सीखेंगे

00:00:24.000 --> 00:00:27.000
फिर हम वायरफ्रेमिंग पर जाएंगे

00:00:27.000 --> 00:00:30.000
इंटरैक्टिव प्रोटोटाइप बनाना

00:00:30.000 --> 00:00:33.000
और वास्तविक उपयोगकर्ताओं के साथ परीक्षण

00:00:33.000 --> 00:00:36.000
अंत में, आप तैयार हो जाएंगे

00:00:36.000 --> 00:00:39.000
यूजर-केंद्रित डिजाइन समाधान बनाने के लिए

00:00:39.000 --> 00:00:42.000
जो वास्तविक समस्याओं को हल करते हैं

00:00:42.000 --> 00:03:22.000
आइए यूएक्स डिजाइन सिद्धांतों और सर्वोत्तम प्रथाओं में गहराई से जाएं`;

  const teluguCaptionsVtt = `WEBVTT

00:00:00.000 --> 00:00:03.000
UX కోర్స్‌కి స్వాగతం!

00:00:03.000 --> 00:00:06.000
యూజర్ ఎక్స్‌పీరియన్స్ అంటే వినియోగదారులకు విషయాలను మెరుగుపరచడం

00:00:06.000 --> 00:00:09.000
అద్భుతమైన అనుభవాలను ఎలా సృష్టించాలో నేర్చుకుందాం

00:00:09.000 --> 00:00:12.000
మేము UX డిజైన్ యొక్క మూలాలను కవర్ చేస్తాము

00:00:12.000 --> 00:00:15.000
వినియోగదారు పరిశోధన మరియు ప్రోటోటైపింగ్ సహా

00:00:15.000 --> 00:00:18.000
వినియోగదారు అవసరాలను అర్థం చేసుకోవడం చాలా ముఖ్యం

00:00:18.000 --> 00:00:21.000
మేము వివిధ పరిశోధనా పద్ధతులను నేర్చుకుంటాము

00:00:21.000 --> 00:00:24.000
మరియు వాటిని ప్రభావవంతంగా ఎలా అన్వయించాలి

00:00:24.000 --> 00:00:27.000
తర్వాత మేము వైర్‌ఫ్రేమింగ్‌కి వెళ్తాము

00:00:27.000 --> 00:00:30.000
ఇంటరాక్టివ్ ప్రోటోటైప్‌లను సృష్టించడం

00:00:30.000 --> 00:00:33.000
మరియు నిజమైన వినియోగదారులతో పరీక్షించడం

00:00:33.000 --> 00:00:36.000
చివరికి, మీరు సిద్ధంగా ఉంటారు

00:00:36.000 --> 00:00:39.000
వినియోగదారు-కేంద్రీకృత డిజైన్ పరిష్కారాలను సృష్టించడానికి

00:00:39.000 --> 00:00:42.000
నిజమైన సమస్యలను పరిష్కరించే

00:00:42.000 --> 00:03:22.000
UX డిజైన్ సూత్రాలు మరియు ఉత్తమ పద్ధతులను లోతుగా అన్వేషించండి`;

  // Create Blob URLs for each VTT content
  const englishCaptionsUrl = URL.createObjectURL(
    new Blob([englishCaptionsVtt], { type: 'text/vtt' })
  );
  const hindiCaptionsUrl = URL.createObjectURL(
    new Blob([hindiCaptionsVtt], { type: 'text/vtt' })
  );
  const teluguCaptionsUrl = URL.createObjectURL(
    new Blob([teluguCaptionsVtt], { type: 'text/vtt' })
  );

  // Cleanup Blob URLs on unmount
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(englishCaptionsUrl);
      URL.revokeObjectURL(hindiCaptionsUrl);
      URL.revokeObjectURL(teluguCaptionsUrl);
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
            
            {/* Multiple language tracks */}
            <track 
              src={englishCaptionsUrl}
              label="English" 
              kind="captions" 
              srcLang="en"
              default 
            />
            <track 
              src={hindiCaptionsUrl}
              label="हिंदी" 
              kind="captions" 
              srcLang="hi"
            />
            <track 
              src={teluguCaptionsUrl}
              label="తెలుగు" 
              kind="captions" 
              srcLang="te"
            />

            Your browser does not support the video tag.
          </video>
          {/* <CaptionControls /> */}
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
            <SuperLoader />
          </div>
        )}
      </div>

      {/* Transcript Section */}
      
    </div>
  );
};

export default LessonContent;