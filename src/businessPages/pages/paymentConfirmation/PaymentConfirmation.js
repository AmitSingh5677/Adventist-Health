import React from 'react';
import "./PaymentConfirmation.css"
import { IoIosCheckmarkCircle } from "react-icons/io";

const PaymentConfirmationBusiness = () => {

    return <div className="bg-dark vh-100 d-flex flex-row justify-content-center align-items-center">
        <div id="payment card" className="bg-light  d-flex flex-column align-items-center p-3 rounded">
            <IoIosCheckmarkCircle color={'green'} size={75} />
            <p className="Payment_Status">Congratulations</p>
            <p className='payment_subTxt'>You payment was successful, Kindly visit <span style={{ color: "#32A9FF" }} > Order History</span> for more details. </p>
            <div className="d-flex flex-row justify-content-around align-self-stretch">
                <p className="equpiment_txt ">Equipment Name</p>
                <p className='equpiment_subtxt'>Fold-able wheelchair</p>
            </div>
            <div className="d-flex flex-row justify-content-around align-self-stretch">
                <p className="equpiment_txt">Amount</p>
                <p className='equpiment_subtxt'>$ 1200.00</p>
            </div>
            <div className="d-flex flex-row justify-content-around align-self-stretch">
                <p className="equpiment_txt">Paid on</p>
                <p className='equpiment_subtxt'>02/14/2024</p>
            </div>
            <button className="done_btn" >DONE</button>
        </div>
    </div >
}

export default PaymentConfirmationBusiness