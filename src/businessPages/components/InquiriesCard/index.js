import { RiDeleteBin6Line } from "react-icons/ri";
import avatar_logo from '../../../data/assests/avatar_logo.png';
import electric_chair from '../../../data/assests/download_img/electricChair1.png'


const InquiriesCard = ()=>{
    return <div className="m-2">


        <div className="d-flex flex-row justify-content-between" >
    <div>
       <div className="d-flex comp-name-sec">

            <img src={avatar_logo} alt=' logo' />
            <h4 className="ms-2 mt-1">Company Name</h4>
       </div>

   
        <div className="d-flex flex-row mt-2">
            <div className="equipm-img-box">
            <img src={electric_chair} alt='product' className="product-img" />
            </div>
            <div className="m-2 ms-5">
                <h6 style={{fontWeight:"bold"}}>Wheel chair</h6>
                <p>Wheel chair wheel chair wheel chair wheel chair</p>
            </div>
            <h6 className="ms-5" style={{fontWeight:"bold"}}>$1200.00</h6>
            
        </div>
       
        <div className="w-75 mt-2">
            <p>Wheel chair wheel chair wheel chair description Lorem Ipsum door sit amwr consectur, nec mass ulrieces  Wheel chair wheel chair wheel chair description Lorem Ipsum door sit amwr consectur, nec mass ulrieces  Wheel chair wheel chair wheel chair description Lorem Ipsum door sit amwr consectur, nec mass ulrieces</p>
            <div className="d-flex flex-column mt-3 mb-4">
                <label htmlfor='message-input' style={{fontWeight:"bold"}}>Add new message</label>
                <textarea className="bg-dark-subtle p-1" rows={2} placeholder="Write your message here..." ></textarea>
                <button type="button" className="btn btn-success align-self-end m-1 p-5 pt-1 pb-1 mt-3">Send</button>
            </div>
        </div>
       
    </div>

    <RiDeleteBin6Line color="red" size={40} className="delete-btn" />
    </div>


    <hr />
</div>
}

export default InquiriesCard