import React from 'react';
import { Link } from "react-router-dom"
import AppFooter from "../../components/AppFooter/AppFooter"
import AppHeader from "../../components/AppHeader/AppHeader"
import InventoryItemCard from "../../components/InventoryItemCard/InventoryItemCard"
import './index.css'


const MyInventory = () => {

    return <div>
        <AppHeader />
        <div className="d-flex justify-content-around p-1  w-100 ">

            <div>
                <div className="d-flex justify-content-around">
                    <h5>Product</h5>
                    <h5>Price</h5>
                </div>
                <ul>
                    <InventoryItemCard />
                    <InventoryItemCard />
                    <InventoryItemCard />
                    <InventoryItemCard />
                </ul>
            </div>

            <div >
                <div className="d-flex justify-content-around">
                    <h5>Product</h5>
                    <h5>Price</h5>
                </div>
                <ul>
                    <InventoryItemCard />
                    <InventoryItemCard />
                    <InventoryItemCard />
                    <InventoryItemCard />
                </ul>
            </div>

        </div>


        <div className="d-flex flex-row justify-content-end ">
            <Link to='/add-inventory'> <button className="btn btn-success p-5 pt-1 pb-1 m-5 mt-3  " type="button">Add New/Edit</button></Link>
        </div>

        <AppFooter />

    </div>
}

export default MyInventory