import fetch from 'node-fetch';
import { Order } from '../Database/Model/OrderModel.js';
import { sendOrderConfirmationEmail } from '../Utilities/createMail.js';

export const confirmRazorpayPayment = async (req, res) => {
    const { paymentId, orderId ,user} = req.body;
    console.log('Confirming Razorpay payment for order ID:', orderId, 'with payment ID:', paymentId);
    if (!paymentId || !orderId) {
        return res.status(400).json({ success: false, message: 'Payment ID and Order ID are required' });
    }

    try {
        const authToken = Buffer.from(
            `${process.env.KEYID}:${process.env.KEYSECRET}`
        ).toString('base64');

        const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: {
                Authorization: `Basic ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        const payment = await response.json();
        console.log('Payment details:', payment);

        if (!response.ok) {
            return res.status(400).json({
                success: false,
                message: payment.error?.description || 'Failed to verify payment',
            });
        }

        const payment_status = payment.status === 'authorized' ? 'Paid' : 'Failed';

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }


        order.payment_id = payment.id;
        order.razorpay_order_id = payment.order_id || null;
        order.payment_status = payment_status;


        const updatedOrder = await order.save();
        await sendOrderConfirmationEmail(
            user.email, 
            orderId,
            user.name,
            '30-45 minutes'
        );

        return res.status(200).json({
            success: true,
            message: `Order updated with payment status: ${payment_status}`,
            order: updatedOrder,
            payment,
        });


    } catch (error) {
        console.error('Error confirming payment:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export default confirmRazorpayPayment;
