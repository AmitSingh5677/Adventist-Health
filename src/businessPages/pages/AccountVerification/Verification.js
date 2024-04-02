import React, { useState, useEffect } from "react";
import "./Verification.css";
import LeftSection from "../../components/leftSidePannel/LeftSideSection";
import logindoodles from "../../data/assests/downloaded__imgs/logindoodles.png";
import logo from "../../data/assests/downloaded__imgs/DmeCART.png";
import editIcon from "../../data/assests/downloaded__imgs/editIcon.png";
import noEye from "../../data/assests/downloaded__imgs/noEye.png";
import { Navigate, useParams } from "react-router-dom";
import ToastMessage from '../../../components/toast/ToastMessage';
import SucessMessage from "../../../components/successToast/SuccessToast";
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const navigate = useNavigate();
  const [bName, setBName] = useState("");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [status, setStatus] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState("");
  const [editable, setEditable] = useState({
    bName: true,
    location: true,
    image: true,
    desc: true,
    name: true,
  });
  const [showOverlay, setShowOverlay] = useState(false);

  // const account_details =

  const { id } = useParams();

  const fetchData = async () => {
    const response = await fetch(
      `https://dmecart-38297.botics.co/business/verification/${id}/`
    );
    const resData = await response.json();
    setData(resData);
    setBName(resData.business_name);
    setLocation(resData.business_location);
    setDesc(resData.description);
    setName(resData.owner_full_name);
    setImage(resData.avatar_signed_url);
    setStatus(resData.is_approved);
  };
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(data, "data");
  // console.log(editable, editable.bName, "dgaga");
  console.log(updatedImage,location,desc,"dgaga");

  const handleSubmit = async(e)=>{
e.preventDefault()
console.log('business_name', bName, 'business_location', location, 'description', desc, 'owner_full_name', name, 'avatar', updatedImage ? updatedImage : image  )
const formData = new FormData();

        formData.append('business_name', bName );
        formData.append('business_location', location );
        formData.append('description', desc );
        formData.append('owner_full_name', name );
        if(updatedImage){
          formData.append('avatar', updatedImage);
        }

  const response = await fetch(`https://dmecart-38297.botics.co/business/verification/${id}/`, {
                method: 'PUT',
                body: formData,
            })
            const resData = response.json()
            console.log(resData)
            setShowErrorToast(true)
            setIsSuccess("Deatils have been updated successfully")
            setTimeout(()=>{
              navigate("/login")
            },3000)
  
}
  

  return (
    <div className="verification-screen">
      {<SucessMessage show={showErrorToast} message={isSuccess} onClose={() => setShowErrorToast(false)} />}
      <div className="left-section-ver">
        <img src={logindoodles} alt="image" className="doodle-logo" />
        <div className="logo-section">
          <img src={logo} alt="logo" className="logo-image" />
        </div>
      </div>
      
      <div className="ver-form-section">
      <form onSubmit={handleSubmit}>
      <div className="status-bar">
          <div>
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>
              Account Verification Status:
            </span>
          </div>
          <div className="status">
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              {(status).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="mt-5 top-section-ver-form">
          <div className="create-input-section">
            <h3 style={{ fontWeight: "bold" }}>Create Your Account</h3>
            <div className="name-input-field mt-3">
              <input
                type="text"
                className="ps-2"
                value={bName}
                onChange={(e) => setBName(e.target.value)}
                disabled={editable?.bName == true ? true : false}
                placeholder="Business name"
                required
              />
              <span>
                <img
                  onClick={() =>
                    setEditable((item) => ({ ...editable, bName: !item.bName }))
                  }
                  src={editIcon}
                  className="img-icon"
                />
              </span>
            </div>
            <div className="name-input-field mt-3">
              <input
                type="text"
                className=" ps-2"
                value={location}
                disabled={editable?.location == true ? true : false}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                required
              />
              <span>
                <img
                  src={editIcon}
                  onClick={() =>
                    setEditable((item) => ({
                      ...editable,
                      location: !item.location,
                    }))
                  }
                  className="img-icon"
                />
              </span>
            </div>
          </div>
          <div className="image-container-edit">
            <img
              src={updatedImage ? URL.createObjectURL(updatedImage) : image}
              alt="image"
              className="image-avatar-1"
              // onClick={() => setShowOverlay(true)}
            />
           <input
              type="file"
              className="input-file-ver"
              // value={updatedImage}
              // value={image}
              // disabled={editable?.image == true ? true : false}
              // disabled
              onChange={(e) => setUpdatedImage(e.target.files[0])}
            />
           
            {/* <p>Change Photo</p> */}
          </div>
        </div>
        <div className="ver-mid-form-section">
          <div className=" mt-3 ver-mid-form-input-desc">
            <textarea
              type="text"
              className="ps-2"
              value={desc}
              disabled={editable?.desc == true ? true : false}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description"
              style={{ height: "72px" }}
              required
            />{" "}
            <span>
              <img
                src={editIcon}
                onClick={() =>
                  setEditable((item) => ({
                    ...editable,
                    desc: !item.desc,
                  }))
                }
                className="img-icon"
              />
            </span>
          </div>
          <div className="mt-3 ver-mid-form-input">
            <input
              type="text"
              className="ps-2"
              value={name}
              disabled={editable?.name == true ? true : false}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
            />
            <span>
              <img
                src={editIcon}
                onClick={() =>
                  setEditable((item) => ({
                    ...editable,
                    name: !item.name,
                  }))
                }
                className="img-icon"
              />
            </span>
          </div>
          <div className="mt-3 ver-mid-form-input">
            <input
              type="password"
              className="ps-2"
              disabled
              placeholder="**********"
            />
            <span>
              <img src={noEye} className="img-icon" />
            </span>
          </div>
          <div className="mt-3 ver-mid-form-input">
            <input
              type="password"
              className="ps-2"
              disabled
              placeholder="**********"
            />
            <span>
              <img src={noEye} className="img-icon" />
            </span>
          </div>
        </div>
        <div className="btn-section">
          <button className="inventory-btn" type="submit">Update Details</button> <br />
          {/* <button className="bank-btn mt-4">Add Bank Account</button> */}
        </div>
        </form>
        
      </div>
    </div>
  );
};

export default Verification;
