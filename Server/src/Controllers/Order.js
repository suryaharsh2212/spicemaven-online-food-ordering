import { Order } from '../Database/Model/OrderModel.js';
import { OrderDetail } from '../Database/Model/Orderdetail.js';






export const createOrder = async (req, res) => {
  try {
    const { userID, orderDetails } = req.body;
    console.log(req.body);
    
    
    

    if (!userID || !orderDetails || !Array.isArray(orderDetails) || orderDetails.length === 0) {
      return res.status(400).json({ message: 'User ID and order details are required' });
    }

    const newOrder = new Order({ userID });
    const savedOrder = await newOrder.save();

    const orderDetailsPromises = orderDetails.map(detail => {
      return new OrderDetail({
        orderId: savedOrder._id,
        dish: detail.dishId,
        quantity: detail.quantity
      }).save();
    });

    await Promise.all(orderDetailsPromises);

    return res.status(201).json(savedOrder); 
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// {
//     "userID": "60c72b2f9b1d4f1a4c8b4567",
//     "orderDetails": [
//       {
//         "dishId": "60c72b2f9b1d4f1a4c8b4568",
//         "quantity": 2
//       },
//       {
//         "dishId": "60c72b2f9b1d4f1a4c8b4569",
//         "quantity": 1
//       }
//     ]
//   }
  