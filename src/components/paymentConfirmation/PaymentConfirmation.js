import React, { useState } from 'react';
import "./PaymentConfirmation.css"
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/shippingCart/cartSlice';

const PaymentConfirmation = ({ equipmentName, amount, currentdate }) => {
    const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
     console.log("Total Amount " + JSON.stringify(cartTotalAmount));
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // React.useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setCurrentDateTime(new Date());
    //     }, 1000);
    //     return () => clearInterval(intervalId);
    // }, []); 

    const formattedDateTime = currentDateTime.toLocaleString();

    const homepageHandler = () => {
        dispatch(cartActions.resetCart());
        setIsLoading(true)
        
            // window.location.reload();
            navigate("/homepage")
       

    }

    return (
        <div className="bg-dark vh-100 d-flex flex-row justify-content-center align-items-center">
            <div id="payment card" className="bg-light  d-flex flex-column align-items-center p-3 rounded">
                <IoIosCheckmarkCircle color={'green'} size={75} />
                <p className="Payment_Status">Congratulations</p>
                <p className='payment_subTxt'>You payment was successful, Kindly visit <span style={{ color: "#32A9FF" }} > Payment History</span> for more details. </p>
                <div className="d-flex flex-row justify-content-around align-self-stretch">
                    {/* <p className="equpiment_txt ">Equipment Name</p>
                    <p className='equpiment_subtxt'>{equipmentName || "wheelChair"}</p> */}
                </div>
                {/* <div className="d-flex flex-row justify-content-around align-self-stretch">
                    <p className="equpiment_txt" style={{ position: "relative", left: "-33px" }}>Amount</p>
                    <p className='equpiment_subtxt'>{cartTotalAmount}.00</p>
                </div> */}
                <div className="d-flex flex-row justify-content-around align-self-stretch">
                    <p className="equpiment_txt">Paid on</p>
                    <p className='equpiment_subtxt' style={{ position: "relative", left: "60px" }}>{formattedDateTime}</p>
                </div>
                <button className="done_btn" onClick={homepageHandler}>DONE</button>
            </div>
        </div >
    )
}

export default PaymentConfirmation