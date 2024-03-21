import React,{useState} from 'react';
import { Link } from "react-router-dom"
import AppFooter from "../../components/AppFooter/AppFooter"
import AppHeader from "../../components/AppHeader/AppHeader"
import InventoryItemCard from "../../components/InventoryItemCard/InventoryItemCard"
import './index.css'
import { Col, Row } from 'reactstrap';


const MyInventory = () => {

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
        <div style={{ marginTop: "6%"}} className="w-100 p-5">

            <div>
                <div className="d-flex justify-content-between">
                    <h5>Product</h5>
                    <h5 className='me-5'>Price</h5>
                    <h5>Product</h5>
                    <h5 className='me-5'>Price</h5>
                </div>
                
                <Row className='inventory-card'>
                <InventoryItemCard productData={productData}/>
                </Row>
               
            </div>

           

        </div>


        <div className="d-flex flex-row justify-content-end ">
            <Link to='/addInventory'> <button className="btn btn-success p-5 pt-1 pb-1 m-5 mt-3  " type="button">Add New/Edit</button></Link>
        </div>

        <AppFooter />

    </div>
}

export default MyInventory