import { Order } from '../Database/Model/OrderModel.js';
import { OrderDetail } from '../Database/Model/Orderdetail.js';
import { sendOrderConfirmationEmail } from '../Utilities/createMail.js';

export const createOrder = async (req, res) => {
  try {
    const { userID, address, totalAmount, orderDetails } = req.body;
    if (!userID || !orderDetails || !Array.isArray(orderDetails) || orderDetails.length === 0) {
      return res.status(400).json({ message: 'User ID and order details are required' });
    }

  

    const existingOrder = await Order.findOne({
      userID,
      status: { $nin: ['delivered'] },
      slag: false
    });


    if (existingOrder) {
      return res.status(400).json({
        message: 'You already have a pending order. Please complete it before placing a new one.',
        existingOrder,
        slag: existingOrder.slag
      });
    }

    const newOrder = new Order({ userID, address, totalAmount });
    const savedOrder = await newOrder.save();

    const orderDetailsPromises = orderDetails.map(detail => {
      return new OrderDetail({
        orderId: savedOrder._id,
        dish: detail.dishId,
        quantity: detail.quantity
      }).save();
    });

    await Promise.all(orderDetailsPromises);
    console.log("User Information:", req.user);
    await sendOrderConfirmationEmail(
      req.user.email,
      savedOrder._id,
      "Spice Maven Customer",
      '30-45 minutes'
    );

    return res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder,
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
