import React from 'react';

const Hero_Heading = () => {
  return (
    <div className="text-center py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12">
        <span className="text-black inline-block">
        Empowering Minds, 
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Shaping Futures
          <span className="text-xs sm:text-sm align-top ml-1">™</span>
        </span>
      </h1>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[150px]">
        <img  
          src="https://staticcontent.cdn.contentraven.com/crcloud/pages/11218/1/en-us/images/banner-img.png" 
          alt="Educational Innovation Banner" 
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

export default Hero_Heading;
