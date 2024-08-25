import mongoose from "mongoose";

import { spiceUser } from "./UserModel.js";

const OrderSchema=new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'spiceUser',
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    status: {
        type: String,
        default: 'Pending'
    }
    
},{
    timestamps:true
})

export const Order=mongoose.model("Order",OrderSchema);