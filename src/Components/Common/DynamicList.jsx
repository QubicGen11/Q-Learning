import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const DynamicList = ({ items = [], onChange, placeholder }) => {
  const handleAdd = () => {
    onChange([...items, '']);
  };

  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleChange(index, e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="p-2 text-red-600 hover:text-red-800"
          >
            <FiTrash2 />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center gap-2 text-[#5624D0] hover:text-[#4B1F9E]"
      >
        <FiPlus /> Add Item
      </button>
    </div>
  );
};

export default DynamicList; 