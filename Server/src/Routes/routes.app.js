

import { Router } from "express";
import { registerUser } from "../Controllers/register.js";
import { loginUser } from "../Controllers/login.js";
import { authenticateUser } from "../Middleware/authMiddleware.js";
import { logoutUser } from "../Controllers/logout.js";
import { createOrder } from "../Controllers/Order.js";
import { getOrdersByUser } from "../Controllers/Showorder.js";
import { getItems } from "../Controllers/Getitems.js";
import { getItemsBysearch } from "../Controllers/GetitemBySearch.js";


const router=Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/order").post(createOrder)
router.route("/showorder").post(getOrdersByUser)
router.route("/getmenu").post(getItems)
router.route("/search").post(getItemsBysearch)

export {router}