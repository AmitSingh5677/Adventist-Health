import React, { useState, useEffect } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import DashboardFooter from "../../components/DashboardFooter/DashboardFooter";
import AppFooter from "../../components/AppFooter/AppFooter";
import "./index.css";

const OrderHistoryBusiness = () => {
  const [orders, setOrders] = useState([]);

  const token = JSON.parse(sessionStorage.getItem("token"));
  // need to work on this
  const id = JSON.parse(sessionStorage.getItem("userid"));

  const fetch_order_history = async () => {
    const response = await fetch(
      `https://dmecart-38297.botics.co/business/dashboard/${id}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    const resData = await response.json();
    console.log("resData",resData)
    const sortdata= resData.sort((a,b)=> b.id - a.id)
    setOrders(sortdata);
  };
  console.log(orders, "hello");

  useEffect(() => {
    fetch_order_history();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "On the Way":
        return "#7AC24F";
      case "Accepted":
        return "#04D23E";
      case "accepted":
        return "#04D23E";
      case "Delivered":
        return "#04D23E";
      case "pending":
        return "#FA9217";
      case "rejected":
        return "#FB1515";  
      default:
        return ""; // default color or none
    }
  };

  return (
    <>
    {token && <div className="order-history-page">
      <div style={{ display: "block" }}>
        <AppHeader />
      </div>

      <div className="order-history-section">
        <div className="title-order-history">
          <h6 className="ps-3 pt-3 pb-1 my-profile-bar-text">ORDER HISTORY</h6>
        </div>
        <table className=" table-margin mb-5">
          <thead >
            <tr className="table-header">
              <th className="w-2 py-3 ps-2" style={{backgroundColor:"#F4F4F4"}}><b>EQUIPMENT NAME</b></th>
              <th className="w-2 py-3 ps-2" style={{backgroundColor:"#F4F4F4"}}><b>USER</b></th>
              <th className="w-5" style={{backgroundColor:"#F4F4F4"}}><b>DATE</b></th>
              <th className="w-5" style={{backgroundColor:"#F4F4F4"}}><b>PAYMENT DETAILS</b></th>
              <th className="w-5" style={{backgroundColor:"#F4F4F4"}}><b>SHIPPING ADDRESS</b></th>
              <th className="w-5" style={{backgroundColor:"#F4F4F4"}}><b>STATUS</b></th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((item) => {
              return (
                <tr className="border-bottom border-body-secondary ">
                  <td className="py-2">{item.equipment_name}</td>
                  <td className="py-2">{item.patient_name}</td>
                  <td>{formatDate(item.order_date)}</td>
                  <td className="text-wrap">
                    {" "}
                    AMOUNT PAID: ${item.amount_paid}, PAID VIA:{" "}
                    <span style={{ textTransform: "uppercase" }}>
                      {item.payment_type}
                    </span>{" "}
                  </td>
                  <td>
                  {item.street_address}, {item.city}, {item.state},{" "}
                    {item.country}, {item.zip_code}
                  </td>
                  <td
                    // className="text-success"
                    style={{
                      color: getOrderStatusColor(item.delivery_status),
                      textTransform:"uppercase",
                    }}
                  >
                    {item.delivery_status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mb-5">{/* <DashboardFooter /> */}</div>
      <AppFooter className="mt-5"/>
    </div>}
    </>
    
  );
};

export default OrderHistoryBusiness;
