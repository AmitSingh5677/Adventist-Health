import React, {useState,useEffect} from "react";
import "./Verification.css";
import LeftSection from "../../components/leftSidePannel/LeftSideSection";
import logindoodles from "../../data/assests/downloaded__imgs/logindoodles.png";
import logo from "../../data/assests/downloaded__imgs/DmeCART.png";
import editIcon from '../../data/assests/downloaded__imgs/editIcon.png'
import noEye from '../../data/assests/downloaded__imgs/noEye.png'
import { useParams } from 'react-router-dom';

const Verification = () => {
 const [nName, setBName] = useState("")
 const [location, setLocation] = useState("")
 const [desc, setDesc] = useState("")
 const [name, setName] = useState("")
 const [data, setData] = useState([])

 const { email } = useParams();

 const fetchData = async()=>{
    const response = await fetch(`https://dmecart-38297.botics.co/business/verification_details/${email}/`);
    const resData = await response.json()
    setData(resData)
 }
 useEffect(()=>{
    fetchData()
 },[]);
 console.log(data,"data")

  return (
    <div className="verification-screen">
      <div className="left-section-ver">
        <img src={logindoodles} alt="image" className="doodle-logo" />
        <div className="logo-section">
          <img src={logo} alt="logo" className="logo-image" />
        </div>
      </div>
      <div className="ver-form-section">
        <div className="status-bar">
          <div>
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>
              Account Verification Status:
            </span>
          </div>
          <div className="status">
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>PENDING</span>
          </div>
          </div>
          <div className="mt-5 top-section-ver-form">
            <div className="create-input-section">
                <h3 style={{fontWeight:"bold"}}>Create Your Account</h3>
                <div className="name-input-field mt-3">
                <input type="text" className=""/><span><img src={editIcon} className="img-icon"/></span> 
                </div>
                <div className="name-input-field mt-3">
                <input type="text" className="" /><span><img src={editIcon} className="img-icon"/></span>
                </div>
            </div>
            <div className="image-container-edit">
                <input type="file" className="input-file-ver" />
                <p>Change Photo</p>
            </div>
        </div>
        <div className="ver-mid-form-section">
            <div className=" mt-3 ver-mid-form-input-desc">
<input type="text" className="ps-1" placeholder="Description" style={{height:"72px"}} /> <span><img src={editIcon} className="img-icon"/></span>
            </div>
            <div className="mt-3 ver-mid-form-input">
<input type="text" className=""/><span><img src={editIcon} className="img-icon" /></span>
            </div>
            <div className="mt-3 ver-mid-form-input">
<input type="password" className=""/><span><img src={noEye} className="img-icon" /></span> 

            </div>
            <div className="mt-3 ver-mid-form-input">
<input type="password" className=""/><span ><img src={noEye} className="img-icon" /></span>

            </div>
        </div>
        <div className="btn-section">
 <button className="inventory-btn">Add/Edit Inventory</button> <br/>
 <button className="bank-btn mt-4">Add Bank Account</button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
