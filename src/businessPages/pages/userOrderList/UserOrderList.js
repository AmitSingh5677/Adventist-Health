import React from "react";
import "./UserOrderList.css";
import AppHeader from "../../components/AppHeader/AppHeader";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import DashboardFooter from "../../components/DashboardFooter/DashboardFooter";
import AppFooter from "../../components/AppFooter/AppFooter";
import { Col, Container, Row, Table } from "reactstrap";
import { useState } from "react";

// const orderData = [
//   {
//     "patientName": "John Doe",
//     "equipmentDetails": "X-ray Machine",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Jane Smith",
//     "equipmentDetails": "MRI Scanner",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Robert Johnson",
//     "equipmentDetails": "Blood Pressure Monitor",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Emily Davis",
//     "equipmentDetails": "Ultrasound Machine",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Michael Brown",
//     "equipmentDetails": "ECG Machine",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Sophia Martinez",
//     "equipmentDetails": "Oxygen Concentrator",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Ethan Wilson",
//     "equipmentDetails": "Wheelchair",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Olivia Miller",
//     "equipmentDetails": "Surgical Instruments",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "William Moore",
//     "equipmentDetails": "Ventilator",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Ava Taylor",
//     "equipmentDetails": "Patient Monitor",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Liam Anderson",
//     "equipmentDetails": "Defibrillator",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Emma White",
//     "equipmentDetails": "Ambulance",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Noah Hall",
//     "equipmentDetails": "Syringe Pump",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Isabella Harris",
//     "equipmentDetails": "Hospital Bed",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "James Clark",
//     "equipmentDetails": "IV Infusion Pump",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Grace Turner",
//     "equipmentDetails": "Orthopedic Implants",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Mason Hayes",
//     "equipmentDetails": "Dialysis Machine",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Chloe Patterson",
//     "equipmentDetails": "Pulse Oximeter",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Logan Reed",
//     "equipmentDetails": "Nebulizer",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   },
//   {
//     "patientName": "Abigail Turner",
//     "equipmentDetails": "Lab Analyzer",
//     "orderDetails": "456 Oak Ave, Townsville, State, Zip",
//     "orderStatus": ""
//   }
// ]

// https://dmecart-38297.botics.co/business/dashboard/5/
const DashBoard = () => {
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const token = JSON.parse(sessionStorage.getItem("token"));

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
          setOrderData(data);
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
      default:
        return ""; // default color or none
    }
  };

  return (
    <>
      {token && (
        <div>
          <AppHeader />

          <section>
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
                              <th className="table_theader">User/patient</th>
                              <th className="table_theader">
                                Equipment DETAILS
                              </th>
                              <th className="table_theader">ORDER DETAILS</th>
                              <th className="table_theader">ORDER STATUS</th>
                            </tr>
                          </thead>
                          <tbody className="body__txt">
                            {orderData?.map((item, index) => (
                              <tr key={item.id}>
                                <td className="body__elemnts">
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
                                    value={item.orderStatus}
                                    style={{
                                      color: getOrderStatusColor(
                                        item.orderStatus
                                      ),
                                      fontWeight: "600",
                                      border: "none",
                                      outline: "none",
                                      backgroundColor:
                                        getBackgroundOrderStatusColor(
                                          item.orderStatus
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
                                  </select>
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
