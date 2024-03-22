import React, { useState } from 'react';
import "./UserFeedBack.css"
import { Card, CardImg, CardBody, CardTitle, CardText, Row, FormGroup, Label, Input, Container, Col } from 'reactstrap';
import { FaStar } from 'react-icons/fa';
import Helmet from '../../components/helmet/Helmet';
import AppHeader from '../../components/header/AppHeader';
import AppFooter from '../../components/footer/AppFooter';
import BussinessCard from '../../components/bussiness_card/BussinessCard';
import SucessMessage from '../../components/successToast/SuccessToast';
import ToastMessage from "../../components/toast/ToastMessage"
import { useNavigate } from 'react-router-dom';
import SpinLoader from '../../components/spin-loader/SpinLoader';

const UserFeedback = ({ imgSrc, productTitle, userViews, rating }) => {
    const [selectedRating, setSelectedRating] = useState(0);
    const [ratingMessage, setRatingMessage] = useState('');
    const [isError, setIsError] = useState("");
    const [isSuccess, setIsSuccess] = useState("")
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navaigate = useNavigate();
    const [sucessToast, setSucessToast] = useState(false)

    const handleRatingClick = (selectedRating) => {
        setSelectedRating(selectedRating);
    };

    const changeRatingMessage = (e) => {
        setRatingMessage(e.target.value);
    }

    const saveRating = async () => {
        try {

            if (!selectedRating) {
                setShowErrorToast(true);
                setIsError("Kindly assign a rating prior to submission for your valuable feedback.");
                return;
            };

            const trimmedUserDesc = ratingMessage.trim();
            if (!(trimmedUserDesc.length >= 6)) {
                setShowErrorToast(true);
                setIsError("Kindly provide a thorough review with at least 6 meaningful characteristics.");
                return;
            }


            // const dynamicId = 2;
            const patient_Id = JSON.parse(sessionStorage.getItem("patientId"))
            const token = JSON.parse(sessionStorage.getItem("token"));
            const business_id = JSON.parse(sessionStorage.getItem("bussiness_id"))
            const response = await fetch(`/patients/ratings/${patient_Id}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "business": business_id,
                    "stars": selectedRating,
                    "message": ratingMessage,
                }),
            });

            const data = await response.json();
            if (data) {
                setSucessToast(true)
                setIsSuccess("Your feedback has been successfully recorded.")
            }
        } catch (error) {
            setShowErrorToast(true)
            setIsError("Please try again later. Thank you for your patience.")
        }
    }

    const stars = Array.from({ length: 5 }, (_, index) => (
        <FaStar
            key={index}
            color={index < selectedRating ? '#219653' : 'grey'}
            onClick={() => handleRatingClick(index + 1)}
            style={{ cursor: 'pointer' }}
        />
    ));

    const userRatingHandler = () => {
        setIsLoading(true);
        setTimeout(() => {
            navaigate("/homepage")
        }, 2000)
    }


    return (
        <Helmet title="RateScreen">
            <AppHeader />
            {isLoading ? <SpinLoader /> : <div>  <div style={{ marginTop: "10%", marginBottom: "2%" }}>
                <BussinessCard />
            </div>

                <div style={{ maxWidth: "95%", margin: "0 auto" }}>
                    <h5>Rate this Business</h5>
                    <div style={{ fontSize: "50px", marginBottom: "20px", marginTop: "-20px" }}>
                        {stars}
                    </div>
                    <div>
                        <Row>
                            <FormGroup>
                                <Col md={11}>
                                    <Label for="exampleAddress2" className='card__input'>
                                        Write a Review
                                    </Label>
                                    <Input
                                        style={{ height: '120px', fontFamily: "Poppins" }}
                                        className="form-control shadow-none"
                                        id="exampleText"
                                        name="text"
                                        type="textarea"
                                        placeholder='How is the product? What do you like? What do you hate?'
                                        value={ratingMessage}
                                        onChange={changeRatingMessage}
                                    />
                                </Col>
                            </FormGroup>
                        </Row>
                    </div>
                </div>
                <div className='btn-container'>

                        <button className='nxt__btn' style={{ marginBottom: "7%" }} onClick={saveRating}>Save</button>
                </div>
                        {/* <button className='all_Reviews' style={{ marginBottom: "7%" }} onClick={userRatingHandler}>Back</button> */}
                    </div>}
            {showErrorToast ? <ToastMessage show={showErrorToast} message={isError} onClose={() => setShowErrorToast(false)} /> : <SucessMessage show={sucessToast} message={isSuccess} onClose={() => setSucessToast(false)} />}


            <AppFooter />
        </Helmet>
    );
};

export default UserFeedback;
