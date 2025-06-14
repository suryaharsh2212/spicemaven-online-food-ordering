import { OrderDetail } from '../Database/Model/Orderdetail.js';
import { Order } from '../Database/Model/OrderModel.js';

export const getTodayOrdersForRestro = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

   
   
    const todayOrders = await Order.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      status: { $ne: 'delivered' }
    });

    if (!todayOrders.length) {
      return res.status(404).json({ message: 'No active orders placed today.' });
    }

    const ordersWithDetails = await Promise.all(
      todayOrders.map(async (order) => {
        const orderDetails = await OrderDetail.find({ orderId: order._id }).populate('dish');
        return {
          ...order.toObject(),
          details: orderDetails
        };
      })
    );

    return res.status(200).json(ordersWithDetails);
  } catch (error) {
    console.error('Error fetching today\'s orders:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
