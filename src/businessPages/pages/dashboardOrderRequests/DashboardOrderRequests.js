import React, { useState,useEffect } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import DashboardFooter from "../../components/DashboardFooter/DashboardFooter";
import AppFooter from "../../components/AppFooter/AppFooter";
import "bootstrap";
import { Col, Container, Row, Table } from "reactstrap";
import Helmet from "../../components/helmet/Helmet";
import { useNavigate } from "react-router-dom";

// const userData = [
//   {
//     id: 1,
//     userName: "JOHN SMITH",
//     equipmentDetails: "FOLDABLE WHEEL CHAIR-LIGHTWEIGHT",
//     userAddress: "5th Avenuu,Cambridge Campus,California, USAm",
//   },
//   {
//     id: 2,
//     userName: "ALICE JONES",
//     equipmentDetails: "DIGITAL CAMERA-PROFESSIONAL",
//     userAddress: "12 Oak Street, Apt 3B, Brooklyn, New York, USA",
//   },
//   {
//     id: 3,
//     userName: "MICHAEL DAVIS",
//     equipmentDetails: "SMARTPHONE-FLAGSHIP MODEL",
//     userAddress: "21 Maple Avenue, Suite 205, San Francisco, California, USA",
//   },
//   {
//     id: 4,
//     userName: "DAVID MILLER",
//     equipmentDetails: "HEADPHONES-NOISE CANCELLING",
//     userAddress: "45 Chestnut Road, Apartment 7D, Seattle, Washington, USA",
//   },
//   {
//     id: 5,
//     userName: "CHRISTOPHER WILSON",
//     equipmentDetails: "TABLET-10 INCH DISPLAY",
//     userAddress: "55 Birch Avenue, Dallas, Texas, USA",
//   },
//   {
//     id: 6,
//     userName: "OLIVIA MARTIN",
//     equipmentDetails: "GAMING PC-HIGH-END",
//     userAddress: "18 Willow Lane, Chicago, Illinois, USA",
//   },
//   {
//     id: 7,
//     userName: "AIDEN ANDERSON",
//     equipmentDetails: "ELECTRIC SCOOTER-FOLDABLE",
//     userAddress: "27 Rose Street, Austin, Texas, USA",
//   },
//   {
//     id: 8,
//     userName: "AVA THOMAS",
//     equipmentDetails: "SMART WATCH-WATERPROOF",
//     userAddress: "14 Pine Grove, Orlando, Florida, USA",
//   },
//   {
//     id: 9,
//     userName: "MASON GARCIA",
//     equipmentDetails: "DRONE-HD CAMERA",
//     userAddress: "7 Cedar Avenue, Phoenix, Arizona, USA",
//   },
// ];

const DashboardOrderRequests = () => {
  const [userData,setUserData] = useState([])
  const navigate=useNavigate()

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
  const handleAccept = async (order_id) => {
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

  const handleReject = async (order_id) => {
    // console.log(order_id,"reject")
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
                                onClick={() => handleAccept(item.id)}
                              >
                                ACCEPT
                              </button>
                            </td>
                            <td>
                              {" "}
                              <button
                                className="btn btn-danger m-1 pl-4 pr-4"
                                style={{ fontFamily: "Poppins" }}
                                onClick={() => handleReject(item.id)}
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
        </div>
        <AppFooter />
      </div>
    </div> }
    </>
    
  );
};

export default DashboardOrderRequests;
