import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import Helmet from '../../components/helmet/Helmet';
import { Col, Container, Row } from 'reactstrap';
// import "./Login.css";
import LeftSection from '../../components/leftSidePannel/LeftSection';


const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [confrimPassword, setConfrimPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confrimError, setConfrimError] = useState("")
    const [showPassword, setShowPassword] = React.useState(false);
    const [isPasswordConfrim, setIsPasswordConfrim] = React.useState(false)
    const navigate = useNavigate();
    const { token, id } = useParams();
    
    console.log('Token:', token);
    console.log('ID:', id);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const confrimPasswordHandler = () => {
        setIsPasswordConfrim(!isPasswordConfrim)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        // alert("vijay")
        if (!password) {
            setPasswordError("Enter Your Password.")
        } else {
            setPasswordError('');
        }

        if (!confrimPassword) {
            setConfrimError("Enter Your Confrim Password.")
        } else {
            setConfrimError('');
        };

        try {
            const response = await fetch('/rest-auth/password/reset/confirm/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "new_password1": password,
                    "new_password2": confrimPassword,
                    "uid": "MjA",
                    "token": "6i5-70f405bbca36120ee511"
                }),
            });

            if (response.ok) {
                // setIsLoading(true)
                const responseData = await response.json();
                console.log("Login API Response: " + JSON.stringify(responseData));
                alert('Login successful!');
                setTimeout(() => {
                    navigate("/homePage")
                }, 3000)
                // Store Token for Home Page
            } else {
                alert("Failed")
                // setShowErrorToast(true);
                console.error('Login failed. Please check your credentials.');
                // setToastError("Unable to log in with provided credentials.")
            }
        } catch (error) {
            console.error('An error occurred during login:', error.message);
        }
    }
    return (
        <Helmet title="Change-Password">
            <Container fluid className="h-100">
                <Row>
                    <LeftSection />

                    <Col lg="5" md="6" className="d-flex align-items-center justify-content-center">
                        <div style={{ padding: '20px', width: '80%' }}>
                            <h3 className="mb-3">Change Password</h3>
                            <form onSubmit={submitHandler}>
                                <div className="mb-4 input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control shadow-none"
                                        id="password"
                                        placeholder='New Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                        className="input-group-text"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                <span className='errorTxt'> {passwordError && <div style={{ color: '#FF0000', position: "relative", bottom: "10px" }}>{passwordError}</div>} </span>

                                <div className="mb-4 input-group">
                                    <input
                                        type={isPasswordConfrim ? "text" : "password"}
                                        className="form-control shadow-none"
                                        id="password"
                                        placeholder='Confrim Password'
                                        value={confrimPassword}
                                        onChange={(e) => setConfrimPassword(e.target.value)}
                                    />
                                    <span
                                        className="input-group-text"
                                        onClick={confrimPasswordHandler}
                                    >
                                        {isPasswordConfrim ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                <span className='errorTxt'> {confrimError && <div style={{ color: '#FF0000', position: "relative", bottom: "10px" }}>{confrimError}</div>} </span>


                                <button type="submit" className="loginBtn">Change Password</button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Helmet>
    );
};

export default ChangePassword;
