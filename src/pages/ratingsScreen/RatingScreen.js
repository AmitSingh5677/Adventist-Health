import React, { useState } from 'react';
import "./RatingScreen.css"
import Helmet from '../../components/helmet/Helmet';
import AppHeader from '../../components/header/AppHeader';
import AppFooter from '../../components/footer/AppFooter';
import { Col, Container, Row, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup } from 'reactstrap';
import BussinessCard from '../../components/bussiness_card/BussinessCard';
import { BiSortDown } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpinLoader from '../../components/spin-loader/SpinLoader';
import UserProfile from '../../utility/useravthar/UserAvathar';
import mixpanel from "../../mixpanel";
export const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    const stars = [];
    const maxStars = 5;

    for (let i = 0; i < maxStars; i++) {
        if (i < fullStars) {
            stars.push(<FaStar key={i} style={{ color: '#E4A70A' }} />);
        } else if (hasHalfStar && i === fullStars) {
            stars.push(<FaStarHalfAlt key={i} style={{ color: '#E4A70A' }} />);
        } else {
            stars.push(<FaStar key={i} style={{ color: '#DDDDDD' }} />);
        }
    }

    return (
        <div className='userName__feedback ' style={{ top: "-10px", fontSize: "20px" }}>
            {stars.map((star, index) => (
                <span key={index}>{star}</span>
            ))}
        </div>
    );
};

const calculateDaysAgo = (created_at) => {
    const currentDate = new Date();
    const createdAtDate = new Date(created_at);
    const timeDifference = currentDate - createdAtDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const hours = createdAtDate.getHours();
    const minutes = createdAtDate.getMinutes();

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return `${daysDifference} days ago at ${formattedTime}`;
};

// ... (existing code)

