import React, { useState, useEffect } from "react";
import "./AccountInfo.css";
import AppHeader from "../../components/AppHeader/AppHeader";
import AppFooter from "../../components/AppFooter/AppFooter";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import PageHelmet from "../../../components/page_Helmet/PageHelmet";
// import SpinLoader from "../../components/spin-loader/SpinLoader";
import { useNavigate } from "react-router-dom";
import SucessMessage from "../../../components/successToast/SuccessToast";
import SucessToast from "../../components/sucessToast/SucessToast";

const AccountInfo = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [updatedImage, setUpdatedImage] = useState(null);
  const [userImg, setUserImg] = useState();
  const [getUserData, setGetUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [sucessToast, setSucessToast] = useState("");
  const [showSucessToast, setShowSucessToast] = useState(false);
  const [sucessMessage, setSucessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const nagviate = useNavigate();
  const fileInputRef = React.useRef(null);
  const [birthdayError, setBirthdayError] = useState("");
  const [data, setData] = useState([]);

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const id = sessionStorage.getItem("userid");
  const token = JSON.parse(sessionStorage.getItem("token"));

  const profileResponse = async () => {
    const response = await fetch(
      `https://dmecart-38297.botics.co/business/business_profile/${id}/`,
      {
        method: "GET",
        headers: {
          // "Content-Type": "Application/json",
          Authorization: ` Token ${token}`,
        },
      }
    );

    const resData = await response.json();
    console.log(resData, "data");
    setName(resData.owner_full_name);
    setEmail(resData.user_id.email);
    setPhone(resData.phone);
    setGender(resData.user_gender);
    setDob(resData.user_birthday);
    setCity(resData.business_location);
    setZip(resData.business_zip_code);
    setState(resData.state);
    setCountry(resData.country);
    setImage(resData.user_avatar_signed_url);
  };

  useEffect(() => {
    profileResponse();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
      setImage(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    // console.log("file " + file);
  };

  const displayedImage = isEditMode
    ? uploadedImage || getUserData.avatar_signed_url
    : getUserData.avatar_signed_url;

  //Gender change Finction
  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;

    // Map selected gender to 'M' or 'F'
    const mappedGender =
      selectedGender === "Female" ? "F" : selectedGender === "Male" ? "M" : "";

    setGetUserData({ ...getUserData, gender: mappedGender });

    // Print to console based on the selected gender
    if (selectedGender === "Female") {
      console.log("-f");
    } else if (selectedGender === "Male") {
      console.log("M");
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!getUserData.full_name) {
      errors.full_name = "Full Name is required";
    }

    if (!getUserData.birthday) {
      errors.birthday = "Date of Birth is required";
    }
    if (!getUserData.city) {
      errors.city = "City is required";
    }

    if (!getUserData.phone) {
      errors.phone = "Mobile Number is required";
    }
    if (!getUserData.state) {
      errors.state = "State is required";
    }
    if (!getUserData.zip_code) {
      errors.zip_code = "ZipCode is required";
    }
    if (!getUserData.country) {
      errors.country = "Country is required";
    }
    if (!getUserData.birthday) {
      errors.birthday = "BirthDay is required";
    }
    if (!getUserData.gender) {
      errors.gender = "Gender is required";
    }

    return errors;
  };

  // DOB Function
  const getMaxDateForEighteenYearsAgo = () => {
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    const year = eighteenYearsAgo.getFullYear();
    const month = String(eighteenYearsAgo.getMonth() + 1).padStart(2, "0");
    const day = String(eighteenYearsAgo.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // remove Img Handler
  const handleRemoveImage = async () => {
    // setIsLoading(true)
    try {
      const patientId = JSON.parse(sessionStorage.getItem("patientId"));
      const token = JSON.parse(sessionStorage.getItem("token"));

      // Check if there is an uploaded image
      if (isEditMode && image) {
        // Remove the uploaded image during editing
        setImage(null);
      } else {
        // Remove the image fetched from the API
        const response = await fetch(
          `/patients/patients_details/${patientId}/`,
          {
            method: "PUT",
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ avatar: null }),
          }
        );

        if (response.ok) {
          setUserImg(null);
          setShowToast(true);
          setSucessToast("Your image has been removed successfully.");
          // setIsLoading(false);
          window.location.reload();
        } else {
          // Handle error
          console.error("Failed to remove image");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // save Button Function
  // const profileSubmitHandler = async () => {
  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length > 0) {
  //     // There are validation errors, display them to the user
  //     setFieldErrors(validationErrors);
  //     return;
  //   }
  //   setFieldErrors({});
  //   const patientId = JSON.parse(sessionStorage.getItem("patientId"));
  //   const token = JSON.parse(sessionStorage.getItem("token"));
  //   const formData = new FormData();

  //   formData.append("full_name", getUserData.full_name);
  //   formData.append("location", getUserData.location);
  //   formData.append("zip_code", getUserData.zip_code);
  //   formData.append("phone", getUserData.phone);
  //   formData.append("birthday", getUserData.birthday);
  //   formData.append("gender", getUserData.gender);
  //   formData.append("address", getUserData.address);
  //   formData.append("city", getUserData.city);
  //   formData.append("state", getUserData.state);
  //   formData.append("country", getUserData.country);

  //   if (image) {
  //     formData.append("avatar", image);
  //   }

  //   try {
  //     const response = await fetch(`/patients/patients_details/${patientId}/`, {
  //       method: "PUT",
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       setIsLoading(true);
  //       setIsEditMode(false);
  //       setShowToast(true);
  //       setSucessToast("Your Deatils are Saved Sucessfully.");
  //       // setTimeout(() => {
  //       //     nagviate("/MyProfile")
  //       // }, 1000)
  //     } else {
  //       // Handle error
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error.message);
  //   }
  // };

  // const uploadHandler = () => {
  //   openFileInput();
  //   const requiredFields = [
  //     "birthday",
  //     "phone",
  //     "gender",
  //     "city",
  //     "state",
  //     "country",
  //   ];

  //   const isEmptyField = requiredFields.some((field) => !getUserData[field]);

  //   if (isEmptyField) {
  //     setGetUserData((prevData) => ({
  //       ...prevData,
  //       birthday: "",
  //       phone: "",
  //       gender: "",
  //       city: "",
  //       state: "",
  //       country: "",
  //       // Add other fields if needed
  //     }));
  //   }

  //   setIsEditMode(true);
  // };

  // const handlePhoneChange = (e) => {
  //   const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
  //   setGetUserData({ ...getUserData, phone: value });
  //   if (value.length < 10) {
  //     setFieldErrors({
  //       ...fieldErrors,
  //       phone: "Mobile Number must be at least 10 digits",
  //     });
  //   } else {
  //     setFieldErrors({ ...fieldErrors, phone: "" });
  //   }
  // };

  // const handleZipCodeChange = (e) => {
  //   const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
  //   setGetUserData({ ...getUserData, zip_code: value });
  // };

  //DOB Function
  const handleBirthdayChange = (e) => {
    const enteredDate = new Date(e.target.value);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    if (enteredDate > eighteenYearsAgo) {
      setBirthdayError("Date of Birth must be at least 18 years ago");
      setFieldErrors({ ...fieldErrors, birthday: "" }); // Clear general birthday error
      setGetUserData({ ...getUserData, birthday: "" }); // Clear entered date
    } else {
      setBirthdayError("");
      setFieldErrors({ ...fieldErrors, birthday: "" });
      setGetUserData({ ...getUserData, birthday: e.target.value });
    }
  };
  // console.log(dob, "date")

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("owner_full_name", name);
    formData.append("business_location", city);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("user_gender", gender);
    // F or M
    if (dob) {
      formData.append("user_birthday", dob);
    }
    formData.append("business_zip_code", zip);
    formData.append("state", state);
    formData.append("country", country);
    if (updatedImage) {
      formData.append("user_avatar_signed_url", updatedImage);
    }

    try {
      const response = await fetch(
        `https://dmecart-38297.botics.co/business/business_profile/${id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: ` Token ${token}`,
          },
          body: formData,
        }
      );
      const resData = await response.json();
      if (resData) {
        console.log(resData);
        setShowSucessToast(true);
        setSucessMessage("Details have been updated sucessfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(gender,"gender")

  return (
    <div>
      <AppHeader />
      {showSucessToast ? (
        <SucessToast
          show={showSucessToast}
          onClose={() => setShowSucessToast(false)}
          message={sucessMessage}
        />
      ) : null}
      <div className="main-section-account">
        <form onSubmit={handleSubmit}>
          <div className="my-profile-section">My Profile</div>
          <div
            style={{ width: "70vw", textAlign: "start" }}
            className="d-flex mt-5"
          >
            <div>
              <div className="image-container">
                <img
                  // src={updatedImage ? URL.createObjectURL(updatedImage) : image}
                  src={updatedImage ? URL.createObjectURL(updatedImage) : image}
                  alt="image"
                  className="image-avatar"
                  // onClick={() => setShowOverlay(true)}
                />
              </div>{" "}
              <br />
              <input
                type="file"
                id="avatar"
                className="input_avatar"
                onChange={(e) => setUpdatedImage(e.target.files[0])}
              />
              <label for="avatar" className="mt-2 ps-4 ms-3 save-btn">
                Upload Picture
              </label>
            </div>
            <div className="ms-5 input-section">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Phone Number</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label>Gender</label>
              {/* <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              /> */}
              <select
                id="exampleGender"
                name="gender"
                onChange={(e)=>setGender(e.target.value)}
              >
                <option value="F" style={{ fontFamily: "Poppins" }}>
                  Female
                </option>
                <option value="M" style={{ fontFamily: "Poppins" }}>
                  Male
                </option>
              </select>
              <label>Zip</label>
              <input
                type="number"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
              <label>Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="ms-5 input-section">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Birthday</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <label>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label>State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>
          <div style={{ textAlign: "end", width: "70vw" }} className="mt-5">
            <button className="cancel-btn">Cancel</button>
            <button className="save-btn ms-4" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
      <AppFooter />
    </div>
  );
};

export default AccountInfo;
