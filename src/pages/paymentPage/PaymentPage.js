import React, { useState,useEffect } from 'react';
import "./PaymentPage.css";
import { Container, Row, Col, FormGroup, Label, Input, Modal } from 'reactstrap'; // Import FormGroup, Label, and Input
import Helmet from '../../components/helmet/Helmet';
import AppHeader from '../../components/header/AppHeader';
import AppFooter from '../../components/footer/AppFooter';
import { useSelector } from 'react-redux';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../../utility/CheckoutForm';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentConfirmation from '../../components/paymentConfirmation/PaymentConfirmation';
import mixpanel from '../../mixpanel'

const PaymentPage = () => {
    const [tax,setTax] =useState("")
    const [applicationFee,setApplicationFee] =useState("")
    const [totalPrice,setTotalPrice] =useState("")
    const totalPriceFromCart = useSelector((state) => state.cart.totalAmount);
    const cartItems = useSelector((state) => state.cart.cartItems);
    // const mappedIds = cartItems.map(item => item.id);
     
    const mappedIds = [];
     
    cartItems.forEach(item => {
        // Extract quantity and id from the item
        const { quantity, id } = item;
    
        // Duplicate the item based on the quantity
        for (let i = 0; i < quantity; i++) {
            mappedIds.push(id);
        }
      });

    // if item quantity is more than once then repeat those orders
    console.log("product " + JSON.stringify(mappedIds));
    // console.log("productnew " + JSON.stringify(duplicateItems));
 
    
 
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });
        return totalPrice;
    };
    const [clientSecret, setClientSecret] = useState();
    const [bussiness_id, setBussiness_Id] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const singleProduct = JSON.parse(sessionStorage.getItem("singleItem"));
    const singleproductPrice = JSON.parse(sessionStorage.getItem("product_price"));


    const product_Id = sessionStorage.getItem("single_product_id")
    const productId = parseInt(product_Id);

    const total_Products = JSON.parse(sessionStorage.getItem("singleItem"))
    const mappedProducts = total_Products ? [productId] : mappedIds
    

    const fetchOtherFee = async()=>{
        const price = singleProduct ? singleproductPrice : calculateTotalPrice()
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
        setTotalPrice(resData.final_amount)
    }
    console.log(tax,applicationFee,totalPrice, "result123")

    useEffect(()=>{
        fetchOtherFee()
    },[])


    const paymentHandler = async (e) => {
        e.preventDefault();
      
        try {
            // need to work on this for changing address -->
            const defaultAddressId = JSON.parse(sessionStorage.getItem("defaultAddressId"))
            const token = JSON.parse(sessionStorage.getItem("token"));
            const patientId = JSON.parse(sessionStorage.getItem("patientId"))
            const response = await fetch("/patients/payment_intent/create/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    "user_id": patientId,
                    "product_ids": mappedProducts,
                    "delivery_address_id": defaultAddressId,
                    "payment_details": "",
                    "payment_method": "card"
                }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const data = await response.json();

            mixpanel.track("Checkout Initiated", {
                amount: data?.total_amount,
                 order_id: data?.order_id
              })
              localStorage.setItem("order_id",data?.order_id)
              localStorage.setItem("amount",data?.total_amount)
            //   localStorage.setItem("amount",data?.total_amount)
            //   https://dmecart-38297.botics.co/patients/payment_intent/retrive/WOVDqT58Y8qf0TXo-1708016139/

         
            console.log("Payment ", JSON.stringify(data));
            setBussiness_Id(data.stripe_business_id)
            setClientSecret(data.client_secret)
            setIsLoading(false)
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    }



    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,

    };
    const stripePromise = () => loadStripe("pk_test_51OeI84FfzIuMGK9WqeYQ1zf1KR3qGECm10kiyfqLPvXgeCSHVUnweK3npcFEldVrRCjoUgIWX1kGzRmR4WwXRywn00twyegXzw", {
        stripeAccount: bussiness_id
    });


    const routeBussiness = () => {
        setTimeout(() => {
            navigate("/homepage")
        }, 1000)
    }


    return (
        <div>
            {clientSecret ? (
                <Elements options={{
                    clientSecret,
                    appearance,
                }} stripe={stripePromise()}>
                    <CheckoutForm />
                </Elements>
            ) : <Helmet title="paymentPage">
                <AppHeader />
                ( {isOpen ? <PaymentConfirmation equipmentName="Wheel Chair" amount="$ 1200" currentdate="19/02/2024" /> : (<div className='payment_div'>
                    <section>
                        <Container>
                            <h4 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "10px", marginLeft: "-6px" }}>Payment information</h4>
                            <Row className='payment_conatiner'>
                                <div className='header_row'>Payment Details</div>
                                <Row xs="12" sm="12" lg="12" className="feature__item text-center">
                                    <Col xs="3" sm="4" lg="4">
                                        <h6 className='payment_deatils'>Total Cost</h6>
                                        <h6 className='payment_deatils'>${singleProduct ? singleproductPrice : calculateTotalPrice()}.00</h6>
                                    </Col>
                                    <Col xs="3" sm="4" lg="4">
                                        <h6 className='payment_deatils'>Tax & Application Fee</h6>
                                        <h6 className='payment_deatils'>${tax+applicationFee}</h6>
                                    </Col>
                                    {/* <Col xs="3" sm="4" lg="3">
                                        <h6 className='payment_deatils'>Application Fee</h6>
                                        <h6 className='payment_deatils'>${applicationFee}</h6>
                                    </Col> */}
                                    <Col xs="6" sm="4" lg="4">
                                        <h6 className='payment_deatils'>Payable Amount</h6>
                                        {/* <h6 className='payment_deatils'>${singleProduct ? singleproductPrice : calculateTotalPrice()}.00</h6> */}
                                        <h6 className='payment_deatils'>${totalPrice}</h6>
                                    </Col>
                                </Row>
                            </Row>
                        </Container>
                    </section>

                    <div className='payment_conatiner_div'>
                        <button className='add_more_Items' onClick={routeBussiness}>
                            Add More Items
                        </button>
                        <button className='payment__btn' onClick={paymentHandler}>
                            PAY NOW
                        </button>
                    </div>

                </div>)})


                <AppFooter />
            </Helmet>}



        </div>
    );
};

export default PaymentPage;
