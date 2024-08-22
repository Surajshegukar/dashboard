import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from 'react-icons/fa';
import { useWidgetContext } from '../Context/WidgetContext'; // Adjust the path based on your project structure

const AddWidgetModal = ({ onClose }) => {
  const { data, setData } = useWidgetContext();
  
  const [activeTab, setActiveTab] = useState(data[0].tab);
  const [newTabName, setNewTabName] = useState('');
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetType, setNewWidgetType] = useState('pie');
  const [newWidgetLabel, setNewWidgetLabel] = useState('');
  const [newWidgetData, setNewWidgetData] = useState('');
  const [newWidgetColors, setNewWidgetColors] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [slideInput, setSlideInput] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddTab = () => {
    if (newTabName && !data.some(tabData => tabData.tab === newTabName)) {
      setData([...data, { tab: newTabName, charts: [] }]);
      setNewTabName('');
      setActiveTab(newTabName);
    }
    setSlideInput(false);
  };

  const handleAddWidget = () => {
    if (newWidgetName && newWidgetData && newWidgetColors) {
      const updatedData = data.map(tabData => {
        if (tabData.tab === activeTab) {
          const updatedCharts = [...tabData.charts];
          if (editMode !== null) {
            updatedCharts[editMode] = {
              name: newWidgetName,
              type: newWidgetType,
              labelName: newWidgetLabel.split(','),
              data: newWidgetData.split(',').map(Number),
              colors: newWidgetColors.split(','),
              labelName:newWidgetLabel.split(',')
            };
          } else {
            updatedCharts.push({
              name: newWidgetName,
              type: newWidgetType,
              labelName: newWidgetLabel.split(','),
              data: newWidgetData.split(',').map(Number),
              colors: newWidgetColors.split(','),
              labelName:newWidgetLabel.split(',')
            });
          }
          return { ...tabData, charts: updatedCharts };
        }
        return tabData;
      });

      setData(updatedData);
      setNewWidgetName('');
      setNewWidgetType('pie');
      setNewWidgetLabel('');
      setNewWidgetData('');
      setNewWidgetColors('');
      setEditMode(null);
    }
  };

  const handleEditWidget = (index) => {
    const tabData = data.find(tabData => tabData.tab === activeTab);
    const widgetToEdit = tabData.charts[index];
    setNewWidgetName(widgetToEdit.name);
    setNewWidgetType(widgetToEdit.type);
    setNewWidgetLabel(widgetToEdit.labelName.join(','));
    setNewWidgetData(widgetToEdit.data.join(','));
    setNewWidgetColors(widgetToEdit.colors.join(','));
    setEditMode(index);
  };

  const handleDeleteWidget = (index) => {
    const updatedData = data.map(tabData => {
      if (tabData.tab === activeTab) {
        const updatedCharts = tabData.charts.filter((_, i) => i !== index);
        return { ...tabData, charts: updatedCharts };
      }
      return tabData;
    });

    setData(updatedData);
  };

  const handleDeleteTab = (tab) => {
    const filteredTabs = data.filter(tabData => tabData.tab !== tab);
    
    setData(filteredTabs);

    if (activeTab === tab && filteredTabs.length > 0) {
      setActiveTab(filteredTabs[0].tab);
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedData = data.map(tabData => {
      if (tabData.tab === activeTab) {
        const updatedCharts = tabData.charts.map((chart, i) => {
          if (i === index) {
            return { ...chart, selected: !chart.selected };
          }
          return chart;
        });
        return { ...tabData, charts: updatedCharts };
      }
      return tabData;
    });

    setData(updatedData);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-scroll">
      <div className="absolute top-0 right-0 bg-white rounded-lg w-half p-4 ">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Add Widget</h2>
          <button className="text-gray-500" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b mt-4 overflow-x-hidden">
          {data.map((tabData) => (
            <div key={tabData.tab} className="relative flex items-center">
              <button
                onClick={() => handleTabClick(tabData.tab)}
                className={`px-4 py-2 text-sm font-semibold focus:outline-none ${
                  activeTab === tabData.tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600'
                }`}
              >
                {tabData.tab}
              </button>
              <button
                onClick={() => handleDeleteTab(tabData.tab)}
                className="absolute top-2 right-0 transform -translate-y-2/4 translate-x-1/2 text-red-500 text-xs focus:outline-none"
              >
                <FaTimes />
              </button>
            </div>
          ))}
          <div className="relative ml-4">
            <button
              onMouseEnter={() => setSlideInput(true)}
              
              className={`px-4 py-2 bg-green-500 relative top-4 text-white rounded-md text-sm transition-transform duration-300 transform ${slideInput ? '-translate-x-12 opacity-0' : 'translate-x-0 opacity-100'}`}
            >
              Add Tab
            </button>
            <div onMouseLeave={()=>setSlideInput(false)} className={`flex items-center relative bottom-4 transition-transform duration-500 ${slideInput ? 'translate-x-0' : 'translate-x-full'}`}>
              <input
                type="text"
                placeholder="New Tab Name"
                value={newTabName}
                onChange={(e) => setNewTabName(e.target.value)}
                className="ml-4 px-2  py-1 border rounded-md text-sm"
              />
              <button
                onClick={handleAddTab}
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="mt-4 space-y-2 ">
          {data.find(tabData => tabData.tab === activeTab)?.charts.map((widget, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={!!widget.selected}
                  onChange={() => handleCheckboxChange(index)}
                  className="mr-2"
                />
                <p className="text-sm font-semibold">{widget.name}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditWidget(index)}
                  className="text-blue-500"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteWidget(index)}
                  className="text-red-500"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
        <hr className="my-4" />

        {/* Modal Form */}
        <div className="flex flex-col mt-4 space-y-4">
          <div className='flex flex-wrap'>
            <label className="block text-sm font-semibold">Widget Name</label>
            <input
              type="text"
              value={newWidgetName}
              onChange={(e) => setNewWidgetName(e.target.value)}
              className="mt-1 px-3 py-2 border rounded-md w-full"
            />
          </div>
          <div className='flex flex-wrap'>
            <label className="block text-sm font-semibold">Widget Type</label>
            <select
              value={newWidgetType}
              onChange={(e) => setNewWidgetType(e.target.value)}
              className="mt-1 px-3 py-2 border rounded-md w-full"
            >
              <option value="pie">Pie</option>
              <option value="bar">Bar</option>
              <option value="line">Line</option>
            </select>
          </div>
          <div className='flex flex-wrap'>
            <label className="block text-sm font-semibold">Label (comma separated)</label>
            <input
              type="text"
              value={newWidgetLabel}
              onChange={(e) => setNewWidgetLabel(e.target.value)}
              className="mt-1 px-3 py-2 border rounded-md w-full"
            />
          </div>

          <div className='flex flex-wrap'>
            <label className="block text-sm font-semibold">Data (comma separated)</label>
            <input
              type="text"
              value={newWidgetData}
              onChange={(e) => setNewWidgetData(e.target.value)}
              className="mt-1 px-3 py-2 border rounded-md w-full"
            />
          </div>
          <div className='flex flex-wrap'>
            <label className="block text-sm font-semibold">Colors (comma separated)</label>
            <input
              type="text"
              value={newWidgetColors}
              onChange={(e) => setNewWidgetColors(e.target.value)}
              className="mt-1 px-3 py-2 border rounded-md w-full"
            />
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleAddWidget}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
          >
            {editMode !== null ? 'Save Changes' : 'Add Widget'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
