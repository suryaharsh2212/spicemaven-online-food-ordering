import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const createOrder = async (req, res) => {
    try {
        const instance = new Razorpay({ key_id: "", key_secret: "" })
        const receiptId = generateReceiptId();
        instance.orders.create({
            amount: 500,
            currency: "INR",
            receipt: receiptId,
            notes: {
                key1: "value3",
                key2: "value2"
            }
        })
        .then((order) => {
            console.log('Order created successfully:', order);
           
        })
        .catch((error) => {
            console.error('Error creating order:', error);
            
        });
    } catch (error) {
        console.error('Error creating order:', error);
        
    }
}




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




