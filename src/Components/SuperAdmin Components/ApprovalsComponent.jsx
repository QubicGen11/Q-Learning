import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { FiInfo, FiCheck, FiX, FiEye } from "react-icons/fi";
import { Tooltip } from 'react-tooltip';
import CourseContent from "../Courses Components/CourseContent";
import { toast } from 'react-toastify';
import axios from 'axios';

// Add Modal Component
const PreviewModal = ({ isOpen, onClose, course }) => {
  if (!isOpen) return null;

  // Get the superadmin token
  const accessToken = Cookies.get('superadminToken');

  // Process prerequisites into proper format
  const prerequisites = course?.coursePreRequisites?.map(prereq => ({
    name: prereq,
    level: 'Beginner'
  })) || [];

  // Process lessons into proper format
  const processedLessons = course?.courseLesson?.map(lesson => ({
    id: lesson.id || Math.random().toString(),
    title: lesson.title || '',
    duration: lesson.duration || '0h',
    content: lesson.content || '',
    isCompleted: false
  })) || [];

  const previewData = {
    id: course?.id || '',
    title: course?.courseTitle || '',
    description: course?.description || '',
    duration: course?.duration || '0h',
    price: course?.price || 0,
    courseBanner: course?.courseBanner || '',
    courseLesson: processedLessons, // Use processed lessons
    technologiesUsed: course?.technologiesUsed || '',
    coursePreRequisites: prerequisites, // Use processed prerequisites
    learningObjective: course?.learningObjective || '',
    learningObjectives: course?.learningObjective?.split(',') || [],
    curriculum: processedLessons, // Use processed lessons for curriculum
    techStackData: (course?.technologiesUsed || '').split(',').map(tech => ({
      name: tech.trim(),
      url: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.toLowerCase()}/${tech.toLowerCase()}-original.svg`
    })),
    category: course?.category || '',
    subcategory: course?.subcategory || '',
    difficultyLevel: course?.difficultyLevel || 'Beginner',
    completionTime: course?.completionTime || '',
    language: course?.language || '',
    productCovered: course?.productCovered || [],
    courseAudience: course?.courseAudience || [],
    originalPrice: course?.originalPrice || 0,
    discount: course?.discount || 0,
    courseImage: course?.courseBanner || '',
    logo: course?.technologyImage || '',
    diplomaAvailable: course?.diplomaAvailable || false,
    reviews: [],
    rating: course?.rating || 0,
    enrolledStudents: course?.enrolledStudents || 0,
    instructor: {
      name: course?.instructorName || 'Unknown',
      bio: course?.instructorBio || '',
      image: course?.instructorImage || '',
    },
    sections: processedLessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      lessons: [lesson]
    })),
    requirements: prerequisites,
    whatYouWillLearn: course?.learningObjective?.split(',') || [],
    courseContent: {
      sections: processedLessons.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        duration: lesson.duration,
        lessons: [lesson]
      })),
      totalDuration: course?.duration || '0h',
      totalLectures: processedLessons.length
    },
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-7xl mx-auto p-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 z-50"
          >
            <span className="text-2xl">×</span>
          </button>
          <div className="mt-8">
            <CourseContent 
              previewMode={true} 
              previewData={previewData} 
              accessToken={accessToken}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ApprovalsComponent = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [error, setError] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const tableRef = useRef(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewCourse, setPreviewCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const token = Cookies.get('superadminToken');
        const response = await fetch("http://localhost:8089/qlms/getUserCreatedCourse", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        const processedData = data.map(course => ({
          ...course,
          status: course.status || 'pending'
        }));
        setCourses(processedData);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleStatusUpdate = async (courseId, newStatus) => {
    try {
      const token = Cookies.get('superadminToken');
      
      // Only proceed with API call if it's an approval action
      if (newStatus === 'approved') {
        const response = await axios.put(
          `http://localhost:8089/qlms/approveCourse/${courseId}`,
          {
            approverId: "406d53ed-97bb-4964-a058-4ff1da8e5bfc",
            approverName: "shaik Hussain",
            status: "published"
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.status === 200) {
          // Update the local state to reflect the change
          setCourses(prevCourses => 
            prevCourses.map(course => 
              course.id === courseId 
                ? { 
                    ...course, 
                    status: 'published',
                    approverId: "406d53ed-97bb-4964-a058-4ff1da8e5bfc",
                    approverName: "shaik Hussain"
                  }
                : course
            )
          );

          // Show success message
          toast.success('Course has been approved successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
        }
      }
    } catch (error) {
      console.error("Error updating course status:", error);
      toast.error(error.response?.data?.message || 'Failed to approve course. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };

  const handleRejectCourse = async (courseId) => {
    try {
      const token = Cookies.get('superadminToken');
      
      const response = await axios.put(
        `http://localhost:8089/qlms/rejectCourse/${courseId}`,
        {}, // empty body as we're just updating status
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        // Update the local state to reflect the change
        setCourses(prevCourses => 
          prevCourses.map(course => 
            course.id === courseId 
              ? { ...course, status: 'rejected' }
              : course
          )
        );

        // Show success message
        toast.success('Course has been rejected successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    } catch (error) {
      console.error("Error rejecting course:", error);
      toast.error(error.response?.data?.message || 'Failed to reject course. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };

  const getStatusColor = (status = 'pending') => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      published: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      declined: "bg-red-100 text-red-800",
      draft: "bg-gray-100 text-gray-800"
    };
    return colors[status.toLowerCase()] || colors.pending;
  };

  const handleCourseSelect = (course) => {
    if (tableRef.current) {
      setScrollPosition(tableRef.current.scrollTop);
    }
    setSelectedCourse(course);
  };

  useEffect(() => {
    if (tableRef.current && scrollPosition) {
      tableRef.current.scrollTop = scrollPosition;
    }
  }, [selectedCourse, scrollPosition]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Approval Requests</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Table - Added fixed height and ref */}
          <div className="lg:col-span-2">
            <div 
              ref={tableRef}
              className="overflow-auto max-h-[calc(100vh-240px)]" // Fixed height with scrolling
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10"> {/* Made header sticky */}
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Info</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((course) => (
                    <tr 
                      key={course.id || Math.random()}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedCourse?.id === course.id ? 'bg-amber-50' : ''
                      }`}
                      onClick={() => handleCourseSelect(course)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {course.courseTitle || 'Untitled Course'}
                          </span>
                          <span className="text-sm text-gray-500">
                            Owner: {course.courseOwner || 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-900">
                            {course.typeOfRequest || 'Unknown Request'}
                          </span>
                          {course.isUrgent && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Urgent
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                          {course.status === 'published' ? 'Published' :
                           course.status === 'rejected' || course.status === 'declined' ? 'Declined' :
                           'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            data-tooltip-id="preview-tip"
                            data-tooltip-content="Preview Course"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewCourse(course);
                              setIsPreviewOpen(true);
                            }}
                            className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
                          >
                            <FiEye />
                          </button>
                          <button
                            data-tooltip-id="approve-tip"
                            data-tooltip-content="Approve Request"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusUpdate(course.id, 'approved');
                            }}
                            className="text-green-600 hover:bg-green-50 p-2 rounded-full transition-colors duration-200"
                          >
                            <FiCheck className="w-5 h-5" />
                          </button>
                          <button
                            data-tooltip-id="reject-tip"
                            data-tooltip-content="Reject Request"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm('Are you sure you want to reject this course?')) {
                                handleRejectCourse(course.id);
                              }
                            }}
                            className="text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors duration-200"
                          >
                            <FiX className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Details Panel - Added fixed height */}
          <div className="bg-gray-50 rounded-lg p-6 max-h-[calc(100vh-240px)] overflow-auto">
            {selectedCourse ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Request Details</h3>
                <div className="space-y-3">
                  <DetailItem label="Request ID" value={selectedCourse.id || 'N/A'} />
                  <DetailItem label="Course Title" value={selectedCourse.courseTitle || 'N/A'} />
                  <DetailItem label="Status" value={selectedCourse.status || 'pending'} isStatus={true} />
                  <DetailItem label="Course ID" value={selectedCourse.id || 'N/A'} />
                  <DetailItem label="Change Description" value={selectedCourse.aboutCourse || 'No description provided'} />
                  <DetailItem label="Reason" value={selectedCourse.reason || 'No reason provided'} />
                  <DetailItem label="Comments" value={selectedCourse.comments || 'No comments'} />
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <FiInfo className="mx-auto h-12 w-12 mb-4" />
                <p>Select a request to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tooltips */}
      <Tooltip id="preview-tip" />
      <Tooltip id="approve-tip" />
      <Tooltip id="reject-tip" />

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        course={previewCourse}
      />
    </div>
  );
};

// Helper component for detail items
const DetailItem = ({ label, value, isStatus }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: "text-yellow-800 bg-yellow-100",
      published: "text-green-800 bg-green-100",
      rejected: "text-red-800 bg-red-100",
      declined: "text-red-800 bg-red-100",
      draft: "text-gray-800 bg-gray-100"
    };
    return colors[status.toLowerCase()] || colors.pending;
  };

  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm">
        {isStatus ? (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
            {value === 'published' ? 'Published' :
             value === 'rejected' || value === 'declined' ? 'Declined' :
             'Pending'}
          </span>
        ) : (
          <span className="text-gray-900">{value}</span>
        )}
      </dd>
    </div>
  );
};

export default ApprovalsComponent;
