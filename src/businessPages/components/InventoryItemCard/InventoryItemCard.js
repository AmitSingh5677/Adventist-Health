import React from 'react';
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import 'bootstrap'
import './InventoryItemCard.css'

const InventoryItemCard = () => {

    return <li className="w-100 d-flex flex-row justify-content-evenly" >

        <div style={{ width: '35%' }}>
            <h6 >Wheel Chair</h6>
            <p>Product description sample wheel Chair</p>
        </div>


        <img className="product_card_image m-1" src='https://picsum.photos/200/300' alt='product_image' />

        <p className="m-3">$ 1200.00</p>
        <div className="d-flex flex-column justify-content-around">
            <LuPencilLine color='green' />
            <RiDeleteBin6Line color='red' />
        </div>


    </li>
}

export default InventoryItemCard