
import React from "react";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';


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
