
import React, { useEffect, useState } from 'react';
import "./Notification.css"
import Helmet from '../../components/helmet/Helmet'
import AppHeader from '../../components/header/AppHeader'
import AppFooter from '../../components/footer/AppFooter'
import { Col, Container, Row, Popover, PopoverBody } from 'reactstrap';
import notif_img from "../../data/assests/download_img/Avatar image.svg"
import { BsThreeDotsVertical } from 'react-icons/bs';
import SucessMessage from '../../components/successToast/SuccessToast';
import SpinLoader from '../../components/spin-loader/SpinLoader';

const Notification = () => {
    const [isSuccess, setIsSucess] = useState(false);
    const [sucessMsg, setSucessMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [notificationList, setNotificationList] = useState([])
    const [popoverOpen, setPopoverOpen] = useState({});
    const [count, setcount] = useState(0)

    React.useEffect(() => {
        setPopoverOpen({});
        const token = JSON.parse(sessionStorage.getItem("token"));

        const patient_id = JSON.parse(sessionStorage.getItem("patientId"))

        console.log(patient_id, "patient_id")
        setIsLoading(true)
        const fetchData = async () => {
            try {

                const response = await fetch(`https://dmecart-38297.botics.co/patients/notification_list/${patient_id}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'Application/json',
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json();
                if (data) {
                    setIsLoading(false)
                    console.log(typeof (data), "notification")
                    // setOrderData(data)
                    setNotificationList(data)
                    const countdata=data.filter((item)=> item.mark_as_read === false).map((item)=>item.mark_as_read)
                    console.log(countdata.length,"countdata")
                    setcount(countdata.length)

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);


   
    const togglePopover = (index) => {
        setPopoverOpen(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };
    const markasRead = async (id) => {
        setPopoverOpen({});
        try {
            const patient_id = JSON.parse(sessionStorage.getItem("patientId"))

            const token = JSON.parse(sessionStorage.getItem("token"));
            const response = await fetch(`https://dmecart-38297.botics.co/patients/notification_markasread/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    "user_id": patient_id,
                    "notification_id": id
                })

            });

            if (response) {
                setIsSucess(true);
                setSucessMsg("Notification marked as read successfully");

                const fetchData1 = async () => {
                    try {

                        const response = await fetch(`https://dmecart-38297.botics.co/patients/notification_list/${patient_id}/`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'Application/json',
                                'Authorization': `Token ${token}`
                            },
                        });

                        const data = await response.json();
                        if (data) {
                            console.log(typeof (data), "notification")
                            // setOrderData(data)
                            setNotificationList(data)

                        }
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                };

                fetchData1();
            } else {
                console.error('Delete failed. Please check your credentials.');
            }
        }
        catch (error) {
            console.error('Error deleting inquiry:', error);
        }
    }


    const markasAllRead = async () => {
        const filterid = notificationList.filter((item) => item.mark_as_read === false).map((item) => item.id)
        console.log(filterid, "filterid")
        try {

            const patient_id = JSON.parse(sessionStorage.getItem("patientId"))

            const token = JSON.parse(sessionStorage.getItem("token"));
            const response = await fetch(`https://dmecart-38297.botics.co/patients/notification_all_markasread/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    "user_id": patient_id,
                    "notification_ids": filterid
                })

            });

            if (response) {
                setIsSucess(true);
                setSucessMsg("Notifications marked as read successfully");

                const fetchData1 = async () => {
                    try {

                        const response = await fetch(`https://dmecart-38297.botics.co/patients/notification_list/${patient_id}/`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'Application/json',
                                'Authorization': `Token ${token}`
                            },
                        });

                        const data = await response.json();
                        if (data) {
                            console.log(typeof (data), "notification")
                            // setOrderData(data)
                            setNotificationList(data)

                        }
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                };

                fetchData1();
            } else {
                console.error('Delete failed. Please check your credentials.');
            }
        }
        catch (error) {
            console.error('Error deleting inquiry:', error);
        }
    }


    return (
        <Helmet title="Notification Screen">
            {isSuccess ? <SucessMessage show={isSuccess} message={sucessMsg} onClose={() => setIsSucess(false)} /> : null}

            <AppHeader />
            {isLoading ? (
                <SpinLoader />
            ) : (
                <div style={{ marginTop: "10%" }}>
                    <Container>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                            <h5>Notifications</h5>
                            <p className='read_txt cursor' onClick={markasAllRead}>Mark all as read <span className='close_icon'>X</span></p>
                        </div>
                    </Container>

                    <Container style={{ marginTop: "1%" }} className='allContainer'>
                        <Row >
                            <Col xs={11} sm={11} lg={11} className='notif_all' >
                                <h6 >All<span className="badge ms-1">{count}</span></h6>
                            </Col>
                        </Row>
                    </Container>
                    {notificationList.length > 0 ? <>
                        {notificationList?.map((item,index) => {
                            const date = new Date(item.created_at);
                            const hours = date.getHours();
                            return (
                                <Container style={{ position: "relative", top: "30px" }}>

                                    <Row>
                                        <Col xs={12} sm={12} lg={12}>
                                            <Row>
                                                <Col xs={0.5} sm={1} lg={1}>
                                                    <img src={item.product_avatar} alt='notification_img' className='noti__img ' />
                                                </Col>
                                                <Col xs={11.5} sm={11} lg={11}>
                                                    <h5 className='userName__feedback '>{item.notification_type}</h5>
                                                </Col>
                                                <Col>
                                                    <p className='noti__subtxt'>{item.message}</p>
                                                </Col>
                                                <Col>
                                                    {!item.mark_as_read &&
                                                        <button className='noti__btn' style={{ backgroundColor: "#7AC24F" }} onClick={() => markasRead(item.id)}>Mark as read</button>
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-end" >
                                        <Col xs="auto" className='three__icon'>
                                            <small className='noti__time'>{hours}{"h"}</small>
                                            <span key={index}>
                                            <BsThreeDotsVertical id={`popover-${index}`} onClick={() => togglePopover(index)}/>

                                            <Popover
                                                placement="bottom"
                                                isOpen={popoverOpen[index] || false}
                                                target={`popover-${index}`}
                                                toggle={() => togglePopover(index)}
                                            >
                                                <PopoverBody>
                                                <li className="list-group-item cursor" onClick={() => markasRead(item.id)}>Menu Item 1</li>
                                                </PopoverBody>

                                            </Popover>
                                            </span>
                                        </Col>
                                    </Row>
                                    <hr style={{ marginTop: "-10px" }} />
                                </Container>)
                        })}</> : null}

                </div>
            )}
            <AppFooter />
        </Helmet>
    )
}

export default Notification