import React, { useState } from 'react';
import { WidgetProvider } from './Context/WidgetContext';
import './App.css';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';

function App() {
  

  return (
    <div className="App">
    <WidgetProvider>
      <Navbar />
      <Dashboard />
    </WidgetProvider>
    </div>
    
  );
}

export default App;
