import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import SuperLoader from './Common/SuperLoader';
const SplineScene = () => {
 const [isLoading, setIsLoading] = useState(true);
  return (
   <div className="w-full h-screen relative bg-black">
     {isLoading && (
       <div className="absolute inset-0 flex items-center justify-center">
         <SuperLoader />
       </div>
     )}
     <Spline
       scene="https://prod.spline.design/yY-NqJMZRE-hjMih/scene.splinecode"
       onLoad={() => setIsLoading(false)}
     />
     <style>{`
       /* Hide Spline watermark */
       [data-spline-widget="frame"] {
         position: relative;
       }
       [data-spline-widget="frame"]::after {
         content: '';
         position: absolute;
         bottom: 0;
         right: 0;
         width: 170px;
         height: 50px;
         background: black;
         z-index: 1000;
       }
     `}</style>
   </div>
 );
};
export default SplineScene;