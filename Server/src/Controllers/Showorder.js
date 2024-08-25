
import { OrderDetail } from '../Database/Model/Orderdetail.js';
import { Order } from '../Database/Model/OrderModel.js';

export const getOrdersByUser = async (req, res) => {
  try {
    const { userID } = req.body;

    if (!userID) {
      return res.status(400).json({ message: 'User ID is required' });
    }


    const orders = await Order.find({ userID });

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        const orderDetails = await OrderDetail.find({ orderId: order._id }).populate('dish');
        return {
          ...order.toObject(),
          details: orderDetails
        };
      })
    );

    return res.status(200).json(ordersWithDetails);
  } catch (error) {
    console.error('Error fetching orders by user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
