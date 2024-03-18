import React,{useState} from 'react';
import "./AddInventory.css"
import { RiImageAddFill } from "react-icons/ri";
import AppFooter from "../../components/AppFooter/AppFooter"
import AppHeader from "../../components/AppHeader/AppHeader"

const AddInventory = () => {
    const [equipment_name, setEquipmentName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [other_details, setOtherDetails] = useState("");
    const [image, setImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
console.log(file,"file")
        const reader = new FileReader();
        reader.onloadend = () => {
            setUploadedImage(reader.result);
            setImage(file);
        };

        if (file) {
            reader.readAsDataURL(file);
        };
        // console.log("file " + file);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // alert("vijay")
        // if (!equipment_name) {
        //     setPasswordError("Enter Your Password.")
        // } else {
        //     setPasswordError('');
        // }

        // if (!confrimPassword) {
        //     setConfrimError("Enter Your Confrim Password.")
        // } else {
        //     setConfrimError('');
        // };

        try {
            const response = await fetch('https://dmecart-38297.botics.co/business/product/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "equipment_name":"",
                    "date":new Date(),
                    "business":1,
                    "description":"",
                    "price":3500,
                    "other_details":""
                    
                }),
            });

            if (response.ok) {
               
            } else {
              
            }
        } catch (error) {
            console.error('An error occurred during add inventory:', error.message);
        }
    }

    return (
        <div>
            <AppHeader />
            <div style={{ marginTop: "10%" }}>
                <form className="d-flex flex-row justify-content-around" onSubmit={submitHandler}>
                    <div className="d-flex flex-column justify-content-start">
                        <div className="d-flex flex-column m-3">
                            <label className='inventory__label'>Name</label>
                            <input id='name-input' className="inventory__inputBox  " type="text" placeholder="Product Name" 
                            value={equipment_name}
                            onChange={(e) => setEquipmentName(e.target.value)}
                            />
                        </div>
                        <div className="m-3">
                            <label className='inventory__label'>Image</label>
                            <div className="border rounded p-4 d-flex flex-column align-items-center">
                                <RiImageAddFill fontSize={40} />
                                <p className="text-secondary " style={{ fontFamily: "Poppins" ,position:"relative",top:"10px"}}>Choose image from the Device to Upload</p>
                                <button className="inventory__Descbox" onChange={handleImageChange} style={{ background: "#026937", color: "#ffff", height: "30px", fontSize: "13px", padding: "5px", fontFamily: "Poppins", width: "60%" }} >Upload Image</button>
                            </div>
                        </div>
                        <div className="d-flex flex-column m-3">
                            <label className='inventory__label'>Price</label>
                            <input id='price-input' type="text" placeholder="Enter Price" className='inventory__inputBox ' 
                             value={price}
                             onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-end">
                        <div className="d-flex flex-column m-3 mt-5">
                            <label className='inventory__label'>Description</label>
                            <textarea id="description-input" name="myTextarea" rows="4" cols="50" placeholder="Enter Description" 
                            className="inventory__Descbox "  value={description}
                            onChange={(e) => setDescription(e.target.value)}>
                            </textarea>
                        </div>
                        <div className="d-flex flex-column m-3">
                            <label className='inventory__label'>Details</label>
                            <textarea id="details-input" name="myTextarea" rows="4" cols="50" placeholder="Enter other Details" 
                            className="inventory__Descbox " style={{height:"75px"}}  value={other_details}
                            onChange={(e) => setOtherDetails(e.target.value)} >

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