import { RiDeleteBin6Line } from "react-icons/ri";
const InquiriesCard = ()=>{
    return <div className="m-2">


        <div className="d-flex flex-row justify-content-between" >
    <div>
       <div className="d-flex m-2">

            <img src='' alt=' logo' />
            <h6 className="m-1">Company Name</h6>
       </div>

   
        <div className="d-flex flex-row">
            <img src='' alt='product' />
            <div className="m-2">
                <h6>Wheel chair</h6>
                <p>Wheel chair wheel chair wheel chair wheel chair</p>
            </div>
            <h6>$1200.00</h6>
            
        </div>
       
        <div className="w-75">
            <p>description: Wheel chair wheel chair wheel chair description Lorem Ipsum door sit amwr consectur, nec mass ulrieces  Wheel chair wheel chair wheel chair description Lorem Ipsum door sit amwr consectur, nec mass ulrieces  Wheel chair wheel chair wheel chair description Lorem Ipsum door sit amwr consectur, nec mass ulrieces</p>
            <div className="d-flex flex-column mb-4">
                <label htmlfor='message-input'>Add new Message</label>
                <textarea className="bg-dark-subtle p-1" rows={2} placeholder="Write your message here..." ></textarea>
                <button type="button" className="btn btn-success align-self-end m-1 p-5 pt-1 pb-1">Send</button>
            </div>
        </div>
       
    </div>

    <RiDeleteBin6Line color="red" size={40} />
    </div>


    <hr />
</div>
}

export default InquiriesCard