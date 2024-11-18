import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiFile, FiLink, FiDownload, FiFolder } from 'react-icons/fi';

const Resources = ({ formData, setFormData }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleAddResource = (type) => {
    const newResource = {
      id: Date.now(),
      type, // 'file' | 'link' | 'folder'
      title: '',
      description: '',
      url: '',
      fileSize: '',
      fileType: '',
      downloadable: true,
      folder: selectedFolder
    };

    setFormData({
      ...formData,
      resources: [...formData.resources, newResource]
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      const newResource = {
        id: Date.now(),
        type: 'file',
        title: file.name,
        description: '',
        url: URL.createObjectURL(file), // Temporary URL
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        fileType: file.type,
        downloadable: true,
        folder: selectedFolder
      };

      setFormData({
        ...formData,
        resources: [...formData.resources, newResource]
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Course Resources</h2>
        <div className="flex gap-2">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 flex items-center gap-2"
          >
            <FiFile />
            Upload File
          </label>
          <button
            onClick={() => handleAddResource('link')}
            className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 flex items-center gap-2"
          >
            <FiLink />
            Add Link
          </button>
          <button
            onClick={() => handleAddResource('folder')}
            className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 flex items-center gap-2"
          >
            <FiFolder />
            New Folder
          </button>
        </div>
      </div>

      {/* Resources List */}
      <div className="border rounded-lg">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
          <div className="col-span-5">Name</div>
          <div className="col-span-3">Type</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-2">Actions</div>
        </div>

        <div className="divide-y">
          {formData.resources.map((resource) => (
            <div key={resource.id} className="grid grid-cols-12 gap-4 p-4 items-center">
              <div className="col-span-5 flex items-center gap-2">
                {resource.type === 'folder' ? (
                  <FiFolder className="text-yellow-500" />
                ) : resource.type === 'link' ? (
                  <FiLink className="text-blue-500" />
                ) : (
                  <FiFile className="text-gray-500" />
                )}
                <input
                  type="text"
                  value={resource.title}
                  onChange={(e) => {
                    const updated = formData.resources.map(r =>
                      r.id === resource.id ? { ...r, title: e.target.value } : r
                    );
                    setFormData({ ...formData, resources: updated });
                  }}
                  className="flex-1 p-2 border rounded"
                  placeholder="Enter resource name"
                />
              </div>
              <div className="col-span-3">
                {resource.type === 'file' ? resource.fileType : resource.type}
              </div>
              <div className="col-span-2">{resource.fileSize || '-'}</div>
              <div className="col-span-2 flex gap-2">
                {resource.type === 'file' && (
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <FiDownload />
                  </button>
                )}
                <button
                  onClick={() => {
                    const updated = formData.resources.filter(r => r.id !== resource.id);
                    setFormData({ ...formData, resources: updated });
                  }}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources; 