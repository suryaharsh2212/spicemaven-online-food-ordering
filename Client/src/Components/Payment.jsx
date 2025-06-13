import React from 'react';
import API_URL from '../Utility/constant.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { CreditCard } from 'lucide-react';

const RazorpayButton = ({ amount }) => {
    const userDetails = useSelector((state) => state.user.id);
    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const navigate = useNavigate()
    const loadRazorpayScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };
    if (showConfirmation) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white px-4 py-10 text-center">
                <CheckCircle className="text-orange-500 w-16 h-16 mb-4" strokeWidth={1.5} />
                <h2 className="text-2xl font-bold text-orange-600 mb-2">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-6">
                    Thank you for your order. We’ve received it and are preparing your delicious food!
                </p>
                <button
                    disabled
                    className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold shadow-md opacity-70 cursor-not-allowed"
                >
                    Redirecting...
                </button>
            </div>
        );
    }

    const handlePayment = async () => {
        const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Failed to load Razorpay SDK");
            return;
        }


        const orderRes = await fetch(`${API_URL}/restro/createorder`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ amount: parseInt(amount) })
        });

        const orderData = await orderRes.json();
        const razorpayKey = import.meta.env.KEY_ID;
        console.log("Razor key", razorpayKey);


        const options = {
            key: "rzp_test_SIcBw0q2hsI9Db",
            amount: orderData.amount,
            currency: "INR",
            name: "Spice Maven",
            description: "Order Payment",
            image: "https://example.com/spice-maven-logo.png",
            order_id: orderData.id,
            handler: function (response) {
                setShowConfirmation(true)
                setTimeout(() => {
                    navigate(`/user/restro/${userDetails}/confirmOrder`);
                }, 2000);


            },
            prefill: {
                name: "Customer Name",
                email: "customer@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#F37254",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return <div className="h-full  bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4">
        <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full">
            <div className="flex flex-col items-center text-center">
                <CreditCard className="text-orange-500 w-12 h-12 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Complete Your Payment</h2>
                <p className="text-gray-500 mb-6">
                    You’re just one step away from receiving your delicious meal!
                </p>

                <div className="w-full bg-gray-100 rounded-xl p-4 mb-6">
                    <p className="text-gray-500 text-sm">Amount to be paid</p>
                    <p className="text-3xl font-extrabold text-orange-600 mt-1">
                        ₹{parseInt(amount)}
                    </p>
                </div>

                <button
                    onClick={handlePayment}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition duration-300 shadow-md"
                >
                    Pay Now
                </button>
            </div>
        </div>
    </div>
};

export default RazorpayButton;
