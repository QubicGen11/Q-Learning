import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LiaTelegramPlane } from "react-icons/lia";

const CoursesPage = () => {
  const navigate = useNavigate();
  
  const getRandomAvatar = (name) => {
    return `https://ui-avatars.com/api/?name=${name}&background=random&color=fff`;
  };

  const courses = [
    { 
      name: 'Course Name',
      collaboration: 'None',
      status: 'Draft',
      students: '0',
      description: 'Placeholder',
      addedOn: 'DD-MM-YYYY',
      publishedOn: 'DD-MM-YYYY'
    },
    { 
      name: 'Course Name',
      collaboration: [
        { id: 1, avatar: getRandomAvatar('John'), name: 'John' },
        { id: 2, avatar: getRandomAvatar('Jane'), name: 'Jane' },
        { id: 3, avatar: getRandomAvatar('Mike'), name: 'Mike' }
      ],
      status: 'Published',
      students: '32',
      description: 'Placeholder',
      addedOn: 'DD-MM-YYYY',
      publishedOn: 'DD-MM-YYYY'
    },
    { 
      name: 'Course Name',
      collaboration: [{ id: 1, avatar: getRandomAvatar('User'), name: 'User' }],
      status: 'Un Published',
      students: '0',
      description: 'Placeholder',
      addedOn: 'DD-MM-YYYY',
      publishedOn: 'DD-MM-YYYY'
    },
    // Add more courses with 'Sent for Review' status
    ...Array(6).fill().map((_, i) => ({
      name: 'Course Name',
      collaboration: [{ id: 1, avatar: getRandomAvatar('User'), name: 'User' }],
      status: 'Sent for Review',
      students: '0',
      description: 'Placeholder',
      addedOn: 'DD-MM-YYYY',
      publishedOn: 'DD-MM-YYYY'
    }))
  ];

  return (
    <div className="p-6">
      {/* Members and Recent Queries Section */}
      <div className="flex justify-between mb-6 space-x-3">
        {/* Members of Collaboration - Updated to match exactly */}
        <div className="flex flex-col bg-[#ffffff] p-5 w-[40vw]" style={{border:"1px solid #F3F4F6"}}>
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-md font-bold">Members of Collaboration (4)</h2>
            <button 
              className="flex items-center gap-1 text-[#0056B3]  text-sm  bg-[#F3F4F6] px-3 py-1 rounded-lg"
            >
              <span className="text-sm text-[#0056B3] font-bold"><LiaTelegramPlane /></span>
              Invite
            </button>
          </div>
          <div className="flex items-center justify-center ">
            <div className="flex -space-x-3 bg-gray-50 rounded-lg p-2">
              <img 
                src={getRandomAvatar('User 1')} 
                className="w-10 h-10 rounded-full border-2 border-white"
                alt=""
              />
              <img 
                src={getRandomAvatar('User 2')} 
                className="w-10 h-10 rounded-full border-2 border-white"
                alt=""
              />
              <img 
                src={getRandomAvatar('User 3')} 
                className="w-10 h-10 rounded-full border-2 border-white"
                alt=""
              />
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                +1
              </div>
            </div>
          </div>
        </div>

        {/* Recent Queries - Remains same */}
        <div className="min-w-[40vw]  p-5 bg-[#ffffff]"style={{border:"1px solid #F3F4F6"}}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md font-bold">Recent Queries</h2>
            <button className="text-[#0056B3]  text-sm  bg-[#F3F4F6] px-3 py-1 rounded-lg">View All</button>
          </div>
          <div className="bg-white rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 bg-[#F5F5F5]">
                  <th className="text-left py-2 px-4 font-bold">Course Name</th>
                  <th className="text-left py-2 px-4 font-bold">Query</th>
                </tr>
              </thead>
              <tbody>
                {[1,2,3].map((_, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4">Course Name</td>
                    <td className="py-2 px-4 text-[#0056B3]">Placeholder</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md  font-bold ">Courses</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Course Name"
                className="w-64 pl-10 pr-4 py-2 border rounded-lg text-sm"
              />
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                search
              </span>
            </div>
            <button 
              onClick={() => navigate('/instructor/courses/create')}
              className="flex items-center gap-1 bg-[#0056B3] text-white px-4 py-2 rounded-md text-sm"
            >
              <span className="material-icons text-sm">add</span>
              Add Course
            </button>
          </div>
        </div>

        <table className="w-full bg-white rounded-lg">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="text-left p-4 font-normal">Course Name</th>
              <th className="text-left p-4 font-normal">Collaboration</th>
              <th className="text-left p-4 font-normal">Status</th>
              <th className="text-left p-4 font-normal">Students</th>
              <th className="text-left p-4 font-normal">Description</th>
              <th className="text-left p-4 font-normal">Added On</th>
              <th className="text-left p-4 font-normal">Published On</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="border-t">
                <td className="p-4 text-sm">{course.name}</td>
                <td className="p-4">
                  {course.collaboration === 'None' ? (
                    'None'
                  ) : (
                      <div className="flex -space-x-2">
                      {course.collaboration.map((user) => (
                        <img
                          key={user.id}
                          src={user.avatar}
                          alt={user.name}
                          className="w-6 h-6 rounded-full border-2 border-white"
                        />
                      ))}
                      {course.collaboration.length > 2 && (
                        <span className="ml-4 text-xs text-[#0056B3]">+1</span>
                      )}
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs
                    ${course.status === 'Published' ? 'bg-green-100 text-green-800' : 
                    course.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                    course.status === 'Un Published' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'}`}>
                    {course.status}
                  </span>
                </td>
                <td className="p-4 text-sm">{course.students}</td>
                <td className="p-4 text-sm text-gray-500">{course.description}</td>
                <td className="p-4 text-sm text-gray-500">{course.addedOn}</td>
                <td className="p-4 text-sm text-gray-500">{course.publishedOn}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between py-4">
          <button className="text-gray-500 text-sm flex items-center gap-1">
            <span className="material-icons text-sm">chevron_left</span>
            Previous
          </button>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm">1</button>
            <button className="w-8 h-8 rounded-full text-gray-500 text-sm">2</button>
            <button className="w-8 h-8 rounded-full text-gray-500 text-sm">3</button>
            <span className="text-gray-500">...</span>
            <button className="w-8 h-8 rounded-full text-gray-500 text-sm">8</button>
            <button className="w-8 h-8 rounded-full text-gray-500 text-sm">9</button>
          </div>
          <button className="text-gray-500 text-sm flex items-center gap-1">
            Next
            <span className="material-icons text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage; 