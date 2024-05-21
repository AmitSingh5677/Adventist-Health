import React, { useState } from 'react';
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import 'bootstrap'
import './InventoryItemCard.css'
import { useNavigate } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from 'reactstrap';
import SucessToast from "../../components/sucessToast/SucessToast"

const InventoryItemCard = (props) => {
    const navigate = useNavigate();
    const { productData } = props
    const [sucessMessage, setSucessMessage] = useState("");
    const [showSucessToast, setShowSucessToast] = useState(false);


    const [isDelete, setIsDelete] = useState(false)
    const [id, setId] = useState('')

    const deleteModal = (id) => {
        setIsDelete(true)
        setId(id)
    }

    const deleteProduct = async () => {
        // https://dmecart-38297.botics.co/business/product/20/
        const token = JSON.parse(sessionStorage.getItem("token"));

        const response = await fetch(`https://dmecart-38297.botics.co/business/product/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`
            },
        });

        if (response) {
            setShowSucessToast(true);
            setSucessMessage("Product deleted successfully")
            setTimeout(()=>{
                window.location.reload()
            },2000)

        }

        setIsDelete(false)
    }
    return (<>
     {showSucessToast ? (
                <SucessToast
                    show={showSucessToast}
                    onClose={() => setShowSucessToast(false)}
                    message={sucessMessage}
                />
            ) : null}
        {productData?.map((item) => (

            <div className='inventory-container mb-3'>

                <div className='inventory-text cursor' onClick={()=>navigate(`/b/inventory-product/${item.id}`)}>
                    <h6 >{item.equipment_name}</h6>
                    {/* <p>{item.description}</p> */}
                </div>


                <img className="product_card_image m-1" style={{ height: 70, width: 100 }} src={item.product_signed_url} alt='product_image' />

                 <div className='ps-3 pe-3'>$ {item.price}</div>
                <div className='action '>
                    <LuPencilLine className='mb-3 mt-0 pt-0 cursor' color='green' onClick={() => navigate(`/b/updateInventory/${item.id}`)} />
                    <RiDeleteBin6Line className='cursor' color='red' onClick={() => deleteModal(item.id)} />
                </div>
            </div>

        ))}

        <Modal isOpen={isDelete} centered keyboard={false} backdrop="static" backdropClassName="modal-backdrop-dark" >
            <ModalHeader toggle={() => setIsDelete(false)} className='model_header' >
                <span style={{ fontSize: "16px" }}>Delete Product</span>
            </ModalHeader>
            <ModalBody className='modal__txt'>
                Are you sure you want to delete your product?
            </ModalBody>
            <ModalFooter style={{ borderTop: 'none' }} className='modal__footer'>
                <button className='cancel__btn' onClick={() => setIsDelete(false)}>No</button>
                <Button className='yes__btn' onClick={deleteProduct}>Yes</Button>
            </ModalFooter>
        </Modal>
    </>)
}

export default InventoryItemCard