import React,{useState,useEffect} from 'react'
import './InventoryProductPage.css'
import AppHeader from '../../components/AppHeader/AppHeader'
import AppFooter from '../../components/AppFooter/AppFooter'
import { useParams } from 'react-router-dom';
import BackButton from '../../../components/Button/BackButton';

const InventoryProductPage = () => {
    const[productData,setProductData]=useState()
    const { id } = useParams();
    const userid = sessionStorage.getItem("userid");
    const token = JSON.parse(sessionStorage.getItem("token"));

    React.useEffect(() => {

        const token = JSON.parse(sessionStorage.getItem("token"));
        const fetchData = async () => {
            try {
                const response1 = await fetch(`https://dmecart-38297.botics.co/business/product/${userid}/${id}/`, {
                    method: 'GET',
                    headers: {
                        // 'Content-Type': 'Application/json',
                        'Authorization': `Token ${token}`
                    },
                });

                const data = await response1.json();
                if (data) {
                    console.log(data, "data1")
                    setProductData(data)
                }
            } catch (error) {
                // console.error('Error fetching data');
            }
        }

        fetchData();
    }, []);
  return (
    <div className='product-page-main'>
      <AppHeader/>
      <div className='product-page-section'>

      <div className='d-flex product-detail-section'>
        <div>
            <img src={productData?.product_signed_url} alt='product' className='product-img-inventory' />
        </div>
        <div>
            <h3>{productData?.equipment_name}</h3>
            <h5>${productData?.price}</h5>
            <div className='mt-3'>
             <p className='mb-0'><b>Description :</b></p>
             <p>{productData?.description}</p>
            </div>
        </div>
      </div>
      <div className='mt-5'>
        <BackButton width={"150px"}/>
        </div>
      </div>
      <AppFooter/>
    </div>
  )
}

export default InventoryProductPage
