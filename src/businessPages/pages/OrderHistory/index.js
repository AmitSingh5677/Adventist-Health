import AppHeader from '../../components/AppHeader/AppHeader'
import DashboardFooter from '../../components/DashboardFooter/DashboardFooter'
import AppFooter from '../../components/AppFooter/AppFooter'


const OrderHistoryBusiness = ()=>{
    return <div>
        <AppHeader />
      
      
    <h6 className='bg-info p-2 rounded m-5 mb-2 mt-3 text-white'>ORDER HISTORY</h6>
      <table className=' table-margin'  >

    <thead className='bg-body-secondary'>
      <tr>
        <th className='w-2'>EQUIPMENT NAME</th>
        <th className='w-5'>DATE</th>
        <th className='w-5'>PAYMENT DETAILS</th>
        <th className='w-5'>ORDER DETAILS</th>
        <th className='w-5'>STATUS</th>
      </tr>
    </thead>

    <tbody>
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
                                                   

    
      <DashboardFooter />
      <AppFooter />
     
    </div>
}

export default OrderHistoryBusiness