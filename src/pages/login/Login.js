import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { json, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import Helmet from '../../components/helmet/Helmet';
import { Col, Container, Row } from 'reactstrap';
import "./Login.css";
import LeftSection from '../../components/leftSidePannel/LeftSection';
import SpinLoader from '../../components/spin-loader/SpinLoader';
import ToastMessage from '../../components/toast/ToastMessage';
import Mixpanel from 'mixpanel-browser';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastError, setToastError] = useState('');

  const navigate = useNavigate();
  const mixpanelToken = 'c8749db644c346f22ea52410e2ccd7d8';
  Mixpanel.init(mixpanelToken, {debug: true, track_pageview: true, persistence: 'localStorage'});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //Route Function to Frogot Password
  const routeHandler = () => {
    setIsLoading(true)
    setTimeout(() => {
      navigate("/ForgotPassword")
    }, 2000)
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    // Check if username is in email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(username);

    if (!username || !isValidEmail) {
      setUsernameError('Please enter a valid Email Address');
    } else {
      setUsernameError('');
    }
    // if (password.length < 6) {
    //   alert("Passowrd is Short")
    // }
    if (!password) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }

    if (!username || !password || !isValidEmail) {
      return;
    }

    setUsernameError('');
    setPasswordError('');
    
   

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
        Mixpanel.track("Login")
        Mixpanel.identify(username)
        setIsLoading(true)
        const responseData = await response.json();
        const role = responseData.user_role
        const id = responseData.user.id
        console.log("Login API Response: " + JSON.stringify(responseData.token));
        // alert('Login successful!');
        // console.log(id,role,"123",)
        if(role === "patient"){
          setTimeout(() => {
            navigate("/homePage")
          }, 3000)
          sessionStorage.setItem("token", JSON.stringify(responseData.token))
        }
        if(role ==="business"){
          const res = await fetch(`https://dmecart-38297.botics.co/business/stripe_verification/${id}/`) 
          const resData = await res.json()
          if(resData.details === "Stripe account available"){
            console.log(resData,"res")
            setTimeout(() => {
              navigate("/b/allorders")
            }, 3000)
            sessionStorage.setItem("token", JSON.stringify(responseData.token))
            sessionStorage.setItem("userid", JSON.stringify(responseData.user.id))
          }
          else{
            // stripe Account Craetion API -- connect bank api
          const stripeApiResponse = await fetch(
            `/business/connect_bank/${id}/`,
            {
              method: "GET",
            }
          );

          if (stripeApiResponse.status === 200) {
            const stripeUrl = await stripeApiResponse.json();
            setIsLoading(true);
            // Redirect the user to the received URL
            window.location.href = stripeUrl.account_creation_url;
          }
          else {
              console.error(
                "Error calling second API:",
                stripeApiResponse.statusText
              );
            }
          }
          // stripe account creation - ends 
        }
      } else {
        setShowErrorToast(true);
        console.error('Login failed. Please check your credentials.');
        setToastError("Unable to log in with provided credentials.")
      }
    } catch (error) {
      console.error('An error occurred during login:', error.message);
    }
  };

  const signUpHandler = () => {
    setIsLoading(true)
    setTimeout(() => {
      navigate("/sign-up")
    }, 2000)
  }

  // useEffect(() => {

  //   Mixpanel.track('User Registration', {
  //     username,
  //   });

  // }, [isLoading])

  return (
    <Helmet title="Login Page">
      {isLoading ? <SpinLoader /> : <Container fluid className="h-100">
        <Row>
          <LeftSection />

          <Col lg="5" md="6" className="d-flex align-items-center justify-content-center">
            <div style={{ padding: '20px', width: '80%' }}>
              <h3 style={{ position: "relative", bottom: "5px" }}>Login</h3>
              <form onSubmit={loginHandler}>
                <div className="mb-4 input-group" >
                  <input type="text" className="form-control shadow-none" id="email" value={username} placeholder='Email' onChange={(e) => setUsername(e.target.value)} />
                  <span className="input-group-text"><FaEnvelope /></span>
                </div>
                <span className='error-mess'> {usernameError && <div style={{ position: "relative", bottom: "10px" }}>{usernameError}</div>} </span>
                <div className="mb-3 input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control shadow-none"
                    id="password"
                    placeholder='Password'
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
                <span className='error-mess'> {passwordError && <div>{passwordError}</div>} </span>
                <div className='resetPassword'>
                  <p onClick={routeHandler}>Forgot Password?</p>
                </div>

                <button type="submit" className="loginBtn">LOGIN</button>
              </form>
              <div>
                <h6 className='sign_up' >Don’t have an account?  <span style={{ color: "#4DA7FF", fontWeight: "600", cursor: "pointer" }} onClick={signUpHandler}>Sign up</span></h6>
              </div>
            </div>
          </Col>
        </Row>
      </Container>}

      <ToastMessage show={showErrorToast} onClose={() => setShowErrorToast(false)} message={toastError} />


    </Helmet>
  );
};

export default Login;
