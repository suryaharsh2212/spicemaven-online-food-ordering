import mongoose from "mongoose";


const DishSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    rating:{
        type:String,
    },
    vegetarian:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
     
},{
    timestamps:true
})

export const Dish=mongoose.model("Dish",DishSchema);




