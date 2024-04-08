import React, { useState } from 'react';
import "./PaymentConfirmation.css"
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/shippingCart/cartSlice';
import mixpanel from '../../mixpanel'
import OneSignal from 'react-onesignal';
const PaymentConfirmation = ({ equipmentName, currentdate }) => {
    const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
    console.log("Total Amount " + JSON.stringify(cartTotalAmount));
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const amount = localStorage.getItem("amount");
    const order_id = localStorage.getItem("order_id");

    React.useEffect(() => {
        // const order_id = JSON.parse(sessionStorage.getItem("order_id"));
        const token = JSON.parse(sessionStorage.getItem("token"));
        const fetchData = async () => {
            try {
                const response1 = await fetch(`https://dmecart-38297.botics.co/patients/payment_intent/retrive/${order_id}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'Application/json',
                        'Authorization': `Token ${token}`
                    },
                });
                
                const data = await response1.json();
                if(data.payment_status === 'succeeded'){
                    OneSignal.Notifications.addEventListener('notificationDisplay', (event) => {
                        console.log("The notification was clicked!", event);
                      });
                      
                    mixpanel.track("Payment Successful", {
                        amount: amount,
                        order_id: order_id
                      })
                      mixpanel.track("Purchase Completed by vendor", {
                        amount: amount,
                        order_id:order_id
                      })
                }else{
                    mixpanel.track("Payment Cancelled", {
                        amount: amount,
                        order_id: order_id
                      })
                }
                console.log(data, "data1")
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
        // const intervalId = setInterval(() => {
        //     setCurrentDateTime(new Date());
        // }, 1000);
        // return () => clearInterval(intervalId);
    }, []);

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
                <IoIosCheckmarkCircle color={'#7AC24F'} size={75} />
                <p className="Payment_Status">Congratulations</p>
                <p className='payment_subTxt'>Your payment was successful,Kindly visit <span style={{ color: "#32A9FF" }} > Payment History</span> for more details. </p>
                <div className="d-flex flex-row justify-content-around align-self-stretch">
                    {/* <p className="equpiment_txt ">Equipment Name</p>
                    <p className='equpiment_subtxt'>{equipmentName || "wheelChair"}</p> */}
                </div>
                {/* <div className="d-flex flex-row justify-content-around align-self-stretch">
                    <p className="equpiment_txt" style={{ position: "relative", left: "-33px" }}>Amount</p>
                    <p className='equpiment_subtxt'>{cartTotalAmount}.00</p>
                </div> */}
                <div className="d-flex flex-row justify-content-around align-self-stretch">
                    <p className="equpiment_txt">Amount Paid</p>
                    <p className='equpiment_subtxt' style={{ position: "relative", left: "60px" }}>${amount}</p>
                </div>
                <div className="d-flex flex-row justify-content-around align-self-stretch">
                    <p className="equpiment_txt ps-5">Order id</p>
                    <p className='equpiment_subtxt' style={{ position: "relative", left: "60px" }}>{order_id}</p>
                </div>
                <div className="d-flex flex-row justify-content-around align-self-stretch">
                    <p className="equpiment_txt ms-3">Paid on</p>
                    <p className='equpiment_subtxt' style={{ position: "relative", left: "60px" }}>{formattedDateTime}</p>
                </div>
                <button className="done_btn" style={{backgroundColor:"#7AC24F"}} onClick={homepageHandler}>DONE</button>
            </div>
        </div >
    )
}

export default PaymentConfirmation