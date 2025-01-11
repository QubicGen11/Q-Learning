import React, { useState, useEffect, useCallback } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import { IoBookOutline, IoMenu } from "react-icons/io5";
import { RiDeleteBinLine } from 'react-icons/ri';
import { BsBook } from 'react-icons/bs';
function MoreInfo() {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const [state, setState] = useState({
    activeTab: 'glossary',
    glossaryItems: Array.isArray(courseData.glossary) ? courseData.glossary : [],
    references: Array.isArray(courseData.references) ? courseData.references : [],
    collapsed: new Set()
  });

  // Remove the courseData effect that was causing loops
  
  const updateStore = useCallback((type, data) => {
    // Prevent unnecessary store updates
    if (JSON.stringify(courseData[type]) !== JSON.stringify(data)) {
      updateCourseData(type, data);
    }
  }, [courseData, updateCourseData]);

  const toggleItem = (id) => {
    setState(prev => {
      const newCollapsed = new Set(prev.collapsed);
      if (newCollapsed.has(id)) {
        newCollapsed.delete(id);
      } else {
        newCollapsed.add(id);
      }
      return { ...prev, collapsed: newCollapsed };
    });
  };

  const handleGlossaryChange = (index, field, value) => {
    setState(prev => {
      const newItems = prev.glossaryItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      updateCourseData('glossary', newItems);
      return { ...prev, glossaryItems: newItems };
    });
  };

  const handleReferenceChange = (index, field, value) => {
    setState(prev => {
      const newRefs = prev.references.map((ref, i) =>
        i === index ? { ...ref, [field]: value } : ref
      );
      updateCourseData('references', newRefs);
      return { ...prev, references: newRefs };
    });
  };

  const handleAddGlossaryItem = () => {
    setState(prev => {
      const newItems = [
        ...prev.glossaryItems,
        { 
          id: `glossary-${Date.now()}`, 
          acronym: '', 
          meaning: '' 
        }
      ];
      updateCourseData('glossary', newItems);
      return { ...prev, glossaryItems: newItems };
    });
  };

  const handleAddReference = () => {
    setState(prev => {
      const newRefs = [
        ...prev.references,
        { 
          id: `reference-${Date.now()}`, 
          reference: '', 
          link: '' 
        }
      ];
      updateCourseData('references', newRefs);
      return { ...prev, references: newRefs };
    });
  };

  const handleRemoveItem = (type, index) => {
    setState(prev => {
      const newState = { ...prev };
      if (type === 'glossary') {
        newState.glossaryItems = prev.glossaryItems.filter((_, i) => i !== index);
        updateCourseData('glossary', newState.glossaryItems);
      } else {
        newState.references = prev.references.filter((_, i) => i !== index);
        updateCourseData('references', newState.references);
      }
      return newState;
    });
  };

  const renderItem = (item, index, type) => {
    const isCollapsed = state.collapsed.has(item.id);
    return (
      <div key={item.id} className="border rounded-lg bg-white shadow-sm">
        <div className="flex items-center justify-between p-4 border-b bg-[#f3f4f6]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="material-icons text-[#0056B3] font-extrabold text-3xl">
                {type === 'glossary' ? <IoMenu /> : <IoBookOutline  />}
              </span>
              <span className="text-lg font-[700]">
                {type === 'glossary' ? `Glossary ${index + 1}` : `Reference ${index + 1}`}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRemoveItem(type, index)}
              className="text-red-500 hover:text-red-700"
            >
                <span className="material-icons text-lg"><RiDeleteBinLine style={{ borderRadius: "500px" }} /> </span>
            </button>
            <button
              onClick={() => toggleItem(item.id)}
              className="text-gray-500"
            >
              <span className="material-icons">
                {isCollapsed ? 'expand_more' : 'expand_less'}
              </span>
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <div className="p-4 space-y-4 ">
            {type === 'glossary' ? (
              <>
                <div className="space-y-2">
                  <label className="block text-gray-700 text-sm mb-1">
                    Word/Acronym/Abbreviation *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                    value={item.acronym || ''}
                    onChange={(e) => handleGlossaryChange(index, 'acronym', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 text-sm mb-1">
                    Meaning *
                  </label>
                  <textarea
                    placeholder="Enter Answer here"
                    className="w-full p-2 border rounded min-h-[100px] focus:outline-none focus:ring-2 focus:ring-gray-600"
                    value={item.meaning || ''}
                    onChange={(e) => handleGlossaryChange(index, 'meaning', e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="block text-gray-700 text-sm mb-1">
                    Text *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                    value={item.reference || ''}
                    onChange={(e) => handleReferenceChange(index, 'reference', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 text-sm mb-1">
                    Links *
                  </label>
                  <input
                    type="url"
                    placeholder="Enter link"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                    value={item.link || ''}
                    onChange={(e) => handleReferenceChange(index, 'link', e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  console.log('Rendering with state:', state);
  return (
    <div className="bg-white rounded-lg  mt-2">
      <div className="flex h-full">
        <div className="fixed calc-height w-[310px] h-[600px] gap-4 p-4 border-2 border-[#E2E8F0] overflow-x-hidden overflow-y-auto bg-white">
          <div className="flex flex-col space-y-1">
          <h2 className="font-medium mb-4 w-[84px] h-[24px] relative" style={{ fontSize: '16px', fontWeight: '500', lineHeight: '24px', letterSpacing: '0.15px', textAlign: 'left', color: '#1A202C' }}>More Info</h2>
            <button
              className={`flex font-normal items-center rounded text-[14px] h-[36px] w-[278px] gap-2 text-[#0056B3] bg-[#f2f9ff] mb-4 pl-4  ${
                state.activeTab === 'glossary'
                  ? 'bg-[#f2f9ff] text-[#0056B3] font-medium border-l-4 border-[#0056B3]'
                  : 'text-gray-600 hover:bg-gray-50'
                  
              }`}
              onClick={() => setState(prev => ({ ...prev, activeTab: 'glossary' }))}
            >
              Glossary
            </button>
            <button
              className={`flex font-normal items-center rounded text-[14px] h-[36px] w-[278px] gap-2 text-[#0056B3] bg-[#f2f9ff] mb-4 pl-4   ${
                state.activeTab === 'references'
                  ? 'bg-[#f2f9ff] text-[#0056B3] font-medium border-l-4 border-[#0056B3]'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
             
              onClick={() => setState(prev => ({ ...prev, activeTab: 'references' }))}
            >
              References
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center ml-[310px]">
          <div className="w-[830px] overflow-y-auto h-[600px]">
          <div className="h-full flex flex-col">
            {state.activeTab === 'glossary' ? (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                  <h2 className="font-[700] text-2xl text-gray-600">Glossary</h2>
                  <button
                    onClick={handleAddGlossaryItem}
                    className="text-[#0056B3] hover:text-[#004494] flex items-center gap-1"
                  >
                    <span className="material-icons text-sm">add_circle_outline</span>
                    {state.glossaryItems.length > 0 ? 'Add Another Glossary' : 'Add Glossary'}
                  </button>
                </div>
                <div className="space-y-2 overflow-y-auto pr-2 flex-grow">
                  {!state.glossaryItems.length ? (
                    <div className="h-full flex flex-col items-center justify-center">
                      <p className="text-gray-500 text-3xl">Add glossary items to display</p>
                    </div>
                  ) : (
                    state.glossaryItems.map((item, index) => renderItem(item, index, 'glossary'))
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <h2 className="font-[700] text-2xl text-gray-600">Reference</h2>
                  <button
                    onClick={handleAddReference}
                    className="text-[#0056B3] hover:text-[#004494] flex items-center gap-1"
                  >
                    <span className="material-icons text-sm">add_circle_outline</span>
                    Add Reference 
                  </button>
                </div>
                <div className="space-y-2 overflow-y-auto pr-2 flex-grow">
                  {!state.references.length ? (
                    <div className="h-full flex flex-col items-center justify-center">
                      <p className="text-gray-500 text-3xl">Add reference items to display</p>
                    </div>
                  ) : (
                    state.references.map((item, index) => renderItem(item, index, 'references'))
                  )}
                  
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MoreInfo); 