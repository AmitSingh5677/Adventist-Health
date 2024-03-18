
import React, { useState } from 'react';
import "./SendFeedBack.css"
import Helmet from '../../components/helmet/Helmet'
import AppHeader from '../../components/header/AppHeader'
import AppFooter from '../../components/footer/AppFooter'
import { Col, FormGroup, Input, Label } from 'reactstrap'
import ToastMessage from '../../components/toast/ToastMessage';
import SucessMessage from '../../components/successToast/SuccessToast';
import { useNavigate } from 'react-router-dom';

const SendFeedBack = () => {
    const [userReason, setUserReason] = useState()
    const [userDes, setUserDes] = useState();
    const [isError, setError] = useState("");
    const [isSucess, setIsSucess] = useState("");
    const [showTost, setShowTost] = useState(false);
    const [sucessToast, setSucessTaost] = useState(false);
    const navaigate = useNavigate()

    const reportHandler = async () => {

        try {
            if (!userReason) {
                setShowTost(true);
                setError("Please ensure to include the appropriate subject before submitting.");
                return;
            };
            if (!userDes) {
                setShowTost(true);
                setError("Please add message before submitting.");
                return;
            };

            const token = JSON.parse(sessionStorage.getItem("token"));
            const response = await fetch('/patients/feedback/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: userReason,
                    message: userDes,
                }),
            });

            if (response.ok) {
                setSucessTaost(true)
                setIsSucess("Thanks for sharing FeedBack.")
                setUserDes("")
            } else {
                setShowTost(true)
                setError("Please Try After SomeTime")
                setUserDes("")

            }
        } catch (error) {
            console.error('An error occurred during login:', error.message);
        }
    };

   

    return (
        <Helmet title="Send Feedback">
            <AppHeader />
            {showTost ? <ToastMessage show={showTost} message={isError} onClose={() => setShowTost(false)} /> : <SucessMessage show={sucessToast} message={isSucess} onClose={() => setSucessTaost(false)} />}
            <div style={{ maxWidth: "90%", margin: "0 auto", position: "relative", top: "150px" }}>
                <Col md={4}>
                    <FormGroup>
                        <Label for="exampleAddress2" className='card__input'>
                            Subject
                        </Label>
                        <Input
                            className="form-control shadow-none"
                            id="exampleAddress2"
                            name="address2"
                            placeholder="Enter subject"
                            style={{ height: "45px" }}
                            onChange={(e) => setUserReason(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <FormGroup>
                    <Col md={6} lg={6}>
                        <Label for="exampleAddress2" className='card__input'>
                            Message
                        </Label>
                        <Input className="form-control shadow-none" id="exampleText" placeholder='Add your message...'
                            name="textarea" style={{ height: "95px", marginBottom: "15px" }} onChange={(e) => setUserDes(e.target.value)} />
                    </Col>
                </FormGroup>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <button className='feedBack__btn ' onClick={() => { navaigate("/homepage") }}>
                        Back
                    </button>
                    <button className='feedBack__submitBtn' onClick={reportHandler}>
                        Submit
                    </button>
                </div>
            </div>
            <AppFooter />
        </Helmet >
    )
}

export default SendFeedBack