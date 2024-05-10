import React, { useState,useEffect } from "react";
import "./signUp.css";
import Helmet from "../../components/helmet/Helmet";
import { Col, FormGroup, Input, Row } from "reactstrap";
import LeftSection from "../../components/leftSidePannel/LeftSideSection";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import ErrorToast from "../../components/errorToast/ErrorToast";
import SucessToast from "../../components/sucessToast/SucessToast";
import SpinLoader from "../../components/spin_loader/SpinLoader";
import { useNavigate } from "react-router-dom";
import mixpanel from "../../../mixpanel";
const SignUpBusiness = () => {
  const [formData, setFormData] = useState({
    business_name: "",
    owner_full_name: "",
    business_location: "",
    city: "",
    state: "",
    description: "",
    password: "",
    confirm_password: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passEye, setPassEye] = useState(false);
  const [confirmEye, setConfirmEye] = useState(false);
  const naviagte = useNavigate();

  // console.log("userData " + JSON.stringify(formData));

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const [image, setImage] = useState(null);
  const [tnc, setTnc] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSucessToast, setShowSucessToast] = useState(false);
  const [sucessMessage, setSucessMessage] = useState("");
  const [businessError, setBusinessError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [descError, setDescError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [tncError, setTncError] = useState("");
  const [hipa, setHipa] = useState(false);
  const [hipaError, setHipaError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create a URL for the uploaded image and set it to imageUrl state
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const renderImage = () => {
    if (imageUrl) {
      return <img src={imageUrl} alt="Uploaded" className="uploaded_img" />;
    } else {
      return (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            style={{ fill: "#ffffff" }}
          >
            <circle cx="12" cy="12" r="3.2" />
            <path d="M9 2l-1.83 2h-3.17c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2h-3.17l-1.83-2h-6zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
            <path d="M0 0h24v24h-24z" fill="none" />
          </svg>
          <p style={{ fontFamily: "Poppins", fontSize: "9px" }}>Add photo</p>
        </>
      );
    }
  };
  const textRegex = /^[a-zA-Z ]+$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const signUpHandler = async (e) => {
    e.preventDefault();

    // if (!textRegex.test(formData.business_location)) {
    //   setLocationError("Provide suitable location");
    // } else {
    //   setLocationError("");
    // }
    if (!textRegex.test(formData.owner_full_name)) {
      setNameError("Provide suitable name");
    } else {
      setNameError("");
    }
    if (!textRegex.test(formData.city)) {
      setCityError("Provide city name");
    } else {
      setCityError("");
    }
    if (!textRegex.test(formData.state)) {
      setStateError("Provide state name");
    } else {
      setStateError("");
    }
    if (!emailRegex.test(formData.email)) {
      setEmailError("Provide suitable email");
    } else {
      setEmailError("");
    }
    if (formData.password !== formData.confirm_password) {
      setConfirmError("Confirm password and password must match");
    }
    if(!image){
        setShowErrorToast(true)
        setErrorMessage("Please select an image")
    }
    if (!passwordRegex.test(formData.password)) {
      setPassError(
        "Please choose a stronger password of atleast 8 characters. Try mix of letters, numbers, and symbols (e.g. Example@1)"
      );
    } else {
      setPassError("");
    }

    if (formData.password == formData.confirm_password) {
      setConfirmError("");
    }

    if (!tnc) {
      setTncError("Please accept the terms & conditions");
    } else {
      setTncError("");
    }
    if (!hipa) {
      setHipaError("Please accept the Hipaa & compliance");
    } else {
      setHipaError("");
    }

    if (
      tnc && hipa &&
      formData.password == formData.confirm_password &&
      textRegex.test(formData.business_location) &&
      textRegex.test(formData.city) &&
      textRegex.test(formData.state) &&
      textRegex.test(formData.owner_full_name) &&
      emailRegex.test(formData.email) &&
      passwordRegex.test(formData.password) &&
      image
    ) {
      const form = new FormData(); // Rename to 'form' to avoid conflict

      form.append("business_name", formData.business_name);
      form.append("owner_full_name", formData.owner_full_name);
      form.append("business_location", formData.business_location);
      form.append("business_city", formData.city);
      form.append("business_state", formData.state);
      form.append("description", formData.description);
      form.append("password", formData.password);
      form.append("confirm_password", formData.confirm_password);
      form.append("email", formData.email);
      form.append("role", "business");

      if (image) {
        form.append("avatar", image);
      }

      try {
        const response = await fetch("/api/v1/signup/", {
          method: "POST",
          body: form,
        });

          mixpanel.track("User Registration", {
            "User Email": formData.email,
            "User Name": formData.owner_full_name
          })
   
          mixpanel.identify(formData.email)
        const data = await response.json();
          console.log("Account created successfully:", data.id);
        if (response.status === 201) {
          
        } else {
          // Handle other HTTP status codes
          const data = await response.json();
          console.log("data" + JSON.stringify(data));
          if (data.email && data.email.length > 0) {
            setShowErrorToast(true);
            setErrorMessage(data.email[0]);
          } else {
            // Handle other errors
            setShowErrorToast(true);
          }
        }
        setShowSucessToast(true);
        setSucessMessage("Account signed up sucessfully")
        setBusinessError("");
        setLocationError("");
        setNameError("");
        setCityError("")
        setStateError("")
        setDescError("");
        setEmailError("");
        setPassError("");
        setConfirmError("");
        setTncError("");
        setHipaError("");
        naviagte(`/b/verification/${data.id}`)
        console.log(data.id,"idid")
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleCancel =()=>{
    setFormData({
      business_name: "",
      owner_full_name: "",
      business_location: "",
      description: "",
      password: "",
      confirm_password: "",
      email: "",
    })
    naviagte("/login")
  }

  return (
    <Helmet title="Create Your Account">
      {isLoading ? (
        <SpinLoader />
      ) : (
        <Row>
          <LeftSection />
          {showErrorToast ? (
            <ErrorToast
              show={showErrorToast}
              onClose={() => setShowErrorToast(false)}
              message={errorMessage}
            />
          ) : null}
          {showSucessToast ? (
            <SucessToast
              show={showSucessToast}
              onClose={() => setShowSucessToast(false)}
              message={sucessMessage}
            />
          ) : null}
          <Col
            lg="5"
            md="6"
            className="d-flex align-items-center justify-content-center"
          >
            <div style={{ padding: "10px", width: "80%" }}>
              {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h6 style={{ fontSize: "12px", fontWeight: "600" }}>Account Verification Status:</h6>
                            <h6 className='pending__status'>PENDING</h6>
                        </div> */}
              <h3>Create Your Account</h3>
              <form onSubmit={signUpHandler}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className="mb-0 input-group">
                    <FormGroup>
                      <Col xs={6} sm={6} lg={12}>
                        <Input
                          type="text"
                          className="form-control shadow-none"
                          id="business_name"
                          placeholder="Business Name"
                          value={formData.business_name}
                          onChange={handleChange}
                          required
                        />
                        {businessError && (
                          <span
                            className="ms-1"
                            style={{ color: "red", fontSize: "10px" }}
                          >
                            {businessError}
                          </span>
                        )}
                        <div className="mb-3 input-group">
                          <Input
                            type="text"
                            className="form-control shadow-none"
                            id="business_location"
                            placeholder="Business Location"
                            style={{
                              position: "relative",
                              top: "20px",
                              marginBottom: "10px",
                            }}
                            value={formData.business_location}
                            onChange={handleChange}
                            // pattern="[A-Za-z]"
                            required
                          />
                        </div>
                        {locationError && (
                          <span
                            className="ms-1"
                            style={{ color: "red", fontSize: "10px" }}
                          >
                            {locationError}
                          </span>
                        )}
                      </Col>
                    </FormGroup>
                  </div>
                  <div className="mb-0 input-group">
                    <FormGroup>
                      <Col md={6} lg={8}>
                        <div
                          style={{
                            textAlign: "center",
                            position: "relative",
                            left: "50px",
                          }}
                        >
                          <div className="input--file">
                            <input
                              name="avatar"
                              type="file"
                              id="avatar"
                              style={{ cursor: "pointer" }}
                              accept="image/jpeg,image/png,image/gif"
                              onChange={handleImageChange}
                            />
                            <label for="avatar">
                            <span style={{ position: "relative", top: "25px" }}>
                              {renderImage()}
                            </span>
                            </label>
                          </div>
                        </div>
                      </Col>
                    </FormGroup>
                  </div>
                </div>
                <div className=" mb-3 d- flex input-group ">
                  <Input
                    type="text"
                    className="form-control shadow-none"
                    id="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    // pattern="[A-Za-z]"
                    required
                  />
                  <Input
                    type="text"
                    className="form-control shadow-none ms-3"
                    id="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    // pattern="[A-Za-z]"
                    required
                  />
                </div>
                <div className=" input-group">
                  <Input
                    type="textarea"
                    className="form-control shadow-none"
                    id="description"
                    placeholder="Short Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                {descError && (
                  <span
                    className="ms-1"
                    style={{ color: "red", fontSize: "10px" }}
                  >
                    {descError}
                  </span>
                )}
                <div className="mt-3 input-group ">
                  <Input
                    type="text"
                    className="form-control shadow-none"
                    id="owner_full_name"
                    placeholder="Full Name"
                    value={formData.owner_full_name}
                    onChange={handleChange}
                    // pattern="[A-Za-z]"
                    required
                  />
                </div>
                {nameError && (
                  <span
                    className="ms-1"
                    style={{ color: "red", fontSize: "10px" }}
                  >
                    {nameError}
                  </span>
                )}
                <div className="mt-3 input-group ">
                  <Input
                    type="email"
                    className="form-control shadow-none"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {emailError && (
                  <span
                    className="ms-1"
                    style={{ color: "red", fontSize: "10px" }}
                  >
                    {emailError}
                  </span>
                )}
                <div className="mt-3 input-group">
                  {/* <Input
                                    type="password"
                                    className="form-control shadow-none"
                                    id="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                /> */}
                  <input
                    type={passEye ? "text" : "password"}
                    className="form-control shadow-none"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="input-group-text"
                    onClick={() => setPassEye(!passEye)}
                  >
                    {!passEye ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {passError && (
                  <span
                    className="ms-1"
                    style={{ color: "red", fontSize: "10px" }}
                  >
                    {passError}
                  </span>
                )}
                <div className="mt-3 input-group">
                  <Input
                    type={confirmEye ? "text" : "password"}
                    className="form-control shadow-none"
                    id="confirm_password"
                    placeholder="Confirm Password"
                    onPaste={(e) => e.preventDefault()}
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="input-group-text"
                    onClick={() => setConfirmEye(!confirmEye)}
                  >
                    {!confirmEye ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {confirmError && (
                  <span
                    className="ms-1"
                    style={{ color: "red", fontSize: "10px" }}
                  >
                    {confirmError}
                  </span>
                )}
                <div className="checkBox1 mt-3 mb-0">
                  <Input type="checkbox" className="" onClick={() => setTnc(!tnc)} />{" "}
                  <span>
                    I have read the{" "}
                    <a href="/Terms&&Conditions" style={{ color: "#00A0DD", cursor: "pointer",textDecoration:"none" }} target="_blank">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/Privacy-Policy" style={{ color: "#00A0DD", cursor: "pointer",textDecoration:"none" }} target="_blank">
                      Privacy Policy
                    </a>{" "}
                  </span>
                </div>
                {tncError && (
                  <span
                    className="ms-1"
                    style={{ color: "red", fontSize: "10px" }}
                  >
                    {tncError}
                  </span>
                )}
                <div className="checkBox1 mt-3 mb-0">
                  <Input type="checkbox" className="" onClick={() => setHipa(!hipa)} />{" "}
                  <span>
                    I agree to{" "}
                    <a href="/b/compliance" style={{ color: "#00A0DD", cursor: "pointer",textDecoration:"none" }} target="_blank">
                      Hipaa and Compliance
                    </a>{" "}
                    {/* <span style={{ color: "#00A0DD", cursor: "pointer" }} onClick={()=>naviagte("/b/compliance")}>
                      Hipaa and Compliance
                    </span>{" "} */}
                    terms{" "}
                    {/* <span style={{ color: "#00A0DD", cursor: "pointer" }}>
                      Privacy Policy
                    </span>{" "} */}
                  </span>
                </div>
                {hipaError && (
                  <span
                    className="ms-1"
                    style={{ color: "red", fontSize: "10px" }}
                  >
                    {hipaError}
                  </span>
                )}
                <div className="mb-3 mt-3 input-group">
                  <button
                    type="submit"
                    className="signUpBtn"
                    // onClick={signUpHandler}
                    style={{backgroundColor:"#7AC24F"}}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="mb-3 input-group">
                  <p style={{textAlign:"center", color:"#7AC24F", border:"1px solid #7AC24F", cursor:"pointer"}} className="cancelBtn" onClick={handleCancel}>
                    Cancel
                  </p>
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
                    onClick={() => naviagte("/sign_In")}
                  >
                    Log in
                  </span>
                </h6>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Helmet>
  );
};

export default SignUpBusiness;
