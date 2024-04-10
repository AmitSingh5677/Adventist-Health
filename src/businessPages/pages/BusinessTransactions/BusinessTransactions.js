import React, { useState, useEffect } from "react";
import "./BusinessTransaction.css";
import { Table } from "reactstrap";
import AppHeader from "../../components/AppHeader/AppHeader";
import AppFooter from "../../components/AppFooter/AppFooter";
const BusinessTransactions = () => {
    const [data, setData] = useState();
  const [updatedData, setUpdatedData] = useState();
  const [time, setTime] = useState("All_time");
  const [businessName, setBusinessName] = useState();
  const [businessLocation, setBusinessLocation] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [businessData, setBusinessData] = useState();
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState();

  const id = sessionStorage.getItem("userid")
  const token = JSON.parse(sessionStorage.getItem("token"))
  
  const fetchData = async () => {

    const response = await fetch(
      `https://dmecart-38297.botics.co/business/business_analytics/${id}/`,
      {
        method: "GET",
        headers: {
          // "Content-Type": "Application/json",
          Authorization: ` Token ${token}`,
        },
      }
    );
    const resData = await response.json();
    setData(resData);
    // setUpdatedData(data)
  };
  const BusinessData = async () => {
    const response = await fetch(
      "https://dmecart-38297.botics.co/business/business_names_list/"
    );
    const resData = await response.json();
    setBusinessData(resData);
  };

  useEffect(() => {
    fetchData();
    BusinessData();
  }, []);

  const fetchRecentBusiness = async () => {
    const response = await fetch(
        `https://dmecart-38297.botics.co/business/business_analytics/${id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Token ${token}`,
        },
        body: JSON.stringify({
          filter_by: time,
        }),
      }
    );
    const resData = await response.json();
    setUpdatedData(resData);
  };
  // console.log(time,"time")
  useEffect(() => {
    fetchRecentBusiness();
  }, [time]);

  const formValidation = ()=>{
    const validationError = {}
    if(!startDate){
      validationError.startDate = "Please provide start date"
    }
    if(!endDate){
      validationError.endDate = "Please provide end date"
    }
    return validationError
  }  

  const fetchTransactions = async (e) => {
    e.preventDefault()
    const validationFormError = formValidation()
    if (Object.keys(validationFormError).length > 0) {
      // There are validation errors, display them to the user
      setError(validationFormError);
      return;
    }
    if(startDate && endDate){
      setError({})
      const response = await fetch(
        `https://dmecart-38297.botics.co/business/business_analytics/${id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Token ${token}`,
        },
        body: JSON.stringify({
            start_date: startDate, 
            end_date: endDate,
        }),
      }
    );
      const resData = await response.json();
      setOrderData(resData);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };
  const formatTime = (dateString) => {
    const dateTime = new Date(dateString);
    const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');
//   const seconds = String(dateTime.getSeconds()).padStart(2, '0');

//   const formattedTime = `${hours}:${minutes}:${seconds}`;
  const formattedTime = `${hours}:${minutes}`;

    return formattedTime;
  };


  return (
     <div>
      <AppHeader />
      <div className="analytics-section">
        <div className="d-flex tile-section">
          <div className="analytics-tile">
            <p><b>Total Revenue</b></p>
            <h3>${data?.total_transaction_amount}</h3>
          </div>
          <div className="analytics-tile">
            <p><b>Total Transaction Count</b></p>
            <h3>{data?.transaction_count}</h3>
          </div>
        </div>
        <div className="d-flex box-tile-section mt-5">
          <div className="box-tile-1">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <h5><b>Recent Transactions</b></h5>
              <span>
                Filter by:{" "}
                <select onChange={(e) => setTime(e.target.value)}>
                  <option value="All_time">All Time</option>
                  <option value="1 week">1 Week</option>
                  <option value="30 days">30 Days</option>
                  <option value="1 year">1 Year</option>
                </select>
              </span>
            </div>
            <div className="mt-2">
              <Table className="table table-hover borderless responsive striped">
                <thead
                  className="table-header-analytics"
                  style={{ backgroundColor: "#E3E3E3" }}
                >
                  <tr>
                    <th style={{fontSize:"12px"}} className=" py-2">Patient Name</th>
                    <th style={{fontSize:"12px"}} className="table_theader">Product Name</th>
                    <th style={{fontSize:"12px"}} className="table_theader">Order Date & Time</th>
                    <th style={{fontSize:"12px"}} className="table_theader">Transaction Amount</th>
                  </tr>
                </thead>
                {/* <tbody className="body__txt"> */}
              {!updatedData ? <tbody className="body__txt"> {data?.transaction_details?.map((item, index) => (
                    <tr key={index}>
                      <td className="body__elemnts">{item.patient_name}</td>
                      <td className="body__elemnts">
                        {item.product_name}
                      </td>
                      <td className="body__elemnts">
                      {formatDate(item.order_date)},
                      {formatTime(item.order_date)} 
                      </td>
                      <td className="body__elemnts">
                        ${item.amount_paid}
                      </td>
                    </tr>
                  ))} </tbody> : <tbody className="body__txt"> {updatedData?.filter_by?.order_details?.map((item, index) => (
                    <tr key={index}>
                      <td className="body__elemnts">{item.patient_name}</td>
                      <td className="body__elemnts">
                        {item.product_name}
                      </td>
                      <td className="body__elemnts">
                      {formatDate(item.order_date)}, {" "}
                      {formatTime(item.order_date)} 
                      </td>
                      <td className="body__elemnts">
                        ${item.amount_paid}
                      </td>
                    </tr>
                  ))} </tbody>}    
                  
                {/* </tbody> */}
              </Table>
            </div>
          </div>
          <div className="box-tile-2">
          
            <div
              className="d-flex "
              style={{ justifyContent: "space-between" }}
            >
              <div
                className="d-flex filter-bar"
                style={{ justifyContent: "space-between" }}
              >
                <span>Start date: </span>
                <div>
                  <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} style={{ width: "110px" }} required />
                </div>
              </div>
              <div
                className="d-flex filter-bar"
                style={{ justifyContent: "space-between" }}
                >
                <span>End date: </span>
                <div>
                  <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} style={{ width: "110px" }} required />
                </div>
              </div>
              <span>
                <button className="mt-1 submit-btn-date" onClick={fetchTransactions}>Submit</button>
              </span>
            </div>
                {error?.startDate && <span style={{color:"red"}}>{error.startDate}</span>}
                {error?.endDate && <span  style={{color:"red",marginLeft:"80px"}} >{error.endDate}</span>}
            <div className="mt-2">
              <Table className="table table-hover borderless responsive striped">
                <thead
                  className="table-header-analytics"
                  style={{ backgroundColor: "#E3E3E3" }}
                >
                  <tr>
                    <th style={{fontSize:"12px"}} className=" py-2">Patient Name</th>
                    <th style={{fontSize:"12px"}} className="table_theader">Product Name</th>
                    <th style={{fontSize:"12px"}} className="table_theader">Order Date & Time</th>
                    <th style={{fontSize:"12px"}} className="table_theader">Transaction Amount</th>
                  </tr>
                </thead>
                <tbody className="body__txt">
                  {orderData && orderData?.date_filter?.order_details?.map((item, index) => (
                              <tr key={index}>
                              <td style={{fontSize:"12px"}} className="body__elemnts">{item.patient_name}</td>
                              <td style={{fontSize:"12px"}} className="body__elemnts">
                                {item.product_name}
                              </td>
                              <td style={{fontSize:"12px"}} className="body__elemnts">
                              {formatDate(item.order_date)}, {" "}
                      {formatTime(item.order_date)} 
                              </td>
                              <td style={{fontSize:"12px"}} className="body__elemnts">
                                ${item.amount_paid}
                              </td>
                            </tr>
                            ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className="ms-4 mt-3">
            <div className="d-flex revenue-detail">
            <h6>Total revenue :</h6>
            {!updatedData ? <h6>${data?.total_transaction_amount}</h6> : <h6>${updatedData?.filter_by?.transaction_amount}</h6> }
            {/* <h6>${data?.total_transaction_amount}</h6> */}
            </div>
            <div className="d-flex revenue-detail">
            <h6>Transaction count :</h6>
            {!updatedData ? <h6>{data?.transaction_count}</h6> : <h6>{updatedData?.filter_by?.transaction_count}</h6> }
            {/* <h6>{data?.transaction_count}</h6> */}
            </div>
        </div>
      </div>

      <AppFooter />
    </div>
  )
}

export default BusinessTransactions
