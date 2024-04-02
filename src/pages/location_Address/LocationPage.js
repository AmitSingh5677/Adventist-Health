import React, { useState } from 'react';
import "./LoacationPage.css"
import Helmet from '../../components/helmet/Helmet';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { FaPencilAlt } from 'react-icons/fa';
import PageHelmet from '../../components/page_Helmet/PageHelmet';
import AppHeader from '../../components/header/AppHeader';
import AppFooter from '../../components/footer/AppFooter';
import { useNavigate } from 'react-router-dom';
import SpinLoader from '../../components/spin-loader/SpinLoader';
import { RiDeleteBin5Line } from "react-icons/ri";
import ToastMessage from '../../components/toast/ToastMessage';
import SucessMessage from '../../components/successToast/SuccessToast';




const LocationPage = () => {
    const navigate = useNavigate();
    const [apiData, setApiData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [defaultAddress, setDefaultAddress] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editableAddress, setEditableAddress] = useState({ ...defaultAddress });
    const [fullName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userCity, setUserCity] = useState("")
    const [userCountry, setUserCountry] = useState("")
    const [userState, setUserState] = useState("")
    const [userZipCode, setUserZipCode] = useState("")
    const [userNum, setUserNum] = useState("")
    const [userChecked, setUserChecked] = useState(false);
    const [userAddress1, setUserAddress1] = useState("");
    const [userAddress2, setUserAddress2] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const [isSaved, setSaved] = useState();
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [isError, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState("")

    console.log("saved Address " + JSON.stringify(isSaved));
    const handleEdit = () => {
        setEditMode(true);
    };

    // This Function run when save the Defualt Address
    const handleSave = async (e) => {
        e.preventDefault();
        setDefaultAddress({ ...editableAddress });
        setEditMode(false);
        const token = JSON.parse(sessionStorage.getItem("token"));

        try {
            const response = await fetch('/patients/delivery_address/58/18/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    "recipient_name": editableAddress.name,
                    "phone": editableAddress.phone,
                    "street_address": editableAddress.street_address,
                    "city": editableAddress.city,
                    "state": editableAddress.state,
                    "country": editableAddress.country,
                    "zip_code": editableAddress.zip_code,
                    "is_default": true
                }),
            });

            if (response.ok) {
                setDefaultAddress({
                    name: defaultAddress.recipient_name,
                    street_address: defaultAddress.street_address,
                    city: defaultAddress.city,
                    country: defaultAddress.country,
                    zipCode: defaultAddress.zip_code,
                    phoneNumber: defaultAddress.phone,
                });
                // window.location.reload();
                setIsSuccess("Your Default Address Has Been Saved.")
            } else {
                // setShowErrorToast(true);
                console.error('Login failed. Please check your credentials.');
                // setToastError("Unable to log in with provided credentials.")
            }
        } catch (error) {
            console.error('An error occurred during login:', error.message);
        }

    };

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleChange = (e) => {
        setEditableAddress({
            ...editableAddress,
            [e.target.name]: e.target.value,
        });
    };

    // this useEffect run to find the defualt Address

    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                const patientId = JSON.parse(sessionStorage.getItem("patientId"));
                const token = JSON.parse(sessionStorage.getItem("token"));
                const response = await fetch(`/patients/delivery_address/${patientId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json();
                // console.log("userData " + data);
                setApiData(data)
                setSaved(data.filter((item)=>!item.is_default));

                const defaultAddress = data.find(item => item.is_default);
                if (defaultAddress) {
                    const defaultAddressId = defaultAddress.id;
                    console.log("Default Address ID:", defaultAddress);
                    sessionStorage.setItem("defaultAddressId", defaultAddressId)
                    setDefaultAddress({
                        name: defaultAddress.recipient_name,
                        street: defaultAddress.street_address,
                        state: defaultAddress.state,
                        city: defaultAddress.city,
                        country: defaultAddress.country,
                        zipCode: defaultAddress.zip_code,
                        phoneNumber: defaultAddress.phone,

                    });

                } else {
                    console.log("No default address found");
                    setDefaultAddress("")
                    // setError("Please Visit After Some Time")
                }

                if (data) {
                    // console.log("User Data Location: " + JSON.stringify(data));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserData();
    }, [isLoaded]);

    console.log(defaultAddress,"123")
    // send Delivery Address to Backend
    const saveAddress = async () => {

        try {
            const token = JSON.parse(sessionStorage.getItem("token"));
            const patientId = JSON.parse(sessionStorage.getItem("patientId"))
            const response = await fetch("/patients/delivery_address/create/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    "user_id": patientId,
                    "recipient_name": fullName + " " + lastName, //first Name
                    "phone": userNum,
                    "street_address": userAddress1 + "," + userAddress2,
                    "city": userCity, // Done
                    "state": userState, // Done
                    "country": userCountry, // Done 
                    "zip_code": userZipCode, // Done
                    "is_default": userChecked

                }),
            }
            
            );

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
            setIsLoaded(true)
            setShowErrorToast(true)
            setIsSuccess("Address Information Successfully Updated..")
            window.location.reload()
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }

    }

    const stripeHandler = async () => {
        navigate("/PaymentPage")
    };

    // Delete Address Handler
    const deleteHandler = async (id) => {
        // alert(id);

        try {
            const address_id = id
            const token = JSON.parse(sessionStorage.getItem("token"));
            const patientId = JSON.parse(sessionStorage.getItem("patientId"))
            const response = await fetch(`/patients/delivery_address/${patientId}/${address_id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
            });


            if (response.ok) {
                setShowErrorToast(true)
                setIsSuccess("Address is sucessfully deleted.Thank You")
                window.location.reload()
            } else {
                console.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('An error occurred during login:', error.message);
        }

    }
    const handleKeyPress = (event) => {
        // Allowing only numeric characters (0-9) and backspace
        const isValidChar = /^[0-9\b]+$/.test(event.key);
        if (!isValidChar) {
            event.preventDefault();
        }
    };


    return (
        <Helmet title="Delivery Location Address">
            <AppHeader />
            {isError ? <ToastMessage show={showErrorToast} message={isError} onClose={() => setShowErrorToast(false)} /> : <SucessMessage show={showErrorToast} message={isSuccess} onClose={() => setShowErrorToast(false)} />}

            {isLoading ? <SpinLoader /> : <div style={{ marginBottom: "10%" }}>
                <section>
                    <Container xs="12" sm="12" lg="12" >
                        <PageHelmet pageTitle="Delivery Location Address"  />
                    </Container>
                    {apiData.length === 0 ? null : <Container>
                        <Row>
                            <Col xs="12" sm="12" lg="12">
                                <h6 className='defualt__txt'>Default Addresses</h6>
                                {defaultAddress &&
                                <div className='address__conatiner'>
                                    <Row>
                                        <Col xs="11" sm="1" lg="1">
                                            <input
                                                type="radio"
                                                name="selectAddress"
                                                checked={true}
                                                className='radio__btn'
                                            // onChange={handleSelectAddress}
                                            />
                                        </Col>
                                        <Col xs="10" sm="10" lg="10">
                                        
                                            { editMode ? (

                                                <Row>
                                                    <FormGroup>
                                                        <Col md={12}>
                                                            <input
                                                                style={{ marginTop: "10px" }}
                                                                className="form-control shadow-none mt-10"
                                                                type="text"
                                                                name="name"
                                                                value={editableAddress.name}
                                                                onChange={handleChange}
                                                                placeholder="First Name"
                                                            />
                                                        </Col>
                                                        <Col md={12}>
                                                            <input
                                                                style={{ marginTop: "10px" }}
                                                                className="form-control shadow-none"
                                                                type="text"
                                                                name="street_address"
                                                                value={editableAddress.street_address}
                                                                onChange={handleChange}
                                                                placeholder="Address"
                                                            />
                                                        </Col>
                                                        <Col md={12}>
                                                            <input
                                                                style={{ marginTop: "10px" }}
                                                                className="form-control shadow-none"
                                                                type="text"
                                                                name="city"
                                                                value={editableAddress.city}
                                                                onChange={handleChange}
                                                                placeholder="City"
                                                            />
                                                        </Col>
                                                        <Col md={12}>
                                                            <input
                                                                style={{ marginTop: "10px" }}
                                                                className="form-control shadow-none"
                                                                type="text"
                                                                name="state"
                                                                value={editableAddress.state}
                                                                onChange={handleChange}
                                                                placeholder="State"
                                                            />
                                                        </Col>

                                                        <Row>
                                                            <Col md={3}>
                                                                <input
                                                                    style={{ marginTop: "10px" }}
                                                                    className="form-control shadow-none"
                                                                    type="text"
                                                                    name="country"
                                                                    value={editableAddress.country}
                                                                    onChange={handleChange}
                                                                    placeholder="Country"
                                                                />
                                                            </Col>
                                                            <Col md={3}>
                                                                <input
                                                                    style={{ marginTop: "10px" }}
                                                                    className="form-control shadow-none"
                                                                    type="text"
                                                                    name="zipCode"
                                                                    value={editableAddress.zipCode}
                                                                    onChange={handleChange}
                                                                    placeholder="Zip Code"
                                                                    maxLength={5}
                                                                    onKeyPress={handleKeyPress}
                                                                />
                                                            </Col>
                                                            <Col md={6}>
                                                                <input
                                                                    style={{ marginTop: "10px" }}
                                                                    className="form-control shadow-none"
                                                                    type="text"
                                                                    name="phoneNumber"
                                                                    value={editableAddress.phoneNumber}
                                                                    onChange={handleChange}
                                                                    placeholder="Mobile Number"
                                                                    onKeyPress={handleKeyPress}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <div>
                                                            <button onClick={handleCancel} className='save__btn' >Cancel</button>
                                                            <button onClick={handleSave} className='cancel__btn'>Save</button>

                                                        </div>
                                                    </FormGroup>
                                                </Row>
                                            ) : (
                                                <Row>
                                                    <p className='userName__txt'>{defaultAddress.name}</p>
                                                    <p className='street__adress'>{defaultAddress.street}</p>
                                                    <p className='adress_txt' style={{ position: "relative", bottom: "15px" }}>{`${defaultAddress.city},${defaultAddress.state}, ${defaultAddress.country} - ${defaultAddress.zipCode}`}</p>
                                                    <p className='mobile_num'>{defaultAddress.phoneNumber}</p>

                                                </Row>
                                            )}
                                        </Col>
                                    </Row>
                                    <Col xs="1" sm="1" lg="1">
                                        <FaPencilAlt onClick={handleEdit} style={{ cursor: 'pointer' }} />
                                    </Col>

                                </div>
                                }
                            </Col>
                        </Row>
                    </Container>}

                </section>


                {/* saved Address */}
                {isSaved ? <Container>

                    <Col xs="12" sm="12" lg="12">
                        <div className='address__conatiner'>
                            <Row>
                                <h6 className='defualt__txt' style={{ marginTop: "25px" }}>Saved Addresses</h6>
                                {isSaved.map((item) => (
                                    <div key={item.id} className="d-flex align-items-center">
                                        <Col xs="11" sm="1" lg="1">
                                            {/* Radio button */}
                                            <input type="radio" name="addressRadio" style={{ cursor: "pointer" }} />
                                        </Col>
                                        <Col xs="10" sm="10" lg="10">
                                            {/* Address details */}
                                            <p className='userName__txt'>{item.recipient_name}</p>
                                            <p className='street__adress'>{item.street_address}</p>
                                            <p className='street__adress'>{item.state}</p>
                                            <p className='adress_txt' style={{ position: "relative", bottom: "7px" }}>{`${item.city}, ${item.country} - ${item.zip_code}`}</p>
                                            <p className='mobile_num'>{item.phone}</p>
                                        </Col>
                                        <Col xs="1" sm="1" lg="10">
                                            {/* Delete button */}
                                            <RiDeleteBin5Line onClick={() => deleteHandler(item.id)} style={{ cursor: 'pointer', color: "#F90D0D", fontSize: "22px", }} />
                                        </Col>
                                    </div>
                                ))}
                            </Row>

                        </div>
                    </Col>

                </Container> : null}


                {/* Form */}
                <Container>
                    <Row>
                        <Col xs="12" sm="12" lg="12">
                            <h6 className='defualt__txt' style={{ marginTop: "25px" }}>Add New Address</h6>
                            <div className='address__conatiner'>
                                <Form style={{ marginTop: "10px", marginLeft: "10px" }}>
                                    <Row>
                                        <Col md={5}>
                                            <FormGroup>
                                                <Label for="exampleEmail" className='address__label'>
                                                    First Name
                                                </Label>
                                                <Input
                                                    className="form-control shadow-none"
                                                    id="exampleEmail"
                                                    name="email"
                                                    placeholder="First Name"
                                                    type="text"
                                                    value={fullName}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        const regex = /^[A-Za-z\s]+$/;

                                                        if (regex.test(inputValue) || inputValue === '') {
                                                            setFirstName(inputValue);
                                                        }
                                                    }}

                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={5}>
                                            <FormGroup>
                                                <Label for="examplePassword" className='address__label'>
                                                    Last Name
                                                </Label>
                                                <Input
                                                    className="form-control shadow-none"
                                                    value={lastName}
                                                    onChange={(e)=>{
                                                        const inputValue = e.target.value;
                                                        const regex = /^[A-Za-z\s]+$/;

                                                        if (regex.test(inputValue) || inputValue === '') {
                                                            setLastName(inputValue);
                                                        } 
                                                    }}
                                                    placeholder="Last Name"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={5}>
                                            <FormGroup>
                                                <Label for="exampleEmail" className='address__label'>
                                                    Address Line 1
                                                </Label>
                                                <Input
                                                    className="form-control shadow-none"
                                                    id="exampleEmail"
                                                    name="email"
                                                    placeholder="Address Line 1"
                                                    type="text"
                                                    value={userAddress1}
                                                    // onChange={(e) => setUserAddress1(e.target.value)}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        // const regex = /^[A-Za-z\s]+$/;

                                                        // if (regex.test(inputValue) || inputValue === '') {
                                                        //     setUserAddress1(inputValue);
                                                        // }
                                                        setUserAddress1(inputValue);
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={5}>
                                            <FormGroup>
                                                <Label for="examplePassword" className='address__label'>
                                                    Address Line 2
                                                </Label>
                                                <Input
                                                    className="form-control shadow-none"
                                                    id="examplePassword"
                                                    name="password"
                                                    placeholder="Address Line 2"
                                                    type="text"
                                                    value={userAddress2}
                                                    // onChange={(e) => setUserAddress2(e.target.value)}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        // const regex = /^[A-Za-z\s]+$/;

                                                        // if (regex.test(inputValue) || inputValue === '') {
                                                        //     setUserAddress2(inputValue);
                                                        // }
                                                        setUserAddress2(inputValue);
                                                    }}

                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={5}>
                                            <FormGroup>
                                                <Label for="exampleEmail" className='address__label'>
                                                    City
                                                </Label>
                                                <Input
                                                    className="form-control shadow-none"
                                                    id="exampleEmail"
                                                    name="email"
                                                    placeholder="City"
                                                    type="text"
                                                    value={userCity}
                                                    // onChange={(e) => setUserCity(e.target.value)}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        const regex = /^[A-Za-z\s]+$/;

                                                        if (regex.test(inputValue) || inputValue === '') {
                                                            setUserCity(inputValue);
                                                        }
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={5}>
                                            <FormGroup>
                                                <Label for="examplePassword" className='address__label'>
                                                    Postal Code
                                                </Label>
                                                <Input
                                                    className="form-control shadow-none"
                                                    id="examplePassword"
                                                    name="password"
                                                    placeholder="Postal Code"
                                                    type="text"
                                                    value={userZipCode}
                                                    onChange={(e) => setUserZipCode(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                    maxLength={5}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={5}>
                                            <FormGroup>
                                                <Label for="exampleEmail" className='address__label'>
                                                    State
                                                </Label>
                                                <Input
                                                    id="exampleEmail"
                                                    className="form-control shadow-none"
                                                    name="email"
                                                    placeholder="State"
                                                    type="text"
                                                    value={userState}
                                                    // onChange={(e) => setUserState(e.target.value)}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        const regex = /^[A-Za-z\s]+$/;

                                                        if (regex.test(inputValue) || inputValue === '') {
                                                            setUserState(inputValue);
                                                        }
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={5}>
                                            <FormGroup>
                                                <Label for="examplePassword" className='address__label'>
                                                    Country
                                                </Label>
                                                <Input
                                                    className="form-control shadow-none"
                                                    id="examplePassword"
                                                    name="password"
                                                    placeholder="Country"
                                                    type="text"
                                                    value={userCountry}
                                                    // onChange={(e) => setUserCountry(e.target.value)}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        const regex = /^[A-Za-z\s]+$/;

                                                        if (regex.test(inputValue) || inputValue === '') {
                                                            setUserCountry(inputValue);
                                                        }
                                                    }}
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col md={5}>
                                            <FormGroup>
                                                <Label for="examplePassword" className='address__label'>
                                                    Mobile Number
                                                </Label>
                                                <Input
                                                    className="form-control shadow-none"
                                                    id="examplePassword"
                                                    name="password"
                                                    placeholder="Mobile Number"
                                                    type="text"
                                                    value={userNum}
                                                    onChange={(e) => setUserNum(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                    maxLength={10}
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>

                                                <Input type="checkbox" value={userChecked} onChange={() => setUserChecked(!userChecked)} />
                                                <Label for="examplePassword" className='address__label' style={{ marginLeft: "5px" }}>
                                                    Set as the default address.
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>

                </Container>
                <Container>
                    <Row>
                        <button className='save_Address' style={{color:"#7AC24F", border:"1px solid #7AC24F"}} onClick={saveAddress}>Save Address</button>
                        {apiData.length === 0 ? null : <button className='nxt__btn' style={{backgroundColor:"#7AC24F"}} onClick={stripeHandler} >Next</button>}
                    </Row>
                </Container>
            </div>}

            <AppFooter />
        </Helmet>
    );
};

export default LocationPage;
