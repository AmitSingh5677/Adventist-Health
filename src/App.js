import React, { useEffect } from 'react';
import './App.css';
import AppRoutes from './appRoutes/AppRoutes';
import Mixpanel from 'mixpanel-browser';



function App() {
  // useEffect(() => {
  //   // Track an event with specific data
  //   Mixpanel.track('Button Clicked', { buttonType: 'Primary' });
  // }, []);

  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
