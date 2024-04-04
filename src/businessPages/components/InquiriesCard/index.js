import { RiDeleteBin6Line } from "react-icons/ri";
import avatar_logo from '../../../data/assests/avatar_logo.png';
import electric_chair from '../../../data/assests/download_img/electricChair1.png'
import React, { useState } from "react";
import profileImage from '../../../data/assests/profImage.jpg'

import SucessToast from './../../components/sucessToast/SucessToast';
import { useNavigate } from "react-router-dom";
import {  Col,Row, ModalHeader,Modal,
    ModalBody,
    ModalFooter, Button} from 'reactstrap';
const InquiriesCard = (props) => {
    const [showSucessToast, setShowSucessToast] = useState(false);
    const [sucessMessage, setSucessMessage] = useState("");
    const [messageData, setmessageData] = useState([]);
    const[inventoy,setInventoy]=useState([]);
    const navigate=useNavigate()

    const { inquiryData } = props

    const [userdata, setData] = useState([])
    const [message, setMessage] = useState('')

    React.useEffect(() => {
        setData(inquiryData)
    }, [inquiryData])
    const [id,setId]=useState('')
    const sendMessage = (patient, product, inquiry_id) => {
        setId('')
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
                        "patient_user_id": patient,
                        "product_id": product,
                        "message": message,
                        "inquiry_id": inquiry_id
                    })
                });

                const data = await response.json();
                if (data) {
                    setShowSucessToast(true);
                    setSucessMessage("Your feedback has been successfully recorded.")

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }
    const [isDelete, setIsDelete] = useState(false);
    const [inquiryid, setinquiryid] = useState(false);

    const deletInquiry = () => {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const userid = parseInt(sessionStorage.getItem("userid"));
        const fetchData = async () => {
            try {

                const response = await fetch(`https://dmecart-38297.botics.co/business/inquiries/${userid}/${inquiryid}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                const data = await response.json();
                if (data) {
                    setinquiryid('');
                    setShowSucessToast(true);
                    setIsDelete(false)
                    setSucessMessage("Inquiry deleted successfully.") 
                   
                    const fetchData1 = async () => {
                        try {
                          
                            const response = await fetch(`https://dmecart-38297.botics.co/business/inquiries/${userid}/`, {
                                method: 'GET',
                                headers: {
                                  'Content-Type': 'Application/json',
                                  'Authorization': `Token ${token}`
                                },
                            });
                  
                            const data = await response.json();
                            if (data) {
                             setData(data)
                  
                            }
                        } catch (error) {
                            console.error('Error fetching data:', error);
                        }
                    };
                  
                    fetchData1();
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }

    const deletInquiryPopup=(inquiry_id)=>{
        setinquiryid(inquiry_id)
        setIsDelete(true)
    }
    const loadMore = async (inquiryid) => {
        console.log(inquiryid, "id")
        try {

            const userid = parseInt(sessionStorage.getItem("userid"));

            const token = JSON.parse(sessionStorage.getItem("token"));

            
            const response = await fetch(`https://dmecart-38297.botics.co/business/inquiries/${userid}/${inquiryid}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Token ${token}`
                }
            });

            const data = await response.json();

            if (data) {
                setmessageData(data)
                // console.log(data, "data")

            } else {
                // Handle error if needed
                console.log('Error sending message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle error if needed
        }
    };
    React.useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const userid =  parseInt(sessionStorage.getItem("userid"));
        console.log(userid,"userid")
      
        const fetchData = async () => {
            try {
              
                const response = await fetch(`https://dmecart-38297.botics.co/business/inventory/${userid}/`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'Application/json',
                      'Authorization': `Token ${token}`
                    },
                });
      
                const data = await response.json();
                if (data) {
                  console.log(data,"data")
                 // setOrderData(data)
                 setInventoy(data)
      
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
      
        fetchData();
      
      }, []);
     
      const ontextChange =(id,value)=>{
        setId(id)
        setMessage(value)
      }
    // http://localhost:3000/business/inventory/183/
    return <div className="m-2">
        {showSucessToast ? (
            <SucessToast
                show={showSucessToast}
                onClose={() => setShowSucessToast(false)}
                message={sucessMessage}
            />
        ) : null}



        {userdata.map((item) => (<div  >
           <Row>
            <Col md={10}>
            <div>
                <div className="d-flex comp-name-sec">

                    <img src={item.patient_avatar ? item.patient_avatar : profileImage}  className="profImage" alt=' logo' />
                    <h4 className="ms-2 mt-1">{item.patient_name}</h4>
                </div>


                <div className="d-flex flex-row mt-2">
                    <div className="equipm-img-box">
                        <img src={item.product_avatar} onClick={()=>navigate('/b/my-inventory')} alt='product' className="product-img cursor" />
                    </div>
                    <div className="m-2 ms-5">
                        <h6 style={{ fontWeight: "bold" }}>{item.equipment_name}</h6>
                        {inventoy?.map((iteminventory)=>(
                            item.product === iteminventory.id &&
                        <p>{iteminventory.description}</p>
                        ))}
                    </div>
                    <h6 className="ms-5" style={{ fontWeight: "bold" }}>{item.product_amount}</h6>

                </div>

                <div className="w-75 mt-2">
                   <p>{item.message}</p>
                    <p onClick={() => loadMore(item.inquiry_id)} className="loadMore cursor">Load more</p>
                    {messageData?.map((msg)=>(
                        msg.inquiry_id ===item.inquiry_id &&
                        <p>{msg.message}</p>
                    ))}
                    <div className="d-flex flex-column mt-3 mb-4">
                        <label htmlfor='message-input' style={{ fontWeight: "bold" }}>Add new message</label>
                        <textarea className="bg-dark-subtle p-1" rows={2} placeholder="Write your message here..."
                         onChange={(e) => ontextChange(item.id,e.target.value)} ></textarea>
                        <button type="button" className="btn btn-success align-self-end m-1 p-5 pt-1 pb-1 mt-3"
                        disabled={item.id != id}
                        onClick={() => sendMessage(item.patient, item.product, item.inquiry_id)}>Send</button>
                    </div>
                </div>

            </div>
            </Col>
            <Col md={2}>
            <RiDeleteBin6Line color="red" size={40} className="delete-btn" onClick={()=>deletInquiryPopup(item.inquiry_id)} /></Col>
            </Row>
        </div>))}


        <hr />

        <Modal
        isOpen={isDelete}
        centered
        keyboard={false}
        backdrop="static"
        backdropClassName="modal-backdrop-dark"
      >
        <ModalHeader toggle={() => setIsDelete(false)} className="model_header">
          <span style={{ fontSize: "16px" }}>Delete Account</span>
        </ModalHeader>
        <ModalBody className="modal__txt">
          Are you sure you want to delete your inquiry?
        </ModalBody>
        <ModalFooter style={{ borderTop: "none" }} className="modal__footer">
          <button className="cancel__btn" onClick={() => setIsDelete(false)}>
            No
          </button>
          <Button className="yes__btn" onClick={deletInquiry}>Yes</Button>
        </ModalFooter>
      </Modal>
    </div>
}

export default InquiriesCard