import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useCourseStore from '../../../../store/courseStore';

const AboutCourse = () => {
  const aboutCourse = useCourseStore((state) => state.aboutCourse);
  const updateAboutCourse = useCourseStore((state) => state.updateAboutCourse);

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Welcome Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Welcome Message
        </label>
        <div className="relative" style={{ height: '250px' }}>
          <ReactQuill
            value={aboutCourse.welcomeMessage}
            onChange={(content) => updateAboutCourse({ welcomeMessage: content })}
            modules={quillModules}
            className="h-full"
            theme="snow"
            placeholder="Enter welcome message..."
          />
        </div>
      </div>

      {/* Course Overview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Overview
        </label>
        <div className="relative" style={{ height: '250px' }}>
          <ReactQuill
            value={aboutCourse.courseOverview}
            onChange={(content) => updateAboutCourse({ courseOverview: content })}
            modules={quillModules}
            className="h-full"
            theme="snow"
            placeholder="Enter course overview..."
          />
        </div>
      </div>

      {/* Course Audience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Audience*
        </label>
        <div className="relative" style={{ height: '250px' }}>
          <ReactQuill
            value={aboutCourse.courseAudience}
            onChange={(content) => updateAboutCourse({ courseAudience: content })}
            modules={quillModules}
            className="h-full"
            theme="snow"
            placeholder="Describe who this course is for..."
          />
        </div>
      </div>

      {/* End Objectives */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          End Objectives*
        </label>
        <div className="relative" style={{ height: '250px' }}>
          <ReactQuill
            value={aboutCourse.endObjectives}
            onChange={(content) => updateAboutCourse({ endObjectives: content })}
            modules={quillModules}
            className="h-full"
            theme="snow"
            placeholder="What will students achieve by the end of this course..."
          />
        </div>
      </div>

      {/* Add custom styles to fix ReactQuill editor height */}
      <style jsx global>{`
        .ql-container {
          height: calc(100% - 42px) !important;
        }
        .ql-editor {
          min-height: 100%;
          max-height: 100%;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default AboutCourse; 