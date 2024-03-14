import React from 'react';
import { Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './SpinLoader.css';// Create this CSS file for styling

const SpinLoader = () => {
  return (
    <div className="loader-container">
      <Spinner color="success" style={{ width: '3rem', height: '3rem' }} />
    </div>
  );
};

export default SpinLoader;
