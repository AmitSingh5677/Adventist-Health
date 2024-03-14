import React, { useEffect, useState } from "react";
import "./CheckoutForm.css"
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    console.log("message " + message);


    useEffect(() => {
        if (!stripe) {
            console.error("Stripe not initialized");
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            console.error("Payment intent client secret not found");
            return;
        };

        stripe.retrievePaymentIntent(clientSecret)
            .then(({ paymentIntent }) => {
                console.log("Payment Intent Status:", paymentIntent.status);

                switch (paymentIntent.status) {
                    case "succeeded":
                        setMessage("Payment succeeded!");
                        console.log("Payment succeeded!");
                        break;
                    case "processing":
                        setMessage("Your payment is processing.");
                        console.log("Your payment is processing.");
                        break;

                    default:
                        setMessage("Something went wrong.");
                        console.error("Unhandled payment intent status:", paymentIntent.status);
                        break;
                }
            })
            .catch(error => {
                console.error("Error retrieving payment intent:", error);
            });
    }, [stripe]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://dmecart-38297.botics.co/paymentStatus",
            },
        });
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <div className="checkoutdiv">
            <div className="checkoutBody">
                <form id="payment-form" onSubmit={handleSubmit} className="chekoutForm">
                    <PaymentElement id="payment-element" options={paymentElementOptions} />
                    <button disabled={isLoading || !stripe || !elements} id="submit" className="Checkoutbutton">
                        <span id="button-text" >
                            {isLoading ? <div className="checkoutspinner" id="spinner"></div> : "Pay now"}
                        </span>
                    </button>
                    {/* Show any error or success messages */}
                    {message && <div id="payment-message">{message}</div>}
                </form>
            </div>
        </div>
    );
}



