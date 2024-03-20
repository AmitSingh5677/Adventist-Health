import React, { useState, useRef } from 'react';
import "./AddInventory.css"
import { RiImageAddFill } from "react-icons/ri";
import AppFooter from "../../components/AppFooter/AppFooter"
import AppHeader from "../../components/AppHeader/AppHeader"
import mixpanel from "../../../mixpanel";
import { useParams } from 'react-router-dom';

const UpdateInventory = () => {
    const [equipment_name, setEquipmentName] = useState("");
    const [price, setPrice] = useState("");
    const [nameError, setnameError] = useState("");
    const [imageError, setImageError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [descError, setDescError] = useState("");
    const [detailError, setDetailError] = useState("");
    const [description, setDescription] = useState("");
    const [other_details, setOtherDetails] = useState("");
    const [image, setImage] = useState(null);
    const { id } = useParams();
    const [uploadedImage, setUploadedImage] = useState(null);
    const fileInputRef = useRef(null);
  const userid = sessionStorage.getItem("userid");

    React.useEffect(() => {
        
        const token = JSON.parse(sessionStorage.getItem("token"));
        const fetchData = async () => {
            console.log(`https://dmecart-38297.botics.co/business/product/${userid}/${id}/`,"api")
            try {
                const response1 = await fetch(`https://dmecart-38297.botics.co/business/product/${userid}/${id}/`, {
                    method: 'GET',
                    headers: {
                        // 'Content-Type': 'Application/json',
                        'Authorization': `Token ${token}`
                    },
                });
                
                const data = await response1.json();
                if(data){
                    setEquipmentName(data.equipment_name)
                    setDescription(data.description)
                    setOtherDetails(data.other_details)
                    setPrice(data.price)
                    // setImage(data.product_signed_url)
                    setUploadedImage(data.product_signed_url)
                }
                console.log(data, "data1")
            } catch (error) {
                // console.error('Error fetching data');
            }
        }

        fetchData();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file !=''){
            setImageError('')
        }
        console.log(file, "file")
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
        if (!equipment_name) {
            setnameError("Enter your name.")
        }
        // if (!image) {
        //     setImageError("Please select image.")
        // }

        if (!price) {
            setPriceError("Please enter price.")
        }

        if (!description) {
            setDescError("Please enter description.")
        }
        if (!other_details) {
            setDetailError("Please enter details.")
        }

        const formData = new FormData();

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const userId = parseInt(sessionStorage.getItem("userid"));
console.log(typeof(userId),"userId")
        formData.append('equipment_name', equipment_name);
        formData.append('date', formattedDate);
        // formData.append('business', userId);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('other_details', other_details);
        mixpanel.track("Listing Creation", {
            equipmentName: equipment_name,
            price: price,
          })

        if (image) {
            formData.append('images', image);
        }
        const token = JSON.parse(sessionStorage.getItem("token"));
        try {
            const response = await fetch(`https://dmecart-38297.botics.co/business/product/${id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`
                },
                body: formData,
            });

            if (response.ok) {

            } else {

            }
        } catch (error) {
            console.error('An error occurred during add inventory:', error.message);
        }
    }

    const handleChange = (e) => {
        console.log(e.target.name)
        if (e.target.name === 'name') {
            if (e.target.name != '') {
            setEquipmentName(e.target.value)
            setnameError('')
            }else{
                setEquipmentName('')
            }
        }

        if (e.target.name === 'price') {
            if (e.target.name != '') {
                setPrice(e.target.value)
                setPriceError('')
            }else{
                setPrice('')
            }
        }

        if (e.target.name === 'description') {
            if (e.target.name != '') {
                setDescription(e.target.value)
                setDescError('')
            }else{
                setDescription('')
            }
        }
        if (e.target.name === 'other_details') {
            if (e.target.name != '') {
                setOtherDetails(e.target.value)
                setDetailError('')
            }else{
                setOtherDetails('')
            }
        }
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    return (
        <div>
            <AppHeader />
            <div style={{ marginTop: "10%", overflow: 'scroll' }}>
                <form className="d-flex flex-row justify-content-around" onSubmit={submitHandler}>
                    <div className="d-flex flex-column justify-content-start">
                        <div className="d-flex flex-column m-3">
                            <label className='inventory__label'>Name</label>
                            <input id='name-input' className="inventory__inputBox  " type="text" placeholder="Product Name"
                                value={equipment_name}
                                name="name"
                                onChange={handleChange}

                            />
                            <span className='errorTxt'> {nameError && <span style={{ color: '#FF0000' }}>{nameError}</span>} </span>

                        </div>
                        <div className="border rounded p-4 d-flex flex-column align-items-center m-3 mb-0">
                            {!uploadedImage?<RiImageAddFill fontSize={40} onClick={handleButtonClick} />:
                            <img src={uploadedImage} alt="User Photo"  style={{ width: '80px', height: '80px' }} />}
                            <p className="text-secondary " style={{ fontFamily: "Poppins", top: "10px" }}>Choose image from the Device to Upload</p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/png, image/jpeg"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />

                            <button className="inventory__Descbox" type='button' onClick={handleButtonClick} style={{ background: "#026937", color: "#ffff", height: "30px", fontSize: "13px", padding: "5px", fontFamily: "Poppins", width: "60%" }} >Upload Image</button>

                        </div> <span className='errorTxt ms-3'> {imageError && <span style={{ color: '#FF0000' }}>{imageError}</span>} </span>


                        <div className="d-flex flex-column m-3">
                            <label className='inventory__label'>Price</label>
                            <input id='price-input' type="text" placeholder="Enter Price" className='inventory__inputBox '
                                value={price}
                                name="price"
                                onChange={handleChange}
                            />
                            <span className='errorTxt'> {priceError && <span style={{ color: '#FF0000' }}>{priceError}</span>} </span>

                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-end">
                        <div className="d-flex flex-column m-3 mt-5">
                            <label className='inventory__label'>Description</label>
                            <textarea id="description-input" name="description" rows="4" cols="50" placeholder="Enter Description"
                                className="inventory__Descbox " value={description}
                                onChange={handleChange} >
                            </textarea>
                            <span className='errorTxt'> {descError && <span style={{ color: '#FF0000' }}>{descError}</span>} </span>

                        </div>
                        <div className="d-flex flex-column m-3">
                            <label className='inventory__label'>Details</label>
                            <textarea id="details-input" name="other_details" rows="4" cols="50" placeholder="Enter other Details"
                                className="inventory__Descbox " style={{ height: "75px" }} value={other_details}
                                onChange={handleChange} >

                            </textarea>
                            <span className='errorTxt'> {detailError && <span style={{ color: '#FF0000' }}>{detailError}</span>} </span>

                        </div>
                        <button type="submit" className="btn btn-success p-5 pt-1 pb-1 m-3" style={{ fontFamily: "Poppins" }}>Save</button>
                    </div>
                </form >
            </div>
            <AppFooter />
        </div >
    )
}

export default UpdateInventory