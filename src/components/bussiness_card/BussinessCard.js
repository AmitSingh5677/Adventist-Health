import React, { useState } from 'react'
import { CardTitle, Card, CardBody, CardImg, CardText,Container } from 'reactstrap';
import dummyImg from "../../data/assests/download_img/Sample Card - Light.png";
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/shippingCart/cartSlice';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

export const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    const stars = [];
    const maxStars = 5;

    for (let i = 0; i < maxStars; i++) {
        if (i < fullStars) {
            stars.push(<FaStar key={i} style={{ color: 'rgba(122, 194, 79, 1)' }} />);
        } else if (hasHalfStar && i === fullStars) {
            stars.push(<FaStarHalfAlt key={i} style={{ color: 'rgba(122, 194, 79, 1)' }} />);
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
const BussinessCard = ({ rating }) => {
    const [selectedRating, setSelectedRating] = useState();
    const [bussinessName, setBussinessName] = useState();
    const [totalRating, setTotalRating] = useState();
    const [averageRating, setAveragaeRating] = useState();
    const dipatch = useDispatch();
    const [userFeddback, setUserFeedBack] = useState([])
    const [businessimg, setBusinessimg] = React.useState();

    const stars = Array.from({ length: 5 }, (_, index) => (
        <FaStar
            key={index}
            color={index < selectedRating ? 'rgba(122, 194, 79, 1)' : 'grey'}
            // onClick={() => handleRatingClick(index + 1)}
            style={{ cursor: 'pointer' }}
        />
    ));
    // const generateAvatar = () => {
    //     if (avatarUrl) {
    //         // User has an avatar, use it
    //         return <img src={avatarUrl} alt="User Avatar" />;
    //     } else {
    //         // User doesn't have an avatar, generate one from the email
    //         const initials = userEmail ? userEmail.charAt(0).toUpperCase() : "";
    //         return <div className="avatar">{initials}</div>;
    //     }
    // };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const business_id = JSON.parse(sessionStorage.getItem("businessId"))
                const response = await fetch(`/patients/average-rating/${business_id}/`, {
                    method: 'GET',
                    headers: {
                        // 'Authorization': `Token ${token}`
                    },
                });

                const data = await response.json();
                if (data) {
                    // console.log("data " + JSON.stringify(data));
                    sessionStorage.setItem("userReviews", JSON.stringify(data.ratings));
                    setUserFeedBack(data.ratings)
                    setBussinessName(data.business_name)
                    setAveragaeRating(data.average_rating.toFixed(1))
                    setSelectedRating(data.average_rating)
                    setTotalRating(data.total_ratings);

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [totalRating]);

    React.useEffect(() => {
        dipatch(cartActions.SetAllRatings(userFeddback))
    }, [userFeddback])
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
                console.log(data, "image")
                if (data) {
                    setBusinessimg(data.avatar_signed_url)
                } else {
                }
            } catch (error) {

            }
        };


        fetchData();

    }, []);
    return (
        <div>
            <div style={{ marginTop: "10%", marginBottom: "2%" }}>
            <Container  style={{ display: 'flex', flexDirection: 'row',justifyContent:'center',  maxWidth: "95%",margin:"20px 0px" }}>
                <Card style={{ width: '54%' }}>
                    {/* <CardImg  src={dummyImg} alt="Product Image" style={{ width: '70%', objectFit: 'cover' }} /> */}
                    {/* <CardBody className='d-flex justify-content-center'> */}
                        <img src={businessimg} alt="Product Image" className='image_buisness'/>
                    {/* </CardBody> */}
                </Card>
                <Card style={{ width: '35%', textAlign: "center" }} className='ms-3'>
                    {/* <CardImg top width="50%" src={dummyImg} alt="Product Image" style={{ width: '70%', objectFit: 'cover' }} /> */}
                    <CardBody >
                        <CardTitle tag="h5" className='cardTxt'>{bussinessName}</CardTitle>
                        <CardText className='userRiews'>User Views</CardText>
                        <CardText>
                            <button className='rating__btn'>{averageRating} <FaStar color='#ffff' /></button>
                        </CardText>
                        <div className='rating__txt'>
                        <StarRating  rating={averageRating} />
                            <span style={{
                                fontSize: "20px", position: "relative", left: "13px", top: "-3px", color: "#687D94", fontWeight: 600
                            }}>{averageRating}/5</span>
                        </div>
                        <div>
                            <p className='total_reviews'>{totalRating < 9 ? "0" + totalRating : totalRating} user Reviews</p>
                        </div>
                    </CardBody>
                </Card>
                </Container>
            </div>
        </div>
    )
}

export default BussinessCard