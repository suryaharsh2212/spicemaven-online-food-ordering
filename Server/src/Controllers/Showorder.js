import { OrderDetail } from '../Database/Model/Orderdetail.js';
import { Order } from '../Database/Model/OrderModel.js';

export const getOrdersByUser = async (req, res) => {
  try {
    const { userID } = req.body;

    if (!userID) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const order = await Order.findOne({ 
      userID, 
      status: { $in: ['preparing', 'packed', 'out for delivery'] } 
    });

    if (!order) {
      return res.status(404).json({ message: 'No active orders found for this user' });
    }

    const orderDetails = await OrderDetail.find({ orderId: order._id }).populate('dish');

    return res.status(200).json([{ 
      ...order.toObject(), 
      details: orderDetails 
    }]);
    
  } catch (error) {
    console.error('Error fetching orders by user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
