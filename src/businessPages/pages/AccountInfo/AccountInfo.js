import React,{useState,useEffect} from "react";
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
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [userImg, setUserImg] = useState();
  const [getUserData, setGetUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [sucessToast, setSucessToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const nagviate = useNavigate();
  const fileInputRef = React.useRef(null);
  const [birthdayError, setBirthdayError] = useState("");

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const patientId = JSON.parse(sessionStorage.getItem("patientId"));
        const token = JSON.parse(sessionStorage.getItem("token"));
        const response = await fetch(
          `/patients/patients_details/${patientId}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const data = await response.json();
        if (data) {
          setIsLoading(false);
          setGetUserData(data);
          setUserImg(data.avatar_signed_url);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchData();

    if (getUserData.avatar_signed_url) {
      setUserImg(getUserData.avatar_signed_url);
    }
  }, [isLoading]);

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
  const profileSubmitHandler = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      // There are validation errors, display them to the user
      setFieldErrors(validationErrors);
      return;
    }
    setFieldErrors({});
    const patientId = JSON.parse(sessionStorage.getItem("patientId"));
    const token = JSON.parse(sessionStorage.getItem("token"));
    const formData = new FormData();

    formData.append("full_name", getUserData.full_name);
    formData.append("location", getUserData.location);
    formData.append("zip_code", getUserData.zip_code);
    formData.append("phone", getUserData.phone);
    formData.append("birthday", getUserData.birthday);
    formData.append("gender", getUserData.gender);
    formData.append("address", getUserData.address);
    formData.append("city", getUserData.city);
    formData.append("state", getUserData.state);
    formData.append("country", getUserData.country);

    if (image) {
      formData.append("avatar", image);
    }

    try {
      const response = await fetch(`/patients/patients_details/${patientId}/`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setIsLoading(true);
        setIsEditMode(false);
        setShowToast(true);
        setSucessToast("Your Deatils are Saved Sucessfully.");
        // setTimeout(() => {
        //     nagviate("/MyProfile")
        // }, 1000)
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const uploadHandler = () => {
    openFileInput();
    const requiredFields = [
      "birthday",
      "phone",
      "gender",
      "city",
      "state",
      "country",
    ];

    const isEmptyField = requiredFields.some((field) => !getUserData[field]);

    if (isEmptyField) {
      setGetUserData((prevData) => ({
        ...prevData,
        birthday: "",
        phone: "",
        gender: "",
        city: "",
        state: "",
        country: "",
        // Add other fields if needed
      }));
    }

    setIsEditMode(true);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setGetUserData({ ...getUserData, phone: value });
    if (value.length < 10) {
      setFieldErrors({
        ...fieldErrors,
        phone: "Mobile Number must be at least 10 digits",
      });
    } else {
      setFieldErrors({ ...fieldErrors, phone: "" });
    }
  };

  const handleZipCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setGetUserData({ ...getUserData, zip_code: value });
  };

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

  return (
    <div>
      <AppHeader />
      <div className="main-section-account">
        <div className="my-profile-section">My Profile</div>
<div style={{width:"70vw",textAlign:"start" }} className="d-flex mt-5">
  <div>
    <div className="image-container">
    <img
              // src={updatedImage ? URL.createObjectURL(updatedImage) : image}
              src={image}
              alt="image"
              className="image-avatar"
              // onClick={() => setShowOverlay(true)}
            />
    </div> <br/>
    <input type="file" value={image} id="avatar" />
    <label for="avatar" className="mt-2 ps-4 ms-3 save-btn">
   Upload Picture
    </label>
  </div>
  <div className="ms-5 input-section">
    <label>Full Name</label>
    <input type="text"/>
    <label>Phone Number</label>
    <input type="number"/>
    <label>Gender</label>
    <input type="text"/>
    <label>Zip</label>
    <input/>
    <label>Country</label>
    <input type="text"/>
    
  </div>
  <div className="ms-5 input-section">
  <label>Email Address</label>
    <input type="email"/>
  <label>Birthday</label>
    <input type="date"/>
  <label>City</label>
    <input type="text"/>
  <label>State</label>
    <input type="text"/>
   
  </div>
</div>
  <div style={{textAlign:"end", width:"58vw"}} className="mt-5">
<button className="cancel-btn">Cancel</button>
<button className="save-btn ms-4">Save</button>
  </div>

      </div>
      <AppFooter />
    </div>
  );
};

export default AccountInfo;
