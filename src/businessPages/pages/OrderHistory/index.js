import AppHeader from '../../components/AppHeader/AppHeader'
import DashboardFooter from '../../components/DashboardFooter/DashboardFooter'
import AppFooter from '../../components/AppFooter/AppFooter'
import './index.css'


const OrderHistoryBusiness = ()=>{
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