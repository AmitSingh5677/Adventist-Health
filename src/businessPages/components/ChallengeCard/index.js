import { RiDeleteBin6Line } from "react-icons/ri";
import './index.css'
import logo from '../../../data/assests/download_img/Inquries_logo(4).svg'
import { StarRating } from "../../../pages/ratingsScreen/RatingScreen";
import { useState } from "react";
import {  Row,Col } from 'reactstrap'
import SucessMessage from '../../components/sucessToast/SucessToast';
import ToastMessage from './../../../components/toast/ToastMessage';

const ChallengeCard = (props) => {
    const { ratingData } = props
    const [Rating, setRating] = useState('');
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState("");
    const [isSuccess, setIsSuccess] = useState("")
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [sucessToast, setSucessToast] = useState(false)
    const [showSuccessTost, setshowSuccessTost] = useState(false);

    
    const sendMessage = (id) => {

        const token = JSON.parse(sessionStorage.getItem("token"));
        const userid = parseInt(sessionStorage.getItem("userid"));

        if (!Rating) {
            setShowErrorToast(true);
            setIsError("Please enter message.")
           
        }
       
        const fetchData = async () => {
            try {
                // Replace the following with your logic for creating payment intent on the server
                const response = await fetch("https://dmecart-38297.botics.co/business/challenge_rating/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    },
                    body: JSON.stringify({
                        business_rating: id,
                        message: Rating,
                        user: userid
                    }
                    ),
                });

                const data = await response.json();
                if (data) {
                    setshowSuccessTost(true);
                    setSucessToast(true)
                    setIsSuccess("Your feedback has been successfully recorded.")
                }

            } catch (error) {
                setShowErrorToast(true);
                console.error('Error confirming payment:', error);
               // setMessage("An unexpected error occurred.");
                setIsError("An unexpected error occurred.")
            }
        }
        fetchData();

    }

    return <> 
    {ratingData.map((item) => (
        
    <div className="mt-3">
       <div className=" w-100" >
       <Row lg="10">
            <Col lg="10">
                <div className="business-logo-container">

                    <img src={item.patient_avatar} alt=' logo' />
                    <h4 className="m-1 ms-2">{item.patient_name}</h4>
                </div>
                <div className="mt-3">
                    <StarRating rating={item.stars} />
                </div>
                <div className="w-100 mt-2 ms-2">
                    <p>{item.message}</p>
                    <div className="d-flex flex-column mt-3">
                        <label htmlfor='message-input' style={{ fontWeight: 'bold' }}>Add new Message</label>
                        <textarea className="bg-dark-subtle text_area p-1" rows={2} placeholder="Write your message here..." onChange={(e) => setRating(e.target.value)}></textarea>
                        {/* {message && <div>{message}</div>} */}
                        <button type="button" className="btn btn-success mt-3 align-self-end m-1 p-5 pt-1 pb-1" onClick={() => sendMessage(item.id)}>Send</button>
                    </div>
                </div>

            </Col>
           
            </Row>
        </div>
        {showErrorToast ? <ToastMessage show={showErrorToast} message={isError} onClose={() => setShowErrorToast(false)} /> : null}
        {showSuccessTost ? <SucessMessage show={sucessToast} message={isSuccess} onClose={() => setSucessToast(false)} />:''}

        <hr />
    </div>
    
    ))}
    </>
}

export default ChallengeCard