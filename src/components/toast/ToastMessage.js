import React from 'react';
import { Toast } from 'react-bootstrap';
import { MdErrorOutline } from "react-icons/md";

const ToastMessage = ({ show, onClose, message }) => {

    const toastStyle = {
        position: 'fixed',
        top: '15px',
        right: '10px',
        zIndex: 9999,
        width: 'auto', 
    };
    const taostMessage = {
        color: "#FF0000",
        border: "none",
        display: "flex",
        justifyContent: "flex-start",
        fontFamily: "Poppins",
        fontWeight:"500",
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "15px",
    }

    return (
        <Toast show={show} onClose={onClose} autohide delay={5000} style={toastStyle}>
            <Toast.Body style={taostMessage}> <MdErrorOutline /> <span style={{ position: "relative", left: "5px", bottom: "3px" }}>{message}</span></Toast.Body>
        </Toast>
    );
};

export default ToastMessage;
