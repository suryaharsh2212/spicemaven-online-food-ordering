
import { Order } from "../Database/Model/OrderModel.js";

const allowedStatuses = ['preparing', 'packed', 'outForDelivery', 'delivered'];

export const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  
  
  if (!orderId || !status) {
    return res.status(400).json({ error: true, message: 'Order ID and status are required.' });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: true, message: 'Invalid status value.' });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: true, message: 'Order not found.' });
    }

    res.status(200).json({ error: false, message: 'Order status updated.', order: updatedOrder });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ error: true, message: 'Server error.' });
  }
};
