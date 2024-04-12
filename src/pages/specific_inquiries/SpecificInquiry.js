
import React, { useState } from 'react';
import "./SpecificInquiry.css"
import Helmet from '../../components/helmet/Helmet'
import AppHeader from '../../components/header/AppHeader'
import AppFooter from '../../components/footer/AppFooter'
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Input, Row } from 'reactstrap'
import dummyImg from "../../data/assests/download_img/Sample Card - Light.png";
import mockImg from "../../data/assests/download_img/electricChair1.png"
import SpinLoader from '../../components/spin-loader/SpinLoader';
import SucessMessage from '../../components/successToast/SuccessToast';
import { useParams } from 'react-router-dom';
import mixpanel from "../../mixpanel";
import OneSignal from 'react-onesignal';

const SpecificInquiry = () => {
    const { id } = useParams();

    const [userMessage, setUserMessage] = useState('');
    const [inquiryData, setInquiryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [isSucess, setIsSucess] = useState("");
    const [isError, setIsError] = useState("");
    const [sucessToast, setSucessToast] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState();
    const [filteredData, setFilteredData] = React.useState();
    const [businessimg, setBusinessimg] = React.useState();

    const bussness_name = sessionStorage.getItem("business_name")

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const patient_id = JSON.parse(sessionStorage.getItem("patientId"))
                console.log(patient_id,"patient_id")
                const token = JSON.parse(sessionStorage.getItem("token"));
                const response = await fetch(`https://dmecart-38297.botics.co/patients/inquiries/${patient_id}/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });
                const data = await response.json();
                if (data && data.length > 0) {
                    
                    setIsLoading(false)
                    setInquiryData(data);
                    console.log("inquiry Data" + JSON.stringify(data));
                } else {
                    // alert("No Data Found for Particular Business");
                    // You can also navigate to a different page if needed
                    // navigate("/homepage")
                }
            } catch (error) {
                // showToast(true)
                // setIsError("There is Internal Server.Please Visit After SomeTime.")
            }
        };

        fetchData();
    }, []);


    // this UseEffect for to get Product Deatils
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const bussiness_id = JSON.parse(sessionStorage.getItem("bussiness_id"))
                const token = JSON.parse(sessionStorage.getItem("token"));
                const response = await fetch(`https://dmecart-38297.botics.co/business/product/${bussiness_id}/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json();
                console.log(data,"datadata")
                if (data) {
                    setIsLoading(false);
                    // console.log("bussiness_id" + JSON.stringify(data));
                    setData(data)
                    const filteredDataById = data.filter(item => item.id === parseInt(id));
                    if (filteredDataById.length > 0) {
                        setFilteredData(filteredDataById);
                    } 
                } else {
                  //  alert("No Data Found for Particular Bussiness");
                    // Handle the case where no data is returned
                }
            } catch (error) {
                // console.error('Error fetching data:', error);
                setIsLoading(false);
                setIsError(true);
                // setErrorMessage("There is Internal Server.Please Visit After SomeTime.")
            }
        };

        setIsLoading(true);
        fetchData();

    }, []);

    console.log(filteredData,data,"data")


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const bussiness_id = JSON.parse(sessionStorage.getItem("bussiness_id"))
                const token = JSON.parse(sessionStorage.getItem("token"));
                const response = await fetch(`https://dmecart-38297.botics.co/business/business_profile/${bussiness_id}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json();
                console.log(data,"image")
                if (data) {
                     setBusinessimg(data.avatar_signed_url)
                } else {
                  //  alert("No Data Found for Particular Bussiness");
                    // Handle the case where no data is returned
                }
            } catch (error) {
                // console.error('Error fetching data:', error);
               
                // setErrorMessage("There is Internal Server.Please Visit After SomeTime.")
            }
        };

        setIsLoading(true);
        fetchData();

    }, []);
    const handleInputChange = (e) => {
        setUserMessage(e.target.value);
        setErrorMessage('');
    };

    const handleSendMessage = async () => {
        try {
            if (!userMessage) {
                // Set error message and return to prevent sending the message
                setErrorMessage('Please input a brief message before proceeding.');
                return;
            };

            const patientId = JSON.parse(sessionStorage.getItem("patientId"));
            const token = JSON.parse(sessionStorage.getItem("token"));

            const response = await fetch('/patients/inquiries/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user_id": patientId,
                    "product_id": id,
                    "message": userMessage,
                }),
            });

            const data = await response.json();

            if (data) {
                mixpanel.track("Messages Sent from consumer/patient to vendor")
                setSucessToast(true)
                setShowToast(true);
                setIsSucess("Enquiry added successfully.")
                OneSignal.Notifications.addEventListener('notificationDisplay', (event) => {
                    console.log("The notification was clicked!", event);
                  });

                  const fetchData1 = async () => {
                    try {
                        const patient_id = JSON.parse(sessionStorage.getItem("patientId"))
                        console.log(patient_id,"patient_id")
                        const token = JSON.parse(sessionStorage.getItem("token"));
                        const response = await fetch(`https://dmecart-38297.botics.co/patients/inquiries/${patient_id}/${id}/`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Token ${token}`
                            },
                        });
                        const data = await response.json();
                        if (data && data.length > 0) {
                            setUserMessage('')
                            setIsLoading(false)
                            setInquiryData(data);
                            console.log("inquiry Data" + JSON.stringify(data));
                        } else {
                        }
                    } catch (error) {
                        // showToast(true)
                        // setIsError("There is Internal Server.Please Visit After SomeTime.")
                    }
                };
                fetchData1();

               
                // console.log("userData" + JSON.stringify(data));
            } else {
                // Handle error if needed
                console.log('Error sending message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle error if needed
        }
    };
    

    // https://dmecart-38297.botics.co/business/inquiries/4/eKtF1708605971/

  
    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         const u_id =1
    //          try {
    //             const token = JSON.parse(sessionStorage.getItem("token"));
    //             const response = await fetch(`business/business_details${u_id}/`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': `Token ${token}`
    //                 },
    //             });

    //             const data = await response.json();
    //             if (data && data.length > 0) {
    //                 setIsLoading(false);
    //                 // setAllProducts(data)
    //                 console.log("data" + JSON.stringify(data));
    //             } else {
    //                 alert("No Data Found for Particular Bussiness");
    //                 // navigate("/homepage")
    //             }
    //         } catch (error) {
    //             // console.error('Error fetching data:', error);
    //             setIsLoading(false);
    //             setIsError(true);
    //             setErrorMessage("There is Internal Server.Please Visit After SomeTime.")
    //         }
    //     };

    //     setIsLoading(true);
    //     fetchData();

    // }, []);


    return (
        <Helmet title="Specific Inquiry Screen">
            <AppHeader />
            {showToast ? <SucessMessage show={sucessToast} message={isSucess} onClose={() => setSucessToast(false)} /> : null}
            {isLoading ? <SpinLoader /> : (<div style={{ marginTop: "10%", marginBottom: "9%" }}>
                <Container  style={{ display: 'flex', flexDirection: 'row',justifyContent:'center',  maxWidth: "90%",margin:"20px 70px" }}>
                      <Card  style={{ width: '54%' }}>
                            {/* <CardImg  src={dummyImg} alt="Product Image" style={{ width: '70%', objectFit: 'cover' }} /> */}
                            <CardBody className='d-flex justify-content-center'>
                           <img  src={businessimg} alt="Product Image" className='image_buisness' />
                           </CardBody>
                        </Card>
                        <Card   style={{ width: '35%', textAlign: "center" }} className='ms-3'>
                            <CardBody>
                                <CardTitle tag="h5" className='cardTxt'>{bussness_name}</CardTitle>
                            </CardBody>
                        </Card>
                </Container>
                <div className='specific__content'>
                   {data && <Row>
                        <h4 style={{ marginBottom: "15px", fontSize: "18px" }}>Inquiry for:</h4>
                        <Col md={6} lg={1}>
                            <img src={data.product_signed_url} className='image-product-inquiry' alt="img"/>
                        </Col>
                        <Col md={6} lg={2} className='ms-5'>
                            <h6 className='specific__txt '>{data.equipment_name}</h6>
                            <p className='specific__subtxt'><span style={{ fontWeight: "600" }}>Product Description: </span>{data.description}</p>
                        </Col>
                        <Col md={6} lg={2}>
                            <h6 className='specific__txt '>${data.price}</h6>
                        </Col>
                        <hr className='mt-3' />
                    </Row>}
                    <Row>

                        <Row>
                            <h5 style={{ marginBottom: "15px", fontSize: "18px" }}>Messages</h5>
                            {inquiryData.length > 0 ? (
                                inquiryData.map((message, index) => (
                                    <Col key={index} md={6} lg={12}>
                                        <p style={{ fontFamily: 'Poppins', fontSize: "13px" }}>{message.message}</p>
                                        <hr />
                                    </Col>
                                ))
                            ) : (
                                <Col md={6} lg={12}>
                                    <p style={{ fontFamily: 'Poppins', fontSize: "13px" }}>No messages found.</p>
                                    <hr />
                                </Col>
                            )}
                        </Row>

                        <hr />
                    </Row>
                    <Row>
                        <h4 style={{ fontFamily: 'Poppins', fontSize: "13px", fontWeight: "600" }}>Write a Review</h4>
                        <Col md={6} lg={12}>
                            <Input onChange={handleInputChange} className="form-control shadow-none" value={userMessage} id="exampleText" placeholder='How is the product? What do you like? What do you hate?'
                                name="text" style={{ height: "75px", marginBottom: "15px" }} />
                        </Col>
                        {errorMessage && (
                            <p style={{ color: 'red', fontSize: '12px', marginTop: '-10px', fontFamily: "Poppins" }}>{errorMessage}</p>
                        )}
                        <hr />
                    </Row>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <button className='specific__btn' style={{backgroundColor:"#7AC24F"}} onClick={handleSendMessage}>Send</button>
                    </div>
                </div>

            </div>)}

            <AppFooter />
        </Helmet>
    )
}

export default SpecificInquiry