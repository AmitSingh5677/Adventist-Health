
import React, { useState } from 'react';
import "./AppFooter.css"
import { Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


const AppFooter = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate()

    const termsRouteHandler = () => {
        navigate("/Terms&&Conditions")
    };

    const modleHandler = () => {
        setModalOpen(true)
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };


    return (
        <div>
             <footer style={{ backgroundColor: 'rgba(236, 236, 236, 1)', color: 'black', padding: '10px', position: 'fixed', bottom: 0, width: '100%', textAlign: 'center', marginBottom: "0px" }}>
                <Container>
                    <div style={{ fontFamily: 'Inter', fontWeight: "400", padding: "5px", cursor: "pointer" }}>
                        <span style={{ float: 'left' }}>Copyright 2023 All Rights Reserved.</span>
                        <span style={{ float: 'right' }} className='subFooterTxt'><span onClick={termsRouteHandler}>Terms Of Use</span>   |  Privacy Policy  | <span onClick={modleHandler}>Help Center</span> </span>
                    </div>
                </Container>

            </footer>


        </div>
    )
}

export default AppFooter