import React, { createContext, useContext, useState } from 'react';

// Create the context
const WidgetContext = createContext();

// Custom hook to use the WidgetContext
export const useWidgetContext = () => useContext(WidgetContext);

// Create the provider component
export const WidgetProvider = ({ children }) => {
  // State for managing tabs and charts
  const [data, setData] = useState([
    {
      tab: 'CSPM',
      charts: [
        { name: 'Cloud Accounts', type: 'pie', labelName: ["label1", "label2"], data: [10, 20], colors: ['#36A2EB', '#FFCE56'] },
        { name: 'Cloud Account Risk Assessment', type: 'pie', labelName: ["label3", "label4"], data: [34, 45], colors: ['#FF6384', '#4BC0C0'] },
        
      ]
    },
    {
      tab: 'CWPP',
      charts: [
        { name: 'Risk Assessment', type: 'bar', labelName: ["label5", "label6"], data: [20, 50], colors: ['green', '#4BC0C0'] },
        { name: 'Cloud  Assessment', type: 'pie', labelName: ["label7", "label8"], data: [79, 50], colors: ['yellow', '#4BC0C0'] },
        { name: 'Account Risk Assessment', type: 'line', labelName: ["label9", "label0","label3","label2","label5","label4"], data: [30, 10,29,35,33,30], colors: ['grey', '#4BC0C0'] },
        { name: 'Accounts', type: 'bar', labelName: ["label1", "label2"], data: [10, 20], colors: ['#36A2EB', '#FFCE56'] }
      ]
    },
    {
      tab: 'Image',
      charts: [
        { name: 'Cloud Accounts', type: 'line', labelName: ["label1", "label2"], data: [10, 20], colors: ['#36A2EB', '#FFCE56'] }
      ]
    },
    {
      tab: 'Ticket',
      charts: [
        { name: 'Cloud Accounts', type: 'pie', labelName: ["label1", "label2"], data: [10, 20], colors: ['#36A2EB', '#FFCE56'] }
      ]
    }
  ]);

  // State for controlling the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState('');


  const value = {
    data,
    setSearch,
    search,
    setData,
    isModalOpen,
    setIsModalOpen,
  };

  return (
    <WidgetContext.Provider value={value}>
      {children}
    </WidgetContext.Provider>
  );
};
