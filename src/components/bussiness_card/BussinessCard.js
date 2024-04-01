import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { CardTitle, Card, CardBody, CardImg, CardText } from 'reactstrap';
import dummyImg from "../../data/assests/download_img/Sample Card - Light.png";
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/shippingCart/cartSlice';

const BussinessCard = ({ rating }) => {
    const [selectedRating, setSelectedRating] = useState();
    const [bussinessName, setBussinessName] = useState();
    const [totalRating, setTotalRating] = useState();
    const [averageRating, setAveragaeRating] = useState();
    const dipatch = useDispatch();
    const [userFeddback, setUserFeedBack] = useState([])

    const stars = Array.from({ length: 5 }, (_, index) => (
        <FaStar
            key={index}
            color={index < selectedRating ? '#219653' : 'grey'}
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

    return (
        <div>
            <div style={{ marginTop: "10%", marginBottom: "2%" }}>
                <Card style={{ display: 'flex', flexDirection: 'row', margin: '20px', margin: "0 auto", maxWidth: "95%" }}>
                    <CardImg top width="50%" src={dummyImg} alt="Product Image" style={{ width: '70%', objectFit: 'cover' }} />
                    <CardBody style={{ width: '50%', textAlign: "center" }}>
                        <CardTitle tag="h5" className='cardTxt'>{bussinessName}</CardTitle>
                        <CardText className='userRiews'>User Views</CardText>
                        <CardText>
                            <button className='rating__btn'>{averageRating} <FaStar color='#ffff' /></button>
                        </CardText>
                        <div className='rating__txt'>
                            {stars} <span style={{
                                fontSize: "20px", position: "relative", left: "13px", top: "-3px", color: "#687D94", fontWeight: 600
                            }}>{averageRating}/5</span>
                        </div>
                        <div>
                            <p className='total_reviews'>{totalRating < 9 ? "0" + totalRating : totalRating} user Reviews</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default BussinessCard