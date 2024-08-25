import mongoose from "mongoose";
import { Order } from "./OrderModel.js";
import { Dish } from "./DishModel.js";

const OrderDetailSchema=new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
       },
       dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        required: true
       },
       quantity: {
        type: Number,
        required: true
       }
},{
    timestamps:true
})

export const OrderDetail=mongoose.model("OrderDetail",OrderDetailSchema);