import AppFooter from "../../components/AppFooter/AppFooter"
import AppHeader from "../../components/AppHeader/AppHeader"
import './index.css'
import profile_img from '../../../data/assests/download_img/profile_img.png'

const MyProfileBusiness = ()=>{
    return <div className="my-profile-bsuiness-page">
      <AppHeader />
      <div className="profile-section">
    

  <div className="my-profile-bar">
      <h6 className='my-profile-bar-text'>My Profile</h6>
  </div>
     
        <form onSubmit={(e)=>{e.preventDefault()}}>
      <div className="d-flex mt-3 ">
        <div className="m-3  input-my-profile-section">
            <img src={profile_img} alt="no-img" className="image-profile-section" />
        </div>
        <div className="ms-5">
        <h1 className="m-3 ">ABC ENTERPRISES</h1>
        
        <div className="d-flex flex-column align-items-start m-3">
        <label htmlFor="business-location">Business Location</label>
        <textarea className="text-area-location ps-2 pt-2" id='business-description' placeholder="Enter Address"></textarea>
        </div>

        <div className="d-flex flex-column align-items-start m-3">
        <label htmlFor="business-description">Short Description</label>
        <textarea className="text-area-location ps-2 pt-2" placeholder="Enter Description" id='business-description'></textarea>
        </div>

        <div className="d-flex flex-column align-items-stretch m-3">
        <label htmlFor="business-name">Full Name</label>
       <input type="text" className='input-business-name ps-2' id='business-name' placeholder="Enter Full name" />
        </div>

        </div>

        
      </div>
        </form>
    <div className="btn-first-container mt-5">
        <button type="button" className="btn btn-success first-container-buttons m-2 p-5 pt-2 pb-2">My Bank Account</button>
        <button type="button" className="btn btn-success first-container-buttons m-2  p-5 pt-2 pb-2">Terms and Conditions</button>
        <button type="button" className="btn btn-success first-container-buttons m-2  p-5 pt-2 pb-2">Privacy Policy</button>
        <button type="button" className="btn btn-success first-container-buttons m-2 p-5 pt-2 pb-2">Log Out</button>
    </div>
     <div className="btn-first-container mt-4">
        <button type="button" className="btn btn-success second-container-buttons pt-2 pb-2">Send FeedBack to Admin</button>
        <button type="button" className="btn btn-success second-container-buttons">Delete Account</button>
        <button type="button" className="btn btn-success second-container-buttons">HIPAA and compliance</button>
     </div>
      </div>
      <AppFooter />
    </div>
}

export default MyProfileBusiness