import React from "react";
import "./UserOrderList.css";
import AppHeader from "../../components/AppHeader/AppHeader";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import DashboardFooter from "../../components/DashboardFooter/DashboardFooter";
import AppFooter from "../../components/AppFooter/AppFooter";
import { Col, Container, Row, Table } from "reactstrap";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const DashBoard = () => {
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const token = JSON.parse(sessionStorage.getItem("token"));
  const navigate=useNavigate()
  const [orderData, setOrderData] = useState([]);
  React.useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const userid = JSON.parse(sessionStorage.getItem("userid"));
    console.log(token, userid, "token");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://dmecart-38297.botics.co/business/dashboard/${userid}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Token ${token}`,
            },
          }
        );

        const data = await response.json();
        if (data) {
          console.log(data, "data");
          const sortedData = [...data].sort((a, b) =>  b.id - a.id);
console.log(sortedData,"sortedData")
          setOrderData(sortedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOrderStatusChange = async (id, business_user, value) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const userId = JSON.parse(sessionStorage.getItem("userId"));
    // const updatedOrderData = [...orderData];
    // updatedOrderData[index].orderStatus = value;
    // Optionally, you can send the updatedOrderData to the server or handle it as needed
    // For now, just updating the local state
    // orderData[index].orderStatus = value;
    // setSelectedOrderStatus(value);
    try {
      const response = await fetch(
        "https://dmecart-38297.botics.co/business/order_delivery_status/",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            user_id: business_user,
            order_id: id,
            order_delivery_status: value,
          }),
        }
      );
      window.location.reload()
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "On the Way":
        return "#D90000";
      case "Accepted":
        return "#FA9217";
      case "Delivered":
        return "#026937";
      case "rejected":
          return "#D90000";  
      default:
        return ""; // default color or none
    }
  };
  const getBackgroundOrderStatusColor = (status) => {
    switch (status) {
      case "On the Way":
        return "#FFCACA";
      case "Accepted":
        return "#FFE7CA";
      case "Delivered":
        return "#CAFFD9";
      case "rejected":
        return "#FFCACA";    
      default:
        return ""; // default color or none
    }
  };

  return (
    <>
      {token && (
        <div>
          <AppHeader />

          <section className="order-section">
            <div style={{ marginTop: "7%", marginBottom: "5%" }}>
              <DashboardNavbar btn_name={"all_orders"} />
              <section>
                <Container>
                  <Row className="orderHistory__conatiner">
                    <Row>
                      <Col xs="12" sm="12" lg="12">
                        <Table className="table table-hover borderless responsive striped">
                          <thead>
                            <tr>
                              <th className="table_theader">CONSUMER</th>
                              <th className="table_theader">
                                EQUIPMENT DETAILS
                              </th>
                              <th className="table_theader">ORDER DETAILS</th>
                              <th className="table_theader">ORDER STATUS</th>
                            </tr>
                          </thead>
                          <tbody className="body__txt">
                            {orderData?.map((item, index) => (
                              <tr key={item.id}>
                                <td className="body__elemnts cursor" onClick={()=>navigate(`/b/patient-profile-screen/${item.patient_user}`)}>
                                  {item.patient_name}
                                </td>
                                <td className="body__elemnts">
                                  {item.equipment_name}
                                </td>
                                <td className="body__elemnts">
                                  {item.street_address}, {item.city},{" "}
                                  {item.state}, {item.country}, {item.zip_code}
                                </td>
                                <td className="body__elemnts">
                                 <select
                                    value={item.delivery_status}
                                    style={{
                                      color: getOrderStatusColor(
                                        item.delivery_status
                                      ),
                                      fontWeight: "600",
                                      border: "none",
                                      outline: "none",
                                      backgroundColor:
                                        getBackgroundOrderStatusColor(
                                          item.delivery_status
                                        ),
                                    }}
                                    onChange={(e) =>
                                      handleOrderStatusChange(
                                        item.id,
                                        item.business_user,
                                        e.target.value
                                      )
                                    }

                                     disabled={item.business_order_action === 'rejected'}
                                  >
                                   {item.business_order_action != 'rejected'? <><option value="">Select Status</option>
                                   
                                    <option value="On the Way">
                                      On the Way
                                    </option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Delivered">Delivered</option>
                                    </>:
                                    <option  value="rejected" style={{color:'rgb(217, 0, 0) !important'}}>Rejected</option>
                                   }
                                  </select>
                                  
                                </td>
                                {/* <td className="body__elemnts">
                                  {item.delivery_status !== "pending" ? <div className="me-5 text-center" style={{
                                      color: getOrderStatusColor(
                                        item.delivery_status
                                      ),
                                      fontWeight: "600",
                                      border: "none",
                                      outline: "none",
                                      backgroundColor:
                                        getBackgroundOrderStatusColor(
                                          item.delivery_status
                                        ),
                                        textTransform:"uppercase"
                                    }}><p>{item.delivery_status}</p></div> : <select
                                    value={item.delivery_status}
                                    style={{
                                      color: getOrderStatusColor(
                                        item.delivery_status
                                      ),
                                      fontWeight: "600",
                                      border: "none",
                                      outline: "none",
                                      backgroundColor:
                                        getBackgroundOrderStatusColor(
                                          item.delivery_status
                                        ),
                                    }}
                                    onChange={(e) =>
                                      handleOrderStatusChange(
                                        item.id,
                                        item.business_user,
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="">Select Status</option>
                                    <option value="On the Way">
                                      On the Way
                                    </option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Delivered">Delivered</option>
                                  </select>}
                                  
                                </td> */}
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </Row>
                </Container>
              </section>
              <DashboardFooter />
            </div>
          </section>
          <AppFooter />
        </div>
      )}
    </>
  );
};

export default DashBoard;
