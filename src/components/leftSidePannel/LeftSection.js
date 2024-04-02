import React from 'react';
import "./LeftSection.css"
import { Col } from 'reactstrap';
import loginDoodles from "../../../src/data/assests/logo/logindoodles.png";
import DmeCartLogo from "../../../src/data/assests/logo/DmeCART.png"

const LeftSection = () => {
    return (
        <Col lg="7" md="6" className="p-0" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <div  className='main_conatiner'>
                <img src={loginDoodles} alt='login doodles' className='img-fluid mr-2' />
            </div>
            <div  className='logo_conatiner' style={{backgroundColor:"#ECECEC"}}>
                <img src={DmeCartLogo} alt='DmeCart logo' className='logoImg' />   
            </div>
        </Col>
    );
};

export default LeftSection;
