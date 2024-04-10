import React, { useState } from 'react';
import "./MyProfile.css";
import Helmet from '../../components/helmet/Helmet';
import AppHeader from '../../components/header/AppHeader';
import AppFooter from '../../components/footer/AppFooter';
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import PageHelmet from '../../components/page_Helmet/PageHelmet';
import { FaCamera } from 'react-icons/fa';
import SpinLoader from '../../components/spin-loader/SpinLoader';
import { useNavigate } from 'react-router-dom';
import ToastMessage from '../../components/toast/ToastMessage';
import SucessMessage from '../../components/successToast/SuccessToast';
import UserProfile from '../../utility/useravthar/UserAvathar';

const MyProfile = () => {
    const [image, setImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [userImg, setUserImg] = useState();
    const [getUserData, setGetUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [sucessToast, setSucessToast] = useState("");
    const [showToast, setShowToast] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({});
    const nagviate = useNavigate()
    const fileInputRef = React.useRef(null);
    const [birthdayError, setBirthdayError] = useState('');



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
                const response = await fetch(`/patients/patients_details/${patientId}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json();
                if (data) {
                    setIsLoading(false);
                    setGetUserData(data);
                    setUserImg(data.avatar_signed_url);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
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
        };
        // console.log("file " + file);
    };


    const displayedImage = isEditMode ? (uploadedImage || getUserData.avatar_signed_url) : getUserData.avatar_signed_url;

    //Gender change Finction
    const handleGenderChange = (e) => {
        const selectedGender = e.target.value;

        // Map selected gender to 'M' or 'F'
        const mappedGender = selectedGender === 'Female' ? 'F' : (selectedGender === 'Male' ? 'M' : '');

        setGetUserData({ ...getUserData, gender: mappedGender });

        // Print to console based on the selected gender
        if (selectedGender === 'Female') {
            console.log('-f');
        } else if (selectedGender === 'Male') {
            console.log('M');
        }
    };

    const validateForm = () => {
        const errors = {};


        if (!getUserData.full_name) {
            errors.full_name = 'Full name is required';
        };

        if (!getUserData.birthday) {
            errors.birthday = 'Date of birth is required';
        }
        if (!getUserData.city) {
            errors.city = 'City is required';
        }

        if (!getUserData.phone) {
            errors.phone = 'Mobile number is required';
        }
        if (!getUserData.state) {
            errors.state = 'State is required';
        };
        if (!getUserData.zip_code) {
            errors.zip_code = 'Zipcode is required';
        };
        if (!getUserData.country) {
            errors.country = 'Country is required';
        }
        if (!getUserData.birthday) {
            errors.birthday = 'Birthday is required';
        }
        if (!getUserData.gender) {
            errors.gender = 'Gender is required';
        }



        return errors;
    };

    // DOB Function
    const getMaxDateForEighteenYearsAgo = () => {
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

        const year = eighteenYearsAgo.getFullYear();
        const month = String(eighteenYearsAgo.getMonth() + 1).padStart(2, '0');
        const day = String(eighteenYearsAgo.getDate()).padStart(2, '0');

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
                const response = await fetch(`/patients/patients_details/${patientId}/`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ avatar: null }),
                });

                if (response.ok) {
                    setUserImg(null);
                    setShowToast(true);
                    setSucessToast("Your profile picture has been removed successfully.");
                    // setIsLoading(false);
                    setTimeout(()=>{
                        window.location.reload()
                    },2500)
                } else {
                    // Handle error
                    console.error('Failed to remove image');
                }
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
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

        formData.append('full_name', getUserData.full_name);
        formData.append('location', getUserData.location);
        formData.append('zip_code', getUserData.zip_code);
        formData.append('phone', getUserData.phone);
        formData.append('birthday', getUserData.birthday);
        formData.append('gender', getUserData.gender);
        formData.append('address', getUserData.address);
        formData.append('city', getUserData.city);
        formData.append('state', getUserData.state);
        formData.append('country', getUserData.country);

        if (image) {
            formData.append('avatar', image);
        }

        try {
            const response = await fetch(`/patients/patients_details/${patientId}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`
                },
                body: formData,
            });

            if (response.ok) {
                setIsLoading(true)
                setIsEditMode(false)
                setShowToast(true)
                setSucessToast("Your details are saved successfully.");
                // setTimeout(() => {
                //     nagviate("/MyProfile")
                // }, 1000)

            } else {
                // Handle error
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    };

    const uploadHandler = () => {
        openFileInput();
        const requiredFields = ['birthday', 'phone', 'gender', 'city', 'state', 'country'];

        const isEmptyField = requiredFields.some(field => !getUserData[field]);

        if (isEmptyField) {
            setGetUserData(prevData => ({
                ...prevData,
                birthday: '',
                phone: '',
                gender: '',
                city: '',
                state: '',
                country: '',
                // Add other fields if needed
            }));
        }

        setIsEditMode(true);
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setGetUserData({ ...getUserData, phone: value });
        if (value.length < 10) {
            setFieldErrors({ ...fieldErrors, phone: 'Mobile Number must be at least 10 digits' });
        } else {
            setFieldErrors({ ...fieldErrors, phone: '' });
        }
    };

    const handleZipCodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setGetUserData({ ...getUserData, zip_code: value });
    };

    //DOB Function
    const handleBirthdayChange = (e) => {
        const enteredDate = new Date(e.target.value);
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

        if (enteredDate > eighteenYearsAgo) {
            setBirthdayError('Date of Birth must be at least 18 years ago');
            setFieldErrors({ ...fieldErrors, birthday: '' }); // Clear general birthday error
            setGetUserData({ ...getUserData, birthday: '' }); // Clear entered date
        } else {
            setBirthdayError('');
            setFieldErrors({ ...fieldErrors, birthday: '' });
            setGetUserData({ ...getUserData, birthday: e.target.value });
        }
    };




    return (
        <Helmet title="My Profile">
            <AppHeader />
            {showToast ? <SucessMessage show={showToast} onClose={() => setShowToast(false)} message={sucessToast} /> : null}
            {isLoading ? <SpinLoader /> : <div style={{ marginTop: '9%', marginBottom: "8%" }}>
                <Container>
                    <PageHelmet pageTitle="My Profile" />
                </Container>
                <Container>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {isEditMode ? (
                            <div className='edit__Img '>
                                {/* <label htmlFor="fileInput" className="file-input-label">
                                    <span className='no_camera'><FaCamera /></span>
                                </label> */}
                                <input
                                    ref={fileInputRef}
                                    id="fileInput"
                                    className='no_camera'
                                    name="file"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        ) : (
                            null
                        )}

                        <div style={{ display: 'inline-block', textAlign: 'center' }}>
                            <div style={{ position: "relative", left: displayedImage ? "-20px" : "10px" }}>
                                <UserProfile userName={getUserData.full_name} avatarUrl={displayedImage} />
                            </div>
                            <br />
                            <button className='upload__btn_profile' onClick={uploadHandler}>Upload image</button> <br />
                            {displayedImage ? (<button className='remove__profile_btn' onClick={handleRemoveImage}>
                                Remove
                            </button>) : null}


                        </div>



                        <div>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>
                                                Full Name
                                            </Label>
                                            <Input
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleEmail"
                                                name="full_name"
                                                placeholder="Full Name"
                                                type="text"
                                                value={getUserData.full_name}
                                            // readOnly={!isEditMode}
                                            // onChange={(e) => setGetUserData({ ...getUserData, full_name: e.target.value })}
                                            />
                                            {fieldErrors.full_name && (
                                                <div className="error_messages">{fieldErrors.full_name}</div>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>
                                                Email Address
                                            </Label>
                                            <Input
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleEmail"
                                                name="email"
                                                placeholder="user@gmail.com"
                                                type="email"
                                                value={getUserData.user_id.email || "-"}
                                            // readOnly={!isEditMode}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>
                                                Phone Number
                                            </Label>
                                            <Input
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleEmail"
                                                name="phone"
                                                placeholder="Mobile Number"
                                                type="text"
                                                value={getUserData.phone}
                                                maxLength={10}
                                                // readOnly={!isEditMode}
                                                onChange={handlePhoneChange} />
                                            {fieldErrors.phone && (
                                                <div className="error_messages">{fieldErrors.phone}</div>
                                            )}

                                        </FormGroup>

                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>
                                                Birthday
                                            </Label>
                                            <Input
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleEmail"
                                                name="birthday"
                                                placeholder="DD-MM-YYYY"
                                                type="date"
                                                max={getMaxDateForEighteenYearsAgo()} // Set the max attribute here
                                                value={getUserData.birthday || ""}
                                                // readOnly={getUserData.birthday && !isEditMode}
                                                style={{ fontFamily: "Poppins" }}
                                                onChange={handleBirthdayChange} />
                                            {birthdayError && (
                                                <div className="error_messages">{birthdayError}</div>
                                            )}
                                            {fieldErrors.birthday && (
                                                <div className="error_messages">{fieldErrors.birthday}</div>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>Gender</Label>
                                            <select
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleGender"
                                                name="gender"
                                                value={getUserData.gender === 'F' ? 'Female' : (getUserData.gender === 'M' ? 'Male' : '')}
                                                // readOnly={getUserData.gender && !isEditMode}
                                                onChange={handleGenderChange}
                                                style={{ fontFamily: "Poppins" }}
                                            >
                                                <option value="" disabled style={{ fontFamily: "Poppins" }}>Select Gender</option>
                                                <option value="Female" style={{ fontFamily: "Poppins" }}>Female</option>
                                                <option value="Male" style={{ fontFamily: "Poppins" }}>Male</option>
                                            </select>
                                            {fieldErrors.gender && (
                                                <div className="error_messages">{fieldErrors.gender}</div>
                                            )}
                                        </FormGroup>
                                    </Col>

                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>
                                                City
                                            </Label>
                                            <Input
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''} ${!isEditMode && 'non-editable'}`}
                                                id="exampleEmail"
                                                name="city"
                                                placeholder="City"
                                                type="text"
                                                value={getUserData.city}
                                                // readOnly={getUserData.city && !isEditMode}
                                                onChange={(e) => {
                                                    // Check if the input contains only alphabetic characters
                                                    if (/^[A-Za-z]+$/.test(e.target.value) || e.target.value === '') {
                                                        setGetUserData({ ...getUserData, city: e.target.value });
                                                    }
                                                }} />
                                            {fieldErrors.city && (
                                                <div className="error_messages">{fieldErrors.city}</div>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>
                                                Zip
                                            </Label>
                                            <Input
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleEmail"
                                                name="zip_code"
                                                placeholder="Zipcode"
                                                type="text"
                                                maxLength={5}
                                                value={getUserData.zip_code}
                                                // readOnly={!isEditMode}
                                                onChange={handleZipCodeChange} />
                                            {fieldErrors.zip_code && (
                                                <div className="error_messages">{fieldErrors.zip_code}</div>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>
                                                State
                                            </Label>
                                            <Input
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleEmail"
                                                name="state"
                                                placeholder="State"
                                                type="text"
                                                value={getUserData.state || ""}
                                                // readOnly={getUserData.state && !isEditMode}
                                                onChange={(e) => {
                                                    if (/^[A-Za-z]+$/.test(e.target.value) || e.target.value === '') {
                                                        setGetUserData({ ...getUserData, state: e.target.value });
                                                    }
                                                }} />
                                            {fieldErrors.state && (
                                                <div className="error_messages">{fieldErrors.state}</div>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleEmail" >
                                                Country
                                            </Label>
                                            <Input
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleEmail"
                                                name="country"
                                                placeholder="country"
                                                type="text"
                                                value={getUserData.country || ""}
                                                // readOnly={getUserData.country && !isEditMode}
                                                onChange={(e) => {
                                                    // Check if the input contains only alphabetic characters
                                                    if (/^[A-Za-z]+$/.test(e.target.value) || e.target.value === '') {
                                                        setGetUserData({ ...getUserData, country: e.target.value });
                                                    }
                                                }} />
                                            {fieldErrors.country && (
                                                <div className="error_messages">{fieldErrors.country}</div>
                                            )}
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>

                    <div className='profile_btn'><button className='upload_btn' style={{color:"#7AC24F", border:"1px solid #7AC24F"}} onClick={() => nagviate("/homepage")}>Cancel</button>
                        <button className='profile_save_btn' onClick={profileSubmitHandler}>Save</button>
                    </div>
                </Container>
            </div>}

            <AppFooter />
        </Helmet>
    );
};

export default MyProfile;
