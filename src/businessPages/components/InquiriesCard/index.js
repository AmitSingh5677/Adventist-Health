import { RiDeleteBin6Line } from "react-icons/ri";
import avatar_logo from '../../../data/assests/avatar_logo.png';
import electric_chair from '../../../data/assests/download_img/electricChair1.png'
import React,{ useState } from "react";


const InquiriesCard = (props) => {

    const { inquiryData } = props

    const [userdata, setData] = useState([])
    const [message, setMessage] = useState('')

    React.useEffect(() => {
        setData(inquiryData[0])
    },[inquiryData])

    const sendMessage = () => {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const userid = parseInt(sessionStorage.getItem("userid"));
        console.log(userid, "userid")

        const fetchData = async () => {
            try {

                const response = await fetch(`https://dmecart-38297.botics.co/patients/inquiries/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                        'Authorization': `Token ${token}`
                    },
                    body: JSON.stringify({
                        "user_id": userid,
                        "patient_user_id": userdata.patient,
                        "product_id": userdata.product,
                        "message": message,
                        "inquiry_id": userdata.inquiry_id
                    })
                });

                const data = await response.json();
                if (data) {


                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }

    const deletInquiry = () => {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const userid = parseInt(sessionStorage.getItem("userid"));
        const fetchData = async () => {
            try {

                const response = await fetch(`https://dmecart-38297.botics.co/business/inquiries/${userid}/${userdata.inquiry_id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                const data = await response.json();
                if (data) {


                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }

    return <div className="m-2">




        {userdata ?<div className="d-flex flex-row justify-content-between" >
            <div>
                <div className="d-flex comp-name-sec">

                    <img src={userdata.business_avatar} alt=' logo' />
                    <h4 className="ms-2 mt-1">{userdata.business_name}</h4>
                </div>


                <div className="d-flex flex-row mt-2">
                    <div className="equipm-img-box">
                        <img src={userdata.product_avatar} alt='product' className="product-img" />
                    </div>
                    <div className="m-2 ms-5">
                        <h6 style={{ fontWeight: "bold" }}>{userdata.equipment_name}</h6>
                        <p>Wheel chair wheel chair wheel chair wheel chair</p>
                    </div>
                    <h6 className="ms-5" style={{ fontWeight: "bold" }}>{userdata.product_amount}</h6>

                </div>

                <div className="w-75 mt-2">
                    <p>Wheel chair wheel chair wheel chair description Lorem Ipsum door sit amwr consectur, nec mass ulrieces  Wheel chair wheel chair wheel chair description Lorem Ipsum door sit amwr consectur, nec mass ulrieces  Wheel chair wheel chair wheel chair description Lorem Ipsum door sit amwr consectur, nec mass ulrieces</p>
                    <div className="d-flex flex-column mt-3 mb-4">
                        <label htmlfor='message-input' style={{ fontWeight: "bold" }}>Add new message</label>
                        <textarea className="bg-dark-subtle p-1" rows={2} placeholder="Write your message here..." onClick={(e) => setMessage(e.target.value)}></textarea>
                        <button type="button" className="btn btn-success align-self-end m-1 p-5 pt-1 pb-1 mt-3" onClick={sendMessage}>Send</button>
                    </div>
                </div>

            </div>

            <RiDeleteBin6Line color="red" size={40} className="delete-btn" onClick={deletInquiry} />
        </div>:''}


        <hr />
    </div>
}

export default InquiriesCard