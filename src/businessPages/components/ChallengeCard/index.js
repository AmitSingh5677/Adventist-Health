import { RiDeleteBin6Line } from "react-icons/ri";
import './index.css'
import logo from '../../../data/assests/download_img/Inquries_logo(4).svg'
import { StarRating } from "../../../pages/ratingsScreen/RatingScreen";
const ChallengeCard = ()=>{
    return <div className="mt-3">


        <div className="d-flex flex-row justify-content-between" >
    <div>
       <div className="business-logo-container">

            <img src={logo} alt=' logo' />
            <h4 className="m-1 ms-2">Company Name</h4>
       </div>

   
        
            <div className="mt-3">
                <StarRating rating={4}/>
            </div>
            
        
       
        <div className="w-75 mt-2 ms-2">
            <p>description: Wheel chair wheel chair wheel chair description Lorem Ipsum door sit amwr consectur, nec mass ulrieces  Wheel chair wheel chair wheel chair description Lorem Ipsum door sit amwr consectur, nec mass ulrieces  Wheel chair wheel chair wheel chair description Lorem Ipsum door sit amwr consectur, nec mass ulrieces</p>
            <div className="d-flex flex-column mt-3">
                <label htmlfor='message-input' style={{fontWeight:'bold'}}>Add new Message</label>
                <textarea className="bg-dark-subtle text_area p-1" rows={2} placeholder="Write your message here..." ></textarea>
                <button type="button" className="btn btn-success align-self-end m-1 p-5 pt-1 pb-1">Send</button>
            </div>
        </div>
       
    </div>

    <button type="button" className="align-self-start btn delete-btn text-dark mt-3"><RiDeleteBin6Line color="red" size={15} /> Delete</button>
    
    </div>


    <hr />
</div>
}

export default ChallengeCard