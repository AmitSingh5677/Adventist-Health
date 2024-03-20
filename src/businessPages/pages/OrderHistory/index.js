import React, { useState,useEffect } from 'react';
import AppHeader from '../../components/AppHeader/AppHeader'
import DashboardFooter from '../../components/DashboardFooter/DashboardFooter'
import AppFooter from '../../components/AppFooter/AppFooter'
import './index.css'


const OrderHistoryBusiness = ()=>{
  const [orders,setOrders] = useState([])

  const token = JSON.parse(sessionStorage.getItem("token"))
  // need to work on this
  const id = JSON.parse(sessionStorage.getItem("userId"))

  const fetch_order_history = async()=>{
    const response = await fetch(`https://dmecart-38297.botics.co/business/dashboard/${id}/`, {
      method: 'GET',
      headers: {
          'Authorization': `Token ${token}`
      }})
      const resData = await response.json()
      setOrders(resData)
  }
  console.log(orders,"hello")

  useEffect(()=>{
  fetch_order_history()
  },[])

    return <div>
      <div style={{display:'block'}}>
        <AppHeader />

      </div>
      
      <div className='order-history-section'>
        <div className='title-order-history'>
      <h6 className='ps-3 pt-3 pb-1'>ORDER HISTORY</h6>

        </div>
      <table className=' table-margin'  >

    <thead className='table-header'>
      <tr >
        <th className='w-2 py-3 ps-2'>EQUIPMENT NAME</th>
        <th className='w-5'>DATE</th>
        <th className='w-5'>PAYMENT DETAILS</th>
        <th className='w-5'>ORDER DETAILS</th>
        <th className='w-5'>STATUS</th>
      </tr>
    </thead>

    <tbody>
      {orders?.map((item)=>{
        return(
          <tr className='border-bottom border-body-secondary '>
          <td className='py-2'>{item.equipment_name}</td>
          <td>{item.date}</td>
          <td className='text-wrap'> {item.payment_status}</td>
          <td>{item.order_details}</td>
          <td className='text-success'>{item.status}</td>
        </tr>
        )
      })}
    <tr className='border-bottom border-body-secondary '>
        <td className='py-2'>WHEEL CHAIR</td>
        <td>01/24/2024</td>
        <td className='text-wrap'> AMOUNT PAID: 1200.00, PAID VIA: APPLE PAY</td>
        <td>5TH AVENUE,CAMBRIDGE CAMPUS,CALIFORNIA,USA 754296</td>
        <td className='text-success'>DELIVERED</td>
      </tr>
     
     
      
      <tr className='border-bottom border-body-secondary'>
        <td>WHEEL CHAIR</td>
        <td>01/24/2024</td>
        <td className='text-wrap'> AMOUNT PAID: 1200.00, PAID VIA: APPLE PAY</td>
        <td>5TH AVENUE,CAMBRIDGE CAMPUS,CALIFORNIA,USA 754296</td>
        <td className='text-warning'>PENDING</td>
      </tr>

      <tr className='border-bottom border-body-secondary'>
        <td>WHEEL CHAIR</td>
        <td>01/24/2024</td>
        <td className='text-wrap'> AMOUNT PAID: 1200.00, PAID VIA: APPLE PAY</td>
        <td>5TH AVENUE,CAMBRIDGE CAMPUS,CALIFORNIA,USA 754296</td>
        <td className='text-success'>DELIVERED</td>
      </tr>

      <tr className='border-bottom border-body-secondary'>
        <td>WHEEL CHAIR</td>
        <td>01/24/2024</td>
        <td className='text-wrap'> AMOUNT PAID: 1200.00, PAID VIA: APPLE PAY</td>
        <td>5TH AVENUE,CAMBRIDGE CAMPUS,CALIFORNIA,USA 754296</td>
        <td className='text-danger'>ORDERED</td>
      </tr>

      <tr className='border-bottom border-body-secondary'>
        <td>WHEEL CHAIR</td>
        <td>01/24/2024</td>
        <td className='text-wrap'> AMOUNT PAID: 1200.00, PAID VIA: APPLE PAY</td>
        <td>5TH AVENUE,CAMBRIDGE CAMPUS,CALIFORNIA,USA 754296</td>
        <td className='text-success'>DELIVERED</td>
      </tr>
      <tr className='border-bottom border-body-secondary'>
        <td>WHEEL CHAIR</td>
        <td>01/24/2024</td>
        <td className='text-wrap'> AMOUNT PAID: 1200.00, PAID VIA: APPLE PAY</td>
        <td>5TH AVENUE,CAMBRIDGE CAMPUS,CALIFORNIA,USA 754296</td>
        <td className='text-success'>DELIVERED</td>
      </tr>
      <tr className='border-bottom border-body-secondary'>
        <td>WHEEL CHAIR</td>
        <td>01/24/2024</td>
        <td className='text-wrap'> AMOUNT PAID: 1200.00, PAID VIA: APPLE PAY</td>
        <td>5TH AVENUE,CAMBRIDGE CAMPUS,CALIFORNIA,USA 754296</td>
        <td className='text-success'>DELIVERED</td>
      </tr>

    </tbody>
  </table>
      </div>
   
                                                   

    <div>

      {/* <DashboardFooter /> */}
    </div>
      <AppFooter />
     
    </div>
}

export default OrderHistoryBusiness