const RatingScreen = () => {
    const rating = useSelector((state) => state.cart.allRatings);
     console.log("useData" + JSON.stringify(rating));
    const [userData, setUserData] = useState([]);
    const naviagte = useNavigate();
    const [isLoading, setisLoading] = useState(true)
    const [isRating, setIsRating] = useState(false)
    const business_id = JSON.parse(sessionStorage.getItem("bussiness_id"))

    React.useEffect(() => {

        const uniqueUserNumbers = Array.from(new Set(rating.map(item => item.user)));

        const fetchData = async () => {
            try {
                const token = JSON.parse(sessionStorage.getItem("token"))
                const promises = uniqueUserNumbers.map(userNumber => {
                    const url = `/patients/patients_details/${userNumber}/`;
                    const headers = {
                        Authorization: `Token ${token}`,
                    };

                    return fetch(url, { headers })
                        .then(response => response.json())
                        .then(userData => ({ userNumber, userData }));
                });

                const userResponses = await Promise.all(promises);
                console.log(userResponses,"userResponses")
                if (userResponses) {
                    setUserData(userResponses);
                    setisLoading(false)
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [rating]);

    const getUserDataForRating = (userId) => {
        const user = userData.find(item => item.userNumber === userId);
        return user ? user.userData : null;
    };
    const [sortby, setsortby] = useState('')
    const [filter_by_stars, setFilter] = useState('')
    const filterData = () => {
        setsortby('')
        setFilter('')
        setIsRating(true)
    }

   
    const handleFilterChange = (e) => {
        setsortby(e.target.value)
    }

    const handleRatingChange = (e) => {
        setFilter(e.target.value)
    }
    console.log(rating,"rating")
    console.log(typeof(rating))
    
    const applyFilter = () => {

        const token = JSON.parse(sessionStorage.getItem("token"));

        const fetchData = async () => {
            try {

                if(filter_by_stars){
                    // mixpanel.track("Filters Applied", {
                    //     rating: filter_by_stars,
                    //   })

                      const response = await fetch(`https://dmecart-38297.botics.co/patients/average-rating/${business_id}/?filter_by_stars= ${filter_by_stars}&sort_by=${sortby}`, {
                        method: 'GET',
                        headers: {
                            //   'Content-Type': 'Application/json',
                            'Authorization': `Token ${token}`
                        }
                    });

                    const data = await response.json();
               
                    if (data) {
                       
                        const data1=data.ratings
                        data1?.map((item1)=>{
                           
                            rating?.filter((item)=> item.user === item1.user)
                             //userData?.filter((item)=> item.userNumber === item1.user)
                        })
                       
                        // setUserData(data.ratings)
                        setIsRating(false)
                    }
                }else{

                    const response = await fetch(`https://dmecart-38297.botics.co/patients/average-rating/${business_id}/?sort_by=${sortby}`, {
                        method: 'GET',
                        headers: {
                            //   'Content-Type': 'Application/json',
                            'Authorization': `Token ${token}`
                        }
                    });

                    const data = await response.json();
               
                    if (data) {
                        // setUserData(data.ratings)
                        setIsRating(false)
                    }
                }

               

               
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        // https://dmecart-38297.botics.co/patients/average-rating/5/
    }
console.log(rating,"rating")
    return (
        <Helmet title="Ratings Screen">
            <AppHeader />
            <div style={{ marginBottom: "3%" }}>
                <Container>
                    <Row xs="12" sm="12" lg="12" >
                        <BussinessCard />
                    </Row>
                </Container>
                <div style={{ marginTop: "2%", maxWidth: "80%", margin: "0 auto" }}>
                    {isLoading ? <SpinLoader /> : (<>
                        <Container>
                            <Row>
                                <Col xs={11} sm={11} lg={11}>
                                    <h6 style={{ fontSize: "25px" }}>Ratings & Reviews</h6>
                                </Col>
                                <Col xs={1} sm={1} lg={1} className="ml-auto">
                                    <span style={{ cursor: 'pointer' }}><BiSortDown onClick={filterData} /></span>
                                </Col>
                            </Row>
                        </Container>
                        {userData.map((user, index) => (
                            <Row key={index}>
                                <Col xs={12} sm={12} lg={12}>
                                    {rating.length === 0 ? "No Ratings are Found for this Business" : (
                                        rating.map((userRating, ratingIndex) => (
                                            userRating.user === user.userNumber && (
                                                <div key={ratingIndex} style={{ marginTop: "20px" }}>
                                                    <Row>
                                                        <Col xs={0.5} sm={1} lg={1}>
                                                            <div style={{ position: "relative", top: "-10px" }}>
                                                                <UserProfile
                                                                    userName={getUserDataForRating(userRating.user)?.full_name}
                                                                    avatarUrl={getUserDataForRating(userRating.user)?.avatar_signed_url}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs={11.5} sm={11} lg={11}>
                                                            <h5 className='userName__feedback '>{getUserDataForRating(userRating.user)?.full_name}</h5>
                                                            <StarRating rating={userRating.stars} />
                                                            <p className='user__time'>{calculateDaysAgo(userRating.created_at)}</p>
                                                        </Col>
                                                        <Col>
                                                            <p className='user__feedback__p'>{userRating.message}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="justify-content-end">
                                                        <Col xs="auto" className='three__icon'>
                                                            <BsThreeDotsVertical />
                                                        </Col>
                                                    </Row>
                                                    <hr style={{ marginTop: "-10px" }} />
                                                </div>
                                            )
                                        ))
                                    )}
                                </Col>
                            </Row>
                        ))}
                    </>)}

                    <Container>

                    </Container>
                </div>
                <div className='navigate-rate-btn'>
                    <button className='nxt__btn' style={{ marginBottom: "7%" }} onClick={() => naviagte("/feedBack")}>Rate Business</button>

                </div>


            </div>
            <AppFooter />
            <Modal isOpen={isRating} centered keyboard={false} backdrop="static" backdropClassName="modal-backdrop-dark" >
                <ModalHeader toggle={() => setIsRating(false)} className='model_header' >
                    <span style={{ fontSize: "16px" }}>Filter</span>
                </ModalHeader>
                <ModalBody className='modal__txt'>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail" className='label_form start'>Sort By</Label>
                                <select
                                    className={`form-control`}
                                    id="exampleGender"
                                    name="sort_by"
                                    value={sortby}
                                    onChange={handleFilterChange}
                                    style={{ fontFamily: "Poppins" }}
                                >
                                    <option value=""  style={{ fontFamily: "Poppins" }}>Sort By</option>
                                    <option value="oldest" style={{ fontFamily: "Poppins" }}>Oldest</option>
                                    <option value="newest" style={{ fontFamily: "Poppins" }}>Newest</option>
                                </select>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail" className='label_form '>Rating</Label>
                                <select
                                    className={`form-control`}
                                    id="exampleGender"
                                    name="sort_by"
                                    value={filter_by_stars}
                                    onChange={handleRatingChange}
                                    style={{ fontFamily: "Poppins" }}
                                >
                                    <option value=""  style={{ fontFamily: "Poppins" }}>All</option>
                                    <option value="1" style={{ fontFamily: "Poppins" }}>1</option>
                                    <option value="2" style={{ fontFamily: "Poppins" }}>2</option>
                                    <option value="3" style={{ fontFamily: "Poppins" }}>3</option>
                                    <option value="4" style={{ fontFamily: "Poppins" }}>4</option>
                                    <option value="5" style={{ fontFamily: "Poppins" }}>5</option>
                                </select>
                            </FormGroup>
                        </Col></Row>
                </ModalBody>
                <ModalFooter style={{ borderTop: 'none' }} className='modal__footer'>
                    <button className='cancel__btn' onClick={() => setIsRating(false)}>Cancel</button>
                    <Button className='yes__btn' onClick={applyFilter} >Apply</Button>
                </ModalFooter>
            </Modal>
        </Helmet>
    );
};

export default RatingScreen;


