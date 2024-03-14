import AppFooter from "../../components/AppFooter/AppFooter"
import AppHeader from "../../components/AppHeader/AppHeader"

const MyProfileBusiness = ()=>{
    return <div>
      <AppHeader />
      <h6 className='bg-info p-2 rounded m-5 mb-2 mt-3 text-white'>My Profile</h6>
     
      <div className="d-flex flex-row p-1">
        <div className="m-3">
            <p>Image input here</p>
        </div>
        <form onSubmit={(e)=>{e.preventDefault()}}>
        <h3 className="m-3 ">ABC ENTERPRISES</h3>
        
        <div className="d-flex flex-column align-items-start text-secondary m-3">
        <label htmlFor="business-location">Business Location</label>
        <textarea rows={2} cols={50} id='business-description' placeholder="Enter Address"></textarea>
        </div>

        <div className="d-flex flex-column align-items-start text-secondary m-3">
        <label htmlFor="business-description">Short Description</label>
        <textarea rows={2} cols={50} placeholder="Enter Description" id='business-description'></textarea>
        </div>

        <div className="d-flex flex-column align-items-stretch text-secondary m-3">
        <label htmlFor="business-name">Full Name</label>
       <input type="text" id='business-name' placeholder="Enter Full name" />
        </div>

        </form>
        
      </div>
    <div className="d-flex flex-row justify-content-around">
        <button type="button" className="btn btn-success m-2 p-5 pt-1 pb-1">My Bank Account</button>
        <button type="button" className="btn btn-success m-2  p-5 pt-1 pb-1">Terms and Conditions</button>
        <button type="button" className="btn btn-success m-2  p-5 pt-1 pb-1">Privacy Policy</button>
        <button type="button" className="btn btn-success m-2 p-5 pt-1 pb-1">Log Out</button>
    </div>
     <div className="d-flex flex-row justify-content-around">
        <button type="button" className="btn btn-success w-25">Send FeedBack to Admin</button>
        <button type="button" className="btn btn-success w-25">Delete Account</button>
        <button type="button" className="btn btn-success w-25">HIPAA and compliance</button>
     </div>
      <AppFooter />
    </div>
}

export default MyProfileBusiness