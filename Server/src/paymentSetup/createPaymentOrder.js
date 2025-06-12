import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const createPaymentOrder = async (req, res) => {
    try {
        const {amount}= req.body;
        const instance = new Razorpay({ key_id: process.env.KEYID, key_secret: process.env.KEYSECRET })
        const receiptId = generateReceiptId();
        instance.orders.create({
            amount: amount,
            currency: "INR",
            receipt: receiptId,
            notes: {
                key1: "value3",
                key2: "value2"
            }
        })
        .then((order) => {
            console.log('Order created successfully:', order);
            res.status(200).json({
                success: true,
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                receipt: order.receipt
            });
           
        })
        .catch((error) => {
            console.error('Error creating order:', error);
            res.status(500).json({ message: 'Internal server error', error: true });
        });
    } catch (error) {
        console.error('Error creating order:', error);
        
    }
}
export default createPaymentOrder;




function generateReceiptId() {
  const prefix = "SPICE"; 
  const timestamp = Date.now().toString(); 
  const randomPart = Math.random().toString(36).substring(2, 10); 
  let receiptId = `${prefix}_${timestamp}_${randomPart}`;
  if (receiptId.length > 40) {
    receiptId = receiptId.substring(0, 40);
  }

  return receiptId;
}




