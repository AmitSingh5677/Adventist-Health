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
    setOrders(resData);
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
        return "#D90000";
      case "Accepted":
        return "#FB1515";
      case "Delivered":
        return "#04D23E";
      case "pending":
        return "#FA9217";
      default:
        return ""; // default color or none
    }
  };

  return (
    <>
    {token && <div>
      <div style={{ display: "block" }}>
        <AppHeader />
      </div>

      <div className="order-history-section">
        <div className="title-order-history">
          <h6 className="ps-3 pt-3 pb-1">ORDER HISTORY</h6>
        </div>
        <table className=" table-margin">
          <thead className="table-header">
            <tr>
              <th className="w-2 py-3 ps-2">EQUIPMENT NAME</th>
              <th className="w-5">DATE</th>
              <th className="w-5">PAYMENT DETAILS</th>
              <th className="w-5">ORDER DETAILS</th>
              <th className="w-5">STATUS</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((item) => {
              return (
                <tr className="border-bottom border-body-secondary ">
                  <td className="py-2">{item.equipment_name}</td>
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

      <div>{/* <DashboardFooter /> */}</div>
      <AppFooter />
    </div>}
    </>
    
  );
};

export default OrderHistoryBusiness;
