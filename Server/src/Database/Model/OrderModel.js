import mongoose from "mongoose";
import { spiceUser } from "./UserModel.js";

const OrderSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'spiceUser',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'preparing' 
  },
  payment_id: {
    type: String,
    required: false
  },
  slag: {
    type: Boolean,
    default: false
  },
  razorpay_order_id: {
    type: String,
    required: false
  },
  razorpay_signature: {
    type: String,
    required: false
  },
  payment_status: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

export const Order = mongoose.model("Order", OrderSchema);
