import React, { useState,useEffect } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import DashboardFooter from "../../components/DashboardFooter/DashboardFooter";
import AppFooter from "../../components/AppFooter/AppFooter";
import "bootstrap";
import { Col, Container, Row, Table ,Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import Helmet from "../../components/helmet/Helmet";
import { useNavigate } from "react-router-dom";

const DashboardOrderRequests = () => {
  const [userData,setUserData] = useState([])
  const navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [rejectpopup, setRejectpopup] = useState(false);
  const [order_id, setorderId] = useState(false);

  
  const userid = sessionStorage.getItem("userid");
  const token = JSON.parse(sessionStorage.getItem("token"));

  React.useEffect(() => {
    console.log(token,userid,"token")
    const fetchData = async () => {
        try {
          
            const response = await fetch(`https://dmecart-38297.botics.co/business/dashboard/${userid}/`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'Application/json',
                  'Authorization': `Token ${token}`
                },
            });
  
            const data = await response.json();
            if (data) {
              console.log(data,"data")
              setUserData(data)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
  
    fetchData();
  
  }, []);

  const handleAccept1 =(orderid)=>{ 
    setorderId('')
    setorderId(orderid)
    setIsOpen(true)
  }

  const handleReject1=(orderid)=>{
    setorderId('')
    setorderId(orderid)
    setRejectpopup(true)
  }
  const handleAccept = async () => {
    setIsOpen(false)
    // console.log(order_id,"accept")
    const response = await fetch(
      " https://dmecart-38297.botics.co/business/order_action/",
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          user_id: userid,
          order_id: order_id,
          business_order_action: "accepted",
        }),
      }
    );
  };

  const handleReject = async () => {
    // console.log(order_id,"reject")
    setRejectpopup(false)
    const response = await fetch(
      " https://dmecart-38297.botics.co/business/order_action/",
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          user_id: userid,
          order_id: order_id,
          business_order_action: "rejected",
        }),
      }
    );
  };

  return (
    <>
    {token && <div>
      <Helmet title="order-requests" />
      <div style={{ marginBottom: "8%", marginTop: "7%" }}>
        <AppHeader />
        <DashboardNavbar btn_name={"order_requests"} />

        <div style={{ marginTop: "1%", marginBottom: "2%",overflowY:"auto",maxHeight:"150vh" }}>
          <section>
            <Container>
              <Row className="orderHistory__conatiner">
                <Row>
                  <Col xs="12" sm="12" lg="12">
                    <Table className="table table-hover borderless responsive striped">
                      <thead>
                        <tr>
                          <th className="table_theader">USER/PATIENT</th>
                          <th className="table_theader">EQUIPMENT DETAILS</th>
                          <th className="table_theader">ORDER DETAILS</th>
                          <th className="table_theader ps-5">ACTIONS</th>
                          <th className="table_theader"></th>
                        </tr>
                      </thead>
                      <tbody className="body__txt">
                        {userData.map((item, index) => (
                          <tr key={item.id}>
                            <td className="body__elemnts cursor" onClick={()=>navigate(`/b/patient-profile-screen/${item.patient_user}`)}>{item.patient_name}</td>
                            <td className="body__elemnts">
                              {item.equipment_name}
                            </td>
                            <td className="body__elemnts">
                            {item.street_address}, {item.city}, {item.state}, {item.country}, {item.zip_code}
                            </td>
                            <td>
                              <button
                                className="btn btn-success m-1 pl-4 pr-4"
                                style={{ fontFamily: "Poppins" }}
                                onClick={() => handleAccept1(item.id)}
                              >
                                ACCEPT
                              </button>
                            </td>
                            <td>
                              {" "}
                              <button
                                className="btn btn-danger m-1 pl-4 pr-4"
                                style={{ fontFamily: "Poppins" }}
                                onClick={() => handleReject1(item.id)}
                              >
                                REJECT
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Row>
            </Container>
          </section>
        <DashboardFooter  />
        <Modal isOpen={isOpen} centered keyboard={false} backdrop="static" backdropClassName="modal-backdrop-dark" >
                <ModalHeader toggle={() => setIsOpen(false)} className='model_header' >
                    <span style={{ fontSize: "16px" }}>Confirmation Popup</span>
                </ModalHeader>
                <ModalBody className='modal__txt'>
                    Are you sure you want to perform the choosen action?
                </ModalBody>
                <ModalFooter style={{ borderTop: 'none' }} className='modal__footer'>
                    <button className='cancel__btn' onClick={()=>setIsOpen(false)}>No</button>
                    <Button className='yes__btn' onClick={handleAccept}>Yes</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={rejectpopup} centered keyboard={false} backdrop="static" backdropClassName="modal-backdrop-dark" >
                <ModalHeader toggle={() => setRejectpopup(false)} className='model_header' >
                    <span style={{ fontSize: "16px" }}>Confirmation Popup</span>
                </ModalHeader>
                <ModalBody className='modal__txt'>
                    Are you sure you want to perform the choosen action?
                </ModalBody>
                <ModalFooter style={{ borderTop: 'none' }} className='modal__footer'>
                    <button className='cancel__btn' onClick={()=>setRejectpopup(false)}>No</button>
                    <Button className='yes__btn' onClick={handleReject}>Yes</Button>
                </ModalFooter>
            </Modal>

        </div>
        <AppFooter />
      </div>
    </div> }
    </>
    
  );
};

export default DashboardOrderRequests;
