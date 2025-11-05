import "dotenv/config";
import nodemailer from "nodemailer";
import { getOrderConfirmationHtmlBody} from "./template.js";


const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.NODE_ENV === "production",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOrderConfirmationEmail(email, orderId, customerName, deliveryTime) {
    if (!email || !orderId || !customerName || !deliveryTime) {
      throw new Error("sendOrderConfirmationEmail(): All parameters are required to send order confirmation email");
    }

    console.log(`Sending mail to email: ${email}, Order ID: ${orderId}`);
    let success = false;

    try {
        const messageInfo = await transporter.sendMail({
            from: {
                name: "Spice Maven",
                address: process.env.EMAIL_USER,
            },
            to: email,
            subject: "Order Confirmation",
            text: "Thank you for your order! Your order has been confirmed.",
            html: getOrderConfirmationHtmlBody(orderId, customerName, deliveryTime),
        });

      success = true;
      console.log(`Order Confirmation email sent successfully to email: ${email}, Order ID: ${orderId}`);
      console.log(`Message Info: ${JSON.stringify(messageInfo)}`); 
    } catch (error) {
      console.error(error);
      console.log(`An error occured while sending mail to email: ${email}, Order ID: ${orderId}`);
    }

    return success;
}

// export async function sendPasswordResetLink(email, passwordResetLink) {
//     if (!email || !passwordResetLink) {
//       throw new Error("sendPasswordResetLink(): Email and Password Reset Link are required to send Password Reset Link");
//     }

//     console.log(`Sending mail to email: ${email}, Password Reset Link: ${passwordResetLink}`);
//     let success = false;

//     try {
//       const messageInfo = await transporter.sendMail({
//         from: {
//             name: "Gigglechat",
//             address: process.env.EMAIL_USER,
//         },
//         to: email,
//         subject: "Password Reset Request",
//         html: getPasswordResetLinkHtmlBody(passwordResetLink),
//       });

//       success = true;
//       console.log(`OTP Sent successfully to email: ${email}, Password Reset Link: ${passwordResetLink}`);
//     //   console.log(`Message Info: ${JSON.stringify(messageInfo)}`); 
//     } catch (error) {
//       console.error(error);
//       console.log(`An error occured while sending mail to email: ${email}, Password Reset Link: ${passwordResetLink}`);
//     }

//     return success;
//   }