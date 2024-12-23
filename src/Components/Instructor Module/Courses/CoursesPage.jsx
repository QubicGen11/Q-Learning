import React from 'react';

const CoursesPage = () => {
  // Function to generate random avatar URLs
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
        { id: 1, avatar: getRandomAvatar('John Doe'), name: 'John' },
        { id: 2, avatar: getRandomAvatar('Jane Smith'), name: 'Jane' },
        { id: 3, avatar: getRandomAvatar('Mike Johnson'), name: 'Mike' }
      ],
      status: 'Published',
      students: '32',
      description: 'Placeholder',
      addedOn: 'DD-MM-YYYY',
      publishedOn: 'DD-MM-YYYY'
    },
    { 
      name: 'Course Name',
      collaboration: [
        { id: 1, avatar: getRandomAvatar('Alex Wilson'), name: 'Alex' }
      ],
      status: 'Un Published',
      students: '0',
      description: 'Placeholder',
      addedOn: 'DD-MM-YYYY',
      publishedOn: 'DD-MM-YYYY'
    },
    // Generate 8 more courses with random avatars
    ...Array(8).fill().map((_, index) => ({
      name: 'Course Name',
      collaboration: [
        { 
          id: 1, 
          avatar: getRandomAvatar(`User ${index + 1}`), 
          name: `User ${index + 1}` 
        }
      ],
      status: 'Sent for Review',
      students: '0',
      description: 'Placeholder',
      addedOn: 'DD-MM-YYYY',
      publishedOn: 'DD-MM-YYYY'
    }))
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-medium text-gray-900">Recent Queries</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Members of Collaboration (4)</span>
          <button className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-sm hover:bg-blue-100">
            <span className="material-icons text-base">add</span>
            Invite
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg">
        <div className="grid grid-cols-7 text-sm border-b">
          <div className="p-4 text-gray-500 font-medium">Course Name</div>
          <div className="p-4 text-gray-500 font-medium">Collaboration</div>
          <div className="p-4 text-gray-500 font-medium">Status</div>
          <div className="p-4 text-gray-500 font-medium">Students</div>
          <div className="p-4 text-gray-500 font-medium">Description</div>
          <div className="p-4 text-gray-500 font-medium">Added On</div>
          <div className="p-4 text-gray-500 font-medium">Published On</div>
        </div>

        {courses.map((course, index) => (
          <div key={index} className="grid grid-cols-7 text-sm border-b hover:bg-gray-50">
            <div className="p-4 text-gray-900">{course.name}</div>
            <div className="p-4">
              {course.collaboration === 'None' ? (
                <span className="text-gray-500">None</span>
              ) : (
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {Array.isArray(course.collaboration) && course.collaboration.map((user) => (
                      <img
                        key={user.id}
                        src={user.avatar}
                        alt={user.name}
                        className="w-6 h-6 rounded-full border-2 border-white"
                        title={user.name}
                      />
                    ))}
                  </div>
                  {Array.isArray(course.collaboration) && course.collaboration.length > 1 && (
                    <span className="ml-2 text-xs text-blue-600">+1</span>
                  )}
                </div>
              )}
            </div>
            <div className="p-4">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium
                ${course.status === 'Published' ? 'bg-green-100 text-green-800' : 
                course.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                course.status === 'Un Published' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'}`}>
                {course.status}
              </span>
            </div>
            <div className="p-4 text-gray-500">{course.students}</div>
            <div className="p-4 text-gray-500">{course.description}</div>
            <div className="p-4 text-gray-500">{course.addedOn}</div>
            <div className="p-4 text-gray-500">{course.publishedOn}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Course Name"
            className="pl-4 pr-10 py-2 border rounded-lg w-64 text-sm focus:outline-none focus:border-blue-500"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="material-icons text-gray-400 text-lg">search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage; 