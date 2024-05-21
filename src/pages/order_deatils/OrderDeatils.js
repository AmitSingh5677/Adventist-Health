import React, { useState } from 'react';
import "./OrderDeatils.css";
import Helmet from '../../components/helmet/Helmet';
import AppHeader from '../../components/header/AppHeader';
import AppFooter from '../../components/footer/AppFooter';
import { Col, Container, Input, Row } from 'reactstrap';
import thermoMeter from "../../data/assests/download_img/thermoMeter.png";
import op from "../../data/assests/download_img/OIP (37).png";
import { useParams } from 'react-router-dom';
import { formatDate } from '../order_History/OrderHistory';
import SpinLoader from '../../components/spin-loader/SpinLoader';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../utility/CheckoutForm';
import BackButton from '../../components/Button/BackButton';


const OrderDeatils = () => {
    const { id } = useParams();
    const [userAddressId, setUserAddressId] = useState();
    const [orderValue, setOrderValue] = useState({});
    const [product__Id, setProduct__Id] = useState(id);
    const [bussiness_id, setBussiness_Id] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [isAddress, setIsAddress] = useState({});
    const [isProduct, setIsProduct] = useState({});
    const [clientSecret, setClientSecret] = useState();
    const [isProductId, setIsProductId] = useState();
    const [isUserAddress, setUserIsAddress] = useState()

    const { recipient_name, street_address, city, state, country, zip_code, phone } = isAddress;
    const userAddressString = `${recipient_name}, ${street_address}, ${city}, ${state}, ${country}, ${zip_code} , ${phone}`;

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const patientId = JSON.parse(sessionStorage.getItem("patientId"));
                const token = JSON.parse(sessionStorage.getItem("token"));
                const response = await fetch(`/patients/orders/${patientId}/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json();

                if (data) {
                    // console.log("order_Deatils " + JSON.stringify(data.delivery_location_details));
                    setIsProductId(data.product);
                    setUserIsAddress(data.delivery_location_details)
                    setIsProduct(data);
                    setUserAddressId(data.delivery_location_details);

                    // Assuming order is a property in the data object
                    setOrderValue(data.order);
                }

                if (data && data.delivery_location_details) {
                    const responseAddress = await fetch(`/patients/delivery_address/${patientId}/${data.delivery_location_details}/`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Token ${token}`
                        },
                    });

                    const addressData = await responseAddress.json();

                    if (addressData) {
                        setIsLoading(false);
                        setIsAddress(addressData);
                    }
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, product__Id]);

    // Change the input change handler to update the orderValue state properly
    const handleInputChange = (e) => {
        setOrderValue(e.target.value);
    };

    const reorederHandler = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(sessionStorage.getItem("token"));
            const patientId = JSON.parse(sessionStorage.getItem("patientId"))
            const response = await fetch("/patients/payment_intent/create/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    "user_id": patientId,
                    "product_ids": [isProductId],
                    "delivery_address_id": isUserAddress,
                    "payment_details": "",
                    "payment_method": "card"
                }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const data = await response.json();
            setBussiness_Id(data.stripe_business_id)
            setClientSecret(data.client_secret)
            localStorage.setItem("order_id",data?.order_id)
            localStorage.setItem("amount",data?.total_amount)
            setIsLoading(false)
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,

    };
    const stripePromise = loadStripe("pk_test_51OeI84FfzIuMGK9WqeYQ1zf1KR3qGECm10kiyfqLPvXgeCSHVUnweK3npcFEldVrRCjoUgIWX1kGzRmR4WwXRywn00twyegXzw", {
        stripeAccount: bussiness_id
    });

    return (
        <div>
            {clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            ) : (<Helmet title="Order-Deatils">
                <AppHeader />
                <div style={{marginTop:"150px", marginInline:"120px"}} className='title-section-order'>
                <h3><b>Order Detail</b></h3>
                    </div>
                
                {isLoading ? <SpinLoader /> : <div className='order__conatiner'>
                    <section className='mt-2 mx-2'>
                        <Container>
                            <Row className='order_deatils'>
                                <Col xs={3} sm={3} lg={3}>
                                    <h6>Equipment name</h6>
                                </Col>
                                <Col xs={3} sm={3} lg={3}>
                                    <h6>Images</h6>
                                </Col>
                                <Col xs={3} sm={3} lg={3}>
                                    <h6>Business Name</h6>
                                </Col>
                                <Col xs={3} sm={3} lg={3}>
                                    <h6>Description</h6>
                                </Col>
                            </Row>

                        </Container>

                        <div style={{ marginTop: "2%" }}>
                            <Container>
                                <Row>
                                    <Col xs={3} sm={3} lg={3}>
                                        <h6 className='order_deatils_h6'>{isProduct.equipment_name}</h6>
                                    </Col>
                                    <Col xs={3} sm={3} lg={3}>
                                        <Row>
                                            <img src={isProduct.avatar} alt="thermoMeter" className='order__img' />
                                            {/* <img src={op} alt="op" className='order__img' /> */}
                                        </Row>
                                    </Col>
                                    <Col xs={3} sm={3} lg={3}>
                                        <h6 className='order_deatils_h6'>{isProduct.business_name}</h6>
                                    </Col>
                                    <Col xs={3} sm={3} lg={3}>
                                        <h6 className='order_deatils_h6'>{isProduct.product_description}</h6>
                                    </Col>
                                </Row>

                            </Container>
                        </div>
                        <div style={{ marginTop: "2%" }}>
                            <Container>
                                <Row>
                                    <Col xs={12} sm={12} lg={12}>
                                        <h6 className='order_deatils_h6' >Payment Details:</h6>
                                    </Col>
                                </Row>

                            </Container>
                        </div>
                        <div style={{ marginTop: "1%" }}>
                            <Container>
                                <Row>
                                    <Col xs={12} sm={12} lg={12}>
                                        <h6 className='order_deatils_h6'>Date:{formatDate(isProduct.order_date)}</h6>
                                    </Col>
                                </Row>

                            </Container>
                        </div>

                        <div style={{ marginTop: "3%" }}>
                            <Container>
                                <Row>
                                    <Col xs={4} sm={4} lg={4}>
                                        <h6 className='order_deatils_h6'>Delivery Location Details:</h6>
                                        <div>
                                            <Input
                                                value={userAddressString}
                                                onChange={handleInputChange}
                                                style={{ height: 'auto', minHeight: '100px', background: "#ffff", border: "1px solid", fontFamily: "Poppins", fontSize: "14px" }}
                                                className="form-control shadow-none"
                                                id="exampleText"
                                                name="text"
                                                type="textarea"
                                                readOnly
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={6} sm={6} lg={6}>
                                        <h6 className='order_deatils_h6'>Order Status:</h6>
                                        {/* <p className='order_status_txt'>{isProduct.payment_status}</p> */}
                                        <p className={isProduct.payment_status == "succeeded" ? 'order_status_txt' : "red"}>{isProduct.payment_status == "succeeded" ? "Success" : "Failed"}</p>
                                    </Col>
                                </Row>

                            </Container>
                        </div>
                    <Container className='mt-3 mb-3'>
                        <div className='d-flex justify-content-between' style={{width:'70vw'}}>
                            <BackButton width={"150px"}/>
                            <button className='order__btn me-5' style={{backgroundColor:"#7AC24F", width:'350px'}} onClick={reorederHandler}>Re-order</button>
                        </div>
                    </Container>
                    </section>

                </div>}

                <AppFooter />
            </Helmet>)}

        </div>
    )
}

export default OrderDeatils;
