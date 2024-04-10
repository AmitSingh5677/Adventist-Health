import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Helmet from '../../../components/helmet/Helmet';
import AppHeader from '../../../components/header/AppHeader';
import AppFooter from '../../../components/footer/AppFooter';
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import PageHelmet from '../../../components/page_Helmet/PageHelmet';
import SpinLoader from '../../../components/spin-loader/SpinLoader';
import { useNavigate } from 'react-router-dom';
import SucessMessage from '../../../components/successToast/SuccessToast';
import UserProfile from '../../../utility/useravthar/UserAvathar';
import './PatientProfileScreen.css'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import ToastMessage from '../../../components/toast/ToastMessage';


export default function PatientProfileScreen() {
    const { id } = useParams()
    const [userImg, setUserImg] = useState();
    const [getUserData, setGetUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [sucessToast, setSucessToast] = useState("");
    const [showToast, setShowToast] = useState(false)
    const nagviate = useNavigate()
    const [bussinessId, setbussinessId] = useState('')
    const [selectedOption, setSelectedOption] = useState(null);
    const [userDesc, setuserDesc] = useState("");
    const [isError, setIsError] = useState("");
    const [isSuccess, setIsSuccess] = useState("")
    const [showToastError, setshowToastError] = useState(false)

    

    const [isOpen, setIsOpen] = useState(false)


    React.useEffect(() => {
        const fetchData = async () => {
            try {

                const token = JSON.parse(sessionStorage.getItem("token"));
                const response = await fetch(`https://dmecart-38297.botics.co/patients/patients_details/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json();
                if (data) {
                    setIsLoading(false);
                    setGetUserData(data);
                    setbussinessId(data.id)
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

    const profileSubmitHandler = () => {
        setIsOpen(true)
    }
    const reportOptions = [
        'Spam',
        'Pornography',
        'Hatred and Bullying',
        'Self-harm',
        'Violent, Gory, and harmful content',
        'Child Porn',
        'Illegal Activities (e.g. drug use)',
        'Deceptive Content',
        'Copyright and Trademark Infringement',
    ];
    const onreasonClick = async () => {
        try {
            const userid = parseInt(sessionStorage.getItem("userid"));
            
            const trimmedUserDesc = userDesc.trim();
            if (!selectedOption && !userDesc) {
                setshowToastError(true);
                setIsError("Please select an option for Report");
                return;
            }
           
            if (userDesc && trimmedUserDesc.length < 6) {
                setshowToastError(true);
                setIsError("Please enter a valid description (at least 6 characters).");
                return;
            }
            if (trimmedUserDesc || selectedOption) {



                const token = JSON.parse(sessionStorage.getItem("token"));
                const response = await fetch(`https://dmecart-38297.botics.co/business/patientreport/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                        'Authorization': `Token ${token}`
                    },
                    body: JSON.stringify({
                        "patient": bussinessId,
                        "reason": selectedOption,
                        "description": userDesc
                    })

                });

                const data = await response.json();
                if (data) {
                    setshowToastError(false);
                    setShowToast(true);
                    setSucessToast("Your feedback has been successfully recorded.")
                }


            }
        } catch (error) {
            console.error('Error fetching data:', error);

        }
    }

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        console.log(`Selected option: ${option}`);
    };
    return (
        <Helmet title="My Profile">
            <AppHeader />
            {showToastError ? <ToastMessage show={showToastError} message={isError} onClose={() => setShowToast(false)} /> : null}

            {showToast ? <SucessMessage show={showToast} onClose={() => setShowToast(false)} message={sucessToast} /> : null}
            {isLoading ? <SpinLoader /> : <div style={{ marginTop: '9%', marginBottom: "8%" }}>

                <Container>
                    <Row xs="12" sm="12" lg="12">
                        <div>
                            <p className='patient_page_title'>My Profile</p>
                        </div>
                    </Row>
                </Container>
                <Container >
                    <div style={{ display: "flex" }} className='m-3'>


                        <div style={{ display: 'inline-block', textAlign: 'center' }}>
                            {/* <div style={{ position: "relative", left: userImg ? "-20px" : "10px" }}> */}
                            <UserProfile userName={getUserData.full_name} avatarUrl={userImg} />
                            {/* </div> */}


                        </div>



                        <div>
                            <Form >
                                <Row >
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>
                                                Full Name
                                            </Label>
                                            <Input
                                                disabled
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleEmail"
                                                name="full_name"
                                                placeholder="Full Name"
                                                type="text"
                                                value={getUserData.full_name}
                                                readOnly={!isEditMode}

                                            />

                                        </FormGroup>
                                    </Col>
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>
                                                Email Address
                                            </Label>
                                            <Input
                                                disabled
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleEmail"
                                                name="email"
                                                placeholder="user@gmail.com"
                                                type="email"
                                                value={getUserData.user_id.email || "-"}
                                                readOnly={!isEditMode}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>
                                                Phone Number
                                            </Label>
                                            <Input
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleEmail"
                                                name="phone"
                                                disabled
                                                placeholder="Mobile Number"
                                                type="text"
                                                value={getUserData.phone}
                                                maxLength={10}
                                                readOnly={!isEditMode}
                                            />


                                        </FormGroup>

                                    </Col>
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>
                                                Birthday
                                            </Label>
                                            <Input
                                                disabled
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleEmail"
                                                name="birthday"
                                                placeholder="DD-MM-YYYY"
                                                type="date" // Set the max attribute here
                                                value={getUserData.birthday || ""}
                                                readOnly={getUserData.birthday && !isEditMode}
                                                style={{ fontFamily: "Poppins" }} />

                                        </FormGroup>
                                    </Col></Row>
                                <Row >
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>Gender</Label>
                                            <select
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleGender"
                                                name="gender"
                                                disabled
                                                value={getUserData.gender === 'F' ? 'Female' : (getUserData.gender === 'M' ? 'Male' : '')}
                                                readOnly={getUserData.gender && !isEditMode}

                                                style={{ fontFamily: "Poppins" }}
                                            >
                                                <option value="" disabled style={{ fontFamily: "Poppins" }}>Select Gender</option>
                                                <option value="Female" style={{ fontFamily: "Poppins" }}>Female</option>
                                                <option value="Male" style={{ fontFamily: "Poppins" }}>Male</option>
                                            </select>

                                        </FormGroup>
                                    </Col>

                                    <Col md={5}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>
                                                City
                                            </Label>
                                            <Input
                                                disabled
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''} ${!isEditMode && 'non-editable'}`}
                                                id="exampleEmail"
                                                name="city"
                                                placeholder="City"
                                                type="text"
                                                value={getUserData.city}
                                            />

                                        </FormGroup>
                                    </Col></Row>
                                <Row>
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>
                                                Zip
                                            </Label>
                                            <Input
                                                disabled
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleEmail"
                                                name="zip_code"
                                                placeholder="Zipcode"
                                                type="text"
                                                maxLength={5}
                                                value={getUserData.zip_code}
                                                readOnly={!isEditMode}
                                            />

                                        </FormGroup>
                                    </Col>
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label for="exampleEmail" className='label_form '>
                                                State
                                            </Label>
                                            <Input
                                                disabled
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleEmail"
                                                name="state"
                                                placeholder="State"
                                                type="text"
                                                value={getUserData.state || ""}
                                                readOnly={getUserData.state && !isEditMode}
                                            />

                                        </FormGroup>
                                    </Col>
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label for="exampleEmail" >
                                                Country
                                            </Label>
                                            <Input
                                                disabled
                                                className={`form-control shadow-none mt-10 ${isEditMode ? 'editable' : ''}`}
                                                id="exampleEmail"
                                                name="country"
                                                placeholder="country"
                                                type="text"
                                                value={getUserData.country || ""}
                                                readOnly={getUserData.country && !isEditMode}
                                            />

                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>

                    <div className='d-flex justify-content-around'>

                        <button className='profile_report_btn' onClick={profileSubmitHandler}>Report user</button>
                    </div>
                </Container>
            </div>}

            <AppFooter />

            <Modal isOpen={isOpen} centered keyboard={false} backdrop="static" backdropClassName="modal-backdrop-dark" >
                {/* <div className='reportHead mb-2 mt-5' >
                    <span className='ms-5 '>Report</span>
                </div> */}
                <ModalHeader toggle={() => setIsOpen(false)} className='model_header' >
                    <span style={{ fontSize: "16px" }}>Report</span>
                </ModalHeader>
                {/* <span className='reporttxt ms-5 me-5'></span> */}
                <ModalBody >
                    <div className='p-5 pt-2 pb-0 reportContainer'>
                        <span className='reportText'>Why are you reporting this ?</span>
                        <span className='reportText1'>
                            Your report is anonymous, except if you’re reporting an intellectual property infringement.
                        </span><br></br>
                        {/* <span className='reasontext' onClick={() => onreasonClick('Spam')}>Spam</span> */}

                        {/* {reasondata.map((item) => (
                            <span className={selectedOption === item ? 'selectedOption' : ''} onClick={() => handleOptionSelect(item)}>{item.reason}</span>
                        ))} */}

                        {reportOptions.map((option, index) => (
                            <div  key={index} onClick={() => handleOptionSelect(option)}
                                className={selectedOption === option ? 'selectedOption pb-2 cursor' : 'pb-2 cursor'} >
                                {option}
                            </div>
                        ))}
                    </div>
                    <div className='p-2 reportContainer' >
                        <textarea style={{ width: '70%' }} className='p-2 bg-dark-subtle' onChange={(e) => setuserDesc(e.target.value)} rows={3} placeholder="Others" ></textarea></div>
                </ModalBody>

                <ModalFooter style={{ borderTop: 'none' }} className='modal__footer'>
                    <div className='d-flex justify-content-around'>

                        <button className='profile_report_btn' onClick={onreasonClick}>Confirm</button>
                    </div>
                </ModalFooter>
            </Modal>
        </Helmet>
    )
}
