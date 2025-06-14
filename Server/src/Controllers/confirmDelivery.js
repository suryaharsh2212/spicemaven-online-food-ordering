// In controllers/orderController.js
import { Order } from '../Database/Model/OrderModel.js';

export const confirmDelivery = async (req, res) => {
  const { orderId } = req.body;
  
  
  if (!orderId) {
    return res.status(400).json({ success: false, message: 'Order ID is required' });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { slag: true ,status: 'delivered' },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Delivery confirmed',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error confirming delivery:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
