import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Helmet from "../../components/helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import "./ForgotPassword.css";
import LeftSection from "../../components/leftSidePannel/LeftSection";
import { Modal } from "react-bootstrap";
import vector from "../../../src/data/assests/download_img/Vector.svg";
import ToastMessage from "../../components/toast/ToastMessage";
import { useNavigate } from "react-router-dom";
import SpinLoader from "../../components/spin-loader/SpinLoader";

const ForgotPassword = ({ show, handleClose }) => {
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = React.useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [otp, setOtp] = useState();
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastError, setToastError] = useState("");
  const navigate = useNavigate();

  const handleConfirm = () => {
    // You can perform additional actions on age confirmation if needed
    setAgeConfirmed(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if username is in email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(userEmail);

    if (!userEmail || !isValidEmail) {
      setError("Kindly Enter the valid Email Address");
      console.log("error is there");
    } else {
      setError("");
      console.log("No error");

      try {
        const response = await fetch("/api/v1/sendresetpasswordemail/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        });

        // Handle the API response accordingly
        if (response.ok) {
          const responseData = await response.json();
          console.log("Forgot API Response: " + JSON.stringify(responseData));
          console.log("Login successful!");
          setIsDialog(true);
        } else {
          setShowErrorToast(true);
          setToastError("You are Not a Registered User.");
          console.error("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("An error occurred during login:", error.message);
      }
    }
  };

  const backHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleClickOk = async () => {
    if( otp && otp.length !== 6){
        setOtpError("Please provide 6 digit OTP")
    }
    else if( otp && otp.length == 6){
        try{
            const otpVerification = await fetch(
                "https://dmecart-38297.botics.co/api/v1/otp_verification/",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email: userEmail, otp: Number(otp) }),
                }
              );


              if (otpVerification.ok) {
                const responseData = await otpVerification.json();
                const token = responseData.auth_token
                const id = responseData.uid
                // console.log(token,id,"hi")
                navigate(`/createPassword/${token}/${id}`)
                setIsDialog(false);
                setOtp("")
                setOtpError(false)
            } else {
                setShowErrorToast(true);
                setIsDialog(false);
                setOtp("")
                setToastError("Invalid OTP provided. Try again");
              }
              // console.log("email", userEmail, "otp", otp)
              
        }
        catch(error){
            console.error("An error occurred:", error.message);
        }
        

    }
  };

  return (
    <Helmet title="Forgot-Password">
      {isLoading ? (
        <SpinLoader />
      ) : (
        <Container fluid className="h-100">
          <Row>
            <LeftSection />

            <Col
              lg="5"
              md="6"
              className="d-flex align-items-center justify-content-center"
            >
              <div style={{ padding: "20px", width: "80%" }}>
                <span
                  style={{
                    fontSize: "1.9rem",
                    position: "relative",
                    bottom: "15px",
                    cursor: "pointer",
                  }}
                  onClick={backHandler}
                >
                  <IoArrowBackCircleOutline />
                </span>
                <h3>Forgot Password</h3>
                <p style={{ fontSize: "13px", fontFamily: "Poppins" }}>
                  Enter your registered email address to receive a link via
                  email.{" "}
                </p>
                <form onSubmit={submitHandler}>
                  <div className="mb-4 input-group">
                    <input
                      type="text"
                      className="form-control shadow-none"
                      id="email"
                      placeholder="Email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                  </div>
                  <div>
                    <span className="error-mess">
                      {" "}
                      {error && (
                        <div
                          style={{
                            color: "#FF0000",
                            position: "relative",
                            bottom: "10px",
                          }}
                        >
                          {error}
                        </div>
                      )}{" "}
                    </span>
                    {/* <p className='error-mess'>Entered email address is not associated with any existing user account, please enter the correct email address</p> */}
                  </div>
                  <button type="submit" className="loginBtn">
                    Reset password
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      )}

      <Modal
        show={isDialog}
        onHide={handleClose}
        centered
        style={{ borderRadius: "8px" }}
      >
        <Modal.Header>
          <Modal.Title className="text-center d-flex align-items-center">
            <img
              src={vector}
              alt="Age Verification"
              className="modalImg"
              style={{ display: "block", margin: "auto" }}
            />
          </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body className="text-center" style={{ padding: "20px" }}>
          <p className="mainTxt">Reset link sent successfully</p>
          <h6 className="subTxt">
            A link has been sent to your email{" "}
            <span style={{ fontWeight: "bold" }}>{userEmail}.</span>{" "}
          </h6>
          <button onClick={() => setIsDialog(false)} className="close_ok_btn">
            Ok
          </button>
        </Modal.Body> */}
        <Modal.Body className="text-center" style={{ padding: "20px" }}>
          <p className="mainTxt">OTP sent successfully</p>
          <h6 className="subTxt">
            Please enter OTP sent to your email for verification{" "}<br/>
            {/* <span style={{ fontWeight: "bold" }}>{userEmail}.</span>{" "} */}
            <input
            className="mt-4 ps-2"
            style={{border:"1px solid black", borderRadius:"5px", height:"30px"}}
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            {otpError && <p style={{color:"red"}} className="mt-2">{otpError}</p>}
          </h6>
          <button onClick={handleClickOk} className="close_ok_btn">
            Ok
          </button>
        </Modal.Body>
      </Modal>

      <ToastMessage
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        message={toastError}
      />
    </Helmet>
  );
};

export default ForgotPassword;
