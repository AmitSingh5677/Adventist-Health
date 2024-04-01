import React, { useEffect } from 'react';
import './App.css';
import AppRoutes from './appRoutes/AppRoutes';
import Mixpanel from 'mixpanel-browser';

import OneSignal from 'react-onesignal';


function App() {
  const mixpanelToken = 'c8749db644c346f22ea52410e2ccd7d8';
  Mixpanel.init(mixpanelToken, { debug: true, track_pageview: true, persistence: 'localStorage' });

  useEffect(() => {
     OneSignal.init({ appId: "340aa81e-84fe-41a1-a6aa-ba4f3b21b1dc",allowLocalhostAsSecureOrigin: true, });
    // OneSignal.login('')
    // OneSignal.Notifications.addEventListener('click', (event) => {
    //   console.log("The notification was clicked!", event);
    // });
    Mixpanel.track("App Opened");
  }, []);

  

  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
