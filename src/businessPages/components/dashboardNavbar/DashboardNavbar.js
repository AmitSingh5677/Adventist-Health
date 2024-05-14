import { Link } from 'react-router-dom';
import 'bootstrap';



const DashboardNavbar = (props) => {
    const { btn_name } = props

    return (
        <div className='px-4'>
            <div className='bg-light p-3 mb-2'>
             <h5 className='ms-2' style={{color:"#55565A"}}>My Homepage</h5>
            </div>
        <div className='bg-light p-3 mt-3'>
            <Link to='/b/allorders'> <button className={`btn btn-round ${btn_name === 'all_orders' ? 'btn-success' : 'btn-secondary'} m-2`}  style={{fontFamily:'Poppins'}}>All Orders</button></Link>
            <Link to='/b/order-requests'><button className={`btn btn-round ${btn_name === 'order_requests' ? 'btn-success' : 'btn-secondary'} m-2`} style={{fontFamily:'Poppins'}} >Order Requests</button></Link>
            <Link to='/b/reviews'><button className={`btn btn-round ${btn_name === 'reviews' ? 'btn-success' : 'btn-secondary'} m-2`} style={{fontFamily:'Poppins'}} >Reviews</button></Link>
            <Link to='/b/business-transactions'><button className={`btn btn-round ${btn_name === 'analytics' ? 'btn-success' : 'btn-secondary'} m-2`} style={{fontFamily:'Poppins'}} >My Analytics</button></Link>
        </div>

        </div>
    )
}

export default DashboardNavbar