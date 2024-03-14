
import React, { useState } from 'react'
import "./SignIn.css"
import Helmet from '../../components/helmet/Helmet'
import { Col, Container, Row } from 'reactstrap'
import LeftSection from '../../components/leftSidePannel/LeftSideSection'
import { FaEnvelope, FaEye } from 'react-icons/fa'

const SignIn = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const signInHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/v1/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.ok) {
                // setIsLoading(true)
                const responseData = await response.json();
                console.log("Login API Response: " + JSON.stringify(responseData));

                sessionStorage.setItem("token", JSON.stringify(responseData.token))
            } else {

                console.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('An error occurred during login:', error.message);
        }

    }

    return (
        <Helmet title="Create Your Account">
            <Container fluid className="h-100">
                <Row>
                    <LeftSection />

                    <Col lg="5" md="6" className="d-flex align-items-center justify-content-center">
                        <div style={{ padding: '20px', width: '80%' }}>
                            <h3 style={{ position: "relative", bottom: "5px" }}>Login</h3>
                            <form onSubmit={signInHandler}>
                                <div className="mb-4 input-group" >
                                    <input type="text" className="form-control shadow-none" id="email" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Email' />
                                    <span className="input-group-text"><FaEnvelope /></span>
                                </div>
                                <div className="mb-3 input-group">
                                    <input
                                        type="password"
                                        className="form-control shadow-none"
                                        id="password"
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                        className="input-group-text"

                                    >
                                        <FaEye />
                                    </span>
                                </div>
                                <div className='resetPassword'>
                                    <p>Forgot Password?</p>
                                </div>

                                <button type="submit" className="loginBtn">LOGIN</button>
                            </form>
                            <div>
                                <h6 className='sign_up' >Don’t have an account?  <span style={{ color: "#4DA7FF", fontWeight: "600", cursor: "pointer" }} >Sign up</span></h6>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Helmet>
    )
}

export default SignIn