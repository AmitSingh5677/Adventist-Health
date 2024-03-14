
import React from 'react';
import "./Notification.css"
import Helmet from '../../components/helmet/Helmet'
import AppHeader from '../../components/header/AppHeader'
import AppFooter from '../../components/footer/AppFooter'
import { Col, Container, Row } from 'reactstrap';
import notif_img from "../../data/assests/download_img/Avatar image.svg"
import { BsThreeDotsVertical } from 'react-icons/bs';

const Notification = () => {
    return (
        <Helmet title="Notification Screen">
            <AppHeader />
            <div style={{ marginTop: "10%" }}>
                <Container>
                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                        <h5>Notifications</h5>
                        <p className='read_txt'>Mark all as read <span className='close_icon'>X</span></p>
                    </div>
                </Container>

                <Container style={{ marginTop: "1%" }}>
                    <Row>
                        <Col xs={11} sm={11} lg={11}>
                            <h6 className='notif_all'>All<span className="cart__badge">0</span></h6>
                        </Col>
                    </Row>
                </Container>

                <Container style={{ position: "relative", top: "30px" }}>
                    <Row>
                        <Col xs={12} sm={12} lg={12}>
                            <Row>
                                <Col xs={0.5} sm={1} lg={1}>
                                    <img src={notif_img} alt='notification_img' className='noti__img ' />
                                </Col>
                                <Col xs={11.5} sm={11} lg={11}>
                                    <h5 className='userName__feedback '>New Feature Alert!</h5>
                                </Col>
                                <Col>
                                    <p className='noti__subtxt'>We’re pleased to introduce the latest enhancements in our templating experience.</p>
                                </Col>
                                <Col>
                                    <button className='noti__btn'>Mark as read</button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="justify-content-end">
                        <Col xs="auto" className='three__icon'>
                            <small className='noti__time'>15h</small>
                            <BsThreeDotsVertical />
                        </Col>
                    </Row>
                    <hr style={{ marginTop: "-10px" }} />
                </Container>

            </div>
            <AppFooter />
        </Helmet>
    )
}

export default Notification