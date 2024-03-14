import React from 'react';
import "./LeftSideSection.css"

import loginDoodles from "../../data/assests/downloaded__imgs/logindoodles.png";
import DmeCartLogo from "../../data/assests/downloaded__imgs/DmeCART.png"
import { Col } from 'reactstrap';

const LeftSection = () => {
    return (
        <Col lg="7" md="6" className="p-0" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <div className='main_conatiner'>
                <img src={loginDoodles} alt='login doodles' className='img-fluid mr-2' />
            </div>
            <div className='logo_conatiner'>
                <img src={DmeCartLogo} alt='DmeCart logo' className='logoImg' />
            </div>
        </Col>
    );
};

export default LeftSection;
