import React from "react";
import "./ProductCard.css";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { FaCartArrowDown } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/shippingCart/cartSlice";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { UncontrolledTooltip } from 'reactstrap';


const ProductCard = (props) => {
    const { id, description, equipment_name, product_signed_url, price } = props.item;
    console.log("userId " + id);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // console.log("equpiment_Name ", equipment_name);
    const [tooltipOpen, setTooltipOpen] = React.useState(false);

    const toggleTooltip = () => {
        setTooltipOpen(!tooltipOpen);
    };
    const handleTooltipClick = () => {
        // Navigate to "/specificInquiry" when the tooltip message is clicked
        navigate(`/specificInquiry/${id}`);
    };

    const addToCart = () => {
        console.log("Payload:", JSON.stringify({ id, equipment_name, product_signed_url, price }));
        dispatch(
            cartActions.addItem({
                id,
                equipment_name,
                product_signed_url,
                price,
            })
        );
    };

    const paymentRoute = () => {
        navigate("/PaymentPage")
    }


    return (
        <div className="product__item">
            <div className="product__img">
                <img src={product_signed_url} alt="product-img" className="w-50" />
                <span
                    id="ScheduleUpdateTooltip"
                    onClick={toggleTooltip}
                    className="tooltip_id"
                >
                    <BsThreeDotsVertical />
                </span>
                <UncontrolledTooltip
                    placement="bottom"
                    target="ScheduleUpdateTooltip"
                    isOpen={tooltipOpen}
                    toggle={toggleTooltip}
                    onClick={handleTooltipClick}
                    autohide={false}
                    style={{ cursor: "pointer", fontFamily: "Poppins" }}
                >
                    Send Inquiry
                </UncontrolledTooltip>
            </div>

            <div className="product__content">
                <h6 >
                    {/* <Link to={`/foods/${id}`}>{title}</Link> */}{equipment_name}
                </h6>
                <p className="product_dec">{description}</p>
                <hr></hr>
                <div className=" d-flex align-items-center justify-content-evenly mt-1" >
                    <span className="product__price">${price}</span>
                    <button className="addToBuy__btn" onClick={paymentRoute} >
                        <span style={{ fontSize: "20px" }}><RiArrowRightDoubleFill /></span >   Buy Now
                    </button>
                </div>
                <hr></hr>
                <div>
                    <button className="addToCart_Btn" onClick={addToCart}>
                        <FaCartArrowDown />  Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
