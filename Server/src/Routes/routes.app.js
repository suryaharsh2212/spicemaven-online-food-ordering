
import { Router } from "express";
import { registerUser } from "../Controllers/register.js";
import { loginUser } from "../Controllers/login.js";
import { logoutUser } from "../Controllers/logout.js";
import { createOrder } from "../Controllers/Order.js";
import { getOrdersByUser } from "../Controllers/Showorder.js";
import { getItems } from "../Controllers/Getitems.js";
import { getItemsBysearch } from "../Controllers/GetitemBySearch.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router=Router();

router.route("/register").post(registerUser)
router.route("/login").post(authMiddleware,loginUser)
router.route("/logout").post(authMiddleware,logoutUser)
router.route("/order").post(authMiddleware,createOrder)
router.route("/showorder").post(authMiddleware,getOrdersByUser)
router.route("/getmenu").post(authMiddleware,getItems)
router.route("/search").post(authMiddleware,getItemsBysearch)

export {router}