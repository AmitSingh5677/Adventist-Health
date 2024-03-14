
import React, { useState } from 'react';
import "./PaymentHistory.css"
import AppFooter from '../../components/footer/AppFooter'
import AppHeader from '../../components/header/AppHeader';
import { Col, Container, Row, Table } from 'reactstrap'
import Helmet from '../../components/helmet/Helmet';
import { formatDate } from '../order_History/OrderHistory';
import SpinLoader from '../../components/spin-loader/SpinLoader';




const PaymentHistory = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [paymentHistory, setPaymentHistory] = useState([]);



    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const patientId = JSON.parse(sessionStorage.getItem("patientId"))
                const token = JSON.parse(sessionStorage.getItem("token"));
                const response = await fetch(`/patients/all_orders/${patientId}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json();
                if (data) {
                    setIsLoading(false)
                    setPaymentHistory(data);
                    // console.log("Get Order Deatils " + JSON.stringify(data));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // setIsLoading(false);
            }
        };

        fetchData();
    }, [])

    //color in Satus
    const getStatusColor = (payment_status) => {
        switch (payment_status) {
            case 'succeeded':
                return '#04D23E';
            case 'pending':
                return '#FA9217';
            case 'Ordered':
                return '#FB1515';
            case 'requires_payment_method': // Change to lowercase to match the actual value in your data
                return '#FF0000';
            default:
                return '';
        }
    };


    return (
        <Helmet title="payment-History">
            <div style={{ marginTop: "9%" }}>
                <AppHeader />
                {isLoading ? <SpinLoader /> : <div>
                    <section>
                        <Container>
                            <Row xs="12" sm="12" lg="12">
                                <div>
                                    <p className='page__title'>Payment History</p>
                                </div>
                            </Row>
                            {paymentHistory.length === 0 ? (<p className='order_info'>No Payment History Found.</p>
                            ) : <div style={{ marginTop: "1%", marginBottom: "7%" }}>
                                <section>
                                    <Container>
                                        <Row className='cards_conatiner'>
                                            <Row>
                                                <Col xs="12" sm="12" lg="12">
                                                    <Table className="table table-hover borderless responsive striped">
                                                        <thead>
                                                            <tr className='header__txt'>
                                                                <th>AMOUNT PAID</th>
                                                                <th>ORDERED EQUIPMENT</th>
                                                                <th>DATE</th>
                                                                <th>STATUS</th>
                                                                <th>order_id</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className='body__txt'>
                                                            {paymentHistory.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td className='body__elemnts'>${item.amount_paid}</td>
                                                                    <td className='body__elemnts'>{item.equipment_name}</td>
                                                                    <td className='body__elemnts'>{formatDate(item.order_date)}</td>
                                                                    <td className='body__elemnts' style={{ color: getStatusColor(item.payment_status) }}>
                                                                    {item.payment_status == "succeeded" ? "Success" : "Failed"}
                                                                    </td>
                                                                    <td className='body__elemnts'>{item.order_id}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                        </Row>
                                    </Container>
                                </section>
                            </div>}

                        </Container>
                    </section>
                </div>}

                <AppFooter />
            </div>
        </Helmet>
    );
}

export default PaymentHistory;
