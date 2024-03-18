
import React, { useState } from 'react';
import "./OrderHistory.css"
import Helmet from '../../components/helmet/Helmet'
import AppHeader from '../../components/header/AppHeader'
import { Col, Container, Row, Table } from 'reactstrap'
import PageHelmet from '../../components/page_Helmet/PageHelmet';
import { FaChevronRight } from "react-icons/fa";
import AppFooter from '../../components/footer/AppFooter';
import { json, useNavigate } from 'react-router-dom';
import SpinLoader from '../../components/spin-loader/SpinLoader';

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
}

const OrderHistory = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [orderHistory, setOrderHistory] = useState([]);
    const navigate = useNavigate();


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const patientId = JSON.parse(sessionStorage.getItem("patientId"));
                const token = JSON.parse(sessionStorage.getItem("token"));
                const response = await fetch(`/patients/all_orders/${patientId}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json();
                setOrderHistory(data)
                // if (data) {

                //     // need to work on this ---- only all orders api need to be executed here --- 
                //     // Fetch additional data for each order using the other API
                //     const updatedOrderHistory = await Promise.all(
                //         data.map(async (order) => {
                //             const orderResponse = await fetch(`/patients/payment_intent/retrive/${order.order_id}/`, {
                //                 method: 'GET',
                //                 headers: {
                //                     'Authorization': `Token ${token}`
                //                 },
                //             });

                //             const orderData = await orderResponse.json();
                //             if (orderData){
                //                 setIsLoading(false);
                //             }
                //             return {
                //                 ...order,
                //                 additionalData: orderData,

                //             };
                           
                            
                //         })
                //     );

                //     setOrderHistory(updatedOrderHistory);
                //     console.log(updatedOrderHistory)
                // }
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            } 
        };

        fetchData();
    }, []);

    console.log(orderHistory,"hdhd")
    const getStatusColor = (payment_status) => {
        switch (payment_status.toLowerCase()) {
            case 'succeeded':
                return '#04D23E';
            case 'pending':
                return '#04D23E';
            case 'ordered': // Change to lowercase to match the actual value in your data
                return '#04D23E';
            case 'requires_payment_method': // Change to lowercase to match the actual value in your data
                return '#FF0000';
            default:
                return '';
        }
    };

    const orderDeatilsHandler = (id) => {
        const payment_Id = id;
        setIsLoading(true);
        setTimeout(() => {
            navigate(`/orderDetails/${payment_Id}`);
        }, 1000);
    };
    
    
    const reOrderHandler = (id) => {
        const payment_Id = id;
        // alert(id)
        setIsLoading(true)
        setTimeout(() => {
            navigate(`/orderDetails/${payment_Id}`);
        }, 1000)
    }



    return (
        <Helmet title="order-History">
            <div style={{ marginTop: "9%" }}>
                <AppHeader />
                {/* {isLoading ? <SpinLoader /> : <div> */}
                 <div>
                    <section>
                        <Container>
                            <PageHelmet pageTitle="Order History" />
                        </Container>

                        <div style={{ marginTop: "1%", marginBottom: "7%" }}>
                            <section>
                                <Container>
                                    <Row className='orderHistory__conatiner'>
                                        <Row>
                                            <Col xs="12" sm="12" lg="12">
                                                {orderHistory.length === 0 ? (<p className='order_info'>No Order history found.</p>
                                                ) : <Table className="table table-hover borderless responsive striped">
                                                    <thead>
                                                        <tr className='header__txt'>
                                                            <th>EQUIPMENT NAME</th>
                                                            <th>DATE</th>
                                                            <th>STATUS</th>
                                                            <th>ORDER</th>
                                                            <th>DETAILS</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className='body__txt'>
                                                        {orderHistory.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className='body__elemnts'>{item.equipment_name}</td>
                                                                <td className='body__elemnts'>{formatDate(item.order_date)}</td>
                                                                <td className='body__elemnts' style={{ color: getStatusColor(item.payment_status), fontWeight: 700 }}>
                                                                    {item.payment_status == "succeeded" ? "Success" : "Failed"}
                                                                </td>
                                                                <td><button className='re-order_btn' onClick={() => reOrderHandler(item.id)}>Re-Order</button></td>
                                                                <td><button className='deatils__btn' onClick={() => orderDeatilsHandler(item.id)}>Details <span><FaChevronRight /></span></button></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>}

                                            </Col>
                                        </Row>
                                    </Row>
                                </Container>
                            </section>
                        </div>
                    </section>
                </div>

            </div>
            <AppFooter />
        </Helmet>
    )
}

export default OrderHistory