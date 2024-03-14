// PaymentForm.js

import React, { useState, useEffect } from 'react';
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const totalPrice = useSelector((state) => state.cart.totalAmount);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);

        try {
            // Replace the following with your logic for creating payment intent on the server
            const response = await fetch("/create-payment-intent", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: totalPrice * 100, // Convert total amount to cents
                }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const data = await response.json();

            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    payment_method: {
                        card: elements.getElement(PaymentElement),
                        billing_details: {
                            // Add billing details if needed
                        },
                    },
                },
                payment_method: {
                    card: elements.getElement(PaymentElement),
                    billing_details: {
                        // Add billing details if needed
                    },
                },
                payment_intent: data.client_secret,
            });

            if (error) {
                setMessage(error.message);
            } else {
                setMessage("Payment succeeded!");
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        // Add any additional options for PaymentElement
    };

    return (
        <form>
            {/* Your form fields go here */}
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} onClick={handleSubmit}>
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {message && <div>{message}</div>}
        </form>
    );
};

export default PaymentForm;
