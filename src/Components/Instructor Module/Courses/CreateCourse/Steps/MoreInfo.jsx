import React, { useState, useEffect, useCallback } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';

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

  const handleAddGlossaryItem = () => {
    setState(prev => {
      const newItems = [
        ...prev.glossaryItems,
        { 
          id: `glossary-${Date.now()}`, 
          term: '', 
          meaning: '' 
        }
      ];
      updateStore('glossary', newItems);
      return { ...prev, glossaryItems: newItems };
    });
  };

  const handleAddReference = () => {
    setState(prev => {
      const newRefs = [
        ...prev.references,
        { 
          id: `reference-${Date.now()}`, 
          title: '', 
          link: '' 
        }
      ];
      updateStore('references', newRefs);
      return { ...prev, references: newRefs };
    });
  };

  const handleGlossaryChange = (index, field, value) => {
    setState(prev => {
      const newItems = prev.glossaryItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      updateStore('glossary', newItems);
      return { ...prev, glossaryItems: newItems };
    });
  };

  const handleReferenceChange = (index, field, value) => {
    setState(prev => {
      const newRefs = prev.references.map((ref, i) =>
        i === index ? { ...ref, [field]: value } : ref
      );
      updateStore('references', newRefs);
      return { ...prev, references: newRefs };
    });
  };

  const handleRemoveItem = (type, index) => {
    setState(prev => {
      const newState = { ...prev };
      if (type === 'glossary') {
        newState.glossaryItems = prev.glossaryItems.filter((_, i) => i !== index);
        updateStore('glossary', newState.glossaryItems);
      } else {
        newState.references = prev.references.filter((_, i) => i !== index);
        updateStore('references', newState.references);
      }
      return newState;
    });
  };

  const renderItem = (item, index, type) => {
    const isCollapsed = state.collapsed.has(item.id);
    return (
      <div key={item.id} className="border rounded-lg">
        <div className="flex items-center justify-between p-3 bg-[#f3f4f6]">
          <div className="flex items-center gap-2">
            <span className="material-icons text-[#0056B3]">
              {type === 'glossary' ? 'menu_book' : 'description'}
            </span>
            <span>{type === 'glossary' ? `Glossary ${index + 1}` : `Reference ${index + 1}`}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRemoveItem(type, index)}
              className="text-red-500 hover:text-red-700"
            >
              <span className="material-icons">delete_outline</span>
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
          <div className="p-4 border-t">
            <div className="space-y-4">
              {type === 'glossary' ? (
                <>
                  <input
                    type="text"
                    placeholder="Word/Acronym/Abbreviation"
                    className="w-full p-2 border rounded"
                    value={item.term || ''}
                    onChange={(e) => handleGlossaryChange(index, 'term', e.target.value)}
                  />
                  <textarea
                    placeholder="Enter meaning here..."
                    className="w-full p-2 border rounded min-h-[100px]"
                    value={item.meaning || ''}
                    onChange={(e) => handleGlossaryChange(index, 'meaning', e.target.value)}
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Text"
                    className="w-full p-2 border rounded"
                    value={item.title || ''}
                    onChange={(e) => handleReferenceChange(index, 'title', e.target.value)}
                  />
                  <input
                    type="url"
                    placeholder="Links"
                    className="w-full p-2 border rounded"
                    value={item.link || ''}
                    onChange={(e) => handleReferenceChange(index, 'link', e.target.value)}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  console.log('Rendering with state:', state);
  return (
    <div className="bg-white rounded-lg p-6 h-[calc(100vh-280px)]">
      <div className="flex h-full">
        <div className="w-48 border-r pr-4 h-full">
          <div className="flex flex-col space-y-1">
            <button
              className={`text-left px-4 py-3 rounded-lg ${
                state.activeTab === 'glossary'
                  ? 'bg-[#f2f9ff] text-[#0056B3] font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setState(prev => ({ ...prev, activeTab: 'glossary' }))}
            >
              Glossary
            </button>
            <button
              className={`text-left px-4 py-3 rounded-lg ${
                state.activeTab === 'references'
                  ? 'bg-[#f2f9ff] text-[#0056B3] font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setState(prev => ({ ...prev, activeTab: 'references' }))}
            >
              References
            </button>
          </div>
        </div>

        <div className="flex-1 pl-6 h-full overflow-hidden">
          <div className="h-full flex flex-col">
            {state.activeTab === 'glossary' ? (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                  <h2 className="font-medium">Glossary</h2>
                  <button
                    onClick={handleAddGlossaryItem}
                    className="text-[#0056B3] hover:text-[#004494] flex items-center gap-1"
                  >
                    <span className="material-icons text-sm">add_circle_outline</span>
                    Add Another
                  </button>
                </div>
                <div className="space-y-2 overflow-y-auto pr-2 flex-grow">
                  {state.glossaryItems.map((item, index) => renderItem(item, index, 'glossary'))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                  <h2 className="font-medium">References</h2>
                  <button
                    onClick={handleAddReference}
                    className="text-[#0056B3] hover:text-[#004494] flex items-center gap-1"
                  >
                    <span className="material-icons text-sm">add_circle_outline</span>
                    Add Another
                  </button>
                </div>
                <div className="space-y-2 overflow-y-auto pr-2 flex-grow">
                  {state.references.map((item, index) => renderItem(item, index, 'references'))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MoreInfo); 