import mixpanel from 'mixpanel-browser';


const mixpanelToken = 'c8749db644c346f22ea52410e2ccd7d8';
mixpanel.init(mixpanelToken, {debug: true, track_pageview: true, persistence: 'localStorage'});


export default mixpanel;