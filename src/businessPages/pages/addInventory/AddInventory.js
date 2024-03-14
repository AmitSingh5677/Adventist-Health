import React from 'react';
import "./AddInventory.css"
import { RiImageAddFill } from "react-icons/ri";
import AppFooter from "../../components/AppFooter/AppFooter"
import AppHeader from "../../components/AppHeader/AppHeader"

const AddInventory = () => {

    return (
        <div>
            <AppHeader />
            <div style={{ marginTop: "10%" }}>
                <form className="d-flex flex-row justify-content-around" onClick={(e) => { e.preventDefault() }}>
                    <div className="d-flex flex-column justify-content-start">
                        <div className="d-flex flex-column m-3">
                            <label className='inventory__label'>Name</label>
                            <input id='name-input' className="inventory__inputBox  " type="text" placeholder="Product Name" />
                        </div>
                        <div className="m-3">
                            <label className='inventory__label'>Image</label>
                            <div className="border rounded p-4 d-flex flex-column align-items-center">
                                <RiImageAddFill fontSize={40} />
                                <p className="text-secondary " style={{ fontFamily: "Poppins" ,position:"relative",top:"10px"}}>Choose image from the Device to Upload</p>
                                <button className="inventory__Descbox" style={{ background: "#026937", color: "#ffff", height: "30px", fontSize: "13px", padding: "5px", fontFamily: "Poppins", width: "60%" }} >Upload Image</button>
                            </div>
                        </div>
                        <div className="d-flex flex-column m-3">
                            <label className='inventory__label'>Price</label>
                            <input id='price-input' type="text" placeholder="Enter Price" className='inventory__inputBox ' />
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-end">
                        <div className="d-flex flex-column m-3 mt-5">
                            <label className='inventory__label'>Description</label>
                            <textarea id="description-input" name="myTextarea" rows="4" cols="50" placeholder="Enter Description" className="inventory__Descbox ">
                            </textarea>
                        </div>
                        <div className="d-flex flex-column m-3">
                            <label className='inventory__label'>Details</label>
                            <textarea id="details-input" name="myTextarea" rows="4" cols="50" placeholder="Enter other Details" className="inventory__Descbox " style={{height:"75px"}}>

                            </textarea>
                        </div>
                        <button type="button" className="btn btn-success p-5 pt-1 pb-1 m-3" style={{ fontFamily: "Poppins" }}>Save</button>
                    </div>
                </form >
            </div>
            <AppFooter />
        </div >
    )
}

export default AddInventory