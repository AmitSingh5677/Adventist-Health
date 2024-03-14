import { Link } from 'react-router-dom';
import 'bootstrap';



const DashboardNavbar = (props) => {
    const { btn_name } = props

    return (
        <div className='bg-light p-3'>
            <Link to='/allorders'> <button className={`btn btn-round ${btn_name === 'all_orders' ? 'btn-success' : 'btn-secondary'} m-2`}  style={{fontFamily:'Poppins'}}>All Orders</button></Link>
            <Link to='/order-requests'><button className={`btn btn-round ${btn_name === 'order_requests' ? 'btn-success' : 'btn-secondary'} m-2`} style={{fontFamily:'Poppins'}} >Order Requests</button></Link>
            <Link to='/reviews'><button className={`btn btn-round ${btn_name === 'reviews' ? 'btn-success' : 'btn-secondary'} m-2`} style={{fontFamily:'Poppins'}} >Reviews</button></Link>
        </div>
    )
}

export default DashboardNavbar