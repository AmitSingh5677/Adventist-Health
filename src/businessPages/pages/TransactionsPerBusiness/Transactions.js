import React, { useState, useEffect } from "react";
import "./Transactions.css";
import { Table } from "reactstrap";
import AppHeader from "../../components/AppHeader/AppHeader";
import AppFooter from "../../components/AppFooter/AppFooter";
// import DatePicker from "react-datepicker";

const TransactionsBusiness = () => {
  // const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState();
  const [updatedData, setUpdatedData] = useState();
  const [time, setTime] = useState("All_time");
  const [businessName, setBusinessName] = useState();
  const [businessLocation, setBusinessLocation] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [businessData, setBusinessData] = useState();
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState();
  const [table, setTable] = useState(false);

  const fetchData = async () => {
    const response = await fetch(
      "https://dmecart-38297.botics.co/business/analytics/"
    );
    const resData = await response.json();
    setData(resData);
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
      "https://dmecart-38297.botics.co/business/analytics/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    if(!businessName){
      validationError.businessName = "Please provide business name"
    }
    if(!startDate){
      validationError.startDate = "Please provide start date"
    }
    if(!endDate){
      validationError.endDate = "Please provide end date"
    }
    if(!businessLocation){
      validationError.businessLocation = "Please provide business location"
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
    if(startDate && endDate && businessName && businessLocation){
      setError({})
      const response = await fetch(
        "https://dmecart-38297.botics.co/business/transaction_details/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start_date: startDate,
            end_date: endDate,
            business_name: businessName,
            business_location: businessLocation,
          }),
        }
      );
      const resData = await response.json();
      setOrderData(resData);
      setTable(true)
    }
  };


  return (
    <div>
      <AppHeader />
      <div className="analytics-section">
        <div className="d-flex tile-section">
          <div className="analytics-tile">
            <p><b>Total Users Signup</b></p>
            <h3>{data?.total_patient_count}</h3>
          </div>
          <div className="analytics-tile">
            <p><b>Total Businesses Onboarded</b></p>
            <h3>{data?.total_business_count}</h3>
            <p className="mt-1" style={{ fontSize: "14px" }}>
              Active: <b>{data?.active_business_count}</b>{" "}
              <span className="ms-5">
                Inactive:<b> {data?.inactive_business_count}</b>
              </span>
            </p>
          </div>
          <div className="analytics-tile">
            <p><b>Total Transaction Count</b></p>
            <h3>{data?.number_of_transaction}</h3>
            {/* <p className='mt-5' style={{fontSize:"14px"}}>Active:       <span className='ms-5'>Inactive: </span></p> */}
          </div>
          {/* <div className="analytics-tile">
            <p>Total Revenue</p>
            <h3>${data?.revenue_generated}</h3>
            <p className='mt-5' style={{fontSize:"14px"}}>Active:       <span className='ms-5'>Inactive: </span></p>
          </div> */}
        </div>
        <div className="d-flex box-tile-section mt-5">
          <div className="box-tile-1">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <h5><b>Recent Businesses</b></h5>
              <span>
                Sort by:{" "}
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
                    <th className=" py-2">Businesses</th>
                    <th className="table_theader">Transaction Amount</th>
                    <th className="table_theader">Location</th>
                  </tr>
                </thead>
                <tbody className="body__txt">
                  {updatedData?.transaction_details?.map((item, index) => (
                    <tr key={index}>
                      <td className="body__elemnts">{item.business_name}</td>
                      <td className="body__elemnts">
                        ${item.total_transaction_amount}
                      </td>
                      <td className="body__elemnts">
                        {item.business_location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="box-tile-2">
            <div
              className="d-flex filter-bar"
              style={{ justifyContent: "space-between" }}
            >
              <span>Filter by Business Name: </span>
              <div>
                <select onChange={(e)=>setBusinessName(e.target.value)} required>
                  {businessData?.business_names?.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}

                  {/* <option value="1_week">1 Week</option>
                  <option value="30_days">30 Days</option>
                  <option value="1_year">1 Year</option> */}
                </select>
              </div>
            </div>
            {error?.businessName && <span style={{color:"red"}} >{error.businessName}</span>}
            <div
              className="d-flex filter-bar mt-3"
              style={{ justifyContent: "space-between" }}
            >
              <span>Filter by Business Location: </span>
              <div>
                <select onChange={(e)=>setBusinessLocation(e.target.value)} required>
                  {businessData?.business_locations?.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                  {/* <option value="1_week">1 Week</option>
                  <option value="30_days">30 Days</option>
                  <option value="1_year">1 Year</option> */}
                </select>
              </div>
            </div>
            {error?.businessLocation && <span style={{color:"red"}} >{error.businessLocation}</span>}

            <div
              className="d-flex mt-3"
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
                {error?.endDate && <span className="" style={{color:"red",marginLeft:"80px"}} >{error.endDate}</span>}
            <div className="mt-2">
              <Table className="table table-hover borderless responsive striped">
                { table && <thead
                  className="table-header-analytics"
                  style={{ backgroundColor: "#E3E3E3" }}
                >
                  <tr>
                    <th className=" py-2">Businesses</th>
                    <th className="table_theader">Transaction Amount</th>
                    <th className="table_theader">Location</th>
                  </tr>
                </thead>}
                
                <tbody className="body__txt">
                  {orderData && orderData?.map((item, index) => (
                              <tr key={index}>
                                <td className="body__elemnts">
                                  {item.business_name}
                                </td>
                                <td className="body__elemnts">
                                  ${item.amount_paid}
                                </td>
                                <td className="body__elemnts">
                                  {item.location}
                                </td>
                                {/* <td className="body__elemnts">
                                  {item.street_address}
                                </td> */}
                              
                                
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
            {!updatedData ? <h6>${businessData?.revenue_generated}</h6> : <h6>${updatedData?.amount}</h6> }
            {/* <h6>${data?.total_transaction_amount}</h6> */}
            </div>
            <div className="d-flex revenue-detail">
            <h6>Transaction count :</h6>
            {!updatedData ? <h6>{businessData?.number_of_transaction}</h6> : <h6>{updatedData?.count}</h6> }
            {/* <h6>{data?.transaction_count}</h6> */}
            </div>
        </div>
      </div>

      <AppFooter />
    </div>
  );
};

export default TransactionsBusiness;
