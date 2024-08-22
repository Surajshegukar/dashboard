import React from 'react';
import ChartComponent from './ChartComponent';
import AddWidgetModal from './AddWidgetModal';
import { useWidgetContext } from '../Context/WidgetContext';
import { FaPlus, FaSearch } from 'react-icons/fa';

const Dashboard = () => {
  const { widgets, activeTab, search, setSearch, data, setActiveTab, isModalOpen, setIsModalOpen, tabs } = useWidgetContext();

  return (
    <div className="flex flex-col gap-5 mt-5 overflow-hidden">
      {/* Search Result Header */}
      {search && (
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaSearch />
            <span>Search results for "{search}"</span>
          </div>
          <button onClick={() => setSearch('')} className="text-blue-600">Clear</button>
        </div>
      )}

      {/* Map through data */}
      {data.map((tab, index) => (
        <div key={index} className="bg-gray-100 rounded-lg ml-9 max-w-full p-4 flex flex-col">
          <h3 className="text-start">{tab.tab}</h3>
          <div className="p-4 flex flex-wrap gap-5 mt-1">
            {tab.charts.filter(widget => {
              // Search logic: show widget if search is empty or widget name matches the search
              return search === "" || widget.name.toLowerCase().includes(search.toLowerCase());
            }).map((widget, widgetIndex) => (
              <div key={widgetIndex} className="bg-white p-4 rounded-lg shadow-md w-64 h-80">
                <h2 className="text-lg font-semibold mb-2">{widget.name}</h2>
                <ChartComponent
                  type={widget.type}
                  data={{
                    labels: widget.labelName,
                    datasets: [
                      {
                        label: widget.name,
                        data: widget.data,
                        backgroundColor: widget.colors,
                        hoverBackgroundColor: widget.colors,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </div>
            ))}

            {/* Add Widget Button */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md flex items-center justify-center w-full lg:w-64">
              <button onClick={() => setIsModalOpen(true)} className="text-blue-600">
                + Add Widget
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal for Adding Widget */}
      {isModalOpen && <AddWidgetModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Dashboard;
