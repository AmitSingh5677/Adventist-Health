import React, { useEffect } from 'react';
import './App.css';
import AppRoutes from './appRoutes/AppRoutes';
import Mixpanel from 'mixpanel-browser';



function App() {
  const mixpanelToken = 'c8749db644c346f22ea52410e2ccd7d8';
  Mixpanel.init(mixpanelToken, {debug: true, track_pageview: true, persistence: 'localStorage'});

  useEffect(() => {
    Mixpanel.track("App Opened");
  }, []);

  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
