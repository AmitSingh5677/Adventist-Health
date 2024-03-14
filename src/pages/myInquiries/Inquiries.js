import React, { useState, useEffect } from 'react';
import "./Inquiries.css"
import Helmet from '../../components/helmet/Helmet';
import AppHeader from '../../components/header/AppHeader';
import AppFooter from '../../components/footer/AppFooter';
import { RiDeleteBin6Line } from 'react-icons/ri'; // Import delete icon
import { Col, Container, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import SpinLoader from '../../components/spin-loader/SpinLoader';
import ToastMessage from '../../components/toast/ToastMessage';
import SucessMessage from '../../components/successToast/SuccessToast';
import noImage from '../../data/assests/noImage.jpg'

const Inquiries = () => {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();
    const [isInquiry, setInquiry] = useState([]);
    const [isSuccess, setIsSucess] = useState(false);
    const [sucessMsg, setSucessMsg] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const patient_id = JSON.parse(sessionStorage.getItem("patientId"))
                const token = JSON.parse(sessionStorage.getItem("token"));
                const response = await fetch(`/patients/inquiries/${patient_id}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json();
                if (data) {
                    setIsLoading(false)
                    console.log("inquiry Data" + JSON.stringify(data));
                    setInquiry(data)
                } else {
                    alert("No Data Found for Particular Business");
                    // You can also navigate to a different page if needed
                    // navigate("/homepage")
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [isSuccess]);

    const deleteHandler = async (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const patient_id = JSON.parse(sessionStorage.getItem("patientId"))
            const product_id = product
            const token = JSON.parse(sessionStorage.getItem("token"));
            const response = await fetch(`/patients/inquiries/${patient_id}/${product_id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
            });

            if (response.ok) {
                setIsSucess(true);
                setSucessMsg("Your inquiry has been successfully removed.");
            } else {
                console.error('Delete failed. Please check your credentials.');
            }
        }
        catch (error) {
            console.error('Error deleting inquiry:', error);
        }
    }

    return (
        <Helmet title="My Inquiries Screen">
            <AppHeader />
            {isLoading ? (
                <SpinLoader />
            ) : (
                <div style={{ marginTop: "10%" }}>
                    <section>
                        <Container>
                            {isInquiry.length > 0 && (
                                <h5 style={{ marginBottom: "30px" }}>All Inquiries</h5>
                            )}
                            {isInquiry.length === 0 ? (
                                <p className='noData_txt'>No inquiries have been made yet.</p>
                            ) : (
                                isInquiry.map((inquiry, index) => (
                                    <React.Fragment key={index}>
                                        <Row className='order_details' onClick={() => navigate("/specificInquiry")} style={{ cursor: "pointer" }}>
                                            <Col xs={1} sm={1} lg={1}>
                                                <img src={inquiry.business_avatar || noImage} alt="Inquiry" className='userLogo_imquiry' />
                                            </Col>
                                            <Col xs={10} sm={10} lg={10}>
                                                <h6 className="inquireies__txt">{inquiry.equipment_name}</h6>
                                                <p className='inquireies__subTxt'>{inquiry.message}</p>
                                            </Col>
                                            <Col xs={1} sm={1} lg={1}>
                                                <span style={{ color: "#F90D0D", cursor: "pointer" }} onClick={(e) => deleteHandler(e, inquiry.product)}><RiDeleteBin6Line /></span>
                                            </Col>
                                        </Row>
                                        <hr /> {/* HR tag after each inquiry */}
                                    </React.Fragment>
                                ))
                            )}
                        </Container>
                    </section>
                </div>
            )}

            {isSuccess ? <SucessMessage show={isSuccess} message={sucessMsg} onClose={() => setIsSucess(false)} /> : null}

            <AppFooter />
        </Helmet>
    );
};

export default Inquiries;
