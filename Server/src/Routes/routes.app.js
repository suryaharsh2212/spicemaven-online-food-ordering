
import { Router } from "express";
import { registerUser } from "../Controllers/register.js";
import { loginUser } from "../Controllers/login.js";
import { logoutUser } from "../Controllers/logout.js";
import { createOrder } from "../Controllers/Order.js";
import { getOrdersByUser } from "../Controllers/Showorder.js";
import { getItems } from "../Controllers/Getitems.js";
import { getItemsBysearch } from "../Controllers/GetitemBySearch.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import createPaymentOrder from "../paymentSetup/createPaymentOrder.js";
import { updateOrderStatus } from "../Controllers/updateStatus.js";
import { getTodayOrdersForRestro } from "../Controllers/GetAllpendingOrder.js"
import { getAllprevOrder } from "../Controllers/GetAlluserprevOrder.js";
import { confirmDelivery } from "../Controllers/confirmDelivery.js";
import { confirmRazorpayPayment } from "../paymentSetup/confirmpayment.js";
const router=Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(authMiddleware,logoutUser)
router.route("/order").post(authMiddleware,createOrder)
router.route("/showorder").post(authMiddleware,getOrdersByUser)
router.route("/showpreviousorder").post(authMiddleware,getAllprevOrder)
router.route("/getmenu").post(authMiddleware,getItems)
router.route("/search").post(authMiddleware,getItemsBysearch)
router.route("/createorder").post(authMiddleware,createPaymentOrder)
router.route("/confirm-delivery").post(authMiddleware, confirmDelivery);
router.route('/confirm-razorpayment').post( confirmRazorpayPayment);

router.patch('/order/status', updateOrderStatus);
router.get('/order/today', getTodayOrdersForRestro);

export {router}