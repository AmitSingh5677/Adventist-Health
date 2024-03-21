import React, { useState, useEffect } from "react";
import AppFooter from "../../components/AppFooter/AppFooter";
import AppHeader from "../../components/AppHeader/AppHeader";
import "./index.css";
import profile_img from "../../../data/assests/download_img/profile_img.png";
import edit from "../../data/assests/downloaded__imgs/editIcon.png";
import SucessMessage from "../../../components/successToast/SuccessToast";
const MyProfileBusiness = () => {
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [profileInfo, setProfileInfo] = useState([]);
  const [image, setImage] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [editable, setEditable] = useState(true);
  const [submit,setSubmit] = useState(false)
  // const [editable, setEditable] = useState({
  //   location: true,
  //   image: true,
  //   desc: true,
  //   name: true,
  // });

  const userid = sessionStorage.getItem("userid");
  const token = JSON.parse(sessionStorage.getItem("token"));

  const profileResponse = async()=>{
    const response = await fetch(`https://dmecart-38297.botics.co/business/business_details/${userid}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization':` Token ${token}`
      },
  });
 
    const resData = await response.json()
    // console.log(resData,"data123")
    // setProfileInfo(resData)
    // console.log(profileInfo,"hello")
    setName(resData.owner_full_name)
    setLocation(resData.business_location)
    setDesc(resData.description)
    setImage(resData.avatar_signed_url)
  }

  const handleUpdateData=async(e)=>{
    e.preventDefault()
    let formData = new FormData()
    formData.append("owner_full_name",name)
    formData.append("business_location",location)
    formData.append("description",desc)
    formData.append( "avatar_signed_url",image)
    try{
      const response = await fetch(`https://dmecart-38297.botics.co/business/business_details/${userid}/`,{
        method:'PUT',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization':` Token ${token}`
        },
        body:formData
      })
      const resData = await response.json()
      console.log(resData)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    profileResponse()
  },[])

  return (
    <div className="my-profile-bsuiness-page">
      <AppHeader />
      <div className="profile-section">
        <div className="my-profile-bar">
          <h6 className="my-profile-bar-text">My Profile</h6>
        </div>

        <form onSubmit={handleUpdateData}
        >
          <div className="d-flex mt-3 ">
            <div className="m-3  input-my-profile-section">
              <img
                src={ updatedImage ? URL.createObjectURL(updatedImage) : image}
                alt="no-img"
                className="image-profile-section"
              />
            </div>
            <input
              type="file"
              className="input-file-ver"
              placeholder="Upload Image"
              // value={updatedImage}
              // value={image}
              // disabled={editable?.image == true ? true : false}
              disabled={editable}
              onChange={(e) => setUpdatedImage(e.target.files[0])}
            />
            <div className="ms-5">
              <h1 className="m-3 ">ABC ENTERPRISES</h1>

              <div className="d-flex flex-column align-items-start m-3">
                <label htmlFor="business-location">Business Location</label>
                <div className="d-flex">
                  <textarea
                    value={location}
                    // disabled={editable?.location == true ? true : false}
                    disabled={editable}
                    onChange={(e) => setLocation(e.target.value)}
                    className="text-area-location ps-2 pt-2"
                    id="business-description"
                    placeholder="Enter Address"
                  ></textarea>
                </div>
              </div>

              <div className="d-flex flex-column align-items-start m-3">
                <label htmlFor="business-description">Short Description</label>
                <div className="d-flex">
                  <textarea
                    value={desc}
                    // disabled={editable?.desc == true ? true : false}
                    disabled={editable}
                    onChange={(e) => setDesc(e.target.value)}
                    className="text-area-location ps-2 pt-2"
                    placeholder="Enter Description"
                    id="business-description"
                  ></textarea>
                  {/* <span><img className="ms-2 mt-4" src={edit} style={{height:"15px"}} alt="edit"/></span> */}
                </div>
              </div>

              <div className="d-flex flex-column align-items-stretch m-3">
                <label htmlFor="business-name">Full Name</label>
                <div className="d-flex">
                  <input
                    type="text"
                    className="input-business-name ps-2"
                    id="business-name"
                    placeholder="Enter Full name"
                    value={name}
                    // disabled={editable?.name == true ? true : false}
                    disabled={editable}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {/* <span><img className="ms-2 mt-3" src={edit} style={{height:"15px"}} alt="edit"/></span> */}
                </div>
              </div>
              <div className="ms-3 mt-4">
                <button className="edit-btn py-1" onClick={()=>{setEditable(!editable);setSubmit(true)}}>Edit</button>
                <button type="submit"className="submit-btn py-1 ms-4" disabled={submit==false}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="btn-first-container mt-5">
          <button
            type="button"
            className="btn btn-success first-container-buttons m-2 p-5 pt-2 pb-2"
          >
            My Bank Account
          </button>
          <button
            type="button"
            className="btn btn-success first-container-buttons m-2  p-5 pt-2 pb-2"
          >
            Terms and Conditions
          </button>
          <button
            type="button"
            className="btn btn-success first-container-buttons m-2  p-5 pt-2 pb-2"
          >
            Privacy Policy
          </button>
          <button
            type="button"
            className="btn btn-success first-container-buttons m-2 p-5 pt-2 pb-2"
          >
            Log Out
          </button>
        </div>
        <div className="btn-first-container mt-4">
          <button
            type="button"
            className="btn btn-success second-container-buttons pt-2 pb-2"
          >
            Send FeedBack to Admin
          </button>
          <button
            type="button"
            className="btn btn-success second-container-buttons"
          >
            Delete Account
          </button>
          <button
            type="button"
            className="btn btn-success second-container-buttons"
          >
            HIPAA and compliance
          </button>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default MyProfileBusiness;