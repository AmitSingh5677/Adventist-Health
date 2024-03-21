import { Link } from 'react-router-dom'
import 'bootstrap'
import './DashboardFooter.css'
const DashboardFooter = () => {
    return (<div className='m-2 '>
        <Link to='/b/my-inventory'><button className='btn btn-success m-2 btn-width' >My Inventory</button></Link>
        <Link to='/b/my-profile'><button className='btn btn-success m-2 btn-width' >My Profile</button></Link>
        <Link to='/b/order-history'><button className='btn btn-success m-2 btn-width' >Order History</button></Link>
        <Link to='/b/challenge-rating'><button className='btn btn-success m-2 btn-width' >Review Challenges</button></Link>
        <Link to='/b/inquiries'><button className='btn btn-success m-2 btn-width' >Inquiries</button></Link>
    </div>
    )
}

export default DashboardFooter