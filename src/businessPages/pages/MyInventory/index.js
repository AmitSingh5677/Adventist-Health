import React,{useState} from 'react';
import { Link, useNavigate } from "react-router-dom"
import AppFooter from "../../components/AppFooter/AppFooter"
import AppHeader from "../../components/AppHeader/AppHeader"
import InventoryItemCard from "../../components/InventoryItemCard/InventoryItemCard"
import './index.css'
import { Col, Row } from 'reactstrap';
import BackButton from '../../../components/Button/BackButton';


const MyInventory = () => {
    const navigate=useNavigate()

    const[productData,setProductData]=useState([])
    React.useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const userid =  parseInt(sessionStorage.getItem("userid"));
        console.log(token,"token")
      
        const fetchData = async () => {
            try {
              
                const response = await fetch(`https://dmecart-38297.botics.co/business/inventory/${userid}/`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'Application/json',
                      'Authorization': `Token ${token}`
                    },
                });
      
                const data = await response.json();
                if (data) {
                  console.log(data,"data")
                 // setOrderData(data)
                 setProductData(data)
      
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
      
        fetchData();
      
      }, []);

    return <div>
        <AppHeader />
        <div className='inventory-title-section'>
        <h4>My Inventory</h4>
        </div>
        <div style={{ marginTop: "6%"}} className=" ps-5">

            <div className='center-section-inventory'>
                <div className="d-flex" style={{columnGap:"5vw"}}>
                    <div className='d-flex' style={{width:"40vw", columnGap:"25vw"}}>
                    <h5>Product</h5>
                    <h5 className='me-5'>Price</h5> 
                    </div>
                    <div className='d-flex' style={{width:"40vw", columnGap:"25vw"}}>
                    <h5>Product</h5>
                    <h5 className='me-5'>Price</h5>
                    </div>
                    
             
                </div>
                
                <Row className='inventory-card'>
                <InventoryItemCard productData={productData}/>
                </Row>
               
            </div>

           

        </div>


        <div className="d-flex flex-row justify-content-between mb-5 mx-5">
            <div className='mt-3 ms-5' onClick={()=>navigate(-1)}>
            <BackButton width={"300px"} />
            </div>
            <Link to='/b/addInventory'> <button className="btn btn-success p-5 pt-1 pb-1 m-5 mt-3  inventory_btn" type="button" >Add to Inventory</button></Link>
        </div>

        <AppFooter  />

    </div>
}

export default MyInventory