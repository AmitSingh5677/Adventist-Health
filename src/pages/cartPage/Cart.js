// Cart.js

import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/shippingCart/cartSlice';
import { RiDeleteBinLine } from "react-icons/ri";
import "./Cart.css";
import Helmet from '../../components/helmet/Helmet';
import AppHeader from '../../components/header/AppHeader';
import { Col, Container, Row } from 'reactstrap';
import PageHelmet from '../../components/page_Helmet/PageHelmet';
import { Navigate, useNavigate } from 'react-router-dom';
import AppFooter from '../../components/footer/AppFooter';
import noImage from '../../data/assests/noImage.jpg'

const Cart = () => {
  const [tax,setTax] =useState("")
    const [applicationFee,setApplicationFee] =useState("")
    const [totalPayable,setTotalPayable] =useState("")
  const cartItems = useSelector((state) => state.cart.cartItems);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const fetchOtherFee = async()=>{
    const price = calculateTotalPrice()
    const token = JSON.parse(sessionStorage.getItem("token"));
    console.log(price, "price", token)
    const response = await fetch("https://dmecart-38297.botics.co/patients/payment_intent/payment_calculation/", {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            "amount": price
        }),
      })
    const resData = await response.json()
    setTax(resData.tax)
    setApplicationFee(resData.application_fee)
    setTotalPayable(resData.final_amount)
}
console.log(tax,applicationFee,totalPayable, "result123")

useEffect(()=>{
    fetchOtherFee()
},[])


  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("effect is working in Cart.js");
    sessionStorage.setItem("singleItem", false);
    const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const storedTotalAmount = JSON.parse(sessionStorage.getItem('cartTotalAmount'));
    dispatch(cartActions.setSearchItem(storedCartItems));
    dispatch(cartActions.setTotalAmount(storedTotalAmount));
  }, []);
  // const [val,setVal]= useState([])
  // useEffect(())
  // console.log(val,cartItems,'j')
  // TODO : change the hard values.
  useEffect(() => {
    sessionStorage.setItem('cartTotalAmount', JSON.stringify(cartTotalAmount));
  }, [cartTotalAmount]);

  // const duplicateItems = [];
     
  //   cartItems.forEach(item => {
  //       // Extract quantity and id from the item
  //       const { quantity, id } = item;
    
  //       // Duplicate the item based on the quantity
  //       for (let i = 0; i < quantity; i++) {
  //         duplicateItems.push(id);
  //       }
  //     });
      // console.log(duplicateItems,"dupli")
  const deleteItem = (id) => {
    dispatch(cartActions.deleteItem(id));
    window.location.reload()
  };
  
  const addToCart = (item) => {
    dispatch(cartActions.addItem(item));
    window.location.reload()
  };
  
  const removeCart = (id) => {
    dispatch(cartActions.removeItem(id));
    window.location.reload()
  };
 
  console.log(cartItems)

  return (
    <Helmet title="cart">
      <div style={{ marginTop: "9%", marginBottom: "1%" }}>
        <AppHeader />
        <div>
          <section>
            <Container>
              <PageHelmet pageTitle="Shopping Cart" />
            </Container>
            <Container>
              <Row>
                <Col lg={cartItems.length === 0 ? "12" : "9"} md="9" xs="8">
                  {cartItems.length === 0 ? (
                    <h5 className="text-cart">Your cart is empty</h5>
                  ) : (
                    <table className="table table">
                      <thead>
                        <tr>
                          {/* <th>Image</th> */}
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th style={{ position: "relative", left: "-40px" }}>Total</th>
                          <th style={{ position: "relative", left: "-15px" }}>Delete</th>
                        </tr>
                      </thead>
                      <tbody style={{ fontFamily: "Poppins", position: "relative", left: "-30px" }}>
                        {cartItems.map((item) => (
                          <Tr item={item} key={item.id} onDelete={deleteItem} onAdd={addToCart} onRemove={removeCart} />
                        ))}
                      </tbody>
                    </table>
                  )}
                </Col>
                { cartItems.length !== 0 && <Col lg="3  " md="3" xs="4">
                  <div className="checkout__bill" style={{ backgroundColor: "#C5FFE3", textAlign: "center", padding: "20px", borderRadius: "20px" }}>
                    <h6 className='amount__conatiner'>Summary</h6>
                    <hr />
                    <h6 className="d-flex align-items-center justify-content-between mb-3 amount__conatiner">
                      Sub-Total: <span>${calculateTotalPrice()}.00</span>
                    </h6>
                    <h6 className="d-flex align-items-center justify-content-between mb-3 amount__conatiner">
                      {/* Tax & Application Fee: <span>$ {tax}</span> */}
                      Tax & Application Fee: <span>$ {tax+applicationFee}</span>
                    </h6>
                    {/* <h6 className="d-flex align-items-center justify-content-between mb-3 amount__conatiner">
                      Application Fee: <span>${applicationFee}</span>
                    </h6> */}
                    <hr />
                    <div className="checkout__total">
                      <h5 className="d-flex align-items-center justify-content-between amount__conatiner">
                        Total Order: <span>${totalPayable}</span>
                      </h5>
                    </div>
                  </div>
                </Col>

                }
                
              </Row>
            </Container>
          </section>
        </div>
      </div>
      <div className="mt-1 ">
        <div style={{ display: "flex", justifyContent: "space-evenly", marginBottom: "7%", marginTop: "3%" }}>
          <button className="addTOCart__button" onClick={() => navigate("/homepage")}>
            Back
          </button>
          {cartItems.length === 0 ? null : <button className="buy__btn" onClick={() => navigate("/delivery-Address")}>
            Buy
          </button>}

        </div>
      </div>
      <AppFooter />
    </Helmet>
  )
};

const Tr = ({ item, onDelete, onAdd, onRemove }) => {
  const { id, product_signed_url, equipment_name, price, quantity } = item;

  return (
    <tr>
      {/* <td className="text-center cart__img-box">
      </td> */}
      <td className="text-start ms-5">
        <img src={product_signed_url ? product_signed_url : noImage} alt="" width="60px"  className='me-2' />
        {equipment_name}</td>
      <td className="text-center">${price}</td>
      <td className="text-center">
        <button onClick={() => onRemove(id)} className='decrement__btn'>-</button>
        <span className='quantity__txt'>{quantity}</span>
        <button onClick={() => onAdd(item)} className='increment__btn'>+</button>
      </td>
      <td>${price * quantity}</td>
      <td className="text-center cart__item-del">
        <i className="ri-delete-bin-line" onClick={() => onDelete(id)} style={{ fontSize: "25px", color: "#F90D0D", cursor: "pointer" }}><RiDeleteBinLine /></i>
      </td>
    </tr>
  );
};

export default Cart;
