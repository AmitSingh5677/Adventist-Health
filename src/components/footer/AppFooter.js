
import React, { useState } from 'react';
import "./AppFooter.css"
import { Container } from 'reactstrap';
import SpinLoader from "../spin-loader/SpinLoader"
import { useNavigate } from 'react-router-dom';
import HelpCenterModel from '../help_center/HelpCenterModel';

const AppFooter = () => {

    const navigate = useNavigate()

    const termsRouteHandler = () => {
        navigate("/Terms&&Conditions")
    };



    // rgba(85, 86, 90, 1)
    return (
        <div>
            <footer style={{ backgroundColor: 'rgba(236, 236, 236, 1)', color: 'black', padding: '10px', position: 'fixed', bottom: 0, width: '100%', textAlign: 'center', marginBottom: "0px" }}>
                <Container>
                    <div style={{ fontFamily: 'Inter', fontWeight: "400", padding: "5px", cursor: "pointer" }}>
                        <span style={{ float: 'left' }}>Copyright 2023 All Rights Reserved.</span>
                        <span style={{ float: 'right' }} className='subFooterTxt'><span onClick={termsRouteHandler}>Terms Of Use</span>   |  Privacy Policy  | <span onClick={() => navigate("/SendFeedBack")}>Help Center</span> </span>
                    </div>
                </Container>

            </footer>



        </div>
    )
}

export default AppFooter