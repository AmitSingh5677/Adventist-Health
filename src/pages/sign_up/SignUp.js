import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import Helmet from "../../components/helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import LeftSection from "../../components/leftSidePannel/LeftSection";
import "./SignUp.css";
import { Modal } from "react-bootstrap";
import ageVector from "../../data/assests/download_img/Age.svg";
import { useNavigate } from "react-router-dom";
import PrivacyPage from "../privacy_Page/PrivacyPage";
import SpinLoader from "../../components/spin-loader/SpinLoader";
import ToastMessage from "../../components/toast/ToastMessage";
import SucessMessage from "../../components/successToast/SuccessToast";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userLoaction, setUserLoacation] = useState("");
  const [userZipCode, setUserZipCode] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfrimPassword, setUserConfrimPassword] = useState("");
  const [userconsent, setUserConsent] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isConfrimPassword, setIsConfrimPassword] = React.useState(false);
  const [isDialog, setDialog] = React.useState(false);
  const [isconfrimed, setIsConfrimed] = React.useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [locationError, setLoactionError] = useState("");
  const [zipcodeError, setZipcodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confrimError, setConfrimPasswordError] = useState("");
  const [consentError, setConsentError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastError, setToastError] = useState("");
  const [ispasswordLenght, setIsPassword] = useState("");
  const [isConpasswordLen, setIsConPasssowrdLen] = useState("");
  const [ispassowrdcommon, setIsCommon] = useState("");
  const navigate = useNavigate();
  const [sucessToast, setSucessToast] = useState(false);
  const [isSucess, setIsucess] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordHandler = () => {
    setIsConfrimPassword(!isConfrimPassword);
  };

  const termPageRouteHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/Terms&&Conditions");
    }, 2000);
  };

  const PrivacyPageHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/Privacy-Policy");
    }, 2000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(userEmail);

    if (!userEmail || !isValidEmail) {
      setEmailError("Kindly Enter a valid Email Address.");
      console.log("error is there");
    } else {
      setEmailError("");
      // console.log("No error");
    }

    if (!userName) {
      setNameError("Enter Your Full Name.");
    } else {
      setNameError("");
    }

    if (!userLoaction) {
      setLoactionError("Enter Your Current Location.");
    } else {
      setLoactionError("");
    }

    if (!userZipCode || userZipCode.length < 5) {
      setZipcodeError("Enter a valid ZIP code with at least 5 digits.");
    } else {
      setZipcodeError("");
    }

    if (!userPassword.trim()) {
      setPasswordError("Enter Your Password.");
    } else if (userPassword.length < 8) {
      setPasswordError("");
      setIsPassword("Password length should be more than 8 characters");
    } else {
      setPasswordError("");
      setIsPassword("");
    }

    if (!userConfrimPassword.trim()) {
      setConfrimPasswordError("Enter Your Password.");
    } else if (userConfrimPassword.length < 8) {
      setConfrimPasswordError("");
      setIsConPasssowrdLen(
        "Confrim password length should be more than 8 characters"
      );
    } else if (userPassword !== userConfrimPassword) {
      setConfrimPasswordError("Password and confirm password must match");
    } else {
      setConfrimPasswordError("");
      setIsConPasssowrdLen("");
    }

    if (!userconsent) {
      setConsentError("Accept The Terms and Conditions");
    } else {
      setConsentError("");
    }

    // if (userPassword !== userConfrimPassword) {
    //     // setConfrimPasswordError('Password and Confirm Password must match.');
    //     setShowErrorToast(true);
    //     setToastError('Password and Confirm Password must match.');
    //     return;
    // } else {
    //     setConfrimPasswordError('');
    // }

    if (
      !userEmail ||
      !userName ||
      !userLoaction ||
      !userZipCode ||
      !userPassword ||
      !userConfrimPassword ||
      !userconsent ||
      userPassword.length < 8 ||
      userPassword !== userConfrimPassword
    ) {
      return;
    }

    // If there are no errors, setDialog(true)
    setDialog(true);
  };

  const moduleHandler = async () => {
    try {
      const response = await fetch("/api/v1/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          full_name: userName,
          location: userLoaction,
          zip_code: userZipCode,
          password: userPassword,
          confirm_password: userConfrimPassword,
          role: "patient",
        }),
      });

      if (response.ok) {
        setSucessToast(true);
        setIsucess(
          "Your details have been successfully saved. Please proceed to login to access your account."
        );
      } else if (response.status === 400) {
        const errorResponse = await response.json();
        if (
          errorResponse.password &&
          errorResponse.password.includes("This password is entirely numeric.")
        ) {
          // Show Toast for the specific error
          setShowErrorToast(true);
          setToastError("This password is entirely numeric.");
        } else if (
          errorResponse.email &&
          errorResponse.email[0] ===
            "A user is already registered with this e-mail address."
        ) {
          // Show Toast for the specific email error
          setShowErrorToast(true);
          setToastError(errorResponse.email[0]);
        } else {
          // Handle other error cases or show a generic error message
          setShowErrorToast(true);
          setToastError(
            "There are errors in your submission. Please check and try again."
          );
        }
      } else {
        setShowErrorToast(true);
        console.error("Login failed. Please check your credentials.");
        setToastError("A User is Already Registered with this E-mail Address.");
      }

      setIsConfrimed(true);
      setDialog(false);
    } catch (error) {
      console.error("An error occurred during login:", error.message);
      setToastError("Please try After Some Time. Thank You.");
    }
  };

  const loginHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  // React.useEffect(() => {
  //     const preloadImage = new Image();
  //     preloadImage.src = ageVector;
  // }, []);

  const noHandler = () => {
    setDialog(false);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <Helmet title="Sign Up">
      <ToastMessage
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        message={toastError}
      />
      <SucessMessage
        show={sucessToast}
        onClose={() => setSucessToast(false)}
        message={isSucess}
      />
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
              <div style={{ padding: "10px", width: "80%" }}>
                <h3>Sign up</h3>
                <form onSubmit={submitHandler}>
                  <div className="mb-3 input-group">
                    <input
                      type="text"
                      className="form-control shadow-none"
                      id="Full Name"
                      placeholder="Full Name"
                      value={userName}
                    //   onChange={(e) => setUserName(e.target.value)}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const regex = /^[a-zA-Z ]*$/;

                        if (regex.test(inputValue) || inputValue === '') {
                            setUserName(inputValue);
                        }
                    }}
                    //   onKeyPress={(e) => {
                    //     // Prevent input of numeric characters
                    //     if (!isNaN(Number(e.key))) {
                    //       e.preventDefault();
                    //     }
                    //   }}
                    />
                  </div>
                  <span className="errorTxt">
                    {" "}
                    {nameError && (
                      <div
                        style={{
                          color: "#FF0000",
                          position: "relative",
                          bottom: "10px",
                        }}
                      >
                        {nameError}
                      </div>
                    )}{" "}
                  </span>
                  <div className="mb-3 input-group">
                    <input
                      type="email"
                      className="form-control shadow-none"
                      id="email"
                      placeholder="Email Address"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                  </div>
                  <span className="errorTxt">
                    {" "}
                    {emailError && (
                      <div
                        style={{
                          color: "#FF0000",
                          position: "relative",
                          bottom: "10px",
                        }}
                      >
                        {emailError}
                      </div>
                    )}{" "}
                  </span>
                  <div className="mb-3 input-group">
                    <input
                      type="text"
                      className="form-control shadow-none"
                      id="location"
                      placeholder="Location"
                      value={userLoaction}
                      onChange={(e) => setUserLoacation(e.target.value)}
                    />
                  </div>
                  <span className="errorTxt">
                    {" "}
                    {locationError && (
                      <div
                        style={{
                          color: "#FF0000",
                          position: "relative",
                          bottom: "10px",
                        }}
                      >
                        {locationError}
                      </div>
                    )}{" "}
                  </span>
                  <div className="mb-3 input-group">
                    <input
                      type="text"
                      maxLength={5}
                      className="form-control shadow-none"
                      id="Zipcode"
                      placeholder="Zipcode"
                      value={userZipCode}
                      onChange={(e) => {
                        const userInput = e.target.value;
                        const onlyNumbers = userInput.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                        setUserZipCode(onlyNumbers);
                      }}
                      onKeyPress={(e) => {
                        const isValidChar = /^\d+$/.test(
                          String.fromCharCode(e.charCode)
                        );
                        if (!isValidChar) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>

                  <span className="errorTxt">
                    {" "}
                    {zipcodeError && (
                      <div
                        style={{
                          color: "#FF0000",
                          position: "relative",
                          bottom: "10px",
                        }}
                      >
                        {zipcodeError}
                      </div>
                    )}{" "}
                  </span>
                  <div className="mb-3 input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control shadow-none "
                      id="password"
                      placeholder="Password"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                    <span
                      className="input-group-text"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <span className="errorTxt">
                    {userPassword && userPassword.length < 8 && (
                      <div
                        style={{
                          color: "#FF0000",
                          position: "relative",
                          bottom: "10px",
                        }}
                      >
                        {ispasswordLenght}
                      </div>
                    )}
                  </span>
                  <span className="errorTxt">
                    {" "}
                    {passwordError && (
                      <div
                        style={{
                          color: "#FF0000",
                          position: "relative",
                          bottom: "10px",
                        }}
                      >
                        {passwordError}
                      </div>
                    )}{" "}
                  </span>
                  <div className="mb-3 input-group">
                    <input
                      type={isConfrimPassword ? "text" : "password"}
                      className="form-control shadow-none"
                      id="password"
                      placeholder="Confirm Password"
                      value={userConfrimPassword}
                      onChange={(e) => setUserConfrimPassword(e.target.value)}
                      onPaste={(e) => e.preventDefault()}
                    />

                    <span
                      className="input-group-text"
                      onClick={passwordHandler}
                    >
                      {isConfrimPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {/* <span className='errorTxt'> {passwordError && <div style={{ color: '#FF0000', position: "relative", bottom: "10px" }}>{passwordError}</div>} </span> */}

                  <span className="errorTxt">
                    {userConfrimPassword && userConfrimPassword.length < 8 && (
                      <div
                        style={{
                          color: "#FF0000",
                          position: "relative",
                          bottom: "10px",
                        }}
                      >
                        {isConpasswordLen}
                      </div>
                    )}
                  </span>

                  <span className="errorTxt">
                    {" "}
                    {confrimError && (
                      <div
                        style={{
                          color: "#FF0000",
                          position: "relative",
                          bottom: "10px",
                        }}
                      >
                        {confrimError}
                      </div>
                    )}{" "}
                  </span>

                  <div className="checkBox">
                    <input
                      type="checkbox"
                      value={userconsent}
                      onChange={(e) => setUserConsent(e.target.value)}
                    />{" "}
                    <span>
                      I have read the{" "}
                      <span
                        style={{ color: "#00A0DD", cursor: "pointer" }}
                        onClick={termPageRouteHandler}
                      >
                        Terms and Conditions
                      </span>{" "}
                      and{" "}
                      <span
                        style={{ color: "#00A0DD", cursor: "pointer" }}
                        onClick={PrivacyPageHandler}
                      >
                        Privacy Policy
                      </span>{" "}
                    </span>
                  </div>
                  <span className="errorTxt">
                    {" "}
                    {consentError && (
                      <div
                        style={{
                          color: "#FF0000",
                          position: "relative",
                          bottom: "-7px",
                        }}
                      >
                        {consentError}
                      </div>
                    )}{" "}
                  </span>
                  <div className="mb-3 input-group">
                    <button type="submit" className="signUpBtn">
                      Sign Up
                    </button>
                  </div>
                </form>
                <div>
                  <h6 className="sign_up">
                    Already have an account?{" "}
                    <span
                      style={{
                        cursor: "pointer",
                        color: "#4DA7FF",
                        fontWeight: "600",
                      }}
                      onClick={loginHandler}
                    >
                      Log in
                    </span>
                  </h6>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}

      <Modal
        show={isDialog}
        onHide={() => setDialog(false)}
        centered
        style={{ borderRadius: "8px" }}
      >
        <Modal.Header>
          <Modal.Title className="text-center d-flex align-items-center">
            <img
              src={ageVector}
              alt="Age Verification"
              className="ageVectorImg "
              style={{ display: "block", margin: "auto" }}
              loading="lazy"
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p className="ageTxt">Are you 18+ and above ?</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              position: "relative",
              bottom: "60px",
              marginBottom: "-45px",
            }}
          >
            <button className="noTxt" onClick={noHandler}>
              No
            </button>
            <button className="yesTxt" onClick={moduleHandler}>
              Yes
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </Helmet>
  );
};

export default SignUp;